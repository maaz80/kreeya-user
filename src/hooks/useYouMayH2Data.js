// hooks/useMenuH2Data.js
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function useYouMayH2Data() {
     const [youMayH2Tags, setYouMayH2Tags] = useState({});

     useEffect(() => {
          const fetchYouMayH2Data = async () => {
               try {
                    // Fixed: 'menu' page ka data hamesha fetch karega
                    const res = await fetch(`${API_URL}/h2/page/you_may_like_component`);
                    const data = await res.json();
                    setYouMayH2Tags(data);
               } catch (error) {
                    console.error('Error fetching you may like H2 data:', error);
               }
          };

          fetchYouMayH2Data();
     }, []); // Empty dependency array - sirf ek baar fetch hoga

     return youMayH2Tags;
}