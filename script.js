(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Current year in the footer.
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Theme switch: saves the visitor's choice when browser storage is available.
  const themeButton = $('#theme-toggle');
  if (themeButton) {
    const updateThemeButton = () => {
      const light = document.documentElement.dataset.theme === 'light';
      themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
      themeButton.setAttribute('title', light ? 'Switch to dark theme' : 'Switch to light theme');
    };
    updateThemeButton();
    themeButton.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('portfolio-theme', next); } catch (_) { /* Storage can be unavailable for local files. */ }
      updateThemeButton();
    });
  }

  // Mobile navigation.
  const menuButton = $('#menu-toggle');
  const nav = $('#site-nav');
  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    };
    menuButton.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    $$('a', nav).forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
        menuButton.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  // Project category filters.
  const filterButtons = $$('.filter-button');
  const projectCards = $$('.project-card');
  const emptyState = $('#empty-state');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let visible = 0;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (emptyState) emptyState.hidden = visible > 0;
    });
  });

  // Highlight the navigation item for the section currently in view.
  const navLinks = $$('.site-nav a');
  if ('IntersectionObserver' in window && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    $$('main section[id]').forEach(section => observer.observe(section));
  }

  // Replace this placeholder with your deployed Flask service URL after deployment.
  // Example: https://kritheka-portfolio-api.onrender.com (no trailing slash).
  const API_BASE_URL = 'https://YOUR-FLASK-BACKEND.onrender.com';

  // Send contact form data to Flask; Flask validates it and stores it in the database.
  const contactForm = $('#contact-form');
  const contactStatus = $('#contact-status');
  if (contactForm && contactStatus) {
    contactForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      if (API_BASE_URL.includes('YOUR-FLASK-BACKEND')) {
        contactStatus.textContent = 'The contact service is not connected yet. Please use the email link on this page for now.';
        return;
      }

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      const data = new FormData(contactForm);
      const payload = {
        name: String(data.get('name') || '').trim(),
        email: String(data.get('email') || '').trim(),
        message: String(data.get('message') || '').trim()
      };

      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
      contactStatus.textContent = 'Sending your message…';

      try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || 'Your message could not be sent. Please try again.');
        contactStatus.textContent = result.message || 'Thanks! Your message was sent successfully.';
        contactForm.reset();
      } catch (error) {
        contactStatus.textContent = error.message || 'Could not reach the contact service. Please try again later.';
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    });
  }
})();
