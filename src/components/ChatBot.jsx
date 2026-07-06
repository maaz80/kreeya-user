import { useState, useRef, useEffect } from "react";
import logo from "../assets/chatbot-logo.webp";
import { IoSend } from "react-icons/io5";
import { FaCamera } from "react-icons/fa6";
import { MdEmojiEmotions, MdOutlineGifBox } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import { IoIosMic } from "react-icons/io";
import ChatProfile from '../assets/chatbot-profile.webp';
import { useChatBotH2Data } from "../hooks/useChatBotH2Data";

// Normalizes the selected welcome service to a core category
const getPrimaryServiceCategory = (serviceText) => {
     if (!serviceText) return null;
     const text = serviceText.toLowerCase();
     if (text.includes("ui/ux")) return "UI/UX Design";
     if (text.includes("website")) return "Website Development";
     if (text.includes("mobile")) return "Mobile App Development";
     if (text.includes("seo")) return "SEO";
     if (text.includes("branding") || text.includes("logo")) return "Branding";
     if (text.includes("performance") || text.includes("marketing") || text.includes("digital")) return "Performance Marketing";
     if (text.includes("talk to")) return "Talk to an Expert";
     return null;
};

// Compile dynamic queue based on the primary selected welcome service
const compileFullQueue = (currentAnswers) => {
     // Core initial qualification questions
     let fullQueue = [
          {
               id: "business_type",
               question: "Step 1 — Tell us about your business. What type of business do you have?",
               type: "single",
               options: [
                    "Startup",
                    "Small Business",
                    "Enterprise",
                    "Ecommerce",
                    "Healthcare",
                    "Real Estate",
                    "Finance",
                    "Education",
                    "SaaS",
                    "Restaurant",
                    "Other"
               ]
          },
          {
               id: "challenge",
               question: "Step 2 — What's your biggest challenge?",
               type: "single",
               options: [
                    "My website looks outdated",
                    "I need more customers",
                    "Low Google rankings",
                    "Low conversion rate",
                    "Need a mobile app",
                    "Need better branding",
                    "Need UI improvements",
                    "Need more sales"
               ]
          },
          {
               id: "additional_services",
               question: "Step 3 — Would you like to add any other services to your project? (Select all that apply)",
               type: "multi",
               options: [
                    "UI/UX Design",
                    "Website Design",
                    "Website Development",
                    "Ecommerce Development",
                    "Mobile App Design",
                    "Mobile App Development",
                    "Branding",
                    "Logo Design",
                    "SEO",
                    "Google Ads",
                    "Meta Ads",
                    "Performance Marketing",
                    "Social Media Marketing",
                    "Graphic Design",
                    "Motion Graphics",
                    "AI Automation",
                    "None"
               ]
          }
     ];

     const primaryCategory = getPrimaryServiceCategory(currentAnswers.welcome_service);

     // Only ask website status if the category involves web/marketing
     const websiteRequiredCategories = ["Website Development", "SEO", "Performance Marketing"];
     if (websiteRequiredCategories.includes(primaryCategory)) {
          fullQueue.push({
               id: "has_website",
               question: "Step 4 — Do you already have a website?",
               type: "single",
               options: ["Yes", "No", "Under Development"]
          });
     }

     // Inject smart follow-ups for the Primary service (limits questions per user)
     if (primaryCategory === "Website Development") {
          const isEcommerceDev = currentAnswers.welcome_service.includes("Ecommerce") || currentAnswers.welcome_service.toLowerCase().includes("ecommerce");
          
          if (!isEcommerceDev) {
               fullQueue.push({
                    id: "web_type",
                    question: "Do you need a Business Website or Ecommerce Website?",
                    type: "single",
                    options: ["Business Website", "Ecommerce Website"]
               });
          }

          fullQueue.push({
               id: "web_pages",
               question: "How many pages do you estimate for the website?",
               type: "single",
               options: ["1–5 pages", "5–10 pages", "10–20 pages", "20+ pages"]
          });

          fullQueue.push({
               id: "web_cms",
               question: "Do you need a Content Management System (CMS) like WordPress or Webflow?",
               type: "single",
               options: ["Yes", "No"]
          });

          fullQueue.push({
               id: "web_payment",
               question: "Do you need a payment gateway integrated?",
               type: "single",
               options: ["Yes", "No"]
          });

          fullQueue.push({
               id: "web_seo",
               question: "Do you need basic SEO setup for your website?",
               type: "single",
               options: ["Yes", "No"]
          });
     } 
     else if (primaryCategory === "UI/UX Design") {
          const isMobileDesign = currentAnswers.welcome_service.includes("Mobile App");
          if (!isMobileDesign) {
               fullQueue.push({
                    id: "ui_platform",
                    question: "Is this design project for Web, Mobile, or Both?",
                    type: "single",
                    options: ["Web", "Mobile", "Both"]
               });
          }
          fullQueue.push({
               id: "ui_deliverables",
               question: "What design deliverables do you need? (Select all that apply)",
               type: "multi",
               options: ["Wireframes", "Design System", "User Research", "Interactive Prototype"]
          });
     } 
     else if (primaryCategory === "Mobile App Development") {
          fullQueue.push({
               id: "app_platform",
               question: "Which platform are you targeting?",
               type: "single",
               options: ["Android", "iOS", "Both"]
          });
          fullQueue.push({
               id: "app_tech",
               question: "Do you have a technology preference?",
               type: "single",
               options: ["Flutter", "React Native", "Native", "No Preference"]
          });
     } 
     else if (primaryCategory === "SEO") {
          fullQueue.push({
               id: "seo_keywords",
               question: "Which keywords are most important to target?",
               type: "text",
               placeholder: "e.g. best B2B design agency, SaaS developers"
          });
          fullQueue.push({
               id: "seo_city",
               question: "Which city or target market are you focusing on?",
               type: "text",
               placeholder: "e.g. New Delhi, Global"
          });
          fullQueue.push({
               id: "seo_past",
               question: "Have you done SEO for this website before?",
               type: "single",
               options: ["Yes", "No"]
          });
     } 
     else if (primaryCategory === "Branding") {
          fullQueue.push({
               id: "branding_assets",
               question: "What branding assets do you need? (Select all that apply)",
               type: "multi",
               options: ["Logo Design", "Brand Identity", "Packaging Design", "Social Media Kit", "Brand Guidelines"]
          });
     } 
     else if (primaryCategory === "Performance Marketing") {
          const isGoogleAds = currentAnswers.welcome_service.includes("Google");
          const isMetaAds = currentAnswers.welcome_service.includes("Meta");
          
          if (!isGoogleAds && !isMetaAds) {
               fullQueue.push({
                    id: "perf_platforms",
                    question: "Which ad platforms are you interested in? (Select all that apply)",
                    type: "multi",
                    options: ["Google Ads", "Meta Ads", "LinkedIn Ads"]
               });
          }
          
          fullQueue.push({
               id: "perf_budget",
               question: "What is your estimated monthly ad budget?",
               type: "single",
               options: ["Under ₹25,000", "₹25,000–₹50,000", "₹50,000–₹1 Lakh", "₹1 Lakh+"]
          });
          
          fullQueue.push({
               id: "perf_existing",
               question: "Do you have existing active campaigns running?",
               type: "single",
               options: ["Yes", "No"]
          });
     }

     // Project Details (Budget & Timeline)
     fullQueue.push({
          id: "project_budget",
          question: "What is your estimated total project budget?",
          type: "single",
          options: ["Under ₹25,000", "₹25,000–₹50,000", "₹50,000–₹1 Lakh", "₹1–3 Lakhs", "₹3–5 Lakhs", "₹5 Lakhs+"]
     });

     fullQueue.push({
          id: "start_time",
          question: "When would you like to start this project?",
          type: "single",
          options: ["ASAP", "Within a Week", "Within a Month", "Just Exploring"]
     });

     // Simplified Contact details
     fullQueue.push({
          id: "contact_name",
          question: "What's your name?",
          type: "text",
          placeholder: "Your Full Name"
     });

     fullQueue.push({
          id: "contact_email",
          question: "What's your email address?",
          type: "email",
          placeholder: "name@company.com"
     });

     fullQueue.push({
          id: "contact_phone",
          question: "What's your phone number?",
          type: "tel",
          placeholder: "10-digit mobile number"
     });

     // Consultation
     fullQueue.push({
          id: "consultation",
          question: "Would you like to schedule a FREE consultation call?",
          type: "single",
          options: ["Yes", "No"]
     });

     return fullQueue;
};

