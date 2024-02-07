const navbarContainer = document.getElementById("navbarContainer");
fetch("navbar.html") //! Fetch navbar html into the element navbar
  .then((response) => response.text())
  .then((data) => {
    navbarContainer.innerHTML = data;

    const navbar = document.querySelector(".navbar");
    // navbar.style.opacity = "0";

    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        navbar.classList.add("hide");
      } else {
        navbar.classList.remove("hide");
      }

      lastScrollTop = scrollTop;
    });

    const cursoricon1 = document.getElementById("cursoricon1");
    const cursoricon2 = document.getElementById("cursoricon2");
    const cursoricon5 = document.getElementById("cursoricon5");
    const nav_menu_image = document.getElementById("nav_menu_image");
    const navbar_menu = document.querySelector(".navbar_menu");
    const checkbox = document.getElementById("hamburgerCheckbox");
    const body = document.querySelector("body");
    const navbar_menu_btn = document.querySelector(".navbar_menu_btn");
    const contact_button = document.querySelector(".contact_button");
    const items = document.querySelectorAll(".menu_items .item");
    const title = document.querySelector(".title-container");
    const div_nav_menu_image = document.querySelector(".div_nav_menu_image");

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" || event.keyCode === 27) {
        navbar_menu.classList.remove("show");
        div_nav_menu_image.style.visibilty = "hidden";
        items.forEach((item) => {
          item.classList.remove("show");
          item.style.opacity = "0";
        });

        body.style.overflow = "auto";
        console.log("Escape Key Pressed: Menu Hidden.");
        checkbox.checked = false;
      }
    });

    checkbox.addEventListener("click", function () {
      //! Show the Menu when checked
      if (this.checked) {
        navbar_menu.classList.add("show");
        div_nav_menu_image.style.visibilty = "visible";

        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("show");
            item.style.opacity = "1";
          }, 100 * index);
        });

        body.style.overflow = "hidden";
      } else {
        items.forEach((item) => {
          item.style.opacity = "0";
          item.classList.remove("show");
        });
        div_nav_menu_image.style.visibilty = "hidden";
        navbar_menu.classList.remove("show");
        body.style.overflow = "auto";
      }
    });

    const image = document.querySelector(".nav_menu_image_image");

    items.forEach((item) => {
      const key = item.querySelector(".menu_item").getAttribute("id");
      console.log(key);
      let src;

      switch (key) {
        case "home":
          src = "media/ss_Index.png";
          break;

        case "software":
          src = "media/ss_SoftwareProjects.png";
          break;

        case "design":
          src = "media/ss_DesignProjects.png";
          break;

        case "resume":
          src = "media/ss_Resume.png";
          break;

        case "contact":
          src = "media/ss_Contact.png";
          break;

        default:
          break;
      }

      item.addEventListener("mouseover", (event) => {
        // image.style.opacity = "0";
        image.style.transform = "scale(0)";
        setTimeout(() => {
          image.style.transform = "scale(1)";
          // image.style.opacity = "1";
          image.src = src;
        }, 200);
        nav_menu_image.classList.add("active");
      });

      item.addEventListener("mouseout", () => {
        image.style.transform = "scale(0)";
        nav_menu_image.classList.remove("active");
      });
    });

    // document.addEventListener("mousemove", (e) => {
    //   requestAnimationFrame(() => {
    //     nav_menu_image.style.left = e.clientX + "px";
    //     nav_menu_image.style.top = e.clientY + "px";
    //   });
    // });

    // ! Cursor Menu Hover Effect
    navbar_menu.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(6)", "none");
      addClass(cursoricon1, "active");
      removeClass(cursoricon2, "active");
    });

    navbar_menu.addEventListener("mouseout", () => {
      cursorTransformShadowBlend();
      removeClass(cursoricon1, "active");
    });

    title.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.5)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    title.addEventListener("mouseout", () => {
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });

    navbar_menu_btn.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.5)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    navbar_menu_btn.addEventListener("mouseout", () => {
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });

    contact_button.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(1.5)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    contact_button.addEventListener("mouseout", () => {
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
    });

    //!  Set Active Link to Menu Item (Highlight Current Page)
    const pathName = window.location.pathname
      .toString()
      .replace("/docs/", "")
      .replace(".html", "")
      .replace("/", "");

    items.forEach((item) => {
      item.addEventListener("mouseenter", shuffleAnimation);

      const anchor = item.parentElement;
      var href = anchor.getAttribute("href");

      // console.log(href, "Href");
      // console.log(pathName, "pathName");

      if (href === pathName || (pathName === "" && href == "index")) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  })
  .then(() => {
    //! Text Animation on Hover
    let element = document.querySelector(".navbar-brand");

    let innerText = element.innerText;
    element.innerHTML = "";

    let textContainer = document.createElement("div");
    textContainer.classList.add("block");

    for (let letter of innerText) {
      let span = document.createElement("span");
      span.innerText = letter.trim() === "" ? "\xa0" : letter;
      span.classList.add("letter");
      textContainer.appendChild(span);
    }

    element.appendChild(textContainer);
    element.appendChild(textContainer.cloneNode(true));

    element.addEventListener("mouseover", () => {
      element.classList.remove("play");
    });
  });

// ! Text Letters Shuffle

function getRandomCharacter() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
}

function shuffleAnimation(event) {
  const target = event.currentTarget;

  if (target.dataset.animating) {
    return;
  }

  target.dataset.animating = true;

  const words = target.querySelectorAll(".menu_item");
  const originalWords = Array.from(words).map((word) => word.textContent);

  let shuffles = 0;
  const maxShuffles = 10;
  const intervalDuration = 200 / maxShuffles;

  let animationInterval = setInterval(() => {
    if (shuffles >= maxShuffles) {
      clearInterval(animationInterval);
      words.forEach((word, index) => {
        word.textContent = originalWords[index];
      });

      delete target.dataset.animating;
    } else {
      words.forEach((word) => {
        const length = word.textContent.length;
        let shuffledText = "";
        for (let i = 0; i < length; i++) {
          shuffledText += getRandomCharacter();
        }
        word.textContent = shuffledText;
      });
      shuffles++;
    }
  }, intervalDuration);
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
