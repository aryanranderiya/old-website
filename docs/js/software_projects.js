/**
 * @module software_projects
 * @description Software projects page main module
 */

// Import modules
import { processProjectCards, addCardHoverEffect } from "./modules/pages/softwareProjects/projectCards.js";
import { initializeSearch, initializeFilters } from "./modules/pages/softwareProjects/searchFilter.js";
import { fetchGithubProjects } from "./modules/pages/softwareProjects/githubProjects.js";
import { generateLoadingText } from "./modules/pages/softwareProjects/loadingAnimation.js";
import { processProjectIcons } from "./modules/pages/softwareProjects/projectIcons.js";
import { 
  initializeUIInteractions, 
  updateScrollProgress, 
  removePreloader 
} from "./modules/pages/softwareProjects/uiInteractions.js";

// Global variables
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

// Initialize application
try {
  generateLoadingText();
  loadProjectData();
  fetchGithubProjects();
  processProjectIcons();
} catch (error) {
  console.error("Error:", error);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeUIInteractions();
  addCardHoverEffect();
});





/**
 * Load project data and initialize UI
 */
async function loadProjectData() {
  try {
    const response = await fetch("./db/db.json");
    const db = await response.json();
    removePreloader();
    
    const projects = db.Projects;
    await processProjectCards(projects);
    initializeSearch();
    initializeFilters();
  } catch (e) {
    console.error("Error loading project data:", e);
    return;
  }
}

