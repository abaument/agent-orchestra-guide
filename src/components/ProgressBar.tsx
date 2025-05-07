
import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProgressBarProps {
  sections: string[];
  currentSection: number;
  onSectionChange: (index: number) => void;
}

const ProgressBar = ({ sections, currentSection, onSectionChange }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setProgress(scrollPercent * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="progress-bar fixed right-6 top-1/2 transform -translate-y-1/2 h-80 w-2 bg-gray-200 rounded-full z-50">
      <div 
        className="progress-indicator bg-electric-blue rounded-full" 
        style={{ 
          height: `${progress}%`, 
          width: '100%',
          transition: 'height 0.3s ease-out'
        }}
      />
      <div className="relative h-full">
        {sections.map((section, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`
                    progress-dots absolute w-5 h-5 -left-1.5
                    rounded-full border-2 transition-all duration-300
                    hover:scale-125 hover:border-electric-blue 
                    cursor-pointer focus:outline-none
                    ${currentSection === index 
                      ? 'bg-electric-blue border-white' 
                      : 'bg-white border-gray-300 hover:bg-electric-blue/10'}
                  `}
                  style={{ top: `${(index / (sections.length - 1)) * 100}%` }}
                  onClick={() => onSectionChange(index)}
                  aria-label={`Naviguer vers la section ${section}`}
                >
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-white p-2 shadow-lg rounded-md border border-gray-200 max-w-xs">
                <p className="font-medium">{section}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {getTooltipDescription(index)}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

// Fonction pour obtenir une description détaillée de chaque section
const getTooltipDescription = (index: number): string => {
  switch (index) {
    case 1:
      return "Vision, messages clés et recommandations.";
    case 2:
      return "Explosion des agents LLM en 2023‑2025 ; opportunités & motivations.";
    case 3:
      return "Agent vs. MAS, degrés d’autonomie, rôles (planner, critic…).";
    case 4:
      return "Réactive, BDI, hiérarchique, graph‑based (LangGraph), équipage (CrewAI).";
    case 5:
      return "LLM (GPT‑4o, Gemini 3…), RLHF, RAG, outils, orchestration cloud/serverless.";
    case 6:
      return "Copilotes métiers, cybersécurité, robotique, simulation socio‑économique, supply‑chain.";
    case 7:
      return "Émergence, coordination, évaluation, scalabilité, alignement.";
    case 8:
      return "EU AI Act, ISO/IEC 42001, IEEE P3394, Data Act, privacy.";
    case 9:
      return "Attaques sybil, prompt‑injection croisée, fuite de mémoire partagée.";
    case 10:
      return "Productivité, emplois, redistribution de valeur, souveraineté numérique.";
    case 11:
      return "Agentic AI à l’échelle, gouvernance, agents physiques (robots).";
    case 12:
      return "Pilotage, POC, KPI, gouvernance, formation.";
    case 13:
      return "Testez l'IARIIG";
    default:
      return "Cliquez pour naviguer vers cette section";
  }
};

export default ProgressBar;
