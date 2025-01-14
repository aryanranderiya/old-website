import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

//! Scroll to top when page is refreshed
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");
if (projectId === null) window.location.href = "SoftwareProjects.html";

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

// initializeApp(firebaseConfig);
// const database = getDatabase();
// const projectRef = ref(database, `Projects/${projectId}`);

// ! FIREBASE INIT --------------------------------------------------------------------------------------

// onValue(projectRef, processData);
processData();
// ! INIT
const dot = document.querySelector(".dot");
const mockups = document.querySelectorAll(".mockup");
const controlIcons = document.querySelector(".icons");
const iconMain = document.querySelector(".icon_main");
const mockup_pc = document.querySelector(".mockup_pc");
const tech_stack = document.querySelector(".tech_stack");
const ptypeText = document.querySelector(".p_type_text");
const progressBar = document.querySelector("#progress-bar");
const btnScrollTop = document.querySelector(".scrolltotop");
const mockup_phone = document.querySelector(".mockup_phone");
const pInfoText = document.querySelector(".project_info_text");
const containerPC = document.querySelector(".container-laptop");
const controlPlay = document.querySelector("#control_playback");
const controlPause = document.getElementById("icons_main_pause");
const textProjectTitle = document.querySelector(".project_title");
const playback_icons_main = document.querySelector(".icons.main");
const containerPhone = document.querySelector(".container-mobile");
const projectDescription = document.querySelector(".project_desc");
const iconsMainReplay = document.getElementById("icons_main_replay");
const mockupContainer = document.querySelectorAll(".mockup_container");
const otherControls = document.querySelector(".video_controls_others");
const mobileVideo = document.querySelector(".mockup_media_mobile.video");
const laptopVideo = document.querySelector(".mockup_media_laptop.video");
const laptopImage = document.querySelector(".mockup_media_laptop.image");
const mockupLaptopImage = document.querySelector(".mockup_laptop.image");
const playbackControls = document.querySelector(".video_controls_playback");
const controlsContainer = document.querySelector(".video_controls_container");
const popupContainer = document.querySelector(".popup_image_container");
const popupImage = document.querySelector(".popup_image");
const close_text = document.querySelector(".close_text");
const cursortext2 = document.querySelector("#cursortext2");
const created_on = document.querySelector(".created_on");
const creation_date = document.querySelector(".creation_date");
const personal_comments = document.querySelector(".personal_comments");
const comment_card = document.querySelector("#comment_card");
const bento_links = document.querySelector("#bento_links");
const links_card = document.querySelector("#links_card");
const github_bento_card = document.querySelector("#github_bento_card");
const documentation = document.querySelector(".documentation");

// ! INIT END

function setPageUrl(tab_title) {
  const encodedTitle = encodeURIComponent(tab_title);
  const url = encodedTitle.replace(/%20/g, ""); // Remove encoded spaces
  const nextState = { additionalInformation: "Updated the URL with JS" };
  window.history.pushState(nextState, tab_title, url);
}

async function setupDocumentation(p_documentationURL, pInfoText) {
  try {
    if (p_documentationURL) {
      const response = await fetch(p_documentationURL);
      if (!response.ok) throw new Error(`Rrror! Status: ${response.status}`);

      const textContent = await response.text();
      pInfoText.innerHTML = marked.parse(textContent);

      if (pInfoText) setupAnimation(pInfoText);
    } else documentation.remove();
  } catch (error) {
    console.error("Fetch Documentation error:", error);
  }
}

function setLinks(links) {
  if (links)
    links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.className = "bento_link";
      anchor.href = link[1];
      anchor.innerHTML = `
      <span style="width=5em">${link[0]}</span>
      <i class="fa-solid fa-up-right-from-square link_icon"></i>
    `;
      bento_links.appendChild(anchor);
      anchor.addEventListener("mouseover", () => {
        cursorTransformShadowBlend("scale(1.3)", "none");
        addClass(cursor, "transparent");
        addClass(cursoricon5, "active");
      });

      anchor.addEventListener("mouseout", () => {
        removeClass(cursor, "transparent");
        removeClass(cursoricon5, "active");
        cursorTransformShadowBlend();
      });
    });
  else {
    links_card.remove();
  }
}

