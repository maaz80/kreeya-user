const API = import.meta.env.VITE_API_URL;
let cachedServices = null;

export const getServices = async () => {
     if (cachedServices) {
          return cachedServices;
     }
     try {
          const res = await fetch(`${API}/services`);
          cachedServices = await res.json();
          return cachedServices;
     } catch (err) {
          console.error(err);
          return [];
     }
};