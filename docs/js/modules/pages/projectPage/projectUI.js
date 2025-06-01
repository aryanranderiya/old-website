/**
 * @module projectUI
 * @description Handle project UI updates and rendering
 */

import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { cursorTransformShadowBlend, addClass, removeClass } from '../../cursorUtils.js';

/**
 * Setup project documentation
 * @param {string} documentationUrl - Documentation URL
 * @param {HTMLElement} infoTextElement - Info text container element
 * @param {HTMLElement} documentationElement - Documentation element
 */
export async function setupDocumentation(documentationUrl, infoTextElement, documentationElement) {
  try {
    if (documentationUrl) {
      const response = await fetch(documentationUrl);
      if (!response.ok) throw new Error(`Error! Status: ${response.status}`);

      const textContent = await response.text();
      infoTextElement.innerHTML = marked.parse(textContent);

      if (infoTextElement) setupDocumentationAnimation(infoTextElement);
    } else {
      documentationElement?.remove();
    }
  } catch (error) {
    console.error('Fetch Documentation error:', error);
    documentationElement?.remove();
  }
}

/**
 * Setup documentation animation
 * @private
 * @param {HTMLElement} infoTextElement - Info text element
 */
function setupDocumentationAnimation(infoTextElement) {
  const observerPopup = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const child = entry.target.querySelector('.pInfoText_child');
        if (entry.isIntersecting) addClass(child, 'show');
        else removeClass(child, 'show');
      });
    },
    { threshold: 0.7 }
  );

  for (const child of infoTextElement.children) {
    const container = document.createElement('div');
    addClass(container, 'pInfoText_container');
    addClass(child, 'pInfoText_child');
    child.parentNode.replaceChild(container, child);
    container.appendChild(child);
    observerPopup.observe(container);
  }
}

/**
 * Set project links
 * @param {Array<Array<string>>} links - Array of [text, url] pairs
 * @param {HTMLElement} bentoLinks - Bento links container
 * @param {HTMLElement} linksCard - Links card element
 */
export function setProjectLinks(links, bentoLinks, linksCard) {
  if (!links || links.length === 0) {
    linksCard?.remove();
    return;
  }

  links.forEach((link) => {
    const anchor = document.createElement('a');
    anchor.className = 'bento_link';
    anchor.href = link[1];
    anchor.innerHTML = `
      <span style="width=5em">${link[0]}</span>
      <i class="fa-solid fa-up-right-from-square link_icon"></i>
    `;
    bentoLinks.appendChild(anchor);
    
    // Add hover effects
    anchor.addEventListener('mouseover', () => {
      const cursor = document.querySelector('.cursor');
      const cursoricon5 = document.getElementById('cursoricon5');
      
      cursorTransformShadowBlend('scale(1.3)', 'none');
      addClass(cursor, 'transparent');
      addClass(cursoricon5, 'active');
    });

    anchor.addEventListener('mouseout', () => {
      const cursor = document.querySelector('.cursor');
      const cursoricon5 = document.getElementById('cursoricon5');
      
      removeClass(cursor, 'transparent');
      removeClass(cursoricon5, 'active');
      cursorTransformShadowBlend();
    });
  });
}

/**
 * Set tech stack icons
 * @param {Array<string>} techStack - Array of technology names
 * @param {HTMLElement} techStackElement - Tech stack container element
 */
export function setTechStack(techStack, techStackElement) {
  const replacements = {
    HTML: 'HTML5-plain colored',
    CSS: 'CSS3-plain colored',
    Express: 'express-original',
    Flask: 'flask-original',
    Tailwind: 'tailwindcss-original colored',
    Vercel: 'vercel-original',
  };
  
  techStackElement.innerHTML = techStack
    .map((element) => {
      const replacedElement = replacements[element] || `${element}-plain colored`;
      return `<div class="tech_stack_item">
        <i class="tech_stack_icon devicon-${replacedElement.toLowerCase()}"></i>
        <text>${element}&nbsp;</text>
      </div>`;
    })
    .join(' ');

  setupTechStackHover();
}

/**
 * Setup tech stack hover effects
 * @private
 */
function setupTechStackHover() {
  const techStackItems = document.querySelectorAll('.tech_stack_item');

  techStackItems.forEach((item) => {
    const iconColor = window.getComputedStyle(item.firstElementChild).color;

    item.addEventListener('mouseover', function () {
      this.style.backgroundColor =
        iconColor === 'rgb(255, 255, 255)' ? 'rgb(255, 255, 255)' : iconColor;

      for (const child of this.children) {
        child.style.color = 'black';
      }
    });

    item.addEventListener('mouseout', function () {
      this.style.backgroundColor = '';
      for (const child of this.children) {
        child.style.color = '';
      }
    });
  });
}

/**
 * Set project metadata
 * @param {Object} metadata - Project metadata
 */
export function setProjectMetadata(metadata) {
  const {
    title,
    type,
    description,
    creation,
    comments,
    titleElement,
    typeElement,
    descElement,
    createdOnElement,
    creationDateElement,
    personalCommentsElement,
    commentCardElement
  } = metadata;

  if (titleElement) titleElement.innerHTML = title;
  if (typeElement) typeElement.innerHTML = `<i> ${type} </i>`;
  if (descElement) descElement.innerHTML = description;
  document.title = title;

  if (creation && creationDateElement) {
    creationDateElement.innerHTML = creation;
  } else {
    createdOnElement?.remove();
  }

  if (comments && personalCommentsElement) {
    personalCommentsElement.innerHTML = comments;
  } else {
    commentCardElement?.remove();
  }
}