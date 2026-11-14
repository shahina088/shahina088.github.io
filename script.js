(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('shakhnoza-homepage-theme');
  } catch (_) {
    // The toggle still works when browser storage is unavailable.
  }

  const systemPrefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  function updateButton() {
    const isDark = root.dataset.theme === 'dark';
    button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    button.setAttribute('aria-pressed', String(isDark));
    themeColor?.setAttribute('content', isDark ? '#171322' : '#faf7ff');
  }

  button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('shakhnoza-homepage-theme', root.dataset.theme);
    } catch (_) {
      // Keep the selected theme for this page view if storage is unavailable.
    }
    updateButton();
  });

  updateButton();
})();
