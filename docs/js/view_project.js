// const projectId = new URLSearchParams(window.location.search).get("id");

//! Scroll to top when page is refreshed
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

// window.location.replace("https://aryanranderiya.com/404");

const projectId = sessionStorage.getItem("projectId");

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
const projectRef = ref(database, "Projects/" + projectId);

// ! FIREBASE INIT --------------------------------------------------------------------------------------

function processData(snapshot) {
  const snapshotData = snapshot.val();

  var projectTitle = snapshotData.project_title;
  var projectDesc = snapshotData.project_description;
  var projectType = snapshotData.project_type;
  var projectTechStack = snapshotData.project_tech_stack;
  var githubLink = snapshotData.github_link;
  var demoDownloadURL = snapshotData.demo_file_URL;
  var demo_type = snapshotData.demo_type;

  const text_project_title = document.querySelector(".project_title");
  const project_desc = document.querySelector(".project_desc");
  const ptype_text = document.querySelector(".p_type_text");
  const ptype_icon = document.querySelector(".p_type_icon");
  const p_info_text = document.querySelector(".project_info_text");
  const tech_stack = document.querySelector(".tech_stack");
  const primaryButton = document.querySelector(".button_primary");
  const githubAnchor = document.querySelector(".btn_github_anchor");

  // !Set icon for project time to mobile or pc
  if (projectType.includes("Mobile"))
    ptype_icon.innerHTML =
      '<span class="material-symbols-outlined p_type_icon"> phone_iphone</span>';
  else if (projectType.includes("Desktop") || projectType.includes("Web"))
    ptype_icon.innerHTML =
      '<span class="material-symbols-outlined p_type_icon"> laptop_mac</span>';

  //! Set data from database
  text_project_title.innerHTML = projectTitle;
  ptype_text.innerHTML = projectType;
  p_info_text.innerHTML = projectDesc;
  project_desc.remove();
  // project_desc.innerHTML = projectDesc;

  setupMockups(demo_type, demoDownloadURL);

  //! Set icons for tech stack
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

  tech_stack.innerHTML = `${projectTechStack_values
    .map((element) => {
      const replacedElement = replacements[element] || element;

      return `<div class="tech_stack_item">
        <i class="tech_stack_icon fa-${replacedElement.toLowerCase()}"></i> <text>${element}&nbsp;</text></div>`;
    })
    .join(" ")}`;

  //! Set href for github link
  if (!githubLink) {
    primaryButton?.remove();
    githubAnchor?.remove();
  } else {
    githubAnchor.href = githubLink;
  }
}

//! DOMContentLoaded

const mockup_laptop_image = document.querySelector(".mockup_laptop.image");

document.addEventListener("DOMContentLoaded", function () {
  const button_primary = document.querySelector(".button_primary");
  const button_secondary = document.querySelector(".button_secondary");
  const cursoricon5 = document.getElementById("cursoricon5");

  if (button_primary) handleButtonEvents(button_primary);
  if (button_secondary) handleButtonEvents(button_secondary);

  function handleButtonEvents(button) {
    button.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.5)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    button.addEventListener("mouseout", () => {
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });
  }

  hoverDevices();
});

onValue(projectRef, processData);

//! Intersection Observer handle Intersection
function handleIntersection1(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.filter = "grayscale(0%)";
      entry.target.play();
      mockup_laptop_image.style.opacity = "1";
    } else {
      entry.target.style.opacity = "0.3";
      entry.target.style.filter = "grayscale(100%)";
      entry.target.pause();
      mockup_laptop_image.style.opacity = "0.3";
    }
  });
}

//! Create Intersection Observer
function createIntersectionObserver(threshold) {
  return new IntersectionObserver(handleIntersection1, {
    root: null,
    rootMargin: "0px",
    threshold,
  });
}

const observer1 = createIntersectionObserver(0.7);
const observer2 = createIntersectionObserver(0.8);

// ! Functions

