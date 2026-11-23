/**
 * @fileoverview 404 error page entry point
 * @module 404
 */

import { initialize404Page } from './modules/pages/error404.js?v=20261124b';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initialize404Page();
});