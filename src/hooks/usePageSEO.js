import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { matchesRouteSlug } from "../utils/slug";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
const DEFAULT_TITLE = "Kreeya Design | Social Media & Web Design/Development Agency";
const DEFAULT_DESCRIPTION =
     "AI-powered creative services for enterprises and scale faster with on-demand design, marketing creatives, and flexible solutions that boost growth and performance.";

const normalizeListResponse = (data) => {
     if (Array.isArray(data)) return data;
     if (Array.isArray(data?.data)) return data.data;
     if (Array.isArray(data?.locations)) return data.locations;
     if (Array.isArray(data?.services)) return data.services;
     return [];
};

const getItemSeo = (item) => ({
     title: item?.seoTitle || item?.metaTitle || item?.title || item?.hero?.title,
     description:
          item?.seoDescription ||
          item?.metaDescription ||
          item?.description ||
          item?.hero?.description ||
          item?.page?.help?.description,
     keywords: item?.keywords || item?.seoKeywords || "",
});

const RESERVED_PAGE_PATHS = new Set([
     "landing-page",
     "portfolio-beyekls",
     "portfolio-daccord",
     "portfolio-coinpay",
     "portfolio-nectar",
     "contact-us",
     "blogs",
     "about-us",
     "blogs_details",
     "location",
     "policy",
     "disclaimer",
     "contact-us",
     "portfolios",
     "services"
]);

const STATIC_PAGE_SEO_IDS = new Set([
     "home",
     "landing-page",
     "contact-us",
     "blogs",
     "about-us",
     "location",
     "policy",
     "disclaimer",
     "portfolio-beyekls",
     "portfolio-daccord",
     "portfolio-coinpay",
     "portfolio-nectar",
     "not-found",
     "portfolios",
     "services"
]);

// Helper: get or create a <meta> tag by attribute selector
const getOrCreateMeta = (attrName, attrValue) => {
     let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
     if (!el) {
          el = document.createElement("meta");
          el.setAttribute(attrName, attrValue);
          document.head.appendChild(el);
     }
     return el;
};

