const API = import.meta.env.VITE_API_URL;
let cachedVideos = null;

export const getVideos = async () => {
     if (cachedVideos) {
          return cachedVideos;
     }
     try {
          const res = await fetch(`${API}/opening-video`);
          cachedVideos = await res.json();
          return cachedVideos;
     } catch (err) {
          console.error(err);
          return [];
     }
};