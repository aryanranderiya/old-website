/**
 * @module components/navbarMenu
 * @description Navbar menu handling functionality
 */

import { addClass, removeClass } from '../cursorUtils.js?v=20261124b';

/**
 * Handle menu opening and closing
 * @param {NodeList} items - Menu items
 * @param {HTMLElement} navbar_menu - Navbar menu element
 * @param {HTMLElement} navbar - Navbar element
 */
export function handleMenuOpening(items, navbar_menu, navbar) {
  const body = document.querySelector("body");
  const checkbox = document.getElementById("hamburgerCheckbox");

  // Handle Escape key to close menu
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      removeClass(navbar_menu, "show");
      body.style.overflow = "auto";
      checkbox.checked = false;
      items.forEach((item) => removeClass(item, "show"));
    }
  });

  // Handle checkbox click
  checkbox.addEventListener("click", function () {
    if (this.checked) {
      // Show the Menu when checked
      setTimeout(() => {
        removeClass(navbar, "hide");
      }, 20);
      addClass(navbar, "show");
      addClass(navbar_menu, "show");
      body.style.overflow = "hidden";
      items.forEach((item, index) =>
        setTimeout(() => addClass(item, "show"), 150 * index)
      );
    } else {
      setTimeout(() => removeClass(navbar_menu, "show"), 300);
      setTimeout(() => (body.style.overflow = "auto"), 1100);
      items.forEach((item, index) =>
        setTimeout(() => removeClass(item, "show"), index * 50)
      );
    }
  });
}

/**
 * Handle navbar hide/show on scroll
 * @param {HTMLElement} navbar - Navbar element
 */
export function initScrollBehavior(navbar) {
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      addClass(navbar, "hide");
    } else {
      removeClass(navbar, "hide");
    }
    lastScrollTop = scrollTop;
  });
}