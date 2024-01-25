document.addEventListener("DOMContentLoaded", function () {
  const footerContainer = document.getElementById("footerContainer");

  if (footerContainer) {
    fetch("footer.html")
      .then((response) => response.text())
      .then((data) => {
        footerContainer.innerHTML = data;
        footerContainer.style.cssText = "";

        const footer1 = document.querySelector(".footer1");
        const footer2 = document.querySelector(".footer2");

        const cursoricon4 = document.getElementById("cursoricon4");
        const cursoricon5 = document.getElementById("cursoricon5");

        const footer_bottom_name = document.querySelector(
          ".footer_bottom_name"
        );

        footer1.addEventListener("mouseover", () => {
          cursor.style.transform = "scale(7)";
          cursor.style.boxShadow = "none";
          cursor.style.outlineWidth = "0.1px";
          cursor.classList.add("partially_transparent");
          cursoricon4.classList.add("active");
        });

        footer1.addEventListener("mouseout", () => {
          cursor.style.transform = "none";
          cursor.style.mixBlendMode = "normal";
          cursor.style.boxShadow = "0px 0px 30px white";
          cursor.classList.remove("partially_transparent");
          cursoricon4.classList.remove("active");
        });

        footer2.addEventListener("mouseover", () => {
          cursor.style.boxShadow = "none";
          cursor.classList.add("transparent");
          cursoricon5.classList.add("active");
        });

        footer2.addEventListener("mouseout", () => {
          cursor.classList.remove("transparent");
          cursor.style.boxShadow = "0px 0px 30px white";
          cursoricon5.classList.remove("active");
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

        //  ! Marquee

        const marquee = document.querySelector(".marquee");

        marquee.addEventListener("mouseover", () => {
          cursor.style.transform = "scale(6)";
          cursor.style.mixBlendMode = "difference";
          cursor.style.boxShadow = "0px 0px 30px white";
        });

        marquee.addEventListener("mouseout", () => {
          cursor.style.transform = "none";
          cursor.style.mixBlendMode = "normal";
          cursor.style.boxShadow = "0px 0px 30px white";
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
                // Scale the hovered span to 2
                scale = maxScale;
              } else if (i === index - 1 || i === index + 1) {
                // Scale the side neighbors to 1.5
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

        //! Fade out navbar when footer is visible
        let footerIntersected = false;

        function handleIntersection(entries, observer) {
          entries.forEach((entry) => {
            console.log(footerIntersected);

            if (entry.isIntersecting) {
              if (footerIntersected) {
                document.querySelector(".navbar").style.opacity = "0";
              }
              document.querySelector(".footer_section").style.opacity = "1";
            } else {
              if (footerIntersected) {
                document.querySelector(".navbar").style.opacity = "1";
              }
              document.querySelector(".footer_section").style.opacity = "0";
            }
          });

          if (
            entries[0].target.id === "footerContainer" &&
            entries[0].boundingClientRect.top > 0
          ) {
            footerIntersected = true;
          }
        }

        const observer = new IntersectionObserver(handleIntersection, {
          root: null,
          rootMargin: "0px",
          threshold: 0.4,
        });

        observer.observe(footerContainer);

        // ! change marquee direction on scroll

        let currentScroll = window.pageYOffset;
        let isScrollingDown = true;

        // Create a GSAP timeline without initial progress
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

        // ! Section Scroll Snapping

        // gsap.registerPlugin(ScrollTrigger);

        // const sections = document.querySelectorAll("section");

        // gsap.registerPlugin(ScrollTrigger);

        // gsap.utils.toArray("section").forEach((section, index) => {
        //   ScrollTrigger.create({
        //     trigger: section,
        //     start: "top center",
        //     end: "bottom center",
        //     toggleClass: "active",
        //     onEnter: () => animateSection(section),
        //     onEnterBack: () => animateSection(section),
        //   });
        // });

        // function animateSection(section) {
        //   console.log("animated");
        //   gsap.to(section, {
        //     duration: 0.5,
        //     ease: "power4.out",
        //   });
        // }

        //! END OF "THEN"
      });

    // ! END
  } else {
    console.error("Element with ID 'footerContainer' not found.");
  }
});
