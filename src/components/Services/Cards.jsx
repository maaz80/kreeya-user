import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import { getServices } from '../../utils/service';
import { normalizeRouteSlug } from '../../utils/slug';
import { optimizeImage } from '../../utils/cloudinary';
import OptimizedImage from '../OptimizedImage';

import FallbackImg from '../../assets/nectar-casestudy-mobile.webp';
import staticServices from '../../data/staticServices.json';

const Cards = () => {

     // Synchronously retrieve service items from build-generated cache
     const localServices = staticServices || [];
     const initialItems = (() => {
          const filtered = [];
          localServices.forEach((service) => {
               if (service.items) {
                    service.items.forEach((item) => {
                         if (item?.hero?.title) {
                              filtered.push(item);
                         }
                    });
               }
          });
          return filtered;
     })();

     const [items, setItems] = useState(initialItems);
     const [loading, setLoading] = useState(initialItems.length === 0);
     const [currentPage, setCurrentPage] = useState(1);

     const navigate = useNavigate();

     const cardsPerPage = 6;

     useEffect(() => {

          const fetchAndFilterServices = async () => {

               try {

                    const services = await getServices();

                    const filtered = [];

                    services.forEach((service) => {

                         if (service.items) {

                              service.items.forEach((item) => {

                                   if (item?.hero?.title) {
                                        filtered.push(item);
                                   }

                              });

                         }

                    });

                    setItems(filtered);

               } catch (error) {

                    console.error(
                         'Error fetching services for Cards:',
                         error
                    );

               } finally {

                    setLoading(false);

               }

          };

          fetchAndFilterServices();

     }, []);

     const getServiceItemRoute = (item) =>
          `/${normalizeRouteSlug(item?.slug || item?._id)}`;

     // TOTAL PAGES
     const totalPages = Math.ceil(
          items.length / cardsPerPage
     );

     // CURRENT CARDS
     const currentCards = useMemo(() => {

          const start =
               (currentPage - 1) * cardsPerPage;

          const end = start + cardsPerPage;

          return items.slice(start, end);

     }, [currentPage, items]);

     // PAGINATION ITEMS
     const paginationItems = useMemo(() => {
          if (totalPages <= 7) {
               return Array.from({ length: totalPages }, (_, i) => i + 1);
          }

          if (currentPage <= 4) {
               return [1, 2, 3, 4, 5, "...", totalPages];
          }

          if (currentPage >= totalPages - 3) {
               return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
          }

          // MIDDLE — currentPage surrounded by neighbors
          return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];

     }, [currentPage, totalPages]);

     return (
          <section className="w-full mt-[140px]">

               <div className="max-w-[1430px] mx-auto px-4 md:px-6 lg:px-8">

                    {/* HEADING */}
                    <div className="flex items-center justify-start mb-14">

                         <h1 className="text-start font-serif text-[42px] md:text-[56px] lg:text-[72px] leading-none font-medium text-black tracking-[-1px] poiret-one-regular">
                              Our Specialised{' '}
                              <span className="text-cust-orange">
                                   Services
                              </span>
                         </h1>

                    </div>

                    {/* CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">

                         {loading ? (

                              Array.from({ length: 6 }).map((_, index) => (

                                   <div
                                        key={index}
                                        className="w-full max-w-[470px] rounded-[28px] overflow-hidden bg-white animate-pulse"
                                   >

                                        <div className="h-[280px] bg-slate-200"></div>

                                        <div className="p-6">

                                             <div className="h-8 w-60 rounded bg-slate-200"></div>

                                        </div>

                                   </div>

                              ))

                         ) : currentCards.length > 0 ? (

                              currentCards.map((item, index) => (

                                   <div
                                        key={item._id}
                                        onClick={() =>
                                             navigate(
                                                  getServiceItemRoute(item)
                                             )
                                        }
                                        className="group w-full max-w-[470px] rounded-[28px] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 shadow-2xl bg-white"
                                   >

                                        {/* IMAGE */}
                                        <div className="relative overflow-hidden h-[250px] md:h-[280px]">

                                             <OptimizedImage 
                                                  src={item.image || FallbackImg} 
                                                  alt={item.title || 'Portfolio Project'}
                                                  width={470}
                                                  height={280}
                                                  aspectRatio="47:28"
                                                  sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc(50vw - 32px), 470px"
                                                  loading={index < 2 ? 'eager' : 'lazy'}
                                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                             />

                                        </div>

                                        {/* CONTENT */}
                                        <div className="bg-white px-4 py-5">

                                             <h2 className="text-[18px] md:text-[20px] lg:text-[22px] leading-tight text-black tracking-[-0.5px] plus-jakarta-sans line-clamp-2">
                                                  {item.title}
                                             </h2>

                                        </div>

                                   </div>

                              ))

                         ) : (

                              <div className="col-span-full text-center py-16 text-slate-500 text-lg">
                                   No service items found.
                              </div>

                         )}

                    </div>

                    {/* PAGINATION */}
                    {!loading && totalPages > 1 && (

                         <div className="flex items-center justify-center mt-14 md:mt-20">
                              {/* PREV BUTTON */}
                              <button
                                   onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                   disabled={currentPage === 1}
                                   aria-label='Previous Services'
                                   className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-cust-orange flex items-center justify-center text-cust-orange hover:text-cust-orange cursor-pointer hover:bg-cust-orange/8  transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed mr-2"
                              >
                                   <GoArrowLeft size={24} />
                              </button>
                              <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-center">

                                   {/* PAGE BUTTONS */}
                                   {paginationItems.map((page, index) => {

                                        const isActive =
                                             currentPage === page;

                                        return (

                                             <button
                                                  key={index}
                                                  disabled={page === "..."}
                                                  onClick={() => {

                                                       if (typeof page === "number") {

                                                            setCurrentPage(page);

                                                            window.scrollTo({
                                                                 top: 0,
                                                                 behavior: "smooth",
                                                            });

                                                       }

                                                  }}
                                                  className={`
                                                       w-10 h-10 md:w-14 md:h-14
                                                       rounded-full border
                                                       flex items-center justify-center
                                                       text-[15px] md:text-[22px]
                                                       plus-jakarta-sans
                                                       transition-all duration-300 cursor-pointer 

                                                       ${page === "..."
                                                            ? "border-transparent cursor-default text-[#6E6E6E]"
                                                            : isActive
                                                            ? "bg-cust-orange/8 border-cust-orange text-cust-orange shadow-[0_0_20px_rgba(255,85,0,0.25)]"
                                                            : "border-cust-orange text-cust-orange hover:bg-cust-orange/8 hover:text-cust-orange"
                                                       }
                                                  `}
                                             >
                                                  {page}
                                             </button>

                                        );

                                   })}
                                 
                                   {/* NEXT BUTTON */}
                                   <button
                                        onClick={() =>
                                             setCurrentPage((prev) =>
                                                  Math.min(
                                                       prev + 1,
                                                       totalPages
                                                  )
                                             )
                                        }
                                        disabled={currentPage === totalPages}
                                        aria-label='Next Services'
                                        className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-cust-orange flex items-center justify-center text-cust-orange hover:text-cust-orange cursor-pointer hover:bg-cust-orange/8 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                   >

                                        <GoArrowRight
                                             size={24}
                                        />

                                   </button>

                              </div>

                         </div>

                    )}

               </div>

          </section>
     );
};

export default Cards;