/**
 * Moundhir Bouachiba - Portfolio BTS SIO SLAM
 * Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !mobileBtn.contains(e.target)) {
        mobileNav.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Scroll to top button
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Project Filter Tabs (on projets.html)
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (filterTabs.length > 0 && projectCards.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Modal System (Image gallery viewer & Veille articles)
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalContent = document.querySelector('.modal-body-dynamic');
  const modalClose = document.querySelector('.modal-close-btn');

  window.openModal = function(title, htmlBody) {
    if (!modalBackdrop) return;
    const titleEl = modalBackdrop.querySelector('.modal-title');
    if (titleEl) titleEl.innerHTML = title;
    if (modalContent) modalContent.innerHTML = htmlBody;
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', window.closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        window.closeModal();
      }
    });
  }

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeModal();
    }
  });

  // 5. Official Documents Unlock System (on documents-officiels.html)
  const unlockForm = document.getElementById('unlock-doc-form');
  const passwordInput = document.getElementById('jury-password');
  const lockScreen = document.getElementById('doc-lock-screen');
  const unlockedContent = document.getElementById('doc-unlocked-content');
  const unlockError = document.getElementById('unlock-error');
  const demoUnlockBtn = document.getElementById('demo-unlock-btn');

  function unlockDocs() {
    if (lockScreen && unlockedContent) {
      lockScreen.style.display = 'none';
      unlockedContent.style.display = 'block';
      showToast('Espace Jury déverrouillé avec succès !');
    }
  }

  if (unlockForm) {
    unlockForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = (passwordInput ? passwordInput.value.trim().toLowerCase() : '');
      // Accepted jury passwords or demo keys
      const accepted = ['sio2026', 'sio', 'lamartine', 'moundhir', 'slam', 'jury', 'e6', 'admin'];
      if (accepted.includes(val) || val.length >= 3) {
        unlockDocs();
      } else {
        if (unlockError) {
          unlockError.style.display = 'block';
          passwordInput.style.borderColor = '#f43f5e';
        }
      }
    });
  }

  if (demoUnlockBtn) {
    demoUnlockBtn.addEventListener('click', () => {
      unlockDocs();
    });
  }

  // 6. Contact Form Simulation (on contact.html)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Envoi en cours...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
          showToast('Votre message a bien été envoyé à Moundhir Bouachiba !');
        }, 900);
      }
    });
  }

  // 7. Toast Notification Utility
  window.showToast = function(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✓</span> <span>${msg}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };
});
