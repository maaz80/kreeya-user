// hooks/useMenuH2Data.js
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let menuCache = null;

export function useMenuH2Data() {
     const [menuH2Tags, setMenuH2Tags] = useState(menuCache || {});

     useEffect(() => {
          if (menuCache) {
               setMenuH2Tags(menuCache);
               return;
          }

          const fetchMenuH2Data = async () => {
               try {
                    const res = await fetch(`${API_URL}/h2/page/menu_component`);
                    if (res.ok) {
                         const data = await res.json();
                         menuCache = data;
                         setMenuH2Tags(data);
                    }
               } catch (error) {
                    console.error('Error fetching menu H2 data:', error);
               }
          };

          fetchMenuH2Data();
     }, []);

     return menuH2Tags;
}