/**
 * @module projectSetup
 * @description Setup functions for projects display and interactions
 */

import { cursorTransformShadowBlend, addClass, removeClass } from './cursorUtils.js?v=20261124b';

/**
 * Setup featured projects section
 * @param {Object} db - Database object containing project data
 */
export async function setupFeaturedProjects(db) {
  const featuredContainer = document.querySelector('.featured_projects');
  const hoverCard = document.querySelector('.featured_project_hover_card');
  
  if (!featuredContainer || !hoverCard) return;
  
  const hoverCardBtn = hoverCard.querySelector('.featured_project_hover_card_btn');
  const hoverCardDesc = hoverCard.querySelector('.featured_project_hover_card_description');

  hoverCard.style.cssText =
    'width: 300px; height: 200px; border-radius: 20px; background-color: #00bbff;';

  const featuredProjects = db.Homepage_Featured_Projects;
  const projects = db.Projects;

  const fragment = document.createDocumentFragment();

  // Loop through featured projects and create elements
  Object.entries(featuredProjects).forEach(([key, projectId]) => {
    const data = projects[projectId];
    if (!data) return;

    const featuredProject = document.createElement('a');
    featuredProject.innerHTML = `
      <div class="featured_project_card">
        <span class="featured_project_name">${data.project_title}</span>
        <div class="featured_project_info">
          <span class="featured_project_type">${data.project_type}</span>
          <span class="featured_project_type2">${data.project_creation}</span>
        </div>
      </div>
      <hr class="featured_project_separator">`;

    if (key.toLowerCase() === 'latest') {
      const card = featuredProject.querySelector('.featured_project_card');
      const latestDiv = document.createElement('div');
      latestDiv.classList.add('latest_work');
      latestDiv.innerText = 'Latest';
      card.insertBefore(latestDiv, card.firstChild);
      fragment.insertBefore(featuredProject, fragment.firstChild);
    } else {
      fragment.appendChild(featuredProject);
    }

    // ScrollTrigger Animation
    gsap.to(featuredProject, {
      scrollTrigger: {
        trigger: featuredProject,
        start: 'top+=10 center',
        end: 'bottom center',
        onEnter: () => handleHover(featuredProject, data, true),
        onLeave: () => handleHover(featuredProject, data, false),
        onEnterBack: () => handleHover(featuredProject, data, true),
        onLeaveBack: () => handleHover(featuredProject, data, false),
      },
    });

    let activeComponent = null;

    function handleHover(project, data, isEntering) {
      if (isEntering) {
        if (activeComponent && activeComponent !== project)
          handleHover(activeComponent, data, false);
        activeComponent = project;
        hoverCard.style.opacity = '1';
        hoverCard.style.scale = '1';
        hoverCardBtn.href = `Project.html?id=${projectId}`;
        project.href = `Project.html?id=${projectId}`;
        project.style.backgroundColor = '#00bbff';
        hoverCardDesc.innerText = data.project_short_description;
        hoverCardDesc.style.opacity = '1';
        hoverCardBtn.style.opacity = '1';
      } else {
        hoverCard.style.opacity = '0';
        hoverCard.style.scale = '0';
        hoverCardDesc.style.opacity = '0';
        hoverCardBtn.style.opacity = '0';
        project.style.backgroundColor = '';
        activeComponent = null;
      }
    }
  });

  // Append to DOM
  featuredContainer.appendChild(fragment);
  ScrollTrigger.refresh();
}

/**
 * Preload image with delay
 * @param {string} url - Image URL
 * @param {number} delay - Delay in milliseconds
 * @returns {Promise<string|null>} Object URL or null on error
 */
async function preloadImage(url, delay) {
  await new Promise((resolve) => setTimeout(resolve, delay));

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Failed to preload image:', error);
    return null;
  }
}

/**
 * Setup featured clients section with cards
 * @param {Object} db - Database object containing client data
 */
export async function setupFeaturedClients(db) {
  const clientsection = document.querySelector('.clientsection');
  if (!clientsection) return;
  
  let index = 0;

  const featuredClients = db.Homepage_Featured_Clients;
  const projects = db.Projects;

  const projectPromises = featuredClients
    .map((projectId) => {
      return projects[projectId]
        ? { projectId, clientProject: projects[projectId] }
        : null;
    })
    .filter(Boolean);

  const fragment = document.createDocumentFragment();

  // Process each client project
  projectPromises.forEach(async ({ clientProject, projectId }) => {
    index++;

    const projectImage =
      Array.isArray(clientProject?.project_images) &&
      clientProject.project_images.length > 0
        ? clientProject.project_images
        : [clientProject?.banner_image_URL];

    const imagesArray = Array.isArray(projectImage)
      ? projectImage
      : [projectImage];

    const preloadedImages = imagesArray.map((url, index) =>
      preloadImage(url, (index + 1) * 700)
    );

    const card = createClientCard(index, clientProject, projectId, preloadedImages, imagesArray);
    fragment.appendChild(card);
    ScrollTrigger.refresh();
  });

  clientsection.appendChild(fragment);
  setupClientSectionAnimations();
  setupProjectPopup(projectPromises);
}

