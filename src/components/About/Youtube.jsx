
import { useState } from 'react';
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Youtube = () => {
     const [isPlaying, setIsPlaying] = useState(false);

     return (
          <div className='w-full px-4 md:px-0'>
               <script type="application/ld+json">
                    {JSON.stringify({
                         "@context": "https://schema.org",
                         "@type": "VideoObject",
                         "name": "How to Build Your First AI Agent in 15 Min (No Coding)",
                         "description": "Watch Kreeya Design demonstrate how to build an AI agent in 15 minutes without any coding.",
                         "thumbnailUrl": [
                              "https://kreeyadesign.com/images/Build-your-first-ai-agent-in-15-no-coding.webp"
                         ],
                         "uploadDate": "2024-05-15T09:00:00+05:30",
                         "embedUrl": "https://www.youtube.com/embed/N2LMJ5ubfcU",
                         "contentUrl": "https://www.youtube.com/watch?v=N2LMJ5ubfcU"
                    })}
               </script>
               <div className='max-w-250 mx-auto relative rounded-[3px] overflow-hidden'>
                    {isPlaying ? (
                         <iframe
                              src='https://www.youtube.com/embed/N2LMJ5ubfcU?start=30&autoplay=1&rel=0'
                              title='Kreeya Design YouTube video'
                              className='w-full aspect-video rounded-[3px]'
                              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                              allowFullScreen
                         />
                    ) : (
                         <button
                              type='button'
                              onClick={() => setIsPlaying(true)}
                              aria-label='Play YouTube video'
                              className='relative block w-full cursor-pointer'
                         >
                              <div className='w-15 md:w-20 h-15 md:h-20 rounded-full bg-[#FF0000] flex items-center justify-center absolute left-1/2 top-1/2 -translate-1/2 text-white'><FaPlay size={30} /></div>
                              <img src='/images/Build-your-first-ai-agent-in-15-no-coding.webp' alt="Youtube Thumbnail" width={665} height={375} fetchPriority="high" loading="eager" className='w-full aspect-[665/375] object-cover rounded-[3px]' />
                         </button>
                    )}
               </div>

               <div className='max-w-250 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between mt-10 mb-0 md:my-17 text-[#221429]'>
                    <div className='text-[26px] md:text-[23px] lg:text-[40px] font-bold max-w-40 poiret-one-regular'>Our Values</div>
                    <p className='text-[16px] md:text-[20px] lg:text-[24px] leading-7 md:leading-8 lg:leading-9 max-w-150 plus-jakarta-sans font-light'>Our goal as a people-focused <Link to="/ui-ux-design-service-in-delhi" className='hover:font-semibold transition-all duration-300 ease-in-out'>UX/UI design</Link> firm is to improve the world. All of the people we work with, who we view as our greatest source of inspiration and strength, are at the core of our value system.</p>
               </div>
          </div>
     )
}

export default Youtube
