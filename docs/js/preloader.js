/**
 * @module preloader
 * @description Preloader functionality for page loading
 */

import { generateLoadingText, hidePreloader } from './modules/components/loadingText.js';

// Scroll to top before page unload
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

// Generate loading text on page load
generateLoadingText();

// Hide preloader when page is fully loaded
window.onload = () => {
  hidePreloader();
};