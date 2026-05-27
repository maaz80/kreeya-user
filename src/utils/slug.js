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
