import { useEffect, useState, useMemo } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useParams, useNavigate } from "react-router-dom";
import { getPortfolios } from "../../utils/portfolio";
import { getResponsiveImageProps } from "../../utils/cloudinary";
import FallbackImg from "../../assets/404-bg.webp";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const PortfolioSection = () => {
     const { itemSlug } = useParams();
     const navigate = useNavigate();
     const [portfolios, setPortfolios] = useState([]);
     const [activeCategory, setActiveCategory] = useState("All");
     const [loading, setLoading] = useState(true);
     const [currentPage, setCurrentPage] = useState(1);

     useEffect(() => {
          const fetchPortfoliosData = async () => {
               try {
                    const data = await getPortfolios();
                    setPortfolios(data);
               } catch (err) {
                    console.error("Error fetching portfolios in section:", err);
               } finally {
                    setLoading(false);
               }
          };
          fetchPortfoliosData();
     }, []);

     useEffect(() => {
          if (portfolios.length > 0) {
               if (itemSlug) {
                    const matched = portfolios.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === itemSlug);
                    if (matched) {
                         setActiveCategory(matched.name);
                    } else {
                         setActiveCategory("All");
                    }
               } else {
                    setActiveCategory("All");
               }
               setCurrentPage(1);
          }
     }, [itemSlug, portfolios]);

     const categories = ["All", ...portfolios.map((p) => p.name)];

     const getFilteredCards = () => {
          if (activeCategory === "All") {
               const allCards = [];
               portfolios.forEach((portfolio) => {
                    if (portfolio.cards) {
                         portfolio.cards.forEach((card) => {
                              allCards.push({
                                   ...card,
                                   dribblelink: portfolio.dribblelink,
                                   behancelink: portfolio.behancelink,
                                   portfolioName: portfolio.name,
                              });
                         });
                    }
               });
               return allCards;
          } else {
               const selected = portfolios.find((p) => p.name === activeCategory);
               if (selected && selected.cards) {
                    return selected.cards.map((card) => ({
                         ...card,
                         dribblelink: selected.dribblelink,
                         behancelink: selected.behancelink,
                         portfolioName: selected.name,
                    }));
               }
               return [];
          }
     };

     const displayCards = getFilteredCards();

     const cardsPerPage = 8;

     // TOTAL PAGES
     const totalPages = Math.ceil(
          displayCards.length / cardsPerPage
     );

     // CURRENT CARDS
     const currentCards = useMemo(() => {
          const start = (currentPage - 1) * cardsPerPage;
          const end = start + cardsPerPage;
          return displayCards.slice(start, end);
     }, [currentPage, displayCards]);

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

     const renderTitle = (title) => {
          if (!title) return "Untitled Project";
          const words = title.split(" ");
          if (words.length <= 1) return title;
          const lastWord = words.pop();
          return (
               <>
                    {words.join(" ")}{" "}
                    <span className="text-cust-orange">{lastWord}</span>
               </>
          );
     };

     return (
          <section className="w-full pt-10 pb-16 md:pt-15 md:pb-24 overflow-hidden">
               <div className="max-w-275 mx-auto px-2 md:px-0 lg:px-0">

                    {/* Top Navigator */}
                    <div className="flex items-center gap-1 md:gap-4 overflow-x-auto scrollbar-hide pb-4 poppins-regular">
                         {loading ? (
                              Array.from({ length: 4 }).map((_, i) => (
                                   <div key={i} className="h-14 bg-slate-200/80 rounded-full w-36 animate-pulse"></div>
                              ))
                         ) : (
                              categories.map((item, index) => (
                                   <button
                                        key={index}
                                        onClick={() => {
                                             if (item === "All") {
                                                  navigate("/portfolios");
                                             } else {
                                                  const slug = item.toLowerCase().replace(/\s+/g, '-');
                                                  navigate(`/${slug}`);
                                             }
                                             setActiveCategory(item);
                                             setCurrentPage(1);
                                        }}
                                        className={`whitespace-nowrap rounded-full px-3 md:px-7 py-2 md:py-2 text-[10px] md:text-[16px] transition-all duration-300 border ${activeCategory === item
                                             ? "bg-cust-orange text-white border-cust-orange"
                                             : "bg-cust-orange/8 text-cust-orange border-cust-orange/30 hover:bg-cust-orange hover:text-white cursor-pointer"
                                             }`}
                                   >
                                        {item}
                                   </button>
                              ))
                         )}
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-8 md:gap-y-20 mt-6 md:mt-5">
                         {loading ? (
                              // Premium Grid Skeleton Loaders
                              Array.from({ length: 4 }).map((_, index) => (
                                   <div key={index} className="animate-pulse flex flex-col gap-6 w-full">
                                        <div className="rounded-[38px] w-full min-h-120 bg-slate-200/85"></div>
                                        <div className="pt-4 space-y-4">
                                             <div className="h-8 bg-slate-200/85 rounded w-3/4"></div>
                                             <div className="h-4 bg-slate-200/85 rounded w-full"></div>
                                             <div className="h-4 bg-slate-200/85 rounded w-5/6"></div>
                                             <div className="flex gap-4 mt-6">
                                                  <div className="h-14 bg-slate-200/85 rounded-full w-36"></div>
                                                  <div className="h-14 bg-slate-200/85 rounded-full w-36"></div>
                                             </div>
                                        </div>
                                   </div>
                              ))
                         ) : currentCards.length > 0 ? (
                              currentCards.map((item, i) => (
                                   <div
                                        key={i}
                                        className={`group flex flex-col h-full justify-start ${i % 2 !== 0 ? "mt-0 md:mt-20" : ""}`}
                                   >
                                        <div>
                                             {/* Image */}
                                             <div className="rounded-[38px] overflow-hidden bg-slate-50">
                                                  {(() => {
                                                       const imageProps = item.image
                                                            ? getResponsiveImageProps(item.image, {
                                                                 mobileWidth: 320,
                                                                 tabletWidth: 480,
                                                                 desktopWidth: 640,
                                                                 fallbackWidth: 640,
                                                            })
                                                            : {
                                                                 src: FallbackImg,
                                                                 srcSet: `${FallbackImg} 320w, ${FallbackImg} 480w, ${FallbackImg} 640w`,
                                                                 sizes: "(max-width: 768px) 100vw, 522px",
                                                            };
                                                       return (
                                                            <img
                                                                 src={imageProps.src}
                                                                 alt={item.title || "Portfolio Project"}
                                                                 width="522"
                                                                 height="800"
                                                                 loading={i < 2 ? "eager" : "lazy"}
                                                                 decoding={i < 2 ? "sync" : "async"}
                                                                 srcSet={imageProps.srcSet}
                                                                 sizes={imageProps.sizes}
                                                                 className="w-full min-h-150 md:min-h-200 object-cover group-hover:scale-105 transition-all duration-700"
                                                            />
                                                       );
                                                  })()}
                                             </div>

                                             {/* Content */}
                                             <div className="pt-3 md:pt-6">
                                                  {/* Dynamic colored title */}
                                                  <h2 className="text-dark-black text-[32px] md:text-[40px] leading-12 font-medium max-w-[98%] poiret-one-regular">
                                                       {item.title}
                                                  </h2>

                                                  {/* Paragraph */}
                                                  <p className="mt-5 md:mt-8 text-dark-black text-sm md:text-base xl:text-[20px] leading-7 md:leading-8 max-w-[98%] font-light plus-jakarta-sans">
                                                       {item.para}
                                                  </p>
                                             </div>
                                        </div>

                                        {/* Buttons container aligned to bottom */}
                                        <div className="flex flex-wrap items-center gap-2 md:gap-5 mt-5 md:mt-10 poppins-regular">
                                             {/* {item.dribblelink && (
                                                  <a
                                                       href={item.dribblelink}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="bg-cust-orange text-white border-2 border-cust-orange px-4 md:px-14 py-2 md:py-5 rounded-full flex items-center gap-4 text-[14px] md:text-[20px] font-medium transition-all duration-300 hover:bg-white hover:text-cust-orange cursor-pointer"
                                                  >
                                                       Dribble
                                                       <GoArrowRight size={24} />
                                                  </a>
                                             )} */}

                                             {item.behancelink && (
                                                  <a
                                                       href={item.behancelink}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="border-2 border-cust-orange text-cust-orange hover:text-white px-4 md:px-14 py-2 md:py-5 rounded-full flex items-center gap-4 text-[14px] md:text-[20px] font-medium hover:bg-cust-orange transition-all duration-300 cursor-pointer"
                                                  >
                                                       Behance
                                                       <HiOutlineArrowLongRight size={24} />
                                                  </a>
                                             )}
                                        </div>
                                   </div>
                              ))
                         ) : (
                              <div className="col-span-full py-20 text-center text-slate-400 plus-jakarta-sans text-xl">
                                   No portfolio projects found for this category.
                              </div>
                         )}
                    </div>

                    {/* PAGINATION */}
                    {!loading && totalPages > 1 && (
                         <div className="flex items-center justify-center mt-14 md:mt-20">
                              {/* PREV BUTTON */}
                              <button
                                   onClick={() => {
                                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                   }}
                                   aria-label='Previous Services'
                                   disabled={currentPage === 1}
                                   className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-cust-orange flex items-center justify-center text-cust-orange hover:text-cust-orange cursor-pointer hover:bg-cust-orange/8 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed mr-2"
                              >
                                   <GoArrowLeft size={24} />
                              </button>

                              <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-center">
                                   {/* PAGE BUTTONS */}
                                   {paginationItems.map((page, index) => {
                                        const isActive = currentPage === page;
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
                                                            ? "bg-cust-orange/20 border-cust-orange text-cust-orange shadow-[0_0_20px_rgba(255,85,0,0.25)]"
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
                                        onClick={() => {
                                             setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                                             window.scrollTo({ top: 0, behavior: "smooth" });
                                        }}
                                        aria-label='Next Services'
                                        disabled={currentPage === totalPages}
                                        className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-cust-orange flex items-center justify-center text-cust-orange hover:text-cust-orange cursor-pointer hover:bg-cust-orange/8 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ml-2"
                                   >
                                        <GoArrowRight size={24} />
                                   </button>
                              </div>
                         </div>
                    )}
               </div>
          </section>
     );
};

export default PortfolioSection;