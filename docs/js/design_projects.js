function handleIntersectionTitles2(entries) {
  entries.forEach((entry) => {
    let text = entry.target.querySelector(".heading_title_text");
    let icon = entry.target.querySelector(".title_icon");

    if (entry.isIntersecting) {
      text.classList.add("show");
      icon.classList.add("show");
    } else {
      text.classList.remove("show");
      icon.classList.remove("show");
    }
  });
}
const titleobserver2 = new IntersectionObserver(handleIntersectionTitles2, {
  threshold: 0.5,
});

let hasntIntersectedYet = true;

function handleIntersectionTitle(entries) {
  entries.forEach((entry) => {
    const title = entry.target.querySelector(".title-heading");

    if (entry.isIntersecting) {
      if (hasntIntersectedYet) {
        setTimeout(() => title.classList.add("show"), 700);
        hasntIntersectedYet = false;
      } else {
        title.classList.add("show");
        hasntIntersectedYet = false;
      }
    } else {
      title.classList.remove("show");
    }
  });
}
const titleobserver = new IntersectionObserver(handleIntersectionTitle, {
  threshold: 0.5,
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const folders = document.querySelectorAll(".folder");
  const titleHeading = document.querySelector(".title-heading");
  const titlediv = document.querySelector(".title");
  const cursor_glow = document.querySelector(".cursor_glow_div");
  const heading_titles = document.querySelectorAll(".heading_title");
  const popupImage = document.querySelector(".popup_image");
  const closeText = document.querySelector(".close_text");
  const popupContainer = document.querySelector(".popup_image_container");
  const btnScrollTop = document.querySelector(".scrolltotop");

  document.addEventListener("mousemove", function (e) {
    cursor_glow.style.transform = `translate3d(calc(${e.clientX}px), calc(${e.clientY}px), 0)`;
  });

  window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
      btnScrollTop.style.opacity = 1;
    else btnScrollTop.style.opacity = 0;
  };

  btnScrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  titlediv.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(10)", "none", "difference");
  });

  titlediv.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
  });

  titleobserver.observe(titlediv);

  addFolderListeners();
  generateMerchItems(heading_titles);
  foldersHover(folders);
  normalHeaders(slider);
  animeHeaders();
  thumbnails(popupImage, popupContainer, closeText);
  advertisements(popupImage, popupContainer, closeText);

  popupContainer.addEventListener("click", (event) => {
    closePopup(popupContainer, popupImage, event);
  });
  closeText.addEventListener("click", (event) => {
    closePopup(popupContainer, popupImage, event);
  });
});

function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
    } else entry.target.style.opacity = "0";
  });
}
const normalObserver = new IntersectionObserver(handleIntersection, {
  root: null,
  threshold: 0.8,
});

function addFolderListeners() {
  const content1 = document.querySelector(".content1");
  const section2 = document.querySelector(".section2");
  const content3 = document.querySelector(".content3");
  const content4 = document.querySelector(".content4");
  const content5 = document.querySelector(".content5");
  const content6 = document.querySelector(".content6");

  const folder1 = document.getElementById("folder_one");
  const folder2 = document.getElementById("folder_two");
  const folder3 = document.getElementById("folder_three");
  const folder4 = document.getElementById("folder_four");
  const folder5 = document.getElementById("folder_five");
  const folder6 = document.getElementById("folder_six");

  folder1.addEventListener("click", () =>
    content1.scrollIntoView({ behavior: "smooth" })
  );

  folder2.addEventListener("click", () =>
    section2.scrollIntoView({ behavior: "smooth" })
  );

  folder3.addEventListener("click", () =>
    content3.scrollIntoView({ behavior: "smooth" })
  );

  folder4.addEventListener("click", () =>
    content4.scrollIntoView({ behavior: "smooth" })
  );

  folder5.addEventListener("click", () =>
    content5.scrollIntoView({ behavior: "smooth" })
  );

  folder6.addEventListener("click", () =>
    content6.scrollIntoView({ behavior: "smooth" })
  );
}

