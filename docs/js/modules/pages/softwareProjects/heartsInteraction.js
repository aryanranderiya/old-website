/**
 * @module pages/softwareProjects/heartsInteraction
 * @description Module for handling hearts/likes interaction
 */

import { ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { db } from "../../config/firebase.js";
import { addClass, removeClass, cursorTransformShadowBlend } from "../../utils/domHelpers.js";

/**
 * Set up hearts/likes functionality
 */
export function setupHearts() {
  const checkboxes = document.querySelectorAll(".heart_checkboxes");

  checkboxes.forEach((checkbox) => {
    const projectId = checkbox.id;

    // Restore saved state from localStorage
    checkbox.checked = localStorage.getItem(projectId) === "true";

    // Set up hover effects
    setupHeartHoverEffects(checkbox);

    // Set up Firebase sync
    setupFirebaseSync(checkbox, projectId);
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
 * Set up Firebase sync for likes
 * @param {HTMLElement} checkbox - Heart checkbox element
 * @param {string} projectId - Project ID
 */
function setupFirebaseSync(checkbox, projectId) {
  const likesCountText = checkbox.parentElement.nextElementSibling;
  const svgContainer = checkbox.nextElementSibling;
  const projectRef = ref(db, `Projects/${projectId}`);

  let currentLikes = 0;

  // Listen for likes updates
  onValue(projectRef, (snapshot) => {
    if (snapshot.exists()) {
      currentLikes = snapshot.val().Likes || 0;
      likesCountText.textContent = currentLikes;
    }
  });

  // Handle SVG container click
  svgContainer.addEventListener("click", () => {
    checkbox.checked = !checkbox.checked;
    const changeEvent = new Event("change", {
      bubbles: true,
      cancelable: true,
    });
    checkbox.dispatchEvent(changeEvent);
  });

  // Handle checkbox change
  checkbox.addEventListener("change", () => {
    const isChecked = checkbox.checked;
    const newLikes = isChecked ? currentLikes + 1 : currentLikes - 1;

    update(projectRef, { Likes: newLikes })
      .then(() => {
        likesCountText.textContent = newLikes;
      })
      .catch((error) => console.error("Error updating data:", error));
    
    localStorage.setItem(checkbox.id, isChecked);
  });
}