export function usePageSEO() {
     const location = useLocation();
     const seoCache = useRef(new Map());

     useEffect(() => {
          let isActive = true;

          const setSEO = (title, description, keywords) => {
               if (!isActive) return;

               const finalTitle = title || DEFAULT_TITLE;
               const finalDescription = description || DEFAULT_DESCRIPTION;
               const canonicalUrl = `https://kreeyadesign.com${location.pathname}`;
               const logoUrl = "https://kreeyadesign.com/favicon.svg";

               // ================= BASIC SEO =================
               document.title = finalTitle;

               let metaDesc = document.querySelector('meta[name="description"]');

               if (!metaDesc) {
                    metaDesc = document.createElement("meta");
                    metaDesc.name = "description";
                    document.head.appendChild(metaDesc);
               }

               metaDesc.setAttribute("content", finalDescription);

               const metaKeywords = getOrCreateMeta("name", "keywords");
               metaKeywords.setAttribute("content", keywords || "");

               // ================= CANONICAL =================
               let canonical = document.querySelector('link[rel="canonical"]');

               if (!canonical) {
                    canonical = document.createElement("link");
                    canonical.setAttribute("rel", "canonical");
                    document.head.appendChild(canonical);
               }

               canonical.setAttribute("href", canonicalUrl);

               // ================= OPEN GRAPH =================
               getOrCreateMeta("property", "og:type")
                    .setAttribute("content", "website");

               getOrCreateMeta("property", "og:title")
                    .setAttribute("content", finalTitle);

               getOrCreateMeta("property", "og:description")
                    .setAttribute("content", finalDescription);

               getOrCreateMeta("property", "og:url")
                    .setAttribute("content", canonicalUrl);

               getOrCreateMeta("property", "og:image")
                    .setAttribute("content", logoUrl);

               // ================= TWITTER =================
               getOrCreateMeta("name", "twitter:card")
                    .setAttribute("content", "summary_large_image");

               getOrCreateMeta("name", "twitter:site")
                    .setAttribute("content", "Kreeya Design");

               getOrCreateMeta("name", "twitter:creator")
                    .setAttribute("content", "Kreeya Design");

               getOrCreateMeta("name", "twitter:title")
                    .setAttribute("content", finalTitle);

               getOrCreateMeta("name", "twitter:description")
                    .setAttribute("content", finalDescription);

               getOrCreateMeta("name", "twitter:image")
                    .setAttribute("content", logoUrl);
          };

          const fetchJson = async (url) => {
               const res = await fetch(url);

               if (!res.ok) {
                    throw new Error(`SEO API failed: ${res.status} ${res.statusText}`);
               }

               return res.json();
          };

          const resolveItemSlugSeo = async (slug) => {
               // 1. Dynamically import staticData to keep initial bundle size tiny
               const { default: staticData } = await import("../data/staticData.json");

               // Try to resolve from local staticData instantly (0ms)
               const localLocations = staticData.locations || [];
               const localServices = staticData.services || [];

               const locationItem = localLocations
                    .flatMap((location) => location.items || [])
                    .find((item) => matchesRouteSlug(item, slug));
               if (locationItem) {
                    return getItemSeo(locationItem);
               }

               const serviceItem = localServices
                    .flatMap((service) => service.items || [])
                    .find((item) => matchesRouteSlug(item, slug));
               if (serviceItem) {
                    return getItemSeo(serviceItem);
               }

               // 2. Fallback to dynamic live API calls in case sitemap/build is not updated yet
               try {
                    const [allLocations, allServices] = await Promise.all([
                         normalizeListResponse(await fetchJson(`${API_URL}/locations`)),
                         normalizeListResponse(await fetchJson(`${API_URL}/services`)),
                    ]);

                    const dynamicLocationItem = allLocations
                         .flatMap((location) => location.items || [])
                         .find((item) => matchesRouteSlug(item, slug));
                    if (dynamicLocationItem) {
                         return getItemSeo(dynamicLocationItem);
                    }

                    const dynamicServiceItem = allServices
                         .flatMap((service) => service.items || [])
                         .find((item) => matchesRouteSlug(item, slug));
                    if (dynamicServiceItem) {
                         return getItemSeo(dynamicServiceItem);
                    }
               } catch (err) {
                    console.error("Background SEO fetch failed:", err);
               }

               return null;
          };

          const updateSEO = async () => {
               try {
                    const segments = location.pathname.split("/").filter(Boolean);
                    const cache = seoCache.current;
                    const isMultiSegmentPath = segments.length > 1;

                    if (segments[0] === "blogs_details" && segments[1]) {
                         const slug = segments[1];
                         const cacheKey = `blog:${slug}`;

                         if (cache.has(cacheKey)) {
                              const blog = cache.get(cacheKey);
                              setSEO(blog.seoTitle || blog.title, blog.seoDescription || blog.content?.slice(0, 150), blog.seoKeywords || "");
                              return;
                         }

                         const blog = await fetchJson(`${API_URL}/blogs/${slug}`);
                         cache.set(cacheKey, blog);
                         setSEO(blog.seoTitle || blog.title, blog.seoDescription || blog.content?.slice(0, 150), blog.seoKeywords || "");
                         return;
                    }



                    // For Location and Service 
                    if (segments.length === 1 && segments[0] && !RESERVED_PAGE_PATHS.has(segments[0])) {
                         const slug = segments[0];
                         const cacheKey = `item:${slug}`;

                         if (cache.has(cacheKey)) {
                              const itemSeo = cache.get(cacheKey);
                              setSEO(itemSeo.title || DEFAULT_TITLE, itemSeo.description || DEFAULT_DESCRIPTION, itemSeo.keywords || "");
                              return;
                         }

                         const itemSeo = await resolveItemSlugSeo(slug);
                         if (itemSeo) {
                              cache.set(cacheKey, itemSeo);
                              setSEO(itemSeo.title || DEFAULT_TITLE, itemSeo.description || DEFAULT_DESCRIPTION, itemSeo.keywords || "");
                              return;
                         }

                         const notFoundSeo = await fetchJson(`${API_URL}/pages/not-found/seo`);
                         cache.set("page:not-found", notFoundSeo);
                         setSEO(
                              notFoundSeo.title || DEFAULT_TITLE,
                              notFoundSeo.description || DEFAULT_DESCRIPTION,
                              notFoundSeo.keywords || ""
                         );
                         return;
                    }

                    const path = !segments.length
                         ? "home"
                         : isMultiSegmentPath || !STATIC_PAGE_SEO_IDS.has(segments[0])
                              ? "not-found"
                              : segments[0];
                    const cacheKey = `page:${path}`;

                    if (cache.has(cacheKey)) {
                         const seo = cache.get(cacheKey);
                         setSEO(seo.title || "Kreeya Design", seo.description || "AI-powered creative services...", seo.keywords || "");
                         return;
                    }

                    const seo = await fetchJson(`${API_URL}/pages/${path}/seo`);
                    cache.set(cacheKey, seo);
                    setSEO(seo.title || DEFAULT_TITLE, seo.description || DEFAULT_DESCRIPTION, seo.keywords || "");
               } catch (error) {
                    console.error("SEO error:", error);
               }
          };

          updateSEO();

          return () => {
               isActive = false;
          };
     }, [location.pathname]);
}
