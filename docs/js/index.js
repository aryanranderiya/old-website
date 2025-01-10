// ! FIREBASE INIT --------------------------------------------------------------------------------------
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

// import {
//   getDatabase,
//   ref,
//   get,
// } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAUfVSJ3BpDrlV7-6Ou9DWE3KX1jHHFGEY",
//   authDomain: "aryanranderiya-portfolio.firebaseapp.com",
//   projectId: "aryanranderiya-portfolio",
//   storageBucket: "aryanranderiya-portfolio.appspot.com",
//   messagingSenderId: "540599201791",
//   appId: "1:540599201791:web:757239eec07a33dc9ec1ca",
//   measurementId: "G-S3XP36W3P9",
// };

// initializeApp(firebaseConfig);
// const database = getDatabase();
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
const title_heading_1 = document.querySelector(".title_heading_1");

// const section_replacements = document.querySelectorAll(".section_replacement");
// const sections_main = document.querySelectorAll("section");
// const sections = [];
// const maxLength = Math.max(sections_main.length, section_replacements.length);

// for (let i = 0; i < maxLength; i++) {
//   if (sections_main[i]) sections.push(sections_main[i]);
//   if (section_replacements[i]) sections.push(section_replacements[i]);
// }
// console.log(sections);

const scrollbarContainer = document.querySelector(
  ".scrollbar_progress_container_buttons"
);
const progressBar = document.querySelector(".scrollbar_progress");

// let scrollRef = 0;
// window.addEventListener("scroll", function () {
//   if (scrollRef <= 10) scrollRef++;
//   else // ScrollTrigger.refresh();
// });

document.addEventListener("DOMContentLoaded", async () => {
  // window.scrollTo(0, 0);

  setTimeout(() => {
    removeBlackCover();
  }, 1400);

  cursor.style.boxShadow = "none";

  addListeners(scrollBtn);

  let db = {};
  try {
    const response = await fetch("./db/db.json");
    db = await response.json();
  } catch (e) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  animateTitleSection();
  setupGithubBento(db);
  setupFeaturedProjects(db);
  setupFeaturedClients(db);
  setupServices(db);
  setupTestimonials(db);
  setupNowItems(db);
  setupTimeBento();
  setupAnimationLargeText();
  setupGSAPChips();
  setupBentoAnimation();
  animateTextColor();
  createSteps();
  confettiContact();

  // positionNavButtons();
  // modifyScrollBar();
  // highlightActiveSection();
  // updateProgressBar();

  // document.addEventListener("scroll", updateProgressBarandBtn);
  // document.addEventListener("scroll", () => {
  //   highlightActiveSection();
  //   updateProgressBar();
  // });

  // window.addEventListener("resize", positionNavButtons);

  document.querySelectorAll(".cool_button").forEach((button) => {
    // observer.observe(button);
    const inner = button.querySelector(".inner");
    const innertext = button.querySelector(".innertext");
    const arrow_container = button.querySelector(".arrow_container");

    button.addEventListener("mouseover", () => {
      inner.style.width = "100%";
      arrow_container.style.backgroundColor = "#00bbff";
      button.style.borderColor = "#c9c9c9";
      innertext.style.color = "black";
    });

    button.addEventListener("mouseout", () => {
      inner.style.width = "0";
      arrow_container.style.backgroundColor = "white";
      button.style.borderColor = "#69d7ff";
      innertext.style.color = "white";
    });
  });

  ScrollTrigger.refresh();
});

function updateProgressBar() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

  progressBar.style.setProperty("--height", `${percentage}%`);
}

