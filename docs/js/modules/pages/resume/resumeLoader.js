/**
 * @module pages/resume/resumeLoader
 * @description Module for loading and processing resume data from Firebase
 */

import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { db } from "../../config/firebase.js";

/**
 * Process resume data from Firebase snapshot
 * @param {DataSnapshot} snapshot - Firebase data snapshot
 */
export function processResume(snapshot) {
  const snapshotData = snapshot.val();
  const url = snapshotData.url;
  const text = snapshotData.text;
  const resumeElement = document.querySelector(".resume_pdf");
  const resumeAnchor = document.getElementById("download_resume_anchor");
  const resumeSubtitle = document.querySelector(".subtitle");

  if (url) {
    const mainUrl = `${url}#view=FitV&navpanes=0`;
    resumeElement.src = mainUrl;
    resumeAnchor.href = mainUrl;

    resumeSubtitle.innerHTML = text;

    resumeElement.addEventListener("load", function () {
      document.querySelector(".resumeload_container").remove();
    });
  }
}

/**
 * Initialize resume data loading from Firebase
 */
export function initializeResumeLoader() {
  const projectRef = ref(db, "Resume/");
  onValue(projectRef, processResume);
}