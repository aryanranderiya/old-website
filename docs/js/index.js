// ! FIREBASE INIT --------------------------------------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
  get,
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

new Gradient().initGradient("#gradient-canvas-main");

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-S3XP36W3P9");

const cursoriconwave = document.getElementById("cursoriconwave");
const scrollBtn = document.querySelector(".scroll_btn");
const welcoming = document.querySelector(".welcoming");
const subcontent1 = document.querySelector(".subcontent1");
const cursoricon5 = document.getElementById("cursoricon5");

document.addEventListener("DOMContentLoaded", function () {
  const rotatingWords = document.querySelector(".words_rotating_span");

  cursor.style.boxShadow = "none";

  addListeners(scrollBtn);
  handleAnimationSubcontent1();
  rotatingWords.addEventListener("animationend", removeBlackCover);

  loadNavbar().then(() => {
    handleNavbarIntersection();
  });

  setupTimeBento();

  setupAnimationLargeText();
  setupGSAPChips();
  setupGithubBento();
  setupBentoAnimation();
  // Horizontal Scroll
  // setupFeaturedProjects();

  const featuredRef = ref(database, "Featured/");
  const nowRef = ref(database, "Now/");
  onValue(featuredRef, setupFeaturedProjects);
  onValue(nowRef, setupNowItems);

  setupServices();
});

function setupNowItems(snapshot) {
  const snapshotData = snapshot.val();
  const itemsContainer = document.querySelector(".now_items");
  console.log(itemsContainer);
  snapshotData.forEach((nowItem) => {
    const li = document.createElement("li");
    li.textContent = nowItem;
    itemsContainer.appendChild(li);
  });
}

function setupFeaturedProjects(snapshot) {
  const featured_container = document.querySelector(".featured_projects");
  const hover_card = document.querySelector(".featured_project_hover_card");
  const hover_card_btn = hover_card.querySelector(
    ".featured_project_hover_card_btn"
  );
  const hover_card_desc = hover_card.querySelector(
    ".featured_project_hover_card_description"
  );

  const hover_text = document.querySelector(".hover_text_featured_project");

  snapshot.forEach((childSnapshot) => {
    const projectId = childSnapshot.val();
    const key = childSnapshot.key;
    const projectsRef = ref(database, "Projects/" + projectId);

    get(projectsRef)
      .then((snapshot) => {
        if (!snapshot.exists()) throw new Error("Snapshot doesnt exist");

        const data = snapshot.val();

        const featured_project = document.createElement("a");
        featured_project.innerHTML = `
        <div class="featured_project_card">
          <span class="featured_project_name">${data.project_title}</span>
          <div class="featured_project_info">
            <span class="featured_project_type">${data.project_type}</span>
            <span class="featured_project_type2">${data.project_creation}</span>
          </div>
        </div>
        <hr class="featured_project_separator">`;

        if (key.toLowerCase() === "latest") {
          const card = featured_project.querySelector(".featured_project_card");
          const latest_div = document.createElement("div");
          latest_div.classList.add("latest_work");
          latest_div.innerText = "Latest";
          card.insertBefore(latest_div, card.firstChild);
          featured_container.insertBefore(
            featured_project,
            featured_container.firstChild
          );
        } else {
          featured_container.appendChild(featured_project);
        }

        featured_project.addEventListener("mouseover", enter);
        featured_project.addEventListener("mouseout", leave);

        function enter() {
          hover_card.style.width = "300px";
          hover_card.style.height = "150px";
          hover_card.style.borderRadius = "20px";
          hover_card.style.backgroundColor = "#00bbff";
          hover_text.style.opacity = "0";
          hover_card_btn.href = `Project.html?id=${snapshot.key}`;
          featured_project.href = `Project.html?id=${snapshot.key}`;
          featured_project.style.backgroundColor = "#00bbff";
          hover_card_desc.innerText = data.project_short_description;
          hover_card_desc.style.opacity = "1";
          hover_card_btn.style.opacity = "1";
          cursorTransformShadowBlend("scale(1.3)", "none");
          addClass(cursor, "transparent");
          addClass(cursoricon5, "active");
        }

        function leave() {
          hover_card.style.backgroundColor = "white";
          hover_text.style.opacity = "1";
          hover_card_desc.style.opacity = "0";
          hover_card_btn.style.opacity = "0";
          hover_card.style.width = "100px";
          hover_card.style.height = "100px";
          hover_card.style.borderRadius = "1000px";
          featured_project.style.backgroundColor = "";
          cursorTransformShadowBlend();
          removeClass(cursor, "transparent");
          removeClass(cursoricon5, "active");
        }
      })
      .catch((error) => {
        console.error("Error getting data: ", error);
      });
  });
}

