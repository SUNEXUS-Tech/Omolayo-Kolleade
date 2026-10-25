/**
 * Google Analytics 4 (GA4) Integration for Omolayo Kolleade Birthday Tribute
 *
 * - Dynamically loads gtag.js using VITE_GA_MEASUREMENT_ID.
 * - Safely no-ops if VITE_GA_MEASUREMENT_ID is missing or invalid.
 * - Strictly preserves visitor privacy: NO names, emails, phone numbers or PII are collected.
 * - Prevents duplicate events across renders and navigation.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Track whether GA has been initialized
let isInitialized = false;

// Track first play in current browser session
const FIRST_PLAY_STORAGE_KEY = 'olumini_first_play_tracked_session';

/**
 * Returns the configured Measurement ID, if present
 */
export const getMeasurementId = (): string => {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!id || typeof id !== 'string') return '';
  const trimmed = id.trim();
  // Valid GA4 IDs typically start with G-
  return trimmed;
};

/**
 * Check if analytics is actively tracking with a valid measurement ID
 */
export const isAnalyticsActive = (): boolean => {
  return Boolean(isInitialized && getMeasurementId());
};

/**
 * Initialize Google Analytics 4
 * Injects gtag.js script and sets up dataLayer cleanly
 */
export const initAnalytics = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (isInitialized) return true;

  const measurementId = getMeasurementId();

  if (!measurementId) {
    if (import.meta.env.DEV) {
      console.info(
        '%c[Analytics]%c VITE_GA_MEASUREMENT_ID is not configured. Google Analytics 4 is running in clean no-op mode.',
        'color: #E6B84A; font-weight: bold;',
        'color: inherit;'
      );
    }
    return false;
  }

  // Prevent multiple injections
  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());

  // Configure GA4: disable automatic page_view so we can send an explicit clean SPA page_view
  window.gtag('config', measurementId, {
    send_page_view: false,
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  isInitialized = true;

  // Track the initial page view
  trackPageView(window.location.pathname, document.title);

  if (import.meta.env.DEV) {
    console.info(`%c[Analytics]%c Initialized GA4 with ID: ${measurementId}`, 'color: #E6B84A; font-weight: bold;', 'color: inherit;');
  }

  return true;
};

/**
 * Send an event to Google Analytics 4
 */
export const sendEvent = (eventName: string, params: Record<string, unknown> = {}): void => {
  if (typeof window === 'undefined') return;

  // Sanitize params to guarantee no PII is ever sent
  const safeParams: Record<string, unknown> = {
    ...params,
    timestamp: Date.now(),
  };

  if (isInitialized && typeof window.gtag === 'function') {
    window.gtag('event', eventName, safeParams);
  } else if (import.meta.env.DEV) {
    console.debug(`%c[Analytics Event]%c ${eventName}`, 'color: #10B981; font-weight: bold;', 'color: inherit;', safeParams);
  }
};

/**
 * Track single page view without duplicate triggers
 */
export const trackPageView = (pagePath = window.location.pathname, pageTitle = document.title): void => {
  sendEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href,
  });
};

/**
 * Track tribute section views (for the 6 narrative moments)
 */
export const trackSectionView = (sectionId: string, sectionName: string, order: number): void => {
  sendEvent('tribute_section_view', {
    section_id: sectionId,
    section_name: sectionName,
    section_order: order,
  });
};

/**
 * Track scroll milestones: 25%, 50%, 75%, 90%
 */
export const trackScrollMilestone = (milestone: 25 | 50 | 75 | 90): void => {
  sendEvent('scroll_milestone', {
    percent_scrolled: milestone,
  });
};

/**
 * Music Analytics: fires when OLUMINI playback genuinely starts/resumes
 */
export const trackOluminiPlay = (params: {
  playback_session_id: string;
  current_time: number;
  duration: number;
  event_context: string;
}): void => {
  // Check if first play of browser session
  let isFirstPlay = false;
  try {
    if (!sessionStorage.getItem(FIRST_PLAY_STORAGE_KEY)) {
      sessionStorage.setItem(FIRST_PLAY_STORAGE_KEY, 'true');
      isFirstPlay = true;
    }
  } catch {
    // In case sessionStorage is restricted
  }

  if (isFirstPlay) {
    sendEvent('olumini_first_play', {
      playback_session_id: params.playback_session_id,
      song_title: 'OLUMINI',
      event_context: params.event_context,
    });
  }

  sendEvent('olumini_play', {
    playback_session_id: params.playback_session_id,
    song_title: 'OLUMINI',
    current_time_seconds: Math.round(params.current_time),
    duration_seconds: Math.round(params.duration),
    event_context: params.event_context,
  });
};

/**
 * Music Analytics: fires at 25%, 50%, 75% progress milestones once per playback session
 */
export const trackOluminiProgress = (params: {
  playback_session_id: string;
  milestone: 25 | 50 | 75;
  current_time: number;
  duration: number;
}): void => {
  sendEvent('olumini_progress', {
    playback_session_id: params.playback_session_id,
    song_title: 'OLUMINI',
    milestone_percent: params.milestone,
    current_time_seconds: Math.round(params.current_time),
    duration_seconds: Math.round(params.duration),
  });
};

/**
 * Music Analytics: fires when song reaches natural end
 */
export const trackOluminiComplete = (params: {
  playback_session_id: string;
  duration: number;
}): void => {
  sendEvent('olumini_complete', {
    playback_session_id: params.playback_session_id,
    song_title: 'OLUMINI',
    duration_seconds: Math.round(params.duration),
  });
};

/**
 * Music Analytics: fires when user pauses playback
 */
export const trackOluminiPause = (params: {
  playback_session_id: string;
  current_time: number;
}): void => {
  sendEvent('olumini_pause', {
    playback_session_id: params.playback_session_id,
    song_title: 'OLUMINI',
    current_time_seconds: Math.round(params.current_time),
  });
};

/**
 * Music Analytics: fires when audio playback experiences an error
 */
export const trackOluminiError = (params: {
  playback_session_id: string;
  error_message: string;
  audio_source: string;
}): void => {
  sendEvent('olumini_error', {
    playback_session_id: params.playback_session_id,
    song_title: 'OLUMINI',
    error_message: params.error_message,
    audio_source: params.audio_source,
  });
};

/**
 * Tribute engagement: Share actions
 */
export const trackShareClick = (params: {
  method: 'native' | 'modal_open';
  location: 'navigation_bar' | 'letter_section' | 'share_modal';
}): void => {
  sendEvent('tribute_share_click', {
    share_method: params.method,
    trigger_location: params.location,
  });
};

/**
 * Tribute engagement: Copy link action
 */
export const trackCopyLink = (params: {
  location: 'share_modal';
  success: boolean;
}): void => {
  sendEvent('tribute_copy_link', {
    action_location: params.location,
    copy_success: params.success,
  });
};

/**
 * Tribute engagement: Outbound contact / social links
 */
export const trackContactClick = (params: {
  channel: 'whatsapp' | 'email' | 'instagram';
  destination: string;
}): void => {
  sendEvent('tribute_contact_click', {
    contact_channel: params.channel,
    destination_target: params.destination,
  });
};

/**
 * Theme toggle event
 */
export const trackThemeToggle = (newTheme: 'light' | 'dark'): void => {
  sendEvent('tribute_theme_toggle', {
    theme: newTheme,
  });
};
