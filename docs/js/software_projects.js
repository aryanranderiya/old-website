fetchGithubData();

const cursortext = document.getElementById("cursortext");
const title_Heading = document.querySelector(".title-heading");
var cards = document.querySelector(".cards");

//! Scroll to the top on reload
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

// ! FIREBASE INIT --------------------------------------------------------------------------------------

function processDataAndHidePreloader(snapshot) {
  snapshot.forEach((childSnapshot) => {
    const projectDetails = childSnapshot.val();
    const projectId = childSnapshot.key;
    // console.log(projectId);

    var projectTitle = projectDetails.project_title;
    var projectDesc = projectDetails.project_description;
    var projectType = projectDetails.project_type;
    var projectTechStack = projectDetails.project_tech_stack;
    var banner_image_URL = projectDetails.banner_image_URL;

    if (banner_image_URL == undefined) {
      banner_image_URL = "/docs/media/bg_aryan_swirl.jpg";
    }
    var projectTechStack_values = projectTechStack.trim().split(",");

    const replacements = {
      Python: "python fa-brands",
      Android: "android fa-brands",
      Java: "java fa-brands",
      HTML: "HTML5 fa-brands",
      CSS: "CSS3-alt fa-brands",
      JavaScript: "js fa-brands",
      SQL: "database fa-solid ",
    };

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-content">
          <div class="card-image" >
            <img class="card-image" loading="eager" src='${banner_image_URL}';">
            </img>
          </div>
          <div class="card-info-wrapper">
              <div class="card-info">
                  <div class="card-info-title">
                      <h3 class="card-title">${projectTitle}</h3>
                      <h6 class="card-type"><i>${projectType}</i></h6>

                      <div class="card-tech-stack">
                      ${projectTechStack_values
                        .map((element) => {
                          const replacedElement =
                            replacements[element] || element;

                          return `<i class="tech_stack_icon fa-${replacedElement.toLowerCase()}"></i> <text>${element}&nbsp;</text>`;
                        })
                        .join(" ")}

                      
                      </div>

                  </div>
                  <h4 class="card-desc">${projectDesc}<h4>
              </div>

          </div>
          <div class="buttons">
            <a href="Project.html?id=${projectId}" >
            <button class="button_secondary" aria-label="View Project Info">
                      View Project
                <div class="icon">
                    <i class="fa-solid fa-up-right-from-square btn_icon_2" style="font-size:1em"></i>
                </div>
              </button>
            </a>
          </div>
      </div>
    `;

    document.querySelector(".cards").appendChild(card);

    // ! Display on the scroll

    //! First Intersection Observer
    function handleIntersection1(entries, observer) {
      //! Fade in the content box
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          card.style.opacity = "1";
        } else {
          card.style.opacity = "0";
        }
      });
    }
    const observer1 = new IntersectionObserver(handleIntersection1, {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    });
    observer1.observe(card);

    //! Brightness
    const cards = document.querySelectorAll(".card");
    const logos = document.querySelector(".logos");

    cards.forEach((card) => {
      card.addEventListener("mouseover", () => {
        card.classList.remove("grayscale");
        logos.style.filter = "brightness(100%) grayscale(0%)";

        cards.forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.add("grayscale");
          }
        });
      });

      card.addEventListener("mouseout", () => {
        logos.style.filter = "brightness(20%) grayscale(100%)";

        cards.forEach((otherCard) => {
          otherCard.classList.remove("grayscale");
        });
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const logos = document.querySelector(".logos");

  onValue(projectsRef, processDataAndHidePreloader, { onlyOnce: true });

  var cursor_glow = document.querySelector(".cursor_glow_div");

  document.addEventListener("mousemove", function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursor_glow.style.transform = `translate3d(calc(${x}px), calc(${y}px), 0)`;
  });

  //! Software Projects Title

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

  //! Cards Cursor Title

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

  //! Logos Cursor Title

  logos.addEventListener("mouseover", () => {
    logos.style.filter = "brightness(100%) grayscale(0%)";

    cursor.style.transform = "scale(8)";
    cursor.style.boxShadow = "none";
    cursor.style.outlineWidth = "0px";
    cursortext.classList.add("active");
    cursor.classList.add("partially_transparent2");
  });

  logos.addEventListener("mouseout", () => {
    logos.style.filter = "brightness(30%)  grayscale(100%)";

    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 30px white";
    cursortext.classList.remove("active");
    cursor.classList.remove("partially_transparent2");
  });

  //! Handle Intersection Translate Y

  let alreadyanimatedflag = false;
  let timeout;

  function handleIntersectionTranslate(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!alreadyanimatedflag) timeout = 700;
        else timeout = 0;

        setTimeout(() => {
          title_Heading.classList.add("show");
        }, timeout);
        alreadyanimatedflag = true;
      } else {
        title_Heading.classList.remove("show");
      }
    });
  }
  const observerTranslate = new IntersectionObserver(
    handleIntersectionTranslate,
    {
      threshold: 0.7,
    }
  );

  observerTranslate.observe(document.querySelector(".title"));

  // ! END OF DOMCONTENTLOADED
});

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
  if (window.pageYOffset > currentScroll) {
    isScrollingDown = false;
  } else {
    isScrollingDown = true;
  }

  gsap.to(tween, {
    timeScale: isScrollingDown ? 1 : -1,
  });

  currentScroll = window.pageYOffset;
});

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

  const response = await fetch(
    "https://api.github.com/users/aryanranderiya/repos?sort=updated"
  );
  const repoArray = await response.json();

  let languagesColorsArray = await fetchColors();

  repoArray.forEach((repo) => {
    let colourHex = searchColor(languagesColorsArray, repo.language);

    const github_card = document.createElement("div");
    github_card.classList.add("github_card");
    github_card.id = repo.name;
    // github_card.setAttribute("id", repo.name);
    github_cards.appendChild(github_card);
    // console.log("Name: " + repo.full_name);
    // console.log("description: " + repo.description);
    // console.log("language: " + repo.language);
    // stargazers_count;
    // updated_at;
    // created_at;
    // homepage; // Link of website / demo
    // topics; // Array
    // console.log("html_url: " + repo.html_url);

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
    if (repo.description === null) {
      description = "No Description";
    }

    github_card.innerHTML = `
      <div class="github_title_div">
          <i class="fa-solid fa-book-bookmark github_title_icon"></i>
          <a href='${repo.html_url}' target="_blank">
            <span class="github_title">${repo.name}</span>
          </a>
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
      archiveLogo.classList.add("archived");
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
        github_topic.classList.add("github_topic");
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
