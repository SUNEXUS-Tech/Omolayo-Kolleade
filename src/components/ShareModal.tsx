import React, { useState } from 'react';
import { SITE_METADATA } from '../data/tributeData';
import { X, Check, Copy, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyError, setCopyError] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `${SITE_METADATA.title}`;
  const shareText = SITE_METADATA.dedicationIntro;
  const fullSharePayload = `${SITE_METADATA.dedicationIntro}\n\n${currentUrl}`;

  const handleNativeShare = async () => {
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
        setTimeout(() => {
          setCopySuccess(false);
        }, 3000);
      } catch (err) {
        console.error('Failed to copy link:', err);
        setCopyError(true);
        setCopySuccess(false);
      }
    }
  };

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07100C]/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-title"
    >
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-[#10241A] border border-[#163021] rounded-lg shadow-2xl text-[#F5F7F3]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#C8D1CB] hover:text-[#F5F7F3] p-1 cursor-pointer transition-colors"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#E6B84A] mb-2 font-bold">
          <Share2 className="w-3.5 h-3.5" />
          <span>Celebrate & Share</span>
        </div>

        <h3 id="share-title" className="font-display text-2xl uppercase tracking-tight text-[#F5F0E6]">
          Share Big Mummy&apos;s Tribute
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#C8D1CB] leading-relaxed font-sans">
          Send this continuous scrolling tribute to family members and friends so they can experience the stories and listen to the song <span className="text-[#E6B84A] font-bold">OLUMINI</span>.
        </p>

        {/* Live Social Sharing Card Preview */}
        <div className="mt-4 p-3 bg-[#07100C] border border-[#163021] flex items-center gap-3">
          <img
            src="/olumini.webp"
            alt="OLUMINI Album Art"
            className="w-16 h-16 object-cover border border-[#E6B84A]/30 shrink-0"
          />
          <div className="min-w-0">
            <p className="font-headline font-bold text-xs text-[#F5F0E6] truncate">
              {SITE_METADATA.title}
            </p>
            <p className="text-[11px] text-[#C8D1CB] line-clamp-2 mt-0.5 font-sans leading-tight">
              {SITE_METADATA.dedicationIntro}
            </p>
            <p className="text-[10px] text-[#E6B84A] font-mono mt-1 truncate">
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
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-none bg-[#E6B84A] text-[#07100C] hover:bg-[#F5F0E6] text-xs uppercase tracking-wider font-headline font-extrabold transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share via Device Apps</span>
            </button>
          )}

          {/* Copy link box */}
          <div className="p-3.5 bg-[#07100C] border border-[#163021] space-y-2.5">
            <p className="text-xs text-[#E6B84A] font-headline font-bold leading-relaxed">
              &ldquo;{SITE_METADATA.dedicationIntro}&rdquo;
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-[#163021]">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="bg-transparent text-xs text-[#C8D1CB] font-mono flex-1 outline-none px-1 truncate"
                aria-label="Tribute URL to copy"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-3.5 py-1.5 rounded-none text-xs font-headline font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  copySuccess
                    ? 'bg-emerald-800 text-emerald-100'
                    : 'bg-[#163021] hover:bg-[#E6B84A] hover:text-[#07100C] text-[#F5F7F3]'
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
            <p className="text-xs text-[#E6B84A] text-center font-mono">
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