export default function ChatBot() {
     const [open, setOpen] = useState(false);
     const [typing, setTyping] = useState(false);
     const h2ChatBot = useChatBotH2Data();

     // Question states
     const [queue, setQueue] = useState([]);
     const [queueIndex, setQueueIndex] = useState(-1); // -1 is Welcome card
     const [answers, setAnswers] = useState({});
     const [tempSelections, setTempSelections] = useState([]);
     const [inputError, setInputError] = useState("");
     const [input, setInput] = useState("");

     const [messages, setMessages] = useState([
          {
               id: "welcome",
               text: "👋 Welcome to Kreeya Design!\n\nWe help businesses build stunning websites, mobile apps, brands, and digital marketing strategies that generate real growth.\n\nWhat can we help you with today?",
               user: false,
               time: Date.now(),
               options: [
                    "🎨 UI/UX Design",
                    "💻 Website Development",
                    "📱 Mobile App Development",
                    "🚀 Digital Marketing",
                    "🎯 SEO Services",
                    "📈 Performance Marketing",
                    "🎨 Branding & Logo Design",
                    "🤝 Talk to an Expert"
               ],
               isWelcomeCard: true
          }
     ]);

     const messageRef = useRef();

     useEffect(() => {
          if (open && messageRef.current) {
               requestAnimationFrame(() => {
                    messageRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
               });
          }
     }, [messages, open, typing]);

     const sendLeadData = async (leadAnswers) => {
          try {
               const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
               const response = await fetch(`${API_URL}/submit-chatbot-lead`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ answers: leadAnswers })
               });
               if (response.ok) {
                    console.log("Chatbot lead submitted successfully!");
               } else {
                    console.error("Failed to submit chatbot lead to server");
               }
          } catch (error) {
               console.error("Error submitting chatbot lead:", error);
          }
     };

     const handleOptionClick = (questionId, optionValue, isWelcomeCard = false) => {
          setInputError("");
          const userMsg = { text: optionValue, user: true, time: Date.now() };
          setMessages(prev => [...prev, userMsg]);

          // Disable buttons on the completed message
          setMessages(prev => prev.map(m => {
               if (m.questionId === questionId || (isWelcomeCard && m.isWelcomeCard)) {
                    return { ...m, options: null };
               }
               return m;
          }));

          setTyping(true);

          setTimeout(() => {
               setTyping(false);

               let updatedAnswers = isWelcomeCard
                    ? { ...answers, welcome_service: optionValue }
                    : { ...answers, [questionId]: optionValue };
               
               setAnswers(updatedAnswers);

               let nextIndex = queueIndex + 1;
               let nextQueue = [...queue];

               // Initialize/Compile the dynamic queue right after the Welcome choice is clicked
               if (isWelcomeCard) {
                    nextQueue = compileFullQueue(updatedAnswers);
                    setQueue(nextQueue);
                    nextIndex = 0;
               }

               // Dynamic Skip: If website type is Business Website, skip payment gateway follow-up
               if (questionId === "web_type" && optionValue === "Business Website") {
                    nextQueue = nextQueue.filter(q => q.id !== "web_payment");
                    setQueue(nextQueue);
               }

               // Dynamic Injection: If user answers Yes to already has a website, prompt for URL
               if (questionId === "has_website" && optionValue === "Yes") {
                    nextQueue.splice(nextIndex, 0, {
                         id: "website_url",
                         question: "What is your website URL?",
                         type: "text",
                         placeholder: "e.g. https://namazly.in"
                    });
                    setQueue(nextQueue);
               }

               // Dynamic Injection: If user schedules a Free Consultation, prompt for Date/Time
               if (questionId === "consultation" && optionValue === "Yes") {
                    nextQueue.splice(nextIndex, 0, {
                         id: "consultation_datetime",
                         question: "What date and time works best for you?",
                         type: "datetime-local"
                    });
                    setQueue(nextQueue);
               }

               setQueueIndex(nextIndex);

               if (nextIndex < nextQueue.length) {
                    const nextQuestion = nextQueue[nextIndex];
                    const botMsg = {
                         id: `bot_${nextQuestion.id}`,
                         questionId: nextQuestion.id,
                         text: nextQuestion.question,
                         user: false,
                         time: Date.now(),
                         options: nextQuestion.options,
                         multiSelect: nextQuestion.type === "multi",
                         inputType: ["text", "email", "tel", "url", "datetime-local"].includes(nextQuestion.type) ? nextQuestion.type : null,
                         placeholder: nextQuestion.placeholder || ""
                    };
                    setMessages(prev => [...prev, botMsg]);
               } else {
                    const exitMsg = {
                         id: "exit_card",
                         text: "🎉 Thank you! Based on your answers, one of our experts at Kreeya Design will review your requirements and contact you shortly.",
                         user: false,
                         time: Date.now(),
                         isExitCard: true
                    };
                    setMessages(prev => [...prev, exitMsg]);
                    sendLeadData(updatedAnswers);
               }
          }, 800);
     };

     const handleMultiOptionToggle = (opt) => {
          setTempSelections(prev =>
               prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]
          );
     };

     const handleMultiSubmit = (questionId, selectedValues) => {
          if (selectedValues.length === 0) return;
          setInputError("");

          const userText = selectedValues.join(", ");
          const userMsg = { text: userText, user: true, time: Date.now() };
          setMessages(prev => [...prev, userMsg]);

          setMessages(prev => prev.map(m => {
               if (m.questionId === questionId) {
                    return { ...m, options: null, multiSelect: false };
               }
               return m;
          }));

          setTyping(true);

          setTimeout(() => {
               setTyping(false);

               const updatedAnswers = { ...answers, [questionId]: selectedValues };
               setAnswers(updatedAnswers);

               let nextIndex = queueIndex + 1;
               let nextQueue = [...queue];

               setQueueIndex(nextIndex);

               if (nextIndex < nextQueue.length) {
                    const nextQuestion = nextQueue[nextIndex];
                    const botMsg = {
                         id: `bot_${nextQuestion.id}`,
                         questionId: nextQuestion.id,
                         text: nextQuestion.question,
                         user: false,
                         time: Date.now(),
                         options: nextQuestion.options,
                         multiSelect: nextQuestion.type === "multi",
                         inputType: ["text", "email", "tel", "url", "datetime-local"].includes(nextQuestion.type) ? nextQuestion.type : null,
                         placeholder: nextQuestion.placeholder || ""
                    };
                    setMessages(prev => [...prev, botMsg]);
               } else {
                    const exitMsg = {
                         id: "exit_card",
                         text: "🎉 Thank you! Based on your answers, one of our experts at Kreeya Design will review your requirements and contact you shortly.",
                         user: false,
                         time: Date.now(),
                         isExitCard: true
                    };
                    setMessages(prev => [...prev, exitMsg]);
                    sendLeadData(updatedAnswers);
               }
          }, 800);
     };

     const handleInputSubmit = (questionId, inputValue) => {
          setInputError("");
          const userMsg = { text: inputValue, user: true, time: Date.now() };
          setMessages(prev => [...prev, userMsg]);

          setMessages(prev => prev.map(m => {
               if (m.questionId === questionId) {
                    return { ...m, inputType: null };
               }
               return m;
          }));

          setTyping(true);

          setTimeout(() => {
               setTyping(false);

               const updatedAnswers = { ...answers, [questionId]: inputValue };
               setAnswers(updatedAnswers);

               let nextIndex = queueIndex + 1;
               let nextQueue = [...queue];

               setQueueIndex(nextIndex);

               if (nextIndex < nextQueue.length) {
                    const nextQuestion = nextQueue[nextIndex];
                    const botMsg = {
                         id: `bot_${nextQuestion.id}`,
                         questionId: nextQuestion.id,
                         text: nextQuestion.question,
                         user: false,
                         time: Date.now(),
                         options: nextQuestion.options,
                         multiSelect: nextQuestion.type === "multi",
                         inputType: ["text", "email", "tel", "url", "datetime-local"].includes(nextQuestion.type) ? nextQuestion.type : null,
                         placeholder: nextQuestion.placeholder || ""
                    };
                    setMessages(prev => [...prev, botMsg]);
               } else {
                    const exitMsg = {
                         id: "exit_card",
                         text: "🎉 Thank you! Based on your answers, one of our experts at Kreeya Design will review your requirements and contact you shortly.",
                         user: false,
                         time: Date.now(),
                         isExitCard: true
                    };
                    setMessages(prev => [...prev, exitMsg]);
                    sendLeadData(updatedAnswers);
               }
          }, 800);
     };

     const validateInputText = (type, val) => {
          if (!val.trim()) return "Input cannot be empty.";
          if (type === "email") {
               const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
               if (!emailRegex.test(val)) return "Please enter a valid email address.";
          } else if (type === "url") {
               if (!val.includes(".")) return "Please enter a valid website URL.";
          } else if (type === "tel") {
               const cleanNum = val.replace(/[^0-9]/g, "");
               if (cleanNum.length < 10) return "Phone number must be at least 10 digits.";
          }
          return null;
     };

     const sendMessage = () => {
          if (!input.trim()) return;

          const currentQuestion = queueIndex >= 0 && queueIndex < queue.length ? queue[queueIndex] : null;

          if (currentQuestion && ["text", "email", "tel", "url"].includes(currentQuestion.type)) {
               const errorMsg = validateInputText(currentQuestion.type, input);
               if (errorMsg) {
                    setInputError(errorMsg);
                    return;
               }
               setInputError("");
               handleInputSubmit(currentQuestion.id, input);
               setInput("");
          }
     };

     const handleQuickAction = (actionType) => {
          if (actionType === "quote") {
               setAnswers({});
               setQueue([]);
               setQueueIndex(-1);
               setMessages([
                    {
                         id: "welcome",
                         text: "👋 Welcome to Kreeya Design!\n\nWe help businesses build stunning websites, mobile apps, brands, and digital marketing strategies that generate real growth.\n\nWhat can we help you with today?",
                         user: false,
                         time: Date.now(),
                         options: [
                              "🎨 UI/UX Design",
                              "💻 Website Development",
                              "📱 Mobile App Development",
                              "🚀 Digital Marketing",
                              "🎯 SEO Services",
                              "📈 Performance Marketing",
                              "🎨 Branding & Logo Design",
                              "🤝 Talk to an Expert"
                         ],
                         isWelcomeCard: true
                    }
               ]);
          } else if (actionType === "book") {
               window.open("mailto:business@kreeyadesign.com?subject=Book a Discovery Call", "_blank");
          }
     };

     const getTimeAgo = (timestamp) => {
          const diff = Math.floor((Date.now() - timestamp) / 1000);
          if (diff < 60) return "Just now";
          const minutes = Math.floor(diff / 60);
          if (minutes < 60) return `${minutes} min ago`;
          const hours = Math.floor(minutes / 60);
          if (hours < 24) return `${hours} hr ago`;
          const days = Math.floor(hours / 24);
          return `${days} day ago`;
     };

     const currentQuestion = queueIndex >= 0 && queueIndex < queue.length ? queue[queueIndex] : null;
     const isInputDisabled = !currentQuestion || !["text", "email", "tel", "url"].includes(currentQuestion.type);

     let inputPlaceholder = "Write your reply...";
     if (currentQuestion) {
          if (currentQuestion.type === "text") inputPlaceholder = currentQuestion.placeholder || "Type your answer...";
          else if (currentQuestion.type === "email") inputPlaceholder = "Enter your email address...";
          else if (currentQuestion.type === "tel") inputPlaceholder = "Enter 10-digit mobile number...";
          else if (currentQuestion.type === "url") inputPlaceholder = "Enter website URL...";
          else if (currentQuestion.type === "datetime-local") inputPlaceholder = "Select date/time below...";
          else if (currentQuestion.type === "single" || currentQuestion.type === "multi") inputPlaceholder = "Select an option above...";
     } else if (queueIndex === -1) {
          inputPlaceholder = "Select an option above...";
     } else {
          inputPlaceholder = "Chat completed.";
     }

     return (
          <>
               {/* Floating Button */}
               {!open && (
                    <button
                         onClick={() => setOpen(true)}
                         className="group fixed bottom-43 md:bottom-50 lg:bottom-57 right-5 md:right-8 3xl:right-[320px] bg-white cursor-pointer rounded-full shadow-xl flex items-center justify-end overflow-hidden transition-all duration-300 w-16 hover:w-57.5 hover:py-3.5 px-3 py-3 z-9999"
                    >
                         {/* Text (LEFT) */}
                         <span className="whitespace-nowrap text-[22px] mr-3 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                              Any Questions?
                         </span>

                         {/* Icon (RIGHT) */}
                         <img
                              src="/images/chatbot.webp"
                              width={75}
                              height={70}
                              alt="Chatbot Icon"
                              className="w-10 h-auto shrink-0 group-hover:scale-102"
                         />
                    </button>
               )}

               {/* Chat Window */}
               <div
                    className={`fixed bottom-18 3xl:bottom-10 right-8 3xl:right-[320px] w-69.5 2xl:w-110 h-100 2xl:h-162.75 bg-linear-to-br from-[#007CC9] to-[#003D64] rounded-xl shadow-2xl z-99999 flex flex-col overflow-hidden plus-jakarta-sans transform transition-all duration-700 ease-in-out ${
                         open ? "translate-y-0 translate-x-0 opacity-100 scale-100" : "translate-y-[120%] translate-x-[120%] opacity-0 scale-0 pointer-events-none"
                    }`}
               >
                    {/* Header */}
                    <div className="bg-linear-to-br from-[#007CC9] to-[#003D64] text-white px-4 pb-6 pt-4">
                         <div className="flex justify-between items-center mb-1">
                              <img src={logo} alt="Chatbot Logo" className="w-10 h-10" />
                              <button onClick={() => setOpen(false)} className="cursor-pointer hover:rotate-90 transition-all duration-300 ease-in-out">✕</button>
                         </div>

                         <h2 className="text-[30px] lg:text-[48px] leading-9 lg:leading-15 poiret-one-regular">
                              {h2ChatBot.hi_there_heading || 'Hi there!'}
                         </h2>

                         <p className="text-[9px] lg:text-[14px] leading-5 opacity-80">
                              Welcome to Kreeya design. How can we help you today?
                         </p>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 h-80 bg-white -mt-1 rounded-t-xl">
                         {messages.map((m, i) => {
                              const showAvatar = !m.user && (i === 0 || messages[i - 1].user);

                              return (
                                   <div key={m.id || i} className={`flex flex-col ${m.user ? "items-end" : "items-start"} w-full`}>
                                        {/* Avatar and Name */}
                                        {showAvatar && !m.user && (
                                             <div className="flex items-center gap-2 mb-1 lg:mb-3">
                                                  <img
                                                       src={ChatProfile}
                                                       alt="Chatbot Profile"
                                                       className="w-6.75 lg:w-10 h-6.75 lg:h-10 rounded-full"
                                                  />
                                                  <div>
                                                       <h2 className="text-[10px] lg:text-[16px] leading-5 lg:leading-6 text-blue font-bold">
                                                            {h2ChatBot.bot_name || 'Kreeya Bot'}
                                                       </h2>
                                                       <div className="text-[9px] lg:text-[14px] text-dark-gray">
                                                            {getTimeAgo(m.time)}
                                                       </div>
                                                  </div>
                                             </div>
                                        )}

                                        {/* Exit Card layout */}
                                        {m.isExitCard ? (
                                             <div className="w-full space-y-4">
                                                  <div className="bg-sky-50 border border-sky-100 rounded-lg p-3 lg:p-4 text-[11px] lg:text-sm text-dark-black space-y-3 shadow-inner">
                                                       <p className="font-semibold text-blue text-xs lg:text-sm">🎉 Thank you!</p>
                                                       <p className="text-gray-700 leading-relaxed">
                                                            Based on your answers, one of our experts at Kreeya Design will review your requirements and contact you shortly.
                                                       </p>
                                                       <div className="text-xs lg:text-sm font-medium space-y-1 text-gray-800 border-t border-sky-200/50 pt-2">
                                                            <div>📞 <strong>Call:</strong> <a href="tel:+919311500423" className="text-blue hover:underline">+91 9311500423</a></div>
                                                            <div>📧 <strong>Email:</strong> <a href="mailto:business@kreeyadesign.com" className="text-blue hover:underline">business@kreeyadesign.com</a></div>
                                                       </div>
                                                  </div>

                                                  <div className="w-full">
                                                       <p className="text-[10px] text-gray-400 font-semibold mb-1">Quick Actions:</p>
                                                       <div className="grid grid-cols-2 gap-1.5">
                                                            <button
                                                                 onClick={() => handleQuickAction("quote")}
                                                                 className="bg-sky-50 hover:bg-sky-100 text-sky-800 text-[10px] lg:text-xs py-2 px-2.5 rounded-md font-medium cursor-pointer transition-all border border-sky-200 hover:scale-102 text-center shadow-xs"
                                                            >
                                                                 🚀 Get a Free Quote
                                                            </button>
                                                            <button
                                                                 onClick={() => handleQuickAction("book")}
                                                                 className="bg-sky-50 hover:bg-sky-100 text-sky-800 text-[10px] lg:text-xs py-2 px-2.5 rounded-md font-medium cursor-pointer transition-all border border-sky-200 hover:scale-102 text-center shadow-xs"
                                                            >
                                                                 📅 Book Discovery Call
                                                            </button>
                                                            <a
                                                                 href="/portfolios"
                                                                 className="bg-sky-50 hover:bg-sky-100 text-sky-800 text-[10px] lg:text-xs py-2 px-2.5 rounded-md font-medium cursor-pointer transition-all border border-sky-200 hover:scale-102 text-center shadow-xs flex items-center justify-center"
                                                            >
                                                                 🎨 View Our Portfolio
                                                            </a>
                                                            <a
                                                                 href="/services"
                                                                 className="bg-sky-50 hover:bg-sky-100 text-sky-800 text-[10px] lg:text-xs py-2 px-2.5 rounded-md font-medium cursor-pointer transition-all border border-sky-200 hover:scale-102 text-center shadow-xs flex items-center justify-center"
                                                            >
                                                                 💼 Our Services
                                                            </a>
                                                            <a
                                                                 href="https://wa.me/919311500423"
                                                                 target="_blank"
                                                                 rel="noopener noreferrer"
                                                                 className="bg-sky-50 hover:bg-sky-100 text-sky-800 text-[10px] lg:text-xs py-2 px-2.5 rounded-md font-medium cursor-pointer transition-all border border-sky-200 hover:scale-102 text-center shadow-xs flex items-center justify-center"
                                                            >
                                                                 💬 WhatsApp Us
                                                            </a>
                                                            <a
                                                                 href="tel:+919311500423"
                                                                 className="bg-sky-50 hover:bg-sky-100 text-sky-800 text-[10px] lg:text-xs py-2 px-2.5 rounded-md font-medium cursor-pointer transition-all border border-sky-200 hover:scale-102 text-center shadow-xs flex items-center justify-center"
                                                            >
                                                                 📞 Call Now
                                                            </a>
                                                       </div>
                                                  </div>
                                             </div>
                                        ) : (
                                             /* Regular message bubble */
                                             <div
                                                  className={`px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-lg text-[10px] lg:text-sm wrap-break-word max-w-[85%] ${
                                                       m.user ? "bg-linear-to-br from-[#007CC9] to-[#003D64] text-white" : "bg-[#081A1A29]/16 text-dark-black"
                                                  }`}
                                                  style={{ whiteSpace: "pre-line" }}
                                             >
                                                  {m.text}
                                             </div>
                                        )}

                                        {/* Message-specific Options Buttons */}
                                        {m.options && !m.multiSelect && (
                                             <div className="flex flex-wrap gap-1.5 mt-2 w-full max-w-[90%]">
                                                  {m.options.map((opt, oIdx) => (
                                                       <button
                                                            key={oIdx}
                                                            onClick={() => handleOptionClick(m.questionId, opt, m.isWelcomeCard)}
                                                            className="bg-white hover:bg-sky-50 text-[#007CC9] hover:text-[#003D64] border border-sky-200 hover:border-sky-400 px-3 py-1.5 rounded-full text-[10px] lg:text-xs font-semibold cursor-pointer transition-all duration-200 hover:scale-102 shadow-xs"
                                                       >
                                                            {opt}
                                                       </button>
                                                  ))}
                                             </div>
                                        )}

                                        {/* Message-specific Multi-Select Buttons */}
                                        {m.options && m.multiSelect && (
                                             <div className="flex flex-wrap gap-1.5 mt-2 w-full max-w-[90%]">
                                                  {m.options.map((opt, oIdx) => {
                                                       const isSelected = tempSelections.includes(opt);
                                                       return (
                                                            <button
                                                                 key={oIdx}
                                                                 onClick={() => handleMultiOptionToggle(opt)}
                                                                 className={`px-3 py-1.5 rounded-full text-[10px] lg:text-xs font-semibold cursor-pointer transition-all duration-200 hover:scale-102 border shadow-xs ${
                                                                      isSelected
                                                                           ? "bg-linear-to-br from-[#007CC9] to-[#003D64] text-white border-transparent"
                                                                           : "bg-white text-[#007CC9] border-sky-200 hover:bg-sky-50"
                                                                 }`}
                                                            >
                                                                 {opt}
                                                            </button>
                                                       );
                                                  })}
                                                  <div className="w-full mt-2">
                                                       <button
                                                            onClick={() => {
                                                                 handleMultiSubmit(m.questionId, tempSelections);
                                                                 setTempSelections([]);
                                                            }}
                                                            disabled={tempSelections.length === 0}
                                                            className={`px-4 py-2 rounded text-[10px] lg:text-xs font-bold transition-all shadow-md cursor-pointer ${
                                                                 tempSelections.length > 0
                                                                      ? "bg-green-600 hover:bg-green-700 text-white hover:scale-102"
                                                                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                            }`}
                                                       >
                                                            Confirm Selection ({tempSelections.length} selected)
                                                       </button>
                                                  </div>
                                             </div>
                                        )}

                                        {/* Inline Date-Time input */}
                                        {m.inputType === "datetime-local" && (
                                             <div className="mt-2 flex flex-col gap-2 w-full max-w-[85%]">
                                                  <input
                                                       type="datetime-local"
                                                       id="chat-datetime-input"
                                                       className="border border-sky-300 rounded px-2.5 py-2 text-xs text-dark-black outline-none focus:border-blue bg-white"
                                                       onChange={(e) => {
                                                            const inputEl = document.getElementById("chat-datetime-input");
                                                            if (inputEl) inputEl.setAttribute("data-val", e.target.value);
                                                       }}
                                                  />
                                                  <button
                                                       onClick={() => {
                                                            const inputEl = document.getElementById("chat-datetime-input");
                                                            const val = inputEl ? inputEl.getAttribute("data-val") : "";
                                                            if (val) {
                                                                 const formatted = new Date(val).toLocaleString("en-IN", {
                                                                      dateStyle: "medium",
                                                                      timeStyle: "short"
                                                                 });
                                                                 handleInputSubmit(m.questionId, formatted);
                                                            }
                                                       }}
                                                       className="bg-linear-to-br from-[#007CC9] to-[#003D64] text-white px-4 py-2 rounded text-[10px] lg:text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-102 text-center"
                                                  >
                                                       Confirm Date & Time
                                                  </button>
                                             </div>
                                        )}
                                   </div>
                              );
                         })}

                         {typing && (
                              <div className="flex items-start gap-2">
                                   <img
                                        src={ChatProfile}
                                        alt="Chatbot Profile"
                                        className="w-6.75 lg:w-10 h-6.75 lg:h-10 rounded-full"
                                   />
                                   <div className="flex items-center gap-1 bg-dark-gray/10 px-4 py-3 rounded-lg">
                                        <span className="w-2 h-2 bg-[#007CC9] rounded-full typing-dot"></span>
                                        <span className="w-2 h-2 bg-[#007CC9] rounded-full typing-dot delay-150"></span>
                                        <span className="w-2 h-2 bg-[#007CC9] rounded-full typing-dot delay-300"></span>
                                   </div>
                              </div>
                         )}

                         <div ref={messageRef} />
                    </div>

                    {/* Bottom Input Area */}
                    {inputError && (
                         <div className="text-[10px] text-red-500 px-4 py-1 font-semibold bg-red-50 border-t border-red-100 flex items-center gap-1">
                              <span>⚠️</span> {inputError}
                         </div>
                    )}

                    <div className="bg-white">
                         <div className="mx-3 p-3 flex h-7.75 lg:h-12 border border-dark-black/12 items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                              <input
                                   value={input}
                                   disabled={isInputDisabled}
                                   onChange={(e) => {
                                        setInput(e.target.value);
                                        if (inputError) setInputError("");
                                   }}
                                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                   placeholder={inputPlaceholder}
                                   className={`flex-1 outline-none text-[12px] lg:text-sm ${
                                        isInputDisabled ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-dark-black"
                                   }`}
                              />

                              <button
                                   aria-label="Send Message"
                                   onClick={sendMessage}
                                   disabled={isInputDisabled}
                                   className={`text-[12px] lg:text-[20px] rounded-md transition-all ${
                                        isInputDisabled
                                             ? "text-gray-300 cursor-not-allowed"
                                             : "text-dark-black cursor-pointer hover:scale-102"
                                   }`}
                              >
                                   <IoSend />
                              </button>
                         </div>
                    </div>

                    {/* Extra Decorative Icons */}
                    <div className="bg-white px-4 py-3">
                         <div className="flex items-center">
                              <div className="flex items-center gap-2 justify-between text-dark-black w-full text-[12px] lg:text-[20px]">
                                   <div className="flex items-center gap-2 cursor-not-allowed opacity-40">
                                        <FaCamera />
                                        <MdOutlineGifBox />
                                        <MdEmojiEmotions />
                                        <AiOutlineLink />
                                   </div>
                                   <IoIosMic className="cursor-not-allowed opacity-40" />
                              </div>
                         </div>
                    </div>
               </div>
          </>
     );
}