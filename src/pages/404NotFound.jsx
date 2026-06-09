import bgPattern from "../assets/404-bg.webp";
import { Helmet } from "react-helmet-async";
import BackgroundShapes from "../components/BackgroundShapes";
import HomeNavbar from "../components/HomeNavbar";

const NotFound = () => {
     return (
          <section className="min-h-screen flex items-center justify-center px-6">
               <Helmet>
                    <link rel="canonical" href="https://kreeyadesign.com/not-found" />
                    {/* <meta name="robots" content="noindex,follow" /> */}
               </Helmet>
               <HomeNavbar />
               <BackgroundShapes />
               {/* White overlay */}
               <div className="fixed inset-0 bg-white/90 md:bg-white/90 z-10" />
               <div className="text-center relative z-999">

                    {/* 404 */}

                    <h1
                         className="-mt-10 md:mt-10 text-[150px] md:text-[280px] lg:text-[420px] font-bold leading-none bg-cover bg-center text-transparent bg-clip-text "
                         style={{
                              backgroundImage: `url(${bgPattern})`
                         }}
                    >
                         404
                    </h1>

                    {/* Title */}

                    <h2 className="text-[36px] md:text-[56px] lg:text-[120px] leading-12 md:leading-15 lg:leading-32.5 mt-3 md:mt-0 poiret-one-regular">
                         Well, this is awkward
                    </h2>

                    {/* Description */}

                    <p className="text-gray-600 mt-4 text-[12px] md:text-[16px] lg:text-[24px] leading-5 md:leading-6 lg:leading-9">
                         We looked everywhere, even under the couch,
                         but we couldn’t find that page.
                    </p>

               </div>

          </section>
     );
};

export default NotFound;
