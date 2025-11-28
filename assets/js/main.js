document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTranslateToggle();
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

let translateScriptPromise;

function ensureTranslateContainer() {
  if (document.getElementById('google_translate_container')) {
    return;
  }
  const container = document.createElement('div');
  container.id = 'google_translate_container';
  container.className = 'hidden';
  document.body.appendChild(container);
}

function loadGoogleTranslateScript() {
  if (translateScriptPromise) {
    return translateScriptPromise;
  }

  translateScriptPromise = new Promise((resolve, reject) => {
    window.googleTranslateElementInit = () => {
      if (!window.google || !window.google.translate) {
        resolve();
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,ta',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_container'
      );

      document.dispatchEvent(new CustomEvent('translate:ready'));
      resolve();
    };

    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return translateScriptPromise;
}

function initTranslateToggle() {
  const toggles = Array.from(document.querySelectorAll('[data-translate-toggle]'));
  if (!toggles.length) {
    return;
  }

  let currentLang = 'en';
  ensureTranslateContainer();
  loadGoogleTranslateScript();

  const updateLabels = (lang) => {
    toggles.forEach((toggle) => {
      const label = toggle.querySelector('[data-translate-label]');
      if (label) {
        label.textContent = lang === 'ta' ? 'தமிழ் / EN' : 'EN / தமிழ்';
      }
      toggle.dataset.lang = lang;
    });
  };

  const applyLanguage = (lang) => {
    const combo = document.querySelector('select.goog-te-combo');
    if (!combo) {
      return;
    }
    combo.value = lang === 'en' ? '' : lang;
    combo.dispatchEvent(new Event('change'));
    currentLang = lang;
    updateLabels(lang);
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const nextLang = currentLang === 'ta' ? 'en' : 'ta';
      const combo = document.querySelector('select.goog-te-combo');
      if (!combo) {
        loadGoogleTranslateScript().then(() => applyLanguage(nextLang));
        return;
      }
      applyLanguage(nextLang);
    });
  });

  document.addEventListener('translate:ready', () => {
    updateLabels(currentLang);
  });
}
