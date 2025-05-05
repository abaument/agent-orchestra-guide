
import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AIBadge from './AIBadge';

interface Message {
  content: string;
  isUser: boolean;
}

const AskMeAnything = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      content: "Bonjour ! Je suis votre guide IA sur les systèmes multi-agents. Comment puis-je vous aider aujourd'hui ?", 
      isUser: false 
    }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { content: input, isUser: true }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Les systèmes multi-agents (SMA) sont des systèmes composés d'agents autonomes qui interagissent entre eux pour résoudre des problèmes complexes.",
        "Dans une architecture hiérarchique, les agents sont organisés en niveaux, avec des agents superviseurs qui coordonnent les agents de niveau inférieur.",
        "La coordination entre agents peut se faire par divers protocoles comme le Contract Net Protocol ou les enchères distribuées.",
        "L'un des principaux avantages des SMA est leur robustesse face aux pannes, car la défaillance d'un agent n'entraîne pas l'échec du système entier."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { content: randomResponse, isUser: false }]);
    }, 1000);

    // Clear input
    setInput('');
  };

  return (
    <>
      <div className={`chat-container ${isOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between bg-electric-blue p-4 text-white">
          <h3 className="font-medium">Ask Me Anything</h3>
          <button onClick={toggleChat} className="text-white hover:text-gray-200">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${message.isUser ? 'bg-electric-blue text-white' : 'bg-gray-100'}`}>
                <p>{message.content}</p>
                {!message.isUser && <AIBadge />}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Posez votre question..." 
            className="flex-1"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Send size={18} />
          </Button>
        </form>
      </div>
      <div className="floating-button" onClick={toggleChat}>
        <MessageCircle size={24} />
      </div>
    </>
  );
};

export default AskMeAnything;
