function setNavButtonStates(carousel, currentItem) {
  const [previousButton, nextButton] = carousel.querySelectorAll('button');
  const numberOfItems = carousel.children.length - 1;

  if (currentItem === 0) {
    previousButton?.setAttribute('disabled', true);
  } else {
    previousButton?.removeAttribute('disabled');
  }
  if (currentItem === numberOfItems - 1) {
    nextButton?.setAttribute('disabled', true);
  } else {
    nextButton?.removeAttribute('disabled');
  }
}

function handleCarouselNav({ currentTarget: carousel, target: navButton }) {
  if (!navButton.parentNode.classList.contains('carousel-nav')) {
    return;
  }

  const previousItem = +carousel.style.getPropertyValue('--current-item');
  const isNextButton = navButton.classList.contains('next');
  const nextItem = isNextButton ? previousItem + 1 : previousItem - 1;
  carousel.style.setProperty('--current-item', nextItem);
  setNavButtonStates(carousel, nextItem);
}

const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  setNavButtonStates(carousel, 0);
  carousel.addEventListener('click', handleCarouselNav);
});

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function navigateCurrentCarousel(e) {
  const currentCarousel = Array.from(
    document.querySelectorAll('.carousel')
  ).find(carousel => isInViewport(carousel));

  if (!currentCarousel) {
    return;
  }

  const [previousButton, nextButton] =
    currentCarousel.querySelectorAll('button');

  if (e.key === 'ArrowLeft') {
    previousButton.click();
  } else if (e.key === 'ArrowRight') {
    nextButton.click();
  }
}

document.addEventListener('keyup', navigateCurrentCarousel);

const hoverable = document.querySelector('.hoverable');

let currentTooltip = null;

function showTooltip(e) {
  removeTooltip();
  const { target } = e;
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  const { bottom, left, right } = target.getBoundingClientRect();
  tooltip.textContent = 'This is a custom tooltip';
  tooltip.style.setProperty('left', `${left + (right - left) / 2}px`);
  tooltip.style.setProperty('top', bottom + 10 + 'px');
  document.body.append(tooltip);
  currentTooltip = tooltip;
}

function removeTooltip() {
  if (currentTooltip) {
    document.body.removeChild(currentTooltip);
    currentTooltip = null;
  }
}

hoverable.addEventListener('mouseenter', showTooltip);
hoverable.addEventListener('mouseleave', removeTooltip);

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
    if (entry.isIntersecting) {
      console.log(entry.target.id);
      // window.location.hash = entry.target.id ?? '';
    }
  });
});

const h2s = document.querySelectorAll('h2');

h2s.forEach(h2 => observer.observe(h2));
