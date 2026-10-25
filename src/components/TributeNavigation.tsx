import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../data/tributeData';
import { Menu, X, Share2, Music } from 'lucide-react';

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
          ? 'bg-[#07100C]/95 backdrop-blur-md border-b border-[#163021] py-3.5 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark in bold display font */}
          <a
            href="#opening"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('opening');
            }}
            className="font-display text-base sm:text-lg tracking-tight text-[#F5F7F3] hover:text-[#E6B84A] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>OMOLAYO KOLLEADE</span>
            <span className="hidden sm:inline font-headline font-bold text-xs tracking-wider text-[#E6B84A]">
              · BIG MUMMY
            </span>
          </a>

          {/* Zone 2: Clean single-line text navigation links with human labels */}
          <nav
            className="hidden lg:flex items-center gap-6 text-xs uppercase font-headline font-bold tracking-wider text-[#C8D1CB]"
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
                      ? 'text-[#E6B84A] border-[#E6B84A]'
                      : 'border-transparent hover:text-[#F5F7F3] hover:border-[#C8D1CB]/40'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onMusicClick}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-headline font-extrabold uppercase tracking-wider text-[#07100C] bg-[#E6B84A] hover:bg-[#F5F0E6] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
              aria-label="Play OLUMINI song"
            >
              <Music className="w-3.5 h-3.5" />
              <span>Song: OLUMINI</span>
            </button>

            <button
              type="button"
              onClick={onShareClick}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-headline font-bold uppercase tracking-wider text-[#F5F7F3] bg-[#10241A] hover:bg-[#163021] border border-[#163021] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Share tribute"
            >
              <Share2 className="w-3.5 h-3.5 text-[#E6B84A]" />
              <span className="hidden xs:inline">Share</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#C8D1CB] hover:text-[#F5F7F3] transition-colors cursor-pointer"
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
        <div className="lg:hidden bg-[#07100C]/98 border-b border-[#163021] px-6 py-6 shadow-2xl transition-all">
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
                    ? 'text-[#E6B84A] font-extrabold'
                    : 'text-[#C8D1CB] hover:text-[#F5F7F3] font-bold'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-[#163021] flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onMusicClick();
                }}
                className="flex-1 py-3 text-xs font-headline font-extrabold uppercase tracking-wider text-center bg-[#E6B84A] text-[#07100C] cursor-pointer"
              >
                Listen to OLUMINI
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onShareClick();
                }}
                className="flex-1 py-3 text-xs font-headline font-bold uppercase tracking-wider text-center bg-[#10241A] text-[#F5F7F3] border border-[#163021] cursor-pointer"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
