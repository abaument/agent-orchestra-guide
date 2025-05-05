
import { useEffect, useRef } from 'react';

const NetworkAnimation = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll('path');
        
        // Randomly highlight some paths
        paths.forEach(path => {
          if (Math.random() > 0.7) {
            path.setAttribute('stroke', '#3A86FF');
            path.setAttribute('stroke-width', '2');
            
            // Reset after animation
            setTimeout(() => {
              path.setAttribute('stroke', '#ADB5BD');
              path.setAttribute('stroke-width', '1');
            }, 700);
          }
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <svg 
      ref={svgRef}
      width="100%" 
      height="100%" 
      viewBox="0 0 800 600" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="agent-svg"
    >
      {/* Nodes */}
      <circle cx="400" cy="300" r="30" fill="#3A86FF" />
      <circle cx="250" cy="200" r="25" fill="#3A86FF" opacity="0.8" />
      <circle cx="550" cy="200" r="25" fill="#3A86FF" opacity="0.8" />
      <circle cx="250" cy="400" r="25" fill="#3A86FF" opacity="0.8" />
      <circle cx="550" cy="400" r="25" fill="#3A86FF" opacity="0.8" />
      <circle cx="150" cy="300" r="20" fill="#3A86FF" opacity="0.6" />
      <circle cx="650" cy="300" r="20" fill="#3A86FF" opacity="0.6" />
      <circle cx="350" cy="120" r="20" fill="#3A86FF" opacity="0.6" />
      <circle cx="450" cy="120" r="20" fill="#3A86FF" opacity="0.6" />
      <circle cx="350" cy="480" r="20" fill="#3A86FF" opacity="0.6" />
      <circle cx="450" cy="480" r="20" fill="#3A86FF" opacity="0.6" />
      
      {/* Connections */}
      <path d="M400,300 L250,200" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M400,300 L550,200" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M400,300 L250,400" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M400,300 L550,400" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M250,200 L150,300" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M550,200 L650,300" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M250,400 L150,300" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M550,400 L650,300" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M250,200 L350,120" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M550,200 L450,120" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M250,400 L350,480" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M550,400 L450,480" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M350,120 L450,120" stroke="#ADB5BD" strokeWidth="1" />
      <path d="M350,480 L450,480" stroke="#ADB5BD" strokeWidth="1" />
    </svg>
  );
};

export default NetworkAnimation;
