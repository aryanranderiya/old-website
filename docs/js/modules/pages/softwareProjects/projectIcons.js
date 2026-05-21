/**
 * @module pages/softwareProjects/projectIcons
 * @description Module for loading and displaying project icons marquee
 */

/**
 * Process and display project icons from the static db.json
 */
export async function processProjectIcons() {
  const logosSlide = document.querySelector(".logos-slide");
  if (!logosSlide) return;

  let icons = [];
  try {
    const response = await fetch("./db/db.json");
    const data = await response.json();
    icons = data.SoftwareIcons || [];
  } catch (e) {
    console.error("Error loading software icons:", e);
    return;
  }

  icons.forEach((url) => {
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