// const projectId = new URLSearchParams(window.location.search).get("id");
// console.log(projectId);

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
  var banner_image_URL = snapshotData.banner_image_URL;
  var demoDownloadURL = snapshotData.demo_file_URL;
  var demo_type = snapshotData.demo_type;

  const text_project_title = document.querySelector(".project_title");
  const project_desc = document.querySelector(".project_desc");
  const p_type_text = document.querySelector(".p_type_text");
  const p_type_icon = document.querySelector(".p_type_icon");
  const tech_stack = document.querySelector(".tech_stack");
  const btn_github_anchor = document.querySelector(".btn_github_anchor");
  const project_info_text = document.querySelector(".project_info_text");
  const mockupContainer = document.querySelectorAll(".mockup_container");

  const mockup_media_laptop = document.querySelector(
    ".mockup_media_laptop.video"
  );

  const mockup_media_mobile = document.querySelector(
    ".mockup_media_mobile.video"
  );

  // Set icon for project time to mobile or pc
  if (projectType.includes("Mobile")) {
    p_type_icon.innerHTML =
      '<span class="material-symbols-outlined p_type_icon"> phone_iphone</span>';
  } else if (projectType.includes("Desktop") || projectType.includes("Web")) {
    p_type_icon.innerHTML =
      '<span class="material-symbols-outlined p_type_icon"> laptop_mac</span>';
  }

  text_project_title.innerHTML = projectTitle;
  p_type_text.innerHTML = projectType;
  project_info_text.innerHTML = projectDesc;
  project_desc.remove();
  console.log("demo url: " + demoDownloadURL);
  // project_desc.innerHTML = projectDesc;

  // if (demoDownloadURL.includes(".mp4")) {
  //   mockup_media_laptop = document.querySelector(".mockup_media_laptop.video");
  //   mockup_media_mobile = document.querySelector(".mockup_media_mobile.video");
  // } else if (
  //   demoDownloadURL.includes(".jpg") ||
  //   demoDownloadURL.includes(".png")
  // ) {
  //   mockup_media_laptop = document.querySelector(".mockup_media_laptop.image");
  //   mockup_media_mobile = document.querySelector(".mockup_media_mobile.image");
  // }

  if (demo_type == "demo_pc") {
    document.querySelector(".mockup_pc").classList.add("visible");
    mockupContainer.forEach((mockupContainerelement) => {
      mockupContainerelement.classList.add("pc");
    });
    mockup_media_laptop.src = demoDownloadURL;
    console.log("pc demo made visible");
  } else if (demo_type == "demo_mobile") {
    document.querySelector(".mockup_phone").classList.add("visible");
    mockup_media_mobile.src = demoDownloadURL;
    console.log("mobile demo made visible");
  } else {
    mockupContainer.forEach((mockupContainerelement) => {
      mockupContainerelement.classList.add("pc");
    });
    const mockup_media_laptop_image = document.querySelector(
      ".mockup_media_laptop.image"
    );

    const mockup_media_laptop_video = document.querySelector(
      ".mockup_media_laptop.video"
    );
    document.querySelector(".mockup_pc").classList.add("visible");

    mockup_media_laptop_image.src = demoDownloadURL;
    mockup_media_laptop_image.style.display = "block";
    mockup_media_laptop_video.style.display = "none";
    console.log("No Mockup found in database.");
  }

  // Set icons for tech stack
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

  // Set href for github link
  if (githubLink == null || githubLink == "" || githubLink == "null") {
    document.querySelector(".button_primary").remove();
    document.querySelector(".btn_github_anchor").remove();
  } else {
    btn_github_anchor.href = githubLink;
  }

  setTimeout(function () {
    const blackCover = document.querySelector(".black_cover");
    blackCover.classList.remove("visible");
    document.body.style.overflow = "auto";
  }, 100);
}

onValue(projectRef, processData);
// ! rest of content

document.addEventListener("DOMContentLoaded", function () {
  const button_primary = document.querySelector(".button_primary");
  const button_secondary = document.querySelector(".button_secondary");
  const cursoricon3 = document.getElementById("cursoricon3");
  const cursoricon5 = document.getElementById("cursoricon5");

  if (button_primary) {
    button_primary.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.5)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    button_primary.addEventListener("mouseout", () => {
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });
  }

  if (button_secondary) {
    button_secondary.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.5)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    button_secondary.addEventListener("mouseout", () => {
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });
  }

  hoverDevices();
});

function hoverDevices() {
  const mockups = document.querySelectorAll(".mockup");
  const mockup_pc = document.querySelector(".mockup_pc");
  const mockup_phone = document.querySelector(".mockup_phone");
  const mockup_media_mobile = document.querySelector(".mockup_media_mobile");
  const mockup_media_laptop = document.querySelector(".mockup_media_laptop");
  const cursortext = document.getElementById("cursortext");

  cursortext.style.color = "black";
  cursortext.innerHTML = 'Pause<br><i class="fa-solid fa-pause"></i>';

  mockups.forEach((mockup) => {
    mockup.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(7)");
      cursor.style.boxShadow = "none";
      cursor.style.outlineWidth = "0.01em";
      cursor.style.outlineColor = "black";
      cursor.style.outlineStyle = "solid";
      cursortext.classList.add("active");
    });

    mockup.addEventListener("mouseout", () => {
      cursor.style.outline = "none";
      cursor.style.transform = "none";
      cursor.style.mixBlendMode = "normal";
      cursor.style.boxShadow = "0px 0px 30px white";
      cursortext.classList.remove("active");
    });
  });

  let flag_playing_once = true;

  // ! Change this
  // const playPauseVideo = (videoElement) => {
  //   if (videoElement.paused) {
  //     videoElement.style.filter = "brightness(30%)";
  //     cursortext.innerHTML = 'Play<br><i class="fa-solid fa-play"></i>';
  //     videoElement.play();
  //   } else {
  //     videoElement.style.filter = "brightness(100%)";
  //     cursortext.innerHTML = 'Pause<br><i class="fa-solid fa-pause"></i>';
  //     videoElement.pause();
  //   }
  // };

  // mockup_phone.addEventListener("click", () => {
  //   playPauseVideo(mockup_media_mobile);
  // });

  // mockup_pc.addEventListener("click", () => {
  //   playPauseVideo(mockup_media_laptop);
  // });
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

function addClass(element, className) {
  element.classList.add(className);
}
function removeClass(element, className) {
  element.classList.remove(className);
}