function setTechStack(p_techStack) {
  const replacements = {
    HTML: "HTML5-plain colored",
    CSS: "CSS3-plain colored",
    Express: "express-original",
    Flask: "flask-original",
    Tailwind: "tailwindcss-original colored",
    Vercel: "vercel-original",
  };
  tech_stack.innerHTML = `${Object.values(p_techStack)
    .map((element) => {
      const replacedElement =
        replacements[element] || `${element}-plain colored`;
      return `<div class="tech_stack_item"><i class="tech_stack_icon devicon-${replacedElement.toLowerCase()}"></i> <text>${element}&nbsp;</text></div>`;
    })
    .join(" ")}`;

  const techStackItems = document.querySelectorAll(".tech_stack_item");

  techStackItems.forEach((item) => {
    const iconColor = window.getComputedStyle(item.firstElementChild).color;

    item.addEventListener("mouseover", function () {
      this.style.backgroundColor =
        iconColor === "rgb(255, 255, 255)" ? "rgb(255, 255, 255)" : iconColor;

      for (const child of this.children) {
        child.style.color = "black";
      }
    });

    item.addEventListener("mouseout", function () {
      this.style.backgroundColor = "";
      for (const child of item.children) {
        child.style.color = "";
      }
    });
  });
}

function setOthers(p_title, p_type, p_desc, project_creation, comments) {
  textProjectTitle.innerHTML = p_title;
  ptypeText.innerHTML = `<i> ${p_type} </i>`;
  projectDescription.innerHTML = p_desc;
  document.title = p_title;

  if (project_creation) creation_date.innerHTML = project_creation;
  else created_on.remove();

  if (comments) personal_comments.innerHTML = comments;
  else comment_card.remove();
}

function popupIntersection(entries, observer) {
  entries.forEach((entry) => {
    const child = entry.target.querySelector(".pInfoText_child");
    if (entry.isIntersecting) addClass(child, "show");
    else removeClass(child, "show");
  });
}

const observerPopup = new IntersectionObserver(popupIntersection, {
  threshold: 0.7,
});

function setupAnimation(pInfoText) {
  addImagesPopupEvents(popupImage, popupContainer, pInfoText.children);

  for (const child of pInfoText.children) {
    const container = document.createElement("div");
    addClass(container, "pInfoText_container");
    addClass(child, "pInfoText_child");
    child.parentNode.replaceChild(container, child);
    container.appendChild(child);
    observerPopup.observe(container);
  }
}

// ! Start Processing & Setting Data
async function processData(snapshot) {
  let db = {};
  try {
    const response = await fetch("./db/db.json");
    db = await response.json();
    console.log(db);
  } catch (e) {
    return;
  }

  const projects = db.Projects;
  const data = projects[projectId];

  // const data = snapshot.val();
  setPageUrl(data.project_title);

  const p_title = data.project_title;

  const p_desc = data.project_description;
  const p_type = data.project_type;
  const p_techStack = data.project_tech_stack;
  const links = data.project_links;
  const p_demoURL = data.demo_file_URL;
  const p_demoType = data.demo_type;
  const p_documentationURL = data.project_documentation_URL;
  const project_creation = data.project_creation;
  const personal_comments = data.project_personal_comments;
  const github_link = data.github_link || null;
  const project_images = data.project_images;

  setOthers(p_title, p_type, p_desc, project_creation, personal_comments);
  setupDocumentation(p_documentationURL, pInfoText);
  setupMockups(p_demoType, p_demoURL);
  setTechStack(p_techStack);
  setLinks(links);
  setGithub(github_link);
  createImages(project_images);
}
async function setGithub(github_link) {
  try {
    if (github_link) {
      const response = await fetch(
        "https://api.github.com/users/aryanranderiya/repos"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const response_json = await response.json();
      response_json.forEach((repo) => {
        if (repo.html_url !== github_link) {
          return;
        }
        const createdAt = new Date(repo.created_at).toDateString();
        const updatedAt = new Date(repo.updated_at).toDateString();
        const githubLink = document.querySelector(".github_link");
        githubLink.href = repo.html_url;
        document.querySelector(".repo_name").innerHTML = repo.full_name;
        document.querySelector(".repo_stars").innerHTML = repo.stargazers_count;
        document.querySelector(".repo_lang").innerHTML = repo.language;
        document.querySelector(".repo_created").innerHTML = createdAt;
        document.querySelector(".repo_updated").innerHTML = updatedAt;

        githubLink.addEventListener("mouseover", () => {
          cursorTransformShadowBlend("scale(1.3)", "none");
          addClass(cursor, "transparent");
          addClass(cursoricon5, "active");
        });

        githubLink.addEventListener("mouseout", () => {
          removeClass(cursor, "transparent");
          removeClass(cursoricon5, "active");
          cursorTransformShadowBlend();
        });
      });
    } else {
      github_bento_card.remove();
    }
  } catch (error) {
    console.error("Fetch Documentation error:", error);
  }
}

//!  Intersection Observer for scrolling into view
function handIntersectionScroller_mobile(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting)
      entry.target.scrollIntoView({ behavior: "auto", block: "end" });
  });
}