function generateMerchItems(heading_titles) {
  const merchItemsData = [
    {
      category: "Apparel",
      brand: "Aryan Randeriya",
      items: [
        { imgSrc: "media/apparel/Tshirt Porsche.webp", title: "Porsche" },
        {
          imgSrc: "media/apparel/Tshirt Interstellar.webp",
          title: "Interstellar",
        },
        { imgSrc: "media/apparel/Tshirt Kanye.webp", title: "Kanye West" },
        { imgSrc: "media/apparel/Tshirt Future1.webp", title: "Future 1" },
        { imgSrc: "media/apparel/Tshirt BlueRose.webp", title: "Blue Rose" },
        { imgSrc: "media/apparel/Tshirt Japan.webp", title: "Japan" },
        { imgSrc: "media/apparel/Tshirt MiH.webp", title: "Make It Happen" },
        { imgSrc: "media/apparel/Tshirt Future2.webp", title: "Future 2" },
        {
          imgSrc: "media/apparel/Tshirt InterstellarOld.webp",
          title: "Interstellar 2",
        },
        { imgSrc: "media/apparel/Tshirt Dragon.webp", title: "Dragon" },
        { imgSrc: "media/apparel/Tshirt Nuclear.webp", title: "Nuclear" },
        {
          imgSrc: "media/apparel/Tshirt Spiderverse.webp",
          title: "Spiderverse",
        },
      ],
    },
  ];

  const merchItemsContainer = document.getElementById("merchItemsContainer");

  merchItemsContainer.innerHTML = "";

  let index = 0;
  for (const item of merchItemsData[0].items) {
    index++;

    if (index < 10) {
      index = "0" + index;
    }

    const merchItem = document.createElement("div");
    addClass(merchItem, "merch_item");

    const itemImg = document.createElement("div");
    addClass(itemImg, "item-img");

    itemImg.innerHTML = `<img src="${item.imgSrc}" alt="" loading="eager" class="apparel_image" />`;

    const itemCopy = document.createElement("div");
    addClass(itemCopy, "item-copy");

    const itemCopy1 = document.createElement("div");
    addClass(itemCopy1, "item-copy-1");

    const shape1 = document.createElement("div");
    addClass(shape1, "shape");
    shape1.innerHTML = `<div id="number"><span>${index}</span></div><div class="text-right"><span>Apparel</span></div>`;

    itemCopy1.appendChild(shape1);

    const itemCopy2 = document.createElement("div");
    addClass(itemCopy2, "item-copy-2");

    const shape2 = document.createElement("div");
    addClass(shape2, "shape");

    shape2.innerHTML = `<div class="text-left"><span>Aryan Randeriya</span></div><div class="text-right"><span>${item.title}</span></div>`;

    itemCopy2.appendChild(shape2);

    itemCopy.appendChild(itemCopy1);
    itemCopy.appendChild(itemCopy2);

    merchItem.appendChild(itemImg);
    merchItem.appendChild(itemCopy);

    merchItemsContainer.appendChild(merchItem);
    normalObserver.observe(merchItem);
  }

  merchItemsData[0].items.forEach((item, index) => {});

  heading_titles.forEach((title) => titleobserver2.observe(title));
}

function foldersHover(folders) {
  const cursoricon5 = document.querySelector("#cursoricon5");

  folders.forEach((folder) => {
    normalObserver.observe(folder);

    folder.addEventListener("mouseover", () => {
      folders.forEach((other) => {
        if (other !== folder) other.style.filter = "brightness(20%)";
      });

      folder.style.filter = "brightness(100%)";
      addClass(cursoricon5, "active");
      addClass(cursor, "transparent");
      cursorTransformShadowBlend("scale(2)", "none", "normal");
    });

    folder.addEventListener("mouseout", () => {
      removeClass(cursoricon5, "active");
      removeClass(cursor, "transparent");
      cursorTransformShadowBlend("none", "none", "normal");
      folders.forEach((other) => {
        other.style.filter = "brightness(100%)";
      });
    });
  });
}