/**
 * Create a client project card
 * @private
 */
function createClientCard(index, clientProject, projectId, preloadedImages, imagesArray) {
  const card = document.createElement('div');
  const topValue = `${index * 45 + 10}px`;
  const smTopValue = `${8}vw`;

  card.style.top = window.innerWidth >= 600 ? smTopValue : topValue;
  card.classList.add(
    'sticky',
    'bg-[#00bbff]',
    'outline',
    'outline-[black]',
    'outline-[2px]',
    'rounded-3xl',
    'min-h-fit',
    'clientProjectCard',
    'sm:min-h-[0vh]',
    'h-fit',
    'w-[95vw]',
    'flex',
    'flex-col',
    'box-border',
    'sm:px-5',
    'px-3',
    'py-2',
    'sm:pb-3',
    'pb-[30px]',
    'gap-2',
    'shadow-xl',
    'overflow-hidden',
    'mt-[-70px]'
  );

  // Add hover interactions
  card.addEventListener('mouseover', () => {
    const cursor = document.querySelector('.cursor');
    const cursortext = document.getElementById('cursortext');
    
    cursorTransformShadowBlend('scale(9)', 'none');
    cursor.style.outlineStyle = 'solid';
    cursor.style.outlineColor = 'white';
    cursor.style.outlineWidth = '0.1px';
    cursortext.innerHTML = `CLICK TO VIEW MORE`;
    cursortext.classList.add('text-black', 'text-[1px]', '!font-bold');
    cursortext.style.transform = 'scale(0.7)';
    addClass(cursor, 'partially_transparent2');
    addClass(cursortext, 'active');
  });

  card.addEventListener('mouseout', () => {
    const cursor = document.querySelector('.cursor');
    const cursortext = document.getElementById('cursortext');
    
    cursor.style.outline = 'none';
    cursorTransformShadowBlend();
    cursortext.classList.remove('text-black');
    removeClass(cursor, 'partially_transparent2');
    removeClass(cursortext, 'active');
  });

  // Header with title
  const headerDiv = document.createElement('div');
  headerDiv.classList.add(
    'flex',
    'justify-evenly',
    'items-center',
    'w-full',
    'text-black'
  );

  const titleDiv = document.createElement('div');
  titleDiv.classList.add(
    'w-full',
    'sm:text-xl',
    'text-lg',
    'font-bold',
    'uppercase',
    'text-center'
  );
  titleDiv.textContent = clientProject.project_title;

  headerDiv.appendChild(titleDiv);
  card.appendChild(headerDiv);

  // Content with image
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('w-full', 'flex', 'flex-col', 'relative');

  const imageContainer1 = document.createElement('div');
  imageContainer1.classList.add('w-full', 'flex', 'flex-col', 'relative');

  const image = document.createElement('img');
  image.alt = 'Project Image 1';
  preloadedImages[0].then((preloadedURL) => {
    if (preloadedURL) image.src = preloadedURL;
  });
  image.classList.add(
    'rounded-3xl',
    'h-fit',
    'object-cover',
    'sm:min-h-[80vh]',
    'sm:max-h-[80vh]',
    'aspect-video'
  );

  image.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  const imageContainer2 = document.createElement('div');
  imageContainer2.classList.add(
    'w-full',
    'flex',
    'flex-col',
    'relative',
    'sm:min-h-[80vh]',
    'sm:max-h-[80vh]',
    'overflow-hidden'
  );
  imageContainer2.appendChild(image);

  contentDiv.appendChild(imageContainer1);
  contentDiv.appendChild(imageContainer2);
  card.appendChild(contentDiv);

  return card;
}

/**
 * Setup client section animations
 * @private
 */
function setupClientSectionAnimations() {
  const clientsection = document.querySelector('.clientsection');
  const clientsection_title = document.querySelector('.clientsection .title');

  if (!clientsection || !clientsection_title) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        clientsection_title.style.transform = entry.isIntersecting
          ? 'translateX(100vw)'
          : 'translateX(-100vw)';
      });
    },
    { rootMargin: '-400px 0px', threshold: 0.5 }
  );

  observer.observe(clientsection);

  const tl0 = gsap.timeline({
    scrollTrigger: {
      trigger: '.clientsection',
      start: 'top-=400 bottom',
      end: 'bottom center',
      scrub: true,
    },
  });

  gsap.set('.clientsection .title', {
    x: '20%',
  });
  tl0.to('.clientsection .title', {
    x: '-20%',
  });
  ScrollTrigger.refresh();
}

