/**
 * @fileoverview 404 error page entry point
 * @module 404
 */

import { initialize404Page } from './modules/pages/error404.js';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initialize404Page();
});