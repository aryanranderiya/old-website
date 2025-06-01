/**
 * @module components/loadingText
 * @description Loading text animation functionality
 */

/**
 * Generate loading text animation
 */
export function generateLoadingText() {
  const websiteName = "aryanranderiya.com".split("");
  const loadingTextElement = document.getElementById("loading_text");

  if (!loadingTextElement) return;

  let translation = 103.5;

  for (let index = 0; index < websiteName.length; index++) {
    loadingTextElement.style.opacity = "1";
    const div = document.createElement("div");
    div.classList.add("loading_text_inner");

    websiteName.forEach((char) => {
      const span = document.createElement("span");
      div.appendChild(span);
      span.innerHTML = char;
    });

    translation -= 5.5;

    loadingTextElement.appendChild(div);

    setTimeout(() => {
      translation -= 5.56;
      div.style.transform = `translateY(${translation}%)`;
    }, index);
  }
}

/**
 * Hide preloader after loading
 */
export function hidePreloader() {
  const blackCover = document.querySelector(".black_cover");

  if (!blackCover) return;

  setTimeout(() => {
    blackCover.classList.add("hide");
    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 200);
  }, 500);
}