
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Shield } from 'lucide-react';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

const predefinedResponses = [
  "Hello! How can I help you with FakeniX today?",
  "FakeniX helps you detect, report, and track deepfake media. Would you like to learn more about our services?",
  "You can report a deepfake by clicking the 'Report Deepfake' option in the navigation menu.",
  "To track your submitted reports, use the 'Track Reports' feature in the navigation menu.",
  "Deepfakes are synthetic media created using AI to manipulate or generate visual and audio content with a high potential to deceive.",
  "Our verification technology uses advanced AI algorithms to detect manipulated content. You can learn more in our 'Verification Technology' page.",
  "If you need more assistance, feel free to ask specific questions about deepfakes, reporting, or our platform features.",
  "For technical support or urgent matters, please contact our team at support@fakenix.com.",
  "Your privacy is important to us. All reports are handled with strict confidentiality.",
  "Thank you for using FakeniX to combat the spread of deepfake content!"
];

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi there! 👋 I\'m FakeniX Assistant. How can I help you today?',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      role: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsResponding(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsResponding(false);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <Card className="w-80 md:w-96 shadow-xl border-primary/10 overflow-hidden transition-all ease-in-out duration-300 max-h-[600px] flex flex-col">
          <CardHeader className="p-4 bg-gradient-to-r from-primary to-secondary text-white flex flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <h3 className="font-semibold text-md">FakeniX Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-3 overflow-y-auto flex-grow max-h-[400px]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2 w-full",
                    message.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar className={cn(
                    "h-8 w-8", 
                    message.role === 'user' ? "bg-secondary" : "bg-primary"
                  )}>
                    {message.role === 'user' ? (
                      <AvatarFallback>U</AvatarFallback>
                    ) : (
                      <>
                        <AvatarImage src="/favicon.ico" />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div
                    className={cn(
                      "rounded-lg py-2 px-3 max-w-[75%]",
                      message.role === 'user'
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isResponding && (
                <div className="flex gap-2">
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg py-2 px-3 bg-muted max-w-[75%]">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce"></div>
                      <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <CardFooter className="p-3 pt-0 border-t">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!userInput.trim() || isResponding}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default ChatbotWidget;
