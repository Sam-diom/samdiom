const parallaxElements = document.querySelectorAll('[data-parallax]');
const parallaxLayers = document.querySelectorAll('[data-parallax-layer]');

const applyParallax = () => {
  const scrollTop = window.scrollY;

  parallaxElements.forEach((element) => {
    const speed = Number(element.dataset.parallax || 0.2);
    const offset = scrollTop * speed;
    element.style.backgroundPosition = `center calc(50% + ${offset}px)`;
  });

  parallaxLayers.forEach((layer) => {
    const speed = Number(layer.dataset.parallaxLayer || 0.25);
    layer.style.transform = `translate3d(0, ${scrollTop * speed}px, 0)`;
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
const heroCover = document.getElementById('heroCover');

const covers = {
  dev: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1800&q=80',
  photo: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=1800&q=80',
};

const applyProfileMode = (mode) => {
  const isPhoto = mode === 'photo';
  document.body.classList.toggle('theme-photo', isPhoto);
  document.body.classList.toggle('theme-dev', !isPhoto);

  switchableFields.forEach((field) => {
    field.textContent = isPhoto ? field.dataset.photo : field.dataset.dev;
  });

  heroCover.src = isPhoto ? covers.photo : covers.dev;
  heroCover.alt = isPhoto
    ? "Dernière photo d'actualité"
    : 'Photo du dernier site développé';

  modeLabel.textContent = isPhoto ? 'Mode Photo' : 'Mode Dev';
  modeSwitch.setAttribute('aria-pressed', String(isPhoto));
};

modeSwitch.addEventListener('click', () => {
  const nextMode = document.body.classList.contains('theme-photo') ? 'dev' : 'photo';
  applyProfileMode(nextMode);
  applyParallax();
});

applyProfileMode('dev');
