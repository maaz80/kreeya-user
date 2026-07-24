const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../dist/index.html');

if (fs.existsSync(htmlPath)) {
  let content = fs.readFileSync(htmlPath, 'utf8');
  const originalContent = content;

  // Regex to match the stylesheet link tag in the built index.html
  const linkRegex = /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+\.css)["'][^>]*>/gi;

  content = content.replace(linkRegex, (match, href) => {
    // Only target internal assets
    if (href.startsWith('/assets/')) {
      return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'" /><noscript><link rel="stylesheet" href="${href}" /></noscript>`;
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(htmlPath, content, 'utf8');
    console.log('✅ Optimized CSS loading in dist/index.html');
  } else {
    console.log('⚠️ No stylesheet links found to optimize in dist/index.html');
  }
} else {
  console.error('❌ dist/index.html not found!');
}
