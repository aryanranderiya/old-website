/**
 * @module design_projects
 * @description Design projects page functionality
 */

import { cursorTransformShadowBlend, addClass, removeClass } from './modules/cursorUtils.js?v=20261124b';
import { modifyScrollBar, updateProgressBarandBtn } from './modules/ui/scrollbar.js?v=20261124b';
import { createTitleObserver, createTitleObserver2, createNormalObserver } from './modules/ui/intersectionObservers.js?v=20261124b';
import { generateMerchItems } from './modules/components/merchItems.js?v=20261124b';
import { addFolderListeners, foldersHover } from './modules/components/folderNavigation.js?v=20261124b';
import { normalHeaders } from './modules/components/headerCarousel.js?v=20261124b';
import { animeHeaders } from './modules/components/animeHeaders.js?v=20261124b';
import { thumbnails, advertisements, closePopup } from './modules/components/imagePopup.js?v=20261124b';

// Global variables
const cursortext2 = document.querySelector("#cursortext2");
const cursor = document.querySelector('.cursor');

// Create observers
const titleobserver = createTitleObserver();
const titleobserver2 = createTitleObserver2();
const normalObserver = createNormalObserver();

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const folders = document.querySelectorAll(".folder");
  const titleHeading = document.querySelector(".title-heading");
  const titlediv = document.querySelector(".title");
  const cursor_glow = document.querySelector(".cursor_glow_div");
  const heading_titles = document.querySelectorAll(".heading_title");
  const popupImage = document.querySelector(".popup_image");
  const closeText = document.querySelector(".close_text");
  const popupContainer = document.querySelector(".popup_image_container");
  const btnScrollTop = document.querySelector(".scrolltotop");

  // Setup scroll to top button
  window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
      btnScrollTop.style.opacity = 1;
    else btnScrollTop.style.opacity = 0;
  };

  btnScrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  titlediv.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(10)", "none", "difference");
  });

  titlediv.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
  });

  titleobserver.observe(titlediv);
  modifyScrollBar();
  addFolderListeners();
  generateMerchItems(heading_titles, titleobserver2);
  foldersHover(folders, normalObserver);
  normalHeaders(slider);
  animeHeaders();
  thumbnails(popupImage, popupContainer);
  advertisements(popupImage, popupContainer);

  popupContainer.addEventListener("click", (event) => {
    closePopup(popupContainer, popupImage, event);
  });
  closeText.addEventListener("click", (event) => {
    closePopup(popupContainer, popupImage, event);
  });

  document.addEventListener("scroll", updateProgressBarandBtn);
});