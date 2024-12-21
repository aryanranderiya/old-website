// ! FIREBASE INIT --------------------------------------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import {
  getDatabase,
  ref,
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
const sections = document.querySelectorAll("section");
const scrollbarContainer = document.querySelector(
  ".scrollbar_progress_container_buttons"
);
const progressBar = document.querySelector(".scrollbar_progress");
gsap.registerPlugin(ScrollTrigger);

// let scrollRef = 0;
// window.addEventListener("scroll", function () {
//   if (scrollRef <= 10) scrollRef++;
//   else // ScrollTrigger.refresh();
// });

document.addEventListener("DOMContentLoaded", async () => {
  console.time("processing");

  gsap.registerPlugin(ScrollTrigger);
  // ScrollTrigger.refresh();

  // window.scrollTo(0, 0);

  // document
  //   .querySelector(".words_rotating_span")
  //   .addEventListener("animationend", removeBlackCover);

  setTimeout(() => {
    removeBlackCover();
  }, 1800);

  cursor.style.boxShadow = "none";

  addListeners(scrollBtn);
  // handleAnimationSubcontent1();

  loadNavbar().then(() => {
    handleNavbarIntersection();
  });

  // Firebase references
  const featuredProjects = ref(database, "Homepage_Featured_Projects/");
  const featuredClients = ref(database, "Homepage_Featured_Clients/");
  const services = ref(database, "Services/");
  const testimonials = ref(database, "Testimonials/");
  const nowRef = ref(database, "Now/");

  try {
    const [
      featuredProjectsSnapshot,
      featuredClientsSnapshot,
      servicesSnapshot,
      testimonialsSnapshot,
      nowSnapshot,
    ] = await Promise.all([
      get(featuredProjects),
      get(featuredClients),
      get(services),
      get(testimonials),
      get(nowRef),
    ]);
    setupFeaturedProjects(featuredProjectsSnapshot);
    setupFeaturedClients(featuredClientsSnapshot);
    setupTestimonials(testimonialsSnapshot);
    setupServices(servicesSnapshot);
    setupNowItems(nowSnapshot);
  } catch (error) {
    console.error("Error fetching Firebase data:", error);
  }

  // Other setups
  setupTimeBento();
  setupAnimationLargeText();
  setupGSAPChips();
  setupGithubBento();
  setupBentoAnimation();
  positionNavButtons();
  animateTextColor();

  // modifyScrollBar();
  // positionNavButtons();
  // document.addEventListener("scroll", updateProgressBarandBtn);
  // highlightActiveSection();
  // updateProgressBar();
  // document.addEventListener("scroll", () => {
  // highlightActiveSection();
  // updateProgressBar();
  // });

  window.addEventListener("resize", positionNavButtons);
  console.timeEnd("processing");

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        setTimeout(() => {
          entry.target.style.opacity = entry.isIntersecting ? "1" : "0";
        }, 150);
        console.log(entry.target);
      }),
    { threshold: 0.6 }
  );

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
      iconSpan.classList.add("material-symbols-outlined");
      button.appendChild(iconSpan);

      switch (section.id) {
        case "section0":
          iconSpan.textContent = "public";
          break;
        case "section1":
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
  // const scrollbarContainerParent = document.querySelector(
  //   ".scrollbar_progress_container_parent"
  // );
  // scrollbarContainerParent.addEventListener("mouseover", () => {
  //   cursor.style.transform = "scale(5)";
  //   cursor.style.boxShadow = "none";
  //   cursor.style.outlineWidth = "0px";
  //   addClass(cursortext2, "active");
  //   addClass(cursor, "transparent");
  //   updateProgressBarandBtn();
  // });

  // scrollbarContainerParent.addEventListener("mouseout", () => {
  //   cursor.style.transform = "none";
  //   cursor.style.mixBlendMode = "normal";
  //   cursor.style.boxShadow = "0px 0px 30px white";
  //   removeClass(cursortext2, "active");
  //   removeClass(cursor, "transparent");
  // });

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

function updateProgressBarandBtn() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
  const scrollPercent = `${percentage}%`;

  document
    .querySelector(".scrollbar_progress")
    .style.setProperty("--height", scrollPercent);

  cursortext2.textContent = `${Math.round(percentage)}%`;
}

