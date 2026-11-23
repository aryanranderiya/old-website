/**
 * @module components/imagePopup
 * @description Image popup functionality for thumbnails and advertisements
 */

import { addClass, removeClass, cursorTransformShadowBlend } from '../cursorUtils.js?v=20261124b';

/**
 * Change cursor to magnify on image hover
 * @param {HTMLElement} image - Image element
 * @param {HTMLElement} cursoriconmagnify - Cursor magnify icon
 */
export function changeCursortoMagnify(image, cursoriconmagnify) {
  const cursor = document.querySelector('.cursor');
  
  image.addEventListener("mouseover", () => {
    addClass(cursoriconmagnify, "active");
    addClass(cursor, "transparent");
    cursorTransformShadowBlend("scale(1.5)", "none", "normal");
  });

  image.addEventListener("mouseout", () => {
    removeClass(cursoriconmagnify, "active");
    removeClass(cursor, "transparent");
    cursorTransformShadowBlend(undefined, "none", "normal");
  });
}

/**
 * Close popup
 * @param {HTMLElement} popup_image_container - Popup container element
 * @param {HTMLElement} popup_image - Popup image element
 */
export function closePopup(popup_image_container, popup_image) {
  removeClass(popup_image_container, "show");
  removeClass(popup_image, "show");
}

/**
 * Initialize thumbnails with popup functionality
 * @param {HTMLElement} popup_image - Popup image element
 * @param {HTMLElement} popup_image_container - Popup container element
 */
export function thumbnails(popup_image, popup_image_container) {
  const content4 = document.querySelector(".content4");
  const thumbnailImages = document.querySelectorAll(".thumbnail_image");
  const cursoriconmagnify = document.querySelector("#cursoriconmagnify");
  const thumbnail_container = document.querySelector(".thumbnail_container");
  const div_hoveronme1 = document.querySelector("#div_hoveronme_container_one");

  function thumbnailIntersection(entries) {
    entries.forEach(
      (entry) => (entry.target.style.opacity = entry.isIntersecting ? "1" : "0")
    );
  }

  const observerTB = new IntersectionObserver(thumbnailIntersection, {
    threshold: 0.3,
  });
  const observerTB2 = new IntersectionObserver(thumbnailIntersection, {
    threshold: 0.7,
  });

  if (content4) {
    observerTB.observe(content4);
  }

  thumbnailImages.forEach((image) => {
    observerTB2.observe(image);
    
    image.addEventListener("mouseover", () => addClass(image, "hover"));
    image.addEventListener("mouseout", () => removeClass(image, "hover"));
    
    image.addEventListener("click", () => {
      popup_image.src = image.getAttribute("src");
      setTimeout(() => {
        addClass(popup_image_container, "show");
        addClass(popup_image, "show");
      }, 100);
    });

    changeCursortoMagnify(image, cursoriconmagnify);
  });

  if (thumbnail_container && div_hoveronme1) {
    thumbnail_container.addEventListener("mouseover", () => {
      div_hoveronme1.style.opacity = "0";
    });
    thumbnail_container.addEventListener("mouseout", () => {
      div_hoveronme1.style.opacity = "1";
    });
  }
}

/**
 * Initialize advertisements with popup functionality
 * @param {HTMLElement} popup_image - Popup image element
 * @param {HTMLElement} popup_image_container - Popup container element
 */
export function advertisements(popup_image, popup_image_container) {
  const advert_images = document.querySelectorAll(".advert_image");
  const cursoriconmagnify = document.querySelector("#cursoriconmagnify");

  advert_images.forEach((image) => {
    image.addEventListener("click", () => {
      popup_image.src = image.getAttribute("src");
      setTimeout(() => {
        addClass(popup_image_container, "show");
        addClass(popup_image, "show");
      }, 100);
    });

    changeCursortoMagnify(image, cursoriconmagnify);
  });
}