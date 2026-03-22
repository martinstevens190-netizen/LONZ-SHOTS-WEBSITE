const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (!mobileMenu.hidden) {
      mobileMenu.hidden = true;
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
});
