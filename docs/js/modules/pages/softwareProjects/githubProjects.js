/**
 * @module pages/softwareProjects/githubProjects
 * @description Module for displaying the bundled GitHub repository snapshot
 */

import { addClass, removeClass, cursorTransformShadowBlend } from "../../utils/domHelpers.js";

/**
 * Fetch and display GitHub projects
 */
export async function fetchGithubProjects() {
  const githubCards = document.querySelector(".github_cards");

  const repos = await fetchRepositories();

  // Update heading
  document.querySelector(".github_heading").innerHTML = `${repos.length} Github Repositories`;

  // Get language colors
  const languageColors = await fetchLanguageColors();

  // Create cards for each repository
  repos.forEach((repo) => {
    if (shouldSkipRepo(repo.name)) return;

    const card = createGithubCard(repo, languageColors);
    githubCards.appendChild(card);
  });

  // Initialize horizontal scroll animation
  initializeGithubScroll();
}

/**
 * Load repositories from the snapshot bundled with the archive.
 * @returns {Promise<Array>} Array of repositories
 */
async function fetchRepositories() {
  const response = await fetch("./db/github-snapshot.json");
  const snapshot = await response.json();
  const repos = snapshot.repos;

  // Sort by pushed date
  repos.sort((a, b) => {
    const dateA = new Date(a.pushed_at);
    const dateB = new Date(b.pushed_at);
    return dateB - dateA;
  });

  return repos;
}

/**
 * Load the language colour map bundled with the archive.
 * @returns {Promise<Object>} Language colors object
 */
async function fetchLanguageColors() {
  const response = await fetch("./db/language-colors.json");
  return await response.json();
}

/**
 * Check if repository should be skipped
 * @param {string} repoName - Repository name
 * @returns {boolean} True if should skip
 */
function shouldSkipRepo(repoName) {
  const skipList = ["aryanranderiya.github.io", "github-readme-stats"];
  return skipList.includes(repoName);
}

/**
 * Search for language color
 * @param {Object} langColors - Language colors object
 * @param {string} language - Language name
 * @returns {string} Color hex value
 */
function searchColor(langColors, language) {
  return langColors[language]?.color || null;
}

/**
 * Calculate time since last update
 * @param {string} pushedAt - ISO date string
 * @returns {string} Human-readable time difference
 */
function calculateTimeSince(pushedAt) {
  const lastUpdatedDate = new Date(pushedAt);
  const currentDate = new Date();
  const timeDifference = currentDate - lastUpdatedDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  if (daysDifference <= 1) {
    if (hoursDifference <= 1 && hoursDifference > 0) return `${hoursDifference} Hour`;
    else if (hoursDifference > 1) return `${hoursDifference} Hours`;
    else if (minutesDifference > 0) return `${minutesDifference} Minutes`;
    else return "Less than a minute";
  } else {
    return `${daysDifference} Days`;
  }
}

/**
 * Create GitHub card element
 * @param {Object} repo - Repository data
 * @param {Object} languageColors - Language colors
 * @returns {HTMLElement} GitHub card element
 */
