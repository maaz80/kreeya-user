// hooks/useH1Data.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function useH1Data() {
     const [h1Tags, setH1Tags] = useState({});
     const location = useLocation();

     useEffect(() => {
          const fetchH1Data = async () => {
               try {
                    // Remove leading slash and get page name
                    const pageName = location.pathname.replace('/', '') || 'home';
                    const res = await fetch(`${API_URL}/h1/page/${pageName}`);
                    const data = await res.json();
                    setH1Tags(data);
               } catch (error) {
                    console.error('Error fetching H1 data:', error);
               }
          };

          fetchH1Data();
     }, [location]);

     return h1Tags;
}