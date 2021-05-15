// ELEMENTOS
const slides = document.querySelectorAll('.slider__item');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const nav__list = document.querySelectorAll('.nav__list');
const nav__link = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('.section');
const sliderDotContainer = document.querySelector('.slider__dot');

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

const createDots = function () {
  slides.forEach(function (_, i) {
    const html = `
    <div class="slider__dot-item" data-slide="${i}"></div>
    `;
    sliderDotContainer.insertAdjacentHTML('beforeend', html);
  });
};

const activeDots = function (slide) {
  document
    .querySelectorAll('.slider__dot-item')
    .forEach(s => s.classList.remove('slider__dot-item--active'));

  document
    .querySelector(`.slider__dot-item[data-slide="${slide}"]`)
    .classList.add('slider__dot-item--active');
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activeDots(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activeDots(curSlide);
};

const init = function () {
  goToSlide(0);
  createDots();
  activeDots(0);
};
init();

let timerSlide = setInterval(nextSlide, 10000);
const resetTimerSlide = function () {
  clearInterval(timerSlide);
  timerSlide = setInterval(nextSlide, 10000);
};

// Sticky navigation and show btn up
const heightNav = nav.getBoundingClientRect().height;
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
    rootMargin: `-${heightNav}px`,
  }
);
headerObserver.observe(header);

const sectionObserver = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.15,
  }
);

sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

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

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

sliderDotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('slider__dot-item')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDots(slide);
    resetTimerSlide();
  }
});

// Page links navigation
const paddingSection = window
  .getComputedStyle(sections[0])
  .getPropertyValue('padding-top');

console.log(paddingSection);
nav__list.forEach(function (list) {
  list.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      const coordenadas = document.querySelector(id).getBoundingClientRect();

      window.scrollTo({
        top:
          coordenadas.top -
          Number.parseInt(paddingSection) +
          window.pageYOffset,
        left: coordenadas.left + window.pageXOffset,
        behavior: 'smooth',
      });
    }
  });
});
