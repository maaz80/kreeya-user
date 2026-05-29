const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = "https://api.kreeyadesign.com/api";
const SITE_URL = "https://kreeyadesign.com";
const TODAY = new Date().toISOString().split('T')[0];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
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

async function main() {
  // console.log("🚀 Starting Dynamic sitemap.xml generation...");

  // 1. Define Static Pages
  const staticPages = [
    { loc: `${SITE_URL}/`, lastmod: "2025-03-18", changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE_URL}/contact-us`, lastmod: "2025-03-18", changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE_URL}/about-us`, lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE_URL}/blogs`, lastmod: "2025-03-18", changefreq: "weekly", priority: "0.8" },
    { loc: `${SITE_URL}/portfolio-beyekls`, lastmod: "2025-03-18", changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/portfolio-nectar`, lastmod: "2025-03-18", changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/portfolio-coinpay`, lastmod: "2025-03-18", changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/portfolio-daccord`, lastmod: "2025-03-18", changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/policy`, lastmod: "2025-03-18", changefreq: "yearly", priority: "0.5" },
    { loc: `${SITE_URL}/disclaimer`, lastmod: "2025-03-18", changefreq: "yearly", priority: "0.5" },
    { loc: `${SITE_URL}/landing-page`, lastmod: "2025-03-18", changefreq: "monthly", priority: "0.7" },
  ];

  const urls = [...staticPages];

  try {
    // 2. Fetch Dynamic data from API
    // console.log(`📡 Fetching locations, services, and portfolios from API: ${API_URL}`);
    const [locationsRes, servicesRes, portfoliosRes] = await Promise.all([
      fetchJson(`${API_URL}/locations`),
      fetchJson(`${API_URL}/services`),
      fetchJson(`${API_URL}/portfolios`)
    ]);

    const locations = normalizeListResponse(locationsRes);
    const services = normalizeListResponse(servicesRes);
    const portfolios = normalizeListResponse(portfoliosRes);

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
          priority: "0.9"
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
          priority: "0.9"
        });
      }
    });

    // 5. Generate XML Structure
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url.loc}</loc>\n`;
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      xml += `    <priority>${url.priority}</priority>\n`;
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
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(staticDataPath, JSON.stringify(staticData, null, 2), 'utf8');
    // console.log(`✅ staticData.json successfully written to src/data/staticData.json`);

  } catch (error) {
    console.error("❌ Failed to generate sitemap.xml:", error);
    process.exit(1);
  }
}

main();
