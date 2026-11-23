/**
 * @module components/folderNavigation
 * @description Folder navigation and hover effects
 */

import { addClass, removeClass, cursorTransformShadowBlend } from '../cursorUtils.js?v=20261124b';

/**
 * Add folder click listeners for smooth scrolling
 */
export function addFolderListeners() {
  const content1 = document.querySelector(".content1");
  const section2 = document.querySelector(".section2");
  const content3 = document.querySelector(".content3");
  const content4 = document.querySelector(".content4");
  const content5 = document.querySelector(".content5");
  const content6 = document.querySelector(".content6");

  const folder1 = document.getElementById("folder_one");
  const folder2 = document.getElementById("folder_two");
  const folder3 = document.getElementById("folder_three");
  const folder4 = document.getElementById("folder_four");
  const folder5 = document.getElementById("folder_five");
  const folder6 = document.getElementById("folder_six");

  if (folder1 && content1) {
    folder1.addEventListener("click", () =>
      content1.scrollIntoView({ behavior: "smooth" })
    );
  }

  if (folder2 && section2) {
    folder2.addEventListener("click", () =>
      section2.scrollIntoView({ behavior: "smooth" })
    );
  }

  if (folder3 && content3) {
    folder3.addEventListener("click", () =>
      content3.scrollIntoView({ behavior: "smooth" })
    );
  }

  if (folder4 && content4) {
    folder4.addEventListener("click", () =>
      content4.scrollIntoView({ behavior: "smooth" })
    );
  }

  if (folder5 && content5) {
    folder5.addEventListener("click", () =>
      content5.scrollIntoView({ behavior: "smooth" })
    );
  }

  if (folder6 && content6) {
    folder6.addEventListener("click", () =>
      content6.scrollIntoView({ behavior: "smooth" })
    );
  }
}

/**
 * Add hover effects to folders
 * @param {NodeList} folders - Collection of folder elements
 * @param {IntersectionObserver} normalObserver - Observer for folder animations
 */
export function foldersHover(folders, normalObserver) {
  const cursoricon5 = document.querySelector("#cursoricon5");
  const cursor = document.querySelector('.cursor');

  folders.forEach((folder) => {
    normalObserver.observe(folder);

    folder.addEventListener("mouseover", () => {
      folders.forEach((other) => {
        if (other !== folder) other.style.filter = "brightness(20%)";
      });

      folder.style.filter = "brightness(100%)";
      addClass(cursoricon5, "active");
      addClass(cursor, "transparent");
      cursorTransformShadowBlend("scale(1.3)", "none", "normal");
    });

    folder.addEventListener("mouseout", () => {
      removeClass(cursoricon5, "active");
      removeClass(cursor, "transparent");
      cursorTransformShadowBlend("none", "none", "normal");
      folders.forEach((other) => {
        other.style.filter = "brightness(100%)";
      });
    });
  });
}