function positionNavButtons() {
  const totalButtons = sections.length;
  const containerHeight = scrollbarContainer.offsetHeight;

  sections.forEach((section, index) => {
    if (!section.id) return;

    let button = scrollbarContainer.querySelector(
      `[data-target="#${section.id}"]`
    );
    if (!button) {
      button = document.createElement("button");
      button.classList.add("nav-icon");
      button.setAttribute("data-target", `#${section.id}`);

      button.addEventListener("mouseover", () => {
        cursorTransformShadowBlend("scale(1.3)", "none");
        addClass(cursor, "transparent");
        addClass(cursoricon5, "active");
      });

      button.addEventListener("mouseout", () => {
        cursorTransformShadowBlend();
        removeClass(cursor, "transparent");
        removeClass(cursoricon5, "active");
      });

      const iconSpan = document.createElement("span");
      iconSpan.classList.add("material-symbols-rounded");
      button.appendChild(iconSpan);

      switch (section.id) {
        case "section_about":
        case "section0":
          iconSpan.textContent = "public";
          break;
        case "section1":
        case "section_about":
          iconSpan.textContent = "face";
          break;
        case "section2":
          iconSpan.textContent = "draw";
          break;
        case "section3":
          iconSpan.textContent = "work";
          break;
        case "section4":
          iconSpan.textContent = "star";
          break;
        case "section5":
          iconSpan.textContent = "design_services";
          break;
        case "section6":
          iconSpan.textContent = "account_box";
          break;
        case "sectiontestimonial":
          iconSpan.textContent = "wysiwyg";
          break;
        case "section7":
          iconSpan.textContent = "wysiwyg";
          break;
        default:
          iconSpan.textContent = "info";
          break;
      }

      scrollbarContainer.appendChild(button);

      button.addEventListener("click", () => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    // Space buttons equally
    const buttonPosition = (index / (totalButtons - 1)) * containerHeight;
    button.style.position = "absolute";
    button.style.top = `${buttonPosition}px`;
  });
}

function highlightActiveSection() {
  const { scrollTop, clientHeight } = document.documentElement;

  sections.forEach((section, index) => {
    if (!section.id) return;

    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    const button = scrollbarContainer.querySelector(
      `[data-target="#${section.id}"]`
    );

    if (
      scrollTop + clientHeight / 2 >= sectionTop &&
      scrollTop + clientHeight / 2 < sectionBottom
    ) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}
function modifyScrollBar() {
  function updateProgressBarandBtn() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    const scrollPercent = `${percentage}%`;

    document
      .querySelector(".scrollbar_progress")
      .style.setProperty("--height", scrollPercent);

    cursortext2.textContent = `${Math.round(percentage)}%`;
  }

  const scrollbarContainerParent = document.querySelector(
    ".scrollbar_progress_container_parent"
  );
  scrollbarContainerParent.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(5)";
    cursor.style.boxShadow = "none";
    cursor.style.outlineWidth = "0px";
    addClass(cursortext2, "active");
    addClass(cursor, "transparent");
    updateProgressBarandBtn();
  });

  scrollbarContainerParent.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 30px white";
    removeClass(cursortext2, "active");
    removeClass(cursor, "transparent");
  });

  const navIcons = document.querySelectorAll(".nav-icon");

  navIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const target = document.querySelector(icon.getAttribute("data-target"));
      target.scrollIntoView({ behavior: "smooth" });
    });

    icon.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    icon.addEventListener("mouseout", () => {
      cursorTransformShadowBlend();
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
    });
  });
}

function setupNowItems(db) {
  const itemsContainer = document.querySelector(".now_items");
  const nowItems = db.Now;
  itemsContainer.innerHTML = nowItems
    .map((nowItem) => `<li>${nowItem}</li>`)
    .join("");
}

async function setupFeaturedProjects(db) {
  const featuredContainer = document.querySelector(".featured_projects");
  const hoverCard = document.querySelector(".featured_project_hover_card");
  const hoverCardBtn = hoverCard.querySelector(
    ".featured_project_hover_card_btn"
  );
  const hoverCardDesc = hoverCard.querySelector(
    ".featured_project_hover_card_description"
  );

  hoverCard.style.cssText =
    "width: 300px; height: 200px; border-radius: 20px; background-color: #00bbff;";

  const featuredProjects = db.Homepage_Featured_Projects;
  const projects = db.Projects;

  const fragment = document.createDocumentFragment();

  // Loop through featured projects and create elements
  Object.entries(featuredProjects).forEach(([key, projectId]) => {
    const data = projects[projectId];

    if (!data) return;

    const featuredProject = document.createElement("a");
    featuredProject.innerHTML = `
      <div class="featured_project_card">
        <span class="featured_project_name">${data.project_title}</span>
        <div class="featured_project_info">
          <span class="featured_project_type">${data.project_type}</span>
          <span class="featured_project_type2">${data.project_creation}</span>
        </div>
      </div>
      <hr class="featured_project_separator">`;

    if (key.toLowerCase() === "latest") {
      const card = featuredProject.querySelector(".featured_project_card");
      const latestDiv = document.createElement("div");
      latestDiv.classList.add("latest_work");
      latestDiv.innerText = "Latest";
      card.insertBefore(latestDiv, card.firstChild);
      fragment.insertBefore(featuredProject, fragment.firstChild);
    } else {
      fragment.appendChild(featuredProject);
    }

    // ScrollTrigger Animation
    gsap.to(featuredProject, {
      scrollTrigger: {
        trigger: featuredProject,
        start: "top+=10 center",
        end: "bottom center",
        onEnter: () => handleHover(featuredProject, data, true),
        onLeave: () => handleHover(featuredProject, data, false),
        onEnterBack: () => handleHover(featuredProject, data, true),
        onLeaveBack: () => handleHover(featuredProject, data, false),
      },
    });

    let activeComponent = null;

    function handleHover(project, data, isEntering) {
      if (isEntering) {
        if (activeComponent && activeComponent !== project)
          handleHover(activeComponent, data, false);
        activeComponent = project;
        hoverCard.style.opacity = "1";
        hoverCard.style.scale = "1";
        hoverCardBtn.href = `Project.html?id=${projectId}`;
        project.href = `Project.html?id=${projectId}`;
        project.style.backgroundColor = "#00bbff";
        hoverCardDesc.innerText = data.project_short_description;
        hoverCardDesc.style.opacity = "1";
        hoverCardBtn.style.opacity = "1";
      } else {
        hoverCard.style.opacity = "0";
        hoverCard.style.scale = "0";
        hoverCardDesc.style.opacity = "0";
        hoverCardBtn.style.opacity = "0";
        project.style.backgroundColor = "";
        activeComponent = null;
      }
    }
  });

  // Append to DOM
  featuredContainer.appendChild(fragment);
  ScrollTrigger.refresh();
}

