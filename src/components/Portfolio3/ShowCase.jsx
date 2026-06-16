import { useEffect, useRef } from "react"
import coinpayShowcase from '../../assets/coinpay-portfolio.webp'
import coinpayShowcaseSmall from '../../assets/coinpay-portfolio-small.webp'
import BG from '../../assets/bg.webp'
import { initGSAP } from "../../utils/gsapLoader"

const ShowCase = () => {
     const imageRef = useRef(null)
     const sectionRef = useRef(null)

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
          <div ref={sectionRef} className='relative overflow-hidden'>

               <div className="relative h-[33vh] md:h-[58vh] 2xl:h-screen">

                    <div className="absolute inset-0">

                         <img
                              src={BG}
                              alt='Background Image'
                              className="absolute inset-0 w-full h-full object-cover"
                         />

                    </div>
                    <div className="absolute inset-0 bg-linear-to-r from-[#304FFF] to-[#000B43] mix-blend-multiply opacity-100" />
               </div>

               <div
                    ref={imageRef}
                    className='z-50 absolute bottom-0 w-83.25 md:w-160 2xl:w-250.5 left-1/2 -translate-x-1/2'
               >
                    <picture>
                         <source media="(max-width: 785px)" srcSet={coinpayShowcaseSmall} />
                         <img src={coinpayShowcase} alt="CoinPay Portfolio" className='w-100 h-60 lg:w-150 lg:h-110 2xl:w-250 2xl:h-170' />
                    </picture>
               </div>

          </div>
     )
}

export default ShowCase