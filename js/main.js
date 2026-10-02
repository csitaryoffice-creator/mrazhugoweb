(function () {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.main-nav');

  if (menuButton && menu) {
    const menuLabel = menuButton.querySelector('.sr-only');
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      document.body.classList.remove('menu-is-open');
      if (menuLabel) menuLabel.textContent = 'Menü megnyitása';
    };

    menuButton.addEventListener('click', () => {
      const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(willOpen));
      menu.classList.toggle('is-open', willOpen);
      document.body.classList.toggle('menu-is-open', willOpen);
      if (menuLabel) menuLabel.textContent = willOpen ? 'Menü bezárása' : 'Menü megnyitása';
    });

    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.querySelector('.brand')?.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    const mobileMenuMedia = window.matchMedia('(max-width: 1080px)');
    mobileMenuMedia.addEventListener('change', (event) => {
      if (!event.matches) closeMenu();
    });
  }

  const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
  const navSections = navLinks
    .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
    .filter((item) => item.section);

  if (navSections.length) {
    let ticking = false;
    const updateActiveNav = () => {
      const marker = window.scrollY + window.innerHeight * 0.34;
      let active = navSections[0];
      navSections.forEach((item) => {
        if (item.section.offsetTop <= marker) active = item;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        active = navSections[navSections.length - 1];
      }
      navSections.forEach((item) => {
        const isActive = item === active;
        item.link.classList.toggle('is-active', isActive);
        if (isActive) item.link.setAttribute('aria-current', 'page');
        else item.link.removeAttribute('aria-current');
      });
      ticking = false;
    };
    const requestNavUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActiveNav);
    };
    updateActiveNav();
    window.addEventListener('scroll', requestNavUpdate, { passive: true });
    window.addEventListener('resize', requestNavUpdate);
  }

  const acWidget = document.querySelector('[data-ac-widget]');
  if (acWidget) {
    const visual = acWidget.querySelector('[data-ac-visual]');
    const unitTemp = acWidget.querySelector('[data-unit-temp]');
    const unitModeIcon = acWidget.querySelector('[data-unit-mode-icon]');
    const announcement = acWidget.querySelector('[data-ac-announcement]');
    const powerOff = acWidget.querySelector('[data-ac-off]');
    const tabs = Array.from(acWidget.querySelectorAll('[role="tab"]'));
    const panels = Array.from(acWidget.querySelectorAll('[role="tabpanel"]'));
    const defaultPanel = acWidget.querySelector('[data-ac-default]');
    const stateDetails = {
      climate: {
        temperature: '22°',
        icon: '❄',
        mode: 'cool',
        label: 'Klímaszerelés: a készülék 22 Celsius-fokon működik, a lamella nyitva van.'
      },
      electric: {
        temperature: '20°',
        icon: '',
        mode: 'dry',
        label: 'Villanyszerelés: a klíma párátlanító üzemmódban, 20 Celsius-fokon működik, az elektromos kapcsolat aktív.'
      },
      htarifa: {
        temperature: '24°',
        icon: '☀',
        mode: 'heat',
        label: 'H-tarifa: a készülék fűtési állapotban, 24 Celsius-fokon működik.'
      },
      maintenance: {
        temperature: 'OFF',
        icon: '',
        mode: 'off',
        label: 'Karbantartás: a készülék kikapcsolva, a szűrő karbantartási helyzetben látható.'
      }
    };

    const activateTab = (tab) => {
      const state = tab.dataset.acState;
      const activePanel = panels.find((panel) => panel.id === tab.getAttribute('aria-controls'));

      tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel !== activePanel;
        panel.classList.remove('is-entering');
      });
      defaultPanel.hidden = true;
      visual.dataset.state = state;
      visual.setAttribute('aria-label', stateDetails[state].label);
      unitTemp.textContent = stateDetails[state].temperature;
      unitModeIcon.textContent = stateDetails[state].icon;
      unitModeIcon.dataset.mode = stateDetails[state].mode;
      announcement.textContent = stateDetails[state].label;
      powerOff.disabled = false;

      window.requestAnimationFrame(() => activePanel.classList.add('is-entering'));
    };

    const switchOff = () => {
      tabs.forEach((item, index) => {
        item.setAttribute('aria-selected', 'false');
        item.tabIndex = index === 0 ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = true;
        panel.classList.remove('is-entering');
      });
      defaultPanel.hidden = false;
      visual.dataset.state = 'idle';
      visual.setAttribute('aria-label', 'Kikapcsolt, márkajelzés nélküli oldalfali klímaberendezés');
      unitTemp.textContent = 'OFF';
      unitModeIcon.textContent = '';
      unitModeIcon.dataset.mode = 'off';
      announcement.textContent = 'A klímaberendezés kikapcsolva. Válasszon egy szolgáltatási területet.';
      powerOff.disabled = true;
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        tabs.forEach((item, itemIndex) => { item.tabIndex = itemIndex === nextIndex ? 0 : -1; });
        tabs[nextIndex].focus();
      });
    });
    powerOff.addEventListener('click', switchOff);
  }

  const galleryToggle = document.querySelector('[data-gallery-toggle]');
  const galleryMore = document.querySelector('[data-gallery-more]');
  if (galleryToggle && galleryMore) {
    galleryToggle.addEventListener('click', () => {
      const opening = galleryMore.hidden;
      galleryMore.hidden = !opening;
      galleryToggle.setAttribute('aria-expanded', String(opening));
      galleryToggle.textContent = opening ? 'Kevesebb munka' : 'További munkák';
      if (opening) galleryMore.querySelector('.gallery-item')?.focus();
    });
  }

  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox && typeof lightbox.showModal === 'function') {
    const lightboxImage = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('[data-lightbox-caption]');
    const lightboxCounter = lightbox.querySelector('[data-lightbox-counter]');
    const galleryItems = [...document.querySelectorAll('.gallery-item:not([hidden])')];
    let activeGalleryIndex = 0;
    const showGalleryImage = (index) => {
      activeGalleryIndex = (index + galleryItems.length) % galleryItems.length;
      const item = galleryItems[activeGalleryIndex];
      lightboxImage.src = item.dataset.full;
      lightboxImage.alt = item.dataset.alt;
      lightboxCaption.textContent = item.dataset.alt;
      lightboxCounter.textContent = `${activeGalleryIndex + 1} / ${galleryItems.length}`;
    };
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        showGalleryImage(index);
        lightbox.showModal();
      });
    });
    lightbox.querySelector('[data-lightbox-prev]').addEventListener('click', () => showGalleryImage(activeGalleryIndex - 1));
    lightbox.querySelector('[data-lightbox-next]').addEventListener('click', () => showGalleryImage(activeGalleryIndex + 1));
    lightbox.querySelector('[data-lightbox-close]').addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') showGalleryImage(activeGalleryIndex - 1);
      if (event.key === 'ArrowRight') showGalleryImage(activeGalleryIndex + 1);
    });
  }

  const revealGroups = [
    { grid: document.querySelector('.services-grid'), selector: '.service-card' },
    { grid: document.querySelector('.trust-grid'), selector: '.trust-item' }
  ].filter((group) => group.grid);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion && 'IntersectionObserver' in window) {
    revealGroups.forEach(({ grid, selector }) => {
      const cards = Array.from(grid.querySelectorAll(selector));
      grid.classList.add('is-reveal-ready');
      const revealCard = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -7% 0px' });

      window.requestAnimationFrame(() => {
        cards.forEach((card) => revealCard.observe(card));
      });
    });
  }

  const contactForm = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');
  if (contactForm) {
    const submitButton = contactForm.querySelector('.submit-button');
    const statusMessage = contactForm.querySelector('[data-form-status-message]');
    const retryButton = contactForm.querySelector('[data-form-retry]');
    const defaultButtonText = submitButton ? submitButton.textContent : '';
    const showResult = (message, isError) => {
      if (!status || !statusMessage) return;
      contactForm.style.setProperty('--form-result-height', `${contactForm.offsetHeight}px`);
      statusMessage.textContent = message;
      status.classList.toggle('is-error', isError);
      if (retryButton) retryButton.hidden = !isError;
      status.hidden = false;
      contactForm.classList.add('has-result');
      status.focus();
    };

    if (retryButton) {
      retryButton.addEventListener('click', () => {
        contactForm.classList.remove('has-result');
        contactForm.style.removeProperty('--form-result-height');
        status.hidden = true;
        status.classList.remove('is-error');
        retryButton.hidden = true;
        submitButton?.focus();
      });
    }

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      if (status) {
        status.classList.remove('is-error');
        status.hidden = true;
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Küldés...';
      }

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success !== true) throw new Error('Web3Forms submission failed');

        contactForm.reset();
        showResult('Köszönöm megkeresését! Hamarosan felveszem Önnel a kapcsolatot.', false);
      } catch (_) {
        showResult('Az üzenet küldése nem sikerült. Kérjük, próbálja újra, vagy keressen telefonon.', true);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultButtonText;
        }
      }
    });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
