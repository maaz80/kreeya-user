import logo from "../../assets/logo.webp";
import LogoWhite from '../../assets/white-logo.webp'
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useEffect, useState } from "react";
import MenuOverlay from "../MenuOverlay";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getScrollTrigger } from "../../utils/gsapLoader";

const LandingNavbar = () => {
     const [menuOpen, setMenuOpen] = useState(false);
     const [logoAlt, setLogoAlt] = useState(false);
     const navigate = useNavigate();

     useEffect(() => {
          let scrollTriggerInstance = null;

          const initScrollTrigger = async () => {
               const ScrollTrigger = await getScrollTrigger(); //   Get ScrollTrigger only

               const el = document.querySelector(".work-showcase-section");

               if (el) {
                    scrollTriggerInstance = ScrollTrigger.create({
                         trigger: el,
                         start: "top top",
                         end: () => "+=" + el.offsetHeight * 4,
                         onEnter: () => setLogoAlt(true),
                         onEnterBack: () => setLogoAlt(true),
                         onLeave: () => setLogoAlt(false),
                         onLeaveBack: () => setLogoAlt(false)
                    });
               }
          };

          initScrollTrigger();

          return () => {
               if (scrollTriggerInstance) scrollTriggerInstance.kill();
          };
     }, []);

     const handleClick = () => {
          window.location.href = "https://calendly.com/pyush-anand7/new-meeting";
     };

     const handleLogo = () => {
          navigate('/');
     };

     return (
          <header className="w-full fixed bg-white/4 backdrop-blur-2xl z-99999 plus-jakarta-sans">
               <MenuOverlay isOpen={menuOpen} setIsOpen={setMenuOpen} />
               <div className="max-w-350.5 mx-auto flex items-center justify-between px-3 md:px-6 py-4">

                    <div onClick={handleLogo} className="flex items-center gap-2 cursor-pointer">
                         <img
                              src={logoAlt ? LogoWhite : logo}
                              alt="Kreeya Design - UI UX & Branding Agency Logo"
                              className="w-23.75 md:w-31.75 lg:w-40 transition-all duration-300 ease-in-out"
                         />
                    </div>

                    <div className="lg:flex items-center justify-center gap-5 hidden">
                         <a
                              href="mailto:business@kreeyadesign.com"
                              className={`flex items-center gap-1 text-[18px] transition-all duration-300 ease-in-out hover:text-cust-orange ${logoAlt ? "text-white" : "text-dark-black"}`}
                         >
                              <MdOutlineMailOutline />
                              <span>business@kreeyadesign.com</span>
                         </a>
                         <a
                              href="tel:9311500423"
                              className={`flex items-center gap-1 text-[18px] transition-all duration-300 ease-in-out hover:text-cust-orange ${logoAlt ? "text-white" : "text-dark-black"}`}
                         >
                              <MdOutlinePhoneInTalk />
                              <span>9311500423</span>
                         </a>
                    </div>

                    <div className="flex items-center gap-6">
                         <button
                              onClick={handleClick}
                              className="header-btn group relative isolate overflow-hidden bg-cust-orange text-white text-sm w-32.25 lg:w-38.75 h-10 lg:h-12 flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 hover:text-cust-orange hover:border-cust-orange hover:border cursor-pointer active:scale-99"
                         >
                              <span className="relative z-10">Get in Touch</span>
                              <HiOutlineArrowLongRight size={20} className="relative z-10 text-white transition-all duration-300 group-hover:text-cust-orange" />
                         </button>
                    </div>
               </div>
          </header>
     );
};

export default LandingNavbar;