/**
 * @module success
 * @description Success page functionality
 */

import { initButtonHover, initWebsiteNameHover, initCursorGlow } from './modules/components/successHover.js?v=20261124b';

// Get DOM elements
const cursor_glow = document.querySelector(".cursor_glow_div");
const button_blue = document.querySelector(".button_blue");
const cursor_icon5 = document.querySelector("#cursoricon5");
const websitename = document.querySelector(".websitename");
const cursor = document.querySelector('.cursor');

// Initialize cursor glow movement
initCursorGlow(cursor_glow);

// Initialize hover effects
initButtonHover(button_blue, cursor, cursor_icon5);
initWebsiteNameHover(websitename, cursor, cursor_icon5);