// utils/gsapLoader.js
let gsapInstance = null;
let scrollTriggerInstance = null;
let loadingPromise = null;

// Preload GSAP immediately on page load
export const initGSAP = () => {
     if (!loadingPromise) {
          loadingPromise = (async () => {
               const [{ default: gsap }, { default: ScrollTrigger }] = await Promise.all([
                    import("gsap"),
                    import("gsap/ScrollTrigger")
               ]);
               gsap.registerPlugin(ScrollTrigger);
               gsapInstance = gsap;
               scrollTriggerInstance = ScrollTrigger;
               return { gsap, ScrollTrigger };
          })();
     }
     return loadingPromise;
};

// For components that need ScrollTrigger
export const getScrollTrigger = async () => {
     const { ScrollTrigger } = await initGSAP();
     return ScrollTrigger;
};

// For components that need GSAP
export const loadGSAP = async () => {
     const { gsap } = await initGSAP();
     return gsap;
};

// Start preloading immediately
// initGSAP();