function setupNowItems(snapshot) {
  const snapshotData = snapshot.val();
  const itemsContainer = document.querySelector(".now_items");
  snapshotData.forEach((nowItem) => {
    const li = document.createElement("li");
    li.textContent = nowItem;
    itemsContainer.appendChild(li);
  });
}

function setupFeaturedProjects(snapshot) {
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

  snapshot.forEach((childSnapshot) => {
    const projectId = childSnapshot.val();
    const key = childSnapshot.key;
    const projectsRef = ref(database, `Projects/${projectId}`);

    get(projectsRef)
      .then((snapshot) => {
        if (!snapshot.exists())
          throw new Error(
            `Snapshot doesn't exist: ${JSON.stringify(snapshot)}`
          );

        const data = snapshot.val();
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
          featuredContainer.insertBefore(
            featuredProject,
            featuredContainer.firstChild
          );
        } else {
          featuredContainer.appendChild(featuredProject);
        }

        let activeComponent = null;

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

        function handleHover(project, data, isEntering) {
          if (isEntering) {
            if (activeComponent && activeComponent !== project)
              handleHover(activeComponent, data, false);
            activeComponent = project;
            hoverCard.style.opacity = "1";
            hoverCard.style.scale = "1";
            hoverCardBtn.href = `Project.html?id=${snapshot.key}`;
            project.href = `Project.html?id=${snapshot.key}`;
            project.style.backgroundColor = "#00bbff";
            hoverCardDesc.innerText = data.project_short_description;
            hoverCardDesc.style.opacity = "1";
            hoverCardBtn.style.opacity = "1";
            cursorTransformShadowBlend("scale(1.3)", "none");
            addClass(cursor, "transparent");
            addClass(cursoricon5, "active");
            return;
          }
          hoverCard.style.opacity = "0";
          hoverCard.style.scale = "0";
          hoverCardDesc.style.opacity = "0";
          hoverCardBtn.style.opacity = "0";
          project.style.backgroundColor = "";
          cursorTransformShadowBlend();
          removeClass(cursor, "transparent");
          removeClass(cursoricon5, "active");
          activeComponent = null;
        }
      })
      .catch((error) => console.error("Error getting data: ", error));
  });
}

function setupServices(snapshot) {
  const servicesContainer = document.querySelector(".services");

  snapshot.forEach((childSnapshot) => {
    const service = childSnapshot.val();
    const index = parseInt(childSnapshot.key) + 1;
    const serviceElement = document.createElement("div");
    serviceElement.classList.add("service");
    serviceElement.innerHTML = `
      <span class="service_number">${index.toString().padStart(2, "0")}</span>
      <span class="service_name">${service}</span>
    `;
    servicesContainer.appendChild(serviceElement);
  });

  gsap.registerPlugin(ScrollTrigger);

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
}

