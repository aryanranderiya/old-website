/**
 * @module uiHelpers
 * @description UI helper functions and utilities
 */

/**
 * Remove black cover after page load
 */
export function removeBlackCover() {
  const welcoming = document.querySelector('.welcoming');
  const scrollBtn = document.querySelector('.scroll_btn');
  const cursor = document.querySelector('.cursor');
  
  document.body.style.overflow = 'auto';
  
  if (welcoming) {
    welcoming.classList.add('hide');
    setTimeout(() => welcoming.remove(), 1600);
  }
  
  const myPortfolio = document.querySelector('.my_portfolio');
  const aryanRanderiya = document.querySelector('.aryan_randeriya');
  
  if (myPortfolio) myPortfolio.classList.add('show');
  if (aryanRanderiya) aryanRanderiya.classList.add('show');
  
  if (cursor) cursor.style.mixBlendMode = 'normal';
  
  if (scrollBtn) {
    scrollBtn.style.opacity = '1';
    scrollBtn.style.zIndex = '1';
  }
}

/**
 * Update progress bar based on scroll position
 */
export function updateProgressBar() {
  const progressBar = document.querySelector('.scrollbar_progress');
  if (!progressBar) return;
  
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
  
  progressBar.style.setProperty('--height', `${percentage}%`);
}

/**
 * Calculate age from birthday
 * @param {string} birthday - Birthday in format MM/DD/YYYY
 * @returns {number} Age in years
 */
export function calculateAge(birthday) {
  const dob = new Date(birthday);
  const month_diff = Date.now() - dob.getTime();
  const age_dt = new Date(month_diff);
  const year = age_dt.getUTCFullYear();
  return Math.abs(year - 1970);
}