function setupServices() {
  gsap.registerPlugin(ScrollTrigger);

  let mm = gsap.matchMedia();

  mm.add("(max-width: 700px)", () => {
    let tl0 = gsap.timeline({
      scrollTrigger: {
        trigger: ".services_section",
        start: "top+=100 bottom",
        scrub: true,
      },
    });

    tl0.to(".service_name", {
      color: "black",
      x: "0%",

      stagger: {
        amount: 1.5,
        from: "start",
        each: 0.5,
        onComplete: changeColor,
        onStart: setColor,
      },
    });
  });

  mm.add("(min-width: 701px)", () => {
    let tl0 = gsap.timeline({
      scrollTrigger: {
        trigger: ".services_section",
        start: "top+=300 bottom",
        scrub: true,
      },
    });

    tl0.to(".service_name", {
      color: "black",
      x: "0%",

      stagger: {
        amount: 1.5,
        from: "start",
        each: 0.5,
        onComplete: changeColor,
        onStart: setColor,
      },
    });
  });

  gsap.set(".service_name", { x: "100vw" });

  function setColor() {
    this.targets()[0].previousElementSibling.style.color = "black";
  }

  function changeColor() {
    gsap.to(this.targets(), { color: "#00bbff", duration: 0 });
    this.targets()[0].previousElementSibling.style.color = "#00bbff";
  }
}

function setupAnimationLargeText() {
  gsap.registerPlugin(ScrollTrigger);

  let tl0 = gsap.timeline({
    scrollTrigger: {
      trigger: ".largetext_container",
      start: "top-=400 bottom",
      end: "bottom center",
      scrub: true,
    },
  });

  gsap.set(".large_text:nth-child(1)", {
    x: "60%",
  });
  tl0.to(".large_text:nth-child(1)", {
    x: "0%",
  });

  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".large_text:nth-child(1)",
      start: "top-=200 center",
      end: "bottom center",
      scrub: true,
    },
  });

  gsap.set(".large_text:nth-child(2)", {
    x: "-100%",
  });
  tl1.to(".large_text:nth-child(2)", {
    x: "0%",
  });

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".large_text:nth-child(2)",
      start: "center-=100 center",
      end: "bottom center",
      scrub: true,
    },
  });
  gsap.set(".large_text:nth-child(3)", { x: "100%" });
  tl2.to(".large_text:nth-child(3)", { x: "0%" });

  let tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".large_text:nth-child(3)",
      start: "center-=100 center",
      end: "bottom center",
      scrub: true,
    },
  });
  gsap.set(".large_text:nth-child(4)", { x: "-100%" });
  tl3.to(".large_text:nth-child(4)", { x: "0%" });

  let currentScroll = 0;
  let isScrollingDown = true;

  let tween = gsap
    .to(".featured_marquee__part", {
      xPercent: -100,
      repeat: -1,
      duration: 6,
      ease: "linear",
    })
    .totalProgress(0.5);

  gsap.set(".featured_marquee__inner", { xPercent: -50 });

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > currentScroll) isScrollingDown = true;
    else isScrollingDown = false;

    gsap.to(tween, {
      timeScale: isScrollingDown ? 1 : -1,
    });

    currentScroll = window.pageYOffset;
  });
}
function setupBentoAnimation() {
  const bento_cards = document.querySelectorAll(".bento_card");

  function handleIntersection2(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.style.opacity = "1";
      else entry.target.style.opacity = "0";
    });
  }

  const observer = new IntersectionObserver(handleIntersection2, {
    threshold: 0.7,
  });

  bento_cards.forEach((bento_card, index) => {
    observer.observe(bento_card);
  });

  const bento_project = document.getElementById("bento_project");
  const bento_project2 = document.getElementById("bento_project2");
  const bento_resume = document.getElementById("bento_resume");
  const now_anchor = document.querySelectorAll(".now a");

  let bentos = [bento_project, bento_project2, bento_resume];

  now_anchor.forEach((anchor) => {
    anchor.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    anchor.addEventListener("mouseout", () => {
      cursorTransformShadowBlend();
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
    });
  });

  bentos.forEach((bento) => {
    bento.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    bento.addEventListener("mouseout", () => {
      cursorTransformShadowBlend();
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
    });
  });
}

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
  <img src=${userInfo.avatar_url} width='10px' alt="Github Profile photo"> 
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
    x: -830,
    repeat: -1,
    duration: 10,
    ease: "linear",
    yoyo: true,
  });

  gsap.to(".marquee_part2", {
    x: 0,
    repeat: -1,
    duration: 10,
    ease: "linear",
    yoyo: true,
    startAt: { x: -830 },
  });
}

