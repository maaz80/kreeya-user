const API = import.meta.env.VITE_API_URL;
let cachedNavigation = null;

export const getNavigation = async () => {
     if (cachedNavigation) {
          return cachedNavigation;
     }

     try {

          const res = await fetch(`${API}/navigation`);

          if (!res.ok) throw new Error("API error");

          const data = await res.json();

          cachedNavigation = {
               pages: data.pages || [],
               projects: data.projects || [],
               socials: data.socials || []
          };

          return cachedNavigation;

     } catch (error) {

          console.error("Navigation fetch error:", error);

          return {
               pages: [],
               projects: [],
               socials: []
          };

     }

};