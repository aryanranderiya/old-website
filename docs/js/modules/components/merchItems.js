/**
 * @module components/merchItems
 * @description Generate and manage merchandise items display
 */

import { addClass } from '../cursorUtils.js';

/**
 * Generate merchandise items in the DOM
 * @param {NodeList} heading_titles - Collection of heading title elements
 * @param {IntersectionObserver} titleobserver2 - Observer for title animations
 */
export function generateMerchItems(heading_titles, titleobserver2) {
  const merchItemsData = [
    {
      category: "Apparel",
      brand: "Aryan Randeriya",
      items: [
        { imgSrc: "media/apparel/TshirtPorsche.webp", title: "Porsche" },
        { imgSrc: "media/apparel/TshirtTime.webp", title: "Time" },
        { imgSrc: "media/apparel/TshirtHope.webp", title: "Hope" },
        { imgSrc: "media/apparel/TshirtBlueRose.webp", title: "Blue Rose" },
        { imgSrc: "media/apparel/TshirtButterfly.webp", title: "Butterfly" },
        {
          imgSrc: "media/apparel/TshirtInterstellar.webp",
          title: "Interstellar",
        },
        {
          title: "Children Of The Cosmos",
          imgSrc: "media/apparel/TshirtCosmos.webp",
        },
        {
          imgSrc: "media/apparel/TshirtEthereal.webp",
          title: "Ethereal Angels",
        },
        { imgSrc: "media/apparel/TshirtYe.webp", title: "Ye" },
        { imgSrc: "media/apparel/TshirtFuture.webp", title: "Future" },
        { imgSrc: "media/apparel/TshirtJapan.webp", title: "Japan" },
        { imgSrc: "media/apparel/TshirtFuture2.webp", title: "Future 2" },
        {
          imgSrc: "media/apparel/TshirtInterstellarOld.webp",
          title: "Interstellar 2",
        },
        { imgSrc: "media/apparel/TshirtMiH.webp", title: "Make It Happen" },
        { imgSrc: "media/apparel/TshirtDragon.webp", title: "Dragon" },
      ],
    },
  ];

  const merchItemsContainer = document.getElementById("merchItemsContainer");
  if (!merchItemsContainer) return;

  merchItemsContainer.innerHTML = "";

  let index = 0;
  for (const item of merchItemsData[0].items) {
    index++;

    if (index < 10) {
      index = `0${index}`;
    }

    const merchItem = document.createElement("div");
    addClass(merchItem, "merch_item");

    const itemImg = document.createElement("div");
    addClass(itemImg, "item-img");

    itemImg.innerHTML = `<img src="${item.imgSrc}" alt="${item.title}" loading="eager" class="apparel_image" />`;

    merchItem.appendChild(itemImg);
    merchItemsContainer.appendChild(merchItem);
  }
  
  heading_titles.forEach((title) => titleobserver2.observe(title));
}