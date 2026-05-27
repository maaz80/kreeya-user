import React from 'react'

const Hero = () => {
     return (
          <div className='max-w-275 mx-auto mt-35 px-2 md:px-0'>
               {/* Heading */}
               <h1 className="poiret-one-regular text-3xl md:text-5xl xl:text-[56px] leading-9 md:leading-15 max-w-300 text-start">
                    Break Limits and Unleash the Future of Financial UX
               </h1>

               {/* Description */}
               <p className="mt-6 text-sm md:text-base xl:text-[24px] text-dark-black max-w-300 leading-7 md:leading-9 plus-jakarta-sans">
                    As financial UX pioneers we don’t just improve—we reinvent. Dopamine Banking's approach and digital experience branding empower financial brands, drive digital growth and create rich digital experiences that go far beyond generic service design.
               </p>
               {/* Video */}
               <div className="mt-14 rounded-[36px] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.15)]">

                    <div className="relative w-full pt-[56.25%] bg-black">

                         <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src="https://www.youtube-nocookie.com/embed/YHQ2AjuJ8Oc?autoplay=1&mute=1&loop=1&playlist=YHQ2AjuJ8Oc&controls=1&rel=0&modestbranding=1"
                              title="Banking UX Video"
                              loading="lazy"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                         ></iframe>

                    </div>
               </div>
          </div>
     )
}

export default Hero