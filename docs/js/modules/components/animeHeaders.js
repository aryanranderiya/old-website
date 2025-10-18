/**
 * @module components/animeHeaders
 * @description Anime headers carousel functionality
 */

import { addClass, removeClass, cursorTransformShadowBlend } from '../cursorUtils.js';

/**
 * Initialize anime headers carousel with controls
 */
export function animeHeaders() {
  const dot = document.querySelector(".dot");
  const icons = document.querySelector(".icons");
  const content3 = document.querySelector(".content3");
  const controlBack = document.querySelector("#control_backward");
  const controlForward = document.querySelector("#control_forward");
  const headersText = document.querySelector("#anime_headers_text");
  const animeImages = document.querySelectorAll(".anime-slider img");
  const otherControls = document.querySelector(".video_controls_others");
  const cursoricon5 = document.querySelector("#cursoricon5");
  const controlsContainer = document.querySelector(".video_controls_container");
  const cursor = document.querySelector('.cursor');
  
  let translate = 0;
  let index = 1;

  controlForward.addEventListener("click", () => {
    controlForward.style.transform = "scale(1.1)";
    setTimeout(() => (controlForward.style.transform = "scale(1)"), 200);
    translate += 100;
    index++;
    if (index > 18) index = 1;
    if (translate > 1700) translate = 0;
    headersText.innerHTML = `${index}/18`;
    animeImages.forEach(
      (anime_image) =>
        (anime_image.style.transform = `translateX(-${translate}%)`)
    );
  });

  controlBack.addEventListener("click", () => {
    controlBack.style.transform = "scale(1.2)";
    setTimeout(() => (controlBack.style.transform = "scale(1)"), 200);
    translate -= 100;
    index--;
    if (translate < 0) translate = 1700;
    if (index < 1) index = 18;
    headersText.innerHTML = `${index}/18`;
    animeImages.forEach((anime_image) => {
      anime_image.style.transform = `translateX(-${translate}%)`;
    });
  });

  controlForward.addEventListener("mouseover", () => {
    cursorTransformShadowBlend(undefined, "none");
    addClass(cursor, "transparent");
    addClass(cursoricon5, "active");
  });

  controlForward.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    removeClass(cursor, "transparent");
    removeClass(cursoricon5, "active");
  });

  controlBack.addEventListener("mouseover", () => {
    cursorTransformShadowBlend(undefined, "none");
    addClass(cursor, "transparent");
    addClass(cursoricon5, "active");
  });

  controlBack.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    removeClass(cursor, "transparent");
    removeClass(cursoricon5, "active");
  });

  function handleIntersectionAnime(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        removeClass(dot, "visible");
        removeClass(icons, "hidden");
        removeClass(otherControls, "hidden");
        removeClass(controlsContainer, "hidden");
        controlsContainer.style.opacity = "1";
      } else {
        addClass(dot, "visible");
        addClass(icons, "hidden");
        addClass(otherControls, "hidden");
        addClass(controlsContainer, "hidden");
        setTimeout(() => (controlsContainer.style.opacity = "0"), 500);
      }
    });
  }

  const observerAnime = new IntersectionObserver(handleIntersectionAnime, {
    root: null,
    threshold: 0.5,
  });

  if (content3) {
    observerAnime.observe(content3);
  }
}