/**
 * @module pages/softwareProjects/heartsInteraction
 * @description Module for handling hearts/likes interaction.
 * Like counts are read from the static db.json; the toggle state is
 * persisted per-visitor in localStorage (no backend writes).
 */

import { addClass, removeClass, cursorTransformShadowBlend } from "../../utils/domHelpers.js";

/**
 * Set up hearts/likes functionality
 */
export async function setupHearts() {
  const checkboxes = document.querySelectorAll(".heart_checkboxes");

  // Load static like counts from db.json
  let likesMap = {};
  try {
    const response = await fetch("./db/db.json");
    const data = await response.json();
    const projects = data.Projects || {};
    Object.entries(projects).forEach(([id, p]) => {
      likesMap[id] = p.Likes || 0;
    });
  } catch (e) {
    console.error("Error loading like counts:", e);
  }

  checkboxes.forEach((checkbox) => {
    const projectId = checkbox.id;

    // Restore saved state from localStorage
    checkbox.checked = localStorage.getItem(projectId) === "true";

    // Set up hover effects
    setupHeartHoverEffects(checkbox);

    // Set up like count + local toggle
    setupLikeCounter(checkbox, projectId, likesMap[projectId] || 0);
  });
}

/**
 * Set up hover effects for heart button
 * @param {HTMLElement} checkbox - Heart checkbox element
 */
function setupHeartHoverEffects(checkbox) {
  const heartButton = checkbox.parentElement.parentElement;

  heartButton.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(1.3)", "none");
    addClass(cursor, "transparent");
    addClass(cursoricon5, "active");
  });

  heartButton.addEventListener("mouseout", () => {
    removeClass(cursor, "transparent");
    removeClass(cursoricon5, "active");
    cursorTransformShadowBlend();
  });
}

/**
 * Set up the like counter and local (display-only) toggle
 * @param {HTMLElement} checkbox - Heart checkbox element
 * @param {string} projectId - Project ID
 * @param {number} baseLikes - Base like count from db.json
 */
function setupLikeCounter(checkbox, projectId, baseLikes) {
  const likesCountText = checkbox.parentElement.nextElementSibling;
  const svgContainer = checkbox.nextElementSibling;

  // Display count includes this visitor's own like if previously toggled
  const render = () => {
    const offset = checkbox.checked ? 1 : 0;
    if (likesCountText) likesCountText.textContent = baseLikes + offset;
  };
  render();

  // Handle SVG container click
  svgContainer?.addEventListener("click", () => {
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
  });

  // Handle checkbox change (local only)
  checkbox.addEventListener("change", () => {
    localStorage.setItem(checkbox.id, checkbox.checked);
    render();
  });
}
