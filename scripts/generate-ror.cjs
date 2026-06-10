const fs = require('fs');
const path = require('path');

const SITE_URL = "https://kreeyadesign.com";

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizeRouteSlug(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/_/g, "-");
}

function main() {
  console.log("🚀 Starting ROR Sitemap generation...");

  try {
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    
    // Read local static JSON data
    const staticPagesSeo = JSON.parse(fs.readFileSync(path.join(dataDir, 'staticPagesSeo.json'), 'utf8'));
    const staticLocations = JSON.parse(fs.readFileSync(path.join(dataDir, 'staticLocations.json'), 'utf8'));
    const staticServices = JSON.parse(fs.readFileSync(path.join(dataDir, 'staticServices.json'), 'utf8'));
    const staticPortfolios = JSON.parse(fs.readFileSync(path.join(dataDir, 'staticPortfolios.json'), 'utf8'));
    const staticBlogs = JSON.parse(fs.readFileSync(path.join(dataDir, 'staticBlogs.json'), 'utf8'));

    const items = [];

    // Helper to add ROR items
    function addItem(link, title, description, priority) {
      items.push({
        link: link.endsWith('/') ? link : `${link}/`,
        title: title || 'Kreeya Design',
        description: description || 'UI UX Design Company',
        priority: priority
      });
    }

    // ----------------------------------------------------
    // PRIORITY 0: Home Page
    // ----------------------------------------------------
    const homeSeo = staticPagesSeo.home || {};
    addItem(
      SITE_URL,
      homeSeo.title,
      homeSeo.description,
      0
    );

    // ----------------------------------------------------
    // PRIORITY 1: about-us, contact-us, locations pages, services page, service pages
    // ----------------------------------------------------
    // About Us
    const aboutSeo = staticPagesSeo['about-us'] || {};
    addItem(
      `${SITE_URL}/about-us`,
      aboutSeo.title,
      aboutSeo.description,
      1
    );

    // Contact Us
    const contactSeo = staticPagesSeo['contact-us'] || {};
    addItem(
      `${SITE_URL}/contact-us`,
      contactSeo.title,
      contactSeo.description,
      1
    );

    // Services Page
    const servicesSeo = staticPagesSeo.services || {};
    addItem(
      `${SITE_URL}/services`,
      servicesSeo.title,
      servicesSeo.description,
      1
    );

    // Location Pages (All nested items inside locations)
    staticLocations.forEach(loc => {
      const locItems = loc.items || [];
      locItems.forEach(item => {
        if (item.slug) {
          const slug = normalizeRouteSlug(item.slug);
          const title = item.seoTitle || item.title || item.hero?.title;
          const desc = item.description || item.hero?.description;
          addItem(
            `${SITE_URL}/${slug}`,
            title,
            desc,
            1
          );
        }
      });
    });

    // Service Pages (All nested items inside services)
    staticServices.forEach(serv => {
      const servItems = serv.items || [];
      servItems.forEach(item => {
        if (item.slug) {
          const slug = normalizeRouteSlug(item.slug);
          const title = item.seoTitle || item.title || item.hero?.title;
          const desc = item.description || item.hero?.description;
          addItem(
            `${SITE_URL}/${slug}`,
            title,
            desc,
            1
          );
        }
      });
    });

    // ----------------------------------------------------
    // PRIORITY 2: 8 portfolio pages (4 dynamic, 4 static), category/blogs page, dynamic blogs pages
    // ----------------------------------------------------
    // 4 Static Portfolios
    const staticPortfolioKeys = ['portfolio-beyekls', 'portfolio-nectar', 'portfolio-coinpay', 'portfolio-daccord'];
    staticPortfolioKeys.forEach(key => {
      const seo = staticPagesSeo[key] || {};
      addItem(
        `${SITE_URL}/${key}`,
        seo.title,
        seo.description,
        2
      );
    });

    // 4 Dynamic Portfolios (from staticPortfolios.json)
    staticPortfolios.forEach(portfolio => {
      if (portfolio.name) {
        const slug = normalizeRouteSlug(portfolio.name.toLowerCase().replace(/\s+/g, '-'));
        const title = `${portfolio.name} Portfolio | Kreeya Design Case Study`;
        const desc = portfolio.description || `View Kreeya Design's ${portfolio.name} Portfolio, featuring UI/UX design, user research, and product strategy.`;
        addItem(
          `${SITE_URL}/${slug}`,
          title,
          desc,
          2
        );
      }
    });

    // Category/Blogs Page
    const blogsSeo = staticPagesSeo.blogs || {};
    addItem(
      `${SITE_URL}/category/blogs`,
      blogsSeo.title,
      blogsSeo.description,
      2
    );

    // Dynamic Blog Pages
    staticBlogs.forEach(blog => {
      if (blog.slug) {
        const slug = normalizeRouteSlug(blog.slug);
        const title = blog.seoTitle || blog.title;
        const desc = blog.seoDescription || blog.title;
        addItem(
          `${SITE_URL}/${slug}`,
          title,
          desc,
          2
        );
      }
    });

    // ----------------------------------------------------
    // PRIORITY 3: privacy-policy, disclaimer
    // ----------------------------------------------------
    // Privacy Policy
    const privacySeo = staticPagesSeo['privacy-policy'] || {};
    addItem(
      `${SITE_URL}/privacy-policy`,
      privacySeo.title,
      privacySeo.description,
      3
    );

    // Disclaimer
    const disclaimerSeo = staticPagesSeo.disclaimer || {};
    addItem(
      `${SITE_URL}/disclaimer`,
      disclaimerSeo.title,
      disclaimerSeo.description,
      3
    );

    // ----------------------------------------------------
    // Generate ROR XML Content
    // ----------------------------------------------------
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<rss xmlns:ror="http://rorweb.com/0.1/" version="2.0">\n';
    xml += '<channel>\n';
    xml += `  <title>ROR Sitemap for ${SITE_URL}/</title>\n`;
    xml += `  <link>${SITE_URL}/</link>\n`;

    items.forEach(item => {
      xml += '  <item>\n';
      xml += `    <link>${escapeXml(item.link)}</link>\n`;
      xml += `    <title>${escapeXml(item.title)}</title>\n`;
      xml += `    <description>${escapeXml(item.description)}</description>\n`;
      xml += '    <ror:updatePeriod/>\n';
      xml += `    <ror:sortOrder>${item.priority}</ror:sortOrder>\n`;
      xml += '    <ror:resourceOf>sitemap</ror:resourceOf>\n';
      xml += '  </item>\n';
    });

    xml += '</channel>\n';
    xml += '</rss>\n';

    // Write to public/ror.xml
    const publicPath = path.join(__dirname, '..', 'public', 'ror.xml');
    fs.writeFileSync(publicPath, xml, 'utf8');
    console.log(`✅ ror.xml successfully written to ${publicPath}`);

    // Write to dist/ror.xml (if dist exists)
    const distPath = path.join(__dirname, '..', 'dist', 'ror.xml');
    if (fs.existsSync(path.dirname(distPath))) {
      fs.writeFileSync(distPath, xml, 'utf8');
      console.log(`✅ ror.xml copied to ${distPath}`);
    }

    // Generate and write urllist.txt (Plain text list of all URLs)
    const txtContent = items.map(item => item.link).join('\n') + '\n';
    const publicTxtPath = path.join(__dirname, '..', 'public', 'urllist.txt');
    fs.writeFileSync(publicTxtPath, txtContent, 'utf8');
    console.log(`✅ urllist.txt successfully written to ${publicTxtPath}`);

    const distTxtPath = path.join(__dirname, '..', 'dist', 'urllist.txt');
    if (fs.existsSync(path.dirname(distTxtPath))) {
      fs.writeFileSync(distTxtPath, txtContent, 'utf8');
      console.log(`✅ urllist.txt copied to ${distTxtPath}`);
    }

  } catch (error) {
    console.error("❌ Failed to generate ror.xml:", error);
    process.exit(1);
  }
}

main();
