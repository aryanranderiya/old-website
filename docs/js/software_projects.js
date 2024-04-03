import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

fetchGithubData();
githubReadme();

const cursortext2 = document.getElementById("cursortext2");
const title_Heading = document.querySelector(".title-heading");

window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

// ! FIREBASE INIT --------------------------------------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUfVSJ3BpDrlV7-6Ou9DWE3KX1jHHFGEY",
  authDomain: "aryanranderiya-portfolio.firebaseapp.com",
  projectId: "aryanranderiya-portfolio",
  storageBucket: "aryanranderiya-portfolio.appspot.com",
  messagingSenderId: "540599201791",
  appId: "1:540599201791:web:757239eec07a33dc9ec1ca",
  measurementId: "G-S3XP36W3P9",
};

initializeApp(firebaseConfig);
const database = getDatabase();
const projectsRef = ref(database, "Projects/");

// ! FIREBASE INIT END --------------------------------------------------------------------------------------

onValue(projectsRef, processDataAndHidePreloader, { onlyOnce: true });

document.addEventListener("DOMContentLoaded", function () {
  const cursor_glow = document.querySelector(".cursor_glow_div");

  document.addEventListener("mousemove", (e) => {
    cursor_glow.style.left = e.clientX + "px";
    cursor_glow.style.top = e.clientY + "px";
  });

  modifyScrollBar();

  addMouseHovers();
  marqueeScrollAnimation();
  document.addEventListener("scroll", updateProgressBarandBtn);
  // ! END OF DOMCONTENTLOADED
});

function searchCards() {
  const search_project = document.querySelector("#search_project");
  const cards = document.querySelectorAll(".card");

  search_project.addEventListener("input", (e) => {
    var searchText = e.target.value.trim().toLowerCase();

    cards.forEach((card) => {
      const title = card.querySelector(".card-title").textContent.toLowerCase();

      const type = card.querySelector(".card-type").textContent.toLowerCase();

      const tech_stack = card.querySelectorAll(".card-tech-stack");

      const description = card
        .querySelector(".card-desc")
        .textContent.toLowerCase();

      tech_stack.forEach((element) => {
        var techstack = element.textContent.toLowerCase();

        if (
          !title.includes(searchText) &&
          !description.includes(searchText) &&
          !type.includes(searchText) &&
          !techstack.includes(searchText)
        ) {
          card.style.display = "none";
        } else {
          card.style.display = "flex";
        }

        if (searchText === "") card.style.display = "flex";
      });
    });
  });
}

function filterCards(select) {
  const cards = document.querySelectorAll(".card");

  select.addEventListener("change", () => {
    cards.forEach((card) => {
      if (select.value === "") {
        console.log("empty");
        card.style.display = "flex";
        return;
      }

      const tech_stack = card.querySelectorAll(".card-tech-stack");
      let displayCard = false;

      tech_stack.forEach((element) => {
        var techstack = element.textContent.trim().toLowerCase();

        if (techstack.includes(select.value.toLowerCase())) {
          displayCard = true;
        }
      });

      card.style.display = displayCard ? "flex" : "none";
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
    addClass(cursortext2, "active");
    addClass(cursor, "transparent");
    updateProgressBarandBtn();
  });

  scrollbarContainerParent.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 30px white";
    removeClass(cursortext2, "active");
    removeClass(cursor, "transparent");
  });
}

function updateProgressBarandBtn() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
  const scrollPercent = percentage + "%";

  document
    .querySelector(".scrollbar_progress")
    .style.setProperty("--height", scrollPercent);

  cursortext2.textContent = Math.round(percentage) + "%";
}

