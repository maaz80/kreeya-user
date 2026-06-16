// hooks/useH3Data.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Module-level cache — per pageName, single API call per session
const h3Cache = {};

// Frontend URL → backend pageName mapping (jahan URL aur pageName alag hain)
const urlToPageName = {
     'category/blogs': 'blogs',
};

export function useh3Data() {
     const location = useLocation();

     // Remove leading/trailing slashes
     const rawPageName = location.pathname.replace(/^\/|\/$/g, '') || 'home';

     // Map to correct backend pageName
     const pageName = urlToPageName[rawPageName] || rawPageName;

     const [h3Tags, seth3Tags] = useState(h3Cache[pageName] || {});

     useEffect(() => {
          // If already in cache, skip fetching
          if (h3Cache[pageName]) {
               seth3Tags(h3Cache[pageName]);
               return;
          }

          // Reset state to avoid showing stale headings from the previous page
          seth3Tags({});

          const fetchh3Data = async () => {
               try {
                    const res = await fetch(`${API_URL}/h3/page/${pageName}`);
                    if (res.ok) {
                         const data = await res.json();
                         h3Cache[pageName] = data;
                         seth3Tags(data);
                    }
               } catch (error) {
                    console.error('Error fetching H3 data:', error);
               }
          };

          fetchh3Data();
     }, [pageName]);

     return h3Tags;
}