import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useEffect, useState, useRef } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { normalizeRouteSlug } from "../utils/slug";
import defaultDarkLogo from '/images/kreeya-design-logo.webp';
import defaultWhiteLogo from '/images/kreeya-design-white-logo.webp';
import { FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaDribbble, FaBehance, FaWordpressSimple, FaPinterest, FaReddit, FaBloggerB } from "react-icons/fa";
import { SiFacebook, SiYoutube } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import {
     FiMonitor, FiSmartphone, FiLayout, FiShoppingBag, FiLayers, FiCode,
     FiTarget, FiInstagram as FiInsta, FiSearch, FiLinkedin as FiLinked, FiShare2, FiTrendingUp,
     FiFeather, FiImage, FiVideo, FiPrinter, FiCpu, FiGrid, FiCompass, FiZap
} from 'react-icons/fi';
import { GoArrowUpRight } from "react-icons/go";
const getServiceIcon = (title) => {
     const t = title.toLowerCase();
     if (t.includes('web development')) return <FiCode className="w-4 h-4 text-dark-gray" />;
     if (t.includes('webflow')) return <FiLayers className="w-4 h-4 text-dark-gray" />;
     if (t.includes('mobile app development') || t.includes('app development')) return <FiSmartphone className="w-4 h-4 text-dark-gray" />;
     if (t.includes('shopify')) return <FiShoppingBag className="w-4 h-4 text-dark-gray" />;
     if (t.includes('word press') || t.includes('wordpress')) return <FiLayout className="w-4 h-4 text-dark-gray" />;
     if (t.includes('ui development')) return <FiMonitor className="w-4 h-4 text-dark-gray" />;

     if (t.includes('performance marketing')) return <FiTarget className="w-4 h-4 text-dark-gray" />;
     if (t.includes('instagram')) return <FiInsta className="w-4 h-4 text-dark-gray" />;
     if (t.includes('seo') || t.includes('search engine optimization')) return <FiSearch className="w-4 h-4 text-dark-gray" />;
     if (t.includes('linkedin')) return <FiLinked className="w-4 h-4 text-dark-gray" />;
     if (t.includes('social media')) return <FiShare2 className="w-4 h-4 text-dark-gray" />;
     if (t.includes('search engine marketing') || t.includes('sem')) return <FiTrendingUp className="w-4 h-4 text-dark-gray" />;

     if (t.includes('logo')) return <FiFeather className="w-4 h-4 text-dark-gray" />;
     if (t.includes('creatives') || t.includes('social media creatives')) return <FiImage className="w-4 h-4 text-dark-gray" />;
     if (t.includes('graphic')) return <FiGrid className="w-4 h-4 text-dark-gray" />;
     if (t.includes('identity') || t.includes('brand')) return <FiCompass className="w-4 h-4 text-dark-gray" />;
     if (t.includes('video')) return <FiVideo className="w-4 h-4 text-dark-gray" />;
     if (t.includes('print')) return <FiPrinter className="w-4 h-4 text-dark-gray" />;

     if (t.includes('ui ux') || t.includes('ui/ux')) return <FiLayout className="w-4 h-4 text-dark-gray" />;
     if (t.includes('mobile app design') || t.includes('app design')) return <FiSmartphone className="w-4 h-4 text-dark-gray" />;
     if (t.includes('gen ai') || t.includes('ai design')) return <FiCpu className="w-4 h-4 text-dark-gray" />;
     if (t.includes('product design')) return <FiZap className="w-4 h-4 text-dark-gray" />;
     if (t.includes('motion graphics')) return <FiVideo className="w-4 h-4 text-dark-gray" />;
     if (t.includes('website design')) return <FiMonitor className="w-4 h-4 text-dark-gray" />;

     return <FiZap className="w-4 h-4 text-dark-gray" />;
};

const getPortfolioIcon = (name) => {
     const n = name.toLowerCase();
     if (n.includes('beyekls')) return <FiLayout className="w-4 h-4 text-dark-gray" />;
     if (n.includes('daccord')) return <FiShoppingBag className="w-4 h-4 text-dark-gray" />;
     if (n.includes('coinpay')) return <FiZap className="w-4 h-4 text-dark-gray" />;
     if (n.includes('nectar')) return <FiTrendingUp className="w-4 h-4 text-dark-gray" />;
     if (n.includes('fintech')) return <FiTarget className="w-4 h-4 text-dark-gray" />;
     if (n.includes('healthcare')) return <FiCompass className="w-4 h-4 text-dark-gray" />;
     if (n.includes('real estate')) return <FiGrid className="w-4 h-4 text-dark-gray" />;
     if (n.includes('ecommerce')) return <FiShoppingBag className="w-4 h-4 text-dark-gray" />;
     return <FiZap className="w-4 h-4 text-dark-gray" />;
};