function normalHeaders(slider) {
  const cursoricondrag = document.getElementById("cursoricondrag");

  // Change cursor to drag when hover on headers
  slider.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("none", "none");
    addClass(cursor, "transparent");
    addClass(cursoricondrag, "active");
  });

  slider.addEventListener("mouseout", () => {
    cursorTransformShadowBlend(undefined, undefined);
    removeClass(cursor, "transparent");
    removeClass(cursoricondrag, "active");
  });

  // Header Scrolling Carousel
  const lerp = (f0, f1, t) => (1 - t) * f0 + t * f1;
  const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

  class DragScroll {
    constructor(obj) {
      this.el = document.querySelector(obj.el);
      this.wrap = this.el.querySelector(obj.wrap);
      this.items = this.el.querySelectorAll(obj.item);
      this.bar = this.el.querySelector(obj.bar);
      this.init();
    }

    init() {
      this.progress = 0;
      this.speed = 0;
      this.oldX = 0;
      this.x = 0;
      this.playrate = 0;

      this.bindings();
      this.events();
      this.calculate();
      this.raf();
    }

    bindings() {
      [
        "events",
        "calculate",
        "raf",
        "handleWheel",
        "move",
        "raf",
        "handleTouchStart",
        "handleTouchMove",
        "handleTouchEnd",
      ].forEach((method) => {
        this[method] = this[method].bind(this);
      });
    }

    calculate() {
      this.progress = 0;
      this.wrapWidth = this.items[0].clientWidth * this.items.length;
      this.wrap.style.width = `${this.wrapWidth}px`;
      this.maxScroll = this.wrapWidth - this.el.clientWidth;
    }

    handleWheel() {
      this.progress = window.scrollY;
      this.move();
    }

    handleTouchStart(e) {
      e.preventDefault();
      this.dragging = true;
      this.startX = e.clientX || e.touches[0].clientX;
      this.el.classList.add("dragging");
    }

    handleTouchMove(e) {
      if (!this.dragging) return false;
      const x = e.clientX || e.touches[0].clientX;
      this.progress += (this.startX - x) * 2.5;
      this.startX = x;
      this.move();
    }

    handleTouchEnd() {
      this.dragging = false;
      this.el.classList.remove("dragging");
    }

    move() {
      this.progress = clamp(this.progress, 0, this.maxScroll);
    }

    events() {
      window.addEventListener("resize", this.calculate);
      window.addEventListener("wheel", this.handleWheel);
      this.el.addEventListener("touchstart", this.handleTouchStart);
      window.addEventListener("touchmove", this.handleTouchMove);
      window.addEventListener("touchend", this.handleTouchEnd);
      window.addEventListener("mousedown", this.handleTouchStart);
      window.addEventListener("mousemove", this.handleTouchMove);
      window.addEventListener("mouseup", this.handleTouchEnd);
      document.body.addEventListener("mouseleave", this.handleTouchEnd);
    }

    raf() {
      this.x = lerp(this.x, this.progress, 0.1);
      this.playrate = this.x / this.maxScroll;

      this.wrap.style.transform = `translateX(${-this.x}px)`;
      this.bar.style.transform = `scaleX(${0.18 + this.playrate * 0.82})`;

      this.speed = Math.min(100, this.oldX - this.x);
      this.oldX = this.x;

      this.scale = lerp(this.scale, this.speed, 0.1);
      this.items.forEach((item) => {
        item.style.transform = `scale(${1 - Math.abs(this.speed) * 0.005})`;
        item.querySelector("img").style.transform = `scaleX(${
          1 + Math.abs(this.speed) * 0.004
        })`;
      });
    }
  }

  const scroll = new DragScroll({
    el: ".slider",
    wrap: ".slider-wrapper",
    item: ".slider-item",
    bar: ".slider-progress-bar",
  });

  const animateScroll = () => {
    requestAnimationFrame(animateScroll);
    scroll.raf();
  };

  animateScroll();
}

