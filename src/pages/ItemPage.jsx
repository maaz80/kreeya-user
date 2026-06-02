import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLocations } from '../utils/locations'
import { getServices } from '../utils/service'
import { getPortfolios } from '../utils/portfolio'
import { getBlogs } from '../utils/blogService'
import Location from './Location'
import Service from './Service'
import Portfolios from './Portfolios'
import BlogDetails from './BlogDetails'
import NotFound from './404NotFound'
import { matchesRouteSlug } from '../utils/slug'

const ItemPage = () => {
     const { itemSlug } = useParams()
     const [pageType, setPageType] = useState(null)

     useEffect(() => {
          window.scrollTo(0, 0)
     }, [itemSlug])

     useEffect(() => {
          setPageType(null)
          const resolvePage = async () => {
               if (!itemSlug) {
                    setPageType('notfound')
                    return
               }

               if (itemSlug === 'portfolios') {
                    setPageType('portfolio')
                    return
               }

               // 1. Try to resolve from local static split files dynamically (0ms to 5ms)
               const [
                    { default: localLocations },
                    { default: localServices },
                    { default: localPortfolios },
                    { default: localBlogs }
               ] = await Promise.all([
                    import('../data/staticLocations.json'),
                    import('../data/staticServices.json'),
                    import('../data/staticPortfolios.json'),
                    import('../data/staticBlogs.json')
               ]);

               const isLocationLocal = localLocations.some((location) =>
                    location.items?.some((item) => matchesRouteSlug(item, itemSlug))
               )
               if (isLocationLocal) {
                    setPageType('location')
                    return
               }

               const isServiceLocal = localServices.some((service) =>
                    service.items?.some((item) => matchesRouteSlug(item, itemSlug))
               )
               if (isServiceLocal) {
                    setPageType('service')
                    return
               }

               const isPortfolioLocal = localPortfolios.some((portfolio) => {
                    const slug = portfolio.name.toLowerCase().replace(/\s+/g, '-');
                    return slug === itemSlug;
               })
               if (isPortfolioLocal) {
                    setPageType('portfolio')
                    return
               }

               const isBlogLocal = localBlogs.some((blog) => matchesRouteSlug(blog, itemSlug))
               if (isBlogLocal) {
                    setPageType('blog')
                    return
               }

               // 2. Fallback to dynamic live API calls in case sitemap/build is not updated yet
               try {
                    const [locations, services, portfolios, blogs] = await Promise.all([
                         getLocations(),
                         getServices(),
                         getPortfolios(),
                         getBlogs()
                    ])

                    const isLocation = locations.some((location) =>
                         location.items?.some((item) => matchesRouteSlug(item, itemSlug))
                    )
                    if (isLocation) {
                         setPageType('location')
                         return
                    }

                    const isService = services.some((service) =>
                         service.items?.some((item) => matchesRouteSlug(item, itemSlug))
                    )
                    if (isService) {
                         setPageType('service')
                         return
                    }

                    const isPortfolio = portfolios.some((portfolio) => {
                         const slug = portfolio.name.toLowerCase().replace(/\s+/g, '-');
                         return slug === itemSlug;
                    })
                    if (isPortfolio) {
                         setPageType('portfolio')
                         return
                    }

                    const isBlog = blogs.some((blog) => matchesRouteSlug(blog, itemSlug))
                    if (isBlog) {
                         setPageType('blog')
                         return
                    }

                    setPageType('notfound')
               } catch (err) {
                    console.error("Error dynamically resolving page:", err)
                    setPageType('notfound')
               }
          }

          resolvePage()
     }, [itemSlug])

     if (pageType === null) {
          return (
               <div className="min-h-screen bg-[#f5f5f5] animate-pulse">
                    {/* Header/Navbar Skeleton */}
                    <div className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-16 lg:px-24">
                         <div className="h-8 bg-slate-200 rounded w-28 md:w-36"></div>
                         <div className="hidden md:flex gap-8">
                              <div className="h-4 bg-slate-200 rounded w-16"></div>
                              <div className="h-4 bg-slate-200 rounded w-16"></div>
                              <div className="h-4 bg-slate-200 rounded w-16"></div>
                         </div>
                         <div className="h-10 bg-slate-200 rounded-full w-24 md:w-32"></div>
                    </div>

                    {/* Content Section Skeleton */}
                    <div className="max-w-275 mx-auto mt-20 md:mt-35 px-4 md:px-0">
                         {/* Title */}
                         <div className="h-12 md:h-16 bg-slate-200 rounded w-3/4 md:w-1/2"></div>
                         {/* Text Paragraph */}
                         <div className="mt-8 space-y-4 max-w-240">
                              <div className="h-4 bg-slate-200 rounded w-full"></div>
                              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                              <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                         </div>

                         {/* Big video/image skeleton card */}
                         <div className="mt-14 w-full aspect-video md:h-140 bg-slate-200 rounded-[36px]"></div>

                         {/* Category Bar Skeleton */}
                         <div className="flex gap-4 mt-16 md:mt-24 overflow-hidden">
                              <div className="h-12 bg-slate-200 rounded-full w-28 shrink-0"></div>
                              <div className="h-12 bg-slate-200 rounded-full w-32 shrink-0"></div>
                              <div className="h-12 bg-slate-200 rounded-full w-28 shrink-0"></div>
                              <div className="h-12 bg-slate-200 rounded-full w-36 shrink-0"></div>
                         </div>

                         {/* Grid layout cards skeleton */}
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-8 md:gap-y-16 mt-10 pb-20">
                              {Array.from({ length: 2 }).map((_, index) => (
                                   <div key={index} className="flex flex-col gap-6 w-full">
                                        <div className="rounded-[38px] w-full min-h-120 bg-slate-200"></div>
                                        <div className="space-y-4 pt-4">
                                             <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                                             <div className="h-4 bg-slate-200 rounded w-full"></div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          )
     }

     if (pageType === 'location') {
          return <Location />
     }

     if (pageType === 'service') {
          return <Service />
     }

     if (pageType === 'portfolio') {
          return <Portfolios />
     }

     if (pageType === 'blog') {
          return <BlogDetails />
     }

     return <NotFound />
}

export default ItemPage
