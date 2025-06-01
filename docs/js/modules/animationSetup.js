/**
 * @module animationSetup
 * @description GSAP animations and ScrollTrigger setup functions
 */

import { cursorTransformShadowBlend, addClass, removeClass } from './cursorUtils.js';

/**
 * Setup animation for large text section
 */
export function setupAnimationLargeText() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.largetext_container',
      start: 'top-=400 bottom',
      end: 'bottom center',
      scrub: true,
    },
  });

  gsap.set('.large_text', { x: '100%', color: 'black' });
  gsap.set('.large_text:nth-child(2)', { x: '-100%', color: 'black' });
  gsap.set('.large_text:nth-child(4)', { x: '-100%', color: 'black' });

  tl.to('.large_text:nth-child(1)', {
    x: '0%',
    color: 'white',
  })
    .to('.large_text:nth-child(2)', {
      x: '0%',
      color: 'white',
    })
    .to('.large_text:nth-child(3)', {
      x: '0%',
      color: 'white',
    })
    .to('.large_text:nth-child(4)', {
      x: '0%',
      color: 'white',
    });

  // Marquee animation
  let currentScroll = 0;
  let isScrollingDown = true;

  const tween = gsap
    .to('.featured_marquee__part', {
      xPercent: -100,
      repeat: -1,
      duration: 6,
      ease: 'linear',
    })
    .totalProgress(0.5);

  gsap.set('.featured_marquee__inner', { xPercent: -50 });

  window.addEventListener('scroll', () => {
    isScrollingDown = window.pageYOffset > currentScroll;
    gsap.to(tween, { timeScale: isScrollingDown ? 1 : -1 });
    currentScroll = window.pageYOffset;
  });

  ScrollTrigger.refresh();
}

/**
 * Setup GSAP animations for chips/marquee
 */
export function setupGSAPChips() {
  gsap.to('.marquee_part', {
    x: -830,
    repeat: -1,
    duration: 10,
    ease: 'linear',
    yoyo: true,
  });

  gsap.to('.marquee_part2', {
    x: 0,
    repeat: -1,
    duration: 10,
    ease: 'linear',
    yoyo: true,
    startAt: { x: -830 },
  });

  ScrollTrigger.refresh();
}

/**
 * Animate title section on scroll
 */
export function animateTitleSection() {
  const section = document.querySelector('.titles');
  const title_heading_1 = document.querySelector('.title_heading_1');
  
  gsap.fromTo(
    title_heading_1,
    {
      y: '0vw',
      scale: 1,
      opacity: 1,
    },
    {
      scrollTrigger: {
        trigger: section,
        delay: 2,
        start: 'center+=100 center',
        end: 'bottom+=100 top',
        scrub: true,
      },
      y: '19vw',
      scale: 0.5,
      ease: 'power2.out',
      opacity: 0,
    }
  );
}

/**
 * Animate text color with scroll progress
 */
export function animateTextColor() {
  const text = document.getElementById('scrollText');
  if (!text) return;
  
  const content = text.textContent;
  const targetPhrase = 'Software Developer';

  text.innerHTML = '';
  const fragment = document.createDocumentFragment();

  let i = 0;

  function createSpan(content, classNames, textContent) {
    const span = document.createElement('span');
    span.textContent = textContent;
    span.classList.add(...classNames);
    fragment.appendChild(span);
  }

  while (i < content.length) {
    if (content.substring(i, i + targetPhrase.length) === targetPhrase) {
      createSpan(
        content,
        [
          'bg-gradient-to-r',
          'from-[#00bbff]',
          'to-[#a3e6ff]',
          'text-transparent',
          'font-bold',
          'bg-clip-text',
          'letter',
        ],
        targetPhrase
      );
      i += targetPhrase.length;
    } else if (content.substring(i, i + 'year old'.length) === 'year old') {
      const age = getAge('2005/07/27');
      createSpan(content, ['letter', 'text-white'], `${age} year old `);
      i += 'year old'.length;
    } else {
      createSpan(content, ['letter', 'text-white'], content[i]);
      i++;
    }
  }

  text.appendChild(fragment);

  gsap.fromTo(
    '.letter',
    { opacity: 0.1 },
    {
      scrollTrigger: {
        trigger: '#scrollText',
        start: 'top-=150 center',
        end: 'bottom+=150 center',
        scrub: true,
      },
      opacity: 1,
      stagger: 0.07,
      ease: 'power1.out',
    }
  );

  ScrollTrigger.refresh();
}

/**
 * Calculate age from birth date
 * @param {string} dateString - Birth date in format YYYY/MM/DD
 * @returns {number} Age in years
 */
function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}