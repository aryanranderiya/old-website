/**
 * @fileoverview Admin panel entry point
 * @module admin_panel
 */

import { initializeFirebase } from './modules/utils/firebase.js';
import { initializeAdminPanel } from './modules/pages/adminPanel.js';

// Uncomment to redirect to 404
// window.location.replace("https://aryanranderiya.com/404");

// Initialize Firebase and admin panel
const { database, storage } = initializeFirebase();

document.addEventListener('DOMContentLoaded', () => {
  initializeAdminPanel(database, storage);
});