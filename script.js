(() => {
  const root = document.documentElement;
  const themeChoices = [...document.querySelectorAll('[data-theme-choice]')];
  const themeColor = document.querySelector('meta[name="theme-color"]');

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('homepage-theme'); } catch (_) {}
  const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(theme) {
    root.dataset.theme = theme;
    themeChoices.forEach(choice => {
      choice.setAttribute('aria-pressed', String(choice.dataset.themeChoice === theme));
    });
    themeColor.setAttribute('content', theme === 'dark' ? '#0e1420' : theme === 'neo' ? '#fff4b8' : '#f5f8ff');
  }

  const initialTheme = ['light', 'dark', 'neo'].includes(savedTheme) ? savedTheme : (preferredDark ? 'dark' : 'light');
  setTheme(initialTheme);
  themeChoices.forEach(choice => choice.addEventListener('click', () => {
    const selectedTheme = choice.dataset.themeChoice;
    setTheme(selectedTheme);
    try { localStorage.setItem('homepage-theme', selectedTheme); } catch (_) {}
  }));

  document.querySelector('#year').textContent = new Date().getFullYear();
})();
