import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { matchesRouteSlug } from "../utils/slug";
import staticPagesSeo from "../data/staticPagesSeo.json";

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
     "blogs-details",
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
               // 1. Dynamically import split json files to keep initial bundle size tiny
               const [
                    { default: localLocations },
                    { default: localServices },
                    { default: localBlogs }
               ] = await Promise.all([
                    import("../data/staticLocations.json"),
                    import("../data/staticServices.json"),
                    import("../data/staticBlogs.json")
               ]);

               // Try to resolve from local static split files instantly (0ms)
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

               const blogItem = localBlogs.find((blog) => matchesRouteSlug(blog, slug));
               if (blogItem) {
                    return {
                         title: blogItem.seoTitle || blogItem.title,
                         description: blogItem.seoDescription || blogItem.content?.replace(/<[^>]+>/g, '').slice(0, 150),
                         keywords: blogItem.seoKeywords || ""
                    };
               }

               // 2. Fallback to dynamic live API calls in case sitemap/build is not updated yet
               try {
                    const [allLocations, allServices, allBlogs] = await Promise.all([
                         normalizeListResponse(await fetchJson(`${API_URL}/locations`)),
                         normalizeListResponse(await fetchJson(`${API_URL}/services`)),
                         normalizeListResponse(await fetchJson(`${API_URL}/blogs`))
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

                    const dynamicBlogItem = allBlogs.find((blog) => matchesRouteSlug(blog, slug));
                    if (dynamicBlogItem) {
                         return {
                              title: dynamicBlogItem.seoTitle || dynamicBlogItem.title,
                              description: dynamicBlogItem.seoDescription || dynamicBlogItem.content?.replace(/<[^>]+>/g, '').slice(0, 150),
                              keywords: dynamicBlogItem.seoKeywords || ""
                         };
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

                    // 1. Handle Blogs Details Details (dynamic blog post page)
                    if (segments[0] === "blogs-details" && segments[1]) {
                         const slug = segments[1];
                         const cacheKey = `blog:${slug}`;

                         // If already in runtime cache, set it instantly
                         if (cache.has(cacheKey)) {
                              const blog = cache.get(cacheKey);
                              setSEO(blog.seoTitle || blog.title, blog.seoDescription || blog.content?.slice(0, 150), blog.seoKeywords || "");
                              
                              // Silent background update to check if there are CMS changes
                              fetchJson(`${API_URL}/blogs/${slug}`).then((updatedBlog) => {
                                   if (isActive) {
                                        cache.set(cacheKey, updatedBlog);
                                        setSEO(updatedBlog.seoTitle || updatedBlog.title, updatedBlog.seoDescription || updatedBlog.content?.slice(0, 150), updatedBlog.seoKeywords || "");
                                   }
                              }).catch(err => console.warn("Background blog SEO update failed:", err));
                              return;
                         }

                         // Try loading from local staticBlogs first (0ms)
                         try {
                              const { default: staticBlogs } = await import("../data/staticBlogs.json");
                              const blogItem = staticBlogs.find((blog) => matchesRouteSlug(blog, slug));
                              if (blogItem) {
                                   setSEO(
                                        blogItem.seoTitle || blogItem.title,
                                        blogItem.seoDescription || blogItem.content?.replace(/<[^>]+>/g, '').slice(0, 150),
                                        blogItem.seoKeywords || ""
                                   );
                              }
                         } catch (e) {
                              console.warn("Could not read from staticBlogs", e);
                         }

                         const blog = await fetchJson(`${API_URL}/blogs/${slug}`);
                         cache.set(cacheKey, blog);
                         setSEO(blog.seoTitle || blog.title, blog.seoDescription || blog.content?.slice(0, 150), blog.seoKeywords || "");
                         return;
                    }

                    // 2. Handle Location / Service / Portfolio Category (single dynamic segment path)
                    if (segments.length === 1 && segments[0] && !RESERVED_PAGE_PATHS.has(segments[0])) {
                         const slug = segments[0];
                         const cacheKey = `item:${slug}`;

                         if (cache.has(cacheKey)) {
                              const itemSeo = cache.get(cacheKey);
                              setSEO(itemSeo.title || DEFAULT_TITLE, itemSeo.description || DEFAULT_DESCRIPTION, itemSeo.keywords || "");
                              
                              // Silent background revalidation
                              resolveItemSlugSeo(slug).then((updatedSeo) => {
                                   if (updatedSeo && isActive) {
                                        cache.set(cacheKey, updatedSeo);
                                        setSEO(updatedSeo.title || DEFAULT_TITLE, updatedSeo.description || DEFAULT_DESCRIPTION, updatedSeo.keywords || "");
                                   }
                              }).catch(() => {});
                              return;
                         }

                         // Check if it is a portfolio category slug from cache to prevent API roundtrips
                         const { default: staticPortfolios } = await import("../data/staticPortfolios.json");
                         const localPortfolios = staticPortfolios || [];
                         const isPortfolioCategory = localPortfolios.some((p) => {
                              const pSlug = p.name.toLowerCase().replace(/\s+/g, '-');
                              return pSlug === slug;
                         });

                         if (isPortfolioCategory) {
                              const cacheKeyPort = "page:portfolios";
                              
                              // Load from runtime cache or fall back to staticPagesSeo (0ms!)
                              const cachedSeo = cache.get(cacheKeyPort) || staticPagesSeo["portfolios"];
                              if (cachedSeo) {
                                   setSEO(cachedSeo.title || DEFAULT_TITLE, cachedSeo.description || DEFAULT_DESCRIPTION, cachedSeo.keywords || "");
                              }

                              // Silent background fetch to update the SEO from CMS
                              fetchJson(`${API_URL}/pages/portfolios/seo`).then((seo) => {
                                   if (isActive) {
                                        cache.set(cacheKeyPort, seo);
                                        setSEO(seo.title || DEFAULT_TITLE, seo.description || DEFAULT_DESCRIPTION, seo.keywords || "");
                                   }
                              }).catch(err => console.warn("Background portfolios SEO fetch failed:", err));
                              return;
                         }

                         // Resolve from static cache first (0ms)
                         const itemSeo = await resolveItemSlugSeo(slug);
                         if (itemSeo) {
                              cache.set(cacheKey, itemSeo);
                              setSEO(itemSeo.title || DEFAULT_TITLE, itemSeo.description || DEFAULT_DESCRIPTION, itemSeo.keywords || "");
                              return;
                         }

                         // Fallback to not-found page SEO cache
                         const notFoundSeo = cache.get("page:not-found") || staticPagesSeo["not-found"] || {};
                         setSEO(
                              notFoundSeo.title || DEFAULT_TITLE,
                              notFoundSeo.description || DEFAULT_DESCRIPTION,
                              notFoundSeo.keywords || ""
                         );

                         // Silent background fetch for not found page SEO
                         fetchJson(`${API_URL}/pages/not-found/seo`).then((seo) => {
                              if (isActive) {
                                   cache.set("page:not-found", seo);
                                   setSEO(seo.title || DEFAULT_TITLE, seo.description || DEFAULT_DESCRIPTION, seo.keywords || "");
                               }
                         }).catch(() => {});
                         return;
                    }

                    // 3. Handle Static Pages
                    const path = !segments.length
                         ? "home"
                         : segments[0] === "category" && segments[1] === "blogs"
                              ? "blogs"
                              : isMultiSegmentPath || !STATIC_PAGE_SEO_IDS.has(segments[0])
                                   ? "not-found"
                                   : segments[0];
                    const cacheKey = `page:${path}`;

                    // Set SEO instantly from static pages SEO cache or runtime cache (0ms!)
                    const initialSeo = cache.get(cacheKey) || staticPagesSeo[path];
                    if (initialSeo) {
                         setSEO(initialSeo.title || DEFAULT_TITLE, initialSeo.description || DEFAULT_DESCRIPTION, initialSeo.keywords || "");
                    }

                    // Silent background fetch to check for CMS updates
                    fetchJson(`${API_URL}/pages/${path}/seo`).then((seo) => {
                         if (isActive) {
                              cache.set(cacheKey, seo);
                              setSEO(seo.title || DEFAULT_TITLE, seo.description || DEFAULT_DESCRIPTION, seo.keywords || "");
                         }
                    }).catch((err) => {
                         console.warn(`Silent background SEO fetch failed for page ${path}:`, err);
                    });
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
