/**
 * @module resume
 * @description Resume page main module
 */

// Import modules
import { initializeResumeLoader } from "./modules/pages/resume/resumeLoader.js?v=20261124b";
import { initializeResumeUI, updateProgressBar } from "./modules/pages/resume/resumeUI.js?v=20261124b";

// Initialize modules
initializeResumeLoader();

document.addEventListener("DOMContentLoaded", function () {
  initializeResumeUI();
});
