/**
 * @module customCursor
 * @description Custom cursor functionality with smooth following animation
 */

/**
 * Initialize custom cursor
 * @param {Object} [options={}] - Configuration options
 * @param {string} [options.cursorSelector='.cursor'] - Main cursor selector
 * @param {string} [options.cursorBgSelector='.cursor_bg'] - Background cursor selector
 * @param {number} [options.bgDelay=100] - Background cursor delay in ms
 */
export function initializeCustomCursor(options = {}) {
  const {
    cursorSelector = '.cursor',
    cursorBgSelector = '.cursor_bg',
    bgDelay = 100
  } = options;
  
  const cursor = document.querySelector(cursorSelector);
  const cursorBg = document.querySelector(cursorBgSelector);
  
  if (!cursor) {
    console.warn('Cursor element not found');
    return;
  }
  
  // Setup mouse move listener
  setupMouseMoveListener(cursor, cursorBg, bgDelay);
  
  // Return cursor elements for external use
  return { cursor, cursorBg };
}

/**
 * Setup mouse move event listener
 * @private
 * @param {HTMLElement} cursor - Main cursor element
 * @param {HTMLElement|null} cursorBg - Background cursor element
 * @param {number} bgDelay - Background cursor delay
 */
function setupMouseMoveListener(cursor, cursorBg, bgDelay) {
  document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
      updateCursorPosition(cursor, e.clientX, e.clientY);
      
      if (cursorBg) {
        setTimeout(() => {
          updateCursorPosition(cursorBg, e.clientX, e.clientY);
        }, bgDelay);
      }
    });
  });
}

/**
 * Update cursor position
 * @private
 * @param {HTMLElement} element - Cursor element to update
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function updateCursorPosition(element, x, y) {
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
}

/**
 * Get cursor elements
 * @returns {{cursor: HTMLElement|null, cursorBg: HTMLElement|null}} Cursor elements
 */
export function getCursorElements() {
  return {
    cursor: document.querySelector('.cursor'),
    cursorBg: document.querySelector('.cursor_bg')
  };
}