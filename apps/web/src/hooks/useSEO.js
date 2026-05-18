
import React from 'react';
import { Helmet } from 'react-helmet-async';

export function useSEO({
  title,
  description,
  image,
  type = 'website',
  url,
  author = 'Escola Bíblica 360',
  publishedDate,
  modifiedDate,
}) {
  const siteTitle = title ? `${title} - Escola Bíblica 360` : 'Escola Bíblica 360 - Conhecimento Bíblico em Todas as Dimensões';
  const siteDescription = description || 'Plataforma completa de estudos bíblicos, materiais para EBD, escatologia, sermões e recursos para professores e alunos.';
  const siteUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://escolabiblica360.com');
  const siteImage = image || 'https://images.unsplash.com/photo-1593485589800-579b43749b15';

  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      name: 'Escola Bíblica 360',
      url: 'https://escolabiblica360.com',
      logo: 'https://escolabiblica360.com/logo.png',
    },
  ];

  if (type === 'article') {
    schemaOrgJSONLD.push({
      '@context': 'http://schema.org',
      '@type': 'Article',
      headline: title,
      image: siteImage,
      author: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Escola Bíblica 360',
        logo: {
          '@type': 'ImageObject',
          url: 'https://escolabiblica360.com/logo.png',
        },
      },
      datePublished: publishedDate,
      dateModified: modifiedDate || publishedDate,
      description: siteDescription,
    });
  }

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <link rel="canonical" href={siteUrl} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
