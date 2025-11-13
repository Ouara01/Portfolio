// Modern Portfolio Script — Smooth scrolling, animations, dark mode, scroll-to-top, etc.

// ============================================================
// 1. SMOOTH SCROLL + ACTIVE NAV LINK HIGHLIGHTING
// ============================================================
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      link.blur(); // Remove focus ring after click
    }
  });
});

// Highlight active nav link based on scroll position
const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('nav a').forEach(link => link.style.color = 'var(--text)');
      const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.style.color = 'var(--accent)';
    }
  });
}, observerOptions);

document.querySelectorAll('section[id]').forEach(section => observer.observe(section));

// ============================================================
// 2. SCROLL-TO-TOP BUTTON
// ============================================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scroll-top';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
  position: fixed; bottom: 2rem; right: 2rem; z-index: 50;
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(180deg, var(--accent), #164bd6);
  color: #fff; border: none; cursor: pointer;
  box-shadow: 0 8px 24px rgba(37,99,235,0.2);
  opacity: 0; transform: translateY(20px) scale(0.8);
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
  font-weight: 700; font-size: 1.25rem;
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  scrollTopBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
  scrollTopBtn.style.transform = window.scrollY > 300 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)';
  scrollTopBtn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// 3. DARK MODE TOGGLE (with localStorage)
// ============================================================
const darkModeToggle = document.createElement('button');
darkModeToggle.id = 'dark-mode-toggle';
darkModeToggle.innerHTML = '🌙';
darkModeToggle.style.cssText = `
  position: fixed; top: 1rem; right: 1rem; z-index: 70;
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--surface); color: var(--text); border: 1px solid rgba(12,15,20,0.08);
  cursor: pointer; box-shadow: var(--shadow-1);
  transition: transform 0.2s ease, background 0.2s ease;
  font-size: 1.2rem;
`;
document.body.appendChild(darkModeToggle);

const darkModeCss = `
  :root.dark-mode {
    --bg: #0f1724;
    --surface: #1a2332;
    --text: #e5e7eb;
    --muted: #9ca3af;
    --glass: rgba(255,255,255,0.04);
  }
  body.dark-mode { background: linear-gradient(180deg, #0a0e18 0%, #0f1724 100%); }
  .dark-mode header { background: rgba(26,35,50,0.7); border-bottom-color: rgba(255,255,255,0.04); }
  .dark-mode .card, .dark-mode #about .content, .dark-mode .project-card {
    background: linear-gradient(180deg, #1a2332, #141e2e);
    border-color: rgba(255,255,255,0.04);
  }
`;
const styleEl = document.createElement('style');
styleEl.textContent = darkModeCss;
document.head.appendChild(styleEl);

const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
  document.documentElement.classList.add('dark-mode');
  darkModeToggle.innerHTML = '☀️';
}

darkModeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode');
  const isNowDark = document.documentElement.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isNowDark);
  darkModeToggle.innerHTML = isNowDark ? '☀️' : '🌙';
});

// ============================================================
// 4. ANIMATIONS ON SCROLL (Fade-in + Slide)
// ============================================================
const animationObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
      animationObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.project-card, #about .content').forEach((el, idx) => {
  el.style.animation = 'none';
  el.style.opacity = '0';
  setTimeout(() => animationObserver.observe(el), idx * 80);
});

// Add keyframes
const keyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
const keyframeStyle = document.createElement('style');
keyframeStyle.textContent = keyframes;
document.head.appendChild(keyframeStyle);

// ============================================================
// 5. COPY EMAIL TO CLIPBOARD
// ============================================================
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
  const emailAddr = emailLink.textContent;
  emailLink.style.cursor = 'pointer';
  emailLink.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard.writeText(emailAddr).then(() => {
      const originalText = emailLink.textContent;
      emailLink.textContent = '✓ Copié !';
      emailLink.style.color = '#10b981';
      setTimeout(() => {
        emailLink.textContent = originalText;
        emailLink.style.color = 'var(--accent)';
      }, 2000);
    });
  });
}

// ============================================================
// 6. MOBILE MENU HAMBURGER
// ============================================================
const createMobileMenu = () => {
  const header = document.querySelector('header .container');
  const nav = document.querySelector('nav');
  
  if (!header || !nav || window.innerWidth > 768) return;

  const hamburger = document.createElement('button');
  hamburger.id = 'mobile-menu-toggle';
  hamburger.innerHTML = '☰';
  hamburger.style.cssText = `
    display: none; background: none; border: none; color: var(--text);
    font-size: 1.5rem; cursor: pointer; z-index: 65;
  `;

  header.appendChild(hamburger);

  const mediaQuery = window.matchMedia('(max-width: 768px)');
  mediaQuery.addListener(e => {
    if (e.matches) {
      hamburger.style.display = 'block';
      nav.style.display = nav.dataset.open === 'true' ? 'flex' : 'none';
      nav.style.position = 'absolute';
      nav.style.top = '100%';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = 'var(--surface)';
      nav.style.flexDirection = 'column';
      nav.style.padding = '1rem';
      nav.style.boxShadow = 'var(--shadow-1)';
    } else {
      hamburger.style.display = 'none';
      nav.style.display = 'flex';
      nav.style.position = 'static';
      nav.style.background = 'transparent';
      nav.style.flexDirection = 'row';
      nav.style.padding = '0';
      nav.style.boxShadow = 'none';
    }
  });

  hamburger.addEventListener('click', () => {
    const isOpen = nav.dataset.open === 'true';
    nav.dataset.open = !isOpen;
    nav.style.display = isOpen ? 'none' : 'flex';
  });

  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.dataset.open = 'false';
      nav.style.display = 'none';
    });
  });
};

createMobileMenu();
window.addEventListener('resize', createMobileMenu);

// ============================================================
// 7. PARALLAX EFFECT ON SCROLL (subtle)
// ============================================================
const parallaxElements = document.querySelectorAll('.project-card');
window.addEventListener('scroll', () => {
  parallaxElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const yPos = window.scrollY * 0.5;
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.style.transform = `translateY(${(rect.top - window.innerHeight / 2) * 0.1}px)`;
    }
  });
});

// ============================================================
// 8. FORM VALIDATION & EMAILJS (if contact form added)
// ============================================================
// Uncomment and configure if you add a contact form with id="contact-form"
/*
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  emailjs.init('YOUR_PUBLIC_KEY'); // Get from https://www.emailjs.com/
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm).then(
      () => {
        alert('✓ Message envoyé !');
        contactForm.reset();
      },
      err => alert('Erreur : ' + err)
    );
  });
}
*/

// ============================================================
// 9. ACTIVE LINK HOVER EFFECT
// ============================================================
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'translateY(-3px)';
  });
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translateY(0)';
  });
});

// ============================================================
// 10. REDUCE MOTION SUPPORT
// ============================================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
  document.querySelectorAll('*').forEach(el => {
    el.style.animation = 'none';
    el.style.transition = 'none';
  });
}

console.log('✓ Portfolio script loaded — smooth scrolling, dark mode, animations active');