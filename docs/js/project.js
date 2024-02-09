// const projectId = new URLSearchParams(window.location.search).get("id");

import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

//! Scroll to top when page is refreshed
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

// const projectId = sessionStorage.getItem("projectId");

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");

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

onValue(projectRef, processData);

// ! INIT
const dot = document.querySelector(".dot");
const mockups = document.querySelectorAll(".mockup");
const controlIcons = document.querySelector(".icons");
const iconMain = document.querySelector(".icon_main");
const mockup_pc = document.querySelector(".mockup_pc");
const tech_stack = document.querySelector(".tech_stack");
const ptypeText = document.querySelector(".p_type_text");
const ptypeIcon = document.querySelector(".p_type_icon");
const progressBar = document.querySelector("#progress-bar");
const btnScrollTop = document.querySelector(".scrolltotop");
const tryAnchor = document.querySelector(".btn_try_anchor");
const mockup_phone = document.querySelector(".mockup_phone");
const pInfoText = document.querySelector(".project_info_text");
const containerPC = document.querySelector(".container-laptop");
const primaryButton = document.querySelector(".button_primary");
const controlPlay = document.querySelector("#control_playback");
const controlPause = document.getElementById("icons_main_pause");
const githubAnchor = document.querySelector(".btn_github_anchor");
const textProjectTitle = document.querySelector(".project_title");
const playback_icons_main = document.querySelector(".icons.main");
const containerPhone = document.querySelector(".container-mobile");
const projectDescription = document.querySelector(".project_desc");
const secondaryButton = document.querySelector(".button_secondary");
const iconsMainReplay = document.getElementById("icons_main_replay");
const mockupContainer = document.querySelectorAll(".mockup_container");
const otherControls = document.querySelector(".video_controls_others");
const mobileVideo = document.querySelector(".mockup_media_mobile.video");
const laptopVideo = document.querySelector(".mockup_media_laptop.video");
const laptopImage = document.querySelector(".mockup_media_laptop.image");
const mockupLaptopImage = document.querySelector(".mockup_laptop.image");
const playbackControls = document.querySelector(".video_controls_playback");
const controlsContainer = document.querySelector(".video_controls_container");

// ! INIT END

function setPageUrl(tab_title) {
  let title_url = tab_title.replace(/ /g, "");
  const nextState = { additionalInformation: "Updated the URL with JS" };
  window.history.pushState(nextState, tab_title, title_url);
  window.history.replaceState(nextState, tab_title, title_url);
}

function setupDocumentation(p_documentationURL, pInfoText) {
  if (p_documentationURL) {
    fetch(p_documentationURL)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        return response.text();
      })
      .then((textContent) => {
        pInfoText.innerHTML = marked.parse(textContent);
      })
      .then(() => {
        if (pInfoText) setupAnimation(pInfoText);
      })
      .catch((error) => {
        console.error("Fetch Documentation error:", error);
      });
  } else {
    pInfoText.innerHTML = "No Documentation.";
  }
}

function setHrefandBtn(link, btn, anchor) {
  if (!link) {
    btn?.remove();
    anchor?.remove();
  } else {
    anchor.href = link;
  }
}

function setProjectTypeIcon(p_type) {
  if (p_type.includes("Mobile"))
    ptypeIcon.innerHTML =
      '<span class="material-symbols-outlined p_type_icon"> phone_iphone</span>';
  else if (p_type.includes("Desktop") || p_type.includes("Web"))
    ptypeIcon.innerHTML =
      '<span class="material-symbols-outlined p_type_icon"> laptop_mac</span>';
}

function setTechStack(p_techStack) {
  var projectTechStack_values = p_techStack.trim().split(",");

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
}

function setOthers(p_title, p_type, p_desc) {
  textProjectTitle.innerHTML = p_title;
  ptypeText.innerHTML = p_type;
  projectDescription.innerHTML = p_desc;
  document.title = p_title;
}

function intersectionTranslate(entries, observer) {
  entries.forEach((entry) => {
    const child = entry.target.querySelector(".pInfoText_child");

    if (entry.isIntersecting) {
      child.classList.add("show");
    } else {
      child.classList.remove("show");
    }
  });
}

