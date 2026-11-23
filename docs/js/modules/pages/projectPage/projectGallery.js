/**
 * @module pages/projectPage/projectGallery
 * @description Populate the project image gallery and wire its slider controls
 */

/**
 * Render the gallery for a project.
 * @param {Array<string>} images - Image URLs from the project data
 */
export function setupProjectGallery(images = []) {
  const card = document.querySelector(".bento_card.image_gallery");
  const container = document.querySelector(".project_images");
  if (!card || !container) return;

  if (!images.length) {
    card.remove();
    return;
  }

  const dots = card.querySelector(".dots");
  const prev = card.querySelector(".slider-button .prev");
  const next = card.querySelector(".slider-button .next");
  let index = 0;

  images.forEach((src, i) => {
    const img = document.createElement("img");
    img.className = "project_image";
    img.src = src;
    img.loading = "lazy";
    img.alt = `Project screenshot ${i + 1}`;
    container.appendChild(img);

    if (dots) {
      const dot = document.createElement("button");
      dot.className = `dot${i === 0 ? " active" : ""}`;
      dot.type = "button";
      dot.setAttribute("aria-label", `Show screenshot ${i + 1}`);
      dot.addEventListener("click", () => show(i));
      dots.appendChild(dot);
    }
  });

  if (images.length < 2) {
    card.querySelector(".slider-button")?.remove();
  }

  function show(nextIndex) {
    index = (nextIndex + images.length) % images.length;
    container.scrollTo({
      left: container.clientWidth * index,
      behavior: "smooth",
    });
    dots?.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  prev?.addEventListener("click", () => show(index - 1));
  next?.addEventListener("click", () => show(index + 1));

  container.addEventListener("scroll", () => {
    if (!container.clientWidth) return;
    const current = Math.round(container.scrollLeft / container.clientWidth);
    if (current !== index) {
      index = current;
      dots?.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }
  });
}
