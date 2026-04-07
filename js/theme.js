/* ===== Itibachok Barta - Theme Toggle ===== */
(function () {
  'use strict';

  var STORAGE_KEY = 'pb-theme';

  // Apply saved theme immediately (before paint) to prevent flash
  var saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    // Default to dark
    document.documentElement.removeAttribute('data-theme');
  }

  /** Get current theme: 'dark' | 'light' */
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  /** Set theme and persist */
  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(STORAGE_KEY, theme);

    // Update any Dark Mode toggle buttons on the page
    syncToggles();
  }

  /** Toggle between dark and light */
  function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  /** Sync all .theme-toggle buttons to current state */
  function syncToggles() {
    var isDark = getTheme() === 'dark';
    var toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(function (btn) {
      if (isDark) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // On DOM ready, wire up toggle buttons and sync state
  document.addEventListener('DOMContentLoaded', function () {
    syncToggles();

    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        toggleTheme();
      });
    });
  });

  // Expose globally for programmatic use
  window.PBTheme = {
    get: getTheme,
    set: setTheme,
    toggle: toggleTheme
  };
})();