function setupAnimationLargeText() {
  gsap.registerPlugin(ScrollTrigger);

  const tl0 = gsap.timeline({
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

  const tl1 = gsap.timeline({
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

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".large_text:nth-child(2)",
      start: "center-=100 center",
      end: "bottom center",
      scrub: true,
    },
  });
  gsap.set(".large_text:nth-child(3)", { x: "100%" });
  tl2.to(".large_text:nth-child(3)", { x: "0%" });

  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".large_text:nth-child(3)",
      start: "center-=100 center",
      end: "bottom center",
      scrub: true,
    },
  });
  gsap.set(".large_text:nth-child(4)", { x: "-100%" });
  tl3.to(".large_text:nth-child(4)", { x: "0%" });

  // // Timeline for the emojis animation
  // const tlEmoji1 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".large_text:nth-child(1)",
  //     start: "top-=200 center",
  //     end: "bottom center",
  //     scrub: true,
  //   },
  // });
  // gsap.set(".emoji1 img", {
  //   x: "-100%", // Initial position 1000px to the right
  // });

  // tlEmoji1.to(".emoji1 img", {
  //   x: "0%", // Move to original position
  //   duration: 3,
  // });

  // const tlEmoji2 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".large_text:nth-child(2)",
  //     start: "center-=100 center",
  //     end: "bottom center",
  //     scrub: true,
  //   },
  // });
  // gsap.set(".emoji2 img", { x: "-200%" });
  // tlEmoji2.to(".emoji2 img", {
  //   x: "0%",
  //   duration: 6, // Make it slower
  // });

  // const tlEmoji3 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".large_text:nth-child(3)",
  //     start: "center-=100 center",
  //     end: "bottom center",
  //     scrub: true,
  //   },
  // });
  // gsap.set(".emoji3 img", { x: "100%" });
  // tlEmoji3.to(".emoji3 img", {
  //   x: "0%",
  //   duration: 3, // Slower animation for emoji 3
  // });

  // const tlEmoji4 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".large_text:nth-child(4)",
  //     start: "center-=100 center",
  //     end: "bottom center",
  //     scrub: true,
  //   },
  // });
  // gsap.set(".emoji4 img", { x: "-100%" });
  // tlEmoji4.to(".emoji4 img", {
  //   x: "0%",
  //   duration: 3, // Make it slower
  // });

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

    gsap.to(tween, {
      timeScale: isScrollingDown ? 1 : -1,
    });

    currentScroll = window.pageYOffset;
  });

  // ScrollTrigger.refresh();
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

  const bento_project = document.getElementById("bento_project");
  const bento_project2 = document.getElementById("bento_project2");
  const bento_resume = document.getElementById("bento_resume");
  const bento_blog = document.getElementById("bento_blog");
  const now_anchor = document.querySelectorAll(".now a");

  const bentos = [bento_project, bento_project2, bento_resume, bento_blog];

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
  try {
    const qDtadW_2ZSeiRJtuRTvv = ref(database, "qDtadW_2ZSeiRJtuRTvv/");
    const snapshot = await get(qDtadW_2ZSeiRJtuRTvv);
    const token = snapshot.val();

    const [repoResponse, userResponse] = await Promise.all([
      fetch(
        "https://api.github.com/search/repositories?q=user:aryanranderiya&sort=pushed",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ),
      fetch("https://api.github.com/users/aryanranderiya"),
    ]);

    const repoObj = await repoResponse.json();
    const userInfo = await userResponse.json();

    document.getElementById(
      "github_repo_chip"
    ).innerHTML = `<i class="fa-solid fa-book-bookmark"></i>${repoObj.items.length} Repos`;
    document.getElementById(
      "github_profile_chip"
    ).innerHTML = `<img src=${userInfo.avatar_url} width='10px' alt="Github Profile photo"> ${userInfo.login}`;
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

function setupFeaturedClients(snapshot) {
  gsap.registerPlugin(ScrollTrigger);

  const clientsection = document.querySelector(".clientsection");
  let index = 0;

  snapshot.forEach((childSnapshot) => {
    const projectId = childSnapshot.val();
    const projectsRef = ref(database, `Projects/${projectId}`);

    get(projectsRef)
      .then((innerSnapshot) => {
        if (!innerSnapshot.exists()) {
          throw new Error(
            `Snapshot doesn't exist: ${JSON.stringify(innerSnapshot)}`
          );
        }

        index++;
        const clientProject = innerSnapshot.val();

        // Check for project images, fallback to banner image if not an array or if it's empty
        const projectImage =
          Array.isArray(clientProject?.project_images) &&
          clientProject.project_images.length > 0
            ? clientProject.project_images
            : [clientProject?.banner_image_URL]; // Ensure it becomes an array if not

        // If projectImage is not an array, we make sure it's a single image array
        const imagesArray = Array.isArray(projectImage)
          ? projectImage
          : [projectImage];

        // Preload images and store their object URLs
        const preloadedImages = imagesArray.map(preloadImage);

        const card = document.createElement("div");
        const topValue = `${index * 55 + 80}px`;
        const smTopValue = `${index * 55 + 170}px`;

        // // Compute the class names based on the dynamic values
        // const topClass = `top-[${topValue}]`;
        // const smTopClass = `sm:top-[${smTopValue}]`; // Minimum width 600px, pc

        if (window.innerWidth >= 600) card.style.top = smTopValue;
        else card.style.top = topValue;

        card.classList.add(
          "sticky",
          "bg-[#00bbff]",
          "outline",
          "outline-[black]",
          "rounded-3xl",
          "min-h-fit",
          "sm:min-h-[70vh]",
          "h-fit",
          "max-h-[20vh]",
          "w-[95vw]",
          "flex",
          "flex-col",
          "box-border",
          "sm:px-8",
          "px-5",
          "py-3",
          "sm:pb-3",
          "pb-[30px]",
          "gap-3",
          "shadow-xl",
          "overflow-hidden",
          "mt-[-70px]"
        );

        // Header with title and link
        const headerDiv = document.createElement("div");
        headerDiv.classList.add(
          "flex",
          "justify-between",
          "items-center",
          "w-full",
          "text-black"
        );

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("w-full", "text-xl", "font-bold", "uppercase");
        titleDiv.textContent = clientProject.project_title;
        headerDiv.appendChild(titleDiv);

        const mainProjectLink = clientProject.project_links[0][1];
        if (mainProjectLink) {
          const linkDiv = document.createElement("div");
          linkDiv.classList.add(
            "w-fit",
            "h-fit",
            "bg-white",
            "text-black",
            "text-xl",
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
          linkDiv.textContent = "View Project";
          linkDiv.onclick = () => window.open(mainProjectLink, "_blank");

          headerDiv.appendChild(linkDiv);
        }

        card.appendChild(headerDiv);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("w-full", "flex", "flex-col", "relative");

        const imageContainer1 = document.createElement("div");
        imageContainer1.classList.add("w-full", "flex", "flex-col", "relative");

        const imageContainer2 = document.createElement("div");
        imageContainer2.classList.add("w-full", "flex", "flex-col", "relative");

        const containerDivTest = document.createElement("div");
        containerDivTest.classList.add(
          "absolute",
          "w-full",
          "justify-center",
          "h-full",
          "bottom-0",
          "items-center",
          "flex",
          "sm:text-md",
          "text-sm"
        );
        containerDivTest.innerHTML = `<div>${mainProjectLink.replace(
          "https://",
          ""
        )}</div>`;
        const subDescriptionDiv = document.createElement("div");
        subDescriptionDiv.textContent = clientProject.subDescription;

        const imageheader = document.createElement("img");
        imageheader.src = "./media/browser.avif";
        imageheader.alt = "Image Header";
        imageheader.classList.add(
          "rounded-t-xl",
          "h-[31px]",
          "sm:h-fit",
          "object-cover"
        );
        imageContainer1.appendChild(containerDivTest);
        imageContainer1.appendChild(imageheader);

        let currentImageIndex = 0; // Track the current image index for this project

        // Create an image element for the project and set the src to the preloaded image URL
        const image = document.createElement("img");
        image.alt = "Project Image 1";
        preloadedImages[0].then((preloadedURL) => {
          image.src = preloadedURL; // Set the preloaded image URL as the source
        });
        image.classList.add(
          "rounded-b-xl",
          "h-fit",
          "sm:min-h-[60vh]",
          "sm:h-[60vh]",
          "object-cover"
        );
        imageContainer2.appendChild(image);

        contentDiv.appendChild(imageContainer1);
        contentDiv.appendChild(imageContainer2);
        card.appendChild(contentDiv);

        if (imagesArray.length > 1) {
          const controlsContainer = document.createElement("div");
          controlsContainer.classList.add(
            "sm:absolute",
            "relative",
            "sm:bottom-[40px]",
            "sm:bottom-0",
            "left-0",
            "w-full",
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
            "py-1",
            "px-1",
            "flex",
            "outline",
            "items-center",
            "gap-3",
            "outline-white"
          );

          // Create the backward button
          const controlBackward = document.createElement("i");
          controlBackward.id = "control_backward";
          controlBackward.classList.add(
            "fa-solid",
            "fa-circle-chevron-left",
            "text-[40px]",
            "text-white"
          );

          // Create the forward button
          const controlForward = document.createElement("i");
          controlForward.id = "control_forward";
          controlForward.classList.add(
            "fa-solid",
            "fa-circle-chevron-right",
            "text-[40px]",
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

          // Append the backward and forward buttons to the button container
          buttonContainer.appendChild(controlBackward);
          buttonContainer.appendChild(controlForward);

          // Append the button container to the controls container
          controlsContainer.appendChild(buttonContainer);

          card.appendChild(controlsContainer);
        }
        clientsection.appendChild(card);

        // const clientsection_title = document.querySelector(
        //   ".clientsection .title"
        // );

        // const observer = new IntersectionObserver(
        //   (entries, observer) => {
        //     entries.forEach((entry) => {
        //       if (entry.isIntersecting) {
        //         clientsection_title.style.transform = "translateX(100vw)";
        //         // gsap.set(clientsection_title, { x: "100vw" });
        //         // gsap.to(clientsection_title, { x: "-5vw", duration: 1 });
        //         // observer.unobserve(entry.target);
        //       } else {
        //         clientsection_title.style.transform = "translateX(-100vw)";
        //       }
        //     });
        //   },
        //   { rootMargin: "-400px 0px", threshold: 0.5 }
        // );

        // observer.observe(clientsection);
        // const tl0 = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: ".clientsection",
        //     start: "top-=400 bottom",
        //     end: "bottom center",
        //     scrub: true,
        //     markers: true,
        //   },
        // });

        // gsap.set(".clientsection .title", {
        //   x: "20%",
        // });
        // tl0.to(".clientsection .title", {
        //   x: "-20%",
        // });
        ScrollTrigger.refresh();
      })
      .catch((e) =>
        console.log("Could not get projects ref data for featured clients", e)
      );
  });
}

function setupTestimonials(snapshot) {
  gsap.registerPlugin(ScrollTrigger);

  const testimonialContainer = document.querySelector(".testimonial-container");
  gsap.to("#sticky-element", {
    scrollTrigger: {
      trigger: "#sticky-element", // Pin the element when it reaches the top of the viewport
      start: "top-=100 top", // Start when the top of the element reaches the top of the viewport
      end: "bottom-=370 top", // End when the bottom of the element reaches the top of the viewport
      pin: true, // Pin the element during scroll
      scrub: true, // Sync animation with scrolling
    },
  });

  snapshot.forEach((childSnapshot) => {
    const testimonial = childSnapshot.val();
    const index = childSnapshot.key;
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
      "flex",
      "flex-col",
      "text-xl"
    );
    card.innerHTML = `
      <div class="italic sm:text-md text-sm">${testimonial.text}</div>
      <div class="inline-block mt-6 text-sm">
        <span class="">${testimonial.client}</span> —
        <span class="opacity-70">${testimonial.position} @ ${testimonial.company}</span>
      </div>
    `;
    testimonialContainer.appendChild(card);

    gsap.from(card, {
      opacity: 0, // Fade in effect
      x: 300, // Start the animation from 500px to the right
      y: 0, // No vertical movement, or adjust as needed
      duration: 0.3, // Duration of the animation
      delay: index * 1, // Staggered animation
      scrollTrigger: {
        trigger: card,
        start: "top 50%", // When the top of the card is 90% from the top of the viewport
        end: "bottom 50%", // When the bottom of the card is 10% from the top of the viewport
        scrub: true, // Synchronize animation with scroll
      },
      onEnter: () => {
        card.style.backgroundColor = "black"; // Change background color to blue when card is in view
      },
      onLeaveBack: () => {
        card.style.backgroundColor = "black"; // Reset background color when the card scrolls out of view
      },
      onComplete: () => {
        // This is triggered after the animation is completed
        card.style.backgroundColor = "#00bbff"; // Change the background color
      },
    });
  });

  // ScrollTrigger.refresh();
}

// Function to animate each letter individually
function animateTextColor() {
  // ScrollTrigger.refresh();

  const text = document.getElementById("scrollText");
  const letters = text.textContent.split("");

  text.innerHTML = ""; // Clear existing content

  // Wrap each letter in a span with a specific class for targeting
  letters.forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.classList.add("letter"); // Adding a specific class for each letter
    text.appendChild(span);
  });

  // Use GSAP to animate each letter's color as the user scrolls
  gsap.fromTo(
    ".letter", // Use the specific class here
    {
      color: "#ffffff10", // Start with transparent color
    },
    {
      scrollTrigger: {
        trigger: "#scrollText", // Trigger based on the text element
        start: "top bottom", // Start when the element is in the center of the viewport
        end: "bottom center", // End when the element is out of the viewport
        scrub: true,
        // markers: true,
      },
      color: "white", // Change the text color to white
      stagger: 0.01, // Add stagger effect for individual letters
      ease: "none", // No easing
    }
  );
}
