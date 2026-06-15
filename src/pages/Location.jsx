import React, { lazy, Suspense, useEffect, useMemo } from 'react'
import Hero from '../components/Location/Hero'
// import HomeNavbar from '../components/HomeNavbar'
import HomeNavbarV2 from '../components/HomeNavbarV2'
import '../CSS/Location.css'
import { useDataContext } from '../context/DataContext'
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
  const { locations } = useDataContext();

  const location = useMemo(() => {
    for (const l of locations) {
      const found = l.items?.find((i) => matchesRouteSlug(i, itemSlug));
      if (found) return found;
    }
    return null;
  }, [locations, itemSlug]);

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
