/* ============================================================
   TEDA, forms.js
   Reusable progress-bar submit behavior for every form on the
   site (join, apply, contact, youth forum register, volunteer,
   partner). Handles: an invisible reCAPTCHA v3 check, animated
   fill and live percentage while sending, masked email in the
   confirmation notification, and an auto-dismissing toast.

   Durations used across the site (per the confirmed plan):
     join.html            20000 ms
     apply.html           15000 ms
     contact.html         10000 ms
     youth-forum register 15000 ms (not specified in original
                           timing table, matches apply's pace)
     get-involved (both)  15000 ms
   ============================================================ */

/* ============================================================
   reCAPTCHA v3 (invisible)
   ------------------------------------------------------------
   TEDA_RECAPTCHA_SITE_KEY below is a PLACEHOLDER. Replace it
   with your real site key from google.com/recaptcha once you've
   registered your domain there, and add the matching script tag
   to each form page's head:

     <script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>

   Until a real key is in place, wireProgressForm() below detects
   that grecaptcha isn't available and simply skips straight to
   the submit animation, so forms keep working during development.
   ============================================================ */
const TEDA_RECAPTCHA_SITE_KEY = 'YOUR_RECAPTCHA_SITE_KEY_HERE';

/**
 * Get a reCAPTCHA v3 token for the given action, or resolve with
 * null if reCAPTCHA hasn't been wired up yet (no key, no script).
 */
function getRecaptchaToken(action) {
  if (typeof grecaptcha === 'undefined' || TEDA_RECAPTCHA_SITE_KEY === 'YOUR_RECAPTCHA_SITE_KEY_HERE') {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    grecaptcha.ready(() => {
      grecaptcha.execute(TEDA_RECAPTCHA_SITE_KEY, { action }).then(resolve).catch(() => resolve(null));
    });
  });
}

/**
 * Mask an email address as to*****ke@gmail.com style.
 */
function maskEmail(email) {
  const [user, domain] = (email || '').split('@');
  if (!domain) return email;
  if (user.length <= 4) {
    return user[0] + '*'.repeat(Math.max(user.length - 1, 1)) + '@' + domain;
  }
  return user.slice(0, 2) + '*'.repeat(user.length - 4) + user.slice(-2) + '@' + domain;
}

/**
 * Wire a form to the animated progress-bar submit button, with an
 * invisible reCAPTCHA v3 check that runs before the animation starts.
 *
 * @param {string} formId       id of the <form> element
 * @param {string} btnId        id of the submit <button class="progress-btn">
 * @param {string} fillId       id of the .fill div inside the button
 * @param {string} labelId      id of the .label div inside the button
 * @param {string|null} emailFieldId  id of the email <input> to mask in the
 *                              notification (pass null if the form has no
 *                              email field)
 * @param {number} durationMs   how long the fill animation runs before
 *                              success fires
 * @param {string} doneText     label text shown once complete (e.g. "Sent")
 * @param {string} sendingText  label text shown while filling (e.g. "Sending...")
 * @param {string|null} recaptchaFieldId  id of the hidden input that should
 *                              receive the reCAPTCHA token (pass null to skip)
 *
 * Note: this drives the client-side animation, reCAPTCHA token, and
 * confirmation UI. Actually delivering the form data still requires
 * wiring each form's action to your Web3Forms endpoint (with access
 * key) separately, this function does not perform that network
 * request itself.
 */
function wireProgressForm(formId, btnId, fillId, labelId, emailFieldId, durationMs, doneText, sendingText, recaptchaFieldId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const btn = document.getElementById(btnId);
  const fill = document.getElementById(fillId);
  const label = document.getElementById(labelId);
  const notify = document.getElementById('formNotify');
  const notifyText = document.getElementById('notifyText');

  function runProgressAnimation() {
    btn.classList.add('running');
    label.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${sendingText} <span class="pct">0%</span>`;
    fill.style.transition = `width ${durationMs}ms linear`;
    requestAnimationFrame(() => { fill.style.width = '100%'; });

    const start = Date.now();
    const interval = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / durationMs) * 100));
      const pctEl = label.querySelector('.pct');
      if (pctEl) pctEl.textContent = pct + '%';
      if (pct >= 100) clearInterval(interval);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      btn.classList.remove('running');
      btn.classList.add('done');
      label.innerHTML = `<i class="fas fa-check"></i> ${doneText}`;

      if (notify && notifyText) {
        const emailField = emailFieldId ? document.getElementById(emailFieldId) : null;
        const emailVal = emailField ? emailField.value : '';
        notifyText.textContent = emailVal
          ? 'Confirmation going to ' + maskEmail(emailVal)
          : 'Your request has been sent';
        notify.classList.add('show');
        setTimeout(() => notify.classList.remove('show'), 4000);
      }
    }, durationMs);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (btn.classList.contains('running') || btn.classList.contains('done')) return;

    if (recaptchaFieldId) {
      const tokenField = document.getElementById(recaptchaFieldId);
      getRecaptchaToken(formId).then((token) => {
        if (tokenField) tokenField.value = token || '';
        runProgressAnimation();
      });
    } else {
      runProgressAnimation();
    }
  });
}
