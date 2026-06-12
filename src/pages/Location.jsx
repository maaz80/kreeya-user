import React, { lazy, Suspense, useEffect, useState } from 'react'
import Hero from '../components/Location/Hero'
// import HomeNavbar from '../components/HomeNavbar'
import HomeNavbarV2 from '../components/HomeNavbarV2'
import '../CSS/Location.css'
import { getLocations } from '../utils/locations'
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'
import { matchesRouteSlug } from '../utils/slug';
import useFaq from '../hooks/useFaq'

//  Lazy sections
const HelpSection = lazy(() => import('../components/Location/HelpSection'))
const Services = lazy(() => import('../components/Location/Services'))
const WhyKreeya = lazy(() => import('../components/Location/WhyKreeya'))
const Testimonial = lazy(() => import('../components/Location/Testimonial'))
const YouMayLike = lazy(() => import('../components/YouMayLike'))
const FaqSection = lazy(() => import('../components/Location/LocationFaq'))

const Location = () => {
  const { itemSlug } = useParams();
  const { faqData } = useFaq();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // 1. Asynchronously fetch fallback data from dynamic staticLocations import
    import('../data/staticLocations.json').then((module) => {
      const localLocations = module.default || [];
      for (const l of localLocations) {
        const found = l.items?.find((i) => matchesRouteSlug(i, itemSlug));
        if (found) {
          setLocation((prev) => prev || found);
          break;
        }
      }
    }).catch((err) => {
      console.error("Dynamic staticLocations load failed:", err);
    });

    // 2. Asynchronously fetch latest data in background silently
    const fetchSingleService = async () => {
      try {
        const allLocations = await getLocations();
        let selectedItem = null;

        for (const l of allLocations) {
          const found = l.items?.find(
            (i) => matchesRouteSlug(i, itemSlug)
          );

          if (found) {
            selectedItem = found;
            break;
          }
        }
        if (selectedItem) {
          setLocation(selectedItem);
        }
      } catch (err) {
        console.error("Background location fetch failed:", err);
      }
    };

    if (itemSlug) fetchSingleService();

  }, [itemSlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [itemSlug])

  return (
    <div>
      {/* HERO (no lazy) */}
      <div id='location-form'>
        {/* <HomeNavbar /> */}
        <HomeNavbarV2 />
        <Hero location={location} />
      </div>

      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <HelpSection location={location} />
      </Suspense>

      <Suspense fallback={null}>
        <Services location={location} />
      </Suspense>

      <Suspense fallback={null}>
        <WhyKreeya location={location} />
      </Suspense>

      <Suspense fallback={null}>
        <Testimonial />
      </Suspense>

      <div className='relative max-w-310 mx-auto plus-jakarta-sans flex flex-col justify-center items-center px-4'>
        <Suspense fallback={null}>
          <YouMayLike />
        </Suspense>

        <div className="py-24">
          <Suspense fallback={<div className="min-h-75" />}>
            <FaqSection location={location} faqData={faqData} />
          </Suspense>
        </div>
      </div>

    </div>
  )
}

export default Location
