import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';

interface OluminiPlayerProps {
  className?: string;
  onTrackPlay?: () => void;
}

export const OluminiPlayer: React.FC<OluminiPlayerProps> = ({
  className = '',
  onTrackPlay,
}) => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isBuffering,
    isAudioAvailable,
    togglePlay,
    seek,
    skipSeconds,
    setVolume,
    toggleMute,
  } = useAudio();

  const { isDark } = useTheme();

  const [showLyrics, setShowLyrics] = useState<boolean>(false);
  const [lyricsContent, setLyricsContent] = useState<string>('');
  const [lyricsLoading, setLyricsLoading] = useState<boolean>(true);
  const [albumArtSrc, setAlbumArtSrc] = useState<string>('/olumini.webp');

  // Load lyrics from real public Olumini.txt file
  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        setLyricsLoading(true);
        let res = await fetch('/Olumini.txt');
        if (!res.ok) {
          res = await fetch('/assets/aistudio/OLUMINI_1fa8eacc.txt');
        }
        if (res.ok) {
          const text = await res.text();
          setLyricsContent(text);
        } else {
          setLyricsContent('Lyrics file currently loading...');
        }
      } catch (err) {
        console.warn('Could not fetch lyrics file:', err);
        setLyricsContent('Lyrics could not be loaded at this time.');
      } finally {
        setLyricsLoading(false);
      }
    };

    fetchLyrics();
  }, []);

  const formatTime = (secs: number): string => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    seek(targetTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      togglePlay();
      if (!isPlaying && onTrackPlay) onTrackPlay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      skipSeconds(5);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      skipSeconds(-5);
    } else if (e.key === 'm') {
      e.preventDefault();
      toggleMute();
    }
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto rounded-none border shadow-2xl transition-all duration-300 ${
        isDark
          ? 'bg-[#10241A] border-[#163021] text-[#F5F7F3]'
          : 'bg-[#EFE8DA] border-[#D6CEBE] text-[#0A1C14]'
      } ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="OLUMINI song listening experience"
    >
      {/* Main Player Core */}
      <div className="p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Album Artwork (Left Column) */}
          <div className="md:col-span-4 flex justify-center">
            <div
              className={`relative w-48 sm:w-56 md:w-full aspect-square overflow-hidden border shadow-xl ${
                isDark ? 'bg-[#07100C] border-[#163021]' : 'bg-[#FAF6EE] border-[#D6CEBE]'
              }`}
            >
              <img
                src={albumArtSrc}
                alt="OLUMINI album artwork by SUNEXUS"
                onError={() => {
                  if (albumArtSrc === '/olumini.webp') {
                    setAlbumArtSrc('/assets/aistudio/Olumini_daf45d9e.webp');
                  }
                }}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
              {isPlaying && (
                <div
                  className={`absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 backdrop-blur-sm border text-[10px] font-mono uppercase tracking-wider ${
                    isDark
                      ? 'bg-[#07100C]/80 border-[#E6B84A]/40 text-[#E6B84A]'
                      : 'bg-[#FAF6EE]/90 border-[#B58218]/50 text-[#B58218]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full animate-ping ${
                      isDark ? 'bg-[#E6B84A]' : 'bg-[#B58218]'
                    }`}
                  />
                  <span>Now Playing</span>
                </div>
              )}
            </div>
          </div>

          {/* Controls & Track Metadata (Right Column) */}
          <div className="md:col-span-8 flex flex-col justify-center space-y-6">
            {/* Header Titles */}
            <div>
              <span
                className={`font-mono text-xs uppercase tracking-widest font-semibold block mb-1 ${
                  isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
                }`}
              >
                Official Birthday Anthem
              </span>
              <h3
                className={`font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-none ${
                  isDark ? 'text-[#F5F7F3]' : 'text-[#0A1C14]'
                }`}
              >
                OLUMINI
              </h3>
              <p
                className={`font-headline font-bold text-sm sm:text-base mt-1.5 ${
                  isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
                }`}
              >
                Music by SUNEXUS · Created with love by Uthman Adesola
              </p>
            </div>

            {/* Missing file alert if any error */}
            {isAudioAvailable === false && (
              <div
                className={`p-3 border text-xs flex items-center gap-2 ${
                  isDark
                    ? 'bg-[#07100C] border-[#D8A078]/40 text-[#C8D1CB]'
                    : 'bg-[#F3ECE0] border-[#A0643C]/40 text-[#48574D]'
                }`}
                role="status"
              >
                <AlertCircle className="w-4 h-4 text-[#D8A078] shrink-0" />
                <span>Audio asset pending at <code className="text-[#E6B84A]">public/audio/olumini.mp3</code></span>
              </div>
            )}

            {/* Seekable Progress Bar */}
            <div className="space-y-1.5">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                disabled={isAudioAvailable === false}
                aria-label="Seek audio track"
                aria-valuemin={0}
                aria-valuemax={Math.floor(duration || 0)}
                aria-valuenow={Math.floor(currentTime)}
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                className={`w-full h-2 rounded-none appearance-none cursor-pointer disabled:opacity-40 focus:outline-none ${
                  isDark
                    ? 'bg-[#163021] accent-[#E6B84A] focus-visible:ring-[#E6B84A]'
                    : 'bg-[#D6CEBE] accent-[#B58218] focus-visible:ring-[#B58218]'
                }`}
              />
              <div
                className={`flex justify-between items-center text-xs font-mono tabular-nums ${
                  isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
                }`}
              >
                <span>{formatTime(currentTime)}</span>
                <div className="flex items-center gap-2">
                  {isBuffering && (
                    <span
                      className={`text-[10px] font-sans uppercase ${
                        isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
                      }`}
                    >
                      Buffering...
                    </span>
                  )}
                  <span>{duration > 0 ? formatTime(duration) : isAudioAvailable === false ? '--:--' : '3:27'}</span>
                </div>
              </div>
            </div>

            {/* Buttons & Sound Control */}
            <div
              className={`flex flex-wrap items-center justify-between gap-4 pt-2 border-t ${
                isDark ? 'border-[#163021]' : 'border-[#D6CEBE]'
              }`}
            >
              {/* Playback action controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => skipSeconds(-10)}
                  disabled={isAudioAvailable === false}
                  className={`w-10 h-10 flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 ${
                    isDark
                      ? 'text-[#C8D1CB] hover:text-[#F5F7F3] hover:bg-[#163021]'
                      : 'text-[#48574D] hover:text-[#0A1C14] hover:bg-[#E5DDCE]'
                  }`}
                  aria-label="Rewind 10 seconds"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    togglePlay();
                    if (!isPlaying && onTrackPlay) onTrackPlay();
                  }}
                  disabled={isAudioAvailable === false}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer ${
                    isDark
                      ? isPlaying
                        ? 'bg-[#E6B84A] text-[#07100C] hover:bg-[#F5F0E6] focus-visible:ring-[#E6B84A]'
                        : 'bg-[#F5F0E6] text-[#07100C] hover:bg-[#E6B84A] focus-visible:ring-[#E6B84A]'
                      : isPlaying
                      ? 'bg-[#B58218] text-[#FAF6EE] hover:bg-[#8C6514] focus-visible:ring-[#B58218]'
                      : 'bg-[#0A1C14] text-[#FAF6EE] hover:bg-[#B58218] focus-visible:ring-[#B58218]'
                  }`}
                  aria-label={isPlaying ? 'Pause OLUMINI' : 'Play OLUMINI'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current stroke-none" />
                  ) : (
                    <Play className="w-6 h-6 fill-current stroke-none ml-1" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => skipSeconds(10)}
                  disabled={isAudioAvailable === false}
                  className={`w-10 h-10 flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 ${
                    isDark
                      ? 'text-[#C8D1CB] hover:text-[#F5F7F3] hover:bg-[#163021]'
                      : 'text-[#48574D] hover:text-[#0A1C14] hover:bg-[#E5DDCE]'
                  }`}
                  aria-label="Forward 10 seconds"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Volume & Lyrics Drawer Trigger */}
              <div className="flex items-center gap-4">
                {/* Volume slider */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className={`p-1.5 transition-colors cursor-pointer ${
                      isDark
                        ? 'text-[#C8D1CB] hover:text-[#F5F7F3]'
                        : 'text-[#48574D] hover:text-[#0A1C14]'
                    }`}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-[#D8A078]" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume slider"
                    className={`w-16 h-1.5 rounded-none appearance-none cursor-pointer ${
                      isDark
                        ? 'bg-[#163021] accent-[#E6B84A]'
                        : 'bg-[#D6CEBE] accent-[#B58218]'
                    }`}
                  />
                </div>

                {/* Lyrics toggle button */}
                <button
                  type="button"
                  onClick={() => setShowLyrics(!showLyrics)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-headline font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                    showLyrics
                      ? isDark
                        ? 'bg-[#E6B84A] text-[#07100C] border-[#E6B84A]'
                        : 'bg-[#B58218] text-[#FAF6EE] border-[#B58218]'
                      : isDark
                      ? 'bg-[#07100C] text-[#C8D1CB] border-[#163021] hover:text-[#F5F7F3] hover:border-[#E6B84A]/50'
                      : 'bg-[#FAF6EE] text-[#48574D] border-[#D6CEBE] hover:text-[#0A1C14] hover:border-[#B58218]/50'
                  }`}
                  aria-expanded={showLyrics}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Lyrics</span>
                  {showLyrics ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Lyrics Panel */}
      {showLyrics && (
        <div
          className={`border-t p-6 sm:p-10 transition-all duration-300 ${
            isDark
              ? 'border-[#163021] bg-[#07100C]/95 text-[#F5F7F3]'
              : 'border-[#D6CEBE] bg-[#FAF6EE]/98 text-[#0A1C14]'
          }`}
          role="region"
          aria-label="Full lyrics for OLUMINI"
        >
          <div className="max-w-2xl mx-auto">
            <div
              className={`flex items-center justify-between border-b pb-3 mb-6 ${
                isDark ? 'border-[#163021]' : 'border-[#D6CEBE]'
              }`}
            >
              <span
                className={`font-mono text-xs uppercase tracking-widest font-semibold ${
                  isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
                }`}
              >
                Song Lyrics · Olumini.txt
              </span>
              <span
                className={`text-xs font-sans ${
                  isDark ? 'text-[#C8D1CB]/70' : 'text-[#48574D]/80'
                }`}
              >
                Dedicated to Big Mummy
              </span>
            </div>

            {lyricsLoading ? (
              <p
                className={`text-base font-mono ${
                  isDark ? 'text-[#C8D1CB]' : 'text-[#48574D]'
                }`}
              >
                Loading lyrics...
              </p>
            ) : (
              <div
                className={`max-h-96 overflow-y-auto pr-3 space-y-5 font-sans text-base sm:text-lg lg:text-xl leading-relaxed select-text ${
                  isDark ? 'text-[#F5F7F3]' : 'text-[#0A1C14]'
                }`}
              >
                {lyricsContent.split('\n\n').map((verse, idx) => (
                  <div key={idx} className="space-y-1.5">
                    {verse.split('\n').map((line, lineIdx) => {
                      const isHeader = line.startsWith('[') && line.endsWith(']');
                      if (isHeader) {
                        return (
                          <div
                            key={lineIdx}
                            className={`font-headline font-extrabold text-sm sm:text-base uppercase tracking-wider pt-4 pb-1 ${
                              isDark ? 'text-[#E6B84A]' : 'text-[#B58218]'
                            }`}
                          >
                            {line}
                          </div>
                        );
                      }
                      return (
                        <p
                          key={lineIdx}
                          className={`transition-colors ${
                            isDark
                              ? 'text-[#C8D1CB] hover:text-[#F5F7F3]'
                              : 'text-[#48574D] hover:text-[#0A1C14]'
                          }`}
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