function handIntersectionScroller_pc(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting)
      entry.target.scrollIntoView({ behavior: "auto", block: "center" });
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
    progressBar.style.backgroundColor = isIntersecting ? "#00bbff" : "#4d4d4d";
  });
}

//! Intersection Observer handle Intersection
function handleIntersectionImage(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // mockupLaptopImage.style.opacity = "1";
      entry.target.style.opacity = "1";
      entry.target.style.filter = "grayscale(0%)";
      return;
    }
    progressBar.style.backgroundColor = "#4d4d4d";
    iconMain.style.visibility = "hidden";
    // mockupLaptopImage.style.opacity = "0.3";
    entry.target.style.opacity = "0.3";
    entry.target.style.filter = "grayscale(100%)";
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

document.addEventListener("DOMContentLoaded", () => {
  const cursor_glow = document.querySelector(".cursor_glow_div");

  // document.addEventListener("mousemove", (e) => {
  //   cursor_glow.style.left = e.clientX + "px";
  //   cursor_glow.style.top = e.clientY + "px";
  // });

  const button_primary = document.querySelector(".button_primary");
  const button_secondary = document.querySelector(".button_secondary");
  const cursoricon5 = document.getElementById("cursoricon5");

  if (button_primary) addEventListeners(button_primary);
  if (button_secondary) addEventListeners(button_secondary);

  window.onscroll = () => {
    btnScrollTop.style.opacity =
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
        ? 1
        : 0;
  };

  btnScrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  btnScrollTop.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(1.3)", "none");
    addClass(cursor, "transparent");
    addClass(cursoricon5, "active");
  });

  btnScrollTop.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    removeClass(cursor, "transparent");
    removeClass(cursoricon5, "active");
  });

  function addEventListeners(button) {
    button.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    button.addEventListener("mouseout", () => {
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });
  }

  popupContainer.addEventListener("click", (event) => {
    closePopup(popupContainer, popupImage, event);
  });
  close_text.addEventListener("click", (event) => {
    closePopup(popupContainer, popupImage, event);
  });

  modifyScrollBar();
  document.addEventListener("scroll", updateProgressBarandBtn);
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
      addClass(cursortext, "active");
      cursorTransformShadowBlend("scale(7)", "none");
    });

    mockup.addEventListener("mouseout", () => {
      cursor.style.outline = "none";
      removeClass(cursortext, "active");
      cursorTransformShadowBlend("none", "0px 0px 30px white", "normal");
    });
  });

  const changeCursorText = (video) => {
    if (video.playing) {
      cursortext.innerHTML = 'Pause<br><i class="fa-solid fa-pause"></i>';
      controlPause.style.opacity = "1";
      controlPlay.style.opacity = "0";
      iconsMainReplay.style.opacity = "0";
      iconsMainReplay.style.visibility = "hidden";
      return;
    }
    if (video.ended) {
      cursortext.innerHTML = 'Restart<br><i class="fa-solid fa-repeat"></i>';
      controlPause.style.opacity = "0";
      controlPlay.style.opacity = "0";
      iconsMainReplay.style.opacity = "1";
      iconsMainReplay.style.visibility = "visible";
      video.style.opacity = "0.3";
      video.style.filter = "grayscale(100%)";
      return;
    }
    cursortext.innerHTML = 'Play<br><i class="fa-solid fa-play"></i>';
    controlPause.style.opacity = "0";
    controlPlay.style.opacity = "1";
    iconsMainReplay.style.visibility = "hidden";
    playback_icons_main.style.display = "";
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
  if (isPaused) {
    video.play();
  } else {
    video.pause();
  }
  controlPlay.style.opacity = isPaused ? "0" : "1";
  controlPause.style.opacity = isPaused ? "1" : "0";
  iconsMainReplay.style.opacity = "0";
  iconsMainReplay.style.visibility = "hidden";
  progressBar.style.backgroundColor = isPaused ? "white" : "#4d4d4d";
}

