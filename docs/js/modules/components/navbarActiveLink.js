/**
 * @module components/navbarActiveLink
 * @description Set active link in navbar based on current page
 */

import { addClass, removeClass } from '../cursorUtils.js?v=20261124b';
import { shuffleAnimation } from '../animations/textShuffle.js?v=20261124b';

/**
 * Set active link to menu item (highlight current page)
 * @param {NodeList} items - Menu items
 */
export function setActiveLink(items) {
  const pathName = window.location.pathname
    .replace("/docs/", "")
    .replace(".html", "")
    .replace("/", "");

  items.forEach((item) => {
    // Add shuffle animation on hover
    item.addEventListener("mouseenter", shuffleAnimation);
    
    const href = item.parentElement.getAttribute("href");

    if (href === pathName || (pathName === "" && href == "index")) {
      addClass(item, "active");
    } else {
      removeClass(item, "active");
    }
  });
}