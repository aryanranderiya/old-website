/**
 * @module pages/softwareProjects/searchFilter
 * @description Module for search and filter functionality
 */

/**
 * Initialize search functionality for project cards
 */
export function initializeSearch() {
  const searchProject = document.querySelector("#search_project");
  const cards = document.querySelectorAll(".card");

  searchProject.addEventListener("input", (e) => {
    const searchText = e.target.value.trim().toLowerCase();

    cards.forEach((card) => {
      const title = card.querySelector(".card-title").textContent.toLowerCase();
      const type = card.querySelector(".card-type").textContent.toLowerCase();
      const techStack = card.querySelectorAll(".card-tech-stack");
      const description = card.querySelector(".card-desc").textContent.toLowerCase();

      techStack.forEach((element) => {
        const techstackText = element.textContent.toLowerCase();

        card.style.display =
          !title.includes(searchText) &&
          !description.includes(searchText) &&
          !type.includes(searchText) &&
          !techstackText.includes(searchText)
            ? "none"
            : "flex";

        if (searchText === "") card.style.display = "flex";
      });
    });
  });
}

/**
 * Initialize filter functionality for project cards
 */
export function initializeFilters() {
  const cards = document.querySelectorAll(".card");
  const filters = document.querySelectorAll(".project_type_select.chip");

  filters.forEach((filter) => {
    const filterValue = filter.dataset.filter.toLowerCase();

    // Count matching cards for each filter
    const count = countMatchingCards(cards, filterValue);
    
    // Add count to filter
    const countSpan = document.createElement("span");
    countSpan.classList.add("filter-count");
    countSpan.textContent = `${count}`;
    filter.appendChild(countSpan);

    // Add click handler for filter
    filter.addEventListener("click", () => {
      filter.classList.toggle("selected");
      applyFilters(cards, filters);
    });
  });
}

/**
 * Count cards matching a specific filter
 * @param {NodeList} cards - All card elements
 * @param {string} filterValue - Filter value to match
 * @returns {number} Count of matching cards
 */
function countMatchingCards(cards, filterValue) {
  return Array.from(cards).filter((card) => {
    return checkCardMatchesFilter(card, filterValue);
  }).length;
}

/**
 * Check if a card matches a filter
 * @param {HTMLElement} card - Card element
 * @param {string} filterValue - Filter value
 * @returns {boolean} True if card matches filter
 */
function checkCardMatchesFilter(card, filterValue) {
  const isClientWork = card.querySelector(".clienttag");
  const isFeatured = card.querySelector(".featuredtag");
  const isWebsite = card.querySelector(".card-type").textContent.toLowerCase().includes("website");
  const isMobileApp = card.querySelector(".card-type").textContent.toLowerCase().includes("mobile app");
  const isHackathon = card.querySelector(".hackathon");
  const isOther = !isClientWork && !isFeatured && !isWebsite && !isMobileApp && !isHackathon;

  switch (filterValue) {
    case "client work":
      return isClientWork;
    case "featured":
      return isFeatured;
    case "websites":
      return isWebsite;
    case "mobile apps":
      return isMobileApp;
    case "hackathon":
      return isHackathon;
    case "others":
      return isOther;
    default:
      return false;
  }
}

/**
 * Apply active filters to cards
 * @param {NodeList} cards - All card elements
 * @param {NodeList} filters - All filter elements
 */
function applyFilters(cards, filters) {
  const activeFilters = Array.from(filters)
    .filter((f) => f.classList.contains("selected"))
    .map((f) => f.dataset.filter.toLowerCase());

  cards.forEach((card) => {
    const shouldDisplay = activeFilters.length === 0 || 
      activeFilters.some((filter) => checkCardMatchesFilter(card, filter));
    
    card.style.display = shouldDisplay ? "flex" : "none";
  });
}