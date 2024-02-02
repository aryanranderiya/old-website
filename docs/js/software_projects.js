const blackCover = document.querySelector(".black_cover");
const terminal_bling = document.querySelector(".terminal_bling");
const cursortext = document.getElementById("cursortext");

var cards = document.querySelector(".cards");

//! Scroll to the top on reload
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

// ! FIREBASE INIT --------------------------------------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
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
const projectsRef = ref(database, "Projects/");

// ! FIREBASE INIT --------------------------------------------------------------------------------------

function processDataAndHidePreloader(snapshot) {
  snapshot.forEach((childSnapshot) => {
    const projectDetails = childSnapshot.val();
    const projectId = childSnapshot.key;
    // console.log(projectId);

    var projectTitle = projectDetails.project_title;
    var projectDesc = projectDetails.project_description;
    var projectType = projectDetails.project_type;
    var projectTechStack = projectDetails.project_tech_stack;
    var banner_image_URL = projectDetails.banner_image_URL;

    if (banner_image_URL == undefined) {
      banner_image_URL = "/docs/media/bg_aryan_swirl.jpg";
    }
    var projectTechStack_values = projectTechStack.trim().split(",");

    const replacements = {
      Python: "python fa-brands",
      Android: "android fa-brands",
      Java: "java fa-brands",
      HTML: "HTML5 fa-brands",
      CSS: "CSS3-alt fa-brands",
      JavaScript: "js fa-brands",
      SQL: "database fa-solid ",
    };

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-content">
          <div class="card-image" >
            <img class="card-image" loading="eager" src='${banner_image_URL}';">
            </img>
          </div>
          <div class="card-info-wrapper">
              <div class="card-info">
                  <div class="card-info-title">
                      <h3 class="card-title">${projectTitle}</h3>
                      <h6 class="card-type"><i>${projectType}</i></h6>

                      <div class="card-tech-stack">
                      ${projectTechStack_values
                        .map((element) => {
                          const replacedElement =
                            replacements[element] || element;

                          return `<i class="tech_stack_icon fa-${replacedElement.toLowerCase()}"></i> <text>${element}&nbsp;</text>`;
                        })
                        .join(" ")}

                      
                      </div>

                  </div>
                  <h4 class="card-desc">${projectDesc}<h4>
              </div>

          </div>
          <div class="buttons">
            <a onclick="redirectToProjectPage('${projectId}')">
            <button class="button_secondary" aria-label="View Project Info">
                      View Project
                <div class="icon">
                    <i class="fa-solid fa-up-right-from-square btn_icon_2" style="font-size:1em"></i>
                </div>
              </button>
            </a>
          </div>
      </div>
    `;

    document.querySelector(".cards").appendChild(card);

    // ! Display on the scroll

    //! First Intersection Observer
    function handleIntersection1(entries, observer) {
      //! Fade in the content box
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          card.style.opacity = "1";
        } else {
          card.style.opacity = "0";
        }
      });
    }
    const observer1 = new IntersectionObserver(handleIntersection1, {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    });
    observer1.observe(card);

    //! Brightness
    const cards = document.querySelectorAll(".card");
    const logos = document.querySelector(".logos");

    cards.forEach((card) => {
      card.addEventListener("mouseover", () => {
        card.classList.remove("grayscale");
        logos.style.filter = "brightness(100%) grayscale(0%)";

        cards.forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.add("grayscale");
          }
        });
      });

      card.addEventListener("mouseout", () => {
        logos.style.filter = "brightness(20%) grayscale(100%)";

        cards.forEach((otherCard) => {
          otherCard.classList.remove("grayscale");
        });
      });
    });
  });

  // ! Remove the preloader and black card
  setTimeout(function () {
    blackCover.classList.remove("visible");
    document.body.style.overflow = "auto";
    terminal_bling.classList.add("animation_paragraph");
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  const logos = document.querySelector(".logos");

  onValue(projectsRef, processDataAndHidePreloader, { onlyOnce: true });

  var cursor_glow = document.querySelector(".cursor_glow_div");

  document.addEventListener("mousemove", function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursor_glow.style.transform = `translate3d(calc(${x}px), calc(${y}px), 0)`;
  });

  // ! REMOVE THIS :- !!!
  // blackCover.classList.remove("visible");
  // document.body.style.overflow = "auto";
  // terminal_bling.classList.add("animation_paragraph");

  //! Software Projects Title

  software_projects_title.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(10)";
    cursor.style.mixBlendMode = "difference";
    cursor.style.boxShadow = "none";
  });

  software_projects_title.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 50px white";
  });

  //! Cards Cursor Title

  document.addEventListener("mouseover", function (event) {
    if (event.target.classList.contains("card")) {
      cursor.style.transform = "scale(1)";
      cursor.style.boxShadow =
        "0px 0px 20px white, 0px 0px 35px white, 0px 0px 50px white, 0px 0px 60px white,  0px 0px 70px white,0px 0px 80px white,0px 0px 95px white, 0px 0px 110px white";
    }
  });

  document.addEventListener("mouseout", function (event) {
    if (event.target.classList.contains("card")) {
      cursor.style.transform = "none";
      cursor.style.boxShadow = "0px 0px 30px white";
    }
  });

  //! Logos Cursor Title

  logos.addEventListener("mouseover", () => {
    logos.style.filter = "brightness(100%) grayscale(0%)";

    cursor.style.transform = "scale(8)";
    cursor.style.boxShadow = "none";
    cursor.style.outlineWidth = "0px";
    cursortext.classList.add("active");
    cursor.classList.add("partially_transparent2");
  });

  logos.addEventListener("mouseout", () => {
    logos.style.filter = "brightness(30%)  grayscale(100%)";

    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 30px white";
    cursortext.classList.remove("active");
    cursor.classList.remove("partially_transparent2");
  });

  // ! END OF DOMCONTENTLOADED
});

// ! change marquee direction on scroll

gsap.registerPlugin(ScrollTrigger);

let currentScroll = 0;
let isScrollingDown = true;

let tween = gsap
  .to(".logos-slide", {
    xPercent: -100,
    repeat: -1,
    duration: 10,
    ease: "linear",
  })
  .totalProgress(0.5);

gsap.set(".logos-slide", { xPercent: -50 });

window.addEventListener("scroll", function () {
  if (window.pageYOffset > currentScroll) {
    isScrollingDown = false;
  } else {
    isScrollingDown = true;
  }

  gsap.to(tween, {
    timeScale: isScrollingDown ? 1 : -1,
  });

  currentScroll = window.pageYOffset;
});
