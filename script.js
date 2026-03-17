(function () {
  const navToggleButtons = document.querySelectorAll('.nav-toggle');
  navToggleButtons.forEach((button) => {
    const targetId = button.getAttribute('data-target');
    const menu = targetId ? document.getElementById(targetId) : null;
    if (!menu) return;

    button.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.addEventListener('click', (event) => {
    navToggleButtons.forEach((button) => {
      const targetId = button.getAttribute('data-target');
      const menu = targetId ? document.getElementById(targetId) : null;
      if (!menu || !menu.classList.contains('open')) return;

      const clickedInside = menu.contains(event.target) || button.contains(event.target);
      if (!clickedInside) {
        menu.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

function escapeHtml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function textWithBreaks(text) {
  return escapeHtml(text).replace(/\n/g, '<br>');
}

function trackEvent(eventName, payload = {}) {
  if (window.plausible) {
    window.plausible(eventName, { props: payload });
  }
}
