const cursor = document.querySelector(".cursor");
const cursor_bg = document.querySelector(".cursor_bg");

document.addEventListener("mousemove", (e) => {
  requestAnimationFrame(() => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    setTimeout(() => {
      if (!!cursor_bg) {
        cursor_bg.style.left = e.clientX + "px";
        cursor_bg.style.top = e.clientY + "px";
      }
    }, 100);
  });
});
