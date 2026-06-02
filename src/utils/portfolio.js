import staticPortfolios from '../data/staticPortfolios.json';

const API = import.meta.env.VITE_API_URL;
let cachedPortfolios = staticPortfolios || [];
let hasFetchedPortfolios = false;

export const getPortfolios = async (forceRefresh = false) => {
  if (hasFetchedPortfolios && !forceRefresh && cachedPortfolios && cachedPortfolios.length > 0) {
    return cachedPortfolios;
  }
  try {
    const res = await fetch(`${API}/portfolios`);
    if (res.ok) {
      cachedPortfolios = await res.json();
      hasFetchedPortfolios = true;
    }
    return cachedPortfolios;
  } catch (err) {
    console.error("Error fetching portfolios:", err);
    return cachedPortfolios || [];
  }
};
