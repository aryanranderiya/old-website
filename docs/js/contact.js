/**
 * @fileoverview Contact page entry point
 * @module contact
 */

import { initializeContactPage } from './modules/pages/contactPage.js?v=20261124b';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initializeContactPage();
});