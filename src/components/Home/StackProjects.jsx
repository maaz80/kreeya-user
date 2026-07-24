import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/coinpay-casestudy.webp";
import img2 from "../../assets/nectar-casestudy.webp";
import img3 from "../../assets/beyekls-casestudy.webp";
import img4 from "../../assets/daccord-casestudy.webp";
import img1Mob from "../../assets/coinpay-casestudy-mobile.webp";
import img2Mob from "../../assets/nectar-casestudy-mobile.webp";
import img3Mob from "../../assets/beyekls-casestudy-mobile.webp";
import img4Mob from "../../assets/daccord-casestudy-mobile.webp";
import { initGSAP } from "../../utils/gsapLoader";
import { useH2Data } from "../../hooks/useH2data";


const stackImages = [
     { desktop: img3, mobile: img3Mob, link: "/portfolio-beyekls", alt: 'Beyekls Casestudy' },
     { desktop: img2, mobile: img2Mob, link: "/portfolio-nectar", alt: 'Nectar  Casestudy' },
     { desktop: img1, mobile: img1Mob, link: "/portfolio-coinpay", alt: 'Coinpay  Casestudy' },
     { desktop: img4, mobile: img4Mob, link: "/portfolio-daccord", alt: 'Daccord  Casestudy' }
];

export default function StackCards() {
     const navigate = useNavigate()
     const sectionRef = useRef(null);
     const cardsRef = useRef([]);
     const h2Home = useH2Data()

     useEffect(() => {
          let animation = null;
          let vh = 0;

          const initAnimation = async () => {
               const { gsap, ScrollTrigger } = await initGSAP();

               const cards = cardsRef.current;
               const isMobile = window.innerWidth < 768;
               vh = window.innerHeight; // Cache it once
               gsap.set(cards, {
                    y: "100vh",
                    opacity: 1,
               });

               animation = gsap.timeline({
                    scrollTrigger: {
                         trigger: sectionRef.current,
                         start: isMobile ? "top 15%" : "top top",
                         end: () => "+=" + cards.length * (isMobile ? vh * 0.5 : vh),
                         pin: true,
                         scrub: 1,
                         anticipatePin: 1,
                         invalidateOnRefresh: true,
                    },
               });

               cards.forEach((card, index) => {
                    animation.to(card, { y: 0, duration: 1, ease: "none" }, index);

                    for (let i = 0; i < index; i++) {
                         animation.to(
                              cards[i],
                              {
                                   scale: 1 - (index - i) * 0.05,
                                   y: 0 - (index - i) * 15,
                                   transformOrigin: "center top",
                                   duration: 1,
                                   ease: "none",
                              },
                              index
                         );
                    }
               });

               requestAnimationFrame(() => ScrollTrigger.refresh());
          };

          const startSetup = () => {
               initAnimation();
          };

          const events = ["scroll", "touchstart", "mousemove"];
          events.forEach((e) => window.addEventListener(e, startSetup, { once: true }));

          return () => {
               events.forEach((e) => window.removeEventListener(e, startSetup));
               animation?.scrollTrigger?.kill();
               animation?.kill();
          };
     }, []);


     return (
          <div className="z-999 relative -mb-45 md:mb-100 mt-20 md:mt-20">

               <section
                    ref={sectionRef}
                    className="relative min-h-screen flex items-center flex-col justify-center"
               >
                    <div className="flex flex-col justify-center items-center w-[95vw] md:w-[95vw] mb-10">
                         <h2 className="poiret-one-regular leading-12 md:leading-15 lg:leading-21 text-[36px] md:text-[56px] lg:text-[72px] text-center lg:text-start">{h2Home.stack_projects_heading || 'Designed With Industry Expertise'}</h2>
                    </div>
                    <div className="w-[85%] flex justify-end mb-20">
                         {/* <div>.</div> */}
                         <p className="text-[12px] md:text-[16px] lg:text-[24px] leading-5 md:leading-6 lg:leading-9 text-end max-w-[65vw] md:max-w-[43vw] plus-jakarta-sans text-blue">We let our work speak for itself. See our work and know why we are different from regular design agencies.</p>
                    </div>
                    <div className="relative w-full h-125">

                         {stackImages.map((item, index) => (

                              <div
                                   key={index}
                                   ref={(el) => (cardsRef.current[index] = el)}
                                   className="absolute top-0 left-0 w-full cursor-pointer"
                                   onClick={() => navigate(item.link)}
                              >
                                   <picture>
                                        <source media="(max-width: 786px)" srcSet={item.mobile} />
                                        <img
                                             src={item.desktop}
                                             alt={item.alt}
                                             width="1300"
                                             height="800"
                                             loading="lazy"
                                             decoding="async"
                                             className="w-112.5 md:w-250 2xl:w-325 mx-auto h-70 md:h-160 lg:h-200"
                                        />
                                   </picture>
                              </div>

                         ))}
                    </div>

               </section >
          </div>
     );
}