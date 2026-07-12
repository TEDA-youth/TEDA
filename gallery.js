/* ============================================================
   TEDA , gallery.js
   Renders the gallery grid from a photos array, wires up the
   category filter buttons, and runs the lightbox (arrows,
   keyboard nav, click-outside-to-close).

   Expects a global `tedaGalleryPhotos` array to be defined
   before this script runs (see data/gallery.js), each item
   shaped like: { id, cat, src, caption }.

   If data/gallery.js hasn't been added yet, falls back to a
   small built-in placeholder set so the page still works.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return; // not on the gallery page

  const photos = (typeof tedaGalleryPhotos !== 'undefined' && tedaGalleryPhotos.length)
    ? tedaGalleryPhotos
    : [
        { id: 1, cat: 'forum', src: 'https://picsum.photos/seed/g1/500/500', caption: 'Teso Youth Forum 2025' },
        { id: 2, cat: 'community', src: 'https://picsum.photos/seed/g2/500/500', caption: 'Community outreach day' },
        { id: 3, cat: 'education', src: 'https://picsum.photos/seed/g3/500/500', caption: 'Mentorship session' },
        { id: 4, cat: 'climate', src: 'https://picsum.photos/seed/g4/500/500', caption: 'Tree planting drive, Kumi' },
      ];

  /* ---------- Render grid ---------- */
  photos.forEach((p) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.dataset.cat = p.cat;
    div.dataset.id = p.id;
    div.innerHTML = `<img src="${p.src}" alt="${p.caption}" loading="lazy">
      <div class="gi-overlay"><span>${p.caption}</span></div>`;
    div.addEventListener('click', () => openLightbox(p.id));
    grid.appendChild(div);
  });

  /* ---------- Filter buttons ---------- */
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach((item) => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.cat !== filter);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbCaption = document.getElementById('lbCaption');
  if (!lightbox) return;

  let currentIndex = 0;

  function visiblePhotos() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const activeFilter = activeBtn ? activeBtn.dataset.filter : 'all';
    return activeFilter === 'all' ? photos : photos.filter((p) => p.cat === activeFilter);
  }

  function renderLightbox(list) {
    const p = list[currentIndex];
    lbImage.src = p.src;
    lbImage.alt = p.caption;
    lbCaption.textContent = p.caption;
  }

  function openLightbox(id) {
    const list = visiblePhotos();
    currentIndex = list.findIndex((p) => p.id === id);
    if (currentIndex === -1) currentIndex = 0;
    renderLightbox(list);
    lightbox.classList.add('show');
  }

  const closeBtn = document.getElementById('lbClose');
  const prevBtn = document.getElementById('lbPrev');
  const nextBtn = document.getElementById('lbNext');

  if (closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.remove('show'));
  if (prevBtn) prevBtn.addEventListener('click', () => {
    const list = visiblePhotos();
    currentIndex = (currentIndex - 1 + list.length) % list.length;
    renderLightbox(list);
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    const list = visiblePhotos();
    currentIndex = (currentIndex + 1) % list.length;
    renderLightbox(list);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('show');
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') lightbox.classList.remove('show');
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
});