async function setupServices(db) {
  const servicesContainer = document.querySelector(".services");

  const services = db.Services;

  // Loop through services and create elements
  services.forEach((service, index) => {
    const serviceElement = document.createElement("div");
    serviceElement.classList.add("service");
    serviceElement.innerHTML = `
      <span class="service_number">${(index + 1)
        .toString()
        .padStart(2, "0")}</span>
      <span class="service_name">${service}</span>
    `;
    servicesContainer.appendChild(serviceElement);
  });

  // GSAP animations
  const tl0 = gsap.timeline({
    scrollTrigger: {
      trigger: ".services_section",
      start: "top+=100 bottom",
      end: "bottom top",
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

  gsap.set(".service_name", { x: "100vw" });

  function setColor() {
    this.targets()[0].previousElementSibling.style.color = "black";
  }

  function changeColor() {
    gsap.to(this.targets(), { color: "#00bbff", duration: 0 });
    this.targets()[0].previousElementSibling.style.color = "#00bbff";
  }

  ScrollTrigger.refresh();
}

function setupAnimationLargeText() {
  async function doConfetti(angle, xOrigin = 0, yOrigin = 0.2, emojis = []) {
    confetti({
      particleCount: 20,
      angle,
      origin: { x: xOrigin, y: yOrigin },
      shapes: ["image"],
      scalar: 3,
      wobble: {
        distance: 10,
        enable: true,
      },
      shapeOptions: {
        image: emojis.map((emoji) => {
          return {
            src: `https://emojicdn.elk.sh/${emoji}`,
            width: 30,
            height: 30,
          };
        }),
      },
      // particles: {
      //   move: {
      //     decay: 0.01,
      //   },
      //   opacity: {
      //     animation: {
      //       enable: true,
      //       speed: 10,
      //     },
      //   },
      // },
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".largetext_container",
      start: "top-=400 bottom",
      end: "bottom center",
      scrub: true,
    },
  });

  gsap.set(".large_text", { x: "100%", color: "black" });

  tl.to(".large_text:nth-child(1)", {
    x: "0%",
    color: "white",
  })
    .to(".large_text:nth-child(2)", {
      x: "0%",
      color: "white",
      onComplete: () => doConfetti(60, 0, 0.5),
    })
    .to(".large_text:nth-child(3)", {
      x: "0%",
      color: "white",
      onComplete: () => doConfetti(120, 1, 0.4, ["🎨", "🖌️"]),
    })
    .to(".large_text:nth-child(4)", {
      x: "0%",
      color: "white",
      onComplete: () => doConfetti(60, 0, 0.3, ["🧑‍💻", "💻", "🖥️"], "⌨️"),
    });

  let currentScroll = 0;
  let isScrollingDown = true;

  const tween = gsap
    .to(".featured_marquee__part", {
      xPercent: -100,
      repeat: -1,
      duration: 6,
      ease: "linear",
    })
    .totalProgress(0.5);

  gsap.set(".featured_marquee__inner", { xPercent: -50 });

  window.addEventListener("scroll", () => {
    isScrollingDown = window.pageYOffset > currentScroll;
    gsap.to(tween, { timeScale: isScrollingDown ? 1 : -1 });
    currentScroll = window.pageYOffset;
  });

  ScrollTrigger.refresh();
}

function setupBentoAnimation() {
  const bento_cards = document.querySelectorAll(".bento_card");

  function handleIntersection2(entries) {
    entries.forEach((entry) => {
      entry.target.style.opacity = entry.isIntersecting ? "1" : "0";
    });
  }

  const observer = new IntersectionObserver(handleIntersection2, {
    threshold: 0.7,
  });

  bento_cards.forEach((bento_card) => {
    observer.observe(bento_card);
  });

  const items_for_hover = [
    document.getElementById("bento_project"),
    document.getElementById("bento_project2"),
    document.getElementById("bento_resume"),
    document.getElementById("bento_blog"),
    document.querySelector(".scroll_btn"),
    ...document.querySelectorAll(".now a"),
    ...document.querySelectorAll(".cool_button"),
  ];

  items_for_hover.forEach((item) => {
    item.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    item.addEventListener("mouseout", () => {
      cursorTransformShadowBlend();
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
    });
  });
}
async function setupGithubBento(db) {
  try {
    const token = db.qDtadW_2ZSeiRJtuRTvv;

    // Fetch GitHub repo and user info concurrently
    const [repoResponse, userResponse] = await Promise.all([
      fetch(
        "https://api.github.com/search/repositories?q=user:aryanranderiya&sort=pushed",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ),
      fetch("https://api.github.com/users/aryanranderiya"),
    ]);

    const { items: repos } = await repoResponse.json();
    const userInfo = await userResponse.json();

    // DOM elements for GitHub chips
    const githubRepoChip = document.getElementById("github_repo_chip");
    const githubProfileChip = document.getElementById("github_profile_chip");
    const githubProfileAnchor = document.getElementById(
      "github_profile_anchor"
    );
    const githubPublicRepoChip = document.getElementById(
      "github_public_repo_chip"
    );
    const githubFollowerChip = document.getElementById("github_follower_chip");
    const githubFollowingChip = document.getElementById(
      "github_following_chip"
    );

    // Populate GitHub chips with data
    githubRepoChip.innerHTML = `<i class="fa-solid fa-book-bookmark"></i> ${repos.length} Repos`;
    githubProfileChip.innerHTML = `<img src=${userInfo.avatar_url} width='10px' alt="Github Profile photo"> ${userInfo.login}`;
    githubProfileAnchor.href = userInfo.html_url;
    githubPublicRepoChip.innerHTML = `<i class="fa-solid fa-people-group"></i> ${userInfo.public_repos} Public Repos`;
    githubFollowerChip.innerHTML = `<i class="fa-solid fa-user-plus"></i> ${userInfo.followers} Followers`;
    githubFollowingChip.innerHTML = `<i class="fa-solid fa-user-group"></i> ${userInfo.following} Following`;
  } catch (error) {
    console.error("Error setting up GitHub Bento:", error);
  }
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

  ScrollTrigger.refresh();
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
  const cursoricon3 = document.getElementById("cursoricon3");
  // const cursoriconidea = document.getElementById("cursoriconidea");
  // const cursoriconlaptop = document.getElementById("cursoriconlaptop");
  // const cursoriconpallette = document.getElementById("cursoriconpallette");
  // const span_designer = document.getElementById("span_designer");
  // const span_dev = document.getElementById("span_dev");
  // const span_age = document.getElementById("span_age");
  // const span_entrepreneur = document.getElementById("span_entre");
  const cursoricon2 = document.getElementById("cursoricon2");
  // const subcontent1_text = document.querySelector(".subcontent1_text");
  // ! Scroll on button click

  scrollBtn.addEventListener("click", (e) => {
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
    addClass(cursor, "partially_transparent");
    addClass(cursoricon2, "active");
  });

  title_heading_1.addEventListener("mouseout", () => {
    cursorTransformShadowBlend(undefined, "none");
    removeClass(cursor, "partially_transparent");
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
    const dob = new Date(birthday);
    const month_diff = Date.now() - dob.getTime();
    const age_dt = new Date(month_diff);
    const year = age_dt.getUTCFullYear();
    return Math.abs(year - 1970);
  }

  // span_age.innerHTML = calculateAge("07/27/2005");

  // span_designer.addEventListener("mouseover", () => {
  //   cursorTransformShadowBlend(undefined, "none");
  //   makeInvisible(cursoriconwave);
  //   addClass(cursor, "transparent");
  //   addClass(cursoriconpallette, "active");
  // });

  // span_dev.addEventListener("mouseover", () => {
  //   cursorTransformShadowBlend(undefined, "none");
  //   makeInvisible(cursoriconwave);
  //   addClass(cursor, "transparent");
  //   addClass(cursoriconlaptop, "active");
  // });

  // span_entrepreneur.addEventListener("mouseover", () => {
  //   cursorTransformShadowBlend(undefined, "none");
  //   makeInvisible(cursoriconwave);
  //   addClass(cursor, "transparent");
  //   addClass(cursoriconidea, "active");
  // });

  // span_designer.addEventListener("mouseout", () => {
  //   normalCursorEmojiSpan(cursoriconpallette);
  // });

  // span_dev.addEventListener("mouseout", () => {
  //   normalCursorEmojiSpan(cursoriconlaptop);
  // });

  // span_entrepreneur.addEventListener("mouseout", () => {
  //   normalCursorEmojiSpan(cursoriconidea);
  // });

  // subcontent1.addEventListener("mouseover", () => {
  //   cursorTransformShadowBlend();
  //   addClass(cursor, "transparent");
  //   cursoriconwave.style.opacity = "1";
  //   addClass(cursoriconwave, "active");
  //   removeClass(cursoricon2, "active");
  // });

  // subcontent1.addEventListener("mouseout", () => {
  //   cursorTransformShadowBlend();
  //   cursoriconwave.style.opacity = "0";
  //   removeClass(cursor, "transparent");
  //   removeClass(cursoriconwave, "active");
  // });
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
  document.body.style.overflow = "auto";
  addClass(welcoming, "hide");
  document.querySelector(".my_portfolio").classList.add("show");
  document.querySelector(".aryan_randeriya").classList.add("show");

  cursor.style.mixBlendMode = "normal";
  scrollBtn.style.opacity = "1";
  scrollBtn.style.zIndex = "1";

  setTimeout(() => welcoming.remove(), 1600);
}

async function preloadImage(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Failed to preload image:", error);
    return null;
  }
}

async function setupFeaturedClients(db) {
  const clientsection = document.querySelector(".clientsection");
  let index = 0;

  const featuredClients = db.Homepage_Featured_Clients;
  const projects = db.Projects;

  const projectPromises = featuredClients
    .map((projectId) => {
      return projects[projectId]
        ? { projectId, clientProject: projects[projectId] }
        : null;
    })
    .filter(Boolean);

  const fragment = document.createDocumentFragment();

  // Process each client project
  projectPromises.forEach(({ clientProject, projectId }) => {
    index++;

    const projectImage =
      Array.isArray(clientProject?.project_images) &&
      clientProject.project_images.length > 0
        ? clientProject.project_images
        : [clientProject?.banner_image_URL];

    const imagesArray = Array.isArray(projectImage)
      ? projectImage
      : [projectImage];

    const preloadedImages = imagesArray.map(preloadImage);

    const card = document.createElement("div");
    const topValue = `${index * 45 + 10}px`;
    const smTopValue = `${170}px`;

    card.style.top = window.innerWidth >= 600 ? smTopValue : topValue;
    card.classList.add(
      "sticky",
      "bg-[#00bbff]",
      "outline",
      "outline-[black]",
      "outline-[2px]",
      "rounded-3xl",
      "min-h-fit",
      "sm:min-h-[0vh]",
      "h-fit",
      "w-[95vw]",
      "flex",
      "flex-col",
      "box-border",
      "px-5",
      "py-2",
      "sm:pb-3",
      "pb-[30px]",
      "gap-2",
      "shadow-xl",
      "overflow-hidden",
      "mt-[-70px]"
    );

    // Header with title and link
    const headerDiv = document.createElement("div");
    headerDiv.classList.add(
      "flex",
      "justify-evenly",
      "items-center",
      "w-full",
      "text-black"
    );

    const titleDiv = document.createElement("div");
    titleDiv.classList.add(
      "w-full",
      "text-xl",
      "font-bold",
      "uppercase",
      "text-center"
    );
    titleDiv.textContent = clientProject.project_title;

    const mainProjectLink = clientProject.project_links[0][1];
    if (mainProjectLink) {
      const anchor = document.createElement("a");
      anchor.classList.add(
        "client_anchor",
        "w-fit",
        "h-fit",
        "bg-white",
        "text-black",
        "sm:text-lg",
        "text-md",
        "text-right",
        "font-bold",
        "uppercase",
        "rounded-full",
        "outline",
        "outline-2",
        "py-0",
        "px-5",
        "text-nowrap"
      );
      anchor.textContent = "View";
      anchor.href = mainProjectLink;
      anchor.target = "_blank";

      headerDiv.appendChild(anchor);
      headerDiv.appendChild(titleDiv);

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
    }

    card.appendChild(headerDiv);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("w-full", "flex", "flex-col", "relative");

    const imageContainer1 = document.createElement("div");
    imageContainer1.classList.add("w-full", "flex", "flex-col", "relative");

    // const containerDivTest = document.createElement("div");
    // containerDivTest.classList.add(
    //   "absolute",
    //   "w-full",
    //   "justify-center",
    //   "h-full",
    //   "bottom-0",
    //   "items-center",
    //   "flex",
    //   "sm:text-lg",
    //   "text-sm"
    // );
    // containerDivTest.innerHTML = `<div>${mainProjectLink.replace(
    //   "https://",
    //   ""
    // )}</div>`;

    // const imageheader = document.createElement("img");
    // imageheader.src = "./media/browser.webp";
    // imageheader.alt = "Image Header";
    // imageheader.classList.add(
    //   "rounded-t-xl",
    //   "h-[31px]",
    //   "sm:h-fit",
    //   "object-cover"
    // );
    // imageContainer1.appendChild(containerDivTest);
    // imageContainer1.appendChild(imageheader);

    let currentImageIndex = 0;

    const image = document.createElement("img");
    image.alt = "Project Image 1";
    preloadedImages[0].then((preloadedURL) => {
      image.src = preloadedURL;
    });
    image.classList.add("rounded-xl", "h-fit", "object-contain");

    image.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });

    const imageContainer2 = document.createElement("div");
    imageContainer2.classList.add("w-full", "flex", "flex-col", "relative");
    imageContainer2.appendChild(image);

    contentDiv.appendChild(imageContainer1);
    contentDiv.appendChild(imageContainer2);
    card.appendChild(contentDiv);

    const controlsContainer = document.createElement("div");

    controlsContainer.classList.add(
      // "sm:absolute",
      // "relative",
      // "sm:bottom-[40px]",
      // "sm:bottom-0",
      // "left-0",
      // "w-full",
      imagesArray.length > 1 ? "visible" : "invisible",
      "flex",
      "justify-center",
      "z-[5]",
      "controls_container"
    );

    // Create the button container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add(
      "bg-black",
      "rounded-full",
      // "py-1",
      // "px-1",
      "flex",
      "outline",
      "items-center",
      "gap-3",
      "outline-black"
    );

    // Create the backward button
    const controlBackward = document.createElement("i");
    controlBackward.id = "control_backward";
    controlBackward.classList.add(
      "fa-solid",
      "fa-circle-chevron-left",
      "text-[30px]",
      "text-white"
    );

    // Create the forward button
    const controlForward = document.createElement("i");
    controlForward.id = "control_forward";
    controlForward.classList.add(
      "fa-solid",
      "fa-circle-chevron-right",
      "text-[30px]",
      "text-white"
    );

    // Add event listeners to cycle images on button click
    controlBackward.addEventListener("click", () => {
      if (imagesArray.length <= 1) return;

      currentImageIndex =
        (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
      preloadedImages[currentImageIndex].then((preloadedURL) => {
        image.src = preloadedURL; // Update the image with the preloaded URL
      });
    });

    controlForward.addEventListener("click", () => {
      if (imagesArray.length <= 1) return;

      currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
      preloadedImages[currentImageIndex].then((preloadedURL) => {
        image.src = preloadedURL; // Update the image with the preloaded URL
      });
    });

    [controlBackward, controlForward].forEach((control) => {
      control.addEventListener("mouseover", () => {
        cursorTransformShadowBlend("scale(1.3)", "none");
        addClass(cursor, "transparent");
        addClass(cursoricon5, "active");
      });

      control.addEventListener("mouseout", () => {
        cursorTransformShadowBlend();
        removeClass(cursor, "transparent");
        removeClass(cursoricon5, "active");
      });
    });

    // Append the backward and forward buttons to the button container
    buttonContainer.appendChild(controlBackward);
    buttonContainer.appendChild(controlForward);

    // Append the button container to the controls container
    controlsContainer.appendChild(buttonContainer);

    // card.appendChild(controlsContainer);
    headerDiv.appendChild(controlsContainer);
    fragment.appendChild(card);
    ScrollTrigger.refresh();
  });

  clientsection.appendChild(fragment);

  const clientsection_title = document.querySelector(".clientsection .title");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        clientsection_title.style.transform = entry.isIntersecting
          ? "translateX(100vw)"
          : "translateX(-100vw)";
      });
    },
    { rootMargin: "-400px 0px", threshold: 0.5 }
  );

  observer.observe(clientsection);

  const tl0 = gsap.timeline({
    scrollTrigger: {
      trigger: ".clientsection",
      start: "top-=400 bottom",
      end: "bottom center",
      scrub: true,
    },
  });

  gsap.set(".clientsection .title", {
    x: "20%",
  });
  tl0.to(".clientsection .title", {
    x: "-20%",
  });
  ScrollTrigger.refresh();
}

