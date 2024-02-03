// const projectId = new URLSearchParams(window.location.search).get("id");

import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

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

async function processData(snapshot) {
  const snapshotData = snapshot.val();

  var projectTitle = snapshotData.project_title;
  var projectDesc = snapshotData.project_description;
  var projectType = snapshotData.project_type;
  var projectTechStack = snapshotData.project_tech_stack;
  var githubLink = snapshotData.github_link;
  var demoDownloadURL = snapshotData.demo_file_URL;
  var demo_type = snapshotData.demo_type;
  var documentationURL = snapshotData.documentation_URL;

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
  project_desc.innerHTML = projectDesc;

  //!  Fetch Documentation
  if (documentationURL) {
    fetch(documentationURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((textContent) => {
        p_info_text.innerHTML = marked.parse(textContent);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  } else {
    p_info_text.innerHTML = "No Documentation.";
  }
  // try {
  //   const response = await fetch(documentationURL);
  //   if (!response.ok)
  //     throw new Error(`Failed to fetch file: ${response.statusText}`);

  //   const markdownContent = await response.text();

  //   p_info_text.innerHTML = marked(markdownContent);
  // } catch (error) {
  //   console.error("Error fetching or processing Markdown file:", error);
  // }

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

//!  Intersection Observer for scrolling into view
function handIntersectionScroller_mobile(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  });
}

function handIntersectionScroller_pc(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  });
}

const observerScroller_pc = new IntersectionObserver(
  handIntersectionScroller_pc,
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    immediate: true,
  }
);

const observerScroller_mobile = new IntersectionObserver(
  handIntersectionScroller_mobile,
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.4,
    immediate: true,
  }
);
function scrollToTop() {
  window.scrollTo({
    bottom: 0,
    behavior: "smooth",
  });
}

//! DOMContentLoaded

const dot = document.querySelector(".dot");
const controlIcons = document.querySelector(".icons");
const mockup_pc = document.querySelector(".mockup_pc");
const mockup_phone = document.querySelector(".mockup_phone");
const control_play = document.getElementById("control_playback");
const playback_icons_main = document.querySelector(".icons.main");
const icon_main = document.querySelector(".icon_main");
const control_pause = document.getElementById("icons_main_pause");
const otherControls = document.querySelector(".video_controls_others");
const mobileVideo = document.querySelector(".mockup_media_mobile.video");
const laptopVideo = document.querySelector(".mockup_media_laptop.video");
const icon_control_playback = document.querySelector("#control_playback");
const mockup_laptop_image = document.querySelector(".mockup_laptop.image");
const playbackControls = document.querySelector(".video_controls_playback");
const controls_container = document.querySelector(".video_controls_container");
const icons_main_replay = document.getElementById("icons_main_replay");
const progressBar = document.querySelector("#progress-bar");
const btnScrollTop = document.querySelector(".scrolltotop");

onValue(projectRef, processData);

document.addEventListener("DOMContentLoaded", function () {
  // var cursor_glow = document.querySelector(".cursor_glow_div");

  // document.addEventListener("mousemove", function (e) {
  //   var x = e.clientX;
  //   var y = e.clientY;
  //   cursor_glow.style.transform = `translate(${x}px, ${y}px)`;
  // });

  const button_primary = document.querySelector(".button_primary");
  const button_secondary = document.querySelector(".button_secondary");
  const cursoricon5 = document.getElementById("cursoricon5");
  const mockups = document.querySelectorAll(".mockup");

  if (button_primary) handleButtonEvents(button_primary);
  if (button_secondary) handleButtonEvents(button_secondary);

  btnScrollTop.addEventListener("click", scrollToTop);

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

  hoverDevices(mockups);
});

