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
  
  if (!laptopVideo && !mobileVideo) {
    hideVideoControls(elements);
    return;
  }
  
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
  controlsContainer?.classList.add('hidden');
}

/**
 * Setup playback control buttons
 * @private
 * @param {Object} elements - Video elements
 */
function setupPlaybackControls(elements) {
  const { controlPlay, controlPause, iconsMainReplay, playbackIconsMain } = elements;
  
  // Play button
  controlPlay?.addEventListener('click', () => {
    playVideos(elements);
    removeClass(controlPlay, 'show');
    addClass(controlPause, 'show');
  });
  
  // Pause button
  controlPause?.addEventListener('click', () => {
    pauseVideos(elements);
    removeClass(controlPause, 'show');
    addClass(controlPlay, 'show');
  });
  
  // Replay button
  iconsMainReplay?.addEventListener('click', () => {
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
  const { laptopVideo, controlPlay, controlPause } = elements;
  
  if (laptopVideo?.paused) {
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
  const { laptopVideo, progressBar } = elements;
  
  if (!laptopVideo || !progressBar) return;
  
  const currentTime = laptopVideo.currentTime;
  const duration = laptopVideo.duration;
  
  if (duration > 0) {
    const percentage = (currentTime / duration) * 100;
    progressBar.style.width = percentage + '%';
  }
}