// Functions
function addMouseHovers() {
  document.querySelector(".cards").onmousemove = (e) => {
    for (const card of document.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  const logos = document.querySelector(".logos");

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

  // Cards Cursor Title

  document.addEventListener("mouseover", function (event) {
    if (event.target.classList.contains("card")) {
      cursor.style.transform = "scale(1)";
      cursor.style.boxShadow =
        "0px 0px 20px white, 0px 0px 35px white, 0px 0px 50px white, 0px 0px 60px white,  0px 0px 70px white,0px 0px 80px white,0px 0px 95px white, 0px 0px 110px white";
    }
  });

  document.addEventListener("mouseout", function (event) {
    if (event.target.classList.contains("card")) {
      cursor.style.transform = "none";
      cursor.style.boxShadow = "0px 0px 30px white";
    }
  });

  // Logos Cursor Title

  logos.addEventListener(
    "mouseover",
    () => {
      cursor.style.transform = "scale(8)";
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

function processDataAndHidePreloader(snapshot) {
  const dataArray = [];
  snapshot.forEach((childSnapshot) => {
    dataArray.push(childSnapshot);
  });
  dataArray.reverse();

  dataArray.forEach((childSnapshot) => {
    const projectDetails = childSnapshot.val();
    const projectId = childSnapshot.key;
    const projectTitle = projectDetails.project_title;
    const projectDesc =
      projectDetails.project_short_description ||
      projectDetails.project_description;
    const projectType = projectDetails.project_type;
    var projectTechStack = projectDetails.project_tech_stack;
    var banner_image_URL = projectDetails.banner_image_URL;

    if (banner_image_URL == undefined)
      banner_image_URL = "/docs/media/bg_aryan_swirl.webp";

    var projectTechStack_values = projectTechStack.trim().split(",");
    const replacements = {
      HTML: "HTML5-plain colored",
      CSS: "CSS3-plain colored",
      Express: "express-original",
      Flask: "flask-original",
      Tailwind: "tailwindcss-original colored",
      Vercel: "vercel-original",
    };

    const card = document.createElement("div");
    addClass(card, "card");
    card.innerHTML = `
      <div class="card-content">
          <div class="card-image-div" >
            <img class="card-image" loading="eager" src="./media/bg_aryan_swirl.jpg" data-src="${banner_image_URL}" alt="Project Card Image">
            </img>
          </div>
          <div class="card-info-wrapper">
              <div class="card-info">
                  <div class="card-info-title">
                      <span class="card-title">${projectTitle}</span>
                      <span class="card-type"><i>${projectType}</i></span>

                      <div class="card-tech-stack">
                          ${projectTechStack_values
                            .map((element) => {
                              const replacedElement =
                                replacements[element] ||
                                element + "-plain colored";
                              return `<div class="tech_stack_item"><i class="tech_stack_icon devicon-${replacedElement.toLowerCase()}"></i> <text>${element}&nbsp;</text></div>`;
                            })
                            .join(" ")}
                      </div>
                  </div>
                  <span class="card-desc">${projectDesc}<span>
              </div>
          </div>
      </div>
      <div class="buttons">
        <a href="Project.html?id=${projectId}" >
        <button class="button_secondary view_project" aria-label="View Project Info">
            View Project
            <div class="icon">
                <i class="fa-solid fa-up-right-from-square btn_icon_2" style="font-size:1em"></i>
            </div>
          </button>
        </a>
      </div>
    `;

    document.querySelector(".cards").appendChild(card);

    //! Intersection Observer
    function handleIntersection1(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) card.style.opacity = "1";
        else card.style.opacity = "0";
      });
    }
    const observer1 = new IntersectionObserver(handleIntersection1, {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    });
    observer1.observe(card);

    hoverOnCards();
  });

  removePreloader();

  const select = document.querySelector(".project_type_select");
  const tech_stack = document.querySelectorAll(".card-tech-stack text");
  tech_stack.forEach((element) => {
    var value = element.textContent.trim();
    if (!document.getElementById(value)) {
      var option = document.createElement("option");
      option.innerHTML = `<option value="${value}" id="${value}">${value}</label>`;
      select.appendChild(option);
    }
  });

  searchCards();
  filterCards(select);
}

function hoverOnCards() {
  const allCard = document.querySelectorAll(".card");

  allCard.forEach((card) => {
    card.addEventListener("mouseover", () => {
      removeClass(card, "grayscale");
      card.style.transform = "translateY(-15px)";
      card.style.boxShadow = "#00bbff 0px 0px 100px -5px";
      allCard.forEach((otherCard) => {
        if (otherCard !== card) addClass(otherCard, "grayscale");
      });
    });

    card.addEventListener("mouseout", () => {
      card.style.transform = "";
      card.style.boxShadow = "";
      allCard.forEach((otherCard) => removeClass(otherCard, "grayscale"));
    });
  });

  const cardImages = document.querySelectorAll(".card-image");
  cardImages.forEach(function (img) {
    img.onload = function () {
      img.src = img.getAttribute("data-src");
    };

    img.src = img.getAttribute("data-src");
  });

  const button_secondaryAll = document.querySelectorAll(".button_secondary");
  button_secondaryAll.forEach((btn) => {
    btn.addEventListener("mouseover", () => {
      cursor.style.mixBlendMode = "difference";
    });
    btn.addEventListener("mouseout", () => {
      cursor.style.mixBlendMode = "normal";
    });
  });

  const techStackItems = document.querySelectorAll(".tech_stack_item");

  techStackItems.forEach((item) => {
    const iconColor = window.getComputedStyle(item.firstElementChild).color;

    item.addEventListener("mouseover", function () {
      if (iconColor === "rgb(255, 255, 255)") {
        this.style.backgroundColor = "rgb(255, 255, 255)";
      } else {
        this.style.backgroundColor = iconColor;
      }

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
  gsap.registerPlugin(ScrollTrigger);

  let currentScroll = 0;
  let isScrollingDown = true;

  let tween = gsap
    .to(".logos-slide", {
      xPercent: -100,
      repeat: -1,
      duration: 10,
      ease: "linear",
    })
    .totalProgress(0.5);

  gsap.set(".logos-slide", { xPercent: -50 });

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > currentScroll) isScrollingDown = false;
    else isScrollingDown = true;

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

async function githubReadme() {
  const github_readme = document.querySelector(".github_readme");

  fetch("https://api.github.com/repos/aryanranderiya/aryanranderiya/readme")
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      return response.json();
    })
    .then((readmeJson) => {
      return readmeJson["download_url"];
    })
    .then((URL) => {
      fetch(URL)
        .then((urlContentResponse) => {
          return urlContentResponse.text();
        })
        .then((content) => (github_readme.innerHTML = marked.parse(content)))
        .catch((error) => console.error(error));
    })
    .catch((error) => {
      console.error("Fetch Documentation error:", error);
    });
}

async function fetchGithubData() {
  const github_cards = document.querySelector(".github_cards");

  const response = await fetch(
    "https://api.github.com/users/aryanranderiya/repos?sort=pushed"
  );
  const repoArray = await response.json();

  let languagesColorsArray = await fetchColors();

  repoArray.forEach((repo) => {
    let colourHex = searchColor(languagesColorsArray, repo.language);

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
        time_left = hoursDifference + " Hour";
      else if (hoursDifference > 1) time_left = hoursDifference + " Hours";
      else if (minutesDifference > 0)
        time_left = minutesDifference + " Minutes";
      else time_left = "Less than a minute";
    } else {
      time_left = daysDifference + " Days";
    }
    // ! Set Description
    let description = repo.description;
    if (repo.description === null) description = "No Description";

    github_card.innerHTML = `
      <div class="github_title_div">
          <div class="title_logo_container">
            <i class="fa-solid fa-book-bookmark github_title_icon"></i>
            <a href='${repo.html_url}' target="_blank">
              <span class="github_title">${repo.name}</span>
            </a>
          </div>
          <div class="archive_logo">Visible</div>
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
          <button class="github_btn">View ${repo.name} on Github</button>
        </a>
      </div>
    `;

    if (
      repo.language == "null" ||
      repo.language == null ||
      repo.language === undefined
    ) {
      let id = repo.name;
      const card_temp = document.querySelector(`#${id}`);
      card_temp.querySelector(".color_circle").remove();
      card_temp.querySelector(".github_language").remove();
      card_temp.querySelector(".github_star_icon").style.marginLeft = "-20px";
    }

    //! Set Visibility
    let visibility = "Public";
    const archiveLogo = github_card.querySelector(".archive_logo");
    if (repo.archived === true) {
      visibility = "Public Archive";
      addClass(archiveLogo, "archived");
    }
    archiveLogo.textContent = visibility;

    //! Set Github Topics
    const github_topics = github_card.querySelector(".github_topics");
    if (repo.topics.length != 0) {
      repo.topics.forEach((topic) => {
        const github_topic = document.createElement("div");
        const topic_anchor = document.createElement("a");
        topic_anchor.href = `https://github.com/topics/${topic}`;
        topic_anchor.target = "_blank";
        addClass(github_topic, "github_topic");
        github_topic.textContent = topic;
        github_topics.appendChild(topic_anchor);
        topic_anchor.appendChild(github_topic);
      });
    } else {
      github_topics.remove();
    }

    //! Intersection Observer
    function handleIntersection1(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
        } else {
          entry.target.style.opacity = "0";
        }
      });
    }
    const observer1 = new IntersectionObserver(handleIntersection1, {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    });

    observer1.observe(document.querySelector(".github_heading_div"));
    observer1.observe(github_card);

    const github_btn_divs = document.querySelectorAll(".github_btn_div");

    github_btn_divs.forEach((github_btn_div) => {
      github_btn_div.addEventListener("mouseover", () => {
        cursorTransformShadowBlend("scale(1.5)", "none");
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
        cursorTransformShadowBlend("scale(1.5)", "none");
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
  const preloader = document.querySelector(".preloader");

  setTimeout(function () {
    blackCover.classList.add("hide");
    preloader.classList.add("hide");
    document.body.style.overflow = "auto";
  }, 500);

  // Handle Intersection Translate Y
  let alreadyanimatedflag = false;
  let timeout;

  function handleIntersectionTranslate(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!alreadyanimatedflag) timeout = 700;
        else timeout = 0;
        setTimeout(() => addClass(title_Heading, "show"), timeout);
        alreadyanimatedflag = true;
      } else removeClass(title_Heading, "show");
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
