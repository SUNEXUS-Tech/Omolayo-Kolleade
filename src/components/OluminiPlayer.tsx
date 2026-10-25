import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  Music,
} from 'lucide-react';

interface OluminiPlayerProps {
  className?: string;
  onTrackPlay?: () => void;
}

export const OluminiPlayer: React.FC<OluminiPlayerProps> = ({
  className = '',
  onTrackPlay,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState<boolean | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.9);
  const [showLyrics, setShowLyrics] = useState<boolean>(false);
  const [lyricsContent, setLyricsContent] = useState<string>('');
  const [lyricsLoading, setLyricsLoading] = useState<boolean>(true);

  // Audio source with fallback
  const [audioSrc, setAudioSrc] = useState<string>('/audio/olumini.mp3');
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

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsAudioAvailable(true);
          if (onTrackPlay) onTrackPlay();
        })
        .catch((err) => {
          console.warn('Playback error:', err);
          // Try fallback audio path if primary failed
          if (audioSrc === '/audio/olumini.mp3') {
            setAudioSrc('/assets/aistudio/OLUMINI_f6b974fa.mp3');
          } else {
            setIsPlaying(false);
            setIsAudioAvailable(false);
          }
        });
    }
  }, [isPlaying, audioSrc, onTrackPlay]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const skipSeconds = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.min(Math.max(audioRef.current.currentTime + seconds, 0), duration || 0);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const handleAudioError = () => {
    if (audioSrc === '/audio/olumini.mp3') {
      setAudioSrc('/assets/aistudio/OLUMINI_f6b974fa.mp3');
    } else {
      setIsAudioAvailable(false);
      setIsPlaying(false);
      setIsBuffering(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      togglePlay();
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
      className={`w-full max-w-4xl mx-auto rounded-none bg-[#10241A] border border-[#163021] text-[#F5F7F3] shadow-2xl transition-all duration-300 ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="OLUMINI song listening experience"
    >
      {/* Hidden real HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const target = e.currentTarget;
          setDuration(target.duration);
          setIsAudioAvailable(true);
        }}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPlaying(true);
          setIsAudioAvailable(true);
        }}
        onPause={() => setIsPlaying(false)}
        onError={handleAudioError}
      />

      {/* Main Player Core */}
      <div className="p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Album Artwork (Left Column) */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-48 sm:w-56 md:w-full aspect-square overflow-hidden bg-[#07100C] border border-[#163021] shadow-xl">
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
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-[#07100C]/80 backdrop-blur-sm border border-[#E6B84A]/40 text-[#E6B84A] text-[10px] font-mono uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6B84A] animate-ping" />
                  <span>Now Playing</span>
                </div>
              )}
            </div>
          </div>

          {/* Controls & Track Metadata (Right Column) */}
          <div className="md:col-span-8 flex flex-col justify-center space-y-6">
            {/* Header Titles */}
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#E6B84A] font-semibold block mb-1">
                Official Birthday Anthem
              </span>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#F5F7F3] leading-none">
                OLUMINI
              </h3>
              <p className="font-headline font-bold text-sm sm:text-base text-[#C8D1CB] mt-1.5">
                Music by SUNEXUS · Created with love by Uthman Adesola
              </p>
            </div>

            {/* Missing file alert */}
            {isAudioAvailable === false && (
              <div
                className="p-3 bg-[#07100C] border border-[#D8A078]/40 text-xs text-[#C8D1CB] flex items-center gap-2"
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
                className="w-full h-2 bg-[#163021] rounded-none appearance-none cursor-pointer accent-[#E6B84A] disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6B84A]"
              />
              <div className="flex justify-between items-center text-xs font-mono tabular-nums text-[#C8D1CB]">
                <span>{formatTime(currentTime)}</span>
                <div className="flex items-center gap-2">
                  {isBuffering && (
                    <span className="text-[10px] text-[#E6B84A] font-sans uppercase">
                      Buffering...
                    </span>
                  )}
                  <span>{duration > 0 ? formatTime(duration) : isAudioAvailable === false ? '--:--' : '3:27'}</span>
                </div>
              </div>
            </div>

            {/* Buttons & Sound Control */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#163021]">
              {/* Playback action controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => skipSeconds(-10)}
                  disabled={isAudioAvailable === false}
                  className="w-10 h-10 flex items-center justify-center text-[#C8D1CB] hover:text-[#F5F7F3] hover:bg-[#163021] transition-all cursor-pointer disabled:opacity-40"
                  aria-label="Rewind 10 seconds"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  disabled={isAudioAvailable === false}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E6B84A] ${
                    isPlaying
                      ? 'bg-[#E6B84A] text-[#07100C] hover:bg-[#F5F0E6]'
                      : 'bg-[#F5F0E6] text-[#07100C] hover:bg-[#E6B84A]'
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
                  className="w-10 h-10 flex items-center justify-center text-[#C8D1CB] hover:text-[#F5F7F3] hover:bg-[#163021] transition-all cursor-pointer disabled:opacity-40"
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
                    className="text-[#C8D1CB] hover:text-[#F5F7F3] p-1.5 transition-colors cursor-pointer"
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
                    className="w-16 h-1.5 bg-[#163021] rounded-none appearance-none cursor-pointer accent-[#E6B84A]"
                  />
                </div>

                {/* Lyrics toggle button */}
                <button
                  type="button"
                  onClick={() => setShowLyrics(!showLyrics)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-headline font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                    showLyrics
                      ? 'bg-[#E6B84A] text-[#07100C] border-[#E6B84A]'
                      : 'bg-[#07100C] text-[#C8D1CB] border-[#163021] hover:text-[#F5F7F3] hover:border-[#E6B84A]/50'
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

      {/* Real Lyrics Panel (Reading directly from Olumini.txt) */}
      {showLyrics && (
        <div
          className="border-t border-[#163021] bg-[#07100C]/95 p-6 sm:p-10 transition-all duration-300"
          role="region"
          aria-label="Full lyrics for OLUMINI"
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between border-b border-[#163021] pb-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E6B84A] font-semibold">
                Song Lyrics · Olumini.txt
              </span>
              <span className="text-xs text-[#C8D1CB]/70 font-sans">
                Dedicated to Big Mummy
              </span>
            </div>

            {lyricsLoading ? (
              <p className="text-base text-[#C8D1CB] font-mono">Loading lyrics...</p>
            ) : (
              <div className="max-h-96 overflow-y-auto pr-3 space-y-5 font-sans text-base sm:text-lg lg:text-xl leading-relaxed text-[#F5F7F3] select-text">
                {lyricsContent.split('\n\n').map((verse, idx) => (
                  <div key={idx} className="space-y-1.5">
                    {verse.split('\n').map((line, lineIdx) => {
                      const isHeader = line.startsWith('[') && line.endsWith(']');
                      if (isHeader) {
                        return (
                          <div
                            key={lineIdx}
                            className="font-headline font-extrabold text-sm sm:text-base uppercase tracking-wider text-[#E6B84A] pt-4 pb-1"
                          >
                            {line}
                          </div>
                        );
                      }
                      return (
                        <p key={lineIdx} className="text-[#C8D1CB] hover:text-[#F5F7F3] transition-colors">
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
