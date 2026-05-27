const API = import.meta.env.VITE_API_URL;
let cachedTestimonials = null;

export const getTestimonials = async () => {
     if (cachedTestimonials) {
          return cachedTestimonials;
     }
     try {
          const res = await fetch(`${API}/testimonials`);
          cachedTestimonials = await res.json();
          return cachedTestimonials;
     } catch (err) {
          console.error(err);
          return [];
     }
};