window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

window.onload = function () {
  const blackCover = document.querySelector(".black_cover");

  setTimeout(function () {
    blackCover.classList.add("hide");
    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 200);
  }, 500);
};
