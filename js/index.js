// ELEMENTOS
const slides = document.querySelectorAll('.slider__item');

// BOTONES
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

// Slider
let curSlide = 0;
let timer = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(function (el, i) {
    el.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);
// 0%, 100%, 200%, 300%

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

setInterval(() => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
}, 10000);

// EVENTS
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
