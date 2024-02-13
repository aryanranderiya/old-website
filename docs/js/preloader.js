window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

window.onload = function () {
  const blackCover = document.querySelector(".black_cover");
  const preloader = document.querySelector(".preloader");

  setTimeout(function () {
    blackCover.classList.add("hide");
    preloader.classList.add("hide");
    document.body.style.overflow = "auto";
  }, 500);
};