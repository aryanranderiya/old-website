const cursor_glow_div_two = document.querySelector(".cursor_glow_div_two");

document.addEventListener("DOMContentLoaded", function () {
  const contentElement = document.querySelector(".content1");
  const subContent3 = document.querySelector(".subcontent3");
  const section_content1 = document.querySelector(".section_content1");
  const welcoming = document.querySelector(".welcoming");
  const cover = document.querySelector(".cover");
  const scrollBtn = document.querySelector(".scroll_btn");
  const hello_world = document.querySelector(".words");
  const words_rotating_span = document.querySelector(".words_rotating_span");
  const content1 = document.querySelector(".content1");
  const subcontent1 = document.querySelector(".subcontent1");
  const content1Titles = document.querySelectorAll(".content1_title");
  const navbar = document.querySelector(".navbar");
  const coverElement = document.querySelector(".cover");
  const buttons_blue = document.querySelectorAll(".button_blue");
  const title_heading_1 = document.querySelector(".title_heading_1");
  const cursoricon2 = document.getElementById("cursoricon2");
  const cursoricon3 = document.getElementById("cursoricon3");
  const cursoriconwave = document.getElementById("cursoriconwave");
  const cursoriconidea = document.getElementById("cursoriconidea");
  const cursoriconlaptop = document.getElementById("cursoriconlaptop");
  const cursoriconpallette = document.getElementById("cursoriconpallette");
  const span_designer = document.getElementById("span_designer");
  const span_dev = document.getElementById("span_dev");
  const span_entrepreneur = document.getElementById("span_entre");

  cursor.style.boxShadow = "none";

  // var cursor_glow = document.querySelector(".cursor_glow_div");

  // document.addEventListener("mousemove", function (e) {
  //   var x = e.clientX;
  //   var y = e.clientY;
  //   cursor_glow.style.transform = `translate3d(calc(${x}px), calc(${y}px), 0)`;
  // });

  // ! Scroll on button click

  scrollBtn.addEventListener("click", function (e) {
    cursorTransformShadowBlend();
    cursoricon2.classList.remove("active");

    contentElement.scrollIntoView({
      top: contentElement.offsetTop,
      behavior: "smooth",
    });
  });

  const observer1 = new IntersectionObserver(handleIntersection1, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  const observercoverElement = new IntersectionObserver(handleIntersection2, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  const observer2 = new IntersectionObserver(handleIntersectionGradient, {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  observer1.observe(subContent3);
  observer2.observe(section_content1);
  observercoverElement.observe(coverElement);

  // ! After animation finishes:
  function removeHelloWorldCover() {
    setTimeout(() => {
      document.body.style.overflow = "auto";
      welcoming.classList.add("hide");

      document.querySelector(".my_portfolio").classList.add("show");
      document.querySelector(".aryan_randeriya").classList.add("show");

      cursor.style.mixBlendMode = "normal";
      scrollBtn.style.opacity = "1";
      section_content1.style.opacity = "1";
      // cursor.style.boxShadow = "0px 0px 30px white";
    }, 500);

    setTimeout(function () {
      welcoming.remove();
    }, 1600);
  }

  words_rotating_span.addEventListener("animationend", removeHelloWorldCover);

  // ! Titles & Cover
  title_heading_1.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(9)", "none");
    addClass(cursor, "blur");
    addClass(cursoricon2, "active");
  });

  title_heading_1.addEventListener("mouseout", () => {
    cursorTransformShadowBlend(undefined, "none");
    removeClass(cursor, "blur");
    removeClass(cursoricon2, "active");
  });

  //! Scroll Button

  scrollBtn.addEventListener("mouseover", (event) => {
    event.stopPropagation();
    cursorTransformShadowBlend();
    cursoricon2.classList.remove("active");
  });

  scrollBtn.addEventListener("mouseout", (event) => {
    event.stopPropagation();
    // cursorTransformShadowBlend("scale(9)", "none");
    // addClass(cursoricon2, "active");
  });

  //! Project Buttons

  buttons_blue.forEach((button_blue) => {
    button_blue.addEventListener("mouseover", () => {
      cursorTransformShadowBlend("scale(3)", "none", "difference");
      removeClass(cursoricon2, "active");
      addClass(cursoricon3, "active");
    });

    button_blue.addEventListener("mouseout", () => {
      cursorTransformShadowBlend();
      removeClass(cursoricon3, "active");
    });
  });

  // ! Pallette, Laptop & Idea Cursor

  span_designer.addEventListener("mouseover", () => {
    cursorTransformShadowBlend(undefined, "none");
    makeInvisible(cursoriconwave);
    addClass(cursor, "transparent");
    addClass(cursoriconpallette, "active");
  });

  span_dev.addEventListener("mouseover", () => {
    cursorTransformShadowBlend(undefined, "none");
    makeInvisible(cursoriconwave);
    addClass(cursor, "transparent");
    addClass(cursoriconlaptop, "active");
  });

  span_entrepreneur.addEventListener("mouseover", () => {
    cursorTransformShadowBlend(undefined, "none");
    makeInvisible(cursoriconwave);
    addClass(cursor, "transparent");
    addClass(cursoriconidea, "active");
  });

  span_designer.addEventListener("mouseout", () => {
    normalCursorEmojiSpan(cursoriconpallette);
  });

  span_dev.addEventListener("mouseout", () => {
    normalCursorEmojiSpan(cursoriconlaptop);
  });

  span_entrepreneur.addEventListener("mouseout", () => {
    normalCursorEmojiSpan(cursoriconidea);
  });

  // ! Wave icon cursor

  // const observerContent1 = new IntersectionObserver((entries) => {
  //   const isIntersecting = entries[0].isIntersecting;

  //   if (isIntersecting) {
  //     cursorTransformShadowBlend();
  //     addClass(cursor, "transparent");
  //     addClass(cursoriconwave, "active");
  //     removeClass(cursoricon2, "active");
  //   } else {
  //     cursorTransformShadowBlend();
  //     removeClass(cursor, "transparent");
  //     removeClass(cursoriconwave, "active");
  //   }
  // });

  // observerContent1.observe(content1);

  content1.addEventListener("mouseover", () => {
    cursorTransformShadowBlend();
    addClass(cursor, "transparent");
    cursoriconwave.style.opacity = "1";
    addClass(cursoriconwave, "active");
    removeClass(cursoricon2, "active");
  });

  content1.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    cursoriconwave.style.opacity = "0";
    removeClass(cursor, "transparent");
    removeClass(cursoriconwave, "active");
  });

  //! Animate "Hey, I'm Aryan description text in Content 1 Section"

  const observer_subcontent1 = new IntersectionObserver(
    handleIntersectionSubcontent,
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }
  );

  observer_subcontent1.observe(subcontent1);

  // ! END

  // ! Functions

  function cursorTransformShadowBlend(
    param_transform = "none",
    param_boxShadow = "0px 0px 30px white",
    param_mixBlendMode = "normal"
  ) {
    cursor.style.transform = param_transform;
    cursor.style.boxShadow = param_boxShadow;
    cursor.style.mixBlendMode = param_mixBlendMode;
  }

  function normalCursorEmojiSpan(cursoriconX) {
    cursor.classList.remove("transparent");
    cursor.style.boxShadow = "0px 0px 30px white";
    cursoriconwave.style.opacity = "1";
    cursoriconwave.style.transform = "scale(1)";
    cursoriconX.classList.remove("active");
  }

  function addClass(element, className) {
    element.classList.add(className);
  }
  function removeClass(element, className) {
    element.classList.remove(className);
  }

  function makeInvisible(element) {
    element.style.transform = "scale(0)";
    element.style.opacity = "0";
  }

  function handleIntersectionSubcontent(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // navbar.style.opacity = "1";
        content1Titles.forEach((title, index) => {
          setTimeout(() => {
            title.classList.add("show");
          }, index * 150);
        });
        // content1Titles.forEach((title, index) => {
        //   gsap.to(title, {
        //     opacity: 1,
        //     y: 0,
        //     duration: 0.4,
        //     ease: "power1.out",
        //     stagger: 0.1 * index,
        //   });
        // });
      } else {
        content1Titles.forEach((title) => {
          title.classList.remove("show");
        });
        // content1Titles.forEach((title) => {
        //   gsap.to(title, {
        //     opacity: 0,
        //     y: 100,
        //     duration: 0.2,
        //     ease: "power1.out",
        //     stagger: 0.1,
        //   });
        // });
      }
    });
  }

  function handleIntersection2(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (navbar) {
          navbar.style.opacity = "0";
          navbar.style.visibility = "hidden";
        }
      } else {
        if (navbar) {
          navbar.style.visibility = "visible";
          navbar.style.opacity = "1";
        }
      }
    });
  }
});

//! Intersection Observer
function handleIntersection1(entries, observer) {
  requestAnimationFrame(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
      } else {
        entry.target.style.opacity = "0";
      }
    });
  });
}

function handleIntersectionGradient(entries, observer) {
  requestAnimationFrame(() => {
    entries.forEach((entry) => {
      // if (entry.isIntersecting) {
      //   cursor_glow_div_two.style.opacity = "1";
      //   cursor_glow_div_two.style.visibility = "visible";
      // } else {
      //   cursor_glow_div_two.style.opacity = "0";
      //   cursor_glow_div_two.style.visibility = "hidden";
      // }
    });
  });
}
