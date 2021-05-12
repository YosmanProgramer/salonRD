// ELEMENTOS
const slides = document.querySelectorAll('.slider__item');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

// BOTONES
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const btnUp = document.querySelector('.button--up');

// Slider
let curSlide = 0;
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

let timerSlide = setInterval(nextSlide, 10000);
const resetTimerSlide = function () {
  clearInterval(timerSlide);
  timerSlide = setInterval(nextSlide, 10000);
};

// Sticky navigation and show btn up
const headerObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      nav.classList.add('nav--sticky');
      btnUp.classList.add('button--active');
    } else {
      nav.classList.remove('nav--sticky');
      btnUp.classList.remove('button--active');
    }
  },
  {
    root: null,
    threshold: 0,
  }
);
headerObserver.observe(header);

// EVENTS
btnRight.addEventListener('click', function () {
  nextSlide();
  resetTimerSlide();
});
btnLeft.addEventListener('click', function () {
  prevSlide();
  resetTimerSlide();
});
btnUp.addEventListener('click', function () {
  document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
});
