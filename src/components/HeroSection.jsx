import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { getHeros } from "../utils/heroService";
import { optimizeVideo } from "../utils/cloudinary";
import { initGSAP } from "../utils/gsapLoader";

const BackgroundShapes = lazy(() => import("./BackgroundShapes"));

// Text ko static constant mein rakhein taaki component re-render pe ye change na ho
const HERO_CONTENT = {
     topText: 'One Stop Solution',
     midLeftText: 'For',
     midRightText: 'All',
     bottomText: 'Your Design Needs',
     description: 'We design exceptional brands, products, web apps, mobile apps, websites for startups and enterprise'
};

const HeroSection = ({ startFetch = true }) => {
     const sectionRef = useRef(null);
     const videoRef = useRef(null);
     const videoElementRef = useRef(null);
     // State mein sirf video rakhein
     const [videoSrc, setVideoSrc] = useState(null);
     const [isVideoVisible, setIsVideoVisible] = useState(false);

     useEffect(() => {
          // Fetch video in the background immediately
          const fetchHeros = async () => {
               try {
                    const data = await getHeros();
                    if (data?.video) setVideoSrc(data.video);
               } catch (err) {
                    console.error("Hero video load fail:", err);
               }
          };
          fetchHeros();
     }, []);

     // Lazy load video element on IntersectionObserver
     useEffect(() => {
          if (!videoSrc || !videoRef.current) return;

          const observer = new IntersectionObserver(
               ([entry]) => {
                    if (entry.isIntersecting && !isVideoVisible) {
                         setIsVideoVisible(true);
                         observer.unobserve(entry.target);
                    }
               },
               { threshold: 0.1 }
          );

          observer.observe(videoRef.current);
          return () => observer.disconnect();
     }, [videoSrc, isVideoVisible]);

     useEffect(() => {
          if (!startFetch) return; // Only init animation when video finishes
          let animation = null;

          const initAnimation = async () => {
               const video = videoRef.current;
               const section = sectionRef.current;
               if (!video || !section) return;

               const { gsap, ScrollTrigger } = await initGSAP();

               // Schedule GSAP setup on next idle period
               const setup = () => {
                    const width = window.innerWidth;
                    const isTablet = width <= 1024;
                    const yValue = isTablet ? 310 : 1050;
                    const endValue = isTablet ? "+=300" : "+=1000";
                    const videoWidth = isTablet ? (width <= 768 ? 96 : 160) : 208;

                    animation = gsap.to(video, {
                         y: yValue,
                         scale: (window.innerWidth / videoWidth) * 1.0,
                         ease: "none",
                         scrollTrigger: {
                              id: "heroVideoAnimation",
                              trigger: section,
                              start: "top top",
                              end: endValue,
                              scrub: 0.5,
                              invalidateOnRefresh: true,
                         },
                    });
               };

               if (window.requestIdleCallback) {
                    window.requestIdleCallback(setup);
               } else {
                    setTimeout(setup, 1000);
               }
          };

          const events = ["scroll", "touchstart"];
          events.forEach((e) => window.addEventListener(e, initAnimation, { once: true }));

          return () => {
               events.forEach((e) => window.removeEventListener(e, initAnimation));
               animation?.scrollTrigger?.kill();
               animation?.kill();
          };
     }, []);

     useEffect(() => {
          if (!videoSrc) return;

          const scriptId = "hero-video-schema";
          let script = document.getElementById(scriptId);
          if (!script) {
               script = document.createElement("script");
               script.id = scriptId;
               script.type = "application/ld+json";
               script.text = JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "VideoObject",
                    "name": "Kreeya Design Agency Reel",
                    "description": HERO_CONTENT.description,
                    "thumbnailUrl": [videoSrc.replace(/\.[^/.]+$/, ".jpg")],
                    "uploadDate": "2024-01-01T08:00:00+05:30",
                    "contentUrl": videoSrc,
                    "embedUrl": "https://kreeyadesign.com"
               });
               document.head.appendChild(script);
          }

          return () => {
               if (script) script.remove();
          };
     }, [videoSrc]);

     return (
          <section ref={sectionRef} className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center text-heading px-5 md:px-20 pt-55 md:pt-32">
               <Suspense fallback={null}>
                    <BackgroundShapes />
               </Suspense>

               <div className="relative z-20 container mx-auto text-center text-dark-black font-semibold md:font-normal min-h-[400px] md:min-h-[500px] lg:min-h-[700px]">
                    {/* H1 is now fully static, Lighthouse will detect it immediately */}
                    <h1 className="text-[40px] md:text-[56px] lg:text-[120px] tracking-tight mb-4 md:mb-1 leading-[1.1] min-h-[44px] md:min-h-[62px] lg:min-h-[132px]">
                         {HERO_CONTENT.topText}
                    </h1>

                    <div className="flex items-center justify-center gap-4 text-[40px] md:text-[56px] lg:text-[120px] leading-[1.1] min-h-[56px] md:min-h-[72px] lg:min-h-[138px]">
                         <span>{HERO_CONTENT.midLeftText}</span>
                         <div
                              ref={videoRef}
                              className="inline-block w-24 md:w-40 lg:w-52 h-[52px] md:h-[60px] lg:h-[120px] bg-gray-100 overflow-hidden shrink-0"
                         >
                              {videoSrc && (
                                   <video
                                        ref={videoElementRef}
                                        src={isVideoVisible ? optimizeVideo(videoSrc) : undefined}
                                        autoPlay={isVideoVisible}
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        className="w-full h-full object-cover"
                                   />
                              )}
                         </div>
                         <span>{HERO_CONTENT.midRightText}</span>
                    </div>

                    <div className="text-[40px] md:text-[56px] lg:text-[120px] mt-1 leading-[1.1] min-h-[44px] md:min-h-[62px] lg:min-h-[132px]">
                         {HERO_CONTENT.bottomText}
                    </div>

                    <p className="w-full max-w-69 md:max-w-110 ml-auto mt-10 min-h-[72px] md:min-h-[84px] text-base md:text-lg leading-relaxed text-end text-blue plus-jakarta-sans">
                         {HERO_CONTENT.description}
                    </p>
               </div>
          </section>
     );
};

export default HeroSection;