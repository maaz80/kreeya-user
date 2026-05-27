import { useState, useRef, useEffect } from "react";
import botIcon from "../assets/chatbot.webp";
import logo from "../assets/chatbot-logo.webp";
import { IoSend } from "react-icons/io5";
import { FaCamera } from "react-icons/fa6";
import { MdEmojiEmotions, MdOutlineGifBox } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import { IoIosMic } from "react-icons/io";
import ChatProfile from '../assets/chatbot-profile.webp'
import { useChatBotH2Data } from "../hooks/useChatBotH2Data";
const responses = {
     'hello': 'Hello! How can I help you today?',
     'hi': 'Hi there! What can I do for you?',
     'hey': 'Hey! How can I assist you?',
     'services': 'We offer UI/UX Design, Web Development, Branding, and Digital Marketing services.',
     'portfolio': 'You can check our amazing work in the portfolio section!',
     'work': 'We have worked with many clients on various projects. Check out our portfolio!',
     'contact': 'You can reach us through the contact form or email us at hello@kreeyadesign.com',
     'price': 'Our pricing depends on the project scope. Let\'s discuss your requirements!',
     'pricing': 'Our pricing is flexible based on your needs. Contact us for a quote!',
     'help': 'I\'m here to help! You can ask about our services, portfolio, pricing, or contact information.',
     'about': 'We are Kreeya Design - a creative agency focused on delivering exceptional design solutions.',
     'thanks': 'You\'re welcome! Let me know if you need anything else.',
     'thank you': 'My pleasure! Feel free to ask anything.',
     'bye': 'Goodbye! Have a great day!',
     'default': 'I\'m not sure about that. Can you try asking about our services, portfolio, pricing, or contact info?'
};

