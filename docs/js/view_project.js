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

  const text_project_title = document.querySelector(".project_title");
  const project_desc = document.querySelector(".project_desc");
  const p_type_text = document.querySelector(".p_type_text");
  const p_type_icon = document.querySelector(".p_type_icon");
  const tech_stack = document.querySelector(".tech_stack");
  const btn_github_anchor = document.querySelector(".btn_github_anchor");
  const project_info_text = document.querySelector(".project_info_text");
  const mockup_video_laptop = document.querySelector(".mockup_video_laptop");

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
  mockup_video_laptop.src = demoDownloadURL;
  console.log("demo url: " + demoDownloadURL);
  // project_desc.innerHTML = projectDesc;

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
});

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
