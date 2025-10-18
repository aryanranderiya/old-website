/**
 * @module components/footerHoverEffects
 * @description Footer hover effects and interactions
 */

import { addClass, removeClass, cursorTransformShadowBlend } from '../cursorUtils.js';

/**
 * Add hover effects to social links
 * @param {NodeList} allSocial - All social link elements
 * @param {HTMLElement} googleIcon - Google icon element
 * @param {HTMLElement} cursor - Cursor element
 * @param {HTMLElement} cursoricon5 - Cursor icon 5 element
 */
export function addSocialHoverEffects(allSocial, googleIcon, cursor, cursoricon5) {
  allSocial.forEach((social) => {
    social.addEventListener("mouseover", () => {
      if (googleIcon) googleIcon.style.transform = "translateY(-10%)";
      addClass(cursoricon5, "active");
      cursorTransformShadowBlend("scale(1.5)", "none");
      addClass(cursor, "transparent");
    });

    social.addEventListener("mouseout", () => {
      if (googleIcon) googleIcon.style.transform = "";
      removeClass(cursoricon5, "active");
      cursorTransformShadowBlend();
      removeClass(cursor, "transparent");
    });
  });
}

/**
 * Add hover effects to page links
 * @param {NodeList} pageLinks - Page link elements
 * @param {HTMLElement} googleIcon - Google icon element
 * @param {HTMLElement} cursor - Cursor element
 * @param {HTMLElement} cursoricon5 - Cursor icon 5 element
 */
export function addPageLinkHoverEffects(pageLinks, googleIcon, cursor, cursoricon5) {
  pageLinks.forEach((page) => {
    page.addEventListener("mouseover", () => {
      if (googleIcon) googleIcon.style.transform = "translateY(-10%)";
      cursorTransformShadowBlend("scale(1.3)", "none");
      addClass(cursor, "transparent");
      addClass(cursoricon5, "active");
    });

    page.addEventListener("mouseout", () => {
      if (googleIcon) googleIcon.style.transform = "";
      cursorTransformShadowBlend();
      removeClass(cursor, "transparent");
      removeClass(cursoricon5, "active");
    });
  });
}

/**
 * Add hover effects to let's talk container
 * @param {HTMLElement} letstalkcontainer - Let's talk container element
 * @param {HTMLElement} cursor - Cursor element
 * @param {HTMLElement} cursoricon4 - Cursor icon 4 element
 */
export function addLetsTalkHoverEffects(letstalkcontainer, cursor, cursoricon4) {
  if (!letstalkcontainer) return;

  letstalkcontainer.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(8)", "none");
    cursor.style.outlineStyle = "solid";
    cursor.style.outlineColor = "white";
    cursor.style.outlineWidth = "0.1px";
    addClass(cursor, "partially_transparent");
    addClass(cursoricon4, "active");
  });

  letstalkcontainer.addEventListener("mouseout", () => {
    cursor.style.outline = "none";
    cursorTransformShadowBlend();
    removeClass(cursor, "partially_transparent");
    removeClass(cursoricon4, "active");
  });
}

/**
 * Add hover effects to email div
 * @param {HTMLElement} div_email - Email div element
 * @param {HTMLElement} cursor - Cursor element
 * @param {HTMLElement} cursoricon5 - Cursor icon 5 element
 */
export function addEmailHoverEffects(div_email, cursor, cursoricon5) {
  if (!div_email) return;

  div_email.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(1.5)");
    addClass(cursor, "transparent");
    addClass(cursoricon5, "active");
  });

  div_email.addEventListener("mouseout", () => {
    cursorTransformShadowBlend();
    removeClass(cursor, "transparent");
    removeClass(cursoricon5, "active");
  });
}

/**
 * Add hover effects to bottom name
 * @param {HTMLElement} bottomName - Bottom name element
 * @param {HTMLElement} cursor - Cursor element
 */
export function addBottomNameHoverEffects(bottomName, cursor) {
  if (!bottomName) return;

  bottomName.addEventListener("mouseover", () => {
    cursorTransformShadowBlend("scale(10)", "none");
    addClass(cursor, "partially_transparent");
  });

  bottomName.addEventListener("mouseout", () => {
    removeClass(cursor, "partially_transparent");
    cursorTransformShadowBlend();
  });
}

/**
 * Initialize Discord click functionality
 * @param {HTMLElement} discord_click - Discord click element
 */
export function initDiscordClick(discord_click) {
  if (!discord_click) return;

  discord_click.addEventListener("click", () => {
    navigator.clipboard.writeText("aryanranderiya");
    alert(
      'Copied username "aryanranderiya". \nFeel free to send me a request on Discord!'
    );
  });
}