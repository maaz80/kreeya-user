import ServiceHeroBG from "../../assets/location-hero-bg.webp";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import ContactForm from "../Location/Form";

const Hero = ({ service }) => {
     const [hero, setHero] = useState(null)
     const handleClick = () => {
          window.location.href = "https://calendly.com/pyush-anand7/new-meeting";
     }

     useEffect(() => {
          setHero(service?.hero);
          console.log(service);

     }, [service]);

     return (
          <section className="relative w-full min-h-screen bg-linear-to-b from-[#003D64] via-[#007CC9] to-[#003D64] text-white ">
               {/* Background Image Overlay */}
               <div className="absolute inset-0">
                    <img
                         src={ServiceHeroBG}
                         alt={service?.hero?.title || "Kreeya Design Service Hero"}
                         className="w-full min-h-[144vh] sm:min-h-[158vh] lg:min-h-screen h-full object-cover"
                    />
               </div>
               <div className="max-w-300.5 mx-auto flex flex-col lg:flex-row gap-20 items-center justify-center px-3 md:px-6 py-4 pt-24 md:pt-38 plus-jakarta-sans">

                    {/* LEFT CONTENT */}
                    <div className="space-y-6 z-999">
                         <h1 className="text-3xl md:text-5xl xl:text-[56px] max-w-180 poiret-one-regular leading-10 md:leading-15">
                              {hero?.title ? hero.title : 'Local Web Design Services Delhi'}
                         </h1>

                         <p className="text-sm md:text-base xl:text-[18px] max-w-xl plus-jakarta-sans font-medium mt-10">

                              {hero?.description ? hero.description : 'We help businesses in [City] stand out online with purposeful design.From brand identity to full website builds, Keeya Design crafts digital experiences that convert visitors into customers.'}
                         </p>

                         {/* Checklist */}
                         <div className="space-y-3 text-sm md:text-base xl:text-[18px] max-w-xl plus-jakarta-sans font-medium text-white mt-10">
                              {(hero?.points?.length > 0 ? hero?.points : [
                                   "Quick Delivery",
                                   "Full support",
                                   "others points",
                                   "to be filled by team",
                              ]).map((item, i) => (
                                   <div key={i} className="flex items-center gap-3">
                                        <span className="font-light">
                                             <IoCheckmarkSharp />
                                        </span>
                                        <span>{item}</span>
                                   </div>
                              ))}
                         </div>

                         {/* CTA */}
                         <button
                              onClick={handleClick}
                              type="submit"
                              className="btn group relative isolate overflow-hidden text-cust-orange bg-white text-[15px] md:text-[18px] w-44 md:w-60 h-12 lg:h-15 flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 hover:text-white border-none border cursor-pointer active:scale-99 "
                         >
                              <span className="relative z-10">Get in Touch</span>

                              <HiOutlineArrowLongRight
                                   size={30}
                                   className="hidden md:block relative z-10 text-cust-orange transition-all duration-300 group-hover:text-white"
                              />
                              <HiOutlineArrowLongRight
                                   size={24}
                                   className=" md:hidden relative z-10 text-cust-orange transition-all duration-300 group-hover:text-white"
                              />
                         </button>
                    </div>

                    {/* RIGHT FORM */}
                    <ContactForm />
               </div>
          </section>
     );
};

const Input = ({ label, placeholder }) => {
     return (
          <div>
               <label className="text-sm text-white mb-1 block">{label}</label>
               <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full bg-white/10 border border-white/20 rounded-md px-4 h-9 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
               />
          </div>
     );
};

export default Hero;