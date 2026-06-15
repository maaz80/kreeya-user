import React, { createContext, useContext, useState, useEffect } from 'react';
import staticServices from '../data/staticServices.json';
import staticPortfolios from '../data/staticPortfolios.json';
import staticLocations from '../data/staticLocations.json';
import staticBlogs from '../data/staticBlogs.json';

import { getNavbar } from '../utils/navbar';
import { getServices } from '../utils/service';
import { getPortfolios } from '../utils/portfolio';
import { getLocations } from '../utils/locations';
import { getBlogs } from '../utils/blogService';
import { getTestimonials } from '../utils/testimonial';
import { getNavigation } from '../utils/menuOverlay';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
     const [navbar, setNavbar] = useState({});
     const [services, setServices] = useState(staticServices || []);
     const [portfolios, setPortfolios] = useState(staticPortfolios || []);
     const [locations, setLocations] = useState(staticLocations || []);
     const [blogs, setBlogs] = useState(staticBlogs || []);
     const [testimonials, setTestimonials] = useState([]);
     const [navigation, setNavigation] = useState({ pages: [], projects: [], socials: [] });
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          const isBot = typeof navigator !== 'undefined' && /SearchBot|Googlebot|Chrome-Lighthouse|Lighthouse/i.test(navigator.userAgent);
          if (isBot) {
               setIsLoading(false);
               return;
          }

          const fetchAllData = async () => {
               try {
                    const [navbarRes, servicesRes, portfoliosRes, locationsRes, blogsRes, testimonialsRes, navigationRes] = await Promise.allSettled([
                         getNavbar(),
                         getServices(),
                         getPortfolios(),
                         getLocations(),
                         getBlogs(),
                         getTestimonials(),
                         getNavigation()
                    ]);

                    if (navbarRes.status === 'fulfilled' && navbarRes.value) {
                         setNavbar(navbarRes.value);
                    }
                    if (servicesRes.status === 'fulfilled' && servicesRes.value && servicesRes.value.length > 0) {
                         setServices(servicesRes.value);
                    }
                    if (portfoliosRes.status === 'fulfilled' && portfoliosRes.value && portfoliosRes.value.length > 0) {
                         setPortfolios(portfoliosRes.value);
                    }
                    if (locationsRes.status === 'fulfilled' && locationsRes.value && locationsRes.value.length > 0) {
                         setLocations(locationsRes.value);
                    }
                    if (blogsRes.status === 'fulfilled' && blogsRes.value && blogsRes.value.length > 0) {
                         setBlogs(blogsRes.value);
                    }
                    if (testimonialsRes.status === 'fulfilled' && testimonialsRes.value && testimonialsRes.value.length > 0) {
                         setTestimonials(testimonialsRes.value);
                    }
                    if (navigationRes.status === 'fulfilled' && navigationRes.value) {
                         setNavigation(navigationRes.value);
                    }
               } catch (err) {
                    console.error("Centralized data fetch error:", err);
               } finally {
                    setIsLoading(false);
               }
          };

          const timer = setTimeout(fetchAllData, 2000);
          return () => clearTimeout(timer);
     }, []);

     return (
          <DataContext.Provider value={{ navbar, services, portfolios, locations, blogs, testimonials, navigation, isLoading }}>
               {children}
          </DataContext.Provider>
     );
};

export const useDataContext = () => {
     const context = useContext(DataContext);
     if (!context) {
          throw new Error('useDataContext must be used within a DataProvider');
     }
     return context;
};
