const btn_download = document.querySelector(".btn_download");

document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector("#footerContainer");
  const progressBar = document.querySelector("#progress-bar");
  const button = document.querySelector(".button");
  const downloadresume_text = document.querySelector(".downloadresume_text");
  const svgIcon = document.querySelector(".svgIcon");

  var footerIntersectedFlag = false;

  button.addEventListener("mouseover", () => {
    if (!footerIntersectedFlag) {
      downloadresume_text.classList.add("hovered");
      svgIcon.classList.add("hovered");
    }
  });

  button.addEventListener("mouseout", () => {
    if (!footerIntersectedFlag) {
      downloadresume_text.classList.remove("hovered");
      svgIcon.classList.remove("hovered");
    }
  });

  //!   Set width of progress bar
  document.addEventListener("scroll", updateProgressBarandBtn);

  //! First Intersection Observer
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        progressBar.style.opacity = "0";
        btn_download.style.position = "relative";
        button.classList.add("hovered");
        svgIcon.classList.add("hovered");
        downloadresume_text.classList.add("hovered");
        footerIntersectedFlag = true;
      } else {
        footerIntersectedFlag = false;

        progressBar.style.opacity = "1";
        btn_download.style.position = "sticky";
        btn_download.style.bottom = "20px";
        button.classList.remove("hovered");
        svgIcon.classList.remove("hovered");
        downloadresume_text.classList.remove("hovered");
      }
    });
  }
  const observer1 = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });
  observer1.observe(footer);
});

//!   Set width of progress bar
function updateProgressBarandBtn() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100 + "%";

  if (parseInt(scrollPercent) >= 5) {
    btn_download.style.opacity = "1";
  } else {
    btn_download.style.opacity = "0";
  }

  document
    .querySelector("#progress-bar")
    .style.setProperty("--progress", scrollPercent);
}