/**
 * Setup project popup modal
 * @private
 */
function setupProjectPopup(projectPromises) {
  const popup = document.getElementById('projectPopup');
  const popupContent = document.getElementById('popupContent');
  const popupImage = document.getElementById('popupImage');
  const popupTitle = document.getElementById('popupTitle');
  const popupAnchor = document.getElementById('popupAnchor');
  const popupDescription = document.getElementById('popupDescription');
  const closePopup = document.getElementById('closePopup');
  const prevImage = document.getElementById('prevImage');
  const nextImage = document.getElementById('nextImage');
  const dotsContainer = document.querySelector('.dotsContainer');

  if (!popup) return;

  [nextImage, prevImage, closePopup].forEach((element) => {
    if (!element) return;
    
    element.addEventListener('mouseover', () => {
      const cursor = document.querySelector('.cursor');
      const cursoricon5 = document.getElementById('cursoricon5');
      
      cursorTransformShadowBlend('scale(1.3)', 'none');
      addClass(cursor, 'transparent');
      addClass(cursoricon5, 'active');
    });

    element.addEventListener('mouseout', () => {
      const cursor = document.querySelector('.cursor');
      const cursoricon5 = document.getElementById('cursoricon5');
      
      cursorTransformShadowBlend();
      removeClass(cursor, 'transparent');
      removeClass(cursoricon5, 'active');
    });
  });

  let currentImages = [];
  let currentIndex = 0;

  function updateDots() {
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';

    if (currentImages.length > 1)
      currentImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add(
          'dot',
          'w-2',
          'h-2',
          'rounded-full',
          'cursor-pointer',
          'bg-gray-600'
        );

        if (index === currentIndex) {
          dot.classList.remove('bg-gray-600');
          dot.classList.add('bg-white');
        }

        dot.addEventListener('click', () => {
          currentIndex = index;
          updateImage();
          updateDots();
        });

        dotsContainer.appendChild(dot);
      });
  }

  function openPopup(images, title, description, projectId, startIndex = 0) {
    currentImages = images;
    currentIndex = startIndex;

    if (popupTitle) popupTitle.textContent = title;
    if (popupAnchor) popupAnchor.href = `./Project.html?id=${projectId}`;
    if (popupDescription) popupDescription.textContent = description;
    updateImage();

    popup.classList.remove('hidden');
    setTimeout(() => {
      popupContent.classList.add('scale-100', 'translate-y-0');
      popupContent.classList.remove('translate-y-[100%]');
    }, 10);
  }

  function closePopupHandler() {
    popupContent.classList.remove('scale-100', 'translate-y-0');
    popupContent.classList.add('translate-y-[100%]');
    setTimeout(() => {
      popup.classList.add('hidden');
    }, 300);
  }

  function updateImage() {
    if (currentImages.length > 0 && popupImage) {
      popupImage.src = currentImages[currentIndex];
      updateDots();
    }
  }

  function prevImageHandler() {
    if (currentImages.length > 1) {
      currentIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateImage();
    }
  }

  function nextImageHandler() {
    if (currentImages.length > 1) {
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateImage();
    }
  }

  if (closePopup) closePopup.addEventListener('click', closePopupHandler);
  if (prevImage) prevImage.addEventListener('click', prevImageHandler);
  if (nextImage) nextImage.addEventListener('click', nextImageHandler);

  // Setup click handlers for client cards
  document.querySelectorAll('.clientProjectCard').forEach((card, index) => {
    card.addEventListener('click', () => {
      const projectData = projectPromises[index];
      if (!projectData) return;

      const { clientProject } = projectData;
      const projectImages =
        Array.isArray(clientProject.project_images) &&
        clientProject.project_images.length > 0
          ? clientProject.project_images
          : [clientProject.banner_image_URL];

      if (projectImages.length <= 1) {
        if (prevImage) prevImage.classList.add('hidden');
        if (nextImage) nextImage.classList.add('hidden');
      } else {
        if (prevImage) prevImage.classList.remove('hidden');
        if (nextImage) nextImage.classList.remove('hidden');
      }

      const projectID = projectData.projectId || '';
      const projectTitle = clientProject.project_title || 'Untitled Project';
      const projectDescription =
        clientProject.project_description || 'No description available.';
      openPopup(projectImages, projectTitle, projectDescription, projectID);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !popup.classList.contains('hidden')) {
      closePopupHandler();
    }
  });
}