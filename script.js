// =========================
// THEME TOGGLE
// =========================
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  root.setAttribute('data-theme', 'dark');
} else {
  root.setAttribute('data-theme', 'light');
}

// Toggle theme
toggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// =========================
// SMOOTH SCROLL
// =========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// =========================
// SNOW GENERATOR
// =========================
const snowChars = ['❄', '❅', '❆', '·'];
const layers = [
  document.querySelector('.layer-far'),
  document.querySelector('.layer-mid'),
  document.querySelector('.layer-near')
];

function createSnowflake(layer, opacity) {
  const flake = document.createElement('div');
  flake.classList.add('snow-flake');
  flake.textContent = snowChars[Math.floor(Math.random() * snowChars.length)];
  flake.style.left = Math.random() * 100 + 'vw';
  flake.style.animationDuration = (10 + Math.random()*15) + 's';
  flake.style.color = `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--snow-color-dark')}, ${opacity})`;
  flake.style.setProperty('--drift', (Math.random()*20 - 10) + 'px'); // random small drift
  layer.appendChild(flake);
}

// Initialize snow for each layer
function initSnow() {
  layers.forEach((layer, i) => layer.innerHTML = '');
  for (let i=0;i<50;i++) createSnowflake(layers[0], 0.18);
  for (let i=0;i<35;i++) createSnowflake(layers[1], 0.25);
  for (let i=0;i<25;i++) createSnowflake(layers[2], 0.35);
}
initSnow();


