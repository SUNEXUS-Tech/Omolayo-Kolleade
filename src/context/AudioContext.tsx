import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import {
  trackOluminiPlay,
  trackOluminiProgress,
  trackOluminiComplete,
  trackOluminiPause,
  trackOluminiError,
} from '../utils/analytics';

interface AudioContextType {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isBuffering: boolean;
  isAudioAvailable: boolean | null;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  skipSeconds: (seconds: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  audioSrc: string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Generate non-identifying random playback session ID
const generatePlaybackSessionId = (): string => {
  return 'ps_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState<boolean | null>(null);
  const [audioSrc, setAudioSrc] = useState<string>('/audio/olumini.mp3');

  // Analytics tracking refs for real audio element events
  const playbackSessionIdRef = useRef<string>(generatePlaybackSessionId());
  const milestonesFiredRef = useRef<Set<number>>(new Set());
  const lastPlayContextRef = useRef<string>('page_load_autoplay');

  // Trigger autoplay on page load and handle browser autoplay restrictions gracefully
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    let hasStarted = false;

    const startPlayback = (context: string) => {
      if (hasStarted || !audio) return;
      lastPlayContextRef.current = context;
      audio
        .play()
        .then(() => {
          hasStarted = true;
          setIsPlaying(true);
          setIsAudioAvailable(true);
          cleanupGestureListeners();
        })
        .catch((err) => {
          // If rejected due to browser autoplay policy, wait for user's first gesture
          console.debug('Direct autoplay prevented by browser policy; waiting for first interaction:', err);
        });
    };

    // 1. Attempt immediate autoplay on load
    startPlayback('page_load_autoplay');

    // 2. High-sensitivity gesture listeners to start song immediately on first touch/scroll/key
    const handleFirstGesture = () => {
      startPlayback('first_gesture_autoplay');
    };

    const gestureEvents = ['pointerdown', 'touchstart', 'scroll', 'keydown', 'wheel', 'click'];
    const cleanupGestureListeners = () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstGesture);
      });
    };

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleFirstGesture, { passive: true, once: true });
    });

    return () => {
      cleanupGestureListeners();
    };
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    lastPlayContextRef.current = 'user_control';
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsAudioAvailable(true);
      })
      .catch((err) => {
        console.warn('Playback error:', err);
        if (audioSrc === '/audio/olumini.mp3') {
          setAudioSrc('/assets/aistudio/OLUMINI_f6b974fa.mp3');
        } else {
          setIsPlaying(false);
          setIsAudioAvailable(false);
        }
      });
  }, [audioSrc]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const seek = useCallback((targetTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = targetTime;
    setCurrentTime(targetTime);
  }, []);

  const skipSeconds = useCallback(
    (seconds: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const newTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration || 0);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [duration]
  );

  const setVolume = useCallback((val: number) => {
    const audio = audioRef.current;
    setVolumeState(val);
    if (audio) {
      audio.volume = val;
      if (val === 0) {
        setIsMuted(true);
        audio.muted = true;
      } else if (audio.muted) {
        setIsMuted(false);
        audio.muted = false;
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  }, [isMuted]);

  // Real native HTML Audio Element Event Handlers for accurate Analytics
  const handleNativePlaying = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const target = e.currentTarget;
    setIsBuffering(false);
    setIsPlaying(true);
    setIsAudioAvailable(true);

    // If starting from near the beginning, renew playback session id
    if (target.currentTime < 1) {
      playbackSessionIdRef.current = generatePlaybackSessionId();
      milestonesFiredRef.current.clear();
    }

    trackOluminiPlay({
      playback_session_id: playbackSessionIdRef.current,
      current_time: target.currentTime,
      duration: target.duration || duration,
      event_context: lastPlayContextRef.current,
    });
  };

  const handleNativeTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const target = e.currentTarget;
    const current = target.currentTime;
    setCurrentTime(current);

    const dur = target.duration || duration;
    if (dur > 0) {
      const percent = (current / dur) * 100;
      const milestones: Array<25 | 50 | 75> = [25, 50, 75];

      milestones.forEach((m) => {
        if (percent >= m && !milestonesFiredRef.current.has(m)) {
          milestonesFiredRef.current.add(m);
          trackOluminiProgress({
            playback_session_id: playbackSessionIdRef.current,
            milestone: m,
            current_time: current,
            duration: dur,
          });
        }
      });
    }
  };

  const handleNativeEnded = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const target = e.currentTarget;
    setIsPlaying(false);
    setCurrentTime(0);

    trackOluminiComplete({
      playback_session_id: playbackSessionIdRef.current,
      duration: target.duration || duration,
    });

    // Reset session and milestones for next listen
    playbackSessionIdRef.current = generatePlaybackSessionId();
    milestonesFiredRef.current.clear();
  };

  const handleNativePause = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const target = e.currentTarget;
    setIsPlaying(false);

    // Only fire pause if not naturally ended
    if (!target.ended) {
      trackOluminiPause({
        playback_session_id: playbackSessionIdRef.current,
        current_time: target.currentTime,
      });
    }
  };

  const handleNativeError = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const target = e.currentTarget;
    const errMsg = target.error ? `code_${target.error.code}` : 'unknown_error';

    trackOluminiError({
      playback_session_id: playbackSessionIdRef.current,
      error_message: errMsg,
      audio_source: audioSrc,
    });

    if (audioSrc === '/audio/olumini.mp3') {
      setAudioSrc('/assets/aistudio/OLUMINI_f6b974fa.mp3');
    } else {
      setIsAudioAvailable(false);
      setIsPlaying(false);
      setIsBuffering(false);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isBuffering,
        isAudioAvailable,
        togglePlay,
        play,
        pause,
        seek,
        skipSeconds,
        setVolume,
        toggleMute,
        audioSrc,
      }}
    >
      {/* Global Audio Element mounted once, backed by native events */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        onLoadedMetadata={(e) => {
          const target = e.currentTarget;
          setDuration(target.duration);
          setIsAudioAvailable(true);
        }}
        onTimeUpdate={handleNativeTimeUpdate}
        onEnded={handleNativeEnded}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={handleNativePlaying}
        onPause={handleNativePause}
        onError={handleNativeError}
      />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
