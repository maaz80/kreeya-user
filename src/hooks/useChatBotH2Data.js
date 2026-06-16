// hooks/useChatBotH2Data.js
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let chatbotCache = null;

export function useChatBotH2Data() {
     const [chatBotH2Tags, setChatBotH2Tags] = useState(chatbotCache || {});

     useEffect(() => {
          if (chatbotCache) {
               setChatBotH2Tags(chatbotCache);
               return;
          }

          const fetchChatBotH2Data = async () => {
               try {
                    const res = await fetch(`${API_URL}/h2/page/chatbot_component`);
                    if (res.ok) {
                         const data = await res.json();
                         chatbotCache = data;
                         setChatBotH2Tags(data);
                    }
               } catch (error) {
                    console.error('Error fetching chatbot H2 data:', error);
               }
          };

          fetchChatBotH2Data();
     }, []);

     return chatBotH2Tags;
}