const time = document.getElementById("time");
function setupTimeBento() {
  time.innerHTML = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function handleNavbarIntersection() {
  const navbar = document.querySelector(".navbar");
  const coverElement = document.querySelector(".cover");

  function handleIntersection2(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navbar.style.opacity = "0";
        setTimeout(() => {
          navbar.style.visibility = "hidden";
        });
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
  const span_age = document.getElementById("span_age");
  const span_entrepreneur = document.getElementById("span_entre");
  const cursoricon2 = document.getElementById("cursoricon2");
  const subcontent1_text = document.querySelector(".subcontent1_text");
  // ! Scroll on button click

  scrollBtn.addEventListener("click", function (e) {
    cursorTransformShadowBlend();
    removeClass(cursoricon2, "active");

    subcontent1.scrollIntoView({
      top: subcontent1.offsetTop + 200,
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
  function calculateAge(birthday) {
    var dob = new Date(birthday);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    return Math.abs(year - 1970);
  }

  span_age.innerHTML = calculateAge("07/27/2005");

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

  subcontent1.addEventListener("mouseover", () => {
    cursorTransformShadowBlend();
    addClass(cursor, "transparent");
    cursoriconwave.style.opacity = "1";
    addClass(cursoriconwave, "active");
    removeClass(cursoricon2, "active");
  });

  subcontent1.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    cursoriconwave.style.opacity = "0";
    removeClass(cursor, "transparent");
    removeClass(cursoriconwave, "active");
  });
}

function handleAnimationSubcontent1() {
  const content1Titles = document.querySelectorAll(".content1_title");

  const view_all = document.querySelectorAll(
    ".content1_buttons .view_all_projects_anchor"
  );

  view_all.forEach((element) => {
    element.addEventListener("mouseover", () => {
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
      cursoricon5.style.transform = "scale(1.5)";
      makeInvisible(cursoriconwave);
    });

    element.addEventListener("mouseout", () => {
      normalCursorEmojiSpan(cursoricon5);
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
    });
  });

  function subcontentIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        content1Titles.forEach((title, index) =>
          setTimeout(() => addClass(title, "show"), index * 200)
        );
        setTimeout(() => {
          view_all.forEach((element, index) =>
            setTimeout(() => addClass(element, "show"), index * 80)
          );
        }, 450);
      } else {
        view_all.forEach((element) => removeClass(element, "show"));
        content1Titles.forEach((title) => removeClass(title, "show"));
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
  setTimeout(() => {
    document.body.style.overflow = "auto";
    addClass(welcoming, "hide");

    document.querySelector(".my_portfolio").classList.add("show");
    document.querySelector(".aryan_randeriya").classList.add("show");

    cursor.style.mixBlendMode = "normal";
    scrollBtn.style.opacity = "1";
  }, 300);

  setTimeout(() => welcoming.remove(), 1600);
}