export default function ChatBot() {
     const [open, setOpen] = useState(false);
     const [typing, setTyping] = useState(false);
     const h2ChatBot = useChatBotH2Data()
     const [messages, setMessages] = useState([
          {
               text: "Howdy, is there anything we can help you with today?",
               user: false,
               time: Date.now()
          },
          {
               text: "Just let me know!",
               user: false,
               time: Date.now()
          }
     ]);

     const [input, setInput] = useState("");

     const messageRef = useRef();

     useEffect(() => {
          if (messageRef.current) {
               requestAnimationFrame(() => {
                    messageRef.current?.scrollIntoView({ block: "end" });
               });
          }
     }, [messages]);

     function getBotReply(msg) {
          const text = msg.toLowerCase();
          for (let key in responses) {
               if (text.includes(key)) return responses[key];
          }
          return responses.default;
     }

     function sendMessage() {
          if (!input.trim()) return;

          const userMsg = { text: input, user: true, time: Date.now() };

          setMessages((prev) => [...prev, userMsg]);

          const reply = getBotReply(input);

          setInput("");

          // show typing
          setTyping(true);

          setTimeout(() => {
               setTyping(false);

               setMessages((prev) => [
                    ...prev,
                    { text: reply, user: false, time: Date.now() }
               ]);
          }, 1000);
     }

     function getTimeAgo(timestamp) {
          const diff = Math.floor((Date.now() - timestamp) / 1000);

          if (diff < 60) return "Just now";

          const minutes = Math.floor(diff / 60);
          if (minutes < 60) return `${minutes} min ago`;

          const hours = Math.floor(minutes / 60);
          if (hours < 24) return `${hours} hr ago`;

          const days = Math.floor(hours / 24);
          return `${days} day ago`;
     }
     return (
          <>
               {/* Floating Button */}

               {!open && (
                    <button
                         onClick={() => setOpen(true)}
                         className=" group fixed bottom-43 md:bottom-50 lg:bottom-57 right-5 md:right-8 3xl:right-[320px] bg-white cursor-pointer rounded-full shadow-xl flex items-center justify-end overflow-hidden transition-all duration-300 w-16 hover:w-57.5 hover:py-3.5 px-3 py-3 z-9999 " >

                         {/* Text (LEFT) */}

                         <span
                              className=" whitespace-nowrap text-[22px] mr-3 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 " >
                              Any Questions?
                         </span>

                         {/* Icon (RIGHT) */}

                         <img
                              src={botIcon}
                              alt="Chatbot Icon"
                              className="w-10 h-10 shrink-0 group-hover:scale-102"
                         />

                    </button>
               )}

               {/* Chat Window */}

               {/* {open && ( */}
               <div
                    className={`fixed bottom-18 3xl:bottom-10 right-8 3xl:right-[320px]  w-69.5 2xl:w-110 h-100 2xl:h-162.75  bg-linear-to-br from-[#007CC9] to-[#003D64]  rounded-xl shadow-2xl z-99999 flex flex-col overflow-hidden plus-jakarta-sans transform transition-all duration-700 ease-in-out ${open ? "translate-y-0 translate-x-0 opacity-100 scale-100" : "translate-y-[120%] translate-x-[120%] opacity-0 scale-0 pointer-events-none"} `}>

                    {/* Header */}

                    <div className="bg-linear-to-br from-[#007CC9] to-[#003D64] text-white px-4 pb-6 pt-4">
                         <div className="flex justify-between items-center mb-1">
                              <img src={logo} alt="Chatbot Logo" className="w-10 h-10" />

                              <button onClick={() => setOpen(false)} className="cursor-pointer hover:rotate-90 transition-all duration-300 ease-in-out">✕</button>
                         </div>

                         <h2 className="text-[30px] lg:text-[48px] leading-9 lg:leading-15 poiret-one-regular">{h2ChatBot.hi_there_heading || 'Hi there!'}</h2>

                         <p className="text-[9px] lg:text-[14px] leading-5 opacity-80">
                              Welcome to Kreeya design. How can we help you today?
                         </p>
                    </div>

                    {/* Messages */}

                    <div className="flex-1 p-4 overflow-y-auto space-y-2 h-80 bg-white -mt-1 rounded-t-xl">

                         {messages.map((m, i) => {

                              const showAvatar = !m.user && (i === 0 || messages[i - 1].user);

                              return (
                                   <div
                                        key={i}
                                        className={`flex flex-col ${m.user ? "items-end" : "items-start"}`}
                                   >

                                        {/* BOT HEADER */}

                                        {showAvatar && !m.user && (
                                             <div className="flex items-center gap-2 mb-1 lg:mb-3">
                                                  <img
                                                       src={ChatProfile}
                                                       alt="Chatbot Profile"
                                                       className="w-6.75 lg:w-10 h-6.75 lg:h-10 rounded-full"
                                                  />

                                                  <div>
                                                       <h2 className="text-[10px] lg:text-[16px] leading-5 lg:leading-6 text-blue">
                                                            {h2ChatBot.bot_name || 'John Smith'}
                                                       </h2>

                                                       <div className="text-[9px] lg:text-[14px] text-dark-gray">
                                                            {getTimeAgo(m.time)}
                                                       </div>
                                                  </div>
                                             </div>
                                        )}

                                        {/* MESSAGE */}

                                        <div
                                             className={`px-2.5 lg:px-4 py-1 lg:py-2 rounded-lg text-[10px] lg:text-sm  wrap-break-word max-w-[75%]
        ${m.user
                                                       ? "bg-linear-to-br from-[#007CC9] to-[#003D64] text-white"
                                                       : "bg-[#081A1A29]/16 text-dark-black"
                                                  }`}
                                        >
                                             {m.text}
                                        </div>

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
                                        <span className="w-2 h-2 bg-dark-gray rounded-full typing-dot"></span>
                                        <span className="w-2 h-2 bg-dark-gray rounded-full typing-dot delay-150"></span>
                                        <span className="w-2 h-2 bg-dark-gray rounded-full typing-dot delay-300"></span>
                                   </div>
                              </div>
                         )}
                         <div ref={messageRef} />

                    </div>

                    {/* Input */}

                    <div className="bg-white">
                         <div className="mx-3 p-3 flex h-7.75 lg:h-12 border border-dark-black/12 items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                              <input
                                   value={input}
                                   onChange={(e) => setInput(e.target.value)}
                                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                   placeholder="Write your query"
                                   className="flex-1 outline-none text-[12px] lg:text-sm"
                              />

                              <button
                                   aria-label="Send Message"
                                   onClick={sendMessage}
                                   className="text-dark-black text-[12px] lg:text-[20px] rounded-md cursor-pointer hover:scale-102"
                              >
                                   <IoSend />
                              </button>
                         </div>
                    </div>


                    {/* Input */}

                    <div className="bg-white px-4 py-3">

                         <div className="flex items-center ">

                              {/* Icons */}

                              <div className="flex items-center gap-2 justify-between text-dark-black  w-full text-[12px] lg:text-[20px]">

                                   <div className="flex items-center gap-2 cursor-pointer">
                                        <FaCamera />
                                        <MdOutlineGifBox />
                                        <MdEmojiEmotions />
                                        <AiOutlineLink />
                                   </div>

                                   <IoIosMic className="cursor-pointer" />

                              </div>

                         </div>


                    </div>
               </div>
               {/* )} */}
          </>
     );
}