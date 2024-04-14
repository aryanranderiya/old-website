// ! FIREBASE INIT --------------------------------------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUfVSJ3BpDrlV7-6Ou9DWE3KX1jHHFGEY",
  authDomain: "aryanranderiya-portfolio.firebaseapp.com",
  projectId: "aryanranderiya-portfolio",
  storageBucket: "aryanranderiya-portfolio.appspot.com",
  messagingSenderId: "540599201791",
  appId: "1:540599201791:web:757239eec07a33dc9ec1ca",
  measurementId: "G-S3XP36W3P9",
};

initializeApp(firebaseConfig);
const database = getDatabase();
// ! FIREBASE INIT --------------------------------------------------------------------------------------

import { Gradient } from "./gradient.js";

const gradient = new Gradient();
const gradient2 = new Gradient();

gradient.initGradient("#gradient-canvas-main");
gradient2.initGradient("#gradient-canvas");

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

  setInterval(setupTimeBento, 1000);

  setupGSAPChips();
  setupGithubBento();
});

async function setupGithubBento() {
  let token = "";
  const qDtadW_2ZSeiRJtuRTvv = ref(database, "qDtadW_2ZSeiRJtuRTvv/");
  await new Promise((resolve) => {
    onValue(qDtadW_2ZSeiRJtuRTvv, (snapshot) => {
      token = snapshot.val();
      resolve();
    });
  });

  const response = await fetch(
    "https://api.github.com/search/repositories?q=user:aryanranderiya&sort=pushed",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const repoObj = await response.json();
  const repoArray = repoObj.items;

  document.getElementById(
    "github_repo_chip"
  ).innerHTML = `<i class="fa-solid fa-book-bookmark"></i>${repoArray.length} Repos`;

  const response2 = await fetch("https://api.github.com/users/aryanranderiya");
  const userInfo = await response2.json();

  document.getElementById("github_profile_chip").innerHTML = `
  <img src=${userInfo.avatar_url} width='10px'> 
  ${userInfo.login}
  `;

  document.getElementById("github_profile_anchor").href = userInfo.html_url;

  document.getElementById(
    "github_public_repo_chip"
  ).innerHTML = `<i class="fa-solid fa-people-group"></i>${userInfo.public_repos} Public Repos`;

  document.getElementById(
    "github_follower_chip"
  ).innerHTML = `<i class="fa-solid fa-user-plus"></i>${userInfo.followers} Followers`;

  document.getElementById(
    "github_following_chip"
  ).innerHTML = `<i class="fa-solid fa-user-group"></i>${userInfo.following} Following`;
}

function setupGSAPChips() {
  gsap.to(".marquee_part", {
    x: -1000,
    yoyo: true,
    duration: 13,
    ease: "linear",
    repeat: -1,
    startAt: { x: 0 },
  });

  gsap.to(".marquee_part2", {
    x: 0,
    duration: 13,
    ease: "linear",
    repeat: -1,
    startAt: { x: -1000 },
    yoyo: true,
  });

  const service_node = document.querySelector(".services");

  for (let index = 0; index < 3; index++) {
    const service = service_node.cloneNode(true);
    service_node.insertAdjacentElement("afterend", service);
  }

  const services = document.querySelectorAll(".services");

  services.forEach((service, index) => {
    gsap.to(service, {
      x: index % 2 === 0 ? 720 : -720,
      duration: 10,
      ease: "linear",
      repeat: -1,
      yoyo: true,
      stagger: 0.5,
    });
  });
}

const time = document.getElementById("time");
function setupTimeBento() {
  time.innerHTML = new Date().toLocaleTimeString() + " IST";
}

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
  const professional_image = document.querySelector(".professional_image");

  function subcontentIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        content1Titles.forEach((title, index) =>
          setTimeout(() => addClass(title, "show"), index * 150)
        );
        setTimeout(() => {
          addClass(professional_image, "visible");
        }, 300);
      } else {
        content1Titles.forEach((title) => removeClass(title, "show"));
        removeClass(professional_image, "visible");
      }
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
