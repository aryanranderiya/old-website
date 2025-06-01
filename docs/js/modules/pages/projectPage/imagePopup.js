/**
 * @module imagePopup
 * @description Image popup functionality for project documentation
 */

import { addClass, removeClass } from '../../cursorUtils.js';

/**
 * Setup image popup functionality
 * @param {HTMLElement} popupImage - Popup image element
 * @param {HTMLElement} popupContainer - Popup container element
 * @param {HTMLElement} closeText - Close text element
 */
export function setupImagePopup(popupImage, popupContainer, closeText) {
  if (!popupImage || !popupContainer) return;
  
  // Close popup on click
  popupContainer.addEventListener('click', () => {
    removeClass(popupContainer, 'show');
    popupImage.src = '';
  });
  
  // Show close text on hover
  if (closeText) {
    popupContainer.addEventListener('mouseover', () => {
      addClass(closeText, 'show');
    });
    
    popupContainer.addEventListener('mouseout', () => {
      removeClass(closeText, 'show');
    });
  }
}

/**
 * Add popup events to images
 * @param {HTMLElement} popupImage - Popup image element
 * @param {HTMLElement} popupContainer - Popup container element
 * @param {HTMLCollection} elements - Collection of elements that may contain images
 */
export function addImagesPopupEvents(popupImage, popupContainer, elements) {
  if (!popupImage || !popupContainer || !elements) return;
  
  for (const element of elements) {
    const images = element.querySelectorAll('img');
    
    images.forEach((img) => {
      img.style.cursor = 'pointer';
      
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        popupImage.src = img.src;
        addClass(popupContainer, 'show');
      });
    });
  }
}