(() => {
  'use strict';
  document.documentElement.classList.add('js-enabled');

  // Recommendation comparison panels, with arrow/home/end keyboard semantics.
  const tabs = Array.from(document.querySelectorAll('[role="tab"][data-rec]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"][data-rec-panel]'));
  const activateTab = (index, moveFocus = false) => {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle('is-selected', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel, i) => { panel.hidden = i !== index; });
    if (moveFocus) tabs[index].focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(index));
    tab.addEventListener('keydown', (e) => {
      let next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); activateTab(next, true); }
    });
  });

  // Small-screen nav.
  const menuButton = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
  };
  menuButton.addEventListener('click', () => {
    const willOpen = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', willOpen);
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) closeMenu(); });

  // Reading progress + active section state.
  const progressBar = document.getElementById('scroll-progress-bar');
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('[data-nav]'));
  const syncScrollState = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, percentage)).toFixed(2)}%`;
    const y = window.scrollY + 190;
    let current = '';
    for (const section of sections) if (section.offsetTop <= y) current = section.id;
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  let scrollQueued = false;
  window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(() => { syncScrollState(); scrollQueued = false; });
  }, { passive: true });
  window.addEventListener('resize', syncScrollState);
  syncScrollState();

  // Progressive enhancement: reveal key blocks as they enter viewport.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.section-heading, .metric-card, .motivation-card, .org-diagram, .org-explainer, .decision-card, .tension-row, .vision-step, .source-item');
    targets.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px 20px 0px', threshold: .07 });
    targets.forEach(el => observer.observe(el));
  }
})();
