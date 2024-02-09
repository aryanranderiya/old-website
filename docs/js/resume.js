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
      console.log("test1");
      downloadresume_text.classList.add("hovered");
      svgIcon.classList.add("hovered");
    }
  });

  button.addEventListener("mouseout", () => {
    if (!footerIntersectedFlag) {
      console.log("test2");
      downloadresume_text.classList.remove("hovered");
      svgIcon.classList.remove("hovered");
    }
  });

  //!   Set width of progress bar
  document.addEventListener("scroll", updateProgressBarandBtn);

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        progressBar.style.opacity = "0";
        button.classList.add("hovered");
        svgIcon.classList.add("hovered");
        downloadresume_text.classList.add("hovered");
        footerIntersectedFlag = true;
      } else {
        footerIntersectedFlag = false;
        progressBar.style.opacity = "1";
        button.classList.remove("hovered");
        svgIcon.classList.remove("hovered");
        downloadresume_text.classList.remove("hovered");
      }
    });
  }

  //! First Intersection Observer
  function handleIntersection2(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        btn_download.style.opacity = "0";
      } else {
        btn_download.style.opacity = "1";
      }
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

  // if (parseInt(scrollPercent) >= 5) {
  //   btn_download.style.opacity = "1";
  // } else {
  //   btn_download.style.opacity = "0";
  // }

  document
    .querySelector("#progress-bar")
    .style.setProperty("--progress", scrollPercent);
}