function animeHeaders() {
  const dot = document.querySelector(".dot");
  const icons = document.querySelector(".icons");
  const content3 = document.querySelector(".content3");
  const controlBack = document.querySelector("#control_backward");
  const controlForward = document.querySelector("#control_forward");
  const headersText = document.querySelector("#anime_headers_text");
  const animeImages = document.querySelectorAll(".anime-slider img");
  const otherControls = document.querySelector(".video_controls_others");
  const cursoricon5 = document.querySelector("#cursoricon5");
  const controlsContainer = document.querySelector(".video_controls_container");
  let translate = 0,
    index = 1;

  controlForward.addEventListener("click", () => {
    controlForward.style.transform = "scale(1.1)";
    setTimeout(() => (controlForward.style.transform = "scale(1)"), 200);
    translate += 100;
    index++;
    if (index > 18) index = 1;
    if (translate > 1700) translate = 0;
    headersText.innerHTML = `${index}/18`;
    animeImages.forEach(
      (anime_image) =>
        (anime_image.style.transform = `translateX(-${translate}%)`)
    );
  });

  controlBack.addEventListener("click", () => {
    controlBack.style.transform = "scale(1.2)";
    setTimeout(() => (controlBack.style.transform = "scale(1)"), 200);
    translate -= 100;
    index--;
    if (translate < 0) translate = 1700;
    if (index < 1) index = 18;
    headersText.innerHTML = `${index}/18`;
    animeImages.forEach((anime_image) => {
      anime_image.style.transform = `translateX(-${translate}%)`;
    });
  });

  controlForward.addEventListener("mouseover", () => {
    cursorTransformShadowBlend(undefined, "none");
    addClass(cursor, "transparent");
    addClass(cursoricon5, "active");
  });

  controlForward.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    removeClass(cursor, "transparent");
    removeClass(cursoricon5, "active");
  });

  controlBack.addEventListener("mouseover", () => {
    cursorTransformShadowBlend(undefined, "none");
    addClass(cursor, "transparent");
    addClass(cursoricon5, "active");
  });

  controlBack.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    removeClass(cursor, "transparent");
    removeClass(cursoricon5, "active");
  });

  function handleIntersectionAnime(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        removeClass(dot, "visible");
        removeClass(icons, "hidden");
        removeClass(otherControls, "hidden");
        removeClass(controlsContainer, "hidden");
        controlsContainer.style.opacity = "1";
      } else {
        addClass(dot, "visible");
        addClass(icons, "hidden");
        addClass(otherControls, "hidden");
        addClass(controlsContainer, "hidden");
        setTimeout(() => (controlsContainer.style.opacity = "0"), 500);
      }
    });
  }

  const observerAnime = new IntersectionObserver(handleIntersectionAnime, {
    root: null,
    threshold: 0.5,
  });

  observerAnime.observe(content3);
}

function thumbnails(popup_image, popup_image_container) {
  const content4 = document.querySelector(".content4");
  const thumbnails = document.querySelectorAll(".thumbnail_image");
  const cursoriconmagnify = document.querySelector("#cursoriconmagnify");
  const thumbnail_container = document.querySelector(".thumbnail_container");
  const div_hoveronme1 = document.querySelector("#div_hoveronme_container_one");

  function thumbnailIntersection(entries) {
    entries.forEach(
      (entry) => (entry.target.style.opacity = entry.isIntersecting ? "1" : "0")
    );
  }

  const observerTB = new IntersectionObserver(thumbnailIntersection, {
    threshold: 0.3,
  });
  const observerTB2 = new IntersectionObserver(thumbnailIntersection, {
    threshold: 0.7,
  });

  observerTB.observe(content4);

  thumbnails.forEach((image) => {
    observerTB2.observe(image);
    image.addEventListener("mouseover", () => addClass(image, "hover"));
    image.addEventListener("mouseout", () => removeClass(image, "hover"));
    image.addEventListener("click", () => {
      popup_image.src = image.getAttribute("src");
      setTimeout(() => {
        addClass(popup_image_container, "show");
        addClass(popup_image, "show");
      }, 100);
    });

    changeCursortoMagnify(image, cursoriconmagnify);
  });

  thumbnail_container.addEventListener("mouseover", () => {
    div_hoveronme1.style.opacity = "0";
  });
  thumbnail_container.addEventListener("mouseout", () => {
    div_hoveronme1.style.opacity = "1";
  });
}

function advertisements(popup_image, popup_image_container) {
  const advert_images = document.querySelectorAll(".advert_image");
  const cursoriconmagnify = document.querySelector("#cursoriconmagnify");

  advert_images.forEach((image) => {
    image.addEventListener("click", () => {
      popup_image.src = image.getAttribute("src");
      setTimeout(() => {
        addClass(popup_image_container, "show");
        addClass(popup_image, "show");
      }, 100);
    });

    changeCursortoMagnify(image, cursoriconmagnify);
  });
}

function changeCursortoMagnify(image, cursoriconmagnify) {
  image.addEventListener("mouseover", () => {
    addClass(cursoriconmagnify, "active");
    addClass(cursor, "transparent");
    cursorTransformShadowBlend("scale(1.5)", "none", "normal");
  });

  image.addEventListener("mouseout", () => {
    removeClass(cursoriconmagnify, "active");
    removeClass(cursor, "transparent");
    cursorTransformShadowBlend(undefined, "none", "normal");
  });
}

function closePopup(popup_image_container, popup_image) {
  removeClass(popup_image_container, "show");
  removeClass(popup_image, "show");
}

// Functions
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
