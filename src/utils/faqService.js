const API = import.meta.env.VITE_API_URL;
let cachedFaqs = null;

export const getFaqs = async () => {
     if (cachedFaqs) {
          return cachedFaqs;
     }

     try {

          const res = await fetch(`${API}/faqs`);
          cachedFaqs = await res.json();
          return cachedFaqs;

     } catch (err) {

          console.error(err);
          return [];

     }

};