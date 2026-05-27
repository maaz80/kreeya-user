const API = import.meta.env.VITE_API_URL;
let cachedLocations = null;

export const getLocations = async () => {
     if (cachedLocations) {
          return cachedLocations;
     }
     try {
          const res = await fetch(`${API}/locations`);
          cachedLocations = await res.json();
          return cachedLocations;
     } catch (err) {
          console.error(err);
          return [];
     }
};