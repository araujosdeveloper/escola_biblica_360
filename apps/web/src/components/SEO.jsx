
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://escolabiblica360.com';
const SITE_NAME = 'Escola Bíblica 360';
const DEFAULT_TITLE = 'Escola Bíblica 360 - Conhecimento Bíblico em Todas as Dimensões';
const DEFAULT_DESCRIPTION =
  'Plataforma completa de estudos bíblicos, materiais para EBD, escatologia, sermões e recursos para professores.';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const normalizeUrl = (url = '') => {
  if (!url) return SITE_URL;
  if (url.startsWith('http')) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
};

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = typeof window !== 'undefined' ? window.location.pathname : '/',
  type = 'website',
  author = 'Equipe Escola Bíblica 360',
  publishedDate = null,
  modifiedDate = null,
  breadcrumbs = [],
  noindex = false,
}) {
  const canonicalUrl = normalizeUrl(url);
  const imageUrl = normalizeUrl(image);
  const isArticle = type === 'article';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/busca?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const articleSchema = isArticle
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: [imageUrl],
        datePublished: publishedDate || undefined,
        dateModified: modifiedDate || publishedDate || undefined,
        author: {
          '@type': 'Organization',
          name: author || SITE_NAME,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      }
    : null;

  const breadcrumbSchema =
    breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.label,
            item: normalizeUrl(crumb.url),
          })),
        }
      : null;

  const schemas = [organizationSchema, websiteSchema, articleSchema, breadcrumbSchema].filter(Boolean);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {isArticle && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}

      {isArticle && modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}

      {isArticle && author && (
        <meta property="article:author" content={author} />
      )}

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema).replace(/</g, '\\u003c')}
        </script>
      ))}
    </Helmet>
  );
}