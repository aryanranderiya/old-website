/**
 * @module projectMedia
 * @description Handle project media (images and videos) setup
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
  
  // Setup based on demo type
  if (demoType === 'Video') {
    setupVideoMedia(demoFileUrl, laptopVideo, mobileVideo, laptopImage, mockupLaptopImage);
  } else if (demoType === 'Image') {
    setupImageMedia(bannerImageUrl, laptopVideo, mobileVideo, laptopImage, mockupLaptopImage);
  } else {
    setupNoMedia(mockupContainer, containerPC, containerPhone, mockupPc, mockupPhone);
  }
}

/**
 * Setup video media
 * @private
 */
function setupVideoMedia(demoFileUrl, laptopVideo, mobileVideo, laptopImage, mockupLaptopImage) {
  if (demoFileUrl && laptopVideo && mobileVideo) {
    laptopVideo.src = demoFileUrl;
    mobileVideo.src = demoFileUrl;
    laptopImage?.remove();
    mockupLaptopImage?.remove();
  }
}

/**
 * Setup image media
 * @private
 */
function setupImageMedia(bannerImageUrl, laptopVideo, mobileVideo, laptopImage, mockupLaptopImage) {
  if (bannerImageUrl && laptopImage) {
    laptopImage.src = bannerImageUrl;
    laptopVideo?.remove();
    mobileVideo?.remove();
    mobileVideo?.parentElement?.parentElement?.remove();
  }
}

/**
 * Setup when no media is available
 * @private
 */
function setupNoMedia(mockupContainer, containerPC, containerPhone, mockupPc, mockupPhone) {
  mockupContainer?.forEach(container => container.remove());
  containerPC?.remove();
  containerPhone?.remove();
  mockupPc?.remove();
  mockupPhone?.remove();
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
  
  const githubAnchor = githubCard.querySelector('a');
  if (githubAnchor) {
    githubAnchor.href = githubLink;
  }
}