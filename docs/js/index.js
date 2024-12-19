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
const sections = document.querySelectorAll("section");
const scrollbarContainer = document.querySelector(
  ".scrollbar_progress_container_buttons"
);
const progressBar = document.querySelector(".scrollbar_progress");

window.onload = function () {};

document.addEventListener("DOMContentLoaded", () => {
  // window.scrollTo(0, 0);

  // document
  //   .querySelector(".words_rotating_span")
  //   .addEventListener("animationend", removeBlackCover);

  setTimeout(() => {
    removeBlackCover();
  }, 1800);

  cursor.style.boxShadow = "none";

  addListeners(scrollBtn);
  handleAnimationSubcontent1();

  loadNavbar().then(() => {
    handleNavbarIntersection();
  });

  setupTimeBento();

  setupAnimationLargeText();
  setupTestimonials();
  setupGSAPChips();

  // Horizontal Scroll
  // setupFeaturedProjects();

  const featuredRef = ref(database, "Featured/");
  const nowRef = ref(database, "Now/");
  onValue(featuredRef, setupFeaturedProjects);
  onValue(nowRef, setupNowItems);

  setupServices();
  clientProjectsSetup();

  setupGithubBento();
  setupBentoAnimation();
  // modifyScrollBar();
  // positionNavButtons();
  // document.addEventListener("scroll", updateProgressBarandBtn);

  positionNavButtons();
  // highlightActiveSection();
  // updateProgressBar();
  document.addEventListener("scroll", () => {
    // highlightActiveSection();
    // updateProgressBar();
  });

  window.addEventListener("resize", positionNavButtons);
});

function updateProgressBar() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

  progressBar.style.setProperty("--height", `${percentage}%`);
}

