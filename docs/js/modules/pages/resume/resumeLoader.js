/**
 * @module pages/resume/resumeLoader
 * @description Module for loading and processing resume data from the static db.json
 */

/**
 * Apply resume data to the page
 * @param {{url: string, text: string}} resume - Resume data
 */
export function processResume(resume) {
  if (!resume) return;

  const url = resume.url;
  const text = resume.text;
  const resumeElement = document.querySelector(".resume_pdf");
  const resumeAnchor = document.getElementById("download_resume_anchor");
  const resumeSubtitle = document.querySelector(".subtitle");

  if (url) {
    const mainUrl = `${url}#view=FitV&navpanes=0`;
    if (resumeElement) resumeElement.src = mainUrl;
    if (resumeAnchor) resumeAnchor.href = mainUrl;

    if (resumeSubtitle && text) resumeSubtitle.innerHTML = text;

    if (resumeElement) {
      resumeElement.addEventListener("load", function () {
        document.querySelector(".resumeload_container")?.remove();
      });
    }
  }
}

/**
 * Initialize resume data loading from the static db.json
 */
export async function initializeResumeLoader() {
  try {
    const response = await fetch("./db/db.json");
    const data = await response.json();
    processResume(data.Resume);
  } catch (e) {
    console.error("Error loading resume data:", e);
  }
}
