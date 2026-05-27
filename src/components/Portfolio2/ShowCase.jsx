import { useEffect, useRef } from "react"
import daccord from '../../assets/daccord-portfolio.webp'
import frameDaccord from '../../assets/daccord-portfolio-bg.webp'
import daccordSmall from '../../assets/daccord-portfolio-small.webp'
import frameDaccordSmall from '../../assets/daccord-portfolio-bg-small.webp'
import { initGSAP } from "../../utils/gsapLoader"

const ShowCase = () => {
     const showDaccordFrame = window.innerWidth < 786 ? frameDaccordSmall : frameDaccord;
     const showDaccord = window.innerWidth < 786 ? daccordSmall : daccord;
     const imageRef = useRef(null)
     const sectionRef = useRef(null)

     // Updated version
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
          <div ref={sectionRef} className='relative bg-white '>

               <div className="relative h-[33vh] lg:h-[58vh] 2xl:h-screen">

                    <div className="absolute inset-0">

                         <img
                              src={showDaccordFrame}
                              alt='Daccord Bg'
                              className="absolute inset-0 w-full h-full object-cover"
                         />

                    </div>

               </div>

               <div
                    ref={imageRef}
                    className='z-50 absolute top-5 w-83.25 md:w-160 2xl:w-250.5 left-1/2 -translate-x-1/2'
               >
                    <img src={showDaccord} alt="Daccord Portfolio" className='w-100 h-55 lg:w-150 lg:h-100 2xl:w-250 2xl:h-170' />
               </div>

          </div>
     )
}

export default ShowCase