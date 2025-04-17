const cursor_txt_2 = document.getElementById("cursortext2");
const title_Heading = document.querySelector(".title-heading");
const subtitle = document.querySelector(".softwareprojects_subtitle");
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
const firebase = {
  apiKey: "AIzaSyAUfVSJ3BpDrlV7-6Ou9DWE3KX1jHHFGEY",
  authDomain: "aryanranderiya-portfolio.firebaseapp.com",
  projectId: "aryanranderiya-portfolio",
  storageBucket: "aryanranderiya-portfolio.appspot.com",
  messagingSenderId: "540599201791",
  appId: "1:540599201791:web:757239eec07a33dc9ec1ca",
  measurementId: "G-S3XP36W3P9",
};

initializeApp(firebase);
const firebase_db = getDatabase();

try {
  generateLoadingText();
  processDataAndHidePreloader();
  fetchGithubData();
  processProjectIcons();
} catch (error) {
  console.error("Error:", error);
}

document.addEventListener("DOMContentLoaded", () => {
  modifyScrollBar();
  addMouseHovers();
  document.addEventListener("scroll", updateProgressBarandBtn);
});

function searchCards() {
  const search_project = document.querySelector("#search_project");
  const cards = document.querySelectorAll(".card");

  search_project.addEventListener("input", (e) => {
    const searchText = e.target.value.trim().toLowerCase();

    cards.forEach((card) => {
      const title = card.querySelector(".card-title").textContent.toLowerCase();
      const type = card.querySelector(".card-type").textContent.toLowerCase();
      const tech_stack = card.querySelectorAll(".card-tech-stack");

      const description = card
        .querySelector(".card-desc")
        .textContent.toLowerCase();

      tech_stack.forEach((element) => {
        const techstack = element.textContent.toLowerCase();

        card.style.display =
          !title.includes(searchText) &&
          !description.includes(searchText) &&
          !type.includes(searchText) &&
          !techstack.includes(searchText)
            ? "none"
            : "flex";

        if (searchText === "") card.style.display = "flex";
      });
    });
  });
}

function filterCards() {
  const cards = document.querySelectorAll(".card");
  const filters = document.querySelectorAll(".project_type_select.chip");

  filters.forEach((filter) => {
    const filterValue = filter.dataset.filter.toLowerCase();

    // Count the number of matching cards
    const count = Array.from(cards).filter((card) => {
      const isClientWork = card.querySelector(".clienttag");
      const isFeatured = card.querySelector(".featuredtag");
      const isWebsite = card
        .querySelector(".card-type")
        .textContent.toLowerCase()
        .includes("website");
      const isMobileApp = card
        .querySelector(".card-type")
        .textContent.toLowerCase()
        .includes("mobile app");
      const isHackathon = card.querySelector(".hackathon");
      const isOther =
        !isClientWork &&
        !isFeatured &&
        !isWebsite &&
        !isMobileApp &&
        !isHackathon;

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
    }).length;

    const countSpan = document.createElement("span");
    countSpan.classList.add("filter-count");
    countSpan.textContent = `${count}`;
    filter.appendChild(countSpan);

    // Toggle filter selection and update card visibility
    filter.addEventListener("click", () => {
      filter.classList.toggle("selected");

      const activeFilters = Array.from(filters)
        .filter((f) => f.classList.contains("selected"))
        .map((f) => f.dataset.filter.toLowerCase());

      cards.forEach((card) => {
        const isClientWork = card.querySelector(".clienttag");
        const isFeatured = card.querySelector(".featuredtag");
        const isWebsite = card
          .querySelector(".card-type")
          .textContent.toLowerCase()
          .includes("website");
        const isMobileApp = card
          .querySelector(".card-type")
          .textContent.toLowerCase()
          .includes("mobile app");
        const isHackathon = card.querySelector(".hackathon");
        const isOther =
          !isClientWork &&
          !isFeatured &&
          !isWebsite &&
          !isMobileApp &&
          !isHackathon;

        const shouldDisplay =
          activeFilters.length === 0 ||
          activeFilters.some((filter) => {
            switch (filter) {
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
          });

        card.style.display = shouldDisplay ? "flex" : "none";
      });
    });
  });
}

function modifyScrollBar() {
  const scrollbarContainerParent = document.querySelector(
    ".scrollbar_progress_container_parent"
  );
  scrollbarContainerParent.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(5)";
    cursor.style.boxShadow = "none";
    cursor.style.outlineWidth = "0px";
    addClass(cursor_txt_2, "active");
    addClass(cursor, "transparent");
    updateProgressBarandBtn();
  });

  scrollbarContainerParent.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 30px white";
    removeClass(cursor_txt_2, "active");
    removeClass(cursor, "transparent");
  });
}

