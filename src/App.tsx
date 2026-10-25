/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('opening');
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);

  // Monitor scroll position to update active chapter indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(item.id);
          break;
        }
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
    <div className="min-h-screen bg-[#07100C] text-[#F5F7F3] selection:bg-[#E6B84A]/30 selection:text-[#F5F0E6] flex flex-col justify-between overflow-x-hidden">
      {/* Top Subtle Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Sticky Top Bar Navigation */}
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
