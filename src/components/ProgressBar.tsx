
import { useEffect, useState } from 'react';

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
    <div className="progress-bar">
      <div 
        className="progress-indicator" 
        style={{ 
          height: `${progress}%`, 
        }}
      />
      {sections.map((section, index) => (
        <div 
          key={index}
          className={`progress-dots ${currentSection === index ? 'active' : ''}`}
          style={{ top: `${(index / (sections.length - 1)) * 100}%` }}
          onClick={() => onSectionChange(index)}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
