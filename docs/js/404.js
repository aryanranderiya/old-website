document.addEventListener("DOMContentLoaded", function () {
  const cursoriconwarning = document.getElementById("cursoriconwarning");
  const cursoricon5 = document.getElementById("cursoricon5");
  const content = document.querySelector(".content");
  const hyperlink = document.querySelector(".hyperlink");
  const button = document.getElementById("btn1");

  content.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("none", "none");
    addClass(cursoriconwarning, "active");
    addClass(cursor, "transparent");
  });

  content.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    removeClass(cursoriconwarning, "active");
    removeClass(cursor, "transparent");
  });

  button.addEventListener("mouseover", () => {
    cursoriconwarning.style.opacity = "0";
    cursoricon5.style.opacity = "1";
    addClass(cursoricon5, "active");
  });

  button.addEventListener("mouseout", () => {
    cursoriconwarning.style.opacity = "1";
    cursoricon5.style.transform = "scale(1.3)";
    cursoricon5.style.opacity = "0";
    removeClass(cursoricon5, "active");
  });

  hyperlink.addEventListener("mouseover", () => {
    cursoriconwarning.style.opacity = "0";
    cursoricon5.style.opacity = "1";
    addClass(cursoricon5, "active");
  });

  hyperlink.addEventListener("mouseout", () => {
    cursoriconwarning.style.opacity = "1";
    cursoricon5.style.transform = "scale(1.3)";
    cursoricon5.style.opacity = "0";
    removeClass(cursoricon5, "active");
  });
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
