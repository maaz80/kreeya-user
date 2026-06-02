import staticLocations from '../data/staticLocations.json';

const API = import.meta.env.VITE_API_URL;
let cachedLocations = staticLocations || [];
let hasFetchedLocations = false;

export const getLocations = async (forceRefresh = false) => {
     if (hasFetchedLocations && !forceRefresh && cachedLocations && cachedLocations.length > 0) {
          return cachedLocations;
     }
     try {
          const res = await fetch(`${API}/locations`);
          if (res.ok) {
               cachedLocations = await res.json();
               hasFetchedLocations = true;
          }
          return cachedLocations;
     } catch (err) {
          console.error("Error fetching locations:", err);
          return cachedLocations || [];
     }
};