async function setupTestimonials(db) {
  const testimonialContainer = document.querySelector(".testimonial-container");

  const testimonials = db.Testimonials;

  // Create a DocumentFragment to batch DOM updates
  const fragment = document.createDocumentFragment();

  testimonials.forEach((testimonial, index) => {
    const card = document.createElement("div");
    card.classList.add(
      "transition-colors",
      "rounded-xl",
      "p-[2em]",
      "sm:max-w-[35vw]",
      "sm:min-w-[35vw]",
      "min-w-[100%]",
      "w-[100%]",
      "mb-5",
      "sm:m-5",
      "m-0",
      "box-border",
      "outline",
      "outline-[#ffffff20]",
      "outline-[4px]",
      "flex",
      "flex-col",
      "text-xl"
    );
    card.innerHTML = `
      <div class="sm:text-md text-sm">&#34;${testimonial.text}&#34;</div>
      <div class="mt-6 text-sm flex items-center gap-3">
        <img src="${testimonial.client_image}" class="size-[25px] object-cover rounded-full"/>
        <div class="inline-flex">
          <span class="ogg italic">${testimonial.client}</span> — 
          <span class="opacity-70 ogg italic">${testimonial.position} @ ${testimonial.company}</span>
        </div>
      </div>
    `;

    // Append the card to the fragment instead of directly to the DOM
    fragment.appendChild(card);

    // GSAP animation setup for each testimonial card
    gsap.from(card, {
      opacity: 0,
      x: 300,
      duration: 0.3,
      delay: index * 0.2, // Slight stagger effect
      scrollTrigger: {
        trigger: card,
        start: "top 60%",
        end: "bottom 40%",
        scrub: true,
      },
      onEnter: () => {
        card.style.backgroundColor = "black";
      },
      onLeaveBack: () => {
        card.style.backgroundColor = "black";
      },
      onComplete: () => {
        card.style.backgroundColor = "#00bbff";
      },
    });
  });

  // Append fragment to the DOM
  testimonialContainer.appendChild(fragment);

  // Pinning testimonial section
  gsap.to("#sticky-element", {
    scrollTrigger: {
      trigger: "#sticky-element",
      start: "top-=100 top",
      end: "bottom-=370 top",
      pin: true,
      anticipatePin: true,
      scrub: true,
    },
  });

  // Refresh ScrollTrigger to ensure animations are set up correctly
  ScrollTrigger.refresh();
}

