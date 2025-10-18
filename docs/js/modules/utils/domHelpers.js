/**
 * @module utils/domHelpers
 * @description Common DOM manipulation helper functions
 */

/**
 * Add a class to an element
 * @param {HTMLElement} element - The element to add class to
 * @param {string} className - The class name to add
 */
export function addClass(element, className) {
  element.classList.add(className);
}

/**
 * Remove a class from an element
 * @param {HTMLElement} element - The element to remove class from
 * @param {string} className - The class name to remove
 */
export function removeClass(element, className) {
  element.classList.remove(className);
}

/**
 * Set cursor transform, shadow, and blend mode
 * @param {string} [paramTransform="none"] - Transform value
 * @param {string} [paramBoxShadow="0px 0px 30px white"] - Box shadow value
 * @param {string} [paramMixBlendMode="normal"] - Mix blend mode value
 */
export function cursorTransformShadowBlend(
  paramTransform = "none",
  paramBoxShadow = "0px 0px 30px white",
  paramMixBlendMode = "normal"
) {
  cursor.style.transform = paramTransform;
  cursor.style.boxShadow = paramBoxShadow;
  cursor.style.mixBlendMode = paramMixBlendMode;
}