function positionNavButtons() {
  const scrollbarContainer = document.querySelector(
    ".scrollbar_progress_container_buttons"
  );
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
// function modifyScrollBar() {
//   // const scrollbarContainerParent = document.querySelector(
//   //   ".scrollbar_progress_container_parent"
//   // );
//   // scrollbarContainerParent.addEventListener("mouseover", () => {
//   //   cursor.style.transform = "scale(5)";
//   //   cursor.style.boxShadow = "none";
//   //   cursor.style.outlineWidth = "0px";
//   //   addClass(cursortext2, "active");
//   //   addClass(cursor, "transparent");
//   //   updateProgressBarandBtn();
//   // });

//   // scrollbarContainerParent.addEventListener("mouseout", () => {
//   //   cursor.style.transform = "none";
//   //   cursor.style.mixBlendMode = "normal";
//   //   cursor.style.boxShadow = "0px 0px 30px white";
//   //   removeClass(cursortext2, "active");
//   //   removeClass(cursor, "transparent");
//   // });

//   const navIcons = document.querySelectorAll(".nav-icon");

//   navIcons.forEach((icon) => {
//     icon.addEventListener("click", () => {
//       const target = document.querySelector(icon.getAttribute("data-target"));
//       target.scrollIntoView({ behavior: "smooth" });
//     });

//     icon.addEventListener("mouseover", () => {
//       cursorTransformShadowBlend("scale(1.3)", "none");
//       addClass(cursor, "transparent");
//       addClass(cursoricon5, "active");
//     });

//     icon.addEventListener("mouseout", () => {
//       cursorTransformShadowBlend();
//       removeClass(cursor, "transparent");
//       removeClass(cursoricon5, "active");
//     });
//   });
// }

// function updateProgressBarandBtn() {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//   const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
//   const scrollPercent = percentage + "%";

//   document
//     .querySelector(".scrollbar_progress")
//     .style.setProperty("--height", scrollPercent);

//   cursortext2.textContent = Math.round(percentage) + "%";
// }

// function positionNavButtons() {
//   const sections = document.querySelectorAll("section");
//   const buttonsContainer = document.querySelector(
//     ".scrollbar_progress_container_buttons"
//   );
//   const totalHeight =
//     document.documentElement.scrollHeight - window.innerHeight;

//   sections.forEach((section, index) => {
//     const sectionTop = section.offsetTop;
//     const button = buttonsContainer.querySelector(
//       `[data-target="#${section.id}"]`
//     );

//     // Calculate the percentage position of the section relative to the page height
//     const buttonPosition = (sectionTop / totalHeight) * 100;

//     // Position the button using a custom CSS property
//     button.style.position = "absolute";
//     button.style.top = `${buttonPosition}%`;
//   });
// }

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
  const featured_container = document.querySelector(".featured_projects");
  const hover_card = document.querySelector(".featured_project_hover_card");
  const hover_card_btn = hover_card.querySelector(
    ".featured_project_hover_card_btn"
  );
  const hover_card_desc = hover_card.querySelector(
    ".featured_project_hover_card_description"
  );

  const hover_text = document.querySelector(".hover_text_featured_project");
  hover_card.style.width = "300px";
  hover_card.style.height = "200px";
  hover_card.style.borderRadius = "20px";
  hover_card.style.backgroundColor = "#00bbff";

  snapshot.forEach((childSnapshot) => {
    const projectId = childSnapshot.val();
    const key = childSnapshot.key;
    const projectsRef = ref(database, `Projects/${projectId}`);

    get(projectsRef)
      .then((snapshot) => {
        if (!snapshot.exists())
          throw new Error("Snapshot doesnt exist: " + JSON.stringify(snapshot));

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

        leave();
        // featured_project.addEventListener("mouseover", enter);
        // featured_project.addEventListener("mouseout", leave);

        // GSAP ScrollTrigger for hover effect when element is in view
        let activeComponent = null; // Track the currently active component

        gsap.to(featured_project, {
          scrollTrigger: {
            trigger: featured_project,
            start: "top+=10 center", // Trigger when the top of the element reaches the center of the viewport
            end: "bottom center", // Trigger when the bottom of the element reaches the center of the viewport
            markers: true,
            onEnter: () => {
              if (activeComponent && activeComponent !== featured_project) {
                leave(activeComponent); // Deactivate the previous component's hover
              }
              activeComponent = featured_project; // Set the new active component
              enter(featured_project, data);
            },
            onLeave: () => {
              if (activeComponent === featured_project) {
                leave(featured_project);
                activeComponent = null; // Reset the active component when leaving
              }
            },
            onEnterBack: () => {
              if (activeComponent && activeComponent !== featured_project) {
                leave(activeComponent); // Deactivate the previous component's hover
              }
              activeComponent = featured_project;
              enter(featured_project, data);
            },
            onLeaveBack: () => {
              if (activeComponent === featured_project) {
                leave(featured_project);
                activeComponent = null; // Reset the active component when leaving
              }
            },
          },
        });

        function enter() {
          hover_card.style.opacity = "1";
          hover_card.style.scale = "1";
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
          hover_card.style.opacity = "0";
          hover_card.style.scale = "0";
          hover_card_desc.style.opacity = "0";
          hover_card_btn.style.opacity = "0";
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
        start: "top+=100 bottom", // Start point of the animation
        end: "bottom top", // You can define an end point if needed
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
        start: "top+=300 bottom", // Start point of the animation
        end: "bottom-=300 top", // You can define an end point if needed
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

  // Timeline for the text animation
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

  // Timeline for the emojis animation
  let tlEmoji1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".large_text:nth-child(1)",
      start: "top-=200 center",
      end: "bottom center",
      scrub: true,
    },
  });
  gsap.set(".emoji1 img", {
    x: "-100%", // Initial position 1000px to the right
  });

  tlEmoji1.to(".emoji1 img", {
    x: "0%", // Move to original position
    duration: 3,
  });

  let tlEmoji2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".large_text:nth-child(2)",
      start: "center-=100 center",
      end: "bottom center",
      scrub: true,
    },
  });
  gsap.set(".emoji2 img", { x: "-200%" });
  tlEmoji2.to(".emoji2 img", {
    x: "0%",
    duration: 6, // Make it slower
  });

  let tlEmoji3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".large_text:nth-child(3)",
      start: "center-=100 center",
      end: "bottom center",
      scrub: true,
    },
  });
  gsap.set(".emoji3 img", { x: "100%" });
  tlEmoji3.to(".emoji3 img", {
    x: "0%",
    duration: 3, // Slower animation for emoji 3
  });

  let tlEmoji4 = gsap.timeline({
    scrollTrigger: {
      trigger: ".large_text:nth-child(4)",
      start: "center-=100 center",
      end: "bottom center",
      scrub: true,
    },
  });
  gsap.set(".emoji4 img", { x: "-100%" });
  tlEmoji4.to(".emoji4 img", {
    x: "0%",
    duration: 3, // Make it slower
  });

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
  const bento_blog = document.getElementById("bento_blog");
  const now_anchor = document.querySelectorAll(".now a");

  let bentos = [bento_project, bento_project2, bento_resume, bento_blog];

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
  document.body.style.overflow = "auto";
  addClass(welcoming, "hide");
  document.querySelector(".my_portfolio").classList.add("show");
  document.querySelector(".aryan_randeriya").classList.add("show");

  cursor.style.mixBlendMode = "normal";
  scrollBtn.style.opacity = "1";
  scrollBtn.style.zIndex = "1";

  setTimeout(() => welcoming.remove(), 1600);
}

