/**
 * @module bentoSetup
 * @description Setup functions for bento grid components
 */

import {
  cursorTransformShadowBlend,
  addClass,
  removeClass,
} from "./cursorUtils.js";

/**
 * Setup bento grid animations and interactions
 */
export function setupBentoAnimation() {
  const bento_cards = document.querySelectorAll(".bento_card");

  function handleIntersection2(entries) {
    entries.forEach((entry) => {
      entry.target.style.opacity = entry.isIntersecting ? "1" : "0";
    });
  }

  const observer = new IntersectionObserver(handleIntersection2, {
    threshold: 0.7,
  });

  bento_cards.forEach((bento_card) => {
    observer.observe(bento_card);
  });

  // Setup hover interactions
  const items_for_hover = [
    document.getElementById("bento_project"),
    document.getElementById("bento_project2"),
    document.getElementById("bento_resume"),
    document.getElementById("bento_blog"),
    document.querySelector(".scroll_btn"),
    ...document.querySelectorAll(".now a"),
    ...document.querySelectorAll(".cool_button"),
  ];

  items_for_hover.forEach((item) => {
    if (!item) return;

    item.addEventListener("mouseover", () => {
      const cursor = document.querySelector(".cursor");
      const cursoricon5 = document.getElementById("cursoricon5");

      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    item.addEventListener("mouseout", () => {
      const cursor = document.querySelector(".cursor");
      const cursoricon5 = document.getElementById("cursoricon5");

      cursorTransformShadowBlend();
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
    });
  });
}

/**
 * Setup GitHub bento with API data
 * @param {Object} db - Database object containing API token
 */
export async function setupGithubBento(db) {
  try {
    const token = db.qDtadW_2ZSeiRJtuRTvv;

    // Fetch GitHub repo and user info concurrently
    const [repoResponse, userResponse] = await Promise.all([
      fetch(
        "https://api.github.com/search/repositories?q=user:aryanranderiya&sort=pushed",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ),
      fetch("https://api.github.com/users/aryanranderiya"),
    ]);

    const { items: repos } = await repoResponse.json();
    const userInfo = await userResponse.json();

    // DOM elements for GitHub chips
    const githubRepoChip = document.getElementById("github_repo_chip");
    const githubProfileChip = document.getElementById("github_profile_chip");
    const githubProfileAnchor = document.getElementById(
      "github_profile_anchor"
    );
    const githubPublicRepoChip = document.getElementById(
      "github_public_repo_chip"
    );
    const githubFollowerChip = document.getElementById("github_follower_chip");
    const githubFollowingChip = document.getElementById(
      "github_following_chip"
    );

    // Populate GitHub chips with data
    if (githubRepoChip)
      githubRepoChip.innerHTML = `<i class="fa-solid fa-book-bookmark"></i> ${repos?.length} Repos`;
    if (githubProfileChip)
      githubProfileChip.innerHTML = `<img src=${userInfo.avatar_url} width='10px' alt="Github Profile photo"> ${userInfo.login}`;
    if (githubProfileAnchor) githubProfileAnchor.href = userInfo.html_url;
    if (githubPublicRepoChip)
      githubPublicRepoChip.innerHTML = `<i class="fa-solid fa-people-group"></i> ${userInfo.public_repos} Public Repos`;
    if (githubFollowerChip)
      githubFollowerChip.innerHTML = `<i class="fa-solid fa-user-plus"></i> ${userInfo.followers} Followers`;
    if (githubFollowingChip)
      githubFollowingChip.innerHTML = `<i class="fa-solid fa-user-group"></i> ${userInfo.following} Following`;
  } catch (error) {
    console.error("Error setting up GitHub Bento:", error);
  }
}

/**
 * Setup time display in bento
 */
export function setupTimeBento() {
  const time = document.getElementById("time");
  if (!time) return;

  time.innerHTML = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
