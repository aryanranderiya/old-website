/**
 * @module eventListeners
 * @description Event listener setup functions
 */

import { cursorTransformShadowBlend, addClass, removeClass, makeInvisible, normalCursorEmojiSpan } from './cursorUtils.js?v=20261124b';

/**
 * Add event listeners to various elements
 * @param {HTMLElement} scrollBtn - Scroll button element
 */
export function addListeners(scrollBtn) {
  const buttons_blue = document.querySelectorAll('.button_blue');
  const cursoricon3 = document.getElementById('cursoricon3');
  const section_about = document.querySelector('#section_about');
  const title_heading_1 = document.querySelector('.title_heading_1');
  const cursor = document.querySelector('.cursor');
  const cursoricon2 = document.getElementById('cursoricon2');

  // Scroll on button click
  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      cursorTransformShadowBlend();
      removeClass(cursoricon2, 'active');

      if (section_about) {
        section_about.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });

    scrollBtn.addEventListener('mouseover', (event) => {
      event.stopPropagation();
      cursorTransformShadowBlend();
      removeClass(cursoricon2, 'active');
    });

    scrollBtn.addEventListener('mouseout', (event) => {
      event.stopPropagation();
    });
  }

  // Titles & Cover
  if (title_heading_1) {
    title_heading_1.addEventListener('mouseover', () => {
      cursorTransformShadowBlend('scale(9)', 'none');
      addClass(cursor, 'partially_transparent');
      addClass(cursoricon2, 'active');
    });

    title_heading_1.addEventListener('mouseout', () => {
      cursorTransformShadowBlend(undefined, 'none');
      removeClass(cursor, 'partially_transparent');
      removeClass(cursoricon2, 'active');
    });
  }

  // Project Buttons
  buttons_blue.forEach((button_blue) => {
    button_blue.addEventListener('mouseover', () => {
      cursorTransformShadowBlend('scale(3)', 'none', 'difference');
      removeClass(cursoricon2, 'active');
      addClass(cursoricon3, 'active');
    });

    button_blue.addEventListener('mouseout', () => {
      cursorTransformShadowBlend();
      removeClass(cursoricon3, 'active');
    });
  });
}

/**
 * Setup cool button hover effects
 */
export function setupCoolButtons() {
  document.querySelectorAll('.cool_button').forEach((button) => {
    const inner = button.querySelector('.inner');
    const innertext = button.querySelector('.innertext');
    const arrow_container = button.querySelector('.arrow_container');

    if (!inner || !innertext || !arrow_container) return;

    button.addEventListener('mouseover', () => {
      inner.style.width = '100%';
      arrow_container.style.backgroundColor = '#00bbff';
      button.style.borderColor = '#c9c9c9';
      innertext.style.color = 'black';
    });

    button.addEventListener('mouseout', () => {
      inner.style.width = '0';
      arrow_container.style.backgroundColor = 'white';
      button.style.borderColor = '#69d7ff';
      innertext.style.color = 'white';
    });
  });
}

/**
 * Setup confetti animation for contact section
 */
export function confettiContact() {
  const section = document.querySelector('#section_contact');
  const button = section?.querySelector('button');

  if (!section || !button) return;

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const end = Date.now() + 2 * 1000;

        (function frame() {
          confetti({
            particleCount: 5,
            spread: 100,
            angle: 60,
            origin: { y: 0.6, x: 0 },
          });

          confetti({
            particleCount: 2,
            spread: 100,
            angle: 120,
            origin: { y: 0.6, x: 1 },
          });

          if (Date.now() < end) requestAnimationFrame(frame);
        })();

        button.dispatchEvent(new MouseEvent('mouseover'));

        setTimeout(() => {
          button.style.scale = '1.3';
          button.style.rotate = '-5deg';

          setTimeout(() => {
            button.style.scale = '1';
            button.style.rotate = '';
            button.dispatchEvent(new MouseEvent('mouseout'));
          }, 400);
        }, 100);
      });
    },
    {
      root: null,
      threshold: 0.7,
    }
  );

  observer.observe(section);
}