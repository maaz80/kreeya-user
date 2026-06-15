import { useEffect, useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import { useH2Data } from "../../hooks/useH2data";
import { normalizeRouteSlug } from "../../utils/slug";
import TemplateImage from '../../assets/service1.webp';
const servicesData = [
     {
          title: "Digital Marketing",
          image: TemplateImage,
          items: [
               { title: "Performance Marketing"},
               { title: "Instagram Marketing"},
               { title: "Search Engine Optimization"},
               { title: "LinkedIn Marketing"},
               { title: "Social Media Management"},
               { title: "Search Engine Marketing"},
          ]
     },
     {
          title: "Development",
          image: TemplateImage,
          items: [
               { title: "Web Development"},
               { title: "Webflow Development"},
               { title: "Mobile App Development"},
               { title: "Shopify Development"},
               { title: "Word Press Expert"},
               { title: "UI Development"},
          ]
     },
     {
          title: "UI/UX Design",
          image: TemplateImage,
          items: [
               { title: "User Research"},
               { title: "Wireframing & Prototyping"},
               { title: "Visual Design"},
               { title: "Interaction Design"},
               { title: "Design Systems"},
          ]
     }
];
export default function HelpSection() {

     const { services, testimonials } = useDataContext();
     const [active, setActive] = useState(null);
     const [current, setCurrent] = useState(0);
     const location = useLocation();
     const h2Home = useH2Data()
     const navigate = useNavigate();

     const getServiceItemRoute = (service, item) =>
          `/${normalizeRouteSlug(item?.slug || item?._id)}`;


     // Smooth scroll for navigation 
     useEffect(() => {
          const navType = performance.getEntriesByType("navigation")[0]?.type;

          if (location.hash && navType !== "reload") {
               const el = document.querySelector(location.hash);

               if (el) {
                    setTimeout(() => {
                         el.scrollIntoView({
                              behavior: "smooth"
                         });
                    }, 200);
               }
          }
     }, [location]);




     // arrow functions 
     const nextSlide = () => {
          setCurrent((prev) => (prev + 1) % testimonials.length);
     };

     const prevSlide = () => {
          setCurrent((prev) =>
               prev === 0 ? testimonials.length - 1 : prev - 1
          );
     };
     const testimonial = testimonials[current] || {};
     return (
          <section id="white-logo-section" className="bg-linear-to-b from-[#003D64] via-[#007CC9] to-[#003D64] text-white p-3 md:p-5 lg:p-20 relative z-999">

               <div className="mx-auto px-3 md:px-6">

                    {/* Heading */}

                    <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px]">
                         {h2Home.help_section || 'We Can Help You with'}
                    </h2>

                    {/*DESKTOP VERSION*/}

                    <div className="hidden lg:block">

                         {services.map((service, index) => {
                              const validItems = service?.items?.filter((item) => {
                                   if (!item?._id && !item?.slug) return true;
                                   return !!item?.hero?.title;
                              }) || [];
                              if (validItems.length === 0) return null;

                              const leftPoints = validItems.filter((_, i) => i % 2 === 0);
                              const rightPoints = validItems.filter((_, i) => i % 2 !== 0);

                              return (

                                   <div
                                        key={index}
                                        className="border-b group border-white/20 py-16 flex justify-between gap-10 items-center plus-jakarta-sans overflow-hidden"
                                        onMouseEnter={() => setActive(index)}
                                        onMouseLeave={() => setActive(null)}
                                   >

                                        {/* Title */}
                                        <h3 className="text-[57px]">
                                             {service.title}
                                        </h3>

                                        {/* Image */}
                                        <div className="flex justify-start">
                                             <img
                                                  src={service.image}
                                                  alt={service.title}
                                                  width={320}
                                                  height={280}
                                                  className="w-[320px] rotate-40 opacity-0 translate-y-70 translate-x-70 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 scale-95 group-hover:scale-105 group-hover:rotate-2 ease-in-out rounded-xl"
                                             />
                                        </div>

                                        {/* Services */}
                                        <div className="grid grid-cols-2 gap-6 text-[20px] leading-9 font-medium">

                                             <ul className="space-y-3 w-58">
                                                  {leftPoints.map((item, i) => (
                                                       <li className="cursor-pointer" onClick={() => {
                                                            if (!item?.hero?.title) return;
                                                            navigate(getServiceItemRoute(service, item));
                                                       }} key={i}>{item.title}</li>
                                                  ))}
                                             </ul>

                                             <ul className="space-y-3 w-58">
                                                  {rightPoints.map((item, i) => (
                                                       <li className="cursor-pointer" onClick={() => {
                                                            if (!item?.hero?.title) return;
                                                            navigate(getServiceItemRoute(service, item));
                                                       }} key={i}>{item.title}</li>
                                                  ))}
                                             </ul>

                                        </div>

                                   </div>

                              );

                         })}

                    </div>

                    {/* TABLET / MOBILE VERSION*/}

                    <div className="lg:hidden mt-10 w-full">

                         {services.map((service, index) => {

                              const open = active === index;
                              const validItems = service?.items?.filter((item) => {
                                   if (!item?._id && !item?.slug) return true;
                                   return !!item?.hero?.title;
                              }) || [];
                              if (validItems.length === 0) return null;

                              const leftPoints = validItems.filter((_, i) => i % 2 === 0);
                              const rightPoints = validItems.filter((_, i) => i % 2 !== 0);

                              return (

                                   <div key={index}

                                        className="border-b border-white/20 py-6">

                                        {/* Header */}

                                        <div
                                             className="flex items-center justify-between cursor-pointer"
                                             onClick={() => setActive(open ? null : index)}
                                        >

                                             <h3 className="text-[24px] md:text-[48px]">
                                                  {service.title}
                                             </h3>

                                             {open ? <HiMinus /> : <HiPlus />}

                                        </div>

                                        {/* Content */}

                                        <div
                                             className={`overflow-hidden transition-all w-full duration-500 ${open ? "max-h-125 mt-6" : "max-h-0"
                                                  }`}
                                        >

                                             <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6 text-[14px] md:text-[20px] mt-4">

                                                  <div className="flex flex-row md:flex-col items-start justify-between w-full">
                                                       <ul className="space-y-2 ">
                                                            {leftPoints.map((item, i) => (
                                                                 <li
                                                                      onClick={() => {
                                                                           if (!item?.hero?.title) return;

                                                                           setActive(open ? null : index);
                                                                           navigate(getServiceItemRoute(service, item));
                                                                      }} key={i}>{item.title}</li>
                                                            ))}
                                                       </ul>

                                                       <ul className="space-y-2 mt-1 ">
                                                            {rightPoints.map((item, i) => (
                                                                 <li
                                                                      onClick={() => {
                                                                           if (!item?.hero?.title) return;

                                                                           setActive(open ? null : index);
                                                                           navigate(getServiceItemRoute(service, item));
                                                                      }} key={i}>{item.title}</li>
                                                            ))}
                                                       </ul>
                                                  </div>

                                                  <div className="flex justify-center ">

                                                       <img
                                                            src={service.image}
                                                            alt={service.title}
                                                            width="300"
                                                            height="200"
                                                            className="w-full md:w-75 h-37.5 md:h-50 rotate-0 md:rotate-6 rounded-xl"
                                                       />

                                                  </div>
                                             </div>



                                        </div>

                                   </div>

                              );

                         })}

                    </div>

               </div>


               {/* Testimonials */}

               <div className="w-full max-w-full lg:max-w-300 mx-auto mt-10 md:mt-20 lg:mt-40 flex flex-col lg:flex-row items-start justify-center lg:justify-between gap-10 mb-10 md:mb-20 p-5 lg:p-0">

                    {/* Left heading */}

                    <div className="text-4xl md:text-[56px] lg:text-7xl  max-w-full lg:max-w-155 leading-12 md:leading-15 lg:leading-21 text-center lg:text-start">
                         What Our Clients Are Saying...
                    </div>

                    {/* Right content */}

                    <div className="flex items-start md:items-start gap-4 md:gap-8 max-w-full lg:max-w-150 plus-jakarta-sans">

                         {/* Avatar */}

                         <div className="min-w-25 md:min-w-40 h-25 md:h-40 overflow-hidden">
                              <img
                                   src={testimonial.avatar}
                                   alt={`testimonial-for-${testimonial.name}`}
                                   width="160"
                                   height="160"
                                   className="w-full h-full rounded-full object-cover"
                              />
                         </div>

                         {/* Content */}

                         <div className="flex flex-col gap-2">

                              {/* Animated content */}
                              <div key={current} className="flex flex-col gap-2 testimonial-fade-slide-in">

                                   <p className="text-[12px] md:text-[20px] opacity-90 max-w-full lg:max-w-100">
                                        “{testimonial.quote}”
                                   </p>

                                   <div>
                                        <h3 className="font-bold text-[14px] md:text-[24px]">
                                             {testimonial.name}
                                        </h3>

                                        <p className="text-[12px] md:text-[20px]">
                                             {testimonial.role}
                                        </p>
                                   </div>

                              </div>

                              {/* Static buttons */}
                              <div className="flex gap-3 mt-4 justify-end">

                                   <button
                                        aria-label="Previous Testimonial Button"
                                        onClick={prevSlide}
                                        className="w-10 lg:w-12 h-10 lg:h-12 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                                   >
                                        <HiArrowLeft />
                                   </button>

                                   <button
                                        aria-label="Next Testimonial Button"
                                        onClick={nextSlide}
                                        className="w-10 lg:w-12 h-10 lg:h-12 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                                   >
                                        <HiArrowRight />
                                   </button>

                              </div>

                         </div>

                    </div>

               </div>
          </section>
     );
}
