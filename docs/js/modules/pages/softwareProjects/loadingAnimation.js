/**
 * @module pages/softwareProjects/loadingAnimation
 * @description Module for loading text animation
 */

/**
 * Generate animated loading text
 */
export function generateLoadingText() {
  const websiteName = "aryanranderiya.com".split("");
  const loadingTextElement = document.getElementById("loading_text");

  let translation = 103.5;

  for (let index = 0; index < websiteName.length; index++) {
    loadingTextElement.style.opacity = "1";
    const div = document.createElement("div");
    div.classList.add("loading_text_inner");
    div.style.transitionDuration = "2s";

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