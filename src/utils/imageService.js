const API = import.meta.env.VITE_API_URL;
let cachedImages = null;

export const getImages = async () => {
     if (cachedImages) {
          return cachedImages;
     }
     try {
          const res = await fetch(`${API}/images`);
          cachedImages = await res.json();
          return cachedImages;
     } catch (error) {
          console.error("Image fetch error:", error);
          return [];
     }
};