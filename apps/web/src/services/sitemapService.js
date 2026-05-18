
import pb from '@/lib/pocketbaseProductionClient.js';
import { loggerService } from '@/services/loggerService.js';

const DOMAIN = import.meta.env.VITE_APP_URL || 'https://escolabiblica360.com';

const escapeXml = (unsafe) => {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

export const generateSitemap = async () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const addUrl = (loc, priority, changefreq, lastmod) => {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(DOMAIN + loc)}</loc>\n`;
    if (lastmod) xml += `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  };

  try {
    const now = new Date();
    addUrl('/', '1.0', 'daily', now);
    addUrl('/sobre', '0.8', 'monthly', now);
    addUrl('/contato', '0.8', 'monthly', now);
    addUrl('/estudos-biblicos', '0.9', 'daily', now);
    addUrl('/licoes-ebd', '0.9', 'weekly', now);
    addUrl('/escatologia', '0.9', 'weekly', now);
    addUrl('/sermoes', '0.9', 'weekly', now);
    addUrl('/infantil', '0.9', 'weekly', now);
    addUrl('/professores', '0.8', 'monthly', now);
    addUrl('/downloads', '0.9', 'weekly', now);

    const posts = await pb.collection('posts').getFullList({ filter: 'status="published"', $autoCancel: false });
    posts.forEach(post => addUrl(`/artigo/${post.slug}`, '0.8', 'weekly', post.updated));

    const categories = await pb.collection('categories').getFullList({ filter: 'active=true', $autoCancel: false });
    categories.forEach(cat => addUrl(`/categoria/${cat.slug}`, '0.7', 'monthly', cat.updated));

    const downloads = await pb.collection('downloads').getFullList({ filter: 'status="published"', $autoCancel: false });
    downloads.forEach(dl => addUrl(`/downloads/${dl.slug}`, '0.8', 'monthly', dl.updated));

    const infantil = await pb.collection('infantil').getFullList({ filter: 'status="published"', $autoCancel: false });
    infantil.forEach(inf => addUrl(`/infantil/${inf.slug}`, '0.7', 'monthly', inf.updated));

    const escatologia = await pb.collection('escatologia').getFullList({ filter: 'status="published"', $autoCancel: false });
    escatologia.forEach(esc => addUrl(`/escatologia/${esc.slug}`, '0.7', 'monthly', esc.updated));

  } catch (error) {
    loggerService.error('Error generating sitemap', error);
  }

  xml += `</urlset>`;
  return xml;
};
