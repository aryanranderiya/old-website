const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  requestAnimationFrame(() => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
});
