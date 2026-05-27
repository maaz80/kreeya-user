import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import SeoTags from '../components/SeoTags';

import HeroSection from "../components/HeroSection";
import OpeningVideo from "../components/OpeningVideo";

const HomeNavbar = lazy(() => import("../components/HomeNavbar"));
const FaqSection = lazy(() => import("../components/FaqSection"));
const GrowthJournal = lazy(() => import("../components/Home/GrowthJournal"));
const HelpSection = lazy(() => import("../components/Home/HelpSection"));
const StackImages = lazy(() => import("../components/Home/StackProjects"));
// const TeamCraft = lazy(() => import("../components/Home/Team"));
const LogoMarquee = lazy(() => import("../components/LogoMarque"));
const Home = ({ onOpeningVideoFinished }) => {
     const location = useLocation();
     const [showOpening, setShowOpening] = useState(true);
     const [isVideoFinished, setIsVideoFinished] = useState(false);
     const [isLowPriorityReady, setIsLowPriorityReady] = useState(false);

     useEffect(() => {
          // Delay non-critical components to free up main thread for LCP
          const timer = setTimeout(() => {
               setIsLowPriorityReady(true);
          }, 8000); // Increased delay to 8s
          return () => clearTimeout(timer);
     }, []);

     useEffect(() => {

          // Wait until video is finished
          if (!isVideoFinished) return;

          const targetId =
               location.pathname === "/"
                    ? "home"
                    : location.pathname.replace("/", "");

          let attempts = 0;

          const tryScroll = () => {
               attempts += 1;

               const el = document.getElementById(targetId);

               if (el) {
                    el.scrollIntoView({
                         behavior: "smooth",
                    });

                    return;
               }

               // Retry until section exists
               if (attempts < 30) {
                    setTimeout(tryScroll, 200);
               }
          };

          // Small delay after video completion
          const timeout = setTimeout(() => {
               tryScroll();
          }, 100);

          return () => clearTimeout(timeout);

     }, [location.pathname, isVideoFinished]);

     return (
          <>
               {/* <SeoTags
                    title="Kreeya Design | UI/UX, Branding & Web Design Agency in Noida"
                    description="Kreeya Design is a full-service creative agency in Noida delivering UI/UX, branding, web, and app design for startups and enterprises."
                    keywords="UI UX design agency Noida, branding agency, web design company, digital design services, app design agency"
                    canonical="https://kreeyadesign.com/"
               /> */}
               {/* {showAnimation && (
                    <div ref={heroRef} className="fixed top-0 left-0 w-full h-screen z-99999">
                         <HeroAnimation />
                    </div>
               )} */}
               {showOpening && (
                    <OpeningVideo
                         onFinish={() => {
                              setShowOpening(false)
                              setIsVideoFinished(true)
                              onOpeningVideoFinished?.()
                         }}

                    />
               )}

               {/* {!showAnimation && */}
               <div className="poiret-one-regular ">

                    <Suspense fallback={null}>
                         <HomeNavbar startFetch={isVideoFinished} />
                    </Suspense>
                    {/* White overlay */}
                    <div className="fixed inset-0 bg-white/90 md:bg-white/90 z-10 will-change-transform contain-layout" />

                    <HeroSection startFetch={true} />

                    {/* Spaces for Scroll  */}
                    <div className="min-h-[30vh] md:min-h-[82vh] lg:min-h-screen relative"> </div>
                    <div className="hidden md:block min-h-[47vh] lg:min-h-[52vh] 3xl:min-h-[65vh] relative"></div>

                    {/* Rest lazy loaded sections */}
                    <Suspense fallback={null}>
                         {isLowPriorityReady && <LogoMarquee />}
                    </Suspense>
                    <Suspense fallback={null}>
                         {isLowPriorityReady && <StackImages />}
                    </Suspense>
                    <Suspense fallback={null}>
                         {isLowPriorityReady && <HelpSection />}
                    </Suspense>
                    {/* <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
                         <TeamCraft />
                    </Suspense> */}
                    <Suspense fallback={null}>
                         {isLowPriorityReady && <GrowthJournal />}
                    </Suspense>
                    <Suspense fallback={null}>
                         {isLowPriorityReady && <FaqSection paddings={'pt-10 pb-24 md:py-24 px-4 md:px-20'} />}
                    </Suspense>
               </div>
          </>
     )
}

export default Home
