
import pb from '@/lib/pocketbaseProductionClient.js';
import { loggerService } from '@/services/loggerService.js';

const CACHE_TTL = 5 * 60 * 1000;
const MAX_CACHE_ITEMS = 30;
const searchCache = new Map();

const SEARCH_COLLECTIONS = [
  {
    name: 'posts',
    label: 'Artigos',
    searchFields: ['title', 'excerpt', 'content'],
    path: (item) => `/artigo/${item.slug}`,
    filter: 'status="published"',
  },
  {
    name: 'categories',
    label: 'Categorias',
    searchFields: ['name', 'description'],
    path: (item) => `/categoria/${item.slug}`,
    filter: 'active=true',
  },
  {
    name: 'downloads',
    label: 'Downloads',
    searchFields: ['title', 'description', 'category'],
    path: () => '/downloads',
    filter: 'status="published"',
  },
  {
    name: 'professores',
    label: 'Professores',
    searchFields: ['name', 'bio', 'especialidade'],
    path: (item) => `/professores/${item.slug || item.id}`,
    filter: 'status="active"',
  },
  {
    name: 'escatologia',
    label: 'Escatologia',
    searchFields: ['title', 'excerpt', 'content'],
    path: (item) => `/escatologia/${item.slug}`,
    filter: 'status="published"',
  },
  {
    name: 'infantil',
    label: 'Infantil',
    searchFields: ['title', 'excerpt', 'content'],
    path: (item) => `/infantil/${item.slug}`,
    filter: 'status="published"',
  },
];

const normalizeText = (value = '') => {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

const sanitizeQuery = (query = '') => {
  return normalizeText(query)
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, ' ')
    .slice(0, 80);
};

const getCacheKey = (query, filterType) => {
  return `${filterType}:${sanitizeQuery(query)}`;
};

const setCache = (key, data) => {
  if (searchCache.size >= MAX_CACHE_ITEMS) {
    const firstKey = searchCache.keys().next().value;
    searchCache.delete(firstKey);
  }

  searchCache.set(key, {
    timestamp: Date.now(),
    data,
  });
};

const getCache = (key) => {
  const cached = searchCache.get(key);

  if (!cached) return null;

  if (Date.now() - cached.timestamp > CACHE_TTL) {
    searchCache.delete(key);
    return null;
  }

  return cached.data;
};

const levenshtein = (a, b) => {
  const first = normalizeText(a);
  const second = normalizeText(b);

  if (first.length === 0) return second.length;
  if (second.length === 0) return first.length;

  const matrix = Array(first.length + 1)
    .fill(null)
    .map(() => Array(second.length + 1).fill(null));

  for (let i = 0; i <= first.length; i += 1) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= second.length; j += 1) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= first.length; i += 1) {
    for (let j = 1; j <= second.length; j += 1) {
      const indicator = first[i - 1] === second[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i][j - 1] + 1,
        matrix[i - 1][j] + 1,
        matrix[i - 1][j - 1] + indicator
      );
    }
  }

  return matrix[first.length][second.length];
};

function calculateRelevance(item, searchTerm, searchFields, type) {
  let score = 0;

  const typeMultipliers = {
    posts: 1.2,
    categories: 1.5,
    escatologia: 1.1,
    infantil: 1.1,
    downloads: 1.0,
    professores: 1.0,
  };

  const multiplier = typeMultipliers[type] || 1;

  searchFields.forEach((field, index) => {
    const value = item[field];

    if (!value || typeof value !== 'string') return;

    const normalizedValue = normalizeText(value);

    if (index === 0 && normalizedValue === searchTerm) {
      score += 300;
      return;
    }

    if (index === 0 && normalizedValue.includes(searchTerm)) {
      score += 100;
      return;
    }

    if (index === 1 && normalizedValue.includes(searchTerm)) {
      score += 50;
      return;
    }

    if (normalizedValue.includes(searchTerm)) {
      score += 10;
      return;
    }

    if (
      index === 0 &&
      searchTerm.length >= 4 &&
      levenshtein(normalizedValue.slice(0, searchTerm.length + 4), searchTerm) <= 2
    ) {
      score += 25;
    }
  });

  if (item.published_at) {
    const ageInDays =
      (Date.now() - new Date(item.published_at).getTime()) /
      (1000 * 60 * 60 * 24);

    if (ageInDays < 30) {
      score += 20;
    }
  }

  if (item.views && item.views > 100) {
    score += Math.min(item.views / 10, 50);
  }

  return score * multiplier;
}

function saveSearchHistory(term) {
  try {
    if (typeof localStorage === 'undefined') return;

    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');

    const newHistory = [
      term,
      ...history.filter((item) => item !== term),
    ].slice(0, 10);

    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  } catch {
    // silent fail
  }
}

export async function searchAcrossAll(query, filterType = 'all') {
  const searchTerm = sanitizeQuery(query);

  if (!searchTerm || searchTerm.length < 2) return [];

  const cacheKey = getCacheKey(searchTerm, filterType);
  const cached = getCache(cacheKey);

  if (cached) return cached;

  const selectedCollections = SEARCH_COLLECTIONS.filter((collection) => {
    return filterType === 'all' || filterType === collection.name;
  });

  try {
    const responses = await Promise.allSettled(
      selectedCollections.map(async (collection) => {
        const response = await pb.collection(collection.name).getList(1, 80, {
          filter: collection.filter,
          sort: '-created',
          $autoCancel: false,
        });

        return response.items
          .map((item) => {
            const score = calculateRelevance(
              item,
              searchTerm,
              collection.searchFields,
              collection.name
            );

            return {
              ...item,
              _type: collection.name,
              _typeLabel: collection.label,
              _path: collection.path(item),
              _score: score,
            };
          })
          .filter((item) => item._score > 0);
      })
    );

    const results = responses
      .filter((response) => response.status === 'fulfilled')
      .flatMap((response) => response.value)
      .sort((a, b) => b._score - a._score);

    const rejected = responses.filter((response) => response.status === 'rejected');

    if (rejected.length > 0) {
      loggerService.warn('Some search collections failed', {
        failedCollections: rejected.length,
      });
    }

    saveSearchHistory(searchTerm);
    setCache(cacheKey, results);

    return results;
  } catch (error) {
    loggerService.error('Search failed', error, {
      query: searchTerm,
      filterType,
    });

    return [];
  }
}

export function getSearchHistory() {
  try {
    if (typeof localStorage === 'undefined') return [];

    return JSON.parse(localStorage.getItem('searchHistory') || '[]');
  } catch {
    return [];
  }
}

export function clearSearchHistory() {
  try {
    if (typeof localStorage === 'undefined') return;

    localStorage.removeItem('searchHistory');
  } catch {
    // silent fail
  }
}