/**
 * @module components/headerCarousel
 * @description Header carousel functionality
 */

import { addClass, removeClass, cursorTransformShadowBlend } from '../cursorUtils.js';
import { DragScroll } from './dragScroll.js';

/**
 * Initialize normal headers with drag scroll functionality
 * @param {HTMLElement} slider - The slider element
 */
export function normalHeaders(slider) {
  const cursoricondrag = document.getElementById("cursoricondrag");
  const cursor = document.querySelector('.cursor');

  // Change cursor to drag when hover on headers
  slider.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("none", "none");
    addClass(cursor, "transparent");
    addClass(cursoricondrag, "active");
  });

  slider.addEventListener("mouseout", () => {
    cursorTransformShadowBlend(undefined, undefined);
    removeClass(cursor, "transparent");
    removeClass(cursoricondrag, "active");
  });

  // Initialize drag scroll
  const scroll = new DragScroll({
    el: ".slider",
    wrap: ".slider-wrapper",
    item: ".slider-item",
    bar: ".slider-progress-bar",
  });

  const animateScroll = () => {
    requestAnimationFrame(animateScroll);
    scroll.raf();
  };

  animateScroll();
}