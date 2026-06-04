import { useEffect, useState } from "react";
import TestimonialBG from "../../assets/testimonials-bg.webp";
import Avatar from "../../assets/profile.webp";
import { getTestimonials } from "../../utils/testimonial";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const staticTestimonials = [
     {
          name: "Aman Verma",
          role: "Restaurant Owner",
          quote: "Amazing service! Hamara business online shift karna bahut easy ho gaya.",
          avatar: Avatar
     },
     {
          name: "Sneha Kapoor",
          role: "Entrepreneur",
          quote: "Highly professional team. UI/UX aur performance dono top-notch hai.",
          avatar: Avatar
     },
     {
          name: "Rahul Sharma",
          role: "Startup Founder",
          quote: "Delivery system integration flawless tha. ROI bhi kaafi improve hua.",
          avatar: Avatar
     }
];

const Testimonial = () => {
     const [testimonials, setTestimonials] = useState(staticTestimonials);
     const [current, setCurrent] = useState(0);
     const [animate, setAnimate] = useState(true);

     useEffect(() => {
          setAnimate(false);

          const timeout = setTimeout(() => {
               setAnimate(true);
          }, 20); // reflow trigger

          return () => clearTimeout(timeout);
     }, [current]);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const data = await getTestimonials();
                    setTestimonials(Array.isArray(data) && data.length ? data : staticTestimonials);
               } catch (error) {
                    console.error(error);
                    setTestimonials(staticTestimonials);
               }
          };
          fetchData();
     }, []);

     const nextSlide = () => {
          if (!testimonials.length) return;
          setCurrent((prev) => (prev + 1) % testimonials.length);
     };

     const prevSlide = () => {
          if (!testimonials.length) return;
          setCurrent((prev) =>
               prev === 0 ? testimonials.length - 1 : prev - 1
          );
     };

     const testimonial = testimonials[current] || {};

     return (
          <div className="relative min-h-150 text-white pt-18 lg:pt-8 flex flex-col items-center justify-center">

               {/* Background */}
               <div className="absolute inset-0">
                    <img
                         src={TestimonialBG}
                         alt="Testimonial Background"
                         className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
               </div>

               {/* Content */}
               <div className="relative z-10 max-w-300 mx-auto  flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 mb-10 md:mb-20 px-5 lg:px-0 ">

                    {/* Heading */}
                    <div className="text-4xl md:text-[56px] lg:text-7xl max-w-150 leading-tight text-center lg:text-left poiret-one-regular w-full lg:w-[50%]">
                         What Our Clients Are Saying...
                    </div>

                    {/* Right */}
                    <div className="flex gap-4 md:gap-8 max-w-150 plus-jakarta-sans w-full lg:w-[50%] mt-0 md:mt-4">

                         {/* Avatar */}
                         <div className="min-w-20 md:min-w-35 h-20 md:h-35">
                              <img
                                   src={testimonial.avatar}
                                   alt={`${testimonial.name} - Avatar`}
                                   className="w-full h-full rounded-full object-cover"
                              />
                         </div>

                         {/* Content */}
                         <div className="flex flex-col gap-3 w-[70%] ">

                              <div className={`testimonial-anim ${animate ? "show" : ""}`}>
                                   <p className="text-sm md:text-lg opacity-90">
                                        “{testimonial.quote}”
                                   </p>

                                   <div className="mt-2">
                                        <h3 className="font-bold text-base md:text-xl">
                                             {testimonial.name}
                                        </h3>
                                        <p className="text-sm md:text-base opacity-80">
                                             {testimonial.role}
                                        </p>
                                   </div>
                              </div>

                              {/* Buttons */}
                              <div className="flex gap-3 -mt-2 justify-end">
                                   <button
                                        onClick={prevSlide}
                                        aria-label="Previous Testimonial"
                                        className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 ease-in-out cursor-pointer"
                                   >
                                        <HiArrowLeft />
                                   </button>

                                   <button
                                        onClick={nextSlide}
                                        aria-label="Next Testimonial"
                                        className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 ease-in-out cursor-pointer"
                                   >
                                        <HiArrowRight />
                                   </button>
                              </div>

                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Testimonial;