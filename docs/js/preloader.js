window.onbeforeunload = () => {
window.scrollTo(0, 0);
};

generateLoadingText();

window.onload = () => {
const blackCover = document.querySelector(".black_cover");

setTimeout(() => {
  blackCover.classList.add("hide");
  setTimeout(() => {
    document.body.style.overflow = "auto";
  }, 200);
}, 500);
};

function generateLoadingText() {
const websiteName = "aryanranderiya.com".split("");
const loadingTextElement = document.getElementById("loading_text");

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

  translation = translation - 5.5;

  loadingTextElement.appendChild(div);

  setTimeout(() => {
    translation = translation - 5.56;
    div.style.transform = `translateY(${translation}%)`;
  }, index);
}
}
