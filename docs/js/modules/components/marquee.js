/**
 * @module components/marquee
 * @description Marquee animation functionality
 */

import { cursorTransformShadowBlend } from '../cursorUtils.js?v=20261124b';

/**
 * Initialize marquee animation with GSAP
 */
export function initMarqueeAnimation() {
  if (typeof gsap !== 'undefined') {
    gsap.to(".marquee__part", {
      xPercent: -100,
      repeat: -1,
      duration: 3,
      ease: "linear",
      rotation: 0.01,
    });
  }
}

/**
 * Add marquee hover effects
 * @param {HTMLElement} marquee - Marquee element
 */
export function addMarqueeHoverEffects(marquee) {
  if (!marquee) return;

  marquee.addEventListener("mouseover", () =>
    cursorTransformShadowBlend("scale(7)", "none", "difference")
  );

  marquee.addEventListener("mouseout", () =>
    cursorTransformShadowBlend()
  );
}