/**
 * @module servicesSetup
 * @description Setup functions for services and testimonials sections
 */

/**
 * Setup services section with animations
 * @param {Object} db - Database object containing services data
 */
export async function setupServices(db) {
  const servicesContainer = document.querySelector('.services');
  if (!servicesContainer) return;

  const services = db.Services;

  // Loop through services and create elements
  services.forEach((service, index) => {
    const serviceElement = document.createElement('div');
    serviceElement.classList.add('service');
    serviceElement.innerHTML = `
      <span class="service_number">${(index + 1)
        .toString()
        .padStart(2, '0')}</span>
      <span class="service_name">${service}</span>
    `;
    servicesContainer.appendChild(serviceElement);
  });

  // GSAP animations
  const tl0 = gsap.timeline({
    scrollTrigger: {
      trigger: '.services_section',
      start: 'top+=100 bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  tl0.to('.service_name', {
    color: 'black',
    x: '0%',
    stagger: {
      amount: 1.5,
      from: 'start',
      each: 0.5,
      onComplete: changeColor,
      onStart: setColor,
    },
  });

  gsap.set('.service_name', { x: '100vw' });

  function setColor() {
    this.targets()[0].previousElementSibling.style.color = 'black';
  }

  function changeColor() {
    gsap.to(this.targets(), { color: '#00bbff', duration: 0 });
    this.targets()[0].previousElementSibling.style.color = '#00bbff';
  }

  ScrollTrigger.refresh();
}

/**
 * Setup testimonials section with cards
 * @param {Object} db - Database object containing testimonials
 */
export async function setupTestimonials(db) {
  const testimonialContainer = document.querySelector('.testimonial-container');
  if (!testimonialContainer) return;

  const testimonials = db.Testimonials;

  // Create a DocumentFragment to batch DOM updates
  const fragment = document.createDocumentFragment();

  testimonials.forEach((testimonial, index) => {
    const card = document.createElement('div');
    card.classList.add(
      'transition-colors',
      'rounded-xl',
      'p-[2em]',
      'sm:max-w-[35vw]',
      'sm:min-w-[35vw]',
      'min-w-[100%]',
      'w-[100%]',
      'mb-5',
      'sm:m-5',
      'm-0',
      'box-border',
      'outline',
      'outline-[#ffffff20]',
      'outline-[4px]',
      'flex',
      'flex-col',
      'text-xl'
    );
    card.innerHTML = `
      <div class="sm:text-md text-sm">&#34;${testimonial.text}&#34;</div>
      <div class="mt-6 text-sm flex items-center gap-3">
        <img src="${testimonial.client_image}" class="size-[25px] object-cover rounded-full"/>
        <div class="inline-flex">
          <span class="ogg italic">${testimonial.client}</span> — 
          <span class="opacity-70 ogg italic">${testimonial.position} @ ${testimonial.company}</span>
        </div>
      </div>
    `;

    // Append the card to the fragment instead of directly to the DOM
    fragment.appendChild(card);

    // GSAP animation setup for each testimonial card
    gsap.from(card, {
      opacity: 0,
      x: 300,
      duration: 0.3,
      delay: index * 0.2, // Slight stagger effect
      scrollTrigger: {
        trigger: card,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: true,
      },
      onEnter: () => {
        card.style.backgroundColor = 'black';
      },
      onLeaveBack: () => {
        card.style.backgroundColor = 'black';
      },
      onComplete: () => {
        card.style.backgroundColor = '#00bbff';
      },
    });
  });

  // Append fragment to the DOM
  testimonialContainer.appendChild(fragment);

  // Pinning testimonial section
  gsap.to('#sticky-element', {
    scrollTrigger: {
      trigger: '#sticky-element',
      start: 'top-=100 top',
      end: 'bottom-=370 top',
      pin: true,
      scrub: true,
    },
  });

  // Refresh ScrollTrigger to ensure animations are set up correctly
  ScrollTrigger.refresh();
}

/**
 * Setup now items list
 * @param {Object} db - Database object containing now items
 */
export function setupNowItems(db) {
  const itemsContainer = document.querySelector('.now_items');
  if (!itemsContainer) return;
  
  const nowItems = db.Now;
  itemsContainer.innerHTML = nowItems
    .map((nowItem) => `<li>${nowItem}</li>`)
    .join('');
}