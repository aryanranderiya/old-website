/**
 * @fileoverview Custom cursor initialization
 * @module cursor
 */

import { initializeCustomCursor } from './modules/components/customCursor.js?v=20261124b';

// Initialize custom cursor with default options
initializeCustomCursor({
  cursorSelector: '.cursor',
  cursorBgSelector: '.cursor_bg',
  bgDelay: 100
});