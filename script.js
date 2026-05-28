/* SC Kitchen and Bath — script.js */

(function () {
  'use strict';

  const toggle = document.getElementById('menu-toggle');
  const nav    = document.getElementById('site-nav');

  // --- Mobile menu ---
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  }

  // Close on nav link click
  nav.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // --- Transparent header: becomes solid once hero scrolls out of view ---
  const header = document.querySelector('.site-header');
  const hero   = document.querySelector('.hero');

  const headerObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('scrolled', !entry.isIntersecting);
  }, { threshold: 0 });

  headerObserver.observe(hero);

  // --- Active nav link via IntersectionObserver ---
  const sections  = document.querySelectorAll('main section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  sections.forEach(s => io.observe(s));

  // --- Footer year ---
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

})();
