
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AIBadge from './AIBadge';

interface AgentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
}

const AgentCard = ({ title, description, icon, details }: AgentCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className={`agent-card transition-all ${expanded ? 'border-electric-blue' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="bg-electric-blue/10 p-3 rounded-lg mb-3">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={`transition-all overflow-hidden ${expanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="pt-2 text-sm text-gray-600">
          {details}
          <AIBadge />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Masquer les détails" : "Voir plus"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
