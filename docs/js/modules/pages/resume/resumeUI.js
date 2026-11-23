/**
 * @module pages/resume/resumeUI
 * @description Module for handling resume page UI interactions and animations
 */

import { addClass, removeClass, cursorTransformShadowBlend } from "../../utils/domHelpers.js?v=20261124b";

/**
 * Initialize resume UI interactions
 */
export function initializeResumeUI() {
  const button = document.querySelector(".download_button");
  const downloadResumeText = document.querySelector(".downloadresume_text");
  const svgIcon = document.querySelector(".svgIcon");
  const resumePdf = document.querySelector(".resume_pdf");
  const cursorIcon5 = document.getElementById("cursoricon5");

  let footerIntersectedFlag = false;

  // Resume PDF hover effects
  resumePdf.addEventListener("mouseover", () => {
    cursor.style.background = "#00bbff";
    cursor.style.boxShadow = "0px 0px 30px #00bbff";
  });

  resumePdf.addEventListener("mouseout", () => {
    cursor.style.background = "";
    cursor.style.boxShadow = "0px 0px 30px white";
  });

  // Download button hover effects
  button.addEventListener("mouseover", () => {
    addClass(downloadResumeText, "hovered");
    addClass(svgIcon, "hovered");
    cursorTransformShadowBlend("scale(1.3)", "none");
    addClass(cursor, "transparent");
    addClass(cursorIcon5, "active");
  });

  button.addEventListener("mouseout", () => {
    removeClass(downloadResumeText, "hovered");
    removeClass(svgIcon, "hovered");
    cursorTransformShadowBlend();
    removeClass(cursor, "transparent");
    removeClass(cursorIcon5, "active");
  });

  // Set up intersection observer
  setupIntersectionObserver(button, svgIcon, downloadResumeText, resumePdf);
  
  // Set up scroll event listener
  document.addEventListener("scroll", updateProgressBar);
}

/**
 * Set up intersection observer for resume elements
 * @param {HTMLElement} button - Download button element
 * @param {HTMLElement} svgIcon - SVG icon element
 * @param {HTMLElement} downloadResumeText - Download text element
 * @param {HTMLElement} resumePdf - Resume PDF element
 */
function setupIntersectionObserver(button, svgIcon, downloadResumeText, resumePdf) {
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        addClass(button, "hovered");
        addClass(svgIcon, "hovered");
        addClass(downloadResumeText, "hovered");
      } else {
        removeClass(button, "hovered");
        removeClass(svgIcon, "hovered");
        removeClass(downloadResumeText, "hovered");
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.4,
  });

  observer.observe(resumePdf);
}

/**
 * Update progress bar based on scroll position
 */
export function updateProgressBar() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100 + "%";

  document
    .querySelector("#progress-bar")
    .style.setProperty("--progress", scrollPercent);
}