function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function animateTextColor() {
  const text = document.getElementById("scrollText");
  const content = text.textContent;
  const targetPhrase = "Software Developer";

  text.innerHTML = "";
  const fragment = document.createDocumentFragment();

  let i = 0;

  function createSpan(content, classNames, textContent) {
    const span = document.createElement("span");
    span.textContent = textContent;
    span.classList.add(...classNames);
    fragment.appendChild(span);
  }

  while (i < content.length) {
    if (content.substring(i, i + targetPhrase.length) === targetPhrase) {
      createSpan(
        content,
        [
          "bg-gradient-to-r",
          "from-[#00bbff]",
          "to-[#a3e6ff]",
          "text-transparent",
          "font-bold",
          "bg-clip-text",
          "letter",
        ],
        targetPhrase
      );
      i += targetPhrase.length;
    } else if (content.substring(i, i + "year old".length) === "year old") {
      const age = getAge("2005/07/27");
      createSpan(content, ["letter", "text-white"], `${age} year old `);
      i += "year old".length;
    } else {
      createSpan(content, ["letter", "text-white"], content[i]);
      i++;
    }
  }

  text.appendChild(fragment);

  gsap.fromTo(
    ".letter",
    { opacity: 0.1 },
    {
      scrollTrigger: {
        trigger: "#scrollText",
        start: "top-=150 center",
        end: "bottom+=150 center",
        scrub: true,
      },
      opacity: 1,
      stagger: 0.07,
      ease: "power1.out",
    }
  );

  ScrollTrigger.refresh();
}

