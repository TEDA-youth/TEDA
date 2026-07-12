# TEDA — Teso Elites Development Association Website

A static HTML, CSS, and JavaScript website for TEDA, hosted free on GitHub Pages.
No PHP, no database, no login system, no admin panel — all content lives in
`data/*.js` files and all forms submit via [Web3Forms](https://web3forms.com).

## Status

All 18 pages are built. See the checklist below for what's left before this
is ready to go live.

## File Structure

```
teda-website/
├── index.html, about.html, focus-areas.html, opportunities.html,
│   youth-forum.html, events.html, gallery.html, resources.html,
│   news.html, get-involved.html, join.html, apply.html,
│   contact.html, donate.html, terms.html, privacy-policy.html,
│   thank-you.html, 404.html
├── CNAME
├── manifest.json
├── sw.js
├── robots.txt
├── sitemap.xml
├── README.md
├── assets/
│   ├── css/style.css
│   ├── js/main.js, forms.js, gallery.js, mobile-menu.js
│   └── images/ (logo, favicon, og-image, hero/, directors/, ambassadors/, gallery/, events/, posts/)
└── data/
    ├── directors.js, ambassadors.js, events.js, gallery.js, posts.js,
    ├── positions.js, testimonials.js, focus-areas.js, opportunities.js,
    └── resources.js, faqs.js, partners.js
```

## Before You Deploy — Outstanding Items

- [ ] **Replace placeholder photos.** Every image currently points to
      `picsum.photos` / `pravatar.cc` placeholders. Add real photos to
      `assets/images/` and update the `src`/`background-image` references.
- [ ] **Update `CNAME`.** Currently set to a placeholder domain
      (`www.tedauganda.org`). Replace with your real custom domain, or
      delete the file entirely if you're using the default
      `*.github.io` address.
- [ ] **Self-host Font Awesome.** Every page currently loads Font Awesome
      from the cdnjs CDN for preview convenience. Download it into
      `assets/vendor/fontawesome/` and update the `<link>` tag on every
      page to meet the "no CDN dependency" security requirement.
- [ ] **Wire up Web3Forms.** Each `<form>` needs its `action` attribute
      pointed at your Web3Forms endpoint with your access key, and
      `assets/js/forms.js` only handles the visual progress bar — actual
      submission still needs to be added per form.
- [ ] **Add reCAPTCHA.** Not yet included on any form. Get a site key at
      [google.com/recaptcha](https://www.google.com/recaptcha) and set
      "allowed domains" in your Web3Forms dashboard to match.
- [ ] **Populate `data/*.js` files.** Events, gallery photos, news posts,
      resources, and apply positions are currently placeholder content
      written directly into each page — move them into the `data/`
      files and update the pages to read from them.
- [ ] **Add real icons.** `manifest.json` references
      `assets/images/icon-192.png`, `icon-512.png`, and
      `icon-maskable-512.png` — none of these exist yet, which will
      block the "Add to Home Screen" install prompt.
- [ ] **Enable GitHub 2FA** on the account hosting this repo — the
      single highest-impact security step for a GitHub Pages site (see
      the security guide from earlier in this project).

## Local Preview

No build step — just open any `.html` file directly in a browser, or
serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment (GitHub Pages)

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Set the source branch (usually `main`) and root folder.
4. If using a custom domain, confirm `CNAME` matches it and configure
   your domain's DNS per GitHub's custom domain docs.

## Design System

| Token | Value |
|---|---|
| Brown (primary) | `#7B1F1F` |
| Blue (secondary) | `#1A5FAD` |
| Green (success) | `#2E7D32` |
| Gold (accent) | `#c9952a` |
| Dark (footer) | `#1a0a0a` |
| Off-white (section bg) | `#faf8f5` |
| Headings | Playfair Display |
| Body | DM Sans |

## Contact

tedayouthteso@gmail.com · WhatsApp +256 775 375249
