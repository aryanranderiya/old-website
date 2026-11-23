/**
 * @module videoControls
 * @description Video playback controls and interactions
 */

import { cursorTransformShadowBlend, addClass, removeClass } from '../../cursorUtils.js';

/**
 * Initialize video controls
 * @param {Object} elements - Object containing all video-related elements
 */
export function initializeVideoControls(elements) {
  const { laptopVideo, mobileVideo, controlPlay, controlPause, iconsMainReplay } = elements;

  // The page can render a still image or no media at all; only wire playback
  // controls when a video actually has a source.
  const videos = [laptopVideo, mobileVideo].filter(
    (video) => video && video.isConnected
  );
  const hasSource = videos.some((video) => {
    const source = video.querySelector("source");
    const src = video.getAttribute("src") || source?.getAttribute("src");
    return Boolean(src);
  });

  if (!hasSource) {
    hideVideoControls(elements);
    return;
  }
  
  addClass(controlPlay, "show");
  setupPlaybackControls(elements);
  setupVideoEventListeners(elements);
  setupControlHoverEffects(elements);
  updateProgressBar(elements);
}

/**
 * Hide video controls when no video is present
 * @private
 * @param {Object} elements - Video elements
 */
function hideVideoControls(elements) {
  const { playbackControls, otherControls, controlsContainer } = elements;
  playbackControls?.remove();
  otherControls?.remove();
  controlsContainer?.remove();
}

/**
 * Setup playback control buttons
 * @private
 * @param {Object} elements - Video elements
 */
function setupPlaybackControls(elements) {
  const { controlPlay, controlPause, iconsMainReplay, playbackIconsMain } = elements;
  
  // Play button
  controlPlay?.addEventListener('click', (event) => {
    event.stopPropagation();
    playVideos(elements);
    removeClass(controlPlay, 'show');
    addClass(controlPause, 'show');
  });
  
  // Pause button
  controlPause?.addEventListener('click', (event) => {
    event.stopPropagation();
    pauseVideos(elements);
    removeClass(controlPause, 'show');
    addClass(controlPlay, 'show');
  });
  
  // Replay button
  iconsMainReplay?.addEventListener('click', (event) => {
    event.stopPropagation();
    replayVideos(elements);
    removeClass(iconsMainReplay, 'show');
    removeClass(controlPlay, 'show');
    addClass(controlPause, 'show');
  });
  
  // Main playback area click
  playbackIconsMain?.addEventListener('click', () => {
    togglePlayPause(elements);
  });
}

/**
 * Setup video event listeners
 * @private
 * @param {Object} elements - Video elements
 */
function setupVideoEventListeners(elements) {
  const { laptopVideo, mobileVideo } = elements;
  
  const videos = [laptopVideo, mobileVideo].filter(Boolean);
  
  videos.forEach(video => {
    video.addEventListener('ended', () => handleVideoEnded(elements));
    video.addEventListener('timeupdate', () => updateProgressBar(elements));
  });
}

/**
 * Setup hover effects for controls
 * @private
 * @param {Object} elements - Video elements
 */
function setupControlHoverEffects(elements) {
  const controls = [
    elements.controlPlay,
    elements.controlPause,
    elements.iconsMainReplay
  ].filter(Boolean);
  
  controls.forEach(control => {
    control.addEventListener('mouseover', () => {
      const cursor = document.querySelector('.cursor');
      const cursoricon5 = document.getElementById('cursoricon5');
      
      cursorTransformShadowBlend('scale(1.3)', 'none');
      addClass(cursor, 'transparent');
      addClass(cursoricon5, 'active');
    });
    
    control.addEventListener('mouseout', () => {
      const cursor = document.querySelector('.cursor');
      const cursoricon5 = document.getElementById('cursoricon5');
      
      removeClass(cursor, 'transparent');
      removeClass(cursoricon5, 'active');
      cursorTransformShadowBlend();
    });
  });
}

/**
 * The mockup can be a laptop or a phone; both share one set of controls.
 * @private
 */
function getActiveVideo(elements) {
  return [elements.laptopVideo, elements.mobileVideo].find(
    (video) => video && video.isConnected
  );
}

/**
 * Play all videos
 * @private
 * @param {Object} elements - Video elements
 */
function playVideos(elements) {
  const { laptopVideo, mobileVideo } = elements;
  laptopVideo?.play();
  mobileVideo?.play();
}

/**
 * Pause all videos
 * @private
 * @param {Object} elements - Video elements
 */
function pauseVideos(elements) {
  const { laptopVideo, mobileVideo } = elements;
  laptopVideo?.pause();
  mobileVideo?.pause();
}

/**
 * Replay all videos
 * @private
 * @param {Object} elements - Video elements
 */
function replayVideos(elements) {
  const { laptopVideo, mobileVideo } = elements;
  
  if (laptopVideo) {
    laptopVideo.currentTime = 0;
    laptopVideo.play();
  }
  
  if (mobileVideo) {
    mobileVideo.currentTime = 0;
    mobileVideo.play();
  }
}

/**
 * Toggle play/pause state
 * @private
 * @param {Object} elements - Video elements
 */
function togglePlayPause(elements) {
  const { controlPlay, controlPause } = elements;
  const video = getActiveVideo(elements);

  if (!video) return;

  if (video.paused) {
    playVideos(elements);
    removeClass(controlPlay, 'show');
    addClass(controlPause, 'show');
  } else {
    pauseVideos(elements);
    removeClass(controlPause, 'show');
    addClass(controlPlay, 'show');
  }
}

/**
 * Handle video ended event
 * @private
 * @param {Object} elements - Video elements
 */
function handleVideoEnded(elements) {
  const { controlPlay, controlPause, iconsMainReplay } = elements;
  
  removeClass(controlPlay, 'show');
  removeClass(controlPause, 'show');
  addClass(iconsMainReplay, 'show');
}

/**
 * Update progress bar
 * @private
 * @param {Object} elements - Video elements
 */
function updateProgressBar(elements) {
  const { progressBar } = elements;
  const video = getActiveVideo(elements);

  if (!video || !progressBar) return;

  const currentTime = video.currentTime;
  const duration = video.duration;
  
  if (duration > 0) {
    const percentage = (currentTime / duration) * 100;
    progressBar.style.width = percentage + '%';
  }
}