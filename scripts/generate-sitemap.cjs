const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = "https://api.kreeyadesign.com/api";
const SITE_URL = "https://kreeyadesign.com";
const TODAY = new Date().toISOString().split('T')[0];

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Follow HTTP redirects (301, 302, 307, 308)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        try {
          const redirectUrl = new URL(res.headers.location, url).toString();
          return fetchJson(redirectUrl).then(resolve).catch(reject);
        } catch (err) {
          return reject(new Error(`Failed to resolve redirect URL: ${err.message}`));
        }
      }

      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`API failed: ${res.statusCode} ${res.statusMessage}`));
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON from ${url}: ${e.message}`));
        }
      });
    }).on('error', (err) => reject(err));
  });
}

function normalizeListResponse(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.locations)) return data.locations;
  if (Array.isArray(data?.services)) return data.services;
  return [];
}

function normalizeRouteSlug(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/_/g, "-");
}

function getItemSeo(item) {
  return {
    title: item?.seoTitle || item?.metaTitle || item?.title || item?.hero?.title || "",
    description:
      item?.seoDescription ||
      item?.metaDescription ||
      item?.description ||
      item?.hero?.description ||
      item?.page?.help?.description ||
      "",
    keywords: item?.keywords || item?.seoKeywords || ""
  };
}

async function main() {
  // console.log("🚀 Starting Dynamic sitemap.xml generation...");

  // 1. Define Static Pages
  const staticPages = [
    { loc: `${SITE_URL}/`, lastmod: "2025-03-18", changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE_URL}/services`, lastmod: TODAY, changefreq: "weekly", priority: "0.9" },
    { loc: `${SITE_URL}/contact-us`, lastmod: "2025-03-18", changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE_URL}/about-us`, lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE_URL}/category/blogs`, lastmod: "2025-03-18", changefreq: "weekly", priority: "0.8" },
    { loc: `${SITE_URL}/portfolio-beyekls`, lastmod: "2025-03-18", changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/portfolio-nectar`, lastmod: "2025-03-18", changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/portfolio-coinpay`, lastmod: "2025-03-18", changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/portfolio-daccord`, lastmod: "2025-03-18", changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/privacy-policy`, lastmod: "2025-03-18", changefreq: "yearly", priority: "0.5" },
    { loc: `${SITE_URL}/disclaimer`, lastmod: "2025-03-18", changefreq: "yearly", priority: "0.5" },
    { loc: `${SITE_URL}/landing-page`, lastmod: "2025-03-18", changefreq: "monthly", priority: "0.7" },
  ];

  const urls = [...staticPages];

  try {
    // 2. Fetch Dynamic data from API
    // console.log(`📡 Fetching locations, services, and portfolios from API: ${API_URL}`);
    const [locationsRes, servicesRes, portfoliosRes, blogsRes] = await Promise.all([
      fetchJson(`${API_URL}/locations`),
      fetchJson(`${API_URL}/services`),
      fetchJson(`${API_URL}/portfolios`),
      fetchJson(`${API_URL}/blogs`)
    ]);

    const locations = normalizeListResponse(locationsRes);
    const services = normalizeListResponse(servicesRes);
    const portfolios = normalizeListResponse(portfoliosRes);
    const blogs = normalizeListResponse(blogsRes);

    // console.log(`📈 Fetched ${locations.length} locations, ${services.length} services, and ${portfolios.length} portfolios.`);

    // 3. Extract and normalize location items
    const locationItems = locations.flatMap(loc => loc.items || []);
    // console.log(`📍 Found ${locationItems.length} location items.`);
    locationItems.forEach(item => {
      if (item.slug) {
        const slug = normalizeRouteSlug(item.slug);
        urls.push({
          loc: `${SITE_URL}/${slug}`,
          lastmod: TODAY,
          changefreq: "weekly",
          priority: "0.9",
          image: item.image ? {
            loc: item.image,
            title: item.title || item.hero?.title,
            caption: item.description || item.hero?.description
          } : undefined
        });
      }
    });

    // 4. Extract and normalize service items
    const serviceItems = services.flatMap(serv => serv.items || []);
    // console.log(`🛠️ Found ${serviceItems.length} service items.`);
    serviceItems.forEach(item => {
      if (item.slug) {
        const slug = normalizeRouteSlug(item.slug);
        urls.push({
          loc: `${SITE_URL}/${slug}`,
          lastmod: TODAY,
          changefreq: "weekly",
          priority: "0.9",
          image: item.image ? {
            loc: item.image,
            title: item.title || item.hero?.title,
            caption: item.description || item.hero?.description
          } : undefined
        });
      }
    });

    // 5. Extract and normalize blog items
    blogs.forEach(blog => {
      if (blog.slug) {
        const slug = normalizeRouteSlug(blog.slug);
        urls.push({
          loc: `${SITE_URL}/${slug}`,
          lastmod: TODAY,
          changefreq: "weekly",
          priority: "0.9",
          image: blog.image ? {
            loc: blog.image,
            title: blog.title,
            caption: blog.alt || blog.title
          } : undefined
        });
      }
    });

     // 5.5 Extract and normalize portfolio items
     portfolios.forEach(portfolio => {
       if (portfolio.name) {
         const slug = normalizeRouteSlug(portfolio.name.toLowerCase().replace(/\s+/g, '-'));
         urls.push({
           loc: `${SITE_URL}/${slug}`,
           lastmod: TODAY,
           changefreq: "weekly",
           priority: "0.9",
           image: portfolio.cards?.[0]?.image ? {
             loc: portfolio.cards[0].image,
             title: portfolio.title || portfolio.name,
             caption: portfolio.description || ""
           } : undefined
         });
       }
     });

     // 6. Generate XML Structure
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url.loc}</loc>\n`;
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;
      if (url.image) {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${escapeXml(url.image.loc)}</image:loc>\n`;
        if (url.image.title) {
          xml += `      <image:title>${escapeXml(url.image.title)}</image:title>\n`;
        }
        if (url.image.caption) {
          xml += `      <image:caption>${escapeXml(url.image.caption)}</image:caption>\n`;
        }
        xml += '    </image:image>\n';
      }
      xml += '  </url>\n';
    });

    xml += '</urlset>\n';

    // 6. Write XML to public/sitemap.xml (and dist/ if it exists)
    const publicPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(publicPath, xml, 'utf8');
    // console.log(`✅ sitemap.xml successfully written to public/sitemap.xml (${urls.length} URLs mapped)`);

    const distPath = path.join(__dirname, '..', 'dist', 'sitemap.xml');
    if (fs.existsSync(path.dirname(distPath))) {
      fs.writeFileSync(distPath, xml, 'utf8');
      // console.log(`✅ sitemap.xml copied to dist/sitemap.xml`);
    }

      // Write dynamic content to src/data/staticData.json
      const staticDataPath = path.join(__dirname, '..', 'src', 'data', 'staticData.json');
      const staticData = {
        locations: locations,
        services: services,
        portfolios: portfolios,
        blogs: blogs,
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(staticDataPath, JSON.stringify(staticData, null, 2), 'utf8');

      // Fetch static page SEO configs for SWR acceleration
      const STATIC_PAGE_SEO_IDS = [
        "home",
        "landing-page",
        "contact-us",
        "blogs",
        "about-us",
        "location",
        "privacy-policy",
        "disclaimer",
        "portfolio-beyekls",
        "portfolio-daccord",
        "portfolio-coinpay",
        "portfolio-nectar",
        "not-found",
        "portfolios",
        "services"
      ];
      const pagesSeo = {};
      await Promise.all(
        STATIC_PAGE_SEO_IDS.map(async (id) => {
          try {
            const data = await fetchJson(`${API_URL}/pages/${id}/seo`);
            if (data) pagesSeo[id] = data;
          } catch (e) {
            console.warn(`⚠️ Warning: Could not fetch SEO for static page ${id}:`, e.message);
          }
        })
      );

      // Write individual split files for performance optimizations (to avoid loading 640kB in client chunks)
      const dataDir = path.dirname(staticDataPath);
      fs.writeFileSync(path.join(dataDir, 'staticLocations.json'), JSON.stringify(locations, null, 2), 'utf8');
      fs.writeFileSync(path.join(dataDir, 'staticServices.json'), JSON.stringify(services, null, 2), 'utf8');
      fs.writeFileSync(path.join(dataDir, 'staticPortfolios.json'), JSON.stringify(portfolios, null, 2), 'utf8');
      fs.writeFileSync(path.join(dataDir, 'staticBlogs.json'), JSON.stringify(blogs, null, 2), 'utf8');
      fs.writeFileSync(path.join(dataDir, 'staticPagesSeo.json'), JSON.stringify(pagesSeo, null, 2), 'utf8');

      // Generate consolidated SEO mapping for public/seo-data.json (used by index.php for server-side meta injection)
      const seoData = {};

      const staticPathMap = {
        "home": "/",
        "contact-us": "/contact-us",
        "about-us": "/about-us",
        "blogs": "/category/blogs",
        "portfolio-beyekls": "/portfolio-beyekls",
        "portfolio-nectar": "/portfolio-nectar",
        "portfolio-coinpay": "/portfolio-coinpay",
        "portfolio-daccord": "/portfolio-daccord",
        "privacy-policy": "/privacy-policy",
        "disclaimer": "/disclaimer",
        "landing-page": "/landing-page",
        "portfolios": "/portfolios",
        "services": "/services",
        "not-found": "/404"
      };

      Object.keys(pagesSeo).forEach(id => {
        const pathVal = staticPathMap[id];
        if (pathVal) {
          seoData[pathVal] = {
            title: pagesSeo[id].title || "",
            description: pagesSeo[id].description || "",
            keywords: pagesSeo[id].keywords || ""
          };
        }
      });

      locationItems.forEach(item => {
        if (item.slug) {
          const pathVal = "/" + normalizeRouteSlug(item.slug);
          const seo = getItemSeo(item);
          seoData[pathVal] = seo;
        }
      });

      serviceItems.forEach(item => {
        if (item.slug) {
          const pathVal = "/" + normalizeRouteSlug(item.slug);
          const seo = getItemSeo(item);
          seoData[pathVal] = seo;
        }
      });

      blogs.forEach(blog => {
        if (blog.slug) {
          const pathVal = "/" + normalizeRouteSlug(blog.slug);
          seoData[pathVal] = {
            title: blog.seoTitle || blog.title || "",
            description: blog.seoDescription || (blog.content ? blog.content.replace(/<[^>]+>/g, '').slice(0, 150) : ""),
            keywords: blog.seoKeywords || ""
          };
        }
      });

      portfolios.forEach(portfolio => {
        if (portfolio.name) {
          const pathVal = "/" + normalizeRouteSlug(portfolio.name.toLowerCase().replace(/\s+/g, '-'));
          seoData[pathVal] = {
            title: portfolio.title || portfolio.name || "",
            description: portfolio.description || "",
            keywords: ""
          };
        }
      });

      const seoDataPath = path.join(__dirname, '..', 'public', 'seo-data.json');
      fs.writeFileSync(seoDataPath, JSON.stringify(seoData, null, 2), 'utf8');

      const distSeoDataPath = path.join(__dirname, '..', 'dist', 'seo-data.json');
      if (fs.existsSync(path.dirname(distSeoDataPath))) {
        fs.writeFileSync(distSeoDataPath, JSON.stringify(seoData, null, 2), 'utf8');
      }

  } catch (error) {
    console.error("❌ Failed to generate sitemap.xml:", error);
    process.exit(1);
  }
}

main();