const observerTranslate = new IntersectionObserver(intersectionTranslate, {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
});

function setupAnimation(pInfoText) {
  for (const child of pInfoText.children) {
    const container = document.createElement("div");
    container.classList.add("pInfoText_container");
    child.classList.add("pInfoText_child");
    child.parentNode.replaceChild(container, child);
    container.appendChild(child);
    observerTranslate.observe(container);
  }
}

// ! Start Processing & Setting Data
async function processData(snapshot) {
  const snapshotData = snapshot.val();

  var p_title = snapshotData.project_title;
  var p_desc = snapshotData.project_description;
  var p_type = snapshotData.project_type;
  var p_techStack = snapshotData.project_tech_stack;
  var p_githubLink = snapshotData.github_link;
  var p_tryProjectLink = snapshotData.tryProjectLink;
  var p_demoURL = snapshotData.demo_file_URL;
  var p_demoType = snapshotData.demo_type;
  var p_documentationURL = snapshotData.documentation_URL;

  setOthers(p_title, p_type, p_desc);
  setProjectTypeIcon(p_type, ptypeIcon);
  setPageUrl(p_title);
  setupDocumentation(p_documentationURL, pInfoText);
  setupMockups(p_demoType, p_demoURL);
  setTechStack(p_techStack);
  setHrefandBtn(p_githubLink, primaryButton, githubAnchor);
  setHrefandBtn(p_tryProjectLink, secondaryButton, tryAnchor);
}

//!  Intersection Observer for scrolling into view
function handIntersectionScroller_mobile(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.scrollIntoView({ behavior: "auto", block: "end" });
    }
  });
}

function handIntersectionScroller_pc(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.scrollIntoView({ behavior: "auto", block: "center" });
    }
  });
}

const observerScroller_pc = new IntersectionObserver(
  handIntersectionScroller_pc,
  { root: null, rootMargin: "0px", threshold: 0.5, immediate: true }
);

const observerScroller_mobile = new IntersectionObserver(
  handIntersectionScroller_mobile,
  { root: null, rootMargin: "0px", threshold: 0.4, immediate: true }
);

//! Intersection Observer for Mobile and PC Video
function handleIntersection1(entries, observer) {
  entries.forEach((entry) => {
    const isIntersecting = entry.isIntersecting;
    entry.target[isIntersecting ? "play" : "pause"]();
    entry.target.style.filter = isIntersecting
      ? "grayscale(0%)"
      : "grayscale(100%)";
    entry.target.style.opacity = isIntersecting ? "1" : "0.3";
    iconsMainReplay.style.opacity = "0";
    dot.classList.toggle("visible", !isIntersecting);
    controlIcons.style.opacity = isIntersecting ? "1" : "0";
    controlPlay.style.opacity = isIntersecting ? "0" : "1";
    controlPause.style.opacity = isIntersecting ? "1" : "0";
    otherControls.classList.toggle("hidden", !isIntersecting);
    playbackControls.classList.toggle("hidden", !isIntersecting);
    controlsContainer.classList.toggle("hidden", !isIntersecting);
    mockupLaptopImage.style.opacity = isIntersecting ? "1" : "0.3";
    setTimeout(() => {
      controlsContainer.style.opacity = isIntersecting ? "1" : "0";
    }, 500);
    iconMain.style.visibility = isIntersecting ? "visible" : "hidden";
    progressBar.style.backgroundColor = isIntersecting ? "white" : "#4d4d4d";
  });
}

