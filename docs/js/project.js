/**
 * @fileoverview Project details page
 * @module project
 */

import {
  getProjectIdFromUrl,
  loadProjectDatabase,
  getProjectData,
  setPageUrl,
} from "./modules/pages/projectPage/projectData.js?v=20261124b";
import {
  setupDocumentation,
  setProjectLinks,
  setTechStack,
  setProjectMetadata,
} from "./modules/pages/projectPage/projectUI.js?v=20261124b";
import { initializeVideoControls } from "./modules/pages/projectPage/videoControls.js?v=20261124b";
import {
  setupImagePopup,
  addImagesPopupEvents,
} from "./modules/pages/projectPage/imagePopup.js?v=20261124b";
import {
  setupProjectMedia,
  setupGithubLink,
} from "./modules/pages/projectPage/projectMedia.js?v=20261124b";
import { setupProjectGallery } from "./modules/pages/projectPage/projectGallery.js?v=20261124b";
import { updateProjectSEO } from "./modules/pages/projectPage/projectSEO.js?v=20261124b";

// Scroll to top when page is refreshed
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

// Get project ID from URL
const projectId = getProjectIdFromUrl();
if (!projectId) {
  window.location.href = "SoftwareProjects.html";
}

/**
 * Get all DOM elements
 * @returns {Object} Object containing all DOM elements
 */
function getAllElements() {
  return {
    // Text elements
    textProjectTitle: document.querySelector(".project_title"),
    ptypeText: document.querySelector(".p_type_text"),
    projectDescription: document.querySelector(".project_desc"),
    pInfoText: document.querySelector(".project_info_text"),
    techStack: document.querySelector(".tech_stack"),
    createdOn: document.querySelector(".created_on"),
    creationDate: document.querySelector(".creation_date"),
    personalComments: document.querySelector(".personal_comments"),
    commentCard: document.querySelector("#comment_card"),

    // Media elements
    laptopVideo: document.querySelector(".mockup_media_laptop.video"),
    mobileVideo: document.querySelector(".mockup_media_mobile.video"),
    laptopImage: document.querySelector(".mockup_media_laptop.image"),
    mockupLaptopImage: document.querySelector(".mockup_laptop.image"),
    mockupContainer: document.querySelectorAll(".mockup_container"),
    containerPC: document.querySelector(".container-laptop"),
    containerPhone: document.querySelector(".container-mobile"),
    mockupPc: document.querySelector(".mockup_pc"),
    mockupPhone: document.querySelector(".mockup_phone"),

    // Control elements
    controlPlay: document.querySelector("#control_playback"),
    controlPause: document.getElementById("icons_main_pause"),
    iconsMainReplay: document.getElementById("icons_main_replay"),
    playbackIconsMain: document.querySelector(".icons.main"),
    playbackControls: document.querySelector(".video_controls_playback"),
    otherControls: document.querySelector(".video_controls_others"),
    controlsContainer: document.querySelector(".video_controls_container"),
    progressBar: document.querySelector("#progress-bar"),

    // Popup elements
    popupContainer: document.querySelector(".popup_image_container"),
    popupImage: document.querySelector(".popup_image"),
    closeText: document.querySelector(".close_text"),

    // Other elements
    bentoLinks: document.querySelector("#bento_links"),
    linksCard: document.querySelector("#links_card"),
    githubBentoCard: document.querySelector("#github_bento_card"),
    documentation: document.querySelector(".documentation"),
    btnScrollTop: document.querySelector(".scrolltotop"),
  };
}

/**
 * Initialize project page
 */
async function initializeProjectPage() {
  // Load database
  const db = await loadProjectDatabase();
  if (!db.Projects) {
    console.error("No projects found in database");
    return;
  }

  // Get project data
  const projectData = getProjectData(db, projectId);
  if (!projectData) {
    console.error("Project not found:", projectId);
    window.location.href = "SoftwareProjects.html";
    return;
  }

  // Get all elements
  const elements = getAllElements();

  // Update SEO meta tags and structured data
  updateProjectSEO(projectData, projectId);

  // Set page URL (optional)
  // setPageUrl(projectData.project_title);

  // Setup project metadata
  setProjectMetadata({
    title: projectData.project_title,
    type: projectData.project_type,
    description: projectData.project_description,
    creation: projectData.project_creation,
    comments: projectData.project_personal_comments,
    titleElement: elements.textProjectTitle,
    typeElement: elements.ptypeText,
    descElement: elements.projectDescription,
    createdOnElement: elements.createdOn,
    creationDateElement: elements.creationDate,
    personalCommentsElement: elements.personalComments,
    commentCardElement: elements.commentCard,
  });

  // Setup tech stack
  if (projectData.project_tech_stack) {
    setTechStack(projectData.project_tech_stack, elements.techStack);
  }

  // Setup links
  setProjectLinks(
    projectData.project_links,
    elements.bentoLinks,
    elements.linksCard
  );

  // Setup GitHub link
  setupGithubLink(projectData.github_link, elements.githubBentoCard);

  // Setup media
  setupProjectMedia(projectData, elements);

  // Setup image gallery
  setupProjectGallery(projectData.project_images);

  // Setup video controls
  initializeVideoControls(elements);

  // Setup documentation
  await setupDocumentation(
    projectData.project_documentation_URL,
    elements.pInfoText,
    elements.documentation
  );

  // Setup image popup
  setupImagePopup(
    elements.popupImage,
    elements.popupContainer,
    elements.closeText
  );

  // Add popup events to documentation images
  if (elements.pInfoText) {
    addImagesPopupEvents(
      elements.popupImage,
      elements.popupContainer,
      elements.pInfoText.children
    );
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeProjectPage);
