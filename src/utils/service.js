import staticData from '../data/staticData.json';

const API = import.meta.env.VITE_API_URL;
let cachedServices = staticData.services || [];
let hasFetchedServices = false;

export const getServices = async (forceRefresh = false) => {
     if (hasFetchedServices && !forceRefresh && cachedServices && cachedServices.length > 0) {
          return cachedServices;
     }
     try {
          const res = await fetch(`${API}/services`);
          if (res.ok) {
               cachedServices = await res.json();
               hasFetchedServices = true;
          }
          return cachedServices;
     } catch (err) {
          console.error("Error fetching services:", err);
          return cachedServices || [];
     }
};