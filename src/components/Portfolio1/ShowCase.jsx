import { useEffect, useRef } from "react"
import tires from '../../assets/beyekls-bg.webp'
import tiresMobile from '/images/beyekls-bg-mobile.webp'
import Port1 from '../../assets/beyekls-artifacts.webp'
import Port1Mobile from '../../assets/beyekls-artifacts-mobile.webp'
import { initGSAP } from "../../utils/gsapLoader"


const ShowCase = () => {

     const imageRef = useRef(null)
     const sectionRef = useRef(null)
     const showImage = window.innerWidth < 786 ? Port1Mobile : Port1;
     const showImageBG = window.innerWidth < 786 ? tiresMobile : tires;
     //   Updated version
     useEffect(() => {
          let scrollTriggerInstance = null;

          const initAnimation = async () => {
               const { gsap } = await initGSAP();

               const animation = gsap.fromTo(
                    imageRef.current,
                    { y: 200, opacity: 0 },
                    {
                         y: 0,
                         opacity: 1,
                         duration: 2,
                         ease: "power3.out",
                         scrollTrigger: {
                              trigger: sectionRef.current,
                              start: "top 70%",
                              toggleActions: "play none none reverse",
                         },
                    }
               );

               scrollTriggerInstance = animation.scrollTrigger;
          };

          initAnimation();

          return () => {
               scrollTriggerInstance?.kill();
          };
     }, []);

     return (
          <div ref={sectionRef} className='relative bg-white mb-5 md:mb-10 2xl:mb-10'>

               <div className="relative h-[21vh] md:h-[35vh] 2xl:h-screen">

                    <div className="absolute inset-0">

                         <img
                              src={showImageBG}
                              alt='Beyekls Bg'
                              className="absolute inset-0 w-full h-full object-cover scale-100 md:scale-110"
                         />

                         <div className="absolute w-[50%] mx-auto inset-0 bg-[#1e4fff] mix-blend-color opacity-15" />

                    </div>

                    <div className="absolute inset-0 bg-linear-to-br from-dark-black via-dark-black/50 to-dark-black -top-2 md:-top-5 2xl:-top-9 h-[23vh] md:h-[37vh] 2xl:h-[110vh]" />

               </div>

               <div
                    ref={imageRef}
                    className='z-50 absolute -bottom-20 md:-bottom-30 2xl:-bottom-40 w-83.25 md:w-160 2xl:w-299.5 left-1/2 -translate-x-1/2'
               >
                    <img src={showImage} alt="Beyekls Artifacts" className='w-83.25 h-60 md:w-160 md:h-100 2xl:w-299.5 2xl:h-210' />
               </div>

          </div>
     )
}

export default ShowCase