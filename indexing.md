# 🔍 Kreeya Design - Page Indexing & Preview Audit Guide

Aapne successfully **Dynamic Sitemap** aur **PHP Bot Proxy** live kar diya hai! Ab aap khud apni website ki indexing ko test kar sakte hain aur Google par naye pages ko turant index karwane ke liye request bhej sakte hain.

Iss guide me **4 aasan step-by-step methods** bataye gaye hain jisse aap pure system ki testing aur verification kar sakte hain.

---

## 🗺️ Step 1: Dynamic Sitemap Verification

Sabse pehle check karein ki kya dynamic sitemap properly run ho raha hai aur saare naye admin pages ko realtime me dikha raha hai.

1. Kisi bhi browser (preferable: Incognito mode) me **`https://kreeyadesign.com/sitemap.xml`** ko open karein.
2. **Realtime Test:** 
   * Admin Panel me ek dummy/naya service page banayein (jaise: `dummy-test-service`).
   * Apne browser me sitemap page ko refresh karein.
   * Aap dekhenge ki bina kisi build ya redeploy ke, naya URL (`https://kreeyadesign.com/dummy-test-service`) sitemap me **usi second automatically add ho chuka hoga.**
3. Test complete hone ke baad admin panel se uss dummy page ko delete kar dein.

---

## 📈 Step 2: Google Search Console (GSC) me Manual Indexing Request

Googlebot ko batane ke liye ki hamare paas naye pages hain aur unhe turant index karwane ke liye ye karein:

1. **Google Search Console** (`https://search.google.com/search-console`) par login karein.
2. **Sitemap Submit karein:**
   * Left menu me **Sitemaps** par click karein.
   * "Add a new sitemap" me **`sitemap.xml`** likhein aur **Submit** kar dein. 
   * Google turant dynamic sitemap ko crawl karke saare naye links ko fetch kar lega.
3. **Inspect Dynamic URL:**
   * Search Console me sabse top par search bar me apna dynamic URL paste karein (jaise: `https://kreeyadesign.com/video-editing-service-in-delhi`).
   * **Test Live URL:** Top-right me "Test Live URL" par click karein. Ye check karega ki Googlebot ko page kaisa dikh raha hai.
   * **Live Test Verify:** Renders section me raw HTML check karein. Ab wahan khali React template ke bajay **pura dynamic content aur correct meta tags** show honge.
4. **Request Indexing:** 
   * Agar sab sahi dikh raha hai, toh **"Request Indexing"** button par click kar dein. Googlebot 24-48 hours ke andar page ko search results me live kar dega.

---

## 💬 Step 3: WhatsApp & Social Share Preview Audit

WhatsApp aur Facebook link preview bot ko humne bypass kiya hai. Unka preview aur debug test karne ke liye ye steps follow karein:

### A. WhatsApp Link Preview Test:
1. Apne phone me WhatsApp open karein aur chat box me dynamic URL paste karein: `https://kreeyadesign.com/video-editing-service-in-delhi`.
2. **2-3 seconds wait karein** (WhatsApp background me link check karta hai).
3. Ab khali domain name ke bajay page ka **correct title ("Professional Video Editing Services..."), custom description aur logo image** card format me display hoga.

### B. Facebook Sharing Debugger (Highly Recommended):
Facebook crawler ko direct check karne aur cache clear karne ke liye iska use karein:
1. **Facebook Sharing Debugger** (`https://developers.facebook.com/tools/debug/`) open karein.
2. Apna dynamic service URL enter karein aur **Debug** par click karein.
3. **Scrape Again:** Agar purana data dikhaye, toh **"Scrape Again"** par click karein.
4. Ye tool aapko exact raw tags dikhayega jo crawler read kar raha hai (jaise `og:title`, `og:description`, `og:image`).

---

## 💻 Step 4: Chrome Developer Tools se Bot Simulation (Self-Test)

Aap apne hi laptop par Chrome browser ko Googlebot ya WhatsApp bot bana kar check kar sakte hain ki use page kaisa dikh raha hai:

1. Chrome browser me apna dynamic page open karein (e.g. `https://kreeyadesign.com/video-editing-service-in-delhi`).
2. Right-click karke **Inspect** par click karein (Chrome DevTools open hoga).
3. DevTools ke top-right me teen dots (Menu) par click karein -> **More tools** -> **Network conditions** par click karein.
4. Network conditions tab me niche **User agent** section me jayein.
5. "Use browser default" ko **uncheck** karein.
6. Dropdown list me se **"Googlebot"** select karein (ya Custom text me `WhatsApp/2.0` daal dein).
7. Ab page ko **Refresh (F5)** karein.
8. **Verify:** Jaise hi aap refresh karenge, humara `index.php` bot middleware act karega aur aapko page direct Prerender.io ka parsed content rander karega. Aap page source (Ctrl + U) press karke check kar sakte hain, wahan saara dynamic content directly HTML source code me likha hoga!

---

### 🎉 Badhai ho!
Aapka SEO Indexing aur Social Preview system ab ekdm state-of-the-art modern architecture ki tarah shared hosting par dynamic chal raha hai. Kisi bhi query ke liye feel free to ask!
