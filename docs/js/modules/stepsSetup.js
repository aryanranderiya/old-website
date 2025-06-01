/**
 * @module stepsSetup
 * @description Setup functions for process steps section
 */

/**
 * Create and animate process steps
 */
export function createSteps() {
  const steps = [
    {
      title: 'Communicate',
      description:
        'I start by discussing your project requirements, goals, and expectations to ensure we\'re on the same page and aligned with your vision.',
    },
    {
      title: 'Develop',
      description:
        'I build a robust, scalable solution using modern web technologies, carefully tailored to your specific needs.',
    },
    {
      title: 'Refine',
      description:
        'I fine-tune the features and optimize the design to ensure everything functions seamlessly and delivers a great user experience.',
    },
    {
      title: 'Review',
      description:
        'I work with you to review the final product, gather your feedback, and make any necessary adjustments.',
    },
    {
      title: 'Deploy',
      description:
        'I handle the deployment process, ensuring your project is launched smoothly and runs perfectly on your chosen platform.',
    },
  ];

  const container = document.getElementById('steps-container');
  if (!container) return;
  
  const stepElements = [];
  let zIndex = steps.length + 1;
  
  steps.forEach((step, index) => {
    const stepElement = createStepElement(step, index, zIndex);
    stepElements.push(stepElement);
    container.appendChild(stepElement);
    zIndex--;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    gsap.fromTo(
      stepElement,
      { x: isMobile ? `0vw` : `${-(index * 21)}vw` },
      {
        x: '0vw',
        duration: 1,
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'center top',
          scrub: 0.1,
        },
      }
    );

    ScrollTrigger.refresh();
  });

  // Setup responsive ScrollTrigger
  ScrollTrigger.matchMedia({
    '(min-width: 769px)': () => {
      createScrollTrigger(container, stepElements, true);
    },
    '(max-width: 768px)': () => {
      createScrollTrigger(container, stepElements, false);
    },
  });

  ScrollTrigger.refresh();
}

/**
 * Create individual step element
 * @private
 */
function createStepElement(step, index, zIndex) {
  const stepElement = document.createElement('div');
  stepElement.classList.add(
    'step-element',
    'bg-[#00bbff]',
    'sm:min-w-[20vw]',
    'sm:w-[20vw]',
    'w-screen',
    'py-7',
    'sm:py-0',
    'max-w-screen',
    'sm:max-w-[20vw]',
    'h-full',
    'flex',
    'justify-start',
    'flex-col-reverse',
    'sm:flex-col',
    'border-y-none',
    'transition-colors',
    'backdrop-blur-xl'
  );

  stepElement.style.borderStyle = 'solid';
  stepElement.style.borderWidth = '0px 2px';
  stepElement.style.borderColor = 'white';
  stepElement.style.zIndex = zIndex;

  stepElement.innerHTML = `
    <div class="flex-grow flex flex-col text-white sm:p-5 px-5 gap-2 overflow-hidden text-1 transition-opacity">
      <div class="text-4xl sm:pt-16 font-bold">${step.title}</div>
      <div class="text-xl">${step.description}</div>
    </div>
    <div class="sm:text-[10vw] text-6xl px-5 text-white font-bold text-2 transition-opacity">${String(
      index + 1
    ).padStart(2, '0')}</div>
  `;

  return stepElement;
}

/**
 * Create ScrollTrigger for steps
 * @private
 */
function createScrollTrigger(container, stepElements, isDesktop) {
  gsap.to(container, {
    scrollTrigger: {
      trigger: container,
      start: isDesktop ? 'top top' : 'top center',
      end: isDesktop ? 'bottom+=120% top' : 'bottom center',
      pin: isDesktop,
      scrub: 0.5,
      onUpdate: (self) => handleOnUpdate(self, stepElements, isDesktop),
    },
  });
}

/**
 * Handle ScrollTrigger update
 * @private
 */
function handleOnUpdate(self, stepElements, isDesktop) {
  const progress = self.progress * 100;
  if (progress === 100) return;

  stepElements.forEach((element, index) => {
    const text = element.querySelector('.text-1');
    const text2 = element.querySelector('.text-2');

    element.classList.remove('bg-[#00bbff]');
    element.classList.remove('bg-black/40');
    element.style.borderColor = '#ffffff10';

    text.style.opacity = '10%';
    text2.style.opacity = '10%';

    if (progress >= index * 20 && progress < (index + 1) * 20) {
      element.classList.add('bg-[#00bbff]');
      element.style.borderColor = 'white';
      text.style.opacity = '100%';
      text2.style.opacity = '100%';
      return;
    }
    element.classList.add('bg-black/40');
    element.style.borderColor = '#ffffff30';
    text.style.opacity = '10%';
    text2.style.opacity = '10%';
  });
}