/**
 * Blazing-Fast CV - Micro JavaScript Controller
 * High performance • Zero dependencies • Dual Language & Dark Mode • ~1.5 KB
 */

(function () {
  'use strict';

  // DOM Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const langToggleBtn = document.getElementById('langToggleBtn');
  const printCvBtn = document.getElementById('printCvBtn');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotice = document.getElementById('toastNotice');

  // --- Theme Management ---
  const THEME_STORAGE_KEY = 'cv-theme-pref';
  
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      const icon = themeToggleBtn.querySelector('.theme-icon');
      if (icon) {
        // Sun for dark mode (switch to light), Moon for light mode (switch to dark)
        icon.innerHTML = theme === 'dark'
          ? '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'
          : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
      }
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Listen to OS theme changes if user hasn't explicitly set preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // --- Language Management (EN / ID) ---
  const LANG_STORAGE_KEY = 'cv-lang-pref';

  function getPreferredLang() {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'en' || saved === 'id') return saved;
    return 'en';
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    if (langToggleBtn) {
      const codeSpan = langToggleBtn.querySelector('.lang-code');
      if (codeSpan) {
        codeSpan.textContent = lang === 'en' ? 'EN' : 'ID';
      }
      langToggleBtn.setAttribute(
        'title',
        lang === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English'
      );
      langToggleBtn.setAttribute(
        'aria-label',
        lang === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English'
      );
    }

    if (lang === 'id') {
      document.title = 'Bayu Riesta | Web Developer & Spesialis Sistem IT - CV';
    } else {
      document.title = 'Bayu Riesta | Web Developer & IT Systems Specialist - CV';
    }
  }

  function toggleLang() {
    const currentLang = document.documentElement.getAttribute('data-lang') || getPreferredLang();
    const newLang = currentLang === 'en' ? 'id' : 'en';
    localStorage.setItem(LANG_STORAGE_KEY, newLang);
    applyLang(newLang);
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', toggleLang);
  }

  // --- Print / PDF with On-Demand Safe Phone Number ---
  const PHONE_STORAGE_KEY = 'cv-print-phone';

  function setupPrintPhone(phoneNumber) {
    let pill = document.getElementById('printPhonePill');
    if (phoneNumber && phoneNumber.trim()) {
      if (!pill) {
        pill = document.createElement('span');
        pill.id = 'printPhonePill';
        pill.className = 'contact-pill print-phone-pill';
        const contactLinks = document.querySelector('.contact-links');
        if (contactLinks) {
          const emailLink = contactLinks.querySelector('a[href^="mailto:"]');
          if (emailLink && emailLink.nextSibling) {
            contactLinks.insertBefore(pill, emailLink.nextSibling);
          } else {
            contactLinks.appendChild(pill);
          }
        }
      }
      pill.innerHTML = `
        <svg viewBox="0 0 24 24" class="phone-print-icon">
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <span class="phone-number-text"></span>
      `;
      const numSpan = pill.querySelector('.phone-number-text');
      if (numSpan) numSpan.textContent = phoneNumber.trim();
    } else if (pill) {
      pill.remove();
    }
  }

  function handlePrint() {
    const isId = (document.documentElement.getAttribute('data-lang') || 'en') === 'id';
    const savedPhone = localStorage.getItem(PHONE_STORAGE_KEY) || '';
    const promptMessage = isId
      ? 'Masukkan nomor telepon / WhatsApp untuk dicantumkan di PDF resume (kosongkan jika tidak ingin mencantumkan):'
      : 'Enter phone / WhatsApp number to include on PDF resume (leave blank to omit):';

    const input = prompt(promptMessage, savedPhone);
    if (input === null) {
      return; // User cancelled
    }

    const trimmed = input.trim();
    if (trimmed) {
      localStorage.setItem(PHONE_STORAGE_KEY, trimmed);
    } else {
      localStorage.removeItem(PHONE_STORAGE_KEY);
    }

    setupPrintPhone(trimmed);
    window.print();
  }

  if (printCvBtn) {
    printCvBtn.addEventListener('click', handlePrint);
  }

  // Also support direct Ctrl+P / Cmd+P shortcut
  window.addEventListener('beforeprint', () => {
    const savedPhone = localStorage.getItem(PHONE_STORAGE_KEY);
    if (savedPhone) {
      setupPrintPhone(savedPhone);
    }
  });

  // --- Copy Email with Toast ---
  let toastTimer = null;
  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.querySelector('.toast-text').textContent = message;
    toastNotice.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2500);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = copyEmailBtn.getAttribute('data-email');
      if (!email) return;

      const isId = (document.documentElement.getAttribute('data-lang') || 'en') === 'id';

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for older browsers
          const tempInput = document.createElement('textarea');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast(isId ? 'Email berhasil disalin!' : 'Email copied to clipboard!');
      } catch (err) {
        showToast('Email: ' + email);
      }
    });
  }

  // Initial sync
  applyTheme(getPreferredTheme());
  applyLang(getPreferredLang());
})();
