// hooks/useH1Data.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Module-level cache — per pageName, ek hi API call per session
const h1Cache = {};

// Frontend URL → backend pageName mapping (jahan URL aur pageName alag hain)
const urlToPageName = {
     'category/blogs': 'blogs',
};

export function useH1Data() {
     const location = useLocation();

     // Remove leading/trailing slashes
     const rawPageName = location.pathname.replace(/^\/|\/$/g, '') || 'home';

     // Map to correct backend pageName
     const pageName = urlToPageName[rawPageName] || rawPageName;

     const [h1Tags, setH1Tags] = useState(h1Cache[pageName] || {});

     useEffect(() => {
          // Cache mein already hai toh fetch skip
          if (h1Cache[pageName]) {
               setH1Tags(h1Cache[pageName]);
               return;
          }

          // Reset state to avoid showing stale headings from the previous page
          setH1Tags({});

          const fetchH1Data = async () => {
               try {
                    const res = await fetch(`${API_URL}/h1/page/${pageName}`);
                    if (res.ok) {
                         const data = await res.json();
                         h1Cache[pageName] = data;
                         setH1Tags(data);
                    }
               } catch (error) {
                    console.error('Error fetching H1 data:', error);
               }
          };

          fetchH1Data();
     }, [pageName]);

     return h1Tags;
}