function hoverDevices() {
  const mockups = document.querySelectorAll(".mockup");
  const mockup_pc = document.querySelector(".mockup_pc");
  const mockup_phone = document.querySelector(".mockup_phone");
  const mobileMedia = document.querySelector(".mockup_media_mobile");
  const laptopMedia = document.querySelector(".mockup_media_laptop.video");
  const cursortext = document.getElementById("cursortext");
  cursortext.style.color = "black";

  mockup_phone.addEventListener("click", () => playPauseVideo(mobileMedia));
  mockup_pc.addEventListener("click", () => playPauseVideo(laptopMedia));

  mockups.forEach((mockup) => {
    mockup.addEventListener("mouseover", () => {
      cursor.style.outlineWidth = "0.01em";
      cursor.style.outlineColor = "black";
      cursor.style.outlineStyle = "solid";
      cursortext.classList.add("active");
      cursorTransformShadowBlend("scale(7)", "none");
    });

    mockup.addEventListener("mouseout", () => {
      cursor.style.outline = "none";
      cursortext.classList.remove("active");
      cursorTransformShadowBlend("none", "0px 0px 30px white", "normal");
    });
  });

  const changeCursorText = (video) => {
    video.playing
      ? (cursortext.innerHTML = 'Pause<br><i class="fa-solid fa-pause"></i>')
      : (cursortext.innerHTML = 'Play<br><i class="fa-solid fa-play"></i>');
  };

  const mediaElements = [mobileMedia, laptopMedia];
  mediaElements.forEach((element) => {
    changeCursorText(element);
    element.addEventListener("play", () => changeCursorText(element));
    element.addEventListener("pause", () => changeCursorText(element));
  });
}

function playPauseVideo(video) {
  const isPaused = video.paused;
  video.style.opacity = isPaused ? "1" : "0.3";
  video.style.filter = isPaused ? "grayscale(0%)" : "grayscale(100%)";
  isPaused ? video.play() : video.pause();
}

function cursorTransformShadowBlend(
  p_transform = "none",
  p_boxShadow = "0px 0px 30px white",
  p_mixBlendMode = "normal"
) {
  cursor.style.transform = p_transform;
  cursor.style.boxShadow = p_boxShadow;
  cursor.style.mixBlendMode = p_mixBlendMode;
}

function addClass(element, className) {
  element.classList.add(className);
}
function removeClass(element, className) {
  element.classList.remove(className);
}

Object.defineProperty(HTMLMediaElement.prototype, "playing", {
  get: function () {
    return !!(
      this.currentTime > 0 &&
      !this.paused &&
      !this.ended &&
      this.readyState > 2
    );
  },
});

function removeCover() {
  setTimeout(function () {
    const blackCover = document.querySelector(".black_cover");
    blackCover.classList.remove("visible");
    document.body.style.overflow = "auto";
    console.log("Loaded Data.");
  }, 500);
}

function setupMockups(demo_type, demoDownloadURL) {
  const mockup_pc = document.querySelector(".mockup_pc");
  const mockup_phone = document.querySelector(".mockup_phone");
  const mockupContainer = document.querySelectorAll(".mockup_container");
  const laptopMedia = document.querySelector(".mockup_media_laptop.video");
  const laptopImage = document.querySelector(".mockup_media_laptop.image");
  const laptopVideo = document.querySelector(".mockup_media_laptop.video");
  const mobileMedia = document.querySelector(".mockup_media_mobile.video");

  if (demo_type == "demo_pc") {
    observer2.observe(laptopMedia);
    mockup_pc.classList.add("visible");
    laptopMedia.src = demoDownloadURL;
    laptopMedia.addEventListener("loadeddata", removeCover);
    mockupContainer.forEach((element) => element.classList.add("pc"));
    // END OF IF CONDITION
  } else if (demo_type == "demo_mobile") {
    observer1.observe(mobileMedia);
    mockup_phone.classList.add("visible");
    mobileMedia.src = demoDownloadURL;
    mobileMedia.addEventListener("loadeddata", removeCover);
    // END OF IF ELSE CONDITION
  } else {
    observer2.observe(laptopMedia);
    mockup_pc.classList.add("visible");
    laptopImage.src = demoDownloadURL;
    laptopImage.style.display = "block";
    laptopVideo.style.display = "none";
    laptopMedia.addEventListener("loadeddata", removeCover);
    mockupContainer.forEach((element) => element.classList.add("pc"));
    // END OF ELSE
  }
}
