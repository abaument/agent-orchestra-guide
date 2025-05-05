
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
    case 0:
      return "Introduction aux systèmes multi-agents d'IA et présentation générale du guide";
    case 1:
      return "Définition, caractéristiques et fonctionnalités des systèmes multi-agents en intelligence artificielle";
    case 2:
      return "Exploration des différents types d'architectures et protocoles de communication entre agents";
    case 3:
      return "Exemples concrets d'applications des systèmes multi-agents dans différents secteurs";
    case 4:
      return "Guide étape par étape pour concevoir, développer et déployer votre propre système multi-agents";
    case 5:
      return "Considérations éthiques, sécurité et bonnes pratiques pour une implémentation responsable";
    case 6:
      return "Synthèse des points clés et ressources supplémentaires pour approfondir";
    default:
      return "Cliquez pour naviguer vers cette section";
  }
};

export default ProgressBar;