function updateProgressBarandBtn() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
  const scrollPercent = `${percentage}%`;

  document
    .querySelector(".scrollbar_progress")
    .style.setProperty("--height", scrollPercent);

  cursor_txt_2.textContent = `${Math.round(percentage)}%`;
}

// Functions
function addMouseHovers() {
  const chips = document.querySelectorAll(".project_type_select");
  chips.forEach((chip) => {
    chip.parentElement.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    chip.parentElement.parentElement.addEventListener("mouseout", () => {
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });
  });

  const logos = document.querySelector(".logos");
  const github_heading_div = document.querySelector(".github_heading_div");

  // Software Projects Title
  title_Heading.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(10)";
    cursor.style.mixBlendMode = "difference";
    cursor.style.boxShadow = "none";
  });

  title_Heading.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 50px white";
  });

  github_heading_div.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(11.5)";
    cursor.style.mixBlendMode = "difference";
    cursor.style.boxShadow = "none";
  });

  github_heading_div.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 50px white";
  });
  // Cards Cursor Title

  document.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("card")) {
      cursor.style.transform = "scale(1)";
      cursor.style.boxShadow =
        "0px 0px 20px white, 0px 0px 35px white, 0px 0px 50px white, 0px 0px 60px white,  0px 0px 70px white,0px 0px 80px white,0px 0px 95px white, 0px 0px 110px white";
    }
  });

  document.addEventListener("mouseout", (event) => {
    if (event.target.classList.contains("card")) {
      cursor.style.transform = "none";
      cursor.style.boxShadow = "0px 0px 30px white";
    }
  });

  // Logos Cursor Title

  logos.addEventListener(
    "mouseover",
    () => {
      cursor.style.transform = "scale(10)";
      cursor.style.boxShadow = "none";
      cursor.style.outlineWidth = "0px";
      addClass(cursortext, "active");
      addClass(cursor, "partially_transparent2");
    },
    { passive: true }
  );

  logos.addEventListener(
    "mouseout",
    () => {
      cursor.style.transform = "none";
      cursor.style.mixBlendMode = "normal";
      cursor.style.boxShadow = "0px 0px 30px white";
      removeClass(cursortext, "active");
      removeClass(cursor, "partially_transparent2");
    },
    { passive: true }
  );
}

