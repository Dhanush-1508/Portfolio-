(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const resumeOverlay = document.getElementById('resumeOverlay');
  const openResume = document.getElementById('openResume');
  const openResumeHero = document.getElementById('openResumeHero');
  const closeResume = document.getElementById('closeResume');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], .hero-content[id]');
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const projectCards = document.querySelectorAll('.project-card');

  /* Navbar scroll shadow */
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNav();
  });

  /* Mobile menu */
  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Active nav on scroll */
  function updateActiveNav() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 80;

    let current = 'home';
    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.id;
      }
    });

    navLinkItems.forEach(function (link) {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  /* Resume modal */
  function showResume() {
    resumeOverlay.classList.add('active');
    resumeOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function hideResume() {
    resumeOverlay.classList.remove('active');
    resumeOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openResume.addEventListener('click', showResume);
  openResumeHero.addEventListener('click', showResume);
  closeResume.addEventListener('click', hideResume);

  resumeOverlay.addEventListener('click', function (e) {
    if (e.target === resumeOverlay) hideResume();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && resumeOverlay.classList.contains('active')) {
      hideResume();
    }
  });

  /* Scroll reveal */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* Touch: tap project cards to flip */
  projectCards.forEach(function (card) {
    card.addEventListener('click', function () {
      if (window.matchMedia('(hover: none)').matches) {
        card.classList.toggle('flipped');
      }
    });
  });

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* Initial reveal for hero */
  setTimeout(function () {
    document.querySelectorAll('.hero .reveal-left, .hero .reveal-right').forEach(function (el) {
      el.classList.add('visible');
    });
  }, 200);
})();
