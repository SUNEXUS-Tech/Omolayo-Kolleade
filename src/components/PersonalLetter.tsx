import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { IMAGES, LETTER_DATA } from '../data/tributeData';
import { StoryImage } from './StoryImage';
import { Share2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { trackShareClick } from '../utils/analytics';

interface PersonalLetterProps {
  onShareClick: () => void;
}

export const PersonalLetter: React.FC<PersonalLetterProps> = ({ onShareClick }) => {
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

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
      className={`relative py-24 px-4 sm:px-6 lg:px-12 border-t transition-colors duration-300 overflow-hidden ${
        isDark
          ? 'bg-[#10241A] text-[#F5F7F3] border-[#163021]'
          : 'bg-[#F4EFE6] text-[#0A1C14] border-[#D6CEBE]'
      }`}
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
            blend="dark-bottom"
          />
        </motion.div>

        {/* 2. Strong visual headline associated with that photograph */}
        <div className="w-full text-center mt-6 sm:mt-10">
          <motion.div variants={slideUpVariant}>
            <h2
              className={`font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[0.95] text-balance transition-colors ${
                isDark ? 'text-[#F5F7F3]' : 'text-[#0A1C14]'
              }`}
            >
              TO BIG MUMMY, WITH ENDLESS LOVE
            </h2>
            <p
              className={`font-headline font-extrabold text-lg sm:text-xl md:text-2xl mt-3 tracking-tight transition-colors ${
                isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
              }`}
            >
              A Birthday Epistle from Uthman Adesola
            </p>
          </motion.div>

          {/* 3. The Letter Text Container */}
          <motion.div
            variants={slideUpVariant}
            className="mt-10 max-w-4xl mx-auto text-left"
          >
            <article
              className={`p-8 sm:p-14 border shadow-2xl space-y-8 transition-colors ${
                isDark
                  ? 'bg-[#07100C]/90 border-[#163021] text-[#F5F7F3]'
                  : 'bg-[#FAF6EE] border-[#D6CEBE] text-[#0A1C14]'
              }`}
            >
              <h3
                className={`font-headline font-extrabold text-2xl sm:text-4xl ${
                  isDark ? 'text-[#F5F0E6]' : 'text-[#0A1C14]'
                }`}
              >
                {LETTER_DATA.salutation}
              </h3>

              <div
                className={`space-y-6 font-sans text-lg sm:text-xl md:text-2xl leading-relaxed font-normal text-justify ${
                  isDark ? 'text-[#F5F7F3]' : 'text-[#16291E]'
                }`}
              >
                {LETTER_DATA.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-justify">{paragraph}</p>
                ))}
              </div>

              {/* Sign-off */}
              <div
                className={`pt-8 border-t space-y-3 ${
                  isDark ? 'border-[#163021]' : 'border-[#D6CEBE]'
                }`}
              >
                <p
                  className={`font-headline font-bold text-lg sm:text-xl ${
                    isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
                  }`}
                >
                  {LETTER_DATA.signOff}
                </p>
                <div>
                  <h4
                    className={`font-display text-2xl sm:text-3xl uppercase tracking-wide ${
                      isDark ? 'text-[#F5F7F3]' : 'text-[#0A1C14]'
                    }`}
                  >
                    {LETTER_DATA.author}
                  </h4>
                  <p
                    className={`font-headline font-semibold text-sm tracking-wider uppercase mt-1 ${
                      isDark ? 'text-[#C8D1CB]/80' : 'text-[#48574D]'
                    }`}
                  >
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
            <div
              className={`p-8 sm:p-10 border flex flex-col sm:flex-row items-center justify-between gap-6 text-left transition-colors ${
                isDark
                  ? 'bg-gradient-to-r from-[#07100C] to-[#163021] border-[#E6B84A]/40'
                  : 'bg-[#EFE8DA] border-[#B58218]/40 shadow-md'
              }`}
            >
              <div>
                <h4
                  className={`font-headline font-extrabold text-xl sm:text-2xl md:text-3xl ${
                    isDark ? 'text-[#F5F0E6]' : 'text-[#0A1C14]'
                  }`}
                >
                  {LETTER_DATA.birthdayWish}
                </h4>
                <p
                  className={`font-sans text-sm sm:text-base mt-2 font-light ${
                    isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
                  }`}
                >
                  Share this tribute with family and friends around the world.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  trackShareClick({ method: 'modal_open', location: 'letter_section' });
                  onShareClick();
                }}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 font-headline font-extrabold text-xs sm:text-sm uppercase tracking-widest transition-colors cursor-pointer shrink-0 shadow-lg ${
                  isDark
                    ? 'bg-[#E6B84A] text-[#07100C] hover:bg-[#F5F0E6]'
                    : 'bg-[#B58218] text-[#FAF6EE] hover:bg-[#8C6514]'
                }`}
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
