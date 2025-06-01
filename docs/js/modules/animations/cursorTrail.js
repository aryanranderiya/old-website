/**
 * @module cursorTrail
 * @description Animated cursor trail effect with gradient
 */

/**
 * Trail parameters configuration
 * @private
 */
const params = {
  pointsNumber: 25,
  widthFactor: 10,
  mouseThreshold: 0.5,
  spring: 0.25,
  friction: 0.5,
};

/**
 * Initialize cursor trail animation
 * @param {string} canvasSelector - CSS selector for canvas element
 */
export function initializeCursorTrail(canvasSelector = '.animated_cursormovement_canvas') {
  const canvas = document.querySelector(canvasSelector);
  if (!canvas) {
    console.warn('Canvas element not found for cursor trail');
    return;
  }
  
  const ctx = canvas.getContext('2d');
  let mouseMoved = false;
  
  // Initialize pointer position
  const pointer = {
    x: 0.5 * window.innerWidth,
    y: 0.5 * window.innerHeight,
  };
  
  // Initialize trail points
  const trail = new Array(params.pointsNumber);
  for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = { x: pointer.x, y: pointer.y, dx: 0, dy: 0 };
  }
  
  // Setup event listeners
  setupEventListeners(pointer, mouseMoved);
  
  // Setup canvas and start animation
  setupCanvas(canvas);
  update(canvas, ctx, pointer, trail, mouseMoved, 0);
  
  // Handle window resize
  window.addEventListener('resize', () => setupCanvas(canvas));
}

/**
 * Setup event listeners for mouse and touch
 * @private
 * @param {Object} pointer - Pointer position object
 * @param {boolean} mouseMoved - Mouse movement flag
 */
function setupEventListeners(pointer, mouseMoved) {
  // Click event
  window.addEventListener('click', (e) => {
    updateMousePosition(pointer, e.pageX, e.pageY);
  });
  
  // Mouse move
  window.addEventListener('mousemove', (e) => {
    mouseMoved = true;
    updateMousePosition(pointer, e.pageX, e.pageY);
  });
  
  // Touch move
  window.addEventListener('touchmove', (e) => {
    mouseMoved = true;
    if (e.targetTouches.length > 0) {
      updateMousePosition(
        pointer,
        e.targetTouches[0].pageX,
        e.targetTouches[0].pageY
      );
    }
  });
}

/**
 * Update mouse position
 * @private
 * @param {Object} pointer - Pointer object to update
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
function updateMousePosition(pointer, x, y) {
  pointer.x = x;
  pointer.y = y;
}

/**
 * Setup canvas dimensions
 * @private
 * @param {HTMLCanvasElement} canvas - Canvas element
 */
function setupCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

/**
 * Animation update loop
 * @private
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} pointer - Pointer position
 * @param {Array} trail - Trail points array
 * @param {boolean} mouseMoved - Mouse movement flag
 * @param {number} time - Animation time
 */
function update(canvas, ctx, pointer, trail, mouseMoved, time) {
  // Animate pointer if mouse hasn't moved
  if (!mouseMoved) {
    pointer.x = (0.5 + 0.3 * Math.cos(0.002 * time) * Math.sin(0.005 * time)) * window.innerWidth;
    pointer.y = (0.5 + 0.2 * Math.cos(0.005 * time) + 0.1 * Math.cos(0.01 * time)) * window.innerHeight;
  }
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update trail points
  trail.forEach((point, index) => {
    const leader = index === 0 ? pointer : trail[index - 1];
    const spring = index === 0 ? 0.4 * params.spring : params.spring;
    
    // Spring physics
    point.dx += (leader.x - point.x) * spring;
    point.dy += (leader.y - point.y) * spring;
    
    // Friction
    point.dx *= params.friction;
    point.dy *= params.friction;
    
    // Update position
    point.x += point.dx;
    point.y += point.dy;
  });
  
  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#00bbff');
  gradient.addColorStop(1, '#00bbff');
  
  // Draw trail
  ctx.strokeStyle = gradient;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(trail[0].x, trail[0].y);
  
  // Draw smooth curve through points
  for (let i = 1; i < trail.length - 1; i++) {
    const xMid = 0.5 * (trail[i].x + trail[i + 1].x);
    const yMid = 0.5 * (trail[i].y + trail[i + 1].y);
    
    ctx.quadraticCurveTo(trail[i].x, trail[i].y, xMid, yMid);
    ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
    ctx.stroke();
  }
  
  // Draw last segment
  ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
  ctx.stroke();
  
  // Continue animation
  window.requestAnimationFrame(() => update(canvas, ctx, pointer, trail, mouseMoved, time + 1));
}