async function loadNavbar() {
  const navbarContainer = document.getElementById("navbarContainer");

  return fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      navbarContainer.innerHTML = data;

      const navbar = document.querySelector(".navbar");
      const navbar_menu = document.querySelector(".navbar_menu");
      const items = document.querySelectorAll(".menu_items .item");

      let lastScrollTop = 0;

      window.addEventListener("scroll", function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) addClass(navbar, "hide");
        else removeClass(navbar, "hide");
        lastScrollTop = scrollTop;
      });

      handleMenuOpening(items, navbar_menu, navbar);
      addHoverImage(items);
      addMouseListeners(navbar_menu);
      setActiveLink(items);
    });
}

loadNavbar();

const cursor_variable = document.querySelector(".cursor");
const cursor_background = document.querySelector(".cursor_bg");

function cursorTransformShadowBlend(
  param_transform = "none",
  param_boxShadow = "0px 0px 30px white",
  param_mixBlendMode = "normal"
) {
  cursor_variable.style.transform = param_transform;
  cursor_variable.style.boxShadow = param_boxShadow;
  cursor_variable.style.mixBlendMode = param_mixBlendMode;
}

function addClass(element, className) {
  element.classList.add(className);
}
function removeClass(element, className) {
  element.classList.remove(className);
}

function addMouseListeners(navbar_menu) {
  const cursoricon1 = document.getElementById("cursoricon1");
  const cursoricon2 = document.getElementById("cursoricon2");
  const cursoricon5 = document.getElementById("cursoricon5");
  const navbar_menu_btn = document.querySelector(".navbar_menu_btn");
  const title = document.querySelector(".navbar-brand");

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
    cursorTransformShadowBlend("scale(1.3)", "none");
    addClass(cursor_variable, "transparent");
    addClass(cursoricon5, "active");
  });

  title.addEventListener("mouseout", () => {
    removeClass(cursor_variable, "transparent");
    removeClass(cursoricon5, "active");
    cursorTransformShadowBlend();
  });

  navbar_menu_btn.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(1.3)", "none");
    addClass(cursor_variable, "transparent");
    addClass(cursoricon5, "active");
  });

  navbar_menu_btn.addEventListener("mouseout", () => {
    removeClass(cursor_variable, "transparent");
    removeClass(cursoricon5, "active");
    cursorTransformShadowBlend();
  });
}

function addHoverImage(items) {
  [
    "media/ss_Index.webp",
    "media/ss_SoftwareProjects.webp",
    "media/ss_DesignProjects.webp",
    "media/ss_Resume.webp",
    "media/ss_Contact.webp",
  ].forEach((imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
  });

  const image = document.querySelector(".nav_menu_image_image");
  const nav_menu_image = document.getElementById("nav_menu_image");

  items.forEach((item) => {
    const key = item.querySelector(".menu_item").getAttribute("id");
    let src;

    switch (key) {
      case "home":
        src = "media/ss_Index.webp";
        break;

      case "software":
        src = "media/ss_SoftwareProjects.webp";
        break;

      case "design":
        src = "media/ss_DesignProjects.webp";
        break;

      case "resume":
        src = "media/ss_Resume.webp";
        break;

      case "contact":
        src = "media/ss_Contact.webp";
        break;

      default:
        break;
    }

    item.addEventListener("mouseover", (event) => {
      image.style.transform = "scale(0)";
      setTimeout(() => {
        image.style.transform = "scale(1)";
        image.src = src;
      }, 200);
      addClass(nav_menu_image, "active");
    });

    item.addEventListener("mouseout", () => {
      image.style.transform = "scale(0)";
      removeClass(nav_menu_image, "active");
    });
  });
}

function handleMenuOpening(items, navbar_menu, navbar) {
  const body = document.querySelector("body");
  const checkbox = document.getElementById("hamburgerCheckbox");

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      removeClass(navbar_menu, "show");
      body.style.overflow = "auto";
      checkbox.checked = false;
      items.forEach((item) => removeClass(item, "show"));
    }
  });

  checkbox.addEventListener("click", function () {
    //! Show the Menu when checked
    if (this.checked) {
      setTimeout(() => {
        removeClass(navbar, "hide");
      }, 20);
      addClass(navbar, "show");
      addClass(navbar_menu, "show");
      body.style.overflow = "hidden";
      items.forEach((item, index) =>
        setTimeout(() => addClass(item, "show"), 150 * index)
      );
    } else {
      setTimeout(() => removeClass(navbar_menu, "show"), 300);
      setTimeout(() => (body.style.overflow = "auto"), 1100);
      items.forEach((item, index) =>
        setTimeout(() => removeClass(item, "show"), index * 50)
      );
    }
  });
}

function setActiveLink(items) {
  //!  Set Active Link to Menu Item (Highlight Current Page)
  const pathName = window.location.pathname
    .replace("/docs/", "")
    .replace(".html", "")
    .replace("/", "");

  items.forEach((item) => {
    item.addEventListener("mouseenter", shuffleAnimation);
    var href = item.parentElement.getAttribute("href");

    if (href === pathName || (pathName === "" && href == "index"))
      addClass(item, "active");
    else removeClass(item, "active");
  });
}

// ! Text Letters Shuffle
function getRandomCharacter() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
}

function shuffleAnimation(event) {
  const target = event.currentTarget;

  if (target.dataset.animating) return;

  target.dataset.animating = true;

  const words = target.querySelectorAll(".menu_item");
  const originalWords = Array.from(words).map((word) => word.textContent);

  let shuffles = 0;
  const maxShuffles = 10;
  const intervalDuration = 200 / maxShuffles;

  let animationInterval = setInterval(() => {
    if (shuffles >= maxShuffles) {
      clearInterval(animationInterval);
      words.forEach((word, index) => (word.textContent = originalWords[index]));
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
