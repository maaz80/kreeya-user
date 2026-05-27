import { useEffect, useRef, useState } from "react";
import work1 from "../../assets/coinpay-casestudy.webp";
import work2 from "../../assets/nectar-casestudy.webp";
import work3 from "../../assets/beyekls-casestudy.webp";
import work4 from "../../assets/daccord-casestudy.webp";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import Profile from '../../assets/profile.webp'
import { initGSAP, loadGSAP } from "../../utils/gsapLoader";
import { useH2Data } from "../../hooks/useH2data";

const works = [
     { img: work4, alt: 'Daccord Casestudy' },
     { img: work1, alt: 'Coinpay  Casestudy' },
     { img: work2, alt: 'Nectar  Casestudy' },
     { img: work3, alt: 'Beyekls  Casestudy' }
];

const testimonials = [
     {
          id: 1,
          avatar: Profile,
          quote:
               "Kreeya team did a great job with our app UI/UX, looking forward to working with them in the future",
          name: "John Doe",
          role: "Product Manager"
     },
     {
          id: 2,
          avatar: Profile,
          quote:
               "Amazing experience working with Kreeya. The team is extremely professional.",
          name: "Sarah Lee",
          role: "Founder"
     },
     {
          id: 3,
          avatar: Profile,
          quote:
               "They delivered a fantastic UI that improved our product usability.",
          name: "Michael Chen",
          role: "CTO"
     }
];
const WorkShowcase = () => {
     const [current, setCurrent] = useState(0);
     const sectionRef = useRef(null);
     const imagesRef = useRef([]);
     const contentRef = useRef(null);
     const h2landing = useH2Data()

     // Testimonial animation 
     useEffect(() => {
          const animateContent = async () => {
               const gsap = await loadGSAP();

               if (contentRef.current) {
                    gsap.fromTo(
                         contentRef.current,
                         { opacity: 0, x: 20 },
                         { opacity: 1, x: 0, duration: 0.4 }
                    );
               }
          };

          animateContent();
     }, [current]);

     //   Work animation useEffect — fixed
     useEffect(() => {
          let scrollTriggerInstance = null;

          const initWorkAnimation = async () => {
               const { gsap, ScrollTrigger } = await initGSAP();

               const tl = gsap.timeline({
                    scrollTrigger: {
                         trigger: sectionRef.current,
                         start: window.innerWidth < 800 ? "top 5%" : "top top",
                         end: () => "+=" + sectionRef.current.offsetHeight * 3,
                         scrub: true,
                         pin: true,
                         pinSpacing: true,
                         anticipatePin: 1,
                         invalidateOnRefresh: true,
                    },
               });

               imagesRef.current.forEach((img, i) => {
                    tl.fromTo(
                         img,
                         { x: 500, y: 100, opacity: 0, skewY: -6 },
                         {
                              x: window.innerWidth < 768 ? (i % 2 === 0 ? 20 : -20) : -40,
                              y: 20 + i * 50,
                              opacity: 1,
                              skewY: -4,
                              duration: 0.5,
                         },
                         i * 0.5
                    );
               });

               scrollTriggerInstance = tl.scrollTrigger;
          };

          initWorkAnimation();

          return () => {
               scrollTriggerInstance?.kill();
          };
     }, []);

     //   Resize useEffect — fixed
     useEffect(() => {
          const handleResize = async () => {
               const { ScrollTrigger } = await initGSAP();
               ScrollTrigger.refresh();
          };

          window.addEventListener("resize", handleResize);

          return () => {
               window.removeEventListener("resize", handleResize);
          };
     }, []);

     // arrow functions 
     const nextSlide = () => {
          setCurrent((prev) => (prev + 1) % testimonials.length);
     };

     const prevSlide = () => {
          setCurrent((prev) =>
               prev === 0 ? testimonials.length - 1 : prev - 1
          );
     };
     return (
          <section
               ref={sectionRef}
               className="work-showcase-section relative pt-20 min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#003D64] via-[#007CC9] to-[#003D64] text-white overflow-hidden z-9999"
          >

               {/* Heading */}

               <h2 className="text-center leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] poiret-one-regular mb-12 md:mb-20">
                    {h2landing.work_showcase_heading || 'We Let Our Work Speak'}
               </h2>

               {/* Images */}

               <div className="relative w-full max-w-150 lg:max-w-300 h-65 md:h-90 lg:h-100 mx-auto grid grid-cols-2 gap-0 md:gap-8 lg:block">

                    {works?.map((work, index) => (

                         <img
                              key={index}
                              ref={(el) => (imagesRef.current[index] = el)}
                              src={work.img}
                              alt={work.alt}
                              className="w-full max-w-65 mx-auto lg:absolute lg:max-w-112.5 shadow-2xl"
                              style={{
                                   left: `${index * 23}%`,
                                   transform: "translateY(200px)"
                              }}
                         />

                    ))}

               </div>


               {/* Testimonials */}

               <div className="w-full max-w-full lg:max-w-300 mx-auto mt-50 md:mt-60 lg:mt-40 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 mb-10 md:mb-20 p-5 lg:p-0">

                    {/* Left heading */}

                    <div className="text-4xl md:text-[56px] lg:text-7xl  max-w-full lg:max-w-155 leading-12 md:leading-15 lg:leading-21 text-center lg:text-start">
                         What Our Clients Are Saying...
                    </div>

                    {/* Right content */}

                    <div className="flex items-start md:items-center gap-4 md:gap-8 max-w-full lg:max-w-150 plus-jakarta-sans">

                         {/* Avatar */}

                         <img
                              src={testimonials[current].avatar}
                              alt={`Testimonial Profile For ${testimonials[current].name}`}
                              className="w-25 md:w-40 h-25 md:h-40 rounded-full object-cover"
                         />

                         {/* Content */}

                         <div className="flex flex-col gap-2">

                              {/* Animated content */}
                              <div ref={contentRef} className="flex flex-col gap-2">

                                   <p className="text-[12px] md:text-[20px] opacity-90 max-w-full lg:max-w-100">
                                        “{testimonials[current].quote}”
                                   </p>

                                   <div>
                                        <h3 className="font-bold text-[14px] md:text-[24px]">
                                             {testimonials[current].name}
                                        </h3>

                                        <p className="text-[12px] md:text-[20px]">
                                             {testimonials[current].role}
                                        </p>
                                   </div>

                              </div>

                              {/* Static buttons */}
                              <div className="flex gap-3 mt-4 justify-end">

                                   <button
                                        onClick={prevSlide}
                                        className="w-10 lg:w-12 h-10 lg:h-12 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                                   >
                                        <HiArrowLeft />
                                   </button>

                                   <button
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
};

export default WorkShowcase;
