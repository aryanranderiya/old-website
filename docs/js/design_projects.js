document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const folders = document.querySelectorAll(".folder");
  const content1 = document.querySelector(".content1");
  const section2 = document.querySelector(".section2");
  const content3 = document.querySelector(".content3");
  const content4 = document.querySelector(".content4");
  const folder1 = document.getElementById("folder_one");
  const folder2 = document.getElementById("folder_two");
  const folder4 = document.getElementById("folder_four");
  const folder3 = document.getElementById("folder_three");
  const title = document.querySelector(".title-heading");
  var cursor_glow = document.querySelector(".cursor_glow_div");
  const merch_items = document.querySelectorAll(".merch_item");
  const heading_titles = document.querySelectorAll(".heading_title");

  document.addEventListener("mousemove", function (e) {
    cursor_glow.style.transform = `translate3d(calc(${e.clientX}px), calc(${e.clientY}px), 0)`;
  });

  title.addEventListener("mouseout", cursorTransformShadowBlend());
  title.addEventListener(
    "mouseover",
    cursorTransformShadowBlend("scale(10)", "none", "difference")
  );

  heading_titles.forEach((title) => normalObserver.observe(title));
  merch_items.forEach((item) => normalObserver.observe(item));

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

  generateMerchItems();
  foldersHover(folders);
  normalHeaders(slider);
  animeHeaders();
  thumbnails();
});

function generateMerchItems() {
  const merchItemsData = [
    {
      imgSrc: "media/apparel/Tshirt Porsche.webp",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Porsche",
    },
    {
      imgSrc: "media/apparel/Tshirt Interstellar.webp",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Interstellar",
    },
    {
      imgSrc: "media/apparel/Tshirt Kanye.webp",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Kanye West",
    },
    {
      imgSrc: "media/apparel/Tshirt Future1.webp",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Future 1",
    },
    {
      imgSrc: "media/apparel/Tshirt BlueRose.webp",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Blue Rose",
    },
    {
      imgSrc: "media/apparel/Tshirt Japan.webp",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Japan",
    },
    {
      imgSrc: "media/apparel/Tshirt MiH.webp",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Make It Happen",
    },
    {
      imgSrc: "media/apparel/Tshirt Future2.webp",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Future 2",
    },
    {
      imgSrc: "media/apparel/Tshirt InterstellarOld.webp",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Interstellar 2",
    },
    {
      imgSrc: "media/apparel/Tshirt Dragon.webp",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Dragon",
    },
    {
      imgSrc: "media/apparel/Tshirt Nuclear.webp",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Nuclear",
    },
    {
      imgSrc: "media/apparel/Tshirt Spiderverse.webp",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Spiderverse",
    },
  ];

  const merchItemsContainer = document.getElementById("merchItemsContainer");

  merchItemsContainer.innerHTML = "";

  merchItemsData.forEach((item, index) => {
    index++;

    if (index < 10) {
      index = "0" + index;
    }

    const merchItem = document.createElement("div");
    merchItem.classList.add("merch_item");

    const itemImg = document.createElement("div");
    itemImg.classList.add("item-img");
    itemImg.innerHTML = `<img src="${item.imgSrc}" alt="" loading="eager" class="apparel_image" />`;

    const itemCopy = document.createElement("div");
    itemCopy.classList.add("item-copy");

    const itemCopy1 = document.createElement("div");
    itemCopy1.classList.add("item-copy-1");

    const shape1 = document.createElement("div");
    shape1.classList.add("shape");
    shape1.innerHTML = `<div id="number"><span>${index}</span></div><div class="text-right"><span>${item.category.charAt(
      0
    )}</span>${item.category.slice(1)}</div>`;

    itemCopy1.appendChild(shape1);

    const itemCopy2 = document.createElement("div");
    itemCopy2.classList.add("item-copy-2");

    const shape2 = document.createElement("div");
    shape2.classList.add("shape");
    shape2.innerHTML = `<div class="text-left"><span>${item.brand.charAt(
      0
    )}</span>${item.brand.slice(1)}</div><div class="text-right"><span>${
      item.title
    }</span></div>`;

    itemCopy2.appendChild(shape2);

    itemCopy.appendChild(itemCopy1);
    itemCopy.appendChild(itemCopy2);

    merchItem.appendChild(itemImg);
    merchItem.appendChild(itemCopy);

    merchItemsContainer.appendChild(merchItem);
  });
}

function foldersHover(folders) {
  folders.forEach((folder) => {
    folder.style.transition =
      " filter 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)";

    folder.style.zIndex = "1";

    folder.addEventListener("mouseover", () => {
      folder.style.filter = "brightness(100%)";

      folders.forEach((otherFolder) => {
        if (otherFolder !== folder) {
          otherFolder.style.filter = "brightness(20%)";
        }
      });

      cursor.style.boxShadow = "none";
      cursor.classList.add("transparent");
      cursoricon5.classList.add("active");
      cursoricon5.style.transform = "scale(2)";
    });

    folder.addEventListener("mouseout", () => {
      cursor.classList.remove("transparent");
      cursoricon5.style.transform = "none";
      cursoricon5.classList.remove("active");

      folders.forEach((otherFolder) => {
        otherFolder.style.filter = "brightness(100%)";
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
  const controlsContainer = document.querySelector(".video_controls_container");

  let translate = 0,
    index = 1;

  controlForward.addEventListener("click", () => {
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
    translate -= 100;
    index--;
    if (translate < 0) translate = 1700;
    if (index < 1) index = 18;
    headersText.innerHTML = `${index}/18`;
    animeImages.forEach((anime_image) => {
      anime_image.style.transform = `translateX(-${translate}%)`;
    });
  });

  function handleIntersectionAnime(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        removeClass(dot, "visible");
        removeClass(icons, "hidden");
        removeClass(otherControls, "hidden");
        removeClass(controlsContainer, "hidden");
        controlsContainer.style.opacity = "1";
        entry.target.style.opacity = "1";
      } else {
        entry.target.style.opacity = "0";
        addClass(dot, "visible");
        addClass(icons, "hidden");
        addClass(otherControls, "hidden");
        addClass(controlsContainer, "hidden");
        setTimeout(() => (controlsContainer.style.opacity = "0"), 1000);
      }
    });
  }

  const observerAnime = new IntersectionObserver(handleIntersectionAnime, {
    root: null,
    threshold: 0.5,
  });

  observerAnime.observe(content3);
}

function thumbnails() {
  const thumbnails = document.querySelectorAll(".thumbnail_image");
  const content4 = document.querySelector(".content4");

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
  });
}

// Functions
function cursorTransformShadowBlend(
  param_transform = "none",
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

// First Intersection Observer for the titles
function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.style.opacity = "1";
    else entry.target.style.opacity = "0";
  });
}
const normalObserver = new IntersectionObserver(handleIntersection, {
  root: null,
  threshold: 0.8,
});
