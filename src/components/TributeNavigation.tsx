import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../data/tributeData';
import { Menu, X, Share2, Music, Sun, Moon, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { trackShareClick, trackThemeToggle } from '../utils/analytics';

interface TributeNavigationProps {
  onShareClick: () => void;
  onMusicClick: () => void;
  activeSection: string;
}

export const TributeNavigation: React.FC<TributeNavigationProps> = ({
  onShareClick,
  onMusicClick,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();
  const { isPlaying, togglePlay } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#07100C]/95 backdrop-blur-md border-b border-[#163021] py-3.5 shadow-xl text-[#F5F7F3]'
            : 'bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#D6CEBE] py-3.5 shadow-md text-[#0A1C14]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 sm:gap-8">
          {/* Zone 1: Wordmark in bold display font */}
          <a
            href="#opening"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('opening');
            }}
            className={`font-display text-base sm:text-lg tracking-tight transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              isDark
                ? 'text-[#F5F7F3] hover:text-[#E6B84A]'
                : 'text-[#0A1C14] hover:text-[#B58218]'
            }`}
          >
            <span>OMOLAYO KOLLEADE</span>
            <span
              className={`hidden sm:inline font-headline font-bold text-xs tracking-wider ${
                isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
              }`}
            >
              · BIG MUMMY
            </span>
          </a>

          {/* Zone 2: Clean single-line text navigation links with human labels */}
          <nav
            className={`hidden lg:flex items-center gap-6 text-xs uppercase font-headline font-bold tracking-wider ${
              isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
            }`}
            aria-label="Story navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                    isActive
                      ? isDark
                        ? 'text-[#E6B84A] border-[#E6B84A]'
                        : 'text-[#B58218] border-[#B58218]'
                      : isDark
                      ? 'border-transparent hover:text-[#F5F7F3] hover:border-[#C8D1CB]/40'
                      : 'border-transparent hover:text-[#0A1C14] hover:border-[#48574D]/40'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Action Buttons (Music toggle, Theme toggle, Share) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Audio Play/Pause + Jump button */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={togglePlay}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-headline font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                  isPlaying
                    ? isDark
                      ? 'bg-[#E6B84A] text-[#07100C] hover:bg-[#F5F0E6]'
                      : 'bg-[#B58218] text-[#FAF6EE] hover:bg-[#8C6514]'
                    : isDark
                    ? 'bg-[#10241A] text-[#E6B84A] hover:bg-[#163021] border border-[#163021]'
                    : 'bg-[#EFE8DA] text-[#B58218] hover:bg-[#E5DDCE] border border-[#D6CEBE]'
                }`}
                aria-label={isPlaying ? 'Pause OLUMINI audio' : 'Play OLUMINI audio'}
                title={isPlaying ? 'Pause audio' : 'Play OLUMINI song'}
              >
                {isPlaying ? (
                  <>
                    <span className="flex items-end gap-0.5 h-3.5 w-3.5" aria-hidden="true">
                      <span className="w-1 bg-current animate-pulse h-full" />
                      <span className="w-1 bg-current animate-pulse h-2/3" />
                      <span className="w-1 bg-current animate-pulse h-5/6" />
                    </span>
                    <span className="hidden sm:inline">OLUMINI</span>
                    <Pause className="w-3 h-3 ml-0.5" />
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline">Play OLUMINI</span>
                  </>
                )}
              </button>
            </div>

            {/* Theme Toggle Button (Light/Dark) */}
            <button
              type="button"
              onClick={() => {
                const nextTheme = isDark ? 'light' : 'dark';
                toggleTheme();
                trackThemeToggle(nextTheme);
              }}
              className={`p-2 text-xs transition-colors cursor-pointer border flex items-center justify-center ${
                isDark
                  ? 'bg-[#10241A] text-[#E6B84A] border-[#163021] hover:bg-[#163021] hover:text-[#F5F0E6]'
                  : 'bg-[#EFE8DA] text-[#B58218] border-[#D6CEBE] hover:bg-[#E5DDCE] hover:text-[#0A1C14]'
              }`}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#E6B84A]" />
              ) : (
                <Moon className="w-4 h-4 text-[#B58218]" />
              )}
            </button>

            {/* Share Button */}
            <button
              type="button"
              onClick={() => {
                trackShareClick({ method: 'modal_open', location: 'navigation_bar' });
                onShareClick();
              }}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-headline font-bold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                isDark
                  ? 'text-[#F5F7F3] bg-[#10241A] hover:bg-[#163021] border-[#163021]'
                  : 'text-[#0A1C14] bg-[#EFE8DA] hover:bg-[#E5DDCE] border-[#D6CEBE]'
              }`}
              aria-label="Share tribute"
            >
              <Share2 className={`w-3.5 h-3.5 ${isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'}`} />
              <span className="hidden xs:inline">Share</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors cursor-pointer ${
                isDark
                  ? 'text-[#C8D1CB] hover:text-[#F5F7F3]'
                  : 'text-[#48574D] hover:text-[#0A1C14]'
              }`}
              aria-label="Toggle story menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-6 shadow-2xl transition-all ${
            isDark
              ? 'bg-[#07100C]/98 border-[#163021] text-[#F5F7F3]'
              : 'bg-[#FAF6EE]/98 border-[#D6CEBE] text-[#0A1C14]'
          }`}
        >
          <div className="flex flex-col space-y-3.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`text-sm font-headline uppercase tracking-wider transition-colors py-1 ${
                  activeSection === item.id
                    ? isDark
                      ? 'text-[#E6B84A] font-extrabold'
                      : 'text-[#B58218] font-extrabold'
                    : isDark
                    ? 'text-[#C8D1CB] hover:text-[#F5F7F3] font-bold'
                    : 'text-[#48574D] hover:text-[#0A1C14] font-bold'
                }`}
              >
                {item.label}
              </a>
            ))}

            <div className={`pt-4 border-t flex flex-col gap-2.5 ${isDark ? 'border-[#163021]' : 'border-[#D6CEBE]'}`}>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    togglePlay();
                  }}
                  className={`flex-1 py-3 text-xs font-headline font-extrabold uppercase tracking-wider text-center cursor-pointer flex items-center justify-center gap-2 ${
                    isPlaying
                      ? isDark
                        ? 'bg-[#E6B84A] text-[#07100C]'
                        : 'bg-[#B58218] text-[#FAF6EE]'
                      : isDark
                      ? 'bg-[#10241A] text-[#E6B84A] border border-[#163021]'
                      : 'bg-[#EFE8DA] text-[#B58218] border border-[#D6CEBE]'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? 'Pause OLUMINI' : 'Play OLUMINI'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const nextTheme = isDark ? 'light' : 'dark';
                    toggleTheme();
                    trackThemeToggle(nextTheme);
                  }}
                  className={`px-4 py-3 text-xs font-headline font-bold uppercase tracking-wider cursor-pointer border flex items-center justify-center gap-1.5 ${
                    isDark
                      ? 'bg-[#10241A] text-[#E6B84A] border-[#163021]'
                      : 'bg-[#EFE8DA] text-[#B58218] border-[#D6CEBE]'
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{isDark ? 'Light' : 'Dark'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackShareClick({ method: 'modal_open', location: 'navigation_bar' });
                  onShareClick();
                }}
                className={`w-full py-3 text-xs font-headline font-bold uppercase tracking-wider text-center border cursor-pointer flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-[#10241A] text-[#F5F7F3] border-[#163021]'
                    : 'bg-[#EFE8DA] text-[#0A1C14] border-[#D6CEBE]'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>Share Tribute</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
