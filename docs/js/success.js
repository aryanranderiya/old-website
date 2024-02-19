const cursor_glow = document.querySelector(".cursor_glow_div");
const button_blue = document.querySelector(".button_blue");
const cursoricon5 = document.querySelector("#cursoricon5");
const websitename = document.querySelector(".websitename");

document.addEventListener("mousemove", (e) => {
  cursor_glow.style.left = e.clientX + "px";
  cursor_glow.style.top = e.clientY + "px";
});

button_blue.addEventListener("mouseover", () => {
  cursoricon5.style.opacity = "1";
  cursoricon5.style.transform = "scale(1.3)";

  addClass(cursoricon5, "transparent");
  addClass(cursor, "transparent");
});

button_blue.addEventListener("mouseout", () => {
  cursoricon5.style.opacity = "0";
  removeClass(cursoricon5, "active");
  removeClass(cursor, "transparent");
});

websitename.addEventListener("mouseover", () => {
  cursoricon5.style.opacity = "1";
  cursoricon5.style.transform = "scale(0.8)";
  addClass(cursoricon5, "transparent");
  addClass(cursor, "transparent");
});

websitename.addEventListener("mouseout", () => {
  cursoricon5.style.opacity = "0";
  removeClass(cursoricon5, "active");
  removeClass(cursor, "transparent");
});

// Functions
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
