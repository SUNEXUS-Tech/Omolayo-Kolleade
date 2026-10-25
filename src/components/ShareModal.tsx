import React, { useState } from 'react';
import { SITE_METADATA } from '../data/tributeData';
import { X, Check, Copy, Share2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { trackShareClick, trackCopyLink } from '../utils/analytics';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const { isDark } = useTheme();

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `${SITE_METADATA.title}`;
  const shareText = SITE_METADATA.dedicationIntro;
  const fullSharePayload = `${SITE_METADATA.dedicationIntro}\n\n${currentUrl}`;

  const handleNativeShare = async () => {
    trackShareClick({ method: 'native', location: 'share_modal' });
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: currentUrl,
        });
        onClose();
      } catch (err) {
        // User cancelled or share failed
        console.debug('Share cancelled or unavailable:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(fullSharePayload);
        setCopySuccess(true);
        setCopyError(false);
        trackCopyLink({ location: 'share_modal', success: true });
        setTimeout(() => {
          setCopySuccess(false);
        }, 3000);
      } catch (err) {
        console.error('Failed to copy link:', err);
        setCopyError(true);
        setCopySuccess(false);
        trackCopyLink({ location: 'share_modal', success: false });
      }
    }
  };

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-title"
    >
      <div
        className={`relative w-full max-w-md p-6 sm:p-8 border rounded-lg shadow-2xl transition-colors ${
          isDark
            ? 'bg-[#10241A] border-[#163021] text-[#F5F7F3]'
            : 'bg-[#FAF6EE] border-[#D6CEBE] text-[#0A1C14]'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-4 p-1 cursor-pointer transition-colors ${
            isDark ? 'text-[#C8D1CB] hover:text-[#F5F7F3]' : 'text-[#48574D] hover:text-[#0A1C14]'
          }`}
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div
          className={`flex items-center gap-2 text-xs font-mono tracking-widest uppercase mb-2 font-bold ${
            isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Celebrate & Share</span>
        </div>

        <h3
          id="share-title"
          className={`font-display text-2xl uppercase tracking-tight ${
            isDark ? 'text-[#F5F0E6]' : 'text-[#0A1C14]'
          }`}
        >
          Share Big Mummy&apos;s Tribute
        </h3>
        <p
          className={`mt-2 text-xs sm:text-sm leading-relaxed font-sans ${
            isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
          }`}
        >
          Send this continuous scrolling tribute to family members and friends so they can experience the stories and listen to the song{' '}
          <span className={`font-bold ${isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'}`}>
            OLUMINI
          </span>.
        </p>

        {/* Live Social Sharing Card Preview */}
        <div
          className={`mt-4 p-3 border flex items-center gap-3 ${
            isDark ? 'bg-[#07100C] border-[#163021]' : 'bg-[#EFE8DA] border-[#D6CEBE]'
          }`}
        >
          <img
            src="/olumini.webp"
            alt="OLUMINI Album Art"
            className={`w-16 h-16 object-cover border shrink-0 ${
              isDark ? 'border-[#E6B84A]/30' : 'border-[#B58218]/40'
            }`}
          />
          <div className="min-w-0">
            <p
              className={`font-headline font-bold text-xs truncate ${
                isDark ? 'text-[#F5F0E6]' : 'text-[#0A1C14]'
              }`}
            >
              {SITE_METADATA.title}
            </p>
            <p
              className={`text-[11px] line-clamp-2 mt-0.5 font-sans leading-tight ${
                isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
              }`}
            >
              {SITE_METADATA.dedicationIntro}
            </p>
            <p
              className={`text-[10px] font-mono mt-1 truncate ${
                isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
              }`}
            >
              {currentUrl || 'https://ais-pre-qnwrdhl2mw7iyzk2nyiaag-389429241730.europe-west1.run.app/'}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {/* Native Share button if supported */}
          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-none text-xs uppercase tracking-wider font-headline font-extrabold transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#E6B84A] text-[#07100C] hover:bg-[#F5F0E6]'
                  : 'bg-[#B58218] text-[#FAF6EE] hover:bg-[#8C6514]'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>Share via Device Apps</span>
            </button>
          )}

          {/* Copy link box */}
          <div
            className={`p-3.5 border space-y-2.5 ${
              isDark ? 'bg-[#07100C] border-[#163021]' : 'bg-[#EFE8DA] border-[#D6CEBE]'
            }`}
          >
            <p
              className={`text-xs font-headline font-bold leading-relaxed ${
                isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
              }`}
            >
              &ldquo;{SITE_METADATA.dedicationIntro}&rdquo;
            </p>
            <div
              className={`flex items-center gap-2 pt-2 border-t ${
                isDark ? 'border-[#163021]' : 'border-[#D6CEBE]'
              }`}
            >
              <input
                type="text"
                readOnly
                value={currentUrl}
                className={`bg-transparent text-xs font-mono flex-1 outline-none px-1 truncate ${
                  isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
                }`}
                aria-label="Tribute URL to copy"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-3.5 py-1.5 rounded-none text-xs font-headline font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  copySuccess
                    ? 'bg-emerald-800 text-emerald-100'
                    : isDark
                    ? 'bg-[#163021] hover:bg-[#E6B84A] hover:text-[#07100C] text-[#F5F7F3]'
                    : 'bg-[#D6CEBE] hover:bg-[#B58218] hover:text-[#FAF6EE] text-[#0A1C14]'
                }`}
              >
                {copySuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link & Message</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {copySuccess && (
            <p
              className={`text-xs text-center font-mono ${
                isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
              }`}
            >
              Link successfully copied to clipboard.
            </p>
          )}
          {copyError && (
            <p className="text-xs text-[#D8A078] text-center font-mono">
              Could not copy automatically. Please copy the URL manually.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
