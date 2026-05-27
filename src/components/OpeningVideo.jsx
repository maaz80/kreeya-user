import { useEffect, useRef, useState } from "react";
import { getVideos } from "../utils/openingVideo";
import { optimizeVideo } from "../utils/cloudinary";
import { loadGSAP } from "../utils/gsapLoader";

const OpeningVideo = ({ onFinish }) => {
     const containerRef = useRef();
     const videoRef = useRef();
     const [videoUrl, setVideoUrl] = useState(null);
     const [isReady, setIsReady] = useState(false);
     const [showLoader, setShowLoader] = useState(true);

     // 🔹 Disable scroll when video is active
     useEffect(() => {
          document.documentElement.classList.add("no-scroll");
          return () => {
               document.documentElement.classList.remove("no-scroll");
          };
     }, []);

     // 🔹 Fetch video with caching
     useEffect(() => {
          const fetchVideos = async () => {
               try {
                    let cachedVideoUrl = sessionStorage.getItem("openingVideoUrl");

                    if (cachedVideoUrl) {
                         console.log("Using cached video from session storage");
                         setVideoUrl(cachedVideoUrl);
                         setShowLoader(false); // Hide immediately for cache
                         return;
                    }

                    let cachedVideoData = localStorage.getItem("openingVideoData");

                    if (cachedVideoData) {
                         const parsedData = JSON.parse(cachedVideoData);
                         const cacheTime = parsedData.timestamp;
                         const now = Date.now();
                         const cacheDuration = 7 * 24 * 60 * 60 * 1000;

                         if (now - cacheTime < cacheDuration) {
                              console.log("Using cached video from localStorage");
                              const optimized = optimizeVideo(parsedData.videoUrl);
                              setVideoUrl(optimized);
                              sessionStorage.setItem("openingVideoUrl", optimized);
                              setShowLoader(false);
                              return;
                         }
                    }

                    console.log("Fetching fresh video from backend");
                    const data = await getVideos();

                    if (data?.video) {
                         const optimized = optimizeVideo(data.video);

                         localStorage.setItem("openingVideoData", JSON.stringify({
                              videoUrl: data.video,
                              timestamp: Date.now()
                         }));

                         sessionStorage.setItem("openingVideoUrl", optimized);
                         setVideoUrl(optimized);
                    }
               } catch (err) {
                    console.error("Video fetch error:", err);
                    const fallbackVideo = sessionStorage.getItem("openingVideoUrl");
                    if (fallbackVideo) {
                         setVideoUrl(fallbackVideo);
                    }
               }
          };

          fetchVideos();
     }, []);

     // 🔹 Better video ready handling with preload
     useEffect(() => {
          const video = videoRef.current;
          if (!video || !videoUrl) return;

          // Force preload
          video.preload = "auto";

          const handleCanPlayThrough = () => {
               setIsReady(true);
               setShowLoader(false);
               video.play().catch(() => { });
          };

          const handleLoadedData = () => {
               // Hide loader as soon as data is loaded
               setShowLoader(false);
          };

          video.addEventListener("canplaythrough", handleCanPlayThrough);
          video.addEventListener("loadeddata", handleLoadedData);

          // If video already has data
          if (video.readyState >= 3) {
               setIsReady(true);
               setShowLoader(false);
               video.play().catch(() => { });
          }

          return () => {
               video.removeEventListener("canplaythrough", handleCanPlayThrough);
               video.removeEventListener("loadeddata", handleLoadedData);
          };
     }, [videoUrl]);

     // 🔹 On video end → animate out
     const handleVideoEnd = () => {
          const animateOut = async () => {
               const gsap = await loadGSAP();
               gsap.to(containerRef.current, {
                    y: "-100%",
                    duration: 0.5,
                    ease: "power3.inOut",
                    onComplete: () => {
                         onFinish();
                         // Completely remove from DOM
                         if (containerRef.current) {
                              containerRef.current.style.display = "none";
                         }
                    },
               });
          };
          animateOut();
     };

     return (
          <div
               ref={containerRef}
               aria-hidden="true"
               className="fixed inset-0 z-99999 bg-linear-to-b from-[#226296] via-[#5777ce] to-[#226296] flex items-center justify-center"
          >
               {/* 🔹 Loader - Only show if needed */}
               {showLoader && (
                    <div className="absolute text-white text-sm plus-jakarta-sans z-50">
                         Loading...
                    </div>
               )}

               {/* 🔹 Video - Always render with proper styling */}
               {videoUrl && (
                    <video
                         ref={videoRef}
                         autoPlay
                         muted
                         playsInline
                         preload="auto"
                         onEnded={handleVideoEnd}
                         className={`w-full h-full object-cover transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"
                              }`}
                    >
                         <source src={videoUrl} type="video/mp4" />
                    </video>
               )}
          </div>
     );
};

export default OpeningVideo;