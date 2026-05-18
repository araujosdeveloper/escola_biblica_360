
import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = 'Escola Bíblica 360 - Conhecimento Bíblico em Todas as Dimensões', 
  description = 'Plataforma completa de estudos bíblicos, materiais para EBD, escatologia, sermões e recursos para professores.', 
  image = 'https://escolabiblica360.com/og-image.jpg', 
  url = 'https://escolabiblica360.com', 
  type = 'website',
  author = 'Equipe Escola Bíblica 360',
  publishedDate = null,
  modifiedDate = null,
  breadcrumbs = []
}) {
  const isArticle = type === 'article';

  const articleSchema = isArticle ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": [image],
    "datePublished": publishedDate || new Date().toISOString(),
    "dateModified": modifiedDate || publishedDate || new Date().toISOString(),
    "author": [{
        "@type": "Person",
        "name": author,
        "url": "https://escolabiblica360.com/sobre"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Escola Bíblica 360",
      "logo": {
        "@type": "ImageObject",
        "url": "https://escolabiblica360.com/logo.png"
      }
    }
  } : null;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Escola Bíblica 360",
    "url": "https://escolabiblica360.com",
    "logo": "https://escolabiblica360.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/escolabiblica360",
      "https://www.instagram.com/escolabiblica360",
      "https://www.youtube.com/escolabiblica360"
    ]
  };

  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": crumb.url
    }))
  } : null;

  const schemas = [organizationSchema, articleSchema, breadcrumbSchema].filter(Boolean);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Escola Bíblica 360" />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@escolabiblica360" />
      <meta name="twitter:site" content="@escolabiblica360" />

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
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
