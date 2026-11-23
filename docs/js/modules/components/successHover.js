/**
 * @module components/successHover
 * @description Success page hover effects
 */

import { addClass, removeClass } from '../cursorUtils.js?v=20261124b';

/**
 * Initialize button hover effects
 * @param {HTMLElement} button_blue - Blue button element
 * @param {HTMLElement} cursor - Cursor element
 * @param {HTMLElement} cursor_icon5 - Cursor icon 5 element
 */
export function initButtonHover(button_blue, cursor, cursor_icon5) {
  if (!button_blue) return;

  button_blue.addEventListener("mouseover", () => {
    cursor_icon5.style.opacity = "1";
    cursor_icon5.style.transform = "scale(1.3)";
    addClass(cursor_icon5, "transparent");
    addClass(cursor, "transparent");
  });

  button_blue.addEventListener("mouseout", () => {
    cursor_icon5.style.opacity = "0";
    removeClass(cursor_icon5, "active");
    removeClass(cursor, "transparent");
  });
}

/**
 * Initialize website name hover effects
 * @param {HTMLElement} websitename - Website name element
 * @param {HTMLElement} cursor - Cursor element
 * @param {HTMLElement} cursor_icon5 - Cursor icon 5 element
 */
export function initWebsiteNameHover(websitename, cursor, cursor_icon5) {
  if (!websitename) return;

  websitename.addEventListener("mouseover", () => {
    cursor_icon5.style.opacity = "1";
    cursor_icon5.style.transform = "scale(0.8)";
    addClass(cursor_icon5, "transparent");
    addClass(cursor, "transparent");
  });

  websitename.addEventListener("mouseout", () => {
    cursor_icon5.style.opacity = "0";
    removeClass(cursor_icon5, "active");
    removeClass(cursor, "transparent");
  });
}

/**
 * Initialize cursor glow movement
 * @param {HTMLElement} cursor_glow - Cursor glow element
 */
export function initCursorGlow(cursor_glow) {
  if (!cursor_glow) return;

  document.addEventListener("mousemove", (e) => {
    cursor_glow.style.left = e.clientX + "px";
    cursor_glow.style.top = e.clientY + "px";
  });
}