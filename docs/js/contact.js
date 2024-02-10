const title = document.querySelector(".title");
const title_div = document.querySelector(".title_div");
const emailElements = document.querySelectorAll(".div_email > *");
const socialElements = document.querySelectorAll(".social > *");
const description = document.querySelector(".description");
const cursoricon4 = document.querySelector("#cursoricon4");
document.addEventListener("DOMContentLoaded", function () {
  cursorGlow();
  addHoverListeners();
  changeMarqueeDirection();
  largeNameHover();
});

function cursorGlow() {
  const cursor_glow = document.querySelector(".cursor_glow_div");

  document.addEventListener("mousemove", (e) => {
    cursor_glow.style.left = e.clientX + "px";
    cursor_glow.style.top = e.clientY + "px";
  });
}

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
}

function changeMarqueeDirection() {
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
}

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

function formSubmit() {
  document.getElementById("form").submit();

  const urlParams = new URLSearchParams(window.location.search);
  const successParam = urlParams.get("success");
if (successParam == "true")
    alert("Thank you for Contacting me! I will get back to you ASAP! :)");
}

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
