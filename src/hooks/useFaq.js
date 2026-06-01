// hooks/useFaq.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Per-page cache — sirf jo fetch hua woh store hoga
const faqCache = new Map();

const useFaq = () => {
     const location = useLocation();
     const [faqData, setFaqData] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const loadFaq = async () => {
               try {
                    setLoading(true);

                    // Current page ka slug nikalo
                    const slug = location.pathname === '/'
                         ? 'home'
                         : location.pathname.replace(/\//g, '');

                    //  Cache mein hai toh fetch mat karo
                    if (faqCache.has(slug)) {
                         setFaqData(faqCache.get(slug));
                         return;
                    }

                    //  Sirf is page ka FAQ fetch karo
                    const data = await fetch(`${API_URL}/pages/${slug}/faq`)
                         .then(res => res.json())
                         .catch(() => null);

                    faqCache.set(slug, data || null);
                    setFaqData(data || null);

               } catch (error) {
                    console.error(error);
               } finally {
                    setLoading(false);
               }
          };

          loadFaq();
     }, [location.pathname]);

     return { faqData, loading };
};

export default useFaq;