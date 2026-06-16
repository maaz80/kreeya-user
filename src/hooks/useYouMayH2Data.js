// hooks/useYouMayH2Data.js
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let youMayCache = null;

export function useYouMayH2Data() {
     const [youMayH2Tags, setYouMayH2Tags] = useState(youMayCache || {});

     useEffect(() => {
          if (youMayCache) {
               setYouMayH2Tags(youMayCache);
               return;
          }

          const fetchYouMayH2Data = async () => {
               try {
                    const res = await fetch(`${API_URL}/h2/page/you_may_like_component`);
                    if (res.ok) {
                         const data = await res.json();
                         youMayCache = data;
                         setYouMayH2Tags(data);
                    }
               } catch (error) {
                    console.error('Error fetching you may like H2 data:', error);
               }
          };

          fetchYouMayH2Data();
     }, []);

     return youMayH2Tags;
}