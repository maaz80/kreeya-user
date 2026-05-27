// hooks/useMenuH2Data.js
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function useMenuH2Data() {
     const [menuH2Tags, setMenuH2Tags] = useState({});

     useEffect(() => {
          const fetchMenuH2Data = async () => {
               try {
                    // Fixed: 'menu' page ka data hamesha fetch karega
                    const res = await fetch(`${API_URL}/h2/page/menu_component`);
                    const data = await res.json();
                    setMenuH2Tags(data);
               } catch (error) {
                    console.error('Error fetching menu H2 data:', error);
               }
          };

          fetchMenuH2Data();
     }, []); // Empty dependency array - sirf ek baar fetch hoga

     return menuH2Tags;
}