//! Intersection Observer handle Intersection
function handleIntersectionImage(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      mockupLaptopImage.style.opacity = "1";
      entry.target.style.opacity = "1";
      entry.target.style.filter = "grayscale(0%)";
    } else {
      progressBar.style.backgroundColor = "#4d4d4d";
      iconMain.style.visibility = "hidden";
      mockupLaptopImage.style.opacity = "0.3";
      entry.target.style.opacity = "0.3";
      entry.target.style.filter = "grayscale(100%)";
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
const observerImage = new IntersectionObserver(handleIntersectionImage, {
  root: null,
  rootMargin: "0px",
  threshold: 0.8,
});

document.addEventListener("DOMContentLoaded", function () {
  var cursor_glow = document.querySelector(".cursor_glow_div");

  document.addEventListener("mousemove", (e) => {
    cursor_glow.style.left = e.clientX + "px";
    cursor_glow.style.top = e.clientY + "px";
  });

  const button_primary = document.querySelector(".button_primary");
  const button_secondary = document.querySelector(".button_secondary");
  const cursoricon5 = document.getElementById("cursoricon5");

  if (button_primary) addEventListeners(button_primary);
  if (button_secondary) addEventListeners(button_secondary);

  btnScrollTop.addEventListener("click", () => {
    console.log("test");
    window.scrollTo({ top: 0, behavior: "instant" });
  });

  function addEventListeners(button) {
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
});

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
      controlPause.style.opacity = "1";
      controlPlay.style.opacity = "0";
      iconsMainReplay.style.opacity = "0";
    } else if (video.ended) {
      cursortext.innerHTML = 'Restart<br><i class="fa-solid fa-repeat"></i>';
      controlPause.style.opacity = "0";
      controlPlay.style.opacity = "0";
      iconsMainReplay.style.opacity = "1";
      video.style.opacity = "0.3";
      video.style.filter = "grayscale(100%)";
    } else {
      cursortext.innerHTML = 'Play<br><i class="fa-solid fa-play"></i>';
      controlPause.style.opacity = "0";
      controlPlay.style.opacity = "1";
      playback_icons_main.style.display = "";
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
  controlPlay.style.opacity = isPaused ? "0" : "1";
  controlPause.style.opacity = isPaused ? "1" : "0";
  iconsMainReplay.style.opacity = "0";
  progressBar.style.backgroundColor = isPaused ? "white" : "#4d4d4d";
}

function removeCover() {
  const blackCover = document.querySelector(".black_cover");
  const preloader = document.querySelector(".preloader");

  setTimeout(function () {
    blackCover.classList.add("hide");
    preloader.classList.add("hide");
    document.body.style.overflow = "auto";
  }, 500);
}

function setMockup(
  mediaObserver,
  mediaElement,
  demoURL,
  observerScroller_pc,
  container,
  mockup
) {
  mediaObserver.observe(mediaElement);
  setVideoProgressBar(mediaElement);
  mediaElement.src = demoURL;
  mockup.classList.add("visible");
  observerScroller_pc.observe(container);
  mediaElement.addEventListener("loadeddata", removeCover);
  playbackControlsSetup();
  hoverDevices(mockups);
}

function setupMockups(demo_type, demoDownloadURL) {
  if (demo_type == "demo_pc") {
    mockupContainer.forEach((element) => element.classList.add("pc"));
    setMockup(
      observer2,
      laptopVideo,
      demoDownloadURL,
      observerScroller_pc,
      containerPC,
      mockup_pc
    );
    // END OF IF
  } else if (demo_type == "demo_mobile") {
    setMockup(
      observer1,
      mobileVideo,
      demoDownloadURL,
      observerScroller_mobile,
      containerPhone,
      mockup_phone
    );
    // END OF IF ELSE CONDITION
  } else if (demo_type == "demo_pc_image") {
    observerImage.observe(laptopImage);
    mockup_pc.classList.add("visible");
    laptopImage.src = demoDownloadURL;
    laptopVideo.style.display = "none";
    laptopImage.style.display = "block";
    controlsContainer.style.visibility = "hidden";
    laptopImage.addEventListener("load", removeCover);
    mockupContainer.forEach((element) => element.classList.add("pc"));
    // END OF ELSE
  } else if (demo_type == "none") {
    laptopVideo.style.display = "none";
    laptopImage.style.display = "none";
    controlsContainer.style.visibility = "hidden";
    removeCover();
    //END OF IF ELSE
  }
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
  iconsMainReplay.addEventListener("click", () => {
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
