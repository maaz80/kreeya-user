const API = import.meta.env.VITE_API_URL;
let cachedFooter = null;

export const getFooter = async () => {
     if (cachedFooter) {
          return cachedFooter;
     }
     try {
          const res = await fetch(`${API}/footer`);
          cachedFooter = await res.json();
          return cachedFooter;
     } catch (err) {
          console.error(err);
          return [];
     }
};