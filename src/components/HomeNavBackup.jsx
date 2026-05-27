import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useEffect, useState } from "react";
import MenuOverlay from "./MenuOverlay";
import { HiMenuAlt4 } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getScrollTrigger } from "../utils/gsapLoader.js";
import { getNavbar } from "../utils/navbar";
import defaultDarkLogo from '../assets/logo.webp'
import defaultWhiteLogo from '../assets/white-logo.webp'

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
          let triggers = [];
          let isMounted = true;
          let observer = null;

          const initScrollTriggers = async () => {
               const ScrollTrigger = await getScrollTrigger();

               if (!isMounted) return;

               setScrollReady(true); //   Mark as ready

               const sections = document.querySelectorAll(".for-white-icons");

               sections.forEach((el) => {
                    const trigger = ScrollTrigger.create({
                         trigger: el,
                         start: "top top",
                         end: "bottom top",
                         onEnter: () => setLogoAlt(true),
                         onEnterBack: () => setLogoAlt(true),
                         onLeave: () => setLogoAlt(false),
                         onLeaveBack: () => setLogoAlt(false)
                    });
                    triggers.push(trigger);
               });

               if (location.pathname === "/") {
                    const section = document.getElementById("services-section");
                    if (section) {
                         if (window.innerWidth < 800) {
                              const trigger = ScrollTrigger.create({
                                   trigger: section,
                                   start: "top bottom-=1900",
                                   end: "bottom top-=1250",
                                   onEnter: () => setLogoAltForHome(true),
                                   onEnterBack: () => setLogoAltForHome(true),
                                   onLeave: () => setLogoAltForHome(false),
                                   onLeaveBack: () => setLogoAltForHome(false)
                              });
                              triggers.push(trigger);
                         } else {
                              const trigger = ScrollTrigger.create({
                                   trigger: section,
                                   start: "top bottom-=3600",
                                   end: "bottom top-=2900",
                                   onEnter: () => setLogoAltForHome(true),
                                   onEnterBack: () => setLogoAltForHome(true),
                                   onLeave: () => setLogoAltForHome(false),
                                   onLeaveBack: () => setLogoAltForHome(false)
                              });
                              triggers.push(trigger);
                         }
                    }
               }

               const staticRoutes = [
                    "",
                    "about",
                    "contact",
                    "pricing",
                    "blog",
                    "blogs",
                    "disclaimer",
                    "policy",
                    "portfolio-beyekls",
                    "portfolio-daccord",
                    "portfolio-coinpay",
                    "portfolio-nectar"
               ];

               const path = location.pathname.split("/")[1];

               const isItemPage = !staticRoutes.includes(path);

               if (isItemPage) {
                    const sections = ["location-form", "location-services-anchor", "service-form", "service-services-anchor"]
                         .map((id) => document.getElementById(id))
                         .filter(Boolean);

                    if (!sections.length) return;

                    observer = new IntersectionObserver(
                         (entries) => {
                              const isAnyVisible = entries.some((entry) => entry.isIntersecting);
                              setLogoAltForHome(isAnyVisible);
                         },
                         {
                              threshold: 0.1, // 10% visible = active
                         }
                    );

                    sections.forEach((section) => observer.observe(section));
               }
               //   Force refresh to calculate initial positions
               ScrollTrigger.refresh();
          };

          initScrollTriggers();

          return () => {
               isMounted = false;
               triggers.forEach(trigger => trigger.kill());
               if (observer) observer.disconnect();
          };
     }, [location.pathname, useScrollTriggers]);

     const isDisclaimer = location.pathname === "/disclaimer" || location.pathname === "/policy" || location.pathname === '/contact';
     const isPortfolio = location.pathname === "/portfolio-beyekls" || location.pathname === "/portfolio-daccord" || location.pathname === "/portfolio-coinpay" || location.pathname === "/portfolio-nectar";

     const handleClick = () => {
          window.location.href = "https://calendly.com/pyush-anand7/new-meeting";
     };

     return (
          <header className={`w-full fixed top-0 left-0 bg-white/4 ${isDisclaimer ? 'backdrop-blur-sm' : 'backdrop-blur-2xl'} z-9999 plus-jakarta-sans`}>
               <MenuOverlay isOpen={menuOpen} setIsOpen={setMenuOpen} startFetch={startFetch} />
               <div className="max-w-350.5 mx-auto flex items-center justify-between px-3 md:px-6 py-4">

                    {/* Portfolio Logo */}
                    {isPortfolio && (
                         <Link to='/' className="flex items-center gap-2 cursor-pointer">
                              <img
                                   src={logoAlt ? (navbar.logo1 ? navbar.logo1 : defaultDarkLogo) : (navbar.logo2 ? navbar.logo2 : defaultWhiteLogo)}
                                   alt="Kreeya Design Logo"
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
                                   alt="Kreeya Design Logo"
                                   loading="eager"
                                   fetchpriority="high"
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
          </header>
     );
};

export default HomeNavbar;
