const cursoriconwarning = document.getElementById("cursoriconwarning");
const cursoricon5 = document.getElementById("cursoricon5");
const content = document.querySelector(".content");

content.addEventListener("mouseover", () => {
  cursor.style.transform = "none";
  cursor.style.boxShadow = "none";
  cursor.classList.add("transparent");
  cursoriconwarning.classList.add("active");
});

content.addEventListener("mouseout", () => {
  cursor.classList.remove("transparent");
  cursor.style.boxShadow = "0px 0px 30px white";
  cursoriconwarning.classList.remove("active");
});

const button = document.getElementById("btn1");

button.addEventListener("mouseover", () => {
  cursoriconwarning.style.opacity = "0";
  cursoricon5.style.opacity = "1";

  cursoricon5.classList.add("active");
});

button.addEventListener("mouseout", () => {
  cursoriconwarning.style.opacity = "1";
  cursoricon5.style.transform = "scale(1.3)";
  cursoricon5.classList.remove("active");
  cursoricon5.style.opacity = "0";
});
