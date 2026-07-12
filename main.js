/* ============================================================
   TEDA , main.js
   Shared behavior for every page: page-load animation, sticky
   navbar hamburger menu, scroll-reveal animation, back-to-top
   button, and the Youth Forum countdown (only runs if a
   countdown element exists on the page).
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Service worker registration (enables PWA install) ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('Service worker registration failed:', err);
      });
    });
  }

  /* ---------- Page load animation ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    if (loader) loader.classList.add('hide');
  });

  /* ---------- Hamburger menu (mobile / tablet) ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      })
    );
  }

  /* ---------- Back to top button ---------- */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('show', window.scrollY > 500);
    });
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in');
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach((el) => io.observe(el));
  }

  /* ---------- Youth Forum countdown ----------
     Only runs on pages that include the countdown markup
     (id="cd-days" / "cd-hours" / "cd-mins" / "cd-secs").
     Forum date: Saturday 18 July 2026, 09:00 East Africa Time. */
  const cdDays = document.getElementById('cd-days');
  if (cdDays) {
    const forumDate = new Date('2026-07-18T09:00:00+03:00').getTime();
    const cdHours = document.getElementById('cd-hours');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');

    function tickCountdown() {
      const diff = forumDate - Date.now();
      if (diff <= 0) {
        cdDays.textContent = cdHours.textContent = cdMins.textContent = cdSecs.textContent = '0';
        return;
      }
      cdDays.textContent = Math.floor(diff / 86400000);
      cdHours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
      cdMins.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      cdSecs.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    }
    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

});
