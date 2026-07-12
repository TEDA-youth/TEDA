/* ============================================================
   TEDA , mobile-menu.js
   The core hamburger open/close toggle already lives in
   main.js (since every page needs it). This file adds the
   extra mobile/tablet polish on top: closing the menu when the
   viewport is resized past the breakpoint, closing it on
   outside tap, and closing it on orientation change , the kind
   of edge cases that make a mobile nav feel broken if missing.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  const MOBILE_BREAKPOINT = 900;

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }

  /* Close menu if the window is resized/rotated past the mobile breakpoint */
  window.addEventListener('resize', () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) closeMenu();
  });

  window.addEventListener('orientationchange', closeMenu);

  /* Close menu on outside tap (mobile Safari/Chrome don't fire this by default) */
  document.addEventListener('click', (e) => {
    const isOpen = navLinks.classList.contains('open');
    if (!isOpen) return;
    const clickedInsideNav = navLinks.contains(e.target) || hamburger.contains(e.target);
    if (!clickedInsideNav) closeMenu();
  });

  /* Prevent background scroll while the mobile menu is open */
  const observer = new MutationObserver(() => {
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  observer.observe(navLinks, { attributes: true, attributeFilter: ['class'] });
});
