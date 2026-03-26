// ===========================
// PROJECT IMAGE DATA
// ===========================
const projects = {
  accessories: {
    title: 'ESCALDI — ACCESSORIES',
    images: [
      'assets/images/accessories/cover.jpg',
      'assets/images/accessories/2.jpg',
      'assets/images/accessories/3.jpg',
      'assets/images/accessories/4.jpg',
    ],
  },
  'inferno-emerald': {
    title: 'ESCALDI — INFERNO EMERALD',
    images: [
      'assets/images/inferno-emerald/cover.jpg',
      'assets/images/inferno-emerald/2.jpg',
      'assets/images/inferno-emerald/3.jpg',
      'assets/images/inferno-emerald/4.jpg',
    ],
  },
  'terra-pro': {
    title: 'ESCALDI — TERRA PRO',
    images: [
      'assets/images/terra-pro/cover.jpg',
      'assets/images/terra-pro/2.jpg',
      'assets/images/terra-pro/3.jpg',
    ],
  },
  genesis: {
    title: 'GENESIS MOUSEPADS × ESCALDI',
    images: [
      'assets/images/genesis/cover.jpg',
      'assets/images/genesis/2.jpg',
      'assets/images/genesis/3.jpg',
      'assets/images/genesis/4.jpg',
    ],
  },
};

// ===========================
// LIGHTBOX
// ===========================
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbTitle = document.getElementById('lb-title');
const lbCount = document.getElementById('lb-count');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');

let currentProject = null;
let currentIndex = 0;

function openLightbox(projectKey, index = 0) {
  currentProject = projectKey;
  currentIndex = index;
  showImage();
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showImage() {
  const proj = projects[currentProject];
  lbImg.src = proj.images[currentIndex];
  lbImg.alt = proj.title;
  lbTitle.textContent = proj.title;
  lbCount.textContent = `${currentIndex + 1} / ${proj.images.length}`;
}

function prevImage() {
  const len = projects[currentProject].images.length;
  currentIndex = (currentIndex - 1 + len) % len;
  showImage();
}

function nextImage() {
  const len = projects[currentProject].images.length;
  currentIndex = (currentIndex + 1) % len;
  showImage();
}

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevImage);
lbNext.addEventListener('click', nextImage);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});

// ===========================
// PROJECT CARDS
// ===========================
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => {
    const key = card.dataset.project;
    if (projects[key]) openLightbox(key, 0);
  });
});

// ===========================
// MOBILE NAV
// ===========================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});
