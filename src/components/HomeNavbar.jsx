import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useEffect, useState } from "react";
import MenuOverlay from "./MenuOverlay";
import { HiMenuAlt4 } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNavbar } from "../utils/navbar";
import defaultDarkLogo from '/images/kreeya-design-logo.webp'
import defaultWhiteLogo from '/images/kreeya-design-white-logo.webp'
import { FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiFacebook, SiYoutube } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

const HomeNavbar = ({ startFetch = true, useScrollTriggers = true }) => {
     const [menuOpen, setMenuOpen] = useState(false);
     const location = useLocation();
     const [logoAlt, setLogoAlt] = useState(false);
     const [logoAltForHome, setLogoAltForHome] = useState(false);
     const navigate = useNavigate();
     const [navbar, setNavbar] = useState([]);
     const [scrollReady, setScrollReady] = useState(false); //   Add ready state

     useEffect(() => {
          if (!startFetch) return;
          const fetchNavbar = async () => {
               const data = await getNavbar();
               setNavbar(data);
          };
          fetchNavbar();
     }, [startFetch]);

     useEffect(() => {
          if (!useScrollTriggers) return;

          let observers = [];
          const lastObservedCount = {
               forWhite: 0,
               home: false,
               itemSections: 0
          };

          const initScrollObservers = () => {
               // Clear any existing observers
               observers.forEach((obs) => obs.disconnect());
               observers = [];

               setScrollReady(true); // Mark as ready

               // 1. Observe `.for-white-icons` sections to toggle `logoAlt`
               const forWhiteSections = document.querySelectorAll(".for-white-icons");
               lastObservedCount.forWhite = forWhiteSections.length;
               if (forWhiteSections.length > 0) {
                    const whiteSectionsObserver = new IntersectionObserver(
                         (entries) => {
                              const isAnyIntersecting = entries.some(entry => entry.isIntersecting);
                              setLogoAlt(isAnyIntersecting);
                         },
                         {
                              root: null,
                              rootMargin: "0px 0px -90% 0px", // top 10% of viewport
                              threshold: 0
                         }
                    );
                    forWhiteSections.forEach((el) => whiteSectionsObserver.observe(el));
                    observers.push(whiteSectionsObserver);
               }

               // 2. Observe `#white-logo-section` on the Home Page to toggle `logoAltForHome`
               if (location.pathname === "/") {
                    const servicesSection = document.getElementById("white-logo-section");
                    lastObservedCount.home = !!servicesSection;
                    if (servicesSection) {
                         const homeServicesObserver = new IntersectionObserver(
                              (entries) => {
                                   entries.forEach((entry) => {
                                        setLogoAltForHome(entry.isIntersecting);
                                   });
                              },
                              {
                                   root: null,
                                   rootMargin: "0px 0px -90% 0px", // top 10% of viewport
                                   threshold: 0
                              }
                         );
                         homeServicesObserver.observe(servicesSection);
                         observers.push(homeServicesObserver);
                    }
               }

               // 3. Observe Item Page specific sections (Locations and Services detail)
               const path = location.pathname.split("/")[1];
               const staticRoutes = [
                    "",
                    "about",
                    "contact",
                    "pricing",
                    "blog",
                    "blogs",
                    "disclaimer",
                    "privacy-policy",
                    "portfolio-beyekls",
                    "portfolio-daccord",
                    "portfolio-coinpay",
                    "portfolio-nectar"
               ];
               const isItemPage = !staticRoutes.includes(path);

               if (isItemPage) {
                    const itemPageSections = ["location-form", "location-services-anchor", "service-form", "service-services-anchor"]
                         .map((id) => document.getElementById(id))
                         .filter(Boolean);

                    lastObservedCount.itemSections = itemPageSections.length;

                    if (itemPageSections.length > 0) {
                         const itemPageObserver = new IntersectionObserver(
                              (entries) => {
                                   const isAnyVisible = entries.some((entry) => entry.isIntersecting);
                                   setLogoAltForHome(isAnyVisible);
                              },
                              {
                                   root: null,
                                   threshold: 0.1, // 10% visible = active
                              }
                         );
                         itemPageSections.forEach((section) => itemPageObserver.observe(section));
                         observers.push(itemPageObserver);
                    }
               }
          };

          // Setup MutationObserver to watch for late-mounting sections
          const mutationObserver = new MutationObserver(() => {
               let shouldReInit = false;

               // Check for white sections
               const forWhiteSections = document.querySelectorAll(".for-white-icons");
               if (forWhiteSections.length > lastObservedCount.forWhite) {
                    shouldReInit = true;
               }

               // Check for home section
               if (location.pathname === "/") {
                    const servicesSection = document.getElementById("white-logo-section");
                    if (servicesSection && !lastObservedCount.home) {
                         shouldReInit = true;
                    }
               } else {
                    // Check for item sections
                    const itemPageSections = ["location-form", "location-services-anchor", "service-form", "service-services-anchor"]
                         .map((id) => document.getElementById(id))
                         .filter(Boolean);
                    if (itemPageSections.length > lastObservedCount.itemSections) {
                         shouldReInit = true;
                    }
               }

               if (shouldReInit) {
                    initScrollObservers();
               }
          });

          mutationObserver.observe(document.body, { childList: true, subtree: true });

          // Use a small timeout to make sure DOM is fully settled
          const timer = setTimeout(initScrollObservers, 100);

          return () => {
               clearTimeout(timer);
               observers.forEach((obs) => obs.disconnect());
               mutationObserver.disconnect();
          };
     }, [location.pathname, useScrollTriggers]);

     const isDisclaimer = location.pathname === "/disclaimer" || location.pathname === "/privacy-policy" || location.pathname === '/contact';
     const isPortfolio = location.pathname === "/portfolio-beyekls" || location.pathname === "/portfolio-daccord" || location.pathname === "/portfolio-coinpay" || location.pathname === "/portfolio-nectar";

     const handleClick = () => {
          window.location.href = "https://calendly.com/pyush-anand7/new-meeting";
     };
     return (
          <header className="w-full fixed top-0 left-0 z-9999 plus-jakarta-sans">
               <MenuOverlay isOpen={menuOpen} setIsOpen={setMenuOpen} startFetch={startFetch} />

               {/* Top Bar */}
               <div className="w-full bg-[#ff5a00] text-white py-1.5 md:py-2 text-[11px] md:text-[13px] font-semibold border-b border-white/10 z-10000">
                    <div className="max-w-350.5 mx-auto flex items-center justify-between px-3 md:px-6">
                         <div className="flex items-center gap-4 md:gap-6">
                              <a href="tel:+919311500423" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                   <FaPhoneAlt size={12} className="md:w-3.5 md:h-3.5" />
                                   <span>+91 9311500423</span>
                              </a>
                              <a href="mailto:business@kreeyadesign.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                   <FaEnvelope size={12} className="md:w-3.5 md:h-3.5" />
                                   <span className="hidden sm:inline">business@kreeyadesign.com</span>
                              </a>
                         </div>
                         <div className="flex items-center gap-4 md:gap-5">
                              <a href="https://www.facebook.com/kreeyadesignofficial/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <SiFacebook size={14} className="md:w-4 md:h-4" />
                              </a>
                              <a href="https://www.instagram.com/kreeyadesignofficial/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <FaInstagram size={14} className="md:w-4 md:h-4" />
                              </a>
                              <a href="https://www.linkedin.com/in/kreeya-design-480186404/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <FaLinkedinIn size={14} className="md:w-4 md:h-4" />
                              </a>
                              <a href="https://www.youtube.com/@kreeyadesignofficial" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <SiYoutube size={14} className="md:w-4 md:h-4" />
                              </a>
                              <a href="https://x.com/Kreeyadesign12" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <FaXTwitter size={14} className="md:w-4 md:h-4" />
                              </a>
                         </div>
                    </div>
               </div>

               {/* Navbar */}
               <div className={`w-full bg-white/4 ${isDisclaimer ? 'backdrop-blur-sm' : 'backdrop-blur-2xl'} border-b border-black/5`}>
                    <div className="max-w-350.5 mx-auto flex items-center justify-between px-3 md:px-6 py-4">

                         {/* Portfolio Logo */}
                         {isPortfolio && (
                              <Link to='/' className="flex items-center gap-2 cursor-pointer">
                                   <img
                                        src={logoAlt ? (navbar.logo1 ? navbar.logo1 : defaultDarkLogo) : (navbar.logo2 ? navbar.logo2 : defaultWhiteLogo)}
                                        alt="kreeya-design-logo"
                                        loading="eager"
                                        fetchPriority="high"
                                        width="160"
                                        height="42"
                                        className="w-23.75 md:w-31.75 lg:w-40 h-6 md:h-8 lg:h-10.5 object-contain"
                                   />
                              </Link>
                         )}

                         {!isPortfolio && (
                              <Link to='/' className="flex items-center gap-2 cursor-pointer">
                                   <img
                                        src={logoAltForHome ? (navbar.logo2 ? navbar.logo2 : defaultWhiteLogo) : (navbar.logo1 ? navbar.logo1 : defaultDarkLogo)}
                                        alt="kreeya-design-logo"
                                        loading="eager"
                                        fetchPriority="high"
                                        width="160"
                                        height="42"
                                        className="w-23.75 md:w-31.75 lg:w-40 h-6 md:h-8 lg:h-10.5 object-contain"
                                   />
                              </Link>
                         )}

                         {/* Right Actions */}
                         <div className="flex items-center gap-3 md:gap-6">
                              <button
                                   onClick={handleClick}
                                   className="header-btn group relative isolate overflow-hidden bg-cust-orange text-white text-[12px] lg:text-[14px] w-32.25 lg:w-38.75 h-10 lg:h-12 flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 hover:text-cust-orange  cursor-pointer active:scale-99"
                              >
                                   <span className="relative z-10">{navbar.buttonText ? navbar.buttonText : 'Get in Touch'}</span>
                                   <HiOutlineArrowLongRight
                                        size={20}
                                        className="relative z-10 text-white transition-all duration-300 group-hover:text-cust-orange min-w-5 min-h-5"
                                   />
                              </button>

                              {isPortfolio && (
                                   <button
                                        aria-label="Open menu"
                                        onClick={() => setMenuOpen(true)}
                                        className={`p-1 cursor-pointer hover:text-cust-orange ${logoAlt ? 'text-dark-black' : 'text-white'}`}
                                   >
                                        <HiMenuAlt4 size={22} />
                                   </button>
                              )}

                              {!isPortfolio && (
                                   <button
                                        aria-label="Open menu"
                                        onClick={() => setMenuOpen(true)}
                                        className={`p-1 cursor-pointer hover:text-cust-orange ${logoAltForHome ? 'text-white' : 'text-dark-black'}`}
                                   >
                                        <HiMenuAlt4 size={22} />
                                   </button>
                              )}
                         </div>
                    </div>
               </div>
          </header>
     );
};

export default HomeNavbar;
