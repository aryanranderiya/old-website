/**
 * @module components/footerAnimation
 * @description Footer animation and interaction functionality
 */

import { addClass, removeClass } from '../cursorUtils.js';

/**
 * Animate footer content into view
 * @param {NodeList} pageLinks - Page link elements
 * @param {NodeList} allSocial - Social link elements
 * @param {NodeList} wordContainers - Word container elements
 * @param {HTMLElement} letstalk - Let's talk element
 * @param {HTMLElement} div_email - Email div element
 */
export function animateFooterContent(pageLinks, allSocial, wordContainers, letstalk, div_email) {
  pageLinks.forEach((link, index) =>
    setTimeout(() => addClass(link, "show"), 100 * index)
  );

  allSocial.forEach((social, index) =>
    setTimeout(() => addClass(social, "show"), 100 * index)
  );
  
  wordContainers.forEach((container) => addClass(container, "show"));
  addClass(letstalk, "show");
  addClass(div_email, "show");
}

/**
 * Animate footer content out of view
 * @param {NodeList} pageLinks - Page link elements
 * @param {NodeList} allSocial - Social link elements
 * @param {NodeList} wordContainers - Word container elements
 * @param {HTMLElement} letstalk - Let's talk element
 * @param {HTMLElement} div_email - Email div element
 */
export function animateOutFooterContent(pageLinks, allSocial, wordContainers, letstalk, div_email) {
  pageLinks.forEach((link) => removeClass(link, "show"));
  allSocial.forEach((social) => removeClass(social, "show"));
  wordContainers.forEach((container) => removeClass(container, "show"));
  removeClass(letstalk, "show");
  removeClass(div_email, "show");
}

/**
 * Initialize footer hover animation for text scaling
 * @param {NodeList} wordContainers - Word container elements
 */
export function initFooterTextAnimation(wordContainers) {
  const defaultScale = 1;
  const maxScale = 1.3;
  const neighborScale = 1.2;

  wordContainers.forEach((wordContainer) => {
    const spans = wordContainer.querySelectorAll("span");

    wordContainer.addEventListener("mouseover", (e) => {
      const target = e.target;
      const index = Array.from(spans).indexOf(target);

      spans.forEach((span, i) => {
        let scale = defaultScale;

        if (i === index) {
          scale = maxScale;
        } else if (i === index - 1 || i === index + 1) {
          scale = neighborScale;
        }

        span.style.transform = `scaleY(${scale})`;
      });
    });

    wordContainer.addEventListener("mouseout", () => {
      spans.forEach((span) => {
        span.style.transform = `scaleY(${defaultScale})`;
      });
    });
  });
}

/**
 * Initialize footer intersection observer
 * @param {HTMLElement} nonfooter - Non-footer element to observe
 * @param {Function} animateIn - Animation in callback
 * @param {Function} animateOut - Animation out callback
 * @returns {IntersectionObserver}
 */
export function createFooterObserver(nonfooter, animateIn, animateOut) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) animateIn();
      else animateOut();
    });
  }, {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  });

  if (nonfooter) {
    observer.observe(nonfooter);
  }

  return observer;
}