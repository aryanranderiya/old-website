/**
 * @module footer
 * @description Footer loading and initialization
 */

import { cursorTransformShadowBlend, addClass, removeClass } from './modules/cursorUtils.js?v=20261124b';
import { 
  animateFooterContent, 
  animateOutFooterContent, 
  initFooterTextAnimation,
  createFooterObserver 
} from './modules/components/footerAnimation.js?v=20261124b';
import { initMarqueeAnimation, addMarqueeHoverEffects } from './modules/components/marquee.js?v=20261124b';
import {
  addSocialHoverEffects,
  addPageLinkHoverEffects,
  addLetsTalkHoverEffects,
  addEmailHoverEffects,
  addBottomNameHoverEffects,
  initDiscordClick
} from './modules/components/footerHoverEffects.js?v=20261124b';

document.addEventListener("DOMContentLoaded", function () {
  const footerContainer = document.getElementById("footerContainer");
  
  if (footerContainer) {
    fetch("footer.html?v=20261124b")
      .then((response) => response.text())
      .then((data) => {
        footerContainer.innerHTML = data;
        footerContainer.style.cssText = "";
        
        // Get DOM elements
        const letstalkcontainer = document.querySelector(".letstalkcontainer");
        const letstalk = document.querySelector("#letstalk");
        const cursoricon4 = document.getElementById("cursoricon4");
        const cursoricon5 = document.getElementById("cursoricon5");
        const pageLinks = document.querySelectorAll(".page_link");
        const allSocial = document.querySelectorAll(".social");
        const googleIcon = document.querySelector(".google_icon");
        const bottomName = document.querySelector(".footer_bottom_name");
        const div_email = document.querySelector(".div_email");
        const discord_click = document.querySelector(".discord_click");
        const marquee = document.querySelector(".marquee");
        const wordContainers = document.querySelectorAll(".footer_bottom_name .word");
        const nonfooter = document.querySelector(".nonfooter");
        const cursor = document.querySelector('.cursor');

        // Initialize hover effects
        addSocialHoverEffects(allSocial, googleIcon, cursor, cursoricon5);
        addPageLinkHoverEffects(pageLinks, googleIcon, cursor, cursoricon5);
        addLetsTalkHoverEffects(letstalkcontainer, cursor, cursoricon4);
        addEmailHoverEffects(div_email, cursor, cursoricon5);
        addBottomNameHoverEffects(bottomName, cursor);
        initDiscordClick(discord_click);

        // Initialize marquee
        addMarqueeHoverEffects(marquee);
        initMarqueeAnimation();

        // Initialize footer text animation
        initFooterTextAnimation(wordContainers);

        // Setup footer intersection observer
        createFooterObserver(
          nonfooter,
          () => animateFooterContent(pageLinks, allSocial, wordContainers, letstalk, div_email),
          () => animateOutFooterContent(pageLinks, allSocial, wordContainers, letstalk, div_email)
        );
      });
  } else {
    console.error("Element with ID 'footerContainer' not found.");
  }
});