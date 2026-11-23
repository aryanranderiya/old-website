/**
 * @module adminPanel
 * @description Admin panel functionality for managing projects and content
 */

import {
  getDatabase,
  ref,
  set,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

import {
  getStorage,
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

/**
 * Initialize admin panel functionality
 * @param {Object} database - Firebase database instance
 * @param {Object} storage - Firebase storage instance
 */
export function initializeAdminPanel(database, storage) {
  setupFormHandlers();
  setupAddLinks();
}

/**
 * Setup form submit handlers
 * @private
 */
function setupFormHandlers() {
  const projectForm = document.getElementById('submit-project-form');
  const softwareLogosForm = document.getElementById('submit-softwarelogos-form');
  const resumeForm = document.getElementById('submit-resume-form');

  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      insertProjectData();
    });
  }

  if (softwareLogosForm) {
    softwareLogosForm.addEventListener('submit', (e) => {
      e.preventDefault();
      insertSoftwareLogoURL();
    });
  }

  if (resumeForm) {
    resumeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      insertResume();
    });
  }
}

/**
 * Setup dynamic link addition functionality
 * @private
 */
function setupAddLinks() {
  const addAnotherLink = document.querySelector('.add_another_link');
  const links = document.querySelector('.links');
  
  if (!addAnotherLink || !links) return;
  
  let count = 1;
  
  addAnotherLink.addEventListener('click', () => {
    count++;
    const link = document.createElement('div');
    link.classList.add('link');
    link.innerHTML = `
      <input class="link_text" id="link_text_${count}" type="text" placeholder="Enter Link Name">
      <input class="link_url" id="link_url_${count}" type="url" placeholder="Enter Link URL">`;
    links.appendChild(link);
  });
}

/**
 * Insert software logo URL to database
 * @private
 */
async function insertSoftwareLogoURL() {
  const database = getDatabase();
  const softwareIconsRef = ref(database, 'SoftwareIcons');
  const logoUrl = document.getElementById('software_logo')?.value || null;
  
  if (!logoUrl) {
    console.error('No logo URL provided');
    return;
  }

  try {
    const databaseRecordCount = await countDatabaseRecords('SoftwareIcons');
    const data = { [databaseRecordCount]: logoUrl };
    
    await update(softwareIconsRef, data);
    console.log('Software logo successfully inserted!');
    document.getElementById('submit-softwarelogos-form')?.reset();
  } catch (error) {
    console.error('Error inserting software logo:', error);
  }
}

/**
 * Upload and insert resume to database
 * @private
 */
async function insertResume() {
  const database = getDatabase();
  const storage = getStorage();
  const resumeRef = ref(database, 'Resume');
  const fileSelect = document.getElementById('file-select-resume');
  
  if (!fileSelect?.files[0]) {
    console.error('No file selected');
    return;
  }

  const file = fileSelect.files[0];
  const storageReference = storageRef(storage, `Resume/${file.name}`);

  try {
    await uploadBytes(storageReference, file);
    const url = await getDownloadURL(storageReference);
    await set(resumeRef, url);
    console.log('Resume successfully uploaded!');
    document.getElementById('submit-resume-form')?.reset();
  } catch (error) {
    console.error('Error uploading resume:', error);
  }
}

/**
 * Insert project data to database
 * @private
 */
async function insertProjectData() {
  try {
    const projectData = await collectProjectData();
    if (!projectData) return;
    
    const database = getDatabase();
    const projectsRef = ref(database, `Projects/${projectData.project_id}`);
    
    await set(projectsRef, projectData);
    console.log('Project successfully inserted!');
    document.getElementById('submit-project-form')?.reset();
  } catch (error) {
    console.error('Error inserting project:', error);
  }
}

/**
 * Collect project data from form
 * @private
 * @returns {Promise<Object|null>} Project data object or null
 */
async function collectProjectData() {
  const database = getDatabase();
  const databaseRecordCount = (await countDatabaseRecords('Projects')) + 1;
  
  const title = document.getElementById('project_title')?.value;
  if (!title) {
    console.error('Project title is required');
    return null;
  }
  
  const projectId = `${databaseRecordCount}_project_${title.replace(' ', '_')}_${Date.now()}`;
  
  // Collect form data
  const formData = {
    title,
    comments: document.getElementById('personal_comments')?.value || null,
    description: document.getElementById('project_description')?.value,
    shortDescription: document.getElementById('project_short_desc')?.value,
    projectCreation: document.getElementById('project_creation')?.value,
    githubLink: document.getElementById('githubLink')?.value || null,
    documentationText: document.getElementById('documentation_text')?.value,
  };
  
  // Collect project type
  let projectType = document.querySelector('input[name="project_type"]:checked')?.value;
  if (projectType === 'other172t63786123') {
    projectType = document.querySelector('.other_project_type')?.value;
  }
  
  // Collect tech stack
  const techStack = collectTechStack();
  
  // Collect demo type
  const demoType = document.querySelector('input[name="demo_type"]:checked')?.value;
  
  // Collect links
  const projectLinks = collectProjectLinks();
  
  // Upload files
  const fileUrls = await uploadProjectFiles(title, formData.documentationText, projectId);
  
  return {
    project_id: projectId,
    project_title: formData.title,
    project_type: projectType,
    project_tech_stack: techStack,
    project_description: formData.description,
    project_short_description: formData.shortDescription,
    project_creation: formData.projectCreation,
    project_personal_comments: formData.comments,
    banner_image_URL: fileUrls.bannerUrl,
    demo_file_URL: fileUrls.demoUrl,
    github_link: formData.githubLink,
    demo_type: demoType,
    project_documentation_URL: fileUrls.documentationUrl,
    project_links: projectLinks,
    project_images: fileUrls.multipleUrls,
    Likes: 0,
  };
}

