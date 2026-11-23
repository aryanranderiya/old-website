/**
 * @fileoverview Main entry point for the portfolio website
 * @module index
 */

// Import external dependencies
import { Gradient } from './gradient.js';

// Import modular components
import * as cursorUtils from './modules/cursorUtils.js';
import * as animationSetup from './modules/animationSetup.js';
import * as bentoSetup from './modules/bentoSetup.js';
import * as projectSetup from './modules/projectSetup.js';
import * as servicesSetup from './modules/servicesSetup.js';
import * as stepsSetup from './modules/stepsSetup.js';
import * as eventListeners from './modules/eventListeners.js';
import * as uiHelpers from './modules/uiHelpers.js';

/**
 * Initialize gradient animation
 */
function initializeGradient() {
  new Gradient().initGradient('#gradient-canvas-main');
}

/**
 * Load database from JSON file
 * @returns {Promise<Object>} Database object
 */
async function loadDatabase() {
  try {
    const response = await fetch('./db/db.json');
    return await response.json();
  } catch (e) {
    console.error('Failed to load database:', e);
    return {};
  }
}

/**
 * Initialize all components with database data
 * @param {Object} db - Database object
 */
async function initializeComponents(db) {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  
  // Setup animations
  animationSetup.animateTitleSection();
  animationSetup.setupAnimationLargeText();
  animationSetup.setupGSAPChips();
  animationSetup.animateTextColor();
  
  // Setup bento components
  bentoSetup.setupGithubBento(db);
  bentoSetup.setupTimeBento();
  bentoSetup.setupBentoAnimation();
  
  // Setup project components
  projectSetup.setupFeaturedProjects(db);
  projectSetup.setupFeaturedClients(db);
  
  // Setup services components
  servicesSetup.setupServices(db);
  servicesSetup.setupTestimonials(db);
  servicesSetup.setupNowItems(db);
  
  // Setup steps
  stepsSetup.createSteps();
  
  // Setup event listeners
  eventListeners.confettiContact();
  eventListeners.setupCoolButtons();
  
  // Refresh ScrollTrigger after all setup
  ScrollTrigger.refresh();
}

/**
 * Initialize cursor and initial UI state
 */
function initializeUI() {
  const cursor = document.querySelector('.cursor');
  const scrollBtn = document.querySelector('.scroll_btn');
  
  if (cursor) {
    cursor.style.boxShadow = 'none';
  }
  
  if (scrollBtn) {
    eventListeners.addListeners(scrollBtn);
  }
}

/**
 * Main initialization function
 */
async function initialize() {
  // Initialize gradient immediately
  initializeGradient();
  
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', async () => {
    // Remove black cover after delay
    setTimeout(() => {
      uiHelpers.removeBlackCover();
    }, 1400);
    
    // Initialize UI
    initializeUI();
    
    // Load database and initialize components
    const db = await loadDatabase();
    if (Object.keys(db).length > 0) {
      await initializeComponents(db);
    }
  });
}

// Start the application
initialize();

// Export utilities for potential external use
export {
  cursorUtils,
  animationSetup,
  bentoSetup,
  projectSetup,
  servicesSetup,
  stepsSetup,
  eventListeners,
  uiHelpers
};