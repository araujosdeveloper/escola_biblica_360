
import pb from '@/lib/pocketbaseProductionClient.js';
import { loggerService } from '@/services/loggerService.js';

const CACHE_TTL = 5 * 60 * 1000; 
const searchCache = new Map();

const levenshtein = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
  for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i][j - 1] + 1,
        matrix[i - 1][j] + 1,
        matrix[i - 1][j - 1] + indicator
      );
    }
  }
  return matrix[a.length][b.length];
};

export async function searchAcrossAll(query, filterType = 'all') {
  if (!query || query.trim().length < 2) return [];
  
  const cacheKey = `${query}_${filterType}`;
  const cached = searchCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
    return cached.data;
  }

  const searchTerm = query.toLowerCase().trim();
  const collections = [
    { name: 'posts', label: 'Artigos', searchFields: ['title', 'excerpt', 'content'] },
    { name: 'categories', label: 'Categorias', searchFields: ['name', 'description'] },
    { name: 'downloads', label: 'Downloads', searchFields: ['title', 'description'] },
    { name: 'professores', label: 'Professores', searchFields: ['name', 'bio', 'especialidade'] },
    { name: 'escatologia', label: 'Escatologia', searchFields: ['title', 'excerpt', 'content'] },
    { name: 'infantil', label: 'Infantil', searchFields: ['title', 'excerpt', 'content'] }
  ];

  try {
    const fetchPromises = collections
      .filter(c => filterType === 'all' || filterType === c.name)
      .map(async (collection) => {
        let filterParts = [];
        if (['posts', 'downloads', 'escatologia', 'infantil'].includes(collection.name)) {
          filterParts.push(`status="published"`);
        } else if (collection.name === 'professores') {
          filterParts.push(`status="active"`);
        } else if (collection.name === 'categories') {
          filterParts.push(`active=true`);
        }

        const response = await pb.collection(collection.name).getList(1, 100, {
          filter: filterParts.length > 0 ? filterParts.join(' && ') : '',
          $autoCancel: false
        });

        return response.items.map(item => ({
          ...item,
          _type: collection.name,
          _typeLabel: collection.label,
          _score: calculateRelevance(item, searchTerm, collection.searchFields, collection.name)
        })).filter(item => item._score > 0);
      });

    const allResponses = await Promise.all(fetchPromises);
    let results = allResponses.flat();
    
    results.sort((a, b) => b._score - a._score);

    saveSearchHistory(searchTerm);
    searchCache.set(cacheKey, { timestamp: Date.now(), data: results });

    return results;
  } catch (error) {
    loggerService.error("Search failed", error);
    return [];
  }
}

function calculateRelevance(item, searchTerm, searchFields, type) {
  let score = 0;
  
  const typeMultipliers = {
    'posts': 1.2,
    'categories': 1.5,
    'escatologia': 1.1,
    'infantil': 1.1,
    'downloads': 1.0,
    'professores': 1.0
  };

  const multiplier = typeMultipliers[type] || 1.0;

  searchFields.forEach((field, index) => {
    const value = item[field];
    if (value && typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      
      if (index === 0 && lowerValue === searchTerm) score += 300;
      else if (index === 0 && lowerValue.includes(searchTerm)) score += 100;
      else if (index === 1 && lowerValue.includes(searchTerm)) score += 50;
      else if (lowerValue.includes(searchTerm)) score += 10;
      else if (index === 0 && levenshtein(lowerValue, searchTerm) <= 2) score += 30;
    }
  });
  
  if (item.published_at) {
    const ageInDays = (Date.now() - new Date(item.published_at).getTime()) / (1000 * 60 * 60 * 24);
    if (ageInDays < 30) score += 20;
  }

  if (item.views && item.views > 100) {
    score += Math.min(item.views / 10, 50);
  }

  return score * multiplier;
}

function saveSearchHistory(term) {
  try {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistory = [term, ...history.filter(t => t !== term)].slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  } catch (e) {
  }
}

export function getSearchHistory() {
  try {
    return JSON.parse(localStorage.getItem('searchHistory') || '[]');
  } catch (e) {
    return [];
  }
}