function removeCover() {
  const blackCover = document.querySelector(".black_cover");

  addClass(blackCover, "hide");

  setTimeout(() => {
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
    addClass(mockup_pc, "visible");
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
    document.querySelector(".project_demo_text").remove();
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

  [control_rewind, control_forward, control_backward].forEach((control) => {
    control.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });
  });

  [control_rewind, control_forward, control_backward].forEach((control) => {
    control.addEventListener("mouseout", () => {
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });
  });

  control_rewind.addEventListener("click", () => (element.currentTime = 0));
  control_forward.addEventListener("click", () => (element.currentTime += 5));
  control_backward.addEventListener("click", () => (element.currentTime -= 5));
  playback_icons_main.addEventListener("click", () => playPauseVideo(element));
  iconsMainReplay.addEventListener("click", () => {
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
  get() {
    return (
      this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2
    );
  },
});

function closePopup(popup_image_container, popup_image) {
  removeClass(popup_image_container, "show");
  removeClass(popup_image, "show");
}

function addImagesPopupEvents(popup_image, popup_image_container, children) {
  for (const child of children) {
    if (child.tagName.toLowerCase() === "img") {
      child.addEventListener("click", () => {
        popup_image.src = child.getAttribute("src");
        setTimeout(() => {
          addClass(popup_image_container, "show");
          addClass(popup_image, "show");
        }, 100);
      });

      const cursoriconmagnify = document.getElementById("cursoriconmagnify");

      child.addEventListener("mouseover", () => {
        cursorTransformShadowBlend("scale(1.5)", "none");
        addClass(cursor, "transparent");
        addClass(cursoriconmagnify, "active");
      });

      child.addEventListener("mouseout", () => {
        removeClass(cursor, "transparent");
        removeClass(cursoriconmagnify, "active");
        cursorTransformShadowBlend();
      });
    }
  }
}

export function modifyScrollBar() {
  const scrollbarContainerParent = document.querySelector(
    ".scrollbar_progress_container_parent"
  );
  scrollbarContainerParent.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(5)";
    cursor.style.boxShadow = "none";
    cursor.style.outlineWidth = "0px";
    addClass(cursortext2, "active");
    addClass(cursor, "transparent");
  });

  scrollbarContainerParent.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 30px white";
    removeClass(cursortext2, "active");
    removeClass(cursor, "transparent");
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

function createImages(project_images) {
  if (project_images) {
    const project_images_div = document.querySelector(".project_images");

    // Clear existing images before adding new ones
    project_images_div.innerHTML = "";

    project_images?.sort()?.forEach((image_url) => {
      const img = document.createElement("img");
      img.src = image_url;
      img.className = "project_image";
      project_images_div.appendChild(img);
    });

    // If on desktop, initialize the slider
    if (window.innerWidth >= 768) {
      initializeSlider();
    }

    return true;
  } else {
    document.querySelector(".image_gallery").remove();
    return false;
  }
}

function initializeSlider() {
  const project_images_div = document.querySelector(".project_images");
  const images = project_images_div.querySelectorAll(".project_image");
  const nextButton = document.querySelector(".slider-button .next");
  const prevButton = document.querySelector(".slider-button .prev");
  const dotsContainer = document.querySelector(".dots");

  let currentIndex = 0;

  // Create dots based on the number of images
  function createDots() {
    dotsContainer.innerHTML = ""; // Clear any existing dots
    images.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
    });
  }

  // Set active class to the current dot
  function setActiveDot() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Function to show the current image
  function showImage(index) {
    images.forEach((img, i) => {
      img.style.display = i === index ? "block" : "none";
    });
    setActiveDot(); // Update the active dot
  }

  // Create dots and initialize the first image
  createDots();
  showImage(currentIndex);

  // Event listeners for prev and next buttons
  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    showImage(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    showImage(currentIndex);
  });

  // Event listeners for dots to jump to specific image
  dotsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dot")) {
      currentIndex = parseInt(e.target.dataset.index, 10);
      showImage(currentIndex);
    }
  });

  // Cursor effects for buttons and dots
  [nextButton, prevButton, ...dotsContainer.querySelectorAll(".dot")].forEach(
    (element) => {
      element.addEventListener("mouseover", () => {
        cursorTransformShadowBlend("scale(1.3)", "none");
        addClass(cursor, "transparent");
        addClass(cursoricon5, "active");
      });

      element.addEventListener("mouseout", () => {
        cursorTransformShadowBlend();
        removeClass(cursor, "transparent");
        removeClass(cursoricon5, "active");
      });
    }
  );
}

