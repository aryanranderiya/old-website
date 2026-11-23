/**
 * @module ui/scrollbar
 * @description Scrollbar functionality and progress tracking
 */

import { addClass, removeClass } from '../cursorUtils.js?v=20261124b';

/**
 * Modify scrollbar behavior on hover
 */
export function modifyScrollBar() {
  const scrollbarContainerParent = document.querySelector(
    ".scrollbar_progress_container_parent"
  );
  const cursor = document.querySelector('.cursor');
  const cursortext2 = document.querySelector("#cursortext2");
  
  if (!scrollbarContainerParent || !cursor || !cursortext2) return;
  
  scrollbarContainerParent.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(5)";
    cursor.style.boxShadow = "none";
    cursor.style.outlineWidth = "0px";
    addClass(cursortext2, "active");
    addClass(cursor, "transparent");
    updateProgressBarandBtn();
  });

  scrollbarContainerParent.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 30px white";
    removeClass(cursortext2, "active");
    removeClass(cursor, "transparent");
  });
}

/**
 * Update progress bar and button based on scroll position
 */
export function updateProgressBarandBtn() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
  const scrollPercent = percentage + "%";
  const cursortext2 = document.querySelector("#cursortext2");

  const progressBar = document.querySelector(".scrollbar_progress");
  if (progressBar) {
    progressBar.style.setProperty("--height", scrollPercent);
  }

  if (cursortext2) {
    cursortext2.textContent = Math.round(percentage) + "%";
  }
}