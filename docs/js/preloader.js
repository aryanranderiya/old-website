window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

window.onload = function () {
  const blackCover = document.querySelector(".black_cover");
  const preloader = document.querySelector(".preloader");
  console.log("removed");

  setTimeout(function () {
    // blackCover.classList.remove("visible");
    blackCover.classList.add("hide");
    preloader.classList.add("hide");
    // setTimeout(() => {
    //   blackCover.style.zIndex = "-1";
    // }, 300);
    console.log("removed");
    document.body.style.overflow = "auto";
  }, 500);
};
