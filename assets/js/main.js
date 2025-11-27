document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-nav-toggle]');
    const mobileMenu = document.querySelector('[data-nav-mobile]');

    if (!toggle || !mobileMenu) {
      return;
    }

    const closeMenu = () => {
      mobileMenu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      mobileMenu.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
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
  });
