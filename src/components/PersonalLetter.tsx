import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { IMAGES, LETTER_DATA } from '../data/tributeData';
import { StoryImage } from './StoryImage';
import { Share2 } from 'lucide-react';

interface PersonalLetterProps {
  onShareClick: () => void;
}

export const PersonalLetter: React.FC<PersonalLetterProps> = ({ onShareClick }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const slideUpVariant: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const photoVariant: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.9,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.section
      id="letter"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      className="relative py-24 px-4 sm:px-6 lg:px-12 bg-[#10241A] text-[#F5F7F3] border-t border-[#163021] overflow-hidden"
      aria-label="Personal Letter from Uthman"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* 1. The photograph, integrated into the page background immediately */}
        <motion.div
          variants={photoVariant}
          className="w-full max-w-2xl flex justify-center"
        >
          <StoryImage
            config={IMAGES.letter}
            objectFit="contain"
            maxHeight="max-h-[66vh] sm:max-h-[72vh]"
            theme="dark"
            blend="dark-bottom"
          />
        </motion.div>

        {/* 2. Strong visual headline associated with that photograph */}
        <div className="w-full text-center mt-6 sm:mt-10">
          <motion.div variants={slideUpVariant}>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#F5F7F3] leading-[0.95] text-balance">
              TO BIG MUMMY, WITH ENDLESS LOVE
            </h2>
            <p className="font-headline font-extrabold text-lg sm:text-xl md:text-2xl text-[#E6B84A] mt-3 tracking-tight">
              A Birthday Epistle from Uthman Adesola
            </p>
          </motion.div>

          {/* 3. The Letter Text Container (Enlarged body font size) */}
          <motion.div
            variants={slideUpVariant}
            className="mt-10 max-w-4xl mx-auto text-left"
          >
            <article className="p-8 sm:p-14 bg-[#07100C]/90 border border-[#163021] shadow-2xl space-y-8">
              <h3 className="font-headline font-extrabold text-2xl sm:text-4xl text-[#F5F0E6]">
                {LETTER_DATA.salutation}
              </h3>

              <div className="space-y-6 font-sans text-lg sm:text-xl md:text-2xl leading-relaxed text-[#F5F7F3] font-normal">
                {LETTER_DATA.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Sign-off */}
              <div className="pt-8 border-t border-[#163021] space-y-3">
                <p className="font-headline font-bold text-lg sm:text-xl text-[#E6B84A]">
                  {LETTER_DATA.signOff}
                </p>
                <div>
                  <h4 className="font-display text-2xl sm:text-3xl text-[#F5F7F3] uppercase tracking-wide">
                    {LETTER_DATA.author}
                  </h4>
                  <p className="font-headline font-semibold text-sm tracking-wider uppercase text-[#C8D1CB]/80 mt-1">
                    {LETTER_DATA.authorTitle}
                  </p>
                </div>
              </div>
            </article>
          </motion.div>

          {/* 4. Final Birthday Message & Restrained Share Action */}
          <motion.div
            variants={slideUpVariant}
            className="mt-12 max-w-4xl mx-auto w-full"
          >
            <div className="p-8 sm:p-10 bg-gradient-to-r from-[#07100C] to-[#163021] border border-[#E6B84A]/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
              <div>
                <h4 className="font-headline font-extrabold text-xl sm:text-2xl md:text-3xl text-[#F5F0E6]">
                  {LETTER_DATA.birthdayWish}
                </h4>
                <p className="font-sans text-sm sm:text-base text-[#C8D1CB] mt-2 font-light">
                  Share this tribute with family and friends around the world.
                </p>
              </div>

              <button
                type="button"
                onClick={onShareClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 bg-[#E6B84A] text-[#07100C] hover:bg-[#F5F0E6] font-headline font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-colors cursor-pointer shrink-0 shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                <span>Share This Tribute</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
