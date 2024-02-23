window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-S3XP36W3P9");

const cursoriconwave = document.getElementById("cursoriconwave");
const scrollBtn = document.querySelector(".scroll_btn");
const welcoming = document.querySelector(".welcoming");

document.addEventListener("DOMContentLoaded", function () {
  const subContent3 = document.querySelector(".subcontent3");
  const rotatingWords = document.querySelector(".words_rotating_span");

  cursor.style.boxShadow = "none";

  addListeners(scrollBtn);
  handleAnimationSubcontent1();
  rotatingWords.addEventListener("animationend", removeBlackCover);

  new IntersectionObserver(handleIntersection1, {
    threshold: 0.5,
  }).observe(subContent3);

  loadNavbar().then(() => {
    handleNavbarIntersection();
  });
});

function handleNavbarIntersection() {
  const navbar = document.querySelector(".navbar");
  const coverElement = document.querySelector(".cover");

  function handleIntersection2(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navbar.style.opacity = "0";
        navbar.style.visibility = "hidden";
      } else {
        navbar.style.visibility = "visible";
        navbar.style.opacity = "1";
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection2, {
    threshold: 0.5,
  });
  observer.observe(coverElement);
}

function addListeners(scrollBtn) {
  const buttons_blue = document.querySelectorAll(".button_blue");
  const title_heading_1 = document.querySelector(".title_heading_1");
  const cursoricon3 = document.getElementById("cursoricon3");
  const cursoriconidea = document.getElementById("cursoriconidea");
  const cursoriconlaptop = document.getElementById("cursoriconlaptop");
  const cursoriconpallette = document.getElementById("cursoriconpallette");
  const span_designer = document.getElementById("span_designer");
  const span_dev = document.getElementById("span_dev");
  const span_entrepreneur = document.getElementById("span_entre");
  const content1 = document.querySelector(".content1");
  const contentElement = document.querySelector(".content1");
  const cursoricon2 = document.getElementById("cursoricon2");

  // ! Scroll on button click

  scrollBtn.addEventListener("click", function (e) {
    cursorTransformShadowBlend();
    removeClass(cursoricon2, "active");

    contentElement.scrollIntoView({
      top: contentElement.offsetTop,
      behavior: "smooth",
    });
  });

  // ! Titles & Cover
  title_heading_1.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(9)", "none");
    addClass(cursor, "blur");
    addClass(cursoricon2, "active");
  });

  title_heading_1.addEventListener("mouseout", () => {
    cursorTransformShadowBlend(undefined, "none");
    removeClass(cursor, "blur");
    removeClass(cursoricon2, "active");
  });

  //! Scroll Button

  scrollBtn.addEventListener("mouseover", (event) => {
    event.stopPropagation();
    cursorTransformShadowBlend();
    removeClass(cursoricon2, "active");
  });

  scrollBtn.addEventListener("mouseout", (event) => {
    event.stopPropagation();
  });

  //! Project Buttons

  buttons_blue.forEach((button_blue) => {
    button_blue.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(3)", "none", "difference");
      removeClass(cursoricon2, "active");
      addClass(cursoricon3, "active");
    });

    button_blue.addEventListener("mouseout", () => {
      cursorTransformShadowBlend();
      removeClass(cursoricon3, "active");
    });
  });

  // ! Pallette, Laptop & Idea Cursor

  span_designer.addEventListener("mouseover", () => {
    cursorTransformShadowBlend(undefined, "none");
    makeInvisible(cursoriconwave);
    addClass(cursor, "transparent");
    addClass(cursoriconpallette, "active");
  });

  span_dev.addEventListener("mouseover", () => {
    cursorTransformShadowBlend(undefined, "none");
    makeInvisible(cursoriconwave);
    addClass(cursor, "transparent");
    addClass(cursoriconlaptop, "active");
  });

  span_entrepreneur.addEventListener("mouseover", () => {
    cursorTransformShadowBlend(undefined, "none");
    makeInvisible(cursoriconwave);
    addClass(cursor, "transparent");
    addClass(cursoriconidea, "active");
  });

  span_designer.addEventListener("mouseout", () => {
    normalCursorEmojiSpan(cursoriconpallette);
  });

  span_dev.addEventListener("mouseout", () => {
    normalCursorEmojiSpan(cursoriconlaptop);
  });

  span_entrepreneur.addEventListener("mouseout", () => {
    normalCursorEmojiSpan(cursoriconidea);
  });

  content1.addEventListener("mouseover", () => {
    cursorTransformShadowBlend();
    addClass(cursor, "transparent");
    cursoriconwave.style.opacity = "1";
    addClass(cursoriconwave, "active");
    removeClass(cursoricon2, "active");
  });

  content1.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    cursoriconwave.style.opacity = "0";
    removeClass(cursor, "transparent");
    removeClass(cursoriconwave, "active");
  });
}

function handleAnimationSubcontent1() {
  const subcontent1 = document.querySelector(".subcontent1");
  const content1Titles = document.querySelectorAll(".content1_title");

  function subcontentIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        content1Titles.forEach((title, index) =>
          setTimeout(() => addClass(title, "show"), index * 150)
        );
      } else content1Titles.forEach((title) => removeClass(title, "show"));
    });
  }

  const observerSubcontent1 = new IntersectionObserver(subcontentIntersection, {
    threshold: 0.5,
  });

  observerSubcontent1.observe(subcontent1);
}

function cursorTransformShadowBlend(
  param_transform = "none",
  param_boxShadow = "0px 0px 30px white",
  param_mixBlendMode = "normal"
) {
  cursor.style.transform = param_transform;
  cursor.style.boxShadow = param_boxShadow;
  cursor.style.mixBlendMode = param_mixBlendMode;
}

function normalCursorEmojiSpan(cursoriconX) {
  cursor.style.boxShadow = "0px 0px 30px white";
  cursoriconwave.style.opacity = "1";
  cursoriconwave.style.transform = "scale(1)";
  removeClass(cursoriconX, "active");
  removeClass(cursor, "transparent");
}

function addClass(element, className) {
  element.classList.add(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function makeInvisible(element) {
  element.style.transform = "scale(0)";
  element.style.opacity = "0";
}

function removeBlackCover() {
  const section_content1 = document.querySelector(".section_content1");

  setTimeout(() => {
    document.body.style.overflow = "auto";
    addClass(welcoming, "hide");

    document.querySelector(".my_portfolio").classList.add("show");
    document.querySelector(".aryan_randeriya").classList.add("show");

    cursor.style.mixBlendMode = "normal";
    scrollBtn.style.opacity = "1";
    section_content1.style.opacity = "1";
  }, 500);

  setTimeout(() => welcoming.remove(), 1600);
}

function handleIntersection1(entries) {
  requestAnimationFrame(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.style.opacity = "1";
      else entry.target.style.opacity = "0";
    });
  });
}
