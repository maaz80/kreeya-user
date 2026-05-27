// hooks/useh3Data.js
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function useh3Data() {
     const [h3Tags, seth3Tags] = useState({});

     useEffect(() => {
          const fetchh3Data = async () => {
               try {
                    // Fixed: '' page ka data hamesha fetch karega
                    const res = await fetch(`${API_URL}/h3/page/home`);
                    const data = await res.json();
                    seth3Tags(data);
               } catch (error) {
                    console.error('Error fetching  h3 data:', error);
               }
          };

          fetchh3Data();
     }, []);

     return h3Tags;
}