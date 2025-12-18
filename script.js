// Dark / Light mode toggle
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;

if (localStorage.getItem('theme') === 'dark') root.classList.add('dark');

toggle.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});