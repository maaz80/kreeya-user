import React, { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Hero = ({ title, description }) => {
     const [isPlaying, setIsPlaying] = useState(false);

     const renderTitle = (text) => {
          if (!text) return null;
          if (text.includes("Financial UX")) {
               const parts = text.split("Financial UX");
               return parts.map((part, index) => (
                    <React.Fragment key={index}>
                         {part}
                         {index < parts.length - 1 && (
                              <Link to="/ui-ux-design-service-in-delhi" className="inline-block transition-all duration-300 hover:scale-102 origin-center">
                                   Financial UX
                              </Link>
                         )}
                    </React.Fragment>
               ));
          }
          return text;
     };

     const renderDescription = (text) => {
          if (!text) return null;
          if (text.includes("service")) {
               const parts = text.split("service");
               return parts.map((part, index) => (
                    <React.Fragment key={index}>
                         {part}
                         {index < parts.length - 1 && (
                              <Link to="/services" className="inline-block transition-all duration-300 hover:scale-102 origin-center">
                                   service
                              </Link>
                         )}
                    </React.Fragment>
               ));
          }
          return text;
     };

     return (
          <div className='max-w-275 mx-auto mt-40 md:mt-40  px-2 md:px-0'>
               <script type="application/ld+json">
                    {JSON.stringify({
                         "@context": "https://schema.org",
                         "@type": "VideoObject",
                         "name": title || "Banking UX Video",
                         "description": description || "Dopamine Banking UX design case study video.",
                         "thumbnailUrl": [
                              "https://kreeyadesign.com/images/Build-your-first-ai-agent-in-15-no-coding.webp"
                         ],
                         "uploadDate": "2024-01-01T08:00:00+05:30",
                         "embedUrl": "https://www.youtube.com/embed/YHQ2AjuJ8Oc",
                         "contentUrl": "https://www.youtube.com/watch?v=YHQ2AjuJ8Oc"
                    })}
               </script>
               {/* Heading */}
               <h1 className="poiret-one-regular text-3xl md:text-5xl xl:text-[56px] leading-9 md:leading-15 max-w-300 text-start">
                    {renderTitle(title || "Break Limits and Unleash the Future of Financial UX")}
               </h1>

               {/* Description */}
               <p className="mt-6 text-sm md:text-base xl:text-[24px] text-dark-black max-w-300 leading-7 md:leading-9 plus-jakarta-sans">
                    {renderDescription(description || "As financial UX pioneers we don’t just improve—we reinvent. Dopamine Banking's approach and digital experience branding empower financial brands, drive digital growth and create rich digital experiences that go far beyond generic service design.")}
               </p>
               {/* Video */}
               <div className="mt-14 rounded-[36px] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.15)]">

                    <div className="relative w-full pt-[56.25%] bg-black">
                         {isPlaying ? (
                              <iframe
                                   className="absolute top-0 left-0 w-full h-full"
                                   src="https://www.youtube-nocookie.com/embed/YHQ2AjuJ8Oc?autoplay=1&loop=1&playlist=YHQ2AjuJ8Oc&controls=1&rel=0&modestbranding=1"
                                   title="Banking UX Video"
                                   referrerPolicy="strict-origin-when-cross-origin"
                                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                   allowFullScreen
                              ></iframe>
                         ) : (
                              <button
                                   type='button'
                                   onClick={() => setIsPlaying(true)}
                                   aria-label='Play Banking UX Video'
                                   className='absolute inset-0 w-full h-full cursor-pointer group'
                              >
                                   {/* Thumbnail Image */}
                                   <img
                                        src="/images/Build-your-first-ai-agent-in-15-no-coding.webp"
                                        width={690}
                                        height={388}
                                        alt="Banking UX Case Study Video Thumbnail"
                                        loading="eager"
                                        fetchPriority="high"
                                        className="w-full h-full object-cover absolute inset-0 "
                                   />
                                   {/* Semi-transparent dark overlay */}
                                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300" />
                                   {/* Play Button */}
                                   <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FF0000] flex items-center justify-center absolute left-1/2 top-1/2 -translate-1/2 text-white shadow-lg group-hover:scale-110 active:scale-95 transition duration-300">
                                        <FaPlay size={30} className="ml-1" />
                                   </div>
                              </button>
                         )}
                    </div>
               </div>
          </div>
     )
}

export default Hero