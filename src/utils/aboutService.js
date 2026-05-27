const API = import.meta.env.VITE_API_URL;
let cachedAbout = null;

export const getAbout = async () => {
     if (cachedAbout) {
          return cachedAbout;
     }
     try {
          const res = await fetch(`${API}/about`);
          cachedAbout = await res.json();
          return cachedAbout;
     } catch (err) {
          console.error(err);
          return [];
     }
};