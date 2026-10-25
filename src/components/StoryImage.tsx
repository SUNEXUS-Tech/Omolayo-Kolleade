import React, { useState, useEffect } from 'react';
import { ImageConfig } from '../types/tribute';
import { useTheme } from '../context/ThemeContext';

interface StoryImageProps {
  config: ImageConfig;
  className?: string;
  priority?: boolean;
  theme?: 'dark' | 'ivory';
  blend?: 'dark-soft' | 'dark-bottom' | 'ivory-soft' | 'none';
  objectFit?: 'contain' | 'cover';
  maxHeight?: string;
}

export const StoryImage: React.FC<StoryImageProps> = ({
  config,
  className = '',
  priority = false,
  theme,
  blend = 'dark-soft',
  objectFit = 'contain',
  maxHeight = 'max-h-[70vh]',
}) => {
  const { isDark } = useTheme();
  const [currentSrc, setCurrentSrc] = useState<string>(config.src);
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    setCurrentSrc(config.src);
    setLoadState('loading');
  }, [config.src]);

  const handleError = () => {
    if (currentSrc.includes('assets/aistudio')) {
      const filename = currentSrc.split('/').pop() || '';
      if (filename.toLowerCase().includes('opening')) {
        setCurrentSrc('/images/01-opening.webp');
      } else if (filename.toLowerCase().includes('identity')) {
        setCurrentSrc('/images/02-identity.webp');
      } else if (filename.toLowerCase().includes('care')) {
        setCurrentSrc('/images/03-care.webp');
      } else if (filename.toLowerCase().includes('roots')) {
        setCurrentSrc('/images/04-roots.webp');
      } else if (filename.toLowerCase().includes('olumini')) {
        setCurrentSrc('/olumini.webp');
      } else if (filename.toLowerCase().includes('letter')) {
        setCurrentSrc('/images/06-letter.webp');
      } else {
        setLoadState('error');
      }
    } else {
      setLoadState('error');
    }
  };

  // Determine masking / blending classes
  let blendClass = '';
  if (blend === 'dark-soft' || blend === 'ivory-soft') {
    blendClass = 'mask-edges-dark';
  } else if (blend === 'dark-bottom') {
    blendClass = 'mask-fade-bottom';
  }

  const effectiveIsDark = theme !== undefined ? theme === 'dark' : isDark;

  return (
    <div className={`relative w-full flex flex-col items-center justify-center ${className}`}>
      {/* Seamless image container without artificial borders or card boxes */}
      <div
        className={`relative w-full flex items-center justify-center overflow-hidden transition-all duration-700 ${blendClass}`}
      >
        <img
          src={currentSrc}
          alt={config.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onLoad={() => setLoadState('loaded')}
          onError={handleError}
          className={`w-auto h-auto max-w-full ${maxHeight} transition-opacity duration-700 ease-out ${
            objectFit === 'contain' ? 'object-contain' : 'object-cover'
          } ${loadState === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          style={{
            objectPosition: config.focalPoint || 'center center',
          }}
        />

        {/* Ambient subtle glow beneath photo matching theme */}
        <div
          className={`absolute inset-0 pointer-events-none -z-10 blur-3xl opacity-20 ${
            effectiveIsDark ? 'bg-[#E6B84A]' : 'bg-[#D6CEBE]'
          }`}
          aria-hidden="true"
        />
      </div>

      {/* Styled Development Placeholder if file fails */}
      {loadState === 'error' && (
        <div
          className={`w-full max-w-md my-8 p-6 text-center rounded-none border border-dashed select-none ${
            effectiveIsDark
              ? 'border-[#163021] bg-[#10241A]/50 text-[#F5F7F3]'
              : 'border-[#D6CEBE] bg-[#EBE6DF]/50 text-[#07100C]'
          }`}
          role="status"
        >
          <p className="font-headline font-bold text-sm tracking-wide mb-1">
            Photograph Pending
          </p>
          <code className="text-xs font-mono text-[#E6B84A] block truncate">
            {config.src}
          </code>
        </div>
      )}
    </div>
  );
};