function createGithubCard(repo, languageColors) {
  const card = document.createElement("div");
  addClass(card, "github_card");
  card.id = repo.name;

  const colorHex = searchColor(languageColors, repo.language);
  const timeLeft = calculateTimeSince(repo.pushed_at);
  const description = repo.description || "No Description";
  const btnDisabled = repo.visibility.toLowerCase() === "private" ? "disabled" : "";

  card.innerHTML = `
    <div class="github_title_div">
        <div class="title_logo_container">
          <i class="fa-solid fa-book-bookmark github_title_icon"></i>
          <a href='${repo.html_url}' target="_blank">
            <span class="github_title">${repo.name}</span>
          </a>
        </div>
        <div class="archive_logo">${
          repo.visibility.charAt(0).toUpperCase() + repo.visibility.slice(1)
        }</div>
    </div>
    <div class="github_desc_div">
        <span class="github_description">${description}</span>
    </div>
    <div class="github_topics"></div>
    <div class="github_bottom_div">
        <div class="github_bottom_div_part">
            <div class="color_circle" style="background-color: ${colorHex}"></div>
            <span class="github_language">${repo.language}</span>
        </div>
        <div class="github_bottom_div_part">
            <i class="fa-regular fa-star github_star_icon"></i>
            <span class="github_star_count">${repo.stargazers_count}</span>
        </div>
        <div class="github_bottom_div_part">
            <span class="github_last_updated">Last Pushed ${timeLeft} ago</span>
        </div>
    </div>
    <div class="github_btn_div">
      <a href='${repo.html_url}' target="_blank">
        <button class="github_btn" ${btnDisabled}>
        View ${repo.name} on Github</button>
      </a>
    </div>
  `;

  // Handle null language
  if (!repo.language) {
    card.querySelector(".color_circle").remove();
    card.querySelector(".github_language").remove();
    card.querySelector(".github_star_icon").style.marginLeft = "-20px";
  }

  // Set visibility styling
  const archiveLogo = card.querySelector(".archive_logo");
  if (repo.archived && repo.visibility.toLowerCase() === "public") {
    archiveLogo.textContent = "Public Archive";
    addClass(archiveLogo, "archived");
  } else if (!repo.archived && repo.visibility.toLowerCase() === "public") {
    addClass(archiveLogo, "public");
  }

  // Add topics
  addGithubTopics(card, repo.topics);

  // Set up hover interactions
  setupGithubCardInteractions(card);

  return card;
}

/**
 * Add GitHub topics to card
 * @param {HTMLElement} card - GitHub card element
 * @param {Array} topics - Array of topics
 */
function addGithubTopics(card, topics) {
  const topicsContainer = card.querySelector(".github_topics");
  
  if (topics.length === 0) {
    topicsContainer.remove();
    return;
  }

  topics.forEach((topic) => {
    const topicElement = document.createElement("div");
    const topicAnchor = document.createElement("a");
    topicAnchor.href = `https://github.com/topics/${topic}`;
    topicAnchor.target = "_blank";
    addClass(topicElement, "github_topic");
    topicElement.textContent = topic;
    topicsContainer.appendChild(topicAnchor);
    topicAnchor.appendChild(topicElement);

    topicElement.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.5)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    topicElement.addEventListener("mouseout", () => {
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });
  });
}

/**
 * Set up hover interactions for GitHub card
 * @param {HTMLElement} card - GitHub card element
 */
function setupGithubCardInteractions(card) {
  // Button interactions
  const btnDiv = card.querySelector(".github_btn_div");
  const btn = btnDiv.querySelector(".github_btn");
  
  if (btn.disabled) {
    btnDiv.remove();
    return;
  }

  btnDiv.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(1.3)", "none");
    addClass(cursor, "transparent");
    addClass(cursoricon5, "active");
  });

  btnDiv.addEventListener("mouseout", () => {
    removeClass(cursor, "transparent");
    removeClass(cursoricon5, "active");
    cursorTransformShadowBlend();
  });

  // Title interactions
  const title = card.querySelector(".github_title");
  title.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(1.3)", "none");
    addClass(cursor, "transparent");
    addClass(cursoricon5, "active");
  });

  title.addEventListener("mouseout", () => {
    removeClass(cursor, "transparent");
    removeClass(cursoricon5, "active");
    cursorTransformShadowBlend();
  });
}

/**
 * Initialize horizontal scroll for GitHub cards
 */
function initializeGithubScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const sections = gsap.utils.toArray(".github_card");
  const githubCards = document.querySelector(".github_cards");

  ScrollTrigger.normalizeScroll(true);

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".github_container",
      pin: true,
      scrub: 1,
      start: "top top",
      end: () => `+=${githubCards.offsetWidth}`,
    },
  });
}