const clientProjects = [
  {
    title: "Rezrek",
    description:
      "Built a content-driven (similar to Instagram & Pinterest) e-commerce marketplace MVP from scratch",
    subDescription: "May 2024 - Present",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/aryanranderiya-portfolio.appspot.com/o/ClientWork%2Frezrekss.webp?alt=media&token=67b6e308-da51-407b-8dee-bb1b8115a53d",
      // Add more images for this project if needed
    ],
    anchorText: "rezrek.com",
    link: "https://rezrek.com",
  },
  {
    title: "LyfeLane",
    description:
      "Solely built a Greeting Card creation platform with features similar to Canva.",
    subDescription: "September 2024",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/aryanranderiya-portfolio.appspot.com/o/ClientWork%2Flyfelanecollage.webp?alt=media&token=56684174-0ef3-4eae-8a66-6a5057e553f3",
      // Add more images for this project if needed
    ],
    link: "https://lyfelane.com",
    anchorText: "lyfelane.com",
  },
  {
    title: "Encode",
    description:
      "Led the development of the official website of Encode - The CS Club of PDEU and worked on the homepage of the website",
    subDescription: "August 2024",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/aryanranderiya-portfolio.appspot.com/o/ClientWork%2Fencodecollage.webp?alt=media&token=372af36d-dfe0-4e46-b294-58a1b8a7696c",
      "https://private-user-images.githubusercontent.com/64796509/360076622-a79e8fa9-2b42-4496-99fa-9c86b8cc58e3.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ1NTg4MjQsIm5iZiI6MTczNDU1ODUyNCwicGF0aCI6Ii82NDc5NjUwOS8zNjAwNzY2MjItYTc5ZThmYTktMmI0Mi00NDk2LTk5ZmEtOWM4NmI4Y2M1OGUzLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjE4VDIxNDg0NFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTU0YTM2N2M2MTA0NWIwM2M4ZDU5OTg2MjliZTk4N2ViYTYzMTkxNzkxODgyY2RmNjEyMDA4ZTE3OTFhZDg4Y2QmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.stbFkWpSHDHm8iIWNIVALPvFP6JtdrBcc-zfmEyhk_8",
      "https://private-user-images.githubusercontent.com/64796509/360076613-3e60af31-6b4f-47f1-b881-97b7e2c4c5be.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ1NTg4MjQsIm5iZiI6MTczNDU1ODUyNCwicGF0aCI6Ii82NDc5NjUwOS8zNjAwNzY2MTMtM2U2MGFmMzEtNmI0Zi00N2YxLWI4ODEtOTdiN2UyYzRjNWJlLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjE4VDIxNDg0NFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTIzNmQ1ZjEyNTM1YzI4MTA5NjJjY2QyMjMyNTQ3YjE5ZjIyNzYwY2RiZDRiY2ZjMWEwNmZkZmY3MWE4YTgzZDYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.ty4LAUn7t9747kMQ628E3M1_nFc1N_49ljLibN-Blq0",
    ],
    link: "https://encodepdeu.vercel.app",
    anchorText: "encodepdeu.vercel.app",
  },
  {
    title: "Move With Intention",
    description:
      "Developed frontend & backend for the official MWI brand website.",
    subDescription: "August 2024 - Present",
    images: [
      "https://i.ibb.co/Pw1WBDC/Capture.png",
      "https://firebasestorage.googleapis.com/v0/b/aryanranderiya-portfolio.appspot.com/o/ClientWork%2Fmwicollage.webp?alt=media&token=a82d1103-c61a-4624-8ce9-3b9826fc7e75",
    ],
    link: "https://mwi.gg",
    anchorText: "mwi.gg",
  },
  {
    title: "Blink Analytics",
    description: "Developed website for Blink Analytics.",
    subDescription: "August 2024 - Present",
    images: ["https://i.ibb.co/QYWH5xK/Capture.png"],
    link: "https://blinkanalytics.com",
    anchorText: "blinkanalytics.com",
  },
];

