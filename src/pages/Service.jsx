import React, { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import Hero from '../components/Service/Hero'
import HomeNavbar from '../components/HomeNavbar'
import '../CSS/Location.css'
import { useParams } from 'react-router-dom';
import { getServices } from '../utils/service'
import { Helmet } from 'react-helmet-async';
import { matchesRouteSlug } from '../utils/slug';
import staticData from '../data/staticData.json';

//  Lazy sections
const HelpSection = lazy(() => import('../components/Service/HelpSection'))
const Services = lazy(() => import('../components/Service/Services'))
const WhyKreeya = lazy(() => import('../components/Service/WhyKreeya'))
const Testimonial = lazy(() => import('../components/Service/Testimonial'))
const YouMayLike = lazy(() => import('../components/YouMayLike'))
const FaqSection = lazy(() => import('../components/Location/LocationFaq'))

const Service = () => {
  const { itemSlug } = useParams();

  const getLocalService = () => {
    const localServices = staticData.services || [];
    for (const s of localServices) {
      const found = s.items?.find((i) => matchesRouteSlug(i, itemSlug));
      if (found) return found;
    }
    return null;
  };

  const [service, setService] = useState(getLocalService);

  useEffect(() => {
    // 1. Sync from local staticData instantly (0ms)
    const localItem = getLocalService();
    if (localItem) {
      setService(localItem);
    }

    // 2. Asynchronously fetch latest data in background silently
    const fetchSingleService = async () => {
      try {
        const allServices = await getServices();
        let selectedItem = null;

        for (const s of allServices) {
          const found = s.items?.find(
            (i) => matchesRouteSlug(i, itemSlug)
          );

          if (found) {
            selectedItem = found;
            break;
          }
        }
        if (selectedItem) {
          setService(selectedItem);
        }
      } catch (err) {
        console.error("Background service fetch failed:", err);
      }
    };

    if (itemSlug) fetchSingleService();

  }, [itemSlug]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [itemSlug])

  return (
    <div>


      {/* HERO (no lazy) */}
      <div id='service-form'>
        <HomeNavbar />
        <Hero service={service} />
      </div>

      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <HelpSection service={service} />
      </Suspense>

      <div id="service-services-anchor">
        <Suspense fallback={null}>
          <Services service={service} />
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <WhyKreeya service={service} />
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
            <FaqSection location={service} />
          </Suspense>
        </div>
      </div>

    </div>
  )
}

export default Service