function createSteps() {
  const steps = [
    {
      title: "Communicate",
      description:
        "I start by discussing your project requirements, goals, and expectations to ensure we’re on the same page and aligned with your vision.",
    },
    {
      title: "Develop",
      description:
        "I build a robust, scalable solution using modern web technologies, carefully tailored to your specific needs.",
    },
    {
      title: "Refine",
      description:
        "I fine-tune the features and optimize the design to ensure everything functions seamlessly and delivers a great user experience.",
    },
    {
      title: "Review",
      description:
        "I work with you to review the final product, gather your feedback, and make any necessary adjustments.",
    },
    {
      title: "Deploy",
      description:
        "I handle the deployment process, ensuring your project is launched smoothly and runs perfectly on your chosen platform.",
    },
  ];

  const container = document.getElementById("steps-container");
  const stepElements = [];
  let zIndex = steps.length + 1;
  steps.forEach((step, index) => {
    const stepElement = document.createElement("div");
    stepElements.push(stepElement);
    stepElement.classList.add(
      "step-element",
      "bg-[#00bbff]",
      "sm:min-w-[20vw]",
      "sm:w-[20vw]",
      "w-screen",
      "py-7",
      "sm:py-0",
      "max-w-screen",
      "sm:max-w-[20vw]",
      "h-full",
      "flex",
      "justify-start",
      "flex-col-reverse",
      "sm:flex-col",
      "border-y-none",
      "transition-colors",
      "backdrop-blur-xl"
    );

    stepElement.style.borderStyle = "solid";
    stepElement.style.borderWidth = "0px 2px";
    stepElement.style.borderColor = "white";

    stepElement.style.zIndex = zIndex;

    zIndex--;

    stepElement.innerHTML = `
      <div class="flex-grow flex flex-col text-white sm:p-5 px-5 gap-2 overflow-hidden text-1 transition-opacity">
        <div class="text-4xl sm:pt-16 font-bold">${step.title}</div>
        <div class="text-xl">${step.description}</div>
      </div>
      <div class="sm:text-[10vw] text-6xl px-5 text-white font-bold text-2 transition-opacity">${String(
        index + 1
      ).padStart(2, "0")}</div>
    `;

    container.appendChild(stepElement);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    gsap.fromTo(
      stepElement,
      { x: isMobile ? `0vw` : `${-(index * 21)}vw` },
      {
        x: "0vw",
        duration: 1,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "center top",
          scrub: 0.1,
        },
      }
    );

    ScrollTrigger.refresh();
  });

  const handleOnUpdate = (self, stepElements, isDesktop) => {
    const progress = self.progress * 100;
    if (progress === 100) return;

    stepElements.forEach((element, index) => {
      const text = element.querySelector(".text-1");
      const text2 = element.querySelector(".text-2");

      element.classList.remove("bg-[#00bbff]");
      element.classList.remove("bg-black/40");
      element.style.borderColor = "#ffffff10";

      text.style.opacity = "10%";
      text2.style.opacity = "10%";

      if (progress >= index * 20 && progress < (index + 1) * 20) {
        element.classList.add("bg-[#00bbff]");

        element.style.borderColor = "white";
        text.style.opacity = "100%";
        text2.style.opacity = "100%";
        return;
      }
      element.classList.add("bg-black/40");
      element.style.borderColor = "#ffffff30";
      text.style.opacity = "10%";
      text2.style.opacity = "10%";
    });
  };

  // Function to create a ScrollTrigger
  const createScrollTrigger = (container, stepElements, isDesktop) => {
    gsap.to(container, {
      scrollTrigger: {
        trigger: container,
        start: isDesktop ? "top top" : "top center",
        end: isDesktop ? "bottom+=120% top" : "bottom center",
        pin: isDesktop,
        scrub: 0.5,
        onUpdate: (self) => handleOnUpdate(self, stepElements, isDesktop),
      },
    });
  };

  // MatchMedia for responsive behavior
  ScrollTrigger.matchMedia({
    "(min-width: 769px)": () => {
      createScrollTrigger(container, stepElements, true); // Enable pin for larger screens
    },
    "(max-width: 768px)": () => {
      createScrollTrigger(container, stepElements, false); // Disable pin for smaller screens
    },
  });

  ScrollTrigger.refresh();
}

