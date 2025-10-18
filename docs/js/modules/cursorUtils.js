/**
 * @module cursorUtils
 * @description Utility functions for cursor manipulation and effects
 */

/**
 * Transform cursor with specified parameters
 * @param {string} [transform='none'] - CSS transform value
 * @param {string} [boxShadow='0px 0px 30px white'] - CSS box-shadow value
 * @param {string} [mixBlendMode='normal'] - CSS mix-blend-mode value
 */
export function cursorTransformShadowBlend(
  transform = 'none',
  boxShadow = '0px 0px 30px white',
  mixBlendMode = 'normal'
) {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;
  
  cursor.style.transform = transform;
  cursor.style.boxShadow = boxShadow;
  cursor.style.mixBlendMode = mixBlendMode;
}

/**
 * Reset cursor to normal state with emoji span
 * @param {HTMLElement} cursoriconX - The cursor icon element to reset
 */
export function normalCursorEmojiSpan(cursoriconX) {
  const cursor = document.querySelector('.cursor');
  const cursoriconwave = document.getElementById('cursoriconwave');
  
  if (!cursor || !cursoriconwave || !cursoriconX) return;
  
  cursor.style.boxShadow = '0px 0px 30px white';
  cursoriconwave.style.opacity = '1';
  cursoriconwave.style.transform = 'scale(1)';
  removeClass(cursoriconX, 'active');
  removeClass(cursor, 'transparent');
}

/**
 * Add CSS class to element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to add
 */
export function addClass(element, className) {
  if (!element) return;
  element.classList.add(className);
}

/**
 * Remove CSS class from element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to remove
 */
export function removeClass(element, className) {
  if (!element) return;
  element.classList.remove(className);
}

/**
 * Make element invisible by scaling and opacity
 * @param {HTMLElement} element - Element to make invisible
 */
export function makeInvisible(element) {
  if (!element) return;
  element.style.transform = 'scale(0)';
  element.style.opacity = '0';
}