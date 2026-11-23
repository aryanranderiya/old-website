/**
 * @module projectMedia
 * @description Choose the laptop/phone mockup that matches a project's demo type
 */

/**
 * Setup project media based on demo type
 * @param {Object} projectData - Project data object
 * @param {Object} elements - DOM elements
 */
export function setupProjectMedia(projectData, elements) {
  const {
    demo_type: demoType,
    demo_file_URL: demoFileUrl,
    banner_image_URL: bannerImageUrl
  } = projectData;

  const {
    laptopVideo,
    mobileVideo,
    laptopImage,
    mockupLaptopImage,
    mockupContainer,
    containerPC,
    containerPhone,
    mockupPc,
    mockupPhone
  } = elements;

  const mediaUrl = demoFileUrl || bannerImageUrl;

  if (demoType === "demo_pc" && mediaUrl) {
    setupVideoMedia(mediaUrl, laptopVideo, laptopImage);
    mockupPc?.classList.add("visible");
    removeElement(mockupPhone);
    return;
  }

  if (demoType === "demo_mobile" && mediaUrl) {
    setupVideoMedia(mediaUrl, mobileVideo, null);
    mockupPhone?.classList.add("visible");
    removeElement(mockupPc);
    return;
  }

  if (demoType === "demo_pc_image" && mediaUrl) {
    setupImageMedia(mediaUrl, laptopImage, laptopVideo);
    mockupPc?.classList.add("visible");
    removeElement(mockupPhone);
    return;
  }

  setupNoMedia(
    mockupContainer,
    containerPC,
    containerPhone,
    mockupPc,
    mockupPhone
  );
}

/**
 * Point a video element at the project media.
 * @private
 */
function setupVideoMedia(url, video, laptopImage) {
  if (!video) return;

  const source = video.querySelector("source");
  if (source) source.src = url;
  video.src = url;
  video.load();

  if (laptopImage) laptopImage.remove();
}

/**
 * Point the laptop mockup at a still image.
 * @private
 */
function setupImageMedia(url, laptopImage, laptopVideo) {
  if (!laptopImage) return;
  laptopImage.src = url;
  laptopImage.classList.add("visible");
  laptopVideo?.remove();
}

/**
 * Remove the demo block when a project has no recording or screenshot.
 * @private
 */
function setupNoMedia(mockupContainer, containerPC, containerPhone, mockupPc, mockupPhone) {
  mockupContainer?.forEach((container) => container.remove());
  [containerPC, containerPhone, mockupPc, mockupPhone].forEach(removeElement);
  document.querySelector(".project_demo_text")?.remove();
  document.querySelector(".video_controls_container")?.remove();
}

function removeElement(element) {
  if (!element) return;
  // Some callers pass a wrapper whose parent owns the mockup styling.
  (element.closest(".mockup") || element).remove();
}

/**
 * Setup GitHub link
 * @param {string} githubLink - GitHub repository URL
 * @param {HTMLElement} githubCard - GitHub card element
 */
export function setupGithubLink(githubLink, githubCard) {
  if (!githubLink || !githubCard) {
    githubCard?.remove();
    return;
  }

  const githubAnchor = githubCard.querySelector("a");
  if (githubAnchor) {
    githubAnchor.href = githubLink;
  }
}
