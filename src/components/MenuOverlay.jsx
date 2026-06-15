import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { loadGSAP } from "../utils/gsapLoader";
import { useMenuH2Data } from "../hooks/useMenuH2Data";

const MenuOverlay = ({ isOpen, setIsOpen, startFetch = true }) => {

     const menuRef = useRef(null);
     const { portfolios, navigation } = useDataContext();
     const { pages = [], projects = [], socials = [] } = navigation || {};
     const h2Menu = useMenuH2Data()
     const textRef = useRef([]);

     textRef.current = [];

     const addToRefs = (el) => {
          if (el && !textRef.current.includes(el)) {
               textRef.current.push(el);
          }
     };

     const categories = [...portfolios.map((p) => p.name)];
console.log(categories);

     //   Updated version
     useEffect(() => {
          let timeline = null;

          const initAnimation = async () => {
               if (isOpen) {
                    const gsap = await loadGSAP();

                    timeline = gsap.timeline();

                    timeline.to(menuRef.current, {
                         y: "0%",
                         duration: 1,
                         ease: "power3.inOut"
                    }).to(textRef.current, {
                         opacity: 1,
                         y: 10,
                         stagger: 0.05,
                         duration: 0.3,
                         ease: "power3.out"
                    }, "-=0.3");
               }
          };

          initAnimation();

          return () => {
               if (timeline) timeline.kill();
          };
     }, [isOpen]);

     //   Updated version
     const closeMenu = () => {
          const animateClose = async () => {
               const gsap = await loadGSAP();

               const tl = gsap.timeline({
                    onComplete: () => setIsOpen(false)
               });

               tl.to(textRef.current, {
                    opacity: 0,
                    y: -10,
                    stagger: 0.03,
                    duration: 0.4,
                    ease: "power2.in"
               }).to(menuRef.current, {
                    y: "-100%",
                    duration: 1,
                    ease: "power3.inOut"
               });
          };

          animateClose();
     };

     //   Updated version
     useEffect(() => {
          let animation = null;

          const initAnimation = async () => {
               if (isOpen) {
                    const gsap = await loadGSAP();

                    document.body.style.overflow = "hidden";

                    animation = gsap.to(menuRef.current, {
                         y: "0%",
                         duration: 1,
                         ease: "power3.inOut"
                    });
               } else {
                    document.body.style.overflow = "";
               }
          };

          initAnimation();

          return () => {
               document.body.style.overflow = "";
               if (animation) animation.kill();
          };
     }, [isOpen]);

     const handleClick = () => {
          window.location.href = "https://calendly.com/pyush-anand7/new-meeting";
     }

     return (
          <div
               ref={menuRef}
               className="fixed inset-0 min-h-screen h-screen top-0 left-0 w-full flex flex-col md:flex-row z-99999 overscroll-none pb-10 -translate-y-full"

          >

               {/* LEFT */}
               <div className="relative w-full lg:w-[70%] min-h-[60vh] md:min-h-screen bg-[#f5f5f5] p-5 sm:p-15 lg:p-20 flex flex-col justify-between bg-image text-dark-black">
                    <div className="lg:hidden block">
                         <button
                              aria-label="Close menu"
                              onClick={closeMenu}
                              className=" absolute top-5 right-4 text-dark-black cursor-pointer hover:text-white z-9999"
                         >
                              <IoClose size={26} />
                         </button>

                    </div>
                    {/* White overlay */}
                    <div className="absolute inset-0 bg-white/70 z-10" />
                    <div className="flex items-start justify-between">
                         {/* <div className="space-y-3 md:space-y-6 text-[36px] lg:text-[48px] poiret-one-regular z-50">
                              <Link onClick={closeMenu} to="/portfolio-beyekls">
                                   <h2 className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black">WORK</h2>
                              </Link>

                              <Link onClick={closeMenu} to="/#services-section">
                                   <h2 className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black mt-4">SERVICES</h2>
                              </Link>

                              <Link onClick={closeMenu} to="/#about">
                                   <h2 className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black mt-4">ABOUT</h2>
                              </Link>

                              <Link onClick={closeMenu} to="/blogs">
                                   <h2 className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black mt-4">BLOG</h2>
                              </Link>

                              <Link onClick={closeMenu} to="/contact">
                                   <h2 className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black mt-4">CONTACT</h2>
                              </Link>
                         </div> */}

                         <div className="space-y-3 md:space-y-6 text-[36px] lg:text-[48px] poiret-one-regular z-50">

                              {pages.map((item, index) => (

                                   <Link key={item._id}
                                        onClick={closeMenu}
                                        to={item.link}
                                        className="block">

                                        <span ref={addToRefs} className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black uppercase">

                                             {item.name}

                                        </span>

                                   </Link>

                              ))}

                         </div>

                         <div className="space-y-5 text-[16px] lg:text-[20px] font-medium plus-jakarta-sans z-50 mr-10 md:mr-60 ">
                              {portfolios && portfolios.length > 0 && portfolios.map((portfolio, index) => {
                                   const slug = portfolio.name.toLowerCase().replace(/\s+/g, '-');
                                   return (
                                        <Link key={portfolio._id}
                                             onClick={closeMenu}
                                             to={`/${slug}`}
                                             className="block">
                                             <span ref={addToRefs} className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black cursor-pointer">{portfolio.name}</span>
                                        </Link>
                                   );
                              })}
                              {/* {projects.map((item, index) => (
                                   <Link key={item._id}
                                         onClick={closeMenu}
                                         to={item.link}
                                         className="block">
                                         <span ref={addToRefs} key={item._id} className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black cursor-pointer">{item.name}</span>
                                   </Link>
                              ))} */}
                              {/* <h2 className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black cursor-pointer">Real Estate</h2>
                              <h2 className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black cursor-pointer">Edtech</h2>
                              <h2 className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black cursor-pointer">Fintech</h2>
                              <h2 className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black cursor-pointer">Ecommerce</h2> */}
                         </div>
                    </div>

                    <div className="flex flex-wrap gap-5 md:gap-15 text-[14px] lg:text-[16px] font-medium plus-jakarta-sans z-50 mt-5 gap-y-0 leading-5">
                         {socials.map((item, index) => (
                              <Link key={item._id}
                                   onClick={closeMenu}
                                   to={item.link}
                                   className="block">
                                   <span ref={addToRefs} key={item._id} className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black mt-4 cursor-pointer">{item.name}</span>
                              </Link>
                         ))}
                         {/* <span className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black mt-4 cursor-pointer">Instagram</span>
                         <span className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black mt-4 cursor-pointer">Facebook</span>
                         <span className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black mt-4 cursor-pointer">Dribbble</span>
                         <span className="hover:text-cust-orange transition-all duration-300 ease-in-out text-dark-black mt-4 cursor-pointer">Behance</span> */}
                    </div>

               </div>

               {/* RIGHT */}
               <div className="w-full lg:w-[30%] min-h-[40vh] md:min-h-screen bg-cust-orange text-white flex flex-col justify-center items-center text-center pb-30 p-5 md:p-10 relative">

                    <div className="hidden lg:block">

                         <button
                              ref={addToRefs}
                              onClick={closeMenu}
                              aria-label="Close menu"
                              className=" absolute top-8 right-8 text-dark-black cursor-pointer hover:text-white"
                         >
                              <IoClose size={26} />
                         </button>
                    </div>

                    <div ref={addToRefs} className="flex flex-col items-start justify-start">
                         <h2 className="text-[36px] md:text-[48px] leading-12 md:leading-15 max-w-100 mb-3 md:mb-10 poiret-one-regular text-start font-medium">
                              {h2Menu.main_heading || 'Got something in mind? We\'d love to help.'}
                         </h2>

                         <button onClick={handleClick} className="header-btn group relative isolate overflow-hidden bg-cust-orange text-white w-60 lg:w-60 h-10 lg:h-15 flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 hover:text-cust-orange hover:border-cust-orange border cursor-pointer plus-jakarta-sans active:scale-99">
                              <span className="relative z-10">Get in Touch</span>

                              <HiOutlineArrowLongRight
                                   size={20}
                                   className="relative z-10 text-white transition-all duration-300 group-hover:text-cust-orange"
                              />
                         </button>
                    </div>

               </div>

          </div>
     );
};

export default MenuOverlay;