document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

function initNavigation() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const overlay = document.querySelector('[data-nav-overlay]');
  const mobileMenu = document.querySelector('[data-nav-mobile]');
  const closeBtn = document.querySelector('[data-nav-close]');
  const backdrop = document.querySelector('[data-nav-backdrop]');

  if (!toggle || !overlay || !mobileMenu) {
    return;
  }

  const TRANSITION_MS = 320;
  let hideTimer;

  const showOverlay = () => {
    if (hideTimer) {
      clearTimeout(hideTimer);
    }
    overlay.classList.remove('hidden');
    requestAnimationFrame(() => {
      overlay.classList.add('is-open');
    });
  };

  const hideOverlay = () => {
    overlay.classList.remove('is-open');
    hideTimer = setTimeout(() => {
      overlay.classList.add('hidden');
    }, TRANSITION_MS);
  };

  const closeMenu = () => {
    hideOverlay();
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    showOverlay();
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    mobileMenu.scrollTop = 0;
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenu.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      closeMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  } else {
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeMenu();
      }
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  });

  window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}
