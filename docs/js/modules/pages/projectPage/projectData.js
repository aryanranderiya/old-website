/**
 * @module projectData
 * @description Handle project data loading and processing
 */

/**
 * Get project ID from URL parameters
 * @returns {string|null} Project ID or null
 */
export function getProjectIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

/**
 * Load project database
 * @returns {Promise<Object>} Database object
 */
export async function loadProjectDatabase() {
  try {
    const response = await fetch('./db/db.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load project database:', error);
    return {};
  }
}

/**
 * Get project data by ID
 * @param {Object} db - Database object
 * @param {string} projectId - Project ID
 * @returns {Object|null} Project data or null
 */
export function getProjectData(db, projectId) {
  return db.Projects?.[projectId] || null;
}

/**
 * Set page URL based on project title
 * @param {string} title - Project title
 */
export function setPageUrl(title) {
  const encodedTitle = encodeURIComponent(title);
  const url = encodedTitle.replace(/%20/g, '');
  const nextState = { additionalInformation: 'Updated the URL with JS' };
  window.history.pushState(nextState, title, url);
}