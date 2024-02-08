// document.addEventListener("DOMContentLoaded", function () {
//   console.log("test");
//   setTimeout(() => {}, 1000);
// });

const title = document.querySelector(".title");
const title_div = document.querySelector(".title_div");
const emailElements = document.querySelectorAll(".div_email > *");
const socialElements = document.querySelectorAll(".social > *");
const description = document.querySelector(".description");

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        title.classList.add("show");
        description.classList.add("show");
        emailElements.forEach((element) => element.classList.add("show"));
        socialElements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add("show");
          }, index * 50);
        });
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

var cursor_glow = document.querySelector(".cursor_glow_div");

document.addEventListener("mousemove", (e) => {
  cursor_glow.style.left = e.clientX + "px";
  cursor_glow.style.top = e.clientY + "px";
});

const marquee = document.querySelector(".marquee");
const footer_bottom_name = document.querySelector(".footer_bottom_name");

marquee.addEventListener("mouseover", () => {
  cursor.style.transform = "scale(7)";
  cursor.style.mixBlendMode = "difference";
  cursor.style.boxShadow = "none";
});

marquee.addEventListener("mouseout", () => {
  cursor.style.transform = "none";
  cursor.style.mixBlendMode = "normal";
  cursor.style.boxShadow = "0px 0px 30px white";
});

footer_bottom_name.addEventListener("mouseover", () => {
  cursor.style.transform = "scale(10)";
  cursor.style.boxShadow = "none";
  cursor.style.mixBlendMode = "difference";
  cursoricon4.classList.add("active");
});

footer_bottom_name.addEventListener("mouseout", () => {
  cursor.style.transform = "none";
  cursor.style.mixBlendMode = "normal";
  cursor.style.boxShadow = "0px 0px 30px white";
  cursoricon4.classList.remove("active");
});

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

const urlParams = new URLSearchParams(window.location.search);
const successParam = urlParams.get("success");
if (successParam == "true") {
  alert("Thank you for Contacting me! I will get back to you ASAP! :)");
}

function formSubmit() {
  document.getElementById("form").submit();
}
