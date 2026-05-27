// hooks/useMenuH2Data.js
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function useChatBotH2Data() {
     const [chatBotH2Tags, setChatBotH2Tags] = useState({});

     useEffect(() => {
          const fetchChatBotH2Data = async () => {
               try {
                    // Fixed: 'menu' page ka data hamesha fetch karega
                    const res = await fetch(`${API_URL}/h2/page/chatbot_component`);
                    const data = await res.json();
                    setChatBotH2Tags(data);
               } catch (error) {
                    console.error('Error fetching chatbot H2 data:', error);
               }
          };

          fetchChatBotH2Data();
     }, []); // Empty dependency array - sirf ek baar fetch hoga

     return chatBotH2Tags;
}