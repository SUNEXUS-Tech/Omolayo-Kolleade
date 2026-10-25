import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setProgress(Math.min(Math.max(currentProgress, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className={`h-full transition-all duration-100 ease-out ${
          isDark
            ? 'bg-gradient-to-r from-[#E6B84A] via-[#D8A078] to-[#E6B84A]'
            : 'bg-gradient-to-r from-[#B58218] via-[#A0643C] to-[#B58218]'
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
