/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { TributeNavigation } from './components/TributeNavigation';
import { ScrollProgress } from './components/ScrollProgress';
import { OpeningHero } from './components/OpeningHero';
import { IdentityMoment } from './components/IdentityMoment';
import { CareMoment } from './components/CareMoment';
import { RootsMoment } from './components/RootsMoment';
import { SongMoment } from './components/SongMoment';
import { PersonalLetter } from './components/PersonalLetter';
import { FooterCredits } from './components/FooterCredits';
import { ShareModal } from './components/ShareModal';
import { NAV_ITEMS } from './data/tributeData';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import {
  initAnalytics,
  trackSectionView,
  trackScrollMilestone,
} from './utils/analytics';

// Descriptive section metadata for analytics
const SECTION_METADATA: Record<string, { name: string; order: number }> = {
  opening: { name: 'Opening: A Legacy of Love', order: 1 },
  identity: { name: 'The Woman Behind the Name: A Child is Joy', order: 2 },
  care: { name: 'A Life of Care: Registered Nurse & Family Anchor', order: 3 },
  roots: { name: 'Roots and Lineage: Daughter of Olumini', order: 4 },
  song: { name: 'OLUMINI: The Birthday Anthem', order: 5 },
  letter: { name: 'Personal Letter: To Big Mummy, with Endless Love', order: 6 },
};

function TributeMain() {
  const [activeSection, setActiveSection] = useState<string>('opening');
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const { isDark } = useTheme();

  // Track sections viewed to avoid repeated duplicate events during slight scrolling
  const viewedSectionsRef = useRef<Set<string>>(new Set(['opening']));
  const scrollMilestonesRef = useRef<Set<number>>(new Set());

  // Initialize GA4 once on mount
  useEffect(() => {
    initAnalytics();

    // Track the initial hero section view
    trackSectionView('opening', SECTION_METADATA.opening.name, SECTION_METADATA.opening.order);
  }, []);

  // Monitor scroll position for active section and scroll milestones
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY + 200;

          // 1. Detect active section
          for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
            const item = NAV_ITEMS[i];
            const el = document.getElementById(item.id);
            if (el && el.offsetTop <= scrollY) {
              setActiveSection((prev) => {
                if (prev !== item.id) {
                  // Fire section view event if not yet logged in this session
                  if (!viewedSectionsRef.current.has(item.id)) {
                    viewedSectionsRef.current.add(item.id);
                    const meta = SECTION_METADATA[item.id] || { name: item.label, order: i + 1 };
                    trackSectionView(item.id, meta.name, meta.order);
                  }
                  return item.id;
                }
                return prev;
              });
              break;
            }
          }

          // 2. Track scroll depth milestones: 25%, 50%, 75%, 90%
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const currentPercent = (window.scrollY / totalScroll) * 100;
            const milestones: Array<25 | 50 | 75 | 90> = [25, 50, 75, 90];

            milestones.forEach((m) => {
              if (currentPercent >= m && !scrollMilestonesRef.current.has(m)) {
                scrollMilestonesRef.current.add(m);
                trackScrollMilestone(m);
              }
            });
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between overflow-x-hidden transition-colors duration-300 ${
        isDark
          ? 'bg-[#07100C] text-[#F5F7F3] selection:bg-[#E6B84A]/30 selection:text-[#F5F0E6]'
          : 'bg-[#FAF6EE] text-[#0A1C14] selection:bg-[#B58218]/30 selection:text-[#0A1C14]'
      }`}
    >
      {/* Top Subtle Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Sticky Top Bar Navigation with Theme & Music Controls */}
      <TributeNavigation
        activeSection={activeSection}
        onShareClick={() => setShareModalOpen(true)}
        onMusicClick={() => scrollTo('song')}
      />

      {/* Continuous Storytelling Sections */}
      <main className="w-full flex-1">
        {/* Moment 01: The Opening */}
        <OpeningHero onExploreClick={() => scrollTo('identity')} />

        {/* Moment 02: The Woman Behind the Name */}
        <IdentityMoment />

        {/* Moment 03: A Life of Care */}
        <CareMoment />

        {/* Moment 04: Roots and Legacy */}
        <RootsMoment onSongJump={() => scrollTo('song')} />

        {/* Moment 05: OLUMINI: The Birthday Song */}
        <SongMoment />

        {/* Moment 06: A Letter from Uthman */}
        <PersonalLetter onShareClick={() => setShareModalOpen(true)} />
      </main>

      {/* Footer Credits */}
      <FooterCredits />

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <TributeMain />
      </AudioProvider>
    </ThemeProvider>
  );
}
