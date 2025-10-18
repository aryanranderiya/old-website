/**
 * @module ui/intersectionObservers
 * @description Intersection observer configurations and handlers
 */

import { addClass, removeClass } from '../cursorUtils.js';

/**
 * Create observer for title animations
 * @returns {IntersectionObserver}
 */
export function createTitleObserver() {
  return new IntersectionObserver(handleIntersectionTitle, {
    threshold: 0.5,
  });
}

/**
 * Create observer for heading titles
 * @returns {IntersectionObserver}
 */
export function createTitleObserver2() {
  return new IntersectionObserver(handleIntersectionTitles2, {
    threshold: 0.9,
  });
}

/**
 * Create normal observer for general animations
 * @returns {IntersectionObserver}
 */
export function createNormalObserver() {
  return new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.8,
  });
}

/**
 * Handle intersection for heading titles
 */
function handleIntersectionTitles2(entries) {
  entries.forEach((entry) => {
    let text = entry.target.querySelector(".heading_title_text");
    let icon = entry.target.querySelector(".title_icon");

    if (entry.isIntersecting) {
      addClass(text, "show");
      addClass(icon, "show");
    } else {
      removeClass(text, "show");
      removeClass(icon, "show");
    }
  });
}

let hasntIntersectedYet = true;

/**
 * Handle intersection for main title
 */
function handleIntersectionTitle(entries) {
  entries.forEach((entry) => {
    const title = entry.target.querySelector(".title-heading");

    if (entry.isIntersecting) {
      if (hasntIntersectedYet) {
        setTimeout(() => addClass(title, "show"), 700);
        hasntIntersectedYet = false;
      } else {
        addClass(title, "show");
        hasntIntersectedYet = false;
      }
    } else {
      removeClass(title, "show");
    }
  });
}

/**
 * Handle general intersection animations
 */
function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
    } else {
      entry.target.style.opacity = "0";
    }
  });
}