const parallaxElements = document.querySelectorAll('[data-parallax]');

const applyParallax = () => {
  const scrollTop = window.scrollY;
  parallaxElements.forEach((element) => {
    const speed = Number(element.dataset.parallax || 0.2);
    element.style.backgroundPositionY = `${-(scrollTop * speed)}px`;
  });
};

window.addEventListener('scroll', applyParallax, { passive: true });
applyParallax();

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
revealElements.forEach((element) => revealObserver.observe(element));

document.getElementById('year').textContent = new Date().getFullYear();

const modeSwitch = document.getElementById('modeSwitch');
const modeLabel = modeSwitch.querySelector('.mode-switch__label');
const switchableFields = document.querySelectorAll('[data-dev][data-photo]');

const applyProfileMode = (mode) => {
  const isPhoto = mode === 'photo';
  document.body.classList.toggle('theme-photo', isPhoto);
  document.body.classList.toggle('theme-dev', !isPhoto);

  switchableFields.forEach((field) => {
    field.textContent = isPhoto ? field.dataset.photo : field.dataset.dev;
  });

  modeLabel.textContent = isPhoto ? 'Mode Photo' : 'Mode Dev';
  modeSwitch.setAttribute('aria-pressed', String(isPhoto));
};

modeSwitch.addEventListener('click', () => {
  const nextMode = document.body.classList.contains('theme-photo') ? 'dev' : 'photo';
  applyProfileMode(nextMode);
});

applyProfileMode('dev');
