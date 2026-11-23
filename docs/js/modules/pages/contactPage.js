/**
 * @module contactPage
 * @description Contact page functionality and interactions
 */

import { cursorTransformShadowBlend, addClass, removeClass } from '../cursorUtils.js?v=20261124b';

/**
 * Initialize contact page functionality
 */
export function initializeContactPage() {
  // Get DOM elements
  const elements = getContactElements();
  
  if (!elements.form) {
    console.warn('Contact form not found');
    return;
  }
  
  // Setup page show event
  setupPageShowEvent(elements.form);
  
  // Setup all interactions
  setupHoverListeners(elements);
  setupLargeNameHover();
  setupIntersectionObserver(elements);
}

/**
 * Get all required DOM elements
 * @private
 * @returns {Object} Object containing all DOM elements
 */
function getContactElements() {
  return {
    title: document.querySelector('.title'),
    titleDiv: document.querySelector('.title_div'),
    emailElements: document.querySelectorAll('.div_email > *'),
    divEmail: document.querySelector('.div_email'),
    description: document.querySelector('.description'),
    cursoricon4: document.querySelector('#cursoricon4'),
    cursoricon5: document.querySelector('#cursoricon5'),
    cursoricontyping: document.querySelector('#cursoricontyping'),
    inputs: document.querySelectorAll('.form_input'),
    buttonPrimary: document.querySelector('.button_primary'),
    form: document.getElementById('form'),
    cursor: document.querySelector('.cursor'),
  };
}

/**
 * Setup page show event to reset form
 * @private
 * @param {HTMLFormElement} form - Form element
 */
function setupPageShowEvent(form) {
  window.addEventListener('pageshow', (event) => {
    const page = event.target;
    if (page === window || page === document) {
      form.reset();
    }
  });
}

/**
 * Setup hover listeners for various elements
 * @private
 * @param {Object} elements - Object containing DOM elements
 */
function setupHoverListeners(elements) {
  const { titleDiv, buttonPrimary, inputs, cursor, cursoricon4, cursoricon5, cursoricontyping } = elements;
  
  // Title hover
  if (titleDiv) {
    titleDiv.addEventListener('mouseover', () => {
      cursorTransformShadowBlend('scale(8)', 'none');
      if (cursor) {
        cursor.style.outlineStyle = 'solid';
        cursor.style.outlineColor = 'white';
        cursor.style.outlineWidth = '0.1px';
        addClass(cursor, 'partially_transparent');
      }
      addClass(cursoricon4, 'active');
    });

    titleDiv.addEventListener('mouseout', () => {
      if (cursor) cursor.style.outline = 'none';
      cursorTransformShadowBlend('none');
      removeClass(cursor, 'partially_transparent');
      removeClass(cursoricon4, 'active');
    });
  }
  
  // Button hover
  if (buttonPrimary) {
    buttonPrimary.addEventListener('mouseover', () => {
      cursorTransformShadowBlend('scale(1.3)', 'none');
      addClass(cursor, 'transparent');
      addClass(cursoricon5, 'active');
    });

    buttonPrimary.addEventListener('mouseout', () => {
      cursorTransformShadowBlend();
      removeClass(cursor, 'transparent');
      removeClass(cursoricon5, 'active');
    });
  }
  
  // Input hover
  inputs.forEach((input) => {
    input.addEventListener('mouseover', () => {
      cursorTransformShadowBlend(undefined, 'none');
      addClass(cursor, 'transparent');
      addClass(cursoricontyping, 'active');
    });

    input.addEventListener('mouseout', () => {
      cursorTransformShadowBlend();
      removeClass(cursor, 'transparent');
      removeClass(cursoricontyping, 'active');
    });
  });
}

/**
 * Setup large name hover effect
 * @private
 */
function setupLargeNameHover() {
  const defaultScale = 1;
  const maxScale = 1.5;
  const neighborScale = 1.2;

  const wordContainers = document.querySelectorAll(
    '.footer_bottom_name .bottom_name_container .word'
  );

  wordContainers.forEach((wordContainer) => {
    const spans = wordContainer.querySelectorAll('span');

    wordContainer.addEventListener('mouseover', (e) => {
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

    wordContainer.addEventListener('mouseout', () => {
      spans.forEach((span) => {
        span.style.transform = `scaleY(${defaultScale})`;
      });
    });
  });
}

/**
 * Setup intersection observer for animations
 * @private
 * @param {Object} elements - Object containing DOM elements
 */
function setupIntersectionObserver(elements) {
  const { titleDiv, title, description, emailElements } = elements;
  
  if (!titleDiv) return;
  
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          addClass(title, 'show');
          addClass(description, 'show');
          emailElements.forEach((element) => addClass(element, 'show'));
        }, 850);
      }
    });
  };
  
  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });
  
  observer.observe(titleDiv);
}