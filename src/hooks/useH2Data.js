// hooks/useH2Data.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Module-level cache — per pageName, single API call per session
const h2Cache = {};

export function useH2Data() {
     const location = useLocation();

     // Remove leading/trailing slashes
     const pageName = location.pathname.replace(/^\/|\/$/g, '') || 'home';

     const [h2Tags, setH2Tags] = useState(h2Cache[pageName] || {});

     useEffect(() => {
          // If already in cache, skip fetching
          if (h2Cache[pageName]) {
               setH2Tags(h2Cache[pageName]);
               return;
          }

          // Reset state to avoid showing stale headings from the previous page
          setH2Tags({});

          const fetchH2Data = async () => {
               try {
                    const res = await fetch(`${API_URL}/h2/page/${pageName}`);
                    if (res.ok) {
                         const data = await res.json();
                         h2Cache[pageName] = data;
                         setH2Tags(data);
                    }
               } catch (error) {
                    console.error('Error fetching H2 data:', error);
               }
          };

          fetchH2Data();
     }, [pageName]);

     return h2Tags;
}