/**
 * Collect tech stack from form
 * @private
 * @returns {string[]} Array of tech stack items
 */
function collectTechStack() {
  const techStack = [];
  const techStackCheckboxes = document.querySelectorAll('input[name="tech_stack"]:checked');
  
  techStackCheckboxes.forEach((checkbox) => {
    techStack.push(checkbox.value);
  });
  
  // Add custom tech stack items
  if (document.querySelector('input[name="project_type_radio"]:checked')) {
    const otherTypes = document.querySelector('.other_project_tech')?.value;
    if (otherTypes) {
      const customTech = otherTypes.split(',').map(stack => stack.trim());
      techStack.push(...customTech);
    }
  }
  
  return techStack;
}

/**
 * Collect project links from form
 * @private
 * @returns {Array<Array<string>>} Array of [text, url] pairs
 */
function collectProjectLinks() {
  const links = document.querySelectorAll('.link');
  const linksArray = [];
  
  links.forEach((link) => {
    const text = link.querySelector('.link_text')?.value;
    const url = link.querySelector('.link_url')?.value;
    if (text && url) {
      linksArray.push([text, url]);
    }
  });
  
  return linksArray;
}

/**
 * Upload all project files
 * @private
 * @param {string} title - Project title
 * @param {string} documentationText - Documentation text
 * @param {string} projectId - Project ID
 * @returns {Promise<Object>} Object containing all file URLs
 */
async function uploadProjectFiles(title, documentationText, projectId) {
  const storage = getStorage();
  
  // Get file inputs
  const bannerFile = document.getElementById('file-selector-image')?.files[0];
  const demoFile = document.getElementById('file-selector-demo')?.files[0];
  
  // Create documentation file if text exists
  let documentationFile = null;
  if (documentationText && documentationText.length > 0) {
    const blob = new Blob([documentationText], { type: 'text/plain' });
    documentationFile = new File([blob], `${projectId}_documentation.md`);
  }
  
  // Upload files
  const [bannerUrl, demoUrl, documentationUrl, multipleUrls] = await Promise.all([
    uploadMedia(bannerFile, title, 'Banner', storage),
    uploadMedia(demoFile, title, 'Demo', storage),
    uploadMedia(documentationFile, title, 'Documentation', storage),
    uploadMultipleImages(title, storage),
  ]);
  
  return {
    bannerUrl,
    demoUrl,
    documentationUrl,
    multipleUrls,
  };
}

/**
 * Upload single media file
 * @private
 * @param {File} file - File to upload
 * @param {string} title - Project title
 * @param {string} mediaType - Type of media
 * @param {Object} storage - Firebase storage instance
 * @returns {Promise<string|null>} Download URL or null
 */
async function uploadMedia(file, title, mediaType, storage) {
  if (!file) return null;
  
  const ref = storageRef(
    storage,
    `ProjectMedia/${title.replace(' ', '_')}/${file.name}`
  );
  
  console.log(`Uploading ${mediaType} to DB`);
  
  try {
    await uploadBytes(ref, file);
    const url = await getDownloadURL(ref);
    console.log(`Successfully uploaded ${mediaType}`);
    return url;
  } catch (error) {
    console.error(`Error uploading ${mediaType}:`, error);
    throw error;
  }
}

/**
 * Upload multiple project images
 * @private
 * @param {string} title - Project title
 * @param {Object} storage - Firebase storage instance
 * @returns {Promise<string[]>} Array of download URLs
 */
async function uploadMultipleImages(title, storage) {
  const projectImages = document.getElementById('project_images')?.files;
  
  if (!projectImages || projectImages.length === 0) {
    console.log('No project images to upload');
    return [];
  }
  
  const uploadPromises = Array.from(projectImages).map((file) => {
    console.log('Uploading project image:', file.name);
    return uploadMedia(file, title, 'Image', storage);
  });
  
  try {
    const urls = await Promise.all(uploadPromises);
    return urls.filter(url => url !== null);
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    return [];
  }
}

/**
 * Count database records for a reference
 * @private
 * @param {string} reference - Database reference path
 * @returns {Promise<number>} Number of records
 */
async function countDatabaseRecords(reference) {
  const database = getDatabase();
  const dbRef = ref(database, reference);
  
  try {
    const snapshot = await get(dbRef);
    
    if (snapshot.exists()) {
      const size = Object.keys(snapshot.val()).length;
      console.log(`Number of entries in ${reference}:`, size);
      return size;
    } else {
      console.log(`No data found in ${reference}`);
      return 0;
    }
  } catch (error) {
    console.error('Error counting database records:', error);
    throw error;
  }
}