const getPortfolioDesc = (name) => {
     const n = name.toLowerCase();
     if (n.includes('beyekls')) return 'Identity design & polished product design.';
     if (n.includes('daccord')) return 'Modern Ecommerce UI/UX case study.';
     if (n.includes('coinpay')) return 'Fintech application design & secure flows.';
     if (n.includes('nectar')) return 'Intuitive food delivery app UI/UX.';
     if (n.includes('fintech')) return 'Financial technology case studies & UI.';
     if (n.includes('healthcare')) return 'Medical & wellness product interfaces.';
     if (n.includes('real estate')) return 'Modern property listing & landing pages.';
     if (n.includes('ecommerce')) return 'Digital shopping & transaction platforms.';
     return 'Innovative digital product case study.';
};

const staticCaseStudies = [
     { title: "Beyekls", link: "/portfolio-beyekls", description: "Identity design & polished product design." },
     { title: "Daccord", link: "/portfolio-daccord", description: "Modern Ecommerce UI/UX case study." },
     { title: "Coinpay", link: "/portfolio-coinpay", description: "Fintech application design & secure flows." },
     { title: "Nectar", link: "/portfolio-nectar", description: "Intuitive food delivery app UI/UX." }
];

const serviceColors = ["#FF5500", "#FE0032", "#0C59DB", "#27394D"];

