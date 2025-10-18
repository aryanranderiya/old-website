/**
 * @module pages/softwareProjects/projectIcons
 * @description Module for loading and displaying project icons marquee
 */

import { ref, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { db } from "../../config/firebase.js";

/**
 * Process and display project icons from Firebase
 */
export async function processProjectIcons() {
  const softwareIconsRef = ref(db, "SoftwareIcons/");
  const snapshot = await get(softwareIconsRef);

  const logosSlide = document.querySelector(".logos-slide");

  snapshot.forEach((childSnapshot) => {
    const url = childSnapshot.val();
    const img = document.createElement("img");
    img.loading = "eager";
    img.src = url;
    logosSlide.appendChild(img);
  });

  // Clone for infinite scroll
  const logosSlide2 = logosSlide.cloneNode(true);
  const logos = document.querySelector(".logos");
  logos.appendChild(logosSlide2);

  // Initialize marquee animation
  initializeMarqueeAnimation();
}

/**
 * Initialize marquee scroll animation
 */
function initializeMarqueeAnimation() {
  let currentScroll = 0;
  let isScrollingDown = true;

  const tween = gsap
    .to(".logos-slide", {
      xPercent: -100,
      repeat: -1,
      duration: 25,
      ease: "linear",
    })
    .totalProgress(0.5);

  window.addEventListener("scroll", () => {
    isScrollingDown = window.pageYOffset > currentScroll;

    gsap.to(tween, {
      timeScale: isScrollingDown ? 1 : -1,
    });

    currentScroll = window.pageYOffset;
  });
}