function prefetchImages() {
  clientProjects.forEach((project) => {
    const img = new Image();
    img.src = project.image; // Set the source to start loading the image
    img.style.display = "none"; // Hide the image so it doesn't affect layout
    document.body.appendChild(img); // Append it to the DOM to trigger caching
  });
}

// function clientProjectsSetup() {
//   prefetchImages();

//   let currentProjectIndex = 0;
//   let currentImageIndex = 0;

//   // Select elements
//   const clientsection = document.querySelector(".clientsection");
//   const titleElement = document.querySelector(".clientsection .title");

//   const anchorTag = document.querySelector(".clientsection .description a");
//   const descriptionElement = document.querySelector(
//     ".clientsection .description"
//   );
//   const imageElement = document.querySelector(".clientsection img");

//   const buttonsDiv = document.querySelector(".buttons_div"); // Define buttons container
//   const projectTitlesContainer = document.querySelector(".projectitles"); // The container for the project titles

//   // Dynamically map project titles
//   clientProjects.forEach((project, index) => {
//     // const projectTitleDiv = document.createElement("div");
//     // projectTitleDiv.classList.add("project-title");
//     // projectTitleDiv.textContent = project.title;
//     // projectTitlesContainer.appendChild(projectTitleDiv);
//     //   projectTitleDiv.addEventListener("click", () => {
//     //     currentProjectIndex = index;
//     //     currentImageIndex = 0; // Reset to the first image
//     //     updateProject();
//     //     // Remove highlight from all titles
//     //     const allProjectTitles = document.querySelectorAll(".project-title");
//     //     allProjectTitles.forEach((title) =>
//     //       title.classList.remove("highlighted")
//     //     );
//     //     // Highlight the selected title
//     //     projectTitleDiv.classList.add("highlighted");
//     //   });
//   });

//   // Update project content
//   function updateProject() {
//     const currentProject = clientProjects[currentProjectIndex];
//     titleElement.textContent = currentProject.title;
//     descriptionElement.textContent = currentProject.description;
//     anchorTag.innerHTML = `${
//       currentProject.anchorText || "View Project"
//     } <span class="material-symbols-outlined">arrow_outward</span>`;
//     anchorTag.href = currentProject.link || "#";
//     imageElement.src = currentProject.images[currentImageIndex];

//     // Hide buttons if there's only one image
//     buttonsDiv.style.display =
//       currentProject.images.length <= 1 ? "none" : "flex";
//   }

//   // // Change to the next image
//   // function goToNextImage() {
//   //   const currentProject = clientProjects[currentProjectIndex];
//   //   currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
//   //   updateProject();
//   // }

//   // // Change to the previous image
//   // function goToPreviousImage() {
//   //   const currentProject = clientProjects[currentProjectIndex];
//   //   currentImageIndex =
//   //     (currentImageIndex - 1 + currentProject.images.length) %
//   //     currentProject.images.length;
//   //   updateProject();
//   // }

//   // // Event listeners for next/previous buttons
//   // const nextButton = document.querySelector(".clientsection .next-button");
//   // const prevButton = document.querySelector(".clientsection .prev-button");

//   // nextButton.addEventListener("click", goToNextImage);
//   // prevButton.addEventListener("click", goToPreviousImage);

//   // // Set initial content
//   // updateProject();
// }