async function processDataAndHidePreloader() {
  let db = {};
  try {
    const response = await fetch("./db/db.json");
    db = await response.json();
    removePreloader();
  } catch (e) {
    return;
  }

  const projects = db.Projects;
  const cards = document.querySelector(".cards");

  const observer1 = new IntersectionObserver(handleIntersection1, {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });

  Object.entries(projects)
    .sort(([, projectA], [, projectB]) => {
      if (projectA.featured && !projectB.featured) return -1;
      if (!projectA.featured && projectB.featured) return 1;

      // if (projectB.Likes !== projectA.Likes)
      //   return projectB.Likes - projectA.Likes;

      if (projectA.client_work && !projectB.client_work) return -1;
      if (!projectA.client_work && projectB.client_work) return 1;

      if (projectA.bad && !projectB.bad) return 1;
      if (!projectA.bad && projectB.bad) return -1;

      // If neither project is bad, retain the order
      return 0;
    })

    .map(([projectId, project]) => {
      const projectTitle = project.project_title;
      const projectDesc =
        project.project_short_description || project.project_description;
      const projectType = project.project_type;
      const isFeatured = project.featured || false;
      const isClientWork = project.client_work || false;
      const hackathon = project.hackathon || false;
      const projectTechStack = project.project_tech_stack || [];
      const banner_image_URL =
        project.banner_image_URL || "/docs/media/bg_aryan_swirl.webp";

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
      <img class="card-image" loading="eager" src="./media/bg_aryan_swirl.jpg" data-src="${banner_image_URL}" alt="Project Card Image">
      </img>
      </div>
      <div class="card-info-wrapper">
      <div class="tagsparent">
       
      </div>
          <div class="card-info">
            <div class="card-info-title">
              <span class="card-title">${projectTitle}</span>

              <span class="card-type">
                <i>${
                  projectType === "Web Application" ? "Website" : projectType
                }</i>
              </span>
              <div class="card-tech-stack">
              <div class="special-tags">
              ${
                isFeatured
                  ? `<div class='featuredtag'><span class="material-symbols-rounded">star</span>Featured Project</div>`
                  : ``
              }
              ${
                isClientWork
                  ? `<div class='clienttag'><span class="material-symbols-rounded">payments</span>Freelance</div>`
                  : ``
              }
              ${
                hackathon
                  ? `<div class='hackathon'><span class="material-symbols-rounded">trophy</span>Hackathon Project</div>`
                  : ``
              }
              </div>
              

                ${projectTechStack
                  .map((element) => {
                    const replacedElement =
                      replacements[element] || `${element}-plain colored`;
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
      // <button class="heart_button">
      //     <div class="heart-container" title="Like">
      //       <input type="checkbox" id="${projectId}" class="heart_checkboxes">
      //       <div class="svg-container">
      //            <svg viewBox="0 0 24 24" class="svg-outline" xmlns="http://www.w3.org/2000/svg">
      //               <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
      //               </path>
      //           </svg>
      //         <svg viewBox="0 0 24 24" class="svg-filled" xmlns="http://www.w3.org/2000/svg">
      //           <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
      //           </path>
      //         </svg>
      //         <svg class="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      //           <polygon points="10,10 20,20"></polygon>
      //           <polygon points="10,50 20,50"></polygon>
      //           <polygon points="20,80 30,70"></polygon>
      //           <polygon points="90,10 80,20"></polygon>
      //           <polygon points="90,50 80,50"></polygon>
      //           <polygon points="80,80 70,70"></polygon>
      //         </svg>
      //       </div>
      //     </div>
      //     <span class="like_count">${project.Likes || 0}</span>
      //   </button>

      const content = card.querySelector(".card-content");
      content.addEventListener("click", () => {
        window.location.href = `Project.html?id=${projectId}`;
      });

      cards.appendChild(card);
      observer1.observe(card);

      hoverOnCards();
    });

  searchCards();
  filterCards();
  setupHearts();
}

function handleIntersection1(entries) {
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

function setupHearts() {
  const checkboxes = document.querySelectorAll(".heart_checkboxes");

  checkboxes.forEach((checkbox) => {
    const projectId = checkbox.id;

    checkbox.checked = localStorage.getItem(projectId) === "true";

    checkbox.parentElement.parentElement.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    checkbox.parentElement.parentElement.addEventListener("mouseout", () => {
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });

    const likes_count_text = checkbox.parentElement.nextElementSibling;
    const svgContainer = checkbox.nextElementSibling;
    const projectRef = ref(firebase_db, `Projects/${projectId}`);

    let currentLikes = 0;

    onValue(projectRef, (snapshot) => {
      if (snapshot.exists()) {
        currentLikes = snapshot.val().Likes || 0;
        likes_count_text.textContent = currentLikes;
      }
    });

    svgContainer.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked;
      const changeEvent = new Event("change", {
        bubbles: true,
        cancelable: true,
      });
      checkbox.dispatchEvent(changeEvent);
    });

    checkbox.addEventListener("change", () => {
      const isChecked = checkbox.checked;
      const newLikes = isChecked ? currentLikes + 1 : currentLikes - 1;

      update(projectRef, { Likes: newLikes })
        .then(() => {
          likes_count_text.textContent = newLikes;
        })
        .catch((error) => console.error("Error updating data:", error));
      localStorage.setItem(checkbox.id, isChecked);
    });
  });
}

function generateLoadingText() {
  const websiteName = "aryanranderiya.com".split("");
  const loadingTextElement = document.getElementById("loading_text");

  let translation = 103.5;

  for (let index = 0; index < websiteName.length; index++) {
    loadingTextElement.style.opacity = "1";
    const div = document.createElement("div");
    div.classList.add("loading_text_inner");
    div.style.transitionDuration = "2s";

    websiteName.forEach((char) => {
      const span = document.createElement("span");
      div.appendChild(span);
      span.innerHTML = char;
    });

    translation -= 5.5;

    loadingTextElement.appendChild(div);

    setTimeout(() => {
      translation -= 5.56;
      div.style.transform = `translateY(${translation}%)`;
    }, index);
  }
}

function hoverOnCards() {
  const allCard = document.querySelectorAll(".card");

  allCard.forEach((card) => {
    card.addEventListener("mouseover", () => {
      removeClass(card, "grayscale");
      allCard.forEach((otherCard) => {
        if (otherCard !== card) addClass(otherCard, "grayscale");
      });
    });
    card.addEventListener("mouseout", () => {
      allCard.forEach((otherCard) => removeClass(otherCard, "grayscale"));
    });
  });

  const cardImages = document.querySelectorAll(".card-image");
  cardImages.forEach((img) => {
    // img.onload = () => {
    //   img.src = img.getAttribute("data-src");
    // };

    img.src = img.getAttribute("data-src");
  });

  const button_secondaryAll = document.querySelectorAll(".button_secondary");
  const card_content = document.querySelectorAll(".card-content");

  [button_secondaryAll, card_content].forEach((item) => {
    item.forEach((subitem) => {
      subitem.addEventListener("mouseover", () => {
        cursorTransformShadowBlend("scale(1.3)", "none");
        addClass(cursor, "transparent");
        addClass(cursoricon5, "active");
      });

      subitem.addEventListener("mouseout", () => {
        removeClass(cursor, "transparent");
        removeClass(cursoricon5, "active");
        cursorTransformShadowBlend();
      });
    });
  });

  const techStackItems = document.querySelectorAll(".tech_stack_item");

  techStackItems.forEach((item) => {
    const iconColor = window.getComputedStyle(item.firstElementChild).color;

    item.addEventListener("mouseover", function () {
      this.style.backgroundColor =
        iconColor === "rgb(255, 255, 255)" ? "rgb(255, 255, 255)" : iconColor;

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

function marqueeScrollAnimation() {
  // ! change marquee direction on scroll
  let currentScroll = 0;
  let isScrollingDown = true;

  const tween = gsap
    .to(".logos-slide", {
      xPercent: -100,
      repeat: -1,
      duration: 25,
      ease: "linear",
    })
    .totalProgress(0.5);

  window.addEventListener("scroll", () => {
    isScrollingDown = window.pageYOffset > currentScroll;

    gsap.to(tween, {
      timeScale: isScrollingDown ? 1 : -1,
    });

    currentScroll = window.pageYOffset;
  });
}

async function fetchColors() {
  const colorsResponse = await fetch(
    "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"
  );

  return await colorsResponse.json();
}

function searchColor(langColorsArray, language) {
  for (const color in langColorsArray) {
    if (language === color) return langColorsArray[color].color;
  }
}

async function fetchGithubData() {
  const github_cards = document.querySelector(".github_cards");

  let token = "";
  const qDtadW_2ZSeiRJtuRTvv = ref(firebase_db, "qDtadW_2ZSeiRJtuRTvv/");
  await new Promise((resolve) => {
    onValue(qDtadW_2ZSeiRJtuRTvv, (snapshot) => {
      token = snapshot.val();
      resolve();
    });
  });

  const response = await fetch(
    "https://api.github.com/search/repositories?q=user:aryanranderiya&sort=pushed",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const repoObj = await response.json();
  const repoArray = repoObj.items;

  repoArray.sort((a, b) => {
    const dateA = new Date(a.pushed_at);
    const dateB = new Date(b.pushed_at);
    return dateB - dateA;
  });

  document.querySelector(
    ".github_heading"
  ).innerHTML = `${repoArray.length} Github Repositories`;

  const languagesColorsArray = await fetchColors();

  repoArray.forEach((repo) => {
    if (repo.name === "aryanranderiya.github.io") return;
    if (repo.name === "github-readme-stats") return;

    const colourHex = searchColor(languagesColorsArray, repo.language);

    const github_card = document.createElement("div");
    addClass(github_card, "github_card");
    github_card.id = repo.name;
    github_cards.appendChild(github_card);

    //! Set Last Pushed Time
    const lastUpdatedDate = new Date(repo.pushed_at);
    const currentDate = new Date();
    const timeDifference = currentDate - lastUpdatedDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutesDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    let time_left;
    if (daysDifference <= 1) {
      if (hoursDifference <= 1 && hoursDifference > 0)
        time_left = `${hoursDifference} Hour`;
      else if (hoursDifference > 1) time_left = `${hoursDifference} Hours`;
      else if (minutesDifference > 0)
        time_left = `${minutesDifference} Minutes`;
      else time_left = "Less than a minute";
    } else {
      time_left = `${daysDifference} Days`;
    }

    // ! Set Description
    const description =
      repo.description === null ? "No Description" : repo.description;

    const btn_disabled =
      repo.visibility.toLowerCase() === "private" ? "disabled" : "";

    github_card.innerHTML = `
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
          <span class="github_description">
          ${description}
          </span>
      </div>
      <div class="github_topics"></div>
      <div class="github_bottom_div">
          <div class="github_bottom_div_part">
              <div class="color_circle" style="background-color: ${colourHex}"></div>
              <span class="github_language">${repo.language}</span>
          </div>
          <div class="github_bottom_div_part">
              <i class="fa-regular fa-star github_star_icon"></i>
              <span class="github_star_count">${repo.stargazers_count}</span>
          </div>
          <div class="github_bottom_div_part">
              <span class="github_last_updated">Last Pushed ${time_left} ago</span>
          </div>
      </div>
      <div class="github_btn_div">
        <a href='${repo.html_url}' target="_blank">
          <button class="github_btn" ${btn_disabled}>
          View ${repo.name} on Github</button>
        </a>
      </div>
    `;

    if (
      repo.language == "null" ||
      repo.language == null ||
      repo.language === undefined
    ) {
      const id = repo.name;
      const card_temp = document.querySelector(`#${id}`);
      card_temp.querySelector(".color_circle").remove();
      card_temp.querySelector(".github_language").remove();
      card_temp.querySelector(".github_star_icon").style.marginLeft = "-20px";
    }

    //! Set Visibility
    const archiveLogo = github_card.querySelector(".archive_logo");
    if (repo.archived === true && repo.visibility.toLowerCase() === "public") {
      archiveLogo.textContent = "Public Archive";
      addClass(archiveLogo, "archived");
    } else if (
      repo.archived !== true &&
      repo.visibility.toLowerCase() === "public"
    ) {
      addClass(archiveLogo, "public");
    }

    //! Set Github Topics
    const github_topics = github_card.querySelector(".github_topics");
    if (repo.topics.length == 0) {
      github_topics.remove();
    } else {
      repo.topics.forEach((topic) => {
        const github_topic = document.createElement("div");
        const topic_anchor = document.createElement("a");
        topic_anchor.href = `https://github.com/topics/${topic}`;
        topic_anchor.target = "_blank";
        addClass(github_topic, "github_topic");
        github_topic.textContent = topic;
        github_topics.appendChild(topic_anchor);
        topic_anchor.appendChild(github_topic);

        github_topic.addEventListener("mouseover", () => {
          cursorTransformShadowBlend("scale(1.5)", "none");
          addClass(cursor, "transparent");
          addClass(cursoricon5, "active");
        });

        github_topic.addEventListener("mouseout", () => {
          removeClass(cursor, "transparent");
          removeClass(cursoricon5, "active");
          cursorTransformShadowBlend();
        });
      });
    }

    const observer2 = new IntersectionObserver(handleIntersection1, {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    });

    // observer1.observe(github_card);
    observer2.observe(document.querySelector(".github_heading_div"));

    const github_btn_divs = document.querySelectorAll(".github_btn_div");

    github_btn_divs.forEach((github_btn_div) => {
      const btn = github_btn_div.querySelector(".github_btn");
      if (btn.disabled === true) {
        github_btn_div.remove();
        return;
      }
      github_btn_div.addEventListener("mouseover", () => {
        cursorTransformShadowBlend("scale(1.3)", "none");
        addClass(cursor, "transparent");
        addClass(cursoricon5, "active");
      });

      github_btn_div.addEventListener("mouseout", () => {
        removeClass(cursor, "transparent");
        removeClass(cursoricon5, "active");
        cursorTransformShadowBlend();
      });
    });

    const github_titles = document.querySelectorAll(".github_title");

    github_titles.forEach((github_title) => {
      github_title.addEventListener("mouseover", () => {
        cursorTransformShadowBlend("scale(1.3)", "none");
        addClass(cursor, "transparent");
        addClass(cursoricon5, "active");
      });

      github_title.addEventListener("mouseout", () => {
        removeClass(cursor, "transparent");
        removeClass(cursoricon5, "active");
        cursorTransformShadowBlend();
      });
    });
  });

  gsap.registerPlugin(ScrollTrigger);

  const sections = gsap.utils.toArray(".github_card");

  ScrollTrigger.normalizeScroll(true);

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",

    scrollTrigger: {
      trigger: ".github_container",
      // type: "touch,pointer,wheel",
      // isTouch: 2,
      pin: true,
      scrub: 1,
      start: "top top",
      // anticipatePin: 1,
      end: () => `+=${github_cards.offsetWidth}`,
    },
  });
}

//! Functions

function cursorTransformShadowBlend(
  param_transform = "none",
  param_boxShadow = "0px 0px 30px white",
  param_mixBlendMode = "normal"
) {
  cursor.style.transform = param_transform;
  cursor.style.boxShadow = param_boxShadow;
  cursor.style.mixBlendMode = param_mixBlendMode;
}

function addClass(element, className) {
  element.classList.add(className);
}
function removeClass(element, className) {
  element.classList.remove(className);
}

function removePreloader() {
  const blackCover = document.querySelector(".black_cover");

  setTimeout(() => {
    blackCover.classList.add("hide");
    setTimeout(() => (document.body.style.overflow = "auto"), 200);
  }, 500);

  // Handle Intersection Translate Y
  let alreadyanimatedflag = false;
  let timeout;

  function handleIntersectionTranslate(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        timeout = alreadyanimatedflag ? 0 : 700;
        setTimeout(() => addClass(title_Heading, "show"), timeout);
        setTimeout(() => addClass(subtitle, "show"), timeout + 60);
        alreadyanimatedflag = true;
        return;
      }
      removeClass(title_Heading, "show");
      removeClass(subtitle, "show");
    });
  }
  const observerTranslate = new IntersectionObserver(
    handleIntersectionTranslate,
    {
      threshold: 0.5,
    }
  );

  observerTranslate.observe(document.querySelector(".title"));
}

async function processProjectIcons() {
  const SoftwareIconsRef = ref(firebase_db, "SoftwareIcons/");

  const [snapshot] = await Promise.all([get(SoftwareIconsRef)]);

  const logosSlide = document.querySelector(".logos-slide");

  snapshot.forEach((childSnapshot) => {
    const url = childSnapshot.val();
    const img = document.createElement("img");
    img.loading = "eager";
    img.src = url;
    logosSlide.appendChild(img);
  });

  const logosSlide2 = logosSlide.cloneNode(true);
  const logos = document.querySelector(".logos");
  logos.appendChild(logosSlide2);

  marqueeScrollAnimation();
}
