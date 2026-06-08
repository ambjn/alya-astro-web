import type { APIRoute } from 'astro';
import { BASE_URL } from '../constants';
import { posts } from '../blog/posts';

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: ChangeFreq;
  priority: number;
}

export const GET: APIRoute = () => {
  const now = new Date().toISOString().split('T')[0];

  const staticRoutes: SitemapEntry[] = [
    { url: '/', lastmod: now, changefreq: 'monthly', priority: 1.0 },
    { url: '/features', lastmod: now, changefreq: 'monthly', priority: 0.9 },
    { url: '/pricing', lastmod: now, changefreq: 'monthly', priority: 0.9 },
    { url: '/blog', lastmod: now, changefreq: 'weekly', priority: 0.9 },
    { url: '/learn-spanish', lastmod: now, changefreq: 'monthly', priority: 0.8 },
    { url: '/vs/duolingo', lastmod: now, changefreq: 'monthly', priority: 0.8 },
    { url: '/vs/chatgpt', lastmod: now, changefreq: 'monthly', priority: 0.8 },
    { url: '/vs/babbel', lastmod: now, changefreq: 'monthly', priority: 0.8 },
    { url: '/vs/hellotalk', lastmod: now, changefreq: 'monthly', priority: 0.8 },
    { url: '/vs/praktika', lastmod: now, changefreq: 'monthly', priority: 0.8 },
    { url: '/support', lastmod: now, changefreq: 'monthly', priority: 0.6 },
    { url: '/privacy', lastmod: now, changefreq: 'yearly', priority: 0.3 },
    { url: '/terms', lastmod: now, changefreq: 'yearly', priority: 0.3 },
  ];

  const blogRoutes: SitemapEntry[] = posts.map((post) => ({
    url: `/blog/${post.slug}`,
    lastmod: post.publishedAt,
    changefreq: 'monthly',
    priority: 0.7,
  }));

  const allRoutes = [...staticRoutes, ...blogRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (entry) => `  <url>
    <loc>${BASE_URL}${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
