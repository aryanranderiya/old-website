/**
 * @module error404
 * @description Functionality for the 404 error page
 */

import { cursorTransformShadowBlend, addClass, removeClass } from '../cursorUtils.js';

/**
 * Initialize 404 page interactions
 */
export function initialize404Page() {
  const cursoriconwarning = document.getElementById('cursoriconwarning');
  const cursoricon5 = document.getElementById('cursoricon5');
  const content = document.querySelector('.content');
  const hyperlink = document.querySelector('.hyperlink');
  const button = document.getElementById('btn1');
  const cursor = document.querySelector('.cursor');

  if (!cursoriconwarning || !cursoricon5 || !content || !cursor) {
    console.warn('404 page elements not found');
    return;
  }

  setupContentInteractions(content, cursoriconwarning, cursor);
  setupButtonInteractions(button, cursoriconwarning, cursoricon5);
  setupHyperlinkInteractions(hyperlink, cursoriconwarning, cursoricon5);
}

/**
 * Setup content area interactions
 * @private
 * @param {HTMLElement} content - Content element
 * @param {HTMLElement} cursoriconwarning - Warning icon element
 * @param {HTMLElement} cursor - Cursor element
 */
function setupContentInteractions(content, cursoriconwarning, cursor) {
  if (!content) return;

  content.addEventListener('mouseover', () => {
    cursorTransformShadowBlend('none', 'none');
    addClass(cursoriconwarning, 'active');
    addClass(cursor, 'transparent');
  });

  content.addEventListener('mouseout', () => {
    cursorTransformShadowBlend();
    removeClass(cursoriconwarning, 'active');
    removeClass(cursor, 'transparent');
  });
}

/**
 * Setup button interactions
 * @private
 * @param {HTMLElement} button - Button element
 * @param {HTMLElement} cursoriconwarning - Warning icon element
 * @param {HTMLElement} cursoricon5 - Icon 5 element
 */
function setupButtonInteractions(button, cursoriconwarning, cursoricon5) {
  if (!button) return;

  button.addEventListener('mouseover', () => {
    cursoriconwarning.style.opacity = '0';
    cursoricon5.style.opacity = '1';
    addClass(cursoricon5, 'active');
  });

  button.addEventListener('mouseout', () => {
    cursoriconwarning.style.opacity = '1';
    cursoricon5.style.transform = 'scale(1.3)';
    cursoricon5.style.opacity = '0';
    removeClass(cursoricon5, 'active');
  });
}

/**
 * Setup hyperlink interactions
 * @private
 * @param {HTMLElement} hyperlink - Hyperlink element
 * @param {HTMLElement} cursoriconwarning - Warning icon element
 * @param {HTMLElement} cursoricon5 - Icon 5 element
 */
function setupHyperlinkInteractions(hyperlink, cursoriconwarning, cursoricon5) {
  if (!hyperlink) return;

  hyperlink.addEventListener('mouseover', () => {
    cursoriconwarning.style.opacity = '0';
    cursoricon5.style.opacity = '1';
    addClass(cursoricon5, 'active');
  });

  hyperlink.addEventListener('mouseout', () => {
    cursoriconwarning.style.opacity = '1';
    cursoricon5.style.transform = 'scale(1.3)';
    cursoricon5.style.opacity = '0';
    removeClass(cursoricon5, 'active');
  });
}