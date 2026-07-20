const API = import.meta.env.VITE_API_URL;
let cachedBlogs = null;

export const getBlogs = async () => {
     if (import.meta.env.PROD && cachedBlogs) {
          return cachedBlogs;
     }
     try {
          const res = await fetch(`${API}/blogs`);
          cachedBlogs = await res.json();
          return cachedBlogs;
     } catch (err) {
          console.error(err);
          return [];
     }
};
export const getBlogBySlug = async (slug) => {
     try {
          const res = await fetch(`${API}/blogs/${slug}`);

          if (!res.ok) {
               throw new Error("Blog not found");
          }

          return await res.json();

     } catch (err) {
          console.error(err);
          return null;
     }
};