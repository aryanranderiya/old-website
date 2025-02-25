// ! FIREBASE INIT --------------------------------------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebase_config = {
  apiKey: "AIzaSyAUfVSJ3BpDrlV7-6Ou9DWE3KX1jHHFGEY",
  authDomain: "aryanranderiya-portfolio.firebaseapp.com",
  projectId: "aryanranderiya-portfolio",
  storageBucket: "aryanranderiya-portfolio.appspot.com",
  messagingSenderId: "540599201791",
  appId: "1:540599201791:web:757239eec07a33dc9ec1ca",
  measurementId: "G-S3XP36W3P9",
};

initializeApp(firebase_config);
const db = getDatabase();
const projectRef = ref(db, "Resume/");

// ! FIREBASE INIT --------------------------------------------------------------------------------------

onValue(projectRef, processResume);

function processResume(snapshot) {
  const snapshotData = snapshot.val();
  const url = snapshotData.url;
  const text = snapshotData.text;
  const resume_element = document.querySelector(".resume_pdf");
  const resume_anchor = document.getElementById("download_resume_anchor");
  const resume_subtitle = document.querySelector(".subtitle");

  if (url) {
    const mainUrl = `${url}#view=FitV&navpanes=0`;
    resume_element.src = mainUrl;
    resume_anchor.href = mainUrl;

    resume_subtitle.innerHTML = text;

    resume_element.addEventListener("load", function () {
      document.querySelector(".resumeload_container").remove();
    });
  }
}

const btn_download = document.querySelector(".btn_download");

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".download_button");
  const downloadresume_text = document.querySelector(".downloadresume_text");
  const svgIcon = document.querySelector(".svgIcon");
  const resume_pdf = document.querySelector(".resume_pdf");
  const cursoricon5 = document.getElementById("cursoricon5");

  var footerIntersectedFlag = false;

  resume_pdf.addEventListener("mouseover", () => {
    cursor.style.background = "#00bbff";
    cursor.style.boxShadow = "0px 0px 30px #00bbff";
  });

  resume_pdf.addEventListener("mouseout", () => {
    cursor.style.background = "";
    cursor.style.boxShadow = "0px 0px 30px white";
  });

  button.addEventListener("mouseover", () => {
    addClass(downloadresume_text, "hovered");
    addClass(svgIcon, "hovered");
    cursorTransformShadowBlend("scale(1.3)", "none");
    addClass(cursor, "transparent");
    addClass(cursoricon5, "active");
  });

  button.addEventListener("mouseout", () => {
    removeClass(downloadresume_text, "hovered");
    removeClass(svgIcon, "hovered");
    cursorTransformShadowBlend();
    removeClass(cursor, "transparent");
    removeClass(cursoricon5, "active");
  });

  //!   Set width of progress bar
  document.addEventListener("scroll", updateProgressBarandBtn);

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        addClass(button, "hovered");
        addClass(svgIcon, "hovered");
        addClass(downloadresume_text, "hovered");
        footerIntersectedFlag = true;
      } else {
        footerIntersectedFlag = false;
        removeClass(button, "hovered");
        removeClass(svgIcon, "hovered");
        removeClass(downloadresume_text, "hovered");
      }
    });
  }

  const observer1 = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.4,
  });

  observer1.observe(resume_pdf);
});

//!   Set width of progress bar
function updateProgressBarandBtn() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100 + "%";

  document
    .querySelector("#progress-bar")
    .style.setProperty("--progress", scrollPercent);
}

function addClass(element, className) {
  element.classList.add(className);
}
function removeClass(element, className) {
  element.classList.remove(className);
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
