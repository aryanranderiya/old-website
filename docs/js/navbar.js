/**
 * @module navbar
 * @description Navbar loading and initialization
 */

import { handleMenuOpening, initScrollBehavior } from './modules/components/navbarMenu.js?v=20261124b';
import { addHoverImage, addMouseListeners } from './modules/components/navbarHover.js?v=20261124b';
import { setActiveLink } from './modules/components/navbarActiveLink.js?v=20261124b';

/**
 * Load navbar and initialize functionality
 */
async function loadNavbar() {
  const navbarContainer = document.getElementById("navbarContainer");

  return fetch("navbar.html?v=20261124b")
    .then((response) => response.text())
    .then((data) => {
      navbarContainer.innerHTML = data;

      const navbar = document.querySelector(".navbar");
      const navbar_menu = document.querySelector(".navbar_menu");
      const items = document.querySelectorAll(".menu_items .item");

      // Initialize scroll behavior
      initScrollBehavior(navbar);

      // Initialize menu functionality
      handleMenuOpening(items, navbar_menu, navbar);
      
      // Initialize hover effects
      addHoverImage(items);
      addMouseListeners(navbar_menu);
      
      // Set active link
      setActiveLink(items);
    });
}

// Load navbar on page load
loadNavbar();