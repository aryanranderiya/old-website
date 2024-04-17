window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

generateLoadingText();

window.onload = function () {
  const blackCover = document.querySelector(".black_cover");

  setTimeout(function () {
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

// function textAnimateOnHover() {
//   //! Text Animation on Hover
//   let element = document.querySelector(".loading_text");

//   let innerText = element.innerText;
//   element.innerHTML = "";

//   let textContainer = document.createElement("div");
//   addClass(textContainer, "block");

//   for (let letter of innerText) {
//     let span = document.createElement("span");
//     span.innerText = letter.trim() === "" ? "\xa0" : letter;
//     addClass(span, "letter");
//     textContainer.appendChild(span);
//   }

//   element.appendChild(textContainer);
//   element.appendChild(textContainer.cloneNode(true));
//   removeClass(element, "play");
// }

function addClass(element, className) {
  element.classList.add(className);
}
function removeClass(element, className) {
  element.classList.remove(className);
}
