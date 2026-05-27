import YtThumbnail from '../../assets/yt-thumbnail.webp';
import { useState } from 'react';
import { FaPlay } from "react-icons/fa";

const Youtube = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
       <div className='w-full px-4 md:px-0'>
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
                           <div className='w-15 md:w-20 h-15 md:h-20 rounded-full bg-[#FF0000] flex items-center justify-center absolute left-1/2 top-1/2 -translate-1/2 text-white'><FaPlay size={30}/></div>
                           <img src={YtThumbnail} alt="Youtube Thumbnail" width={800} height={450} className='w-full object-cover rounded-[3px]' />
                      </button>
                 )}
          </div>

            <div className='max-w-250 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between mt-10 mb-0 md:my-17 text-[#221429]'>
                 <div className='text-[26px] md:text-[23px] lg:text-[40px] font-bold max-w-40 poiret-one-regular'>Our Values</div>
                 <p className='text-[16px] md:text-[20px] lg:text-[24px] leading-7 md:leading-8 lg:leading-9 max-w-150 plus-jakarta-sans font-light'>Our goal as a people-focused UX/UI design firm is to improve the world. All of the people we work with, who we view as our greatest source of inspiration and strength, are at the core of our value system.</p>
          </div>
    </div>
  )
}

export default Youtube
