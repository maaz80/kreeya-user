const API = import.meta.env.VITE_API_URL;
let cachedHeros = null;

export const getHeros = async () => {
     if (cachedHeros) {
          return cachedHeros;
     }
     try {
          const res = await fetch(`${API}/hero`);
          cachedHeros = await res.json();
          return cachedHeros;
     } catch (err) {
          console.error(err);
          return [];
     }
};