const HomeNavbarV2 = ({ startFetch = true, useScrollTriggers = true }) => {
     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
     const [servicesExpanded, setServicesExpanded] = useState(false);
     const [workExpanded, setWorkExpanded] = useState(false);
     const [showMegaMenu, setShowMegaMenu] = useState(false);
     const [showWorkMenu, setShowWorkMenu] = useState(false);

     const hoverTimeoutRef = useRef(null);
     const workHoverTimeoutRef = useRef(null);

     const location = useLocation();
     const [logoAlt, setLogoAlt] = useState(false);
     const [logoAltForHome, setLogoAltForHome] = useState(false);
     const navigate = useNavigate();

     const { navbar, services: servicesData, portfolios: portfoliosData } = useDataContext();
     const [scrollReady, setScrollReady] = useState(false);

     useEffect(() => {
          if (!useScrollTriggers) return;

          let observers = [];
          const lastObservedCount = {
               forWhite: 0,
               home: false,
               itemSections: 0
          };

          const initScrollObservers = () => {
               observers.forEach((obs) => obs.disconnect());
               observers = [];

               setScrollReady(true);

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
                              rootMargin: "0px 0px -90% 0px",
                              threshold: 0
                         }
                    );
                    forWhiteSections.forEach((el) => whiteSectionsObserver.observe(el));
                    observers.push(whiteSectionsObserver);
               }

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
                                   rootMargin: "0px 0px -90% 0px",
                                   threshold: 0
                              }
                         );
                         homeServicesObserver.observe(servicesSection);
                         observers.push(homeServicesObserver);
                    }
               }

               const path = location.pathname.split("/")[1];
               const staticRoutes = [
                    "",
                    "about",
                    "about-us",
                    "contact",
                    "contact-us",
                    "pricing",
                    "blog",
                    "blogs",
                    "category/blogs",
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
                                   threshold: 0.1,
                              }
                         );
                         itemPageSections.forEach((section) => itemPageObserver.observe(section));
                         observers.push(itemPageObserver);
                    }
               }
          };

          const timers = [];
          const scheduleReInit = (delay) => {
               const timerId = setTimeout(() => {
                    initScrollObservers();
               }, delay);
               timers.push(timerId);
          };

          // Schedule re-initializations to capture dynamic/lazy-loaded layout elements
          scheduleReInit(100);
          scheduleReInit(500);
          scheduleReInit(1500);
          scheduleReInit(3000);

          return () => {
               timers.forEach(clearTimeout);
               observers.forEach((obs) => obs.disconnect());
          };
     }, [location.pathname, useScrollTriggers]);

     useEffect(() => {
          if (mobileMenuOpen) {
               document.body.style.overflow = "hidden";
          } else {
               document.body.style.overflow = "";
          }
          return () => {
               document.body.style.overflow = "";
          };
     }, [mobileMenuOpen]);

     const isDisclaimer = location.pathname === "/disclaimer" || location.pathname === "/privacy-policy" || location.pathname === '/contact' || location.pathname === '/contact-us';
     const isPortfolio = location.pathname === "/portfolio-beyekls" || location.pathname === "/portfolio-daccord" || location.pathname === "/portfolio-coinpay" || location.pathname === "/portfolio-nectar";

     const logoSrc = mobileMenuOpen
          ? (navbar.logo1 || defaultDarkLogo)
          : (isPortfolio
               ? (logoAlt ? (navbar.logo1 || defaultDarkLogo) : (navbar.logo2 || defaultWhiteLogo))
               : (logoAltForHome ? (navbar.logo2 || defaultWhiteLogo) : (navbar.logo1 || defaultDarkLogo))
          );

     const hamburgerColorClass = mobileMenuOpen
          ? "text-dark-black"
          : (isPortfolio
               ? (logoAlt ? 'text-dark-black' : 'text-white')
               : (logoAltForHome ? 'text-white' : 'text-dark-black')
          );

     const navbarBgClass = mobileMenuOpen
          ? "bg-white "
          : `bg-white/4 ${isDisclaimer ? 'backdrop-blur-sm' : 'backdrop-blur-2xl'} border-b border-black/5`;

     const handleMouseEnter = () => {
          if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
          setShowMegaMenu(true);
          setShowWorkMenu(false);
     };

     const handleMouseLeave = () => {
          hoverTimeoutRef.current = setTimeout(() => {
               setShowMegaMenu(false);
          }, 150);
     };

     const handleWorkMouseEnter = () => {
          if (workHoverTimeoutRef.current) clearTimeout(workHoverTimeoutRef.current);
          setShowWorkMenu(true);
          setShowMegaMenu(false);
     };

     const handleWorkMouseLeave = () => {
          workHoverTimeoutRef.current = setTimeout(() => {
               setShowWorkMenu(false);
          }, 150);
     };

     const handleClick = () => {
          window.location.href = "https://calendly.com/pyush-anand7/new-meeting";
     };

     const isDarkText = isPortfolio ? logoAlt : !logoAltForHome;
     const textThemeClass = isDarkText ? "text-dark-black hover:text-cust-orange" : "text-white hover:text-cust-orange lg:hover:text-white/80";

     return (
          <header className="w-full fixed top-0 left-0 z-9999 plus-jakarta-sans">
               {/* Top Bar */}
               <div className="w-full bg-cust-orange text-white py-1.5 md:py-2 text-[11px] md:text-[13px] font-semibold border-b border-white/10 relative z-50">
                    <div className="max-w-350.5 mx-auto flex items-center justify-between gap-3 flex-col md:flex-row px-3 md:px-6 pb-0.5 md:pb-0">
                         <div className="flex items-center gap-4 md:gap-6">
                              <a href="tel:+919311500423" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                   <FaPhoneAlt size={12} className="md:w-3.5 md:h-3.5" aria-hidden="true" />
                                   <span>+91 9311500423</span>
                              </a>
                              <a href="mailto:business@kreeyadesign.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                   <FaEnvelope size={12} className="md:w-3.5 md:h-3.5" aria-hidden="true" />
                                   <span className="">business@kreeyadesign.com</span>
                              </a>
                         </div>
                         <div className="flex items-center gap-4 md:gap-5">
                              <a href="https://www.facebook.com/kreeyadesignofficial/" target="_blank" rel="noopener noreferrer"
                                   aria-label="Facebook"
                                   className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <SiFacebook size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                              </a>
                              <a href="https://in.pinterest.com/kreeyadesign80/" target="_blank" rel="noopener noreferrer"
                                   aria-label="Pinterest"
                                   className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <FaPinterest size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                              </a>
                              {/* <a href="https://www.reddit.com/user/kreeya-design/" target="_blank" rel="noopener noreferrer"
                                   aria-label="Reddit"
                                   className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <FaReddit size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                              </a> */}
                              <a href="https://kreeyadesign.blogspot.com/" target="_blank" rel="noopener noreferrer"
                                   aria-label="Blogspot"
                                   className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <FaBloggerB size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                              </a>
                              <a href="http://kreeyadesign9.wordpress.com" target="_blank" rel="noopener noreferrer"
                                   aria-label="WordPress"
                                   className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <FaWordpressSimple size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                              </a>
                              <a href="https://www.behance.net/kreeyadesignofficial" target="_blank" rel="noopener noreferrer"
                                   aria-label="Behance"
                                   className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <FaBehance size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                              </a>
                              {/* <a href="https://dribbble.com/kreeya-design" target="_blank" rel="noopener noreferrer"
                                   aria-label="Dribbble"
                                   className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <FaDribbble size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                              </a> */}
                              <a href="https://www.instagram.com/kreeyadesignofficial/" target="_blank" rel="noopener noreferrer"
                                   aria-label="Instagram"
                                   className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <FaInstagram size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                              </a>
                              <a href="https://www.linkedin.com/in/kreeya-design-480186404/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <FaLinkedinIn size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                              </a>
                              <a href="https://www.youtube.com/@kreeyadesignofficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <SiYoutube size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                              </a>
                              <a href="https://x.com/Kreeyadesign12" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:opacity-80 hover:-translate-y-0.5 transition-all duration-200">
                                   <FaXTwitter size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                              </a>
                         </div>
                    </div>
               </div>

               {/* Navbar */}
               <div className={`w-full ${navbarBgClass} relative lg:static z-50`}>
                    <div className="max-w-350.5 mx-auto flex items-center justify-between px-3 md:px-6 py-4">

                         {/* Logo Section */}
                         <div className="flex items-center">
                              <Link to='/' className="flex items-center gap-2 cursor-pointer">
                                   <img
                                        src={logoSrc}
                                        alt="kreeya-design-logo"
                                        loading="eager"
                                        fetchPriority="high"
                                        width="160"
                                        height="42"
                                        className="w-23.75 md:w-31.75 lg:w-40 h-6 md:h-8 lg:h-10 object-contain"
                                   />
                              </Link>
                         </div>

                         {/* Desktop Navigation Items (Centered) */}
                         <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium poppins">
                              {/* Services with Mega Menu triggers */}
                              <Link to="/" className={`transition-colors duration-200 ${textThemeClass}`}>
                                   Home
                              </Link>
                              <div
                                   className="relative py-2 group"
                                   onMouseEnter={handleMouseEnter}
                                   onMouseLeave={handleMouseLeave}
                              >
                                   <Link
                                        to="/services"
                                        className={`flex items-center gap-1 cursor-pointer transition-colors duration-200 ${textThemeClass} ${showMegaMenu ? 'text-cust-orange' : ''}`}
                                   >
                                        <span className={`-translate-x-1/2 w-1 h-1 bg-cust-orange rounded-full transition-all duration-300 origin-center ${showMegaMenu ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`} />
                                        <span className="relative">
                                             Services
                                        </span>
                                        <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${showMegaMenu ? 'rotate-180' : ''}`} />
                                   </Link>
                              </div>

                              {/* Work with Dropdown triggers */}
                              <div
                                   className="relative py-2 group"
                                   onMouseEnter={handleWorkMouseEnter}
                                   onMouseLeave={handleWorkMouseLeave}
                              >
                                   <span
                                        className={`flex items-center gap-1 cursor-pointer transition-colors duration-200 ${textThemeClass} ${showWorkMenu ? 'text-cust-orange' : ''}`}
                                   >
                                        <span className={` -translate-x-1/2 w-1 h-1 bg-cust-orange rounded-full transition-all duration-300 origin-center ${showWorkMenu ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`} />
                                        <span className="relative">
                                             Our Work
                                        </span>
                                        <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${showWorkMenu ? 'rotate-180' : ''}`} />
                                   </span>
                              </div>

                              <Link to="/category/blogs" className={`transition-colors duration-200 ${textThemeClass}`}>
                                   Blogs
                              </Link>

                              <Link to="/about-us" className={`transition-colors duration-200 ${textThemeClass}`}>
                                   About Us
                              </Link>

                              <Link to="/contact-us" className={`transition-colors duration-200 ${textThemeClass}`}>
                                   Contact Us
                              </Link>
                         </nav>

                         {/* Right Side Actions */}
                         <div className="flex items-center gap-5.5 md:gap-6">
                              <button
                                   onClick={handleClick}
                                   className="header-btn group relative isolate overflow-hidden bg-cust-orange text-white text-[12px] lg:text-[14px] w-32.25 lg:w-38.75 h-10 lg:h-12 flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 hover:text-cust-orange cursor-pointer active:scale-99"
                              >
                                   <span className="relative z-10">{navbar.buttonText ? navbar.buttonText : 'Get in Touch'}</span>
                                   <HiOutlineArrowLongRight
                                        size={20}
                                        className="relative z-10 text-white transition-all duration-300 group-hover:text-cust-orange min-w-5 min-h-5"
                                   />
                              </button>

                              {/* Mobile Hamburger Button */}
                              <button
                                   aria-label="Toggle menu"
                                   onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                   className={`lg:hidden flex flex-col justify-center items-center w-6 h-6 cursor-pointer relative z-50 focus:outline-none hover:text-cust-orange transition-colors duration-200 ${hamburgerColorClass}`}
                              >
                                   <div className="relative w-6 h-3 flex flex-col justify-between">
                                        <span
                                             className={`h-0.5 w-full bg-current rounded-full transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-1.25' : ''
                                                  }`}
                                        />
                                        <span
                                             className={`h-0.5 w-full bg-current rounded-full transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 -translate-y-1.25' : ''
                                                  }`}
                                        />
                                   </div>
                              </button>
                         </div>
                    </div>

                    {/* Desktop Mega Menu Dropdown */}
                    <div
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}
                         className={`absolute top-full left-0 w-full bg-white shadow-2xl border-t border-black/5 transition-all duration-300 origin-top z-9999 ${showMegaMenu
                              ? 'opacity-100 translate-y-0 h-[calc(100vh-100%)] max-h-[calc(100vh-100%)] overflow-y-auto visible pointer-events-auto'
                              : 'opacity-0 -translate-y-2 max-h-0 overflow-hidden invisible pointer-events-none'
                              }`}
                    >
                         <div className="max-w-350.5 mx-auto grid grid-cols-4 gap-8 px-6 py-8">
                              {servicesData.map((cat, cIdx) => (
                                   <div key={cIdx} className="space-y-4 border-r border-black/5 last:border-0 pr-4">
                                        <h3
                                             className="text-[18px] w-fit px-4 h-9 rounded-md flex items-center justify-center gap-3 font-extrabold text-white tracking-wider poiret-one-regular group/head cursor-pointer"
                                             style={{ backgroundColor: serviceColors[cIdx % serviceColors.length] }}
                                        >
                                             {cat.title}
                                             <span className="relative overflow-hidden w-4.5 h-4.5 flex items-center justify-center">
                                                  <GoArrowUpRight className="transition-transform duration-300 ease-in-out group-hover/head:translate-x-full group-hover/head:-translate-y-full" />
                                                  <GoArrowUpRight className="absolute transition-transform duration-300 ease-in-out -translate-x-full translate-y-full group-hover/head:translate-x-0 group-hover/head:translate-y-0" />
                                             </span>
                                        </h3>
                                        <div className="space-y-3">
                                             {(cat.items || []).map((item, iIdx) => (
                                                  <Link
                                                       key={iIdx}
                                                       to={`/${normalizeRouteSlug(item.slug || item._id)}`}
                                                       onClick={() => setShowMegaMenu(false)}
                                                       className="group flex items-center justify-between gap-4 p-2 rounded-xl transition-all duration-200 w-full"
                                                  >
                                                       <div className="space-y-0.5 flex-1 pr-2">
                                                            <h2 className="text-[15px] font-semibold text-dark-black flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                                                                 <span className="w-1 h-1 rounded-full bg-dark-black opacity-0 -ml-2 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 shrink-0"></span>
                                                                 <span>{item.title}</span>
                                                            </h2>
                                                            <p className="text-[13px] text-dark-gray leading-normal line-clamp-2">
                                                                 {item.hero?.description || item.description || ''}
                                                            </p>
                                                       </div>
                                                       <div className="transition-transform duration-200 group-hover:scale-110 shrink-0">
                                                            {getServiceIcon(item.title)}
                                                       </div>
                                                  </Link>
                                             ))}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>

                    {/* Desktop Work Dropdown */}
                    <div
                         onMouseEnter={handleWorkMouseEnter}
                         onMouseLeave={handleWorkMouseLeave}
                         className={`absolute top-full left-0 w-full bg-white shadow-2xl border-t border-black/5 transition-all duration-300 origin-top z-9999 ${showWorkMenu
                              ? 'opacity-100 translate-y-0 max-h-[calc(100vh-100%)] overflow-y-auto visible pointer-events-auto'
                              : 'opacity-0 -translate-y-2 max-h-0 overflow-hidden invisible pointer-events-none'
                              }`}
                    >
                         <div className="max-w-350.5 mx-auto grid grid-cols-2 gap-12 px-6 py-8">
                              {/* Column 1: Case Studies (Static) */}
                              <div className="space-y-4 border-r border-black/5 pr-6">
                                   <h3 className="text-[18px] w-fit px-4 h-9 rounded-md flex items-center justify-center gap-3 font-extrabold text-white bg-cust-orange tracking-wider poiret-one-regular group/head cursor-pointer">
                                        Case Studies
                                        <span className="relative overflow-hidden w-4.5 h-4.5 flex items-center justify-center">
                                             <GoArrowUpRight className="transition-transform duration-300 ease-in-out group-hover/head:translate-x-full group-hover/head:-translate-y-full" />
                                             <GoArrowUpRight className="absolute transition-transform duration-300 ease-in-out -translate-x-full translate-y-full group-hover/head:translate-x-0 group-hover/head:translate-y-0" />
                                        </span>
                                   </h3>
                                   <div className="grid grid-cols-2 gap-4">
                                        {staticCaseStudies.map((item, idx) => (
                                             <Link
                                                  key={idx}
                                                  to={item.link}
                                                  onClick={() => setShowWorkMenu(false)}
                                                  className="group flex items-center justify-between gap-4 p-2 rounded-xl transition-all duration-200 w-full"
                                             >
                                                  <div className="space-y-0.5 flex-1 pr-2">
                                                       <h2 className="text-[15px] font-semibold text-dark-black flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                                                            <span className="w-1 h-1 rounded-full bg-dark-black opacity-0 -ml-2 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 shrink-0"></span>
                                                            <span>{item.title}</span>
                                                       </h2>
                                                       <p className="text-[13px] text-dark-gray leading-normal">
                                                            {item.description}
                                                       </p>
                                                  </div>
                                                  <div className="transition-transform duration-200 group-hover:scale-110 shrink-0">
                                                       {getPortfolioIcon(item.title)}
                                                  </div>
                                             </Link>
                                        ))}
                                   </div>
                              </div>

                              {/* Column 2: Sectors / Domains (Dynamic) */}
                              <div className="space-y-4">
                                   <h3 className="text-[18px] w-fit px-4 h-9 rounded-md flex items-center justify-center gap-3 font-extrabold text-white bg-[#FE0032] tracking-wider poiret-one-regular group/head cursor-pointer">
                                        Industries & Domains
                                        <span className="relative overflow-hidden w-4.5 h-4.5 flex items-center justify-center">
                                             <GoArrowUpRight className="transition-transform duration-300 ease-in-out group-hover/head:translate-x-full group-hover/head:-translate-y-full" />
                                             <GoArrowUpRight className="absolute transition-transform duration-300 ease-in-out -translate-x-full translate-y-full group-hover/head:translate-x-0 group-hover/head:translate-y-0" />
                                        </span>
                                   </h3>
                                   <div className="grid grid-cols-2 gap-4">
                                        {portfoliosData.map((item, idx) => {
                                             const slug = item.name.toLowerCase().replace(/\s+/g, '-');
                                             return (
                                                  <Link
                                                       key={idx}
                                                       to={`/${slug}`}
                                                       onClick={() => setShowWorkMenu(false)}
                                                       className="group flex items-center justify-between gap-4 p-2 rounded-xl transition-all duration-200 w-full"
                                                  >
                                                       <div className="space-y-0.5 flex-1 pr-2">
                                                            <h2 className="text-[15px] font-semibold text-dark-black flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                                                                 <span className="w-1 h-1 rounded-full bg-dark-black opacity-0 -ml-2 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 shrink-0"></span>
                                                                 <span>{item.slug || item.name}</span>
                                                            </h2>
                                                            <p className="text-[13px] text-dark-gray leading-normal line-clamp-2">
                                                                 {item.title}
                                                            </p>
                                                       </div>
                                                       <div className="transition-transform duration-200 group-hover:scale-110 shrink-0">
                                                            {getPortfolioIcon(item.name)}
                                                       </div>
                                                  </Link>
                                             );
                                        })}
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Mobile Navigation Drawer Overlay / Backdrop */}
               <div
                    onClick={() => setMobileMenuOpen(false)}
                    className={`fixed inset-0 bg-black/60 z-30 transition-all duration-300 lg:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
                         }`}
               />

               {/* Mobile Navigation Dropdown (Slides Down from Behind Navbar, Full Width) */}
               <div
                    className={`absolute top-full left-0 w-full bg-white z-40 shadow-2xl flex flex-col p-6 transition-all duration-500 ease-in-out lg:hidden overflow-y-auto ${mobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto visible' : '-translate-y-[110%] opacity-0 pointer-events-none invisible'
                         }`}
                    style={{
                         maxHeight: 'calc(100vh - 120px)'
                    }}
               >
                    {/* Drawer Menu Items */}
                    <div className="flex-1 py-2 space-y-4 pr-1">
                         {/* Services Accordion Item (Full Width, Natural Height, No inner scrollbar) */}
                         <Link
                              to="/"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-3 text-[17px] font-semibold text-dark-black border-b border-black/5 transition-colors hover:text-cust-orange"
                         >
                              Home
                         </Link>
                         <div className="border-b border-black/5 pb-2">
                              <button
                                   onClick={() => {
                                        setServicesExpanded(!servicesExpanded);
                                        setWorkExpanded(false);
                                   }}
                                   className="w-full flex items-center justify-between py-3 text-[17px] font-semibold text-dark-black hover:text-cust-orange transition-colors"
                              >
                                   <span>Services</span>
                                   <FiChevronDown className={`w-5 h-5 transition-transform duration-200 ${servicesExpanded ? 'rotate-180' : ''}`} />
                              </button>

                              <div
                                   style={{
                                        display: 'grid',
                                        gridTemplateRows: servicesExpanded ? '1fr' : '0fr',
                                        transition: 'grid-template-rows 300ms ease-in-out, opacity 300ms ease-in-out'
                                   }}
                                   className={`w-full ${servicesExpanded ? 'opacity-100 mt-2 pl-1' : 'opacity-0 pointer-events-none'}`}
                              >
                                   <div className="overflow-hidden">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                             {servicesData.map((cat, cIdx) => (
                                                  <div key={cIdx} className="mb-2">
                                                       <h2
                                                            className="text-[18px] w-fit px-4 h-9 rounded-md flex items-center justify-center gap-3 font-extrabold text-white tracking-wider poiret-one-regular mb-2"
                                                            style={{ backgroundColor: serviceColors[cIdx % serviceColors.length] }}
                                                       >
                                                            {cat.title}
                                                            <GoArrowUpRight className="w-4.5 h-4.5" />
                                                       </h2>
                                                       <div className="space-y-2">
                                                            {(cat.items || []).map((item, iIdx) => (
                                                                 <Link
                                                                      key={iIdx}
                                                                      to={`/${normalizeRouteSlug(item.slug || item._id)}`}
                                                                      onClick={() => setMobileMenuOpen(false)}
                                                                      className="flex items-center justify-between gap-4 py-2 rounded-lg hover:bg-black/5 w-full transition-colors"
                                                                 >
                                                                      <div className="flex-1 pr-2">
                                                                           <div className="text-[15px] font-semibold text-dark-black">{item.title}</div>
                                                                           <div className="text-[13px] text-dark-gray line-clamp-1">{item.hero?.description || item.description || ''}</div>
                                                                      </div>
                                                                      <div className="shrink-0">{getServiceIcon(item.title)}</div>
                                                                 </Link>
                                                            ))}
                                                       </div>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Work Accordion Item (Full Width, Natural Height, No inner scrollbar) */}
                         <div className="border-b border-black/5 pb-2">
                              <button
                                   onClick={() => {
                                        setWorkExpanded(!workExpanded);
                                        setServicesExpanded(false);
                                   }}
                                   className="w-full flex items-center justify-between py-3 text-[17px] font-semibold text-dark-black hover:text-cust-orange transition-colors"
                              >
                                   <span>Our Work</span>
                                   <FiChevronDown className={`w-5 h-5 transition-transform duration-200 ${workExpanded ? 'rotate-180' : ''}`} />
                              </button>

                              <div
                                   style={{
                                        display: 'grid',
                                        gridTemplateRows: workExpanded ? '1fr' : '0fr',
                                        transition: 'grid-template-rows 300ms ease-in-out, opacity 300ms ease-in-out'
                                   }}
                                   className={`w-full ${workExpanded ? 'opacity-100 mt-2 pl-1' : 'opacity-0 pointer-events-none'}`}
                              >
                                   <div className="overflow-hidden">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                             {/* Column 1: Case Studies */}
                                             <div>
                                                  <h2 className="text-[18px] w-fit px-4 h-9 rounded-md flex items-center justify-center gap-3 font-extrabold text-white bg-cust-orange tracking-wider poiret-one-regular mb-2">
                                                       Case Studies
                                                       <GoArrowUpRight className="w-4.5 h-4.5" />
                                                  </h2>
                                                  <div className="space-y-2">
                                                       {staticCaseStudies.map((item, idx) => (
                                                            <Link
                                                                 key={idx}
                                                                 to={item.link}
                                                                 onClick={() => setMobileMenuOpen(false)}
                                                                 className="flex items-center justify-between gap-4 py-2 rounded-lg hover:bg-black/5 w-full transition-colors"
                                                            >
                                                                 <div className="flex-1 pr-2">
                                                                      <div className="text-[15px] font-semibold text-dark-black">{item.title}</div>
                                                                      <div className="text-[13px] text-dark-gray line-clamp-1">{item.description}</div>
                                                                 </div>
                                                                 <div className="shrink-0">{getPortfolioIcon(item.title)}</div>
                                                            </Link>
                                                       ))}
                                                  </div>
                                             </div>

                                             {/* Column 2: Industries */}
                                             <div>
                                                  <h2 className="text-[18px] w-fit px-4 h-9 rounded-md flex items-center justify-center gap-3 font-extrabold text-white bg-[#FE0032] tracking-wider poiret-one-regular mb-2">
                                                       Industries
                                                       <GoArrowUpRight className="w-4.5 h-4.5" />
                                                  </h2>
                                                  <div className="space-y-2">
                                                       {portfoliosData.map((item, idx) => {
                                                            const slug = item.name.toLowerCase().replace(/\s+/g, '-');
                                                            return (
                                                                 <Link
                                                                      key={idx}
                                                                      to={`/${slug}`}
                                                                      onClick={() => setMobileMenuOpen(false)}
                                                                      className="flex items-center justify-between gap-4 py-2 rounded-lg hover:bg-black/5 w-full transition-colors"
                                                                 >
                                                                      <div className="flex-1 pr-2">
                                                                           <div className="text-[15px] font-semibold text-dark-black">{item.slug || item.name}</div>
                                                                           <div className="text-[13px] text-dark-gray line-clamp-2">{item.title}</div>
                                                                      </div>
                                                                      <div className="shrink-0">{getPortfolioIcon(item.name)}</div>
                                                                 </Link>
                                                            );
                                                       })}
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <Link
                              to="/category/blogs"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-3 text-[17px] font-semibold text-dark-black border-b border-black/5 transition-colors hover:text-cust-orange"
                         >
                              Blogs
                         </Link>

                         <Link
                              to="/about-us"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-3 text-[17px] font-semibold text-dark-black border-b border-black/5 transition-colors hover:text-cust-orange"
                         >
                              About Us
                         </Link>

                         <Link
                              to="/contact-us"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-3 text-[17px] font-semibold text-dark-black border-b border-black/5 transition-colors hover:text-cust-orange"
                         >
                              Contact Us
                         </Link>
                    </div>

                    {/* Drawer CTA Action */}
                    {/* <div className="pt-6 border-t border-black/5 mt-auto">
                         <button
                              onClick={() => {
                                   setMobileMenuOpen(false);
                                   handleClick();
                              }}
                              className="w-full bg-cust-orange text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-cust-orange/95 transition-all"
                         >
                              <span>{navbar.buttonText ? navbar.buttonText : 'Get in Touch'}</span>
                              <HiOutlineArrowLongRight size={20} />
                         </button>
                    </div> */}
               </div>
          </header>
     );
};

export default HomeNavbarV2;
