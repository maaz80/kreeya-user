export const normalizeRouteSlug = (value = "") =>
     String(value)
          .toLowerCase()
          .trim()
          .replace(/_/g, "-");

export const matchesRouteSlug = (item, routeSlug) => {
     if (!item || !routeSlug) return false;

     return (
          String(item._id) === String(routeSlug) ||
          normalizeRouteSlug(item.slug) === normalizeRouteSlug(routeSlug)
     );
};

export const cleanHtmlLinks = (html) => {
     if (!html || typeof html !== "string") return html;

     return html.replace(/<a\s+([^>]*href=["']([^"']*)["'][^>]*)>/gi, (match, body, href) => {
          const isInternal = href.startsWith("/") || href.includes("kreeyadesign.com");
          
          if (isInternal) {
               let newBody = body
                    .replace(/\s*target=(["'])_blank\1/gi, "")
                    .replace(/\s*rel=(["'])noopener\s+noreferrer\1/gi, "")
                    .replace(/\s*rel=(["'])noreferrer\s+noopener\1/gi, "")
                    .replace(/\s*rel=(["'])(?:noopener|noreferrer)\1/gi, "");
               
               return `<a ${newBody}>`;
          }
          return match;
     });
};
