const btn_download = document.querySelector(".btn_download");

document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector("#footerContainer");
  const progressBar = document.querySelector("#progress-bar");
  const button = document.querySelector(".download_button");
  const downloadresume_text = document.querySelector(".downloadresume_text");
  const svgIcon = document.querySelector(".svgIcon");

  var footerIntersectedFlag = false;

  button.addEventListener("mouseover", () => {
    if (!footerIntersectedFlag) {
      addClass(downloadresume_text, "hovered");
      addClass(svgIcon, "hovered");
    }
  });

  button.addEventListener("mouseout", () => {
    if (!footerIntersectedFlag) {
      removeClass(downloadresume_text, "hovered");
      removeClass(svgIcon, "hovered");
    }
  });

  //!   Set width of progress bar
  document.addEventListener("scroll", updateProgressBarandBtn);

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        progressBar.style.opacity = "0";
        addClass(button, "hovered");
        addClass(svgIcon, "hovered");
        addClass(downloadresume_text, "hovered");
        footerIntersectedFlag = true;
      } else {
        footerIntersectedFlag = false;
        progressBar.style.opacity = "1";
        removeClass(button, "hovered");
        removeClass(svgIcon, "hovered");
        removeClass(downloadresume_text, "hovered");
      }
    });
  }

  //! First Intersection Observer
  function handleIntersection2(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) btn_download.style.opacity = "0";
      else btn_download.style.opacity = "1";
    });
  }

  const observer1 = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  const observer2 = new IntersectionObserver(handleIntersection2, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  observer2.observe(footer);
  observer1.observe(footer);
});

//!   Set width of progress bar
function updateProgressBarandBtn() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100 + "%";

  document
    .querySelector("#progress-bar")
    .style.setProperty("--progress", scrollPercent);
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
