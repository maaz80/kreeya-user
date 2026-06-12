import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { BsChevronUp } from "react-icons/bs";
// import whatsapp from "./assets/whatsapp-icon.webp";
import "./CSS/Home.css";
// import Footer from "./components/Footer";
const Footer = lazy(() => import("./components/Footer"));
const CookieBanner = lazy(() => import("./components/CookieBanner"));
const ChatBot = lazy(() => import("./components/ChatBot"));
const LeadCaptureModal = lazy(() => import("./components/LeadCaptureModal"));
// import CookieBanner from "./components/CookieBanner";

// import Home from "./pages/Home";
import { usePageSEO } from "./hooks/usePageSEO";
const Location = lazy(() => import("./pages/Location"));
const ItemPage = lazy(() => import("./pages/ItemPage"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Portfolios = lazy(() => import("./pages/Portfolios"));

const Home = lazy(() => import("./pages/Home"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const NotFound = lazy(() => import("./pages/404NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const Portfolio1 = lazy(() => import("./pages/Portfolio1"));
const Portfolio2 = lazy(() => import("./pages/Portfolio2"));
const Portfolio3 = lazy(() => import("./pages/Portfolio3"));
const Portfolio4 = lazy(() => import("./pages/Portfolio4"));
const ContactUs = lazy(() => import("./pages/ContactUs"));

function App() {

  const [showFooter, setShowFooter] = useState(false);
  const [loadChatbot, setLoadChatbot] = useState(false);
  const location = useLocation();
  const isOpeningVideoRoute = location.pathname === "/";
  const [areGlobalWidgetsReady, setAreGlobalWidgetsReady] = useState(!isOpeningVideoRoute);

  usePageSEO()

  useEffect(() => {
    setTimeout(() => setShowFooter(true), 3000);

    let timeoutId;
    const triggerLoad = () => {
      setLoadChatbot(true);
      cleanup();
    };

    const cleanup = () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", triggerLoad);
      window.removeEventListener("mousemove", triggerLoad);
      window.removeEventListener("touchstart", triggerLoad);
      window.removeEventListener("click", triggerLoad);
    };

    timeoutId = setTimeout(triggerLoad, 4000);

    window.addEventListener("scroll", triggerLoad, { once: true, passive: true });
    window.addEventListener("mousemove", triggerLoad, { once: true, passive: true });
    window.addEventListener("touchstart", triggerLoad, { once: true, passive: true });
    window.addEventListener("click", triggerLoad, { once: true, passive: true });

    return cleanup;
  }, []);

  useEffect(() => {
    setAreGlobalWidgetsReady(!isOpeningVideoRoute);
  }, [isOpeningVideoRoute]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Suspense fallback={null}>
        <CookieBanner />
      </Suspense>
      <Suspense fallback={null}>
        <LeadCaptureModal />
      </Suspense>
      {areGlobalWidgetsReady && (
        <>
          <a
            href="https://wa.me/919311500423"
            target="_blank"
            aria-label="Whatsapp Icon"
            rel="noopener noreferrer"
            className="whatsapp_cont hover:scale-110 fixed bottom-20 md:bottom-25 right-7.5 md:right-8 z-9999 bg-white rounded-full w-16 md:w-20 h-16 md:h-20 overflow-hidden transition-all cursor-pointer"
          >
            <img
              src='/images/whatsapp-icon.webp'
              alt="Whatsapp Icon"
              width="80"
              height="80"
              style={{ aspectRatio: "1/1" }}
              className="whatsapp w-full h-full relative z-9999"
            />
          </a>

          <button
            type="button"
            aria-label="Scroll to top"
            className="text-lg w-13 h-13 p-3 rounded-full bg-white text-blue shadow-[0px_0px_12px_4px] shadow-dark-gray hover:scale-105 fixed bottom-3 right-8 z-9999 flex items-center justify-center font-black cursor-pointer"
            onClick={scrollToTop}
          >
            <BsChevronUp />
          </button>

          {loadChatbot && (
               <Suspense fallback={null}>
                    <ChatBot />
               </Suspense>
          )}
        </>
      )}
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <Routes>
          <Route path="/" element={<Home onOpeningVideoFinished={() => setAreGlobalWidgetsReady(true)} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/landing-page" element={<LandingPage />} />
          {/* <Route path="/portfolios" element={<Portfolios />} /> */}
          <Route path="/portfolio-beyekls" element={<Portfolio1 />} />
          <Route path="/portfolio-daccord" element={<Portfolio2 />} />
          <Route path="/portfolio-coinpay" element={<Portfolio3 />} />
          <Route path="/portfolio-nectar" element={<Portfolio4 />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/category/blogs" element={<Blogs />} />
          {/* <Route path="/blogs-details/:slug" element={<BlogDetails />} /> */}
          <Route path="/location" element={<Location />} />
          <Route path="/:itemSlug" element={<ItemPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {showFooter && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
}

export default App;
