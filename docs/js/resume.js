/**
 * @module resume
 * @description Resume page main module
 */

// Import modules
import { initializeResumeLoader } from "./modules/pages/resume/resumeLoader.js";
import { initializeResumeUI, updateProgressBar } from "./modules/pages/resume/resumeUI.js";

// Initialize modules
initializeResumeLoader();

document.addEventListener("DOMContentLoaded", function () {
  initializeResumeUI();
});
