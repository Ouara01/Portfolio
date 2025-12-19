// =========================
// THEME TOGGLE
// =========================
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  root.classList.add('dark');
}

// Toggle theme
toggle.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem(
    'theme',
    root.classList.contains('dark') ? 'dark' : 'light'
  );
});

// =========================
// SMOOTH SCROLL
// =========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document
      .querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});