function confettiContact() {
  const section = document.querySelector("#section_contact");
  const button = section.querySelector("button");

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const end = Date.now() + 2 * 1000;

        (function frame() {
          confetti({
            particleCount: 5,
            spread: 100,
            angle: 60,
            origin: { y: 0.6, x: 0 },
          });

          confetti({
            particleCount: 2,
            spread: 100,
            angle: 120,
            origin: { y: 0.6, x: 1 },
          });

          if (Date.now() < end) requestAnimationFrame(frame);
        })();

        button.dispatchEvent(new MouseEvent("mouseover"));

        setTimeout(() => {
          button.style.scale = "1.3";
          button.style.rotate = "-5deg";

          setTimeout(() => {
            button.style.scale = "1";
            button.style.rotate = "";
            button.dispatchEvent(new MouseEvent("mouseout"));
          }, 400);
        }, 100);
      });
    },
    {
      root: null,
      threshold: 0.7,
    }
  );

  if (section) observer.observe(section);
}

function animateTitleSection() {
  const section = document.querySelector(".titles");
  gsap.fromTo(
    title_heading_1,
    {
      y: "0vw",
      scale: 1,
      opacity: 1,
    },
    {
      scrollTrigger: {
        trigger: section,
        delay: 2,
        start: "center+=100 center",
        end: "bottom+=100 top",
        scrub: true,
      },
      y: "19vw",
      scale: 0.5,
      ease: "power2.out",
      opacity: 0,
    }
  );
}
