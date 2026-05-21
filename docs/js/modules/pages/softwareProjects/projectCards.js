/**
 * @module pages/softwareProjects/projectCards
 * @description Module for creating and managing project cards
 */

import { addClass, removeClass, cursorTransformShadowBlend } from "../../utils/domHelpers.js";
import { setupHearts } from "./heartsInteraction.js";

/**
 * Process project data and create cards
 * @param {Object} projects - Projects data from database
 */
export async function processProjectCards(projects) {
  const cards = document.querySelector(".cards");

  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });

  Object.entries(projects)
    .sort(sortProjects)
    .map(([projectId, project]) => {
      const card = createProjectCard(projectId, project);
      cards.appendChild(card);
      observer.observe(card);
    });

  setupCardInteractions();
  setupHearts();
}

/**
 * Sort projects based on featured, client work, and bad status
 */
function sortProjects([, projectA], [, projectB]) {
  if (projectA.featured && !projectB.featured) return -1;
  if (!projectA.featured && projectB.featured) return 1;

  if (projectA.client_work && !projectB.client_work) return -1;
  if (!projectA.client_work && projectB.client_work) return 1;

  if (projectA.bad && !projectB.bad) return 1;
  if (!projectA.bad && projectB.bad) return -1;

  return 0;
}

/**
 * Create a project card element
 * @param {string} projectId - Project ID
 * @param {Object} project - Project data
 * @returns {HTMLElement} Project card element
 */
function createProjectCard(projectId, project) {
  const projectTitle = project.project_title;
  const projectDesc = project.project_short_description || project.project_description;
  const projectType = project.project_type;
  const isFeatured = project.featured || false;
  const isClientWork = project.client_work || false;
  const hackathon = project.hackathon || false;
  const projectTechStack = project.project_tech_stack || [];
  const bannerImageURL = project.banner_image_URL || "/media/bg_aryan_swirl.webp";

  // Preload image
  const img = new Image();
  img.src = project.banner_image_URL;
  img.style.display = "none";
  document.body.appendChild(img);

  const replacements = {
    HTML: "HTML5-plain colored",
    CSS: "CSS3-plain colored",
    Express: "express-original",
    Flask: "flask-original",
    Tailwind: "tailwindcss-original colored",
    Vercel: "vercel-original",
    nextjs: "nextjs-plain",
    denojs: "denojs-wordmark",
  };

  const card = document.createElement("div");
  addClass(card, "card");

  card.innerHTML = `
    <div class="card-content">
    </div>
    <div class="card-image-div">
    <img class="card-image" loading="eager" src="./media/bg_aryan_swirl.webp" data-src="${bannerImageURL}" alt="Project Card Image">
    </img>
    </div>
    <div class="card-info-wrapper">
    <div class="tagsparent">
     
    </div>
        <div class="card-info">
          <div class="card-info-title">
            <span class="card-title">${projectTitle}</span>

            <span class="card-type">
              <i>${projectType === "Web Application" ? "Website" : projectType}</i>
            </span>
            <div class="card-tech-stack">
            <div class="special-tags">
            ${isFeatured ? `<div class='featuredtag'><span class="material-symbols-rounded">star</span>Featured Project</div>` : ``}
            ${isClientWork ? `<div class='clienttag'><span class="material-symbols-rounded">payments</span>Freelance</div>` : ``}
            ${hackathon ? `<div class='hackathon'><span class="material-symbols-rounded">trophy</span>Hackathon Project</div>` : ``}
            </div>
            
              ${projectTechStack
                .map((element) => {
                  const replacedElement = replacements[element] || `${element}-plain colored`;
                  return `<div class="tech_stack_item"><i class="tech_stack_icon devicon-${replacedElement.toLowerCase()}"></i> <text>${
                    element.charAt(0).toUpperCase() + element.slice(1)
                  }&nbsp;</text></div>`;
                })
                .join(" ")}
                
            </div>
          </div>
          <span class="card-desc">${projectDesc}</span>
        </div>
      </div>
    </div>
    <div class="buttons">
      <a href="./Project.html?id=${projectId}" class="w-full">
        <button class="button_secondary view_project w-full" aria-label="View Project Info">
          View Project
          <div class="icon">
            <i class="fa-solid fa-up-right-from-square btn_icon_2" style="font-size:1em"></i>
          </div>
        </button>
      </a>
    </div>
  `;

  // Add click handler for card content
  const content = card.querySelector(".card-content");
  content.addEventListener("click", () => {
    window.location.href = `Project.html?id=${projectId}`;
  });

  return card;
}

/**
 * Handle intersection observer for card animations
 */
function handleIntersection(entries) {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, index * 100);
    } else {
      entry.target.style.opacity = "0";
      entry.target.style.transform = "translateY(10%)";
    }
  });
}

/**
 * Set up card hover interactions
 */
function setupCardInteractions() {
  const allCards = document.querySelectorAll(".card");

  allCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      removeClass(card, "grayscale");
      allCards.forEach((otherCard) => {
        if (otherCard !== card) addClass(otherCard, "grayscale");
      });
    });
    
    card.addEventListener("mouseout", () => {
      allCards.forEach((otherCard) => removeClass(otherCard, "grayscale"));
    });
  });

  // Load card images
  const cardImages = document.querySelectorAll(".card-image");
  cardImages.forEach((img) => {
    img.src = img.getAttribute("data-src");
  });

  // Set up button hover effects
  const buttons = document.querySelectorAll(".button_secondary");
  const cardContents = document.querySelectorAll(".card-content");

  [buttons, cardContents].forEach((items) => {
    items.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cursorTransformShadowBlend("scale(1.3)", "none");
        addClass(cursor, "transparent");
        addClass(cursoricon5, "active");
      });

      item.addEventListener("mouseout", () => {
        removeClass(cursor, "transparent");
        removeClass(cursoricon5, "active");
        cursorTransformShadowBlend();
      });
    });
  });

  // Tech stack hover effects
  const techStackItems = document.querySelectorAll(".tech_stack_item");
  techStackItems.forEach((item) => {
    const iconColor = window.getComputedStyle(item.firstElementChild).color;

    item.addEventListener("mouseover", function () {
      this.style.backgroundColor = iconColor === "rgb(255, 255, 255)" ? "rgb(255, 255, 255)" : iconColor;
      for (const child of this.children) {
        child.style.color = "black";
      }
    });

    item.addEventListener("mouseout", function () {
      this.style.backgroundColor = "";
      for (const child of item.children) {
        child.style.color = "";
      }
    });
  });
}

/**
 * Add hover effect for cards
 */
export function addCardHoverEffect() {
  document.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("card")) {
      cursor.style.transform = "scale(1)";
      cursor.style.boxShadow = "0px 0px 20px white, 0px 0px 35px white, 0px 0px 50px white, 0px 0px 60px white, 0px 0px 70px white,0px 0px 80px white,0px 0px 95px white, 0px 0px 110px white";
    }
  });

  document.addEventListener("mouseout", (event) => {
    if (event.target.classList.contains("card")) {
      cursor.style.transform = "none";
      cursor.style.boxShadow = "0px 0px 30px white";
    }
  });
}