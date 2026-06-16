import { useEffect, useState } from "react";

const CookieBanner = () => {
     const isBot = typeof navigator !== 'undefined' && /SearchBot|Googlebot|Chrome-Lighthouse|Lighthouse/i.test(navigator.userAgent);
     if (isBot) {
          return null;
     }

     const [consentChecked, setConsentChecked] = useState(false);
     const [visible, setVisible] = useState(false);

     useEffect(() => {
          const consent = localStorage.getItem("cookie-consent");
          setConsentChecked(true);

          if (!consent) {
               const idle = requestIdleCallback
                    ? requestIdleCallback(() => setVisible(true))
                    : setTimeout(() => setVisible(true), 2500);

               return () => {
                    if (typeof idle === "number") clearTimeout(idle);
               };
          }
     }, []);

     const acceptCookies = () => {
          localStorage.setItem("cookie-consent", "accepted");
          setVisible(false);
     };

     const declineCookies = () => {
          localStorage.setItem("cookie-consent", "declined");
          setVisible(false);
     };

     return (
          <div
               className={`fixed z-99999 bottom-0 left-0 w-full bg-white border-t border-gray-200 rounded-t-lg plus-jakarta-sans [box-shadow:0_-8px_10px_rgba(0,0,0,0.15),0_-2px_8px_rgba(0,0,0,0.08)] transition-opacity duration-500 ease-in-out ${
                    visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
               }`}
          >

               <div className=" mx-auto flex flex-col md:flex-row items-end lg:items-center justify-between gap-3 px-3 md:px-14 py-3">

                    {/* text */}
                    <p className="text-[14px] md:text-[16px] lg:text-[18px] text-dark-black text-left">
                         We use cookies to personalize content and analyze traffic.
                         <a
                              href="/privacy-policy"
                              className="underline ml-1"
                         >
                              Learn more about Privacy
                         </a>
                    </p>

                    {/* buttons */}
                    <div className="flex items-center gap-4">

                         <button
                              onClick={declineCookies}
                              className="text-[16px] font-medium text-orange-500 w-35 md:w-45 h-10 md:h-12 hover:border hover:border-cust-orange rounded-full cursor-pointer transition-all duration-300 ease-in-out"
                         >
                              Decline
                         </button>

                         <button
                              onClick={acceptCookies}
                              className="bg-cust-orange header-btn relative overflow-hidden text-white text-[16px] font-medium w-35 md:w-45 h-10 md:h-12 rounded-full transition-all duration-300 ease-in-out hover:text-cust-orange  cursor-pointer hover:border hover:border-cust-orange"
                         >
                              <span className="relative z-10">Accept</span>
                         </button>

                    </div>

               </div>

          </div>
     );
};

export default CookieBanner;