function normalHeaders(flag) {
  if (!flag) return;

  // Header Scrolling Carousel
  const lerp = (f0, f1, t) => (1 - t) * f0 + t * f1;
  const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

  class DragScroll {
    constructor(obj) {
      this.el = document.querySelector(obj.el);
      this.wrap = this.el.querySelector(obj.wrap);
      this.items = this.el.querySelectorAll(obj.item);
      this.bar = this.el.querySelector(obj.bar);
      this.init();
    }

    init() {
      this.progress = 0;
      this.speed = 0;
      this.oldX = 0;
      this.x = 0;
      this.playrate = 0;

      this.bindings();
      this.events();
      this.calculate();
      this.raf();
    }

    bindings() {
      [
        "events",
        "calculate",
        "raf",
        "handleWheel",
        "move",
        "raf",
        "handleTouchStart",
        "handleTouchMove",
        "handleTouchEnd",
      ].forEach((method) => {
        this[method] = this[method].bind(this);
      });
    }

    calculate() {
      this.progress = 0;
      this.wrapWidth = this.items[0].clientWidth * this.items.length;
      this.wrap.style.width = `${this.wrapWidth}px`;
      this.maxScroll = this.wrapWidth - this.el.clientWidth;
    }

    handleWheel() {
      this.progress = window.scrollY;
      this.move();
    }

    handleTouchStart(e) {
      e.preventDefault();
      this.dragging = true;
      this.startX = e.clientX || e.touches[0].clientX;
      this.el.classList.add("dragging");
    }

    handleTouchMove(e) {
      if (!this.dragging) return false;
      const x = e.clientX || e.touches[0].clientX;
      this.progress += (this.startX - x) * 2.5;
      this.startX = x;
      this.move();
    }

    handleTouchEnd() {
      this.dragging = false;
      this.el.classList.remove("dragging");
    }

    move() {
      this.progress = clamp(this.progress, 0, this.maxScroll);
    }

    events() {
      window.addEventListener("resize", this.calculate);
      window.addEventListener("wheel", this.handleWheel);
      this.el.addEventListener("touchstart", this.handleTouchStart);
      window.addEventListener("touchmove", this.handleTouchMove);
      window.addEventListener("touchend", this.handleTouchEnd);
      window.addEventListener("mousedown", this.handleTouchStart);
      window.addEventListener("mousemove", this.handleTouchMove);
      window.addEventListener("mouseup", this.handleTouchEnd);
      document.body.addEventListener("mouseleave", this.handleTouchEnd);
    }

    raf() {
      this.x = lerp(this.x, this.progress, 0.1);
      this.playrate = this.x / this.maxScroll;

      this.wrap.style.transform = `translateX(${-this.x}px)`;
      this.bar.style.transform = `scaleX(${0.18 + this.playrate * 0.82})`;

      this.speed = Math.min(100, this.oldX - this.x);
      this.oldX = this.x;

      this.scale = lerp(this.scale, this.speed, 0.1);
      this.items.forEach((item) => {
        item.style.transform = `scale(${1 - Math.abs(this.speed) * 0.005})`;
        item.querySelector("img").style.transform = `scaleX(${
          1 + Math.abs(this.speed) * 0.004
        })`;
      });
    }
  }

  const scroll = new DragScroll({
    el: ".slider",
    wrap: ".slider-wrapper",
    item: ".slider-item",
    bar: ".slider-progress-bar",
  });

  const animateScroll = () => {
    requestAnimationFrame(animateScroll);
    scroll.raf();
  };

  animateScroll();
}
