/**
 * @module pages/softwareProjects/uiInteractions
 * @description Module for UI interactions and hover effects
 */

import { addClass, removeClass, cursorTransformShadowBlend } from "../../utils/domHelpers.js";

/**
 * Initialize UI interactions for software projects page
 */
export function initializeUIInteractions() {
  setupScrollBarInteractions();
  setupFilterHoverEffects();
  setupTitleHoverEffects();
  setupLogosHoverEffects();
}

/**
 * Set up scrollbar interactions
 */
function setupScrollBarInteractions() {
  const scrollbarContainer = document.querySelector(".scrollbar_progress_container_parent");
  const cursorTxt2 = document.getElementById("cursortext2");

  scrollbarContainer.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(5)";
    cursor.style.boxShadow = "none";
    cursor.style.outlineWidth = "0px";
    addClass(cursorTxt2, "active");
    addClass(cursor, "transparent");
    updateScrollProgress();
  });

  scrollbarContainer.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 30px white";
    removeClass(cursorTxt2, "active");
    removeClass(cursor, "transparent");
  });

  // Update progress on scroll
  document.addEventListener("scroll", updateScrollProgress);
}

/**
 * Update scroll progress bar and percentage
 */
export function updateScrollProgress() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
  const scrollPercent = `${percentage}%`;

  document
    .querySelector(".scrollbar_progress")
    .style.setProperty("--height", scrollPercent);

  const cursorTxt2 = document.getElementById("cursortext2");
  cursorTxt2.textContent = `${Math.round(percentage)}%`;
}

/**
 * Set up filter chip hover effects
 */
function setupFilterHoverEffects() {
  const chips = document.querySelectorAll(".project_type_select");
  
  chips.forEach((chip) => {
    chip.parentElement.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    chip.parentElement.parentElement.addEventListener("mouseout", () => {
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });
  });
}

/**
 * Set up title hover effects
 */
function setupTitleHoverEffects() {
  const titleHeading = document.querySelector(".title-heading");
  const githubHeadingDiv = document.querySelector(".github_heading_div");

  // Software Projects Title
  titleHeading.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(10)";
    cursor.style.mixBlendMode = "difference";
    cursor.style.boxShadow = "none";
  });

  titleHeading.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 50px white";
  });

  // GitHub Heading
  githubHeadingDiv.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(11.5)";
    cursor.style.mixBlendMode = "difference";
    cursor.style.boxShadow = "none";
  });

  githubHeadingDiv.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 50px white";
  });
}

/**
 * Set up logos marquee hover effects
 */
function setupLogosHoverEffects() {
  const logos = document.querySelector(".logos");

  logos.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(10)";
    cursor.style.boxShadow = "none";
    cursor.style.outlineWidth = "0px";
    addClass(cursortext, "active");
    addClass(cursor, "partially_transparent2");
  }, { passive: true });

  logos.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 30px white";
    removeClass(cursortext, "active");
    removeClass(cursor, "partially_transparent2");
  }, { passive: true });
}

/**
 * Remove preloader and show content
 */
export function removePreloader() {
  const blackCover = document.querySelector(".black_cover");
  const titleHeading = document.querySelector(".title-heading");
  const subtitle = document.querySelector(".softwareprojects_subtitle");

  setTimeout(() => {
    blackCover.classList.add("hide");
    setTimeout(() => (document.body.style.overflow = "auto"), 200);
  }, 500);

  // Handle Intersection Translate Y
  let alreadyAnimatedFlag = false;
  let timeout;

  function handleIntersectionTranslate(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        timeout = alreadyAnimatedFlag ? 0 : 700;
        setTimeout(() => addClass(titleHeading, "show"), timeout);
        setTimeout(() => addClass(subtitle, "show"), timeout + 60);
        alreadyAnimatedFlag = true;
        return;
      }
      removeClass(titleHeading, "show");
      removeClass(subtitle, "show");
    });
  }

  const observerTranslate = new IntersectionObserver(handleIntersectionTranslate, {
    threshold: 0.5,
  });

  observerTranslate.observe(document.querySelector(".title"));
}