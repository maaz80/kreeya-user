const API = import.meta.env.VITE_API_URL;
let cachedPortfolios = null;

export const getPortfolios = async () => {
  if (cachedPortfolios) {
    return cachedPortfolios;
  }
  try {
    const res = await fetch(`${API}/portfolios`);
    if (!res.ok) throw new Error("API error");
    cachedPortfolios = await res.json();
    return cachedPortfolios;
  } catch (err) {
    console.error("Error fetching portfolios:", err);
    return [];
  }
};
