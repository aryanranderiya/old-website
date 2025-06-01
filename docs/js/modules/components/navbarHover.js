/**
 * @module components/navbarHover
 * @description Navbar hover effects and interactions
 */

import { addClass, removeClass, cursorTransformShadowBlend } from '../cursorUtils.js';

/**
 * Add mouse listeners to navbar menu
 * @param {HTMLElement} navbar_menu - Navbar menu element
 */
export function addMouseListeners(navbar_menu) {
  const cursoricon1 = document.getElementById("cursoricon1");
  const cursoricon2 = document.getElementById("cursoricon2");
  const cursoricon5 = document.getElementById("cursoricon5");
  const navbar_menu_btn = document.querySelector(".navbar_menu_btn");
  const title = document.querySelector(".navbar-brand");
  const cursor_variable = document.querySelector('.cursor');

  navbar_menu.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(6)", "none");
    addClass(cursoricon1, "active");
    removeClass(cursoricon2, "active");
  });

  navbar_menu.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    removeClass(cursoricon1, "active");
  });

  if (title) {
    title.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor_variable, "transparent");
      addClass(cursoricon5, "active");
    });

    title.addEventListener("mouseout", () => {
      removeClass(cursor_variable, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });
  }

  if (navbar_menu_btn) {
    navbar_menu_btn.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor_variable, "transparent");
      addClass(cursoricon5, "active");
    });

    navbar_menu_btn.addEventListener("mouseout", () => {
      removeClass(cursor_variable, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });
  }
}

/**
 * Add hover image preview functionality
 * @param {NodeList} items - Menu items
 */
export function addHoverImage(items) {
  // Preload images
  const imageUrls = [
    "media/ss_Index.webp",
    "media/ss_SoftwareProjects.webp",
    "media/ss_DesignProjects.webp",
    "media/ss_Resume.webp",
    "media/ss_Contact.webp",
  ];

  imageUrls.forEach((imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
    img.alt = imageUrl;
  });

  const image = document.querySelector(".nav_menu_image_image");
  const nav_menu_image = document.getElementById("nav_menu_image");

  items.forEach((item) => {
    const key = item.querySelector(".menu_item").getAttribute("id");
    let src;

    switch (key) {
      case "home":
        src = "media/ss_Index.webp";
        break;
      case "software":
        src = "media/ss_SoftwareProjects.webp";
        break;
      case "design":
        src = "media/ss_DesignProjects.webp";
        break;
      case "resume":
        src = "media/ss_Resume.webp";
        break;
      case "contact":
        src = "media/ss_Contact.webp";
        break;
      default:
        break;
    }

    item.addEventListener("mouseover", (event) => {
      image.style.transform = "scale(0)";
      setTimeout(() => {
        image.style.transform = "scale(1)";
        image.src = src;
      }, 200);
      addClass(nav_menu_image, "active");
    });

    item.addEventListener("mouseout", () => {
      image.style.transform = "scale(0)";
      removeClass(nav_menu_image, "active");
    });
  });
}