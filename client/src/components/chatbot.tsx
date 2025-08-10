import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const predefinedResponses: Record<string, string> = {
  "halo": "Halo! Selamat datang di RR Travel. Saya siap membantu Anda menemukan paket wisata terbaik. Ada yang bisa saya bantu?",
  "hai": "Hai! Selamat datang di RR Travel. Saya siap membantu Anda menemukan paket wisata terbaik. Ada yang bisa saya bantu?",
  "paket wisata": "Kami memiliki berbagai paket wisata menarik seperti Bali Budaya & Alam (Rp 2.850.000), Yogya Heritage Tour (Rp 1.950.000), dan Lombok Paradise (Rp 3.450.000). Paket mana yang menarik untuk Anda?",
  "bali": "Paket Bali Budaya & Alam kami sangat populer! Durasi 3D2N dengan harga Rp 2.850.000. Termasuk kunjungan ke Tanah Lot, Uluwatu, dan Ubud. Apakah Anda tertarik?",
  "yogyakarta": "Yogya Heritage Tour adalah pilihan tepat untuk menjelajahi budaya Jawa! 4D3N dengan harga Rp 1.950.000. Mengunjungi Borobudur, Prambanan, dan Kraton. Mau tahu lebih detail?",
  "lombok": "Lombok Paradise cocok untuk petualangan! 5D4N seharga Rp 3.450.000. Termasuk trekking Rinjani dan snorkeling di Gili Trawangan. Tertarik dengan paket ini?",
  "harga": "Harga paket wisata kami mulai dari Rp 1.950.000 untuk Yogya Heritage Tour hingga Rp 3.450.000 untuk Lombok Paradise. Semua sudah termasuk akomodasi, transportasi, dan guide profesional.",
  "booking": "Untuk booking, Anda bisa klik tombol 'Book Now' pada paket yang dipilih atau hubungi kami di WhatsApp 082115665661. Kami akan membantu proses reservasi Anda.",
  "kontak": "Anda bisa menghubungi kami melalui WhatsApp di 082115665661 atau email di info@rrtravel.com. Kantor kami berlokasi di Jl. Siti Mariah, Bandung.",
  "terima kasih": "Sama-sama! Senang bisa membantu Anda. Jangan ragu untuk bertanya lagi jika ada yang ingin ditanyakan tentang paket wisata kami."
};

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Check for exact matches first
  for (const [key, response] of Object.entries(predefinedResponses)) {
    if (message.includes(key)) {
      return response;
    }
  }
  
  // Default response
  return "Maaf, saya belum memahami pertanyaan Anda. Bisa Anda tanyakan tentang paket wisata, harga, atau cara booking? Atau hubungi langsung tim kami di WhatsApp 082115665661.";
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya asisten virtual RR Travel. Ada yang bisa saya bantu tentang paket wisata kami?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200"
      >
        <Card className="h-full flex flex-col">
          <CardHeader className="bg-primary-green text-white rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <CardTitle className="text-sm font-medium">RR Travel Assistant</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-green-600 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-primary-green text-white'
                    }`}>
                      {message.sender === 'user' ? 
                        <User className="w-3 h-3" /> : 
                        <Bot className="w-3 h-3" />
                      }
                    </div>
                    <div className={`rounded-lg p-2 text-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary-green text-white flex items-center justify-center">
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-2 text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="border-t border-gray-200 p-3">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik pesan Anda..."
                  className="flex-1 text-sm"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-primary-green hover:bg-green-600 p-2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}