function clientProjectsSetup() {
  const container = document.querySelector(".clientsection");

  clientProjects.forEach((project, index) => {
    // Create the outer div for the project card
    const card = document.createElement("div");
    card.classList.add(
      "sticky",
      `top-[${index * 55 + 200}px]`,
      // `bg-[${index % 2 == 0 ? "#00000090" : "#00bbff"}]`,
      // "bg-black",
      "bg-[#00bbff]",
      // "bg-opacity-70",
      // "backdrop-blur-3xl",
      "outline",
      // "outline-[#00bbff]",
      "outline-[black]",
      "rounded-3xl",
      "h-fit",
      "w-[95vw]",
      "flex",
      "flex-col",
      "box-border",
      "px-8",
      "py-3",
      "gap-4",
      "shadow-xl",
      "overflow-hidden",
      "mt-[-70px]"
    );

    // Header with title and link
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("flex", "justify-between", "w-full", "text-black");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("w-full", "text-xl", "font-bold", "uppercase");
    titleDiv.textContent = project.title;

    const linkDiv = document.createElement("div");
    linkDiv.classList.add(
      "w-fit",
      // "text-white",
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
    linkDiv.onclick = () => window.open(project.link, "_blank");

    headerDiv.appendChild(titleDiv);
    headerDiv.appendChild(linkDiv);

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
      "flex"
    );
    containerDivTest.innerHTML = `<div>${project.anchorText}</div>`;
    const subDescriptionDiv = document.createElement("div");
    subDescriptionDiv.textContent = project.subDescription;

    const imageheader = document.createElement("img");
    imageheader.src = "./media/browser.avif";
    imageheader.alt = "Image Header";

    const image = document.createElement("img");
    image.src = project.images[0];
    image.alt = "Project Image 1";
    imageContainer1.appendChild(containerDivTest);
    imageContainer1.appendChild(imageheader);
    imageContainer2.appendChild(image);

    contentDiv.appendChild(imageContainer1);
    contentDiv.appendChild(imageContainer2);
    card.appendChild(contentDiv);
    container.appendChild(card);
  });

  let tl0 = gsap.timeline({
    scrollTrigger: {
      trigger: ".clientsection",
      start: "top-=400 bottom",
      end: "bottom center",
      scrub: true,
    },
  });

  gsap.set(".clientsection .title", {
    x: "60%",
  });
  tl0.to(".clientsection .title", {
    x: "-5%",
  });
}

function setupTestimonials() {
  const testimonials = [
    {
      text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates laudantium expedita maiores magni excepturi?"`,
      client: "Khevna Gandhi",
      position: "Founder",
      company: "Rezrek.com",
    },
    {
      text: `"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium?"`,
      client: "Aditya Gandhi",
      position: "Founder",
      company: "Rezrek.com",
    },
    {
      text: `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates laudantium expedita maiores magni excepturi?"`,
      client: "Client Name 1",
      position: "Position 1",
      company: "Company 1",
    },
    {
      text: `"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium?"`,
      client: "Client Name 2",
      position: "Position 2",
      company: "Company 2",
    },
    {
      text: `"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?"`,
      client: "Client Name 3",
      position: "Position 3",
      company: "Company 3",
    },
    {
      text: `"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum?"`,
      client: "Client Name 4",
      position: "Position 4",
      company: "Company 4",
    },
  ];

  const testimonialContainer = document.querySelector(".testimonial-container");

  // Create and append testimonial cards
  testimonials.forEach((testimonial) => {
    const card = document.createElement("div");
    card.classList.add(
      "testimonial-card",
      "transition-colors",
      "rounded-xl",
      "p-[2em]",
      "max-w-[35vw]",
      "min-w-[35vw]",
      "mb-5",
      "flex",
      "flex-col",
      "text-xl"
    );
    card.innerHTML = `
      <div class="italic">${testimonial.text}</div>
      <div class="inline-block mt-6 text-sm">
        <span class="">${testimonial.client}</span> —
        <span class="opacity-70">${testimonial.position} @ ${testimonial.company}</span>
      </div>
    `;
    testimonialContainer.appendChild(card);
  });

  gsap.to("#sticky-element", {
    scrollTrigger: {
      trigger: "#sticky-element", // Pin the element when it reaches the top of the viewport
      start: "top top", // Start when the top of the element reaches the top of the viewport
      end: "bottom-=520 top", // End when the bottom of the element reaches the top of the viewport
      pin: true, // Pin the element during scroll
      scrub: true, // Sync animation with scrolling
    },
  });

  gsap.utils.toArray(".testimonial-card").forEach((card, index) => {
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
}
