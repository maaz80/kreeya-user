
const Hero = () => {
     return (
          <section className="relative overflow-hidden pt-20 pb-6 md:pb-10 md:pt-28 lg:pt-36 lg:pb-14 " >
               {/* <img src={AboutHeroBg } alt="About Hero BG" width={1440} height={800} className="absolute inset-0 w-full object-cover" /> */}
               {/* Container */}
               <div className="max-w-300 mx-auto px-6 sm:px-10 lg:px-26 pt-10 relative z-20">

                    {/* About Label */}
                    {/* <span className="inline-block text-[#6B6470] text-[18px] md:text-[20px] font-medium mb-8 md:mb-12">
                         About Us
                    </span> */}

                    {/* Content */}
                    <div className="flex items-start gap-5 md:gap-8">

                         {/* Accent Line */}
                         <div className="mt-1 md:mt-3 w-1 md:w-1.5 h-20 md:h-17.5 bg-cust-orange shrink-0" />

                         {/* Text Content */}
                         <div className="max-w-275">

                              {/* Heading */}
                              <h1 className="text-dark-black text-[36px] sm:text-[42px] md:text-[48px] lg:text-[65px] leading-10 md:leading-13 lg:leading-15 poiret-one-regular tracking-tight">
                                   Our mission is to provide delightful experiences
                              </h1>

                              {/* Description */}
                              <p className="mt-3 md:mt-6 max-w-160 text-[20px] md:text-[26px] lg:text-[27px] font-medium md:font-normal poiret-one-regular text-dark-black leading-6 md:leading-7 lg:leading-8">
                                   By utilizing concepts, feelings, abilities, technology, and an abundance of coffee.
                              </p>
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default Hero;