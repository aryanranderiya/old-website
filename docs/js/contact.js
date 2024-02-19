const title = document.querySelector(".title");
const title_div = document.querySelector(".title_div");
const emailElements = document.querySelectorAll(".div_email > *");
const div_email = document.querySelector(".div_email");
const socialElements = document.querySelectorAll(".social > *");
const social = document.querySelectorAll(".social");
const description = document.querySelector(".description");
const cursoricon4 = document.querySelector("#cursoricon4");
const cursoricon5 = document.querySelector("#cursoricon5");
const cursoricontyping = document.querySelector("#cursoricontyping");
const inputs = document.querySelectorAll(".form_input");
const button_primary = document.querySelector(".button_primary");
const form = document.getElementById("form");

window.onload = function () {
  form.reset();
};

document.addEventListener("DOMContentLoaded", function () {
  cursorGlow();
  addHoverListeners();
  largeNameHover();
});

function addHoverListeners() {
  const marquee = document.querySelector(".marquee");
  const footer_bottom_name = document.querySelector(".footer_bottom_name");

  marquee.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(7)", "none", "difference");
  });

  marquee.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
  });

  footer_bottom_name.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(10)", "none", "difference");
    addClass(cursoricon4, "active");
  });

  footer_bottom_name.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    removeClass(cursoricon4, "active");
  });

  title_div.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(8)", "none");
    cursor.style.outlineStyle = "solid";
    cursor.style.outlineColor = "white";
    cursor.style.outlineWidth = "0.1px";
    addClass(cursor, "partially_transparent");
    addClass(cursoricon4, "active");
  });

  title_div.addEventListener("mouseout", () => {
    cursor.style.outline = "none";
    cursorTransformShadowBlend("none");
    removeClass(cursor, "partially_transparent");
    removeClass(cursoricon4, "active");
  });

  button_primary.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(1.5)", "none");
    addClass(cursor, "transparent");
    addClass(cursoricon5, "active");
  });

  button_primary.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    removeClass(cursor, "transparent");
    removeClass(cursoricon5, "active");
  });

  div_email.addEventListener("mouseover", () => {
    cursorTransformShadowBlend(undefined, "none");
    addClass(cursor, "transparent");
    addClass(cursoricon5, "active");
  });

  div_email.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    removeClass(cursor, "transparent");
    removeClass(cursoricon5, "active");
  });

  social.forEach((element) => {
    element.addEventListener("mouseover", () => {
      cursorTransformShadowBlend(undefined, "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    element.addEventListener("mouseout", () => {
      cursorTransformShadowBlend();
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
    });
  });

  inputs.forEach((input) => {
    input.addEventListener("mouseover", () => {
      cursorTransformShadowBlend(undefined, "none");
      addClass(cursor, "transparent");
      addClass(cursoricontyping, "active");
    });

    input.addEventListener("mouseout", () => {
      cursorTransformShadowBlend();
      removeClass(cursor, "transparent");
      removeClass(cursoricontyping, "active");
    });
  });
}

// ! change marquee direction on scroll
let currentScroll = window.pageYOffset;
let isScrollingDown = true;

let tween = gsap.to(".marquee__part", {
  xPercent: -100,
  repeat: -1,
  duration: 3,
  ease: "linear",
});

gsap.set(".marquee__inner", { xPercent: -50 });

window.addEventListener("wheel", function (event) {
  if (event.deltaY > 0) {
    isScrollingDown = true;
  } else {
    isScrollingDown = false;
  }

  gsap.to(tween, {
    timeScale: isScrollingDown ? 1 : -1,
  });

  currentScroll = window.pageYOffset;
});

function largeNameHover() {
  //! Hover Animation on Aryan Randeriya Fotoer Text

  const defaultScale = 1;
  const maxScale = 1.5;
  const neighborScale = 1.2;

  const wordContainers = document.querySelectorAll(
    ".footer_bottom_name .bottom_name_container .word"
  );

  wordContainers.forEach((wordContainer) => {
    const spans = wordContainer.querySelectorAll("span");

    wordContainer.addEventListener("mouseover", (e) => {
      const target = e.target;
      const index = Array.from(spans).indexOf(target);

      spans.forEach((span, i) => {
        let scale = defaultScale;

        if (i === index) {
          scale = maxScale;
        } else if (i === index - 1 || i === index + 1) {
          scale = neighborScale;
        }

        span.style.transform = `scaleY(${scale})`;
      });
    });

    wordContainer.addEventListener("mouseout", () => {
      spans.forEach((span) => {
        span.style.transform = `scaleY(${defaultScale})`;
      });
    });
  });
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        addClass(title, "show");
        addClass(description, "show");
        emailElements.forEach((element) => addClass(element, "show"));
        socialElements.forEach((element, index) =>
          setTimeout(() => addClass(element, "show"), index * 50)
        );
      }, 850);
    }
  });
}
const observer1 = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
});

observer1.observe(title_div);

function addClass(element, className) {
  element.classList.add(className);
}
function removeClass(element, className) {
  element.classList.remove(className);
}

function cursorTransformShadowBlend(
  param_transform = "none",
  param_boxShadow = "0px 0px 30px white",
  param_mixBlendMode = "normal"
) {
  cursor.style.transform = param_transform;
  cursor.style.boxShadow = param_boxShadow;
  cursor.style.mixBlendMode = param_mixBlendMode;
}
