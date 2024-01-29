document.addEventListener("DOMContentLoaded", function () {
  var cursor_glow = document.querySelector(".cursor_glow_div");

  document.addEventListener("mousemove", function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursor_glow.style.transform = `translate3d(calc(${x}px), calc(${y}px), 0)`;
  });

  //! Generate Merch Cards

  const merchItemsData = [
    {
      imgSrc: "images/apparel/Tshirt Porsche.png",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Porsche",
    },
    {
      imgSrc: "images/apparel/Tshirt Interstellar.png",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Interstellar",
    },
    {
      imgSrc: "images/apparel/Tshirt Kanye.png",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Kanye West",
    },
    {
      imgSrc: "images/apparel/Tshirt Future1.png",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Future 1",
    },
    {
      imgSrc: "images/apparel/Tshirt BlueRose.png",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Blue Rose",
    },
    {
      imgSrc: "images/apparel/Tshirt Japan.png",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Japan",
    },
    {
      imgSrc: "images/apparel/Tshirt Future2.png",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Future 2",
    },
    {
      imgSrc: "images/apparel/Tshirt InterstellarOld.png",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Interstellar 2",
    },
    {
      imgSrc: "images/apparel/Tshirt Dragon.png",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Dragon",
    },
    {
      imgSrc: "images/apparel/Tshirt Nuclear.png",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Nuclear",
    },
    {
      imgSrc: "images/apparel/Tshirt Spiderverse.png",
      category: "Apparel",
      brand: "Aryan Randeriya",
      title: "Spiderverse",
    },
  ];

  function generateMerchItems() {
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

  generateMerchItems();

  // ! Titles

  const title = document.querySelector(".title-heading");
  const heading_title = document.querySelector(".heading_title");

  title.addEventListener("mouseover", () => {
    cursor.style.transform = "scale(10)";
    cursor.style.mixBlendMode = "difference";
    cursor.style.boxShadow = "none";
  });

  title.addEventListener("mouseout", () => {
    cursor.style.transform = "none";
    cursor.style.mixBlendMode = "normal";
    cursor.style.boxShadow = "0px 0px 30px white";
  });

  //! First Intersection Observer for the headers text
  function handleIntersection(entries, observer) {
    //! Fade in the content box
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
      } else {
        entry.target.style.opacity = "0";
      }
    });
  }
  const observer1 = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  });
  observer1.observe(heading_title);

  const merch_items = document.querySelectorAll(".merch_item");

  merch_items.forEach((merch_item) => {
    observer1.observe(merch_item);
  });

  //! Scroll to div when clicked on folder

  document.getElementById("folder_one").addEventListener("click", function () {
    document.querySelector(".content1").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("folder_two").addEventListener("click", function () {
    document.querySelector(".content2").scrollIntoView({ behavior: "smooth" });
  });

  var folders = document.querySelectorAll(".folder");

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
      cursor.style.boxShadow = "0px 0px 30px white";
      cursoricon5.style.transform = "none";
      cursoricon5.classList.remove("active");

      folders.forEach((otherFolder) => {
        otherFolder.style.filter = "brightness(100%)";
      });
    });
  });

  const heading_titles = document.querySelectorAll(".heading_title");
  const cursoriconstar = document.getElementById("cursoriconstar");

  heading_titles.forEach((heading) => {
    heading.addEventListener("mouseover", () => {
      cursor.style.transform = "none";
      cursor.style.boxShadow = "none";
      cursor.classList.add("transparent");
      cursoriconstar.classList.add("active");
      cursor.style.mixBlendMode = "difference";
    });

    heading.addEventListener("mouseout", () => {
      cursor.style.mixBlendMode = "normal";

      cursor.classList.remove("transparent");
      cursor.style.boxShadow = "0px 0px 30px white";
      cursoriconstar.classList.remove("active");
    });
  });
});

//! Header Scrolling Carousel
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

  handleWheel(e) {
    this.progress += e.deltaY;
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

//! Header Scrolling End

//! Change cursor to drag when hover on headers

const slider = document.querySelector(".slider");
const cursoricondrag = document.getElementById("cursoricondrag");

slider.addEventListener("mouseover", () => {
  cursor.style.transform = "none";
  cursor.style.boxShadow = "none";
  cursor.classList.add("transparent");
  cursoricondrag.classList.add("active");
});

slider.addEventListener("mouseout", () => {
  cursor.classList.remove("transparent");
  cursor.style.boxShadow = "0px 0px 30px white";
  cursoricondrag.classList.remove("active");
});

// ! Merch designs hover

/*
document.querySelectorAll(".merch_item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    gsap.set(this.querySelectorAll("span"), { opacity: 0 });
    gsap.to(this.querySelectorAll("span"), {
      opacity: 1,
      duration: 0.075,
      stagger: {
        from: "random",
        each: 0.02,
      },
      ease: "power2.out",
    });
  });

  item.addEventListener("mouseleave", function () {
    gsap.to(this.querySelectorAll("span"), {
      opacity: 0,
      duration: 0.075,
      stagger: {
        from: "random",
        each: 0.02,
      },
      ease: "power2.in",
    });
  });
});
*/
