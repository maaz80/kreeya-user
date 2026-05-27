const API = import.meta.env.VITE_API_URL;
let cachedNavbar = null;

export const getNavbar = async () => {
     if (cachedNavbar) {
          return cachedNavbar;
     }
     try {
          const res = await fetch(`${API}/navbar`);
          cachedNavbar = await res.json();
          return cachedNavbar;
     } catch (err) {
          console.error(err);
          return [];
     }
};