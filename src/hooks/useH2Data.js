// hooks/useH2Data.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function useH2Data() {
     const [h2Tags, setH2Tags] = useState({});
     const location = useLocation();

     useEffect(() => {
          const fetchH2Data = async () => {
               try {
                    // Remove leading slash and get page name
                    const pageName = location.pathname.replace('/', '') || 'home';
                    const res = await fetch(`${API_URL}/h2/page/${pageName}`);
                    const data = await res.json();
                    setH2Tags(data);
               } catch (error) {
                    console.error('Error fetching H2 data:', error);
               }
          };

          fetchH2Data();
     }, [location]);

     return h2Tags;
}