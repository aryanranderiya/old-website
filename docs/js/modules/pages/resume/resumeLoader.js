/**
 * @module pages/resume/resumeLoader
 * @description Load the bundled resume PDF and its caption
 */

/**
 * Point the embed and download link at the copy that ships with the archive.
 */
export function initializeResumeLoader() {
  const resumeElement = document.querySelector(".resume_pdf");
  const resumeAnchor = document.getElementById("download_resume_anchor");
  const resumeSubtitle = document.querySelector(".subtitle");
  const url = "media/resume/Aryan Randeriya Resume.pdf";

  if (!resumeElement) return;

  const mainUrl = `${encodeURI(url)}#view=FitV&navpanes=0`;
  resumeElement.src = mainUrl;

  if (resumeAnchor) resumeAnchor.href = encodeURI(url);
  if (resumeSubtitle) resumeSubtitle.textContent = "Archived copy · 2024";

  resumeElement.addEventListener("load", function () {
    document.querySelector(".resumeload_container")?.remove();
  });
}