//! Intersection Observer handle Intersection
function handleIntersection1(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      mockup_laptop_image.style.opacity = "1";
      entry.target.style.opacity = "1";
      entry.target.style.filter = "grayscale(0%)";
      entry.target.play();

      dot.classList.remove("visible");
      controlIcons.style.opacity = "1";
      otherControls.classList.remove("hidden");
      playbackControls.classList.remove("hidden");
      controls_container.classList.remove("hidden");
      controls_container.style.opacity = "1";
      progressBar.style.backgroundColor = "white";

      // ! CHANGE THIS
      control_play.style.opacity = "0";
      control_pause.style.opacity = "1";
      icon_control_playback.classList.remove("hidden");
      icon_main.style.visibility = "visible";
    } else {
      progressBar.style.backgroundColor = "#4d4d4d";
      icon_main.style.visibility = "hidden";
      mockup_laptop_image.style.opacity = "0.3";
      entry.target.style.opacity = "0.3";
      entry.target.style.filter = "grayscale(100%)";
      entry.target.pause();

      // ! CHANGE THIS
      control_play.style.opacity = "1";
      control_pause.style.opacity = "0";

      dot.classList.add("visible");
      controlIcons.style.opacity = "0";
      otherControls.classList.add("hidden");
      playbackControls.classList.add("hidden");
      controls_container.classList.add("hidden");
      icon_control_playback.classList.add("hidden");
      setTimeout(() => {
        controls_container.style.opacity = "0";
      }, 500);
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

function hoverDevices(mockups) {
  const cursortext = document.getElementById("cursortext");
  const mobileMedia = document.querySelector(".mockup_media_mobile");
  cursortext.style.color = "black";

  mockup_phone.addEventListener("click", () => playPauseVideo(mobileMedia));
  mockup_pc.addEventListener("click", () => playPauseVideo(laptopVideo));

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
    if (video.playing) {
      cursortext.innerHTML = 'Pause<br><i class="fa-solid fa-pause"></i>';
      control_pause.style.opacity = "1";
      control_play.style.opacity = "0";
      icons_main_replay.style.opacity = "0";
      playback_icons_main.style.display = "";
    } else if (video.ended) {
      cursortext.innerHTML = 'Restart<br><i class="fa-solid fa-repeat"></i>';
      control_pause.style.opacity = "0";
      control_play.style.opacity = "0";
      icons_main_replay.style.opacity = "1";
      playback_icons_main.style.display = "contents";
      video.style.opacity = "0.3";
      video.style.filter = "grayscale(100%)";
    } else {
      cursortext.innerHTML = 'Play<br><i class="fa-solid fa-play"></i>';
      control_pause.style.opacity = "0";
      control_play.style.opacity = "1";
      playback_icons_main.style.display = "";
      icons_main_replay.style.opacity = "0";
    }
  };

  const mediaElements = [mobileMedia, laptopVideo];
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
  control_play.style.opacity = isPaused ? "0" : "1";
  control_pause.style.opacity = isPaused ? "1" : "0";
  progressBar.style.backgroundColor = isPaused ? "white" : "#4d4d4d";
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
  const mockupContainer = document.querySelectorAll(".mockup_container");
  const laptopImage = document.querySelector(".mockup_media_laptop.image");

  const containerPhone = document.querySelector(".container-mobile");
  const containerPC = document.querySelector(".container-laptop");

  if (demo_type == "demo_pc") {
    observer2.observe(laptopVideo);
    setVideoProgressBar(laptopVideo);
    laptopVideo.src = demoDownloadURL;
    mockup_pc.classList.add("visible");
    observerScroller_pc.observe(containerPC);
    laptopVideo.addEventListener("loadeddata", removeCover);
    mockupContainer.forEach((element) => element.classList.add("pc"));
    // END OF IF CONDITION
  } else if (demo_type == "demo_mobile") {
    observer1.observe(mobileVideo);
    setVideoProgressBar(mobileVideo);
    mobileVideo.src = demoDownloadURL;
    mockup_phone.classList.add("visible");
    observerScroller_mobile.observe(containerPhone);
    mobileVideo.addEventListener("loadeddata", removeCover);
    // END OF IF ELSE CONDITION
  } else {
    observer2.observe(laptopVideo);
    setVideoProgressBar(laptopVideo);
    mockup_pc.classList.add("visible");
    laptopImage.src = demoDownloadURL;
    laptopVideo.style.display = "none";
    laptopImage.style.display = "block";
    observerScroller_mobile.observe(containerPC);
    laptopVideo.addEventListener("loadeddata", removeCover);
    mockupContainer.forEach((element) => element.classList.add("pc"));
    // END OF ELSE
  }

  playbackControlsSetup();
}

function playbackControlsSetup() {
  const computedStyle_pc = window.getComputedStyle(mockup_pc);
  const computedStyle_phone = window.getComputedStyle(mockup_phone);

  if (computedStyle_pc.display == "none") {
    controlVideo(mobileVideo);
  } else if (computedStyle_phone.display == "none") {
    controlVideo(laptopVideo);
  }
}

function controlVideo(element) {
  const control_rewind = document.getElementById("control_rewind");
  const control_forward = document.getElementById("control_forward");
  const control_backward = document.getElementById("control_backward");
  control_rewind.addEventListener("click", () => (element.currentTime = 0));
  control_forward.addEventListener("click", () => (element.currentTime += 5));
  control_backward.addEventListener("click", () => (element.currentTime -= 5));
  playback_icons_main.addEventListener("click", () => playPauseVideo(element));
  icons_main_replay.addEventListener("click", () => {
    // element.currentTime = 0;
    playPauseVideo((element.currentTime = 0));
  });
}

function setVideoProgressBar(video) {
  video.addEventListener("timeupdate", () => {
    const videoDuration = video.duration;
    const currentTime = video.currentTime;
    const progressPercent = (currentTime / videoDuration) * 100;
    progressBar.style.setProperty("--progress", `${progressPercent}%`);
  });
}
