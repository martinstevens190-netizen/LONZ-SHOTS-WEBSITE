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
    if (mobileMenu && !mobileMenu.hidden) {
      mobileMenu.hidden = true;
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

const filterButtons = [...document.querySelectorAll('[data-gallery-filter]')];
const galleryItems = [...document.querySelectorAll('.gallery-item')];
const galleryTriggers = [...document.querySelectorAll('.gallery-trigger')];

if (filterButtons.length && galleryItems.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.galleryFilter;
      filterButtons.forEach((chip) => chip.classList.toggle('is-active', chip === button));

      galleryItems.forEach((item) => {
        const categories = (item.dataset.category || '').split(/\s+/).filter(Boolean);
        const visible = filter === 'all' || categories.includes(filter);
        item.hidden = !visible;
      });
    });
  });
}

const lightbox = document.querySelector('#gallery-lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxText = document.querySelector('.lightbox-text');
const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
const lightboxClose = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-nav.prev');
const nextButton = document.querySelector('.lightbox-nav.next');
let currentVisibleIndex = 0;

const getVisibleTriggers = () => galleryTriggers.filter((trigger) => !trigger.closest('.gallery-item')?.hidden);

const renderLightbox = (index) => {
  const visibleTriggers = getVisibleTriggers();
  if (!visibleTriggers.length || !lightboxImage || !lightboxTitle || !lightboxText) return;

  currentVisibleIndex = (index + visibleTriggers.length) % visibleTriggers.length;
  const current = visibleTriggers[currentVisibleIndex];

  lightboxImage.src = current.dataset.full || current.querySelector('img')?.src || '';
  lightboxImage.alt = current.querySelector('img')?.alt || current.dataset.title || 'Gallery image';
  lightboxTitle.textContent = current.dataset.title || '';
  lightboxText.textContent = current.dataset.caption || '';
};

const openLightbox = (trigger) => {
  if (!lightbox) return;
  const visibleTriggers = getVisibleTriggers();
  const index = visibleTriggers.indexOf(trigger);
  renderLightbox(index >= 0 ? index : 0);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = '';
};

galleryTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => openLightbox(trigger));
});

lightboxBackdrop?.addEventListener('click', closeLightbox);
lightboxClose?.addEventListener('click', closeLightbox);
prevButton?.addEventListener('click', () => renderLightbox(currentVisibleIndex - 1));
nextButton?.addEventListener('click', () => renderLightbox(currentVisibleIndex + 1));

document.addEventListener('keydown', (event) => {
  if (!lightbox || lightbox.hidden) return;

  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') renderLightbox(currentVisibleIndex - 1);
  if (event.key === 'ArrowRight') renderLightbox(currentVisibleIndex + 1);
});
