document.addEventListener("DOMContentLoaded", function () {
  const footerContainer = document.getElementById("footerContainer");
  const navbar = document.querySelector(".navbar");

  if (footerContainer) {
    fetch("footer.html")
      .then((response) => response.text())
      .then((data) => {
        footerContainer.innerHTML = data;
        footerContainer.style.cssText = "";
        const letstalkcontainer = document.querySelector(".letstalkcontainer");

        const letstalk = document.querySelector("#letstalk");
        const cursoricon4 = document.getElementById("cursoricon4");
        const cursoricon5 = document.getElementById("cursoricon5");
        const pageLinks = document.querySelectorAll(".page_link");
        const allSocial = document.querySelectorAll(".social");
        const googleIcon = document.querySelector(".google_icon");
        const bottomName = document.querySelector(".footer_bottom_name");
        const div_email = document.querySelector(".div_email");
        const discord_click = document.querySelector(".discord_click");

        allSocial.forEach((social) => {
          social.addEventListener("mouseover", () => {
            googleIcon.style.transform = "translateY(-10%)";
            cursorTransformShadowBlend(null, "none");
            addClass(cursor, "transparent");
            addClass(cursoricon5, "active");
          });

          social.addEventListener("mouseout", () => {
            googleIcon.style.transform = "";
            cursorTransformShadowBlend();
            removeClass(cursor, "transparent");
            removeClass(cursoricon5, "active");
          });
        });

        pageLinks.forEach((page) => {
          page.addEventListener("mouseover", () => {
            googleIcon.style.transform = "translateY(-10%)";
            // cursorTransformShadowBlend(null, "none");
            addClass(cursor, "transparent");
            addClass(cursoricon5, "active");
          });

          page.addEventListener("mouseout", () => {
            googleIcon.style.transform = "";
            // cursorTransformShadowBlend();
            removeClass(cursor, "transparent");
            removeClass(cursoricon5, "active");
          });
        });

        letstalkcontainer.addEventListener("mouseover", () => {
          cursorTransformShadowBlend("scale(8)", "none");
          cursor.style.outlineStyle = "solid";
          cursor.style.outlineColor = "white";
          cursor.style.outlineWidth = "0.1px";
          addClass(cursor, "partially_transparent");
          addClass(cursoricon4, "active");
        });

        letstalkcontainer.addEventListener("mouseout", () => {
          cursor.style.outline = "none";
          cursorTransformShadowBlend("none");
          removeClass(cursor, "partially_transparent");
          removeClass(cursoricon4, "active");
        });

        discord_click.addEventListener("click", () => {
          navigator.clipboard.writeText("aryanranderiya");
          alert(
            'Copied username "aryanranderiya". \nFeel free to send me a request on Discord!'
          );
        });

        div_email.addEventListener("mouseover", () => {
          cursorTransformShadowBlend();
          addClass(cursor, "transparent");
          addClass(cursoricon5, "active");
        });

        div_email.addEventListener("mouseout", () => {
          cursorTransformShadowBlend();
          removeClass(cursor, "transparent");
          removeClass(cursoricon5, "active");
        });

        bottomName.addEventListener("mouseover", () => {
          cursorTransformShadowBlend("scale(10)", "none", "difference");
        });

        bottomName.addEventListener("mouseout", () => {
          cursorTransformShadowBlend();
        });

        //  ! Marquee

        const marquee = document.querySelector(".marquee");

        marquee.addEventListener("mouseover", () =>
          cursorTransformShadowBlend("scale(7)", "none", "difference")
        );

        marquee.addEventListener("mouseout", () =>
          cursorTransformShadowBlend()
        );

        //! Hover Animation on Aryan Randeriya Footer Text

        const defaultScale = 1;
        const maxScale = 1.3;
        const neighborScale = 1.2;

        const wordContainers = document.querySelectorAll(
          ".footer_bottom_name .word"
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

        //! Fade out navbar when footer is visible
        // let footerIntersected = false;

        function handleIntersection(entries, observer) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateFooterContent();
              addClass(navbar, "hide");
            } else {
              animateOutFooterContent();
              removeClass(navbar, "hide");
            }
          });

          if (
            entries[0].target.id === "footerContainer" &&
            entries[0].boundingClientRect.top > 0
          ) {
            footerIntersected = true;
          }
        }

        function animateFooterContent() {
          pageLinks.forEach((link, index) =>
            setTimeout(() => addClass(link, "show"), 100 * index)
          );

          allSocial.forEach((social, index) =>
            setTimeout(() => addClass(social, "show"), 100 * index)
          );
          wordContainers.forEach((container) => addClass(container, "show"));
          addClass(letstalk, "show");
          addClass(div_email, "show");
          // document.querySelector(".footer_section").style.opacity = "1";
        }

        function animateOutFooterContent() {
          pageLinks.forEach((link) => removeClass(link, "show"));
          allSocial.forEach((social) => removeClass(social, "show"));
          wordContainers.forEach((container) => removeClass(container, "show"));
          removeClass(letstalk, "show");
          removeClass(div_email, "show");
          // document.querySelector(".footer_section").style.opacity = "0";
        }

        function handleIntersectionTwo(entries, observer) {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) animateFooterContent();
            else animateOutFooterContent();
          });
        }

        const nonfooter = document.querySelector(".nonfooter");

        const observer = new IntersectionObserver(handleIntersectionTwo, {
          root: null,
          rootMargin: "0px",
          threshold: 0.3,
        });

        observer.observe(nonfooter);

        // ! change marquee direction on scroll
        gsap.to(".marquee__part", {
          xPercent: -100,
          repeat: -1,
          duration: 3,
          ease: "linear",
          rotation: 0.01,
        });

        //! END OF "THEN"
      });

    // ! END
  } else {
    console.error("Element with ID 'footerContainer' not found.");
  }
});

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
