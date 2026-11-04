/* =====================================================================
   script.js — page behaviour (you rarely need to edit this file)
   ---------------------------------------------------------------------
   Content (activities, projects, certificates) → data.js
   Colours, fonts, spacing                      → style.css (see :root)
   Page structure + experience cards            → index.html

   Table of contents
     1. Helpers
     2. Render: education, activities, projects, certificates
     3. Modal (activity details + gallery)
     4. Lightbox (zoomed photos / certificates)
     5. Project case study (full-screen story view)
     6. Keyboard + scroll lock
     7. Reveal-on-scroll animation
   ===================================================================== */
'use strict';

/* ── 1. HELPERS ─────────────────────────────────────────────────────── */
const $  = (sel, root = document) => root.querySelector(sel);

// Escape text that goes inside an HTML attribute (alt text, aria-label)
const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// <img> that swaps itself for a "photo coming soon" tile if the file is missing
const imgTag = (src, alt, cls = '') =>
  `<img class="${cls}" src="${src}" alt="${esc(alt)}" loading="lazy" onerror="imgFallback(this)">`;

function imgFallback(el) {
  const ph = document.createElement('div');
  ph.className = 'img-ph';
  ph.textContent = 'photo coming soon';
  el.replaceWith(ph);
}

// Make a non-<button> element behave like a button for keyboard users
function onActivate(root, selector, handler) {
  root.addEventListener('click', e => {
    const el = e.target.closest(selector);
    if (el && root.contains(el)) handler(el, e);
  });
  root.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const el = e.target.closest(selector);
    if (el && e.target === el) { e.preventDefault(); handler(el, e); }
  });
}


/* ── 2. RENDER ──────────────────────────────────────────────────────── */

/* 2-0. Education — one card built from the EDUCATION object (data.js) */
function renderEducation() {
  const e = EDUCATION;
  $('#eduWrap').innerHTML = `
    <article class="edu-card">
      <aside class="edu-side">
        <div class="act-icon-ring edu-icon">${e.icon}</div>
        <h3 class="edu-school">${e.school}</h3>
        <div class="edu-degree">${e.degree}</div>
        <div class="edu-meta">
          ${e.period ? `<span class="exp-date">${e.period}</span>` : ''}
          ${e.gpa ? `<span class="exp-date">GPA ${e.gpa}</span>` : ''}
        </div>
        ${e.location ? `<div class="act-org">${e.location}</div>` : ''}
      </aside>
      <div class="edu-main">
        <p class="modal-lead">${e.summary}</p>
        ${(e.details || []).map(t => `<p class="modal-text">${t}</p>`).join('')}
        ${e.courses?.length ? `<h3 class="modal-sub">Key courses</h3>
          <div class="edu-courses">${e.courses.map(c => `
            <div class="edu-course"><div class="edu-course-name">${c.name}</div><p>${c.note}</p></div>`).join('')}
          </div>` : ''}
        ${e.thesis ? `<div class="edu-thesis">
          <span class="edu-thesis-label">${e.thesis.label}</span>
          <div class="edu-thesis-title">${e.thesis.title}</div>
          <p>${e.thesis.text}</p>
          ${e.thesis.tags?.length ? `<div class="modal-tags">${e.thesis.tags.map(t => `<span class="exp-tag">${t}</span>`).join('')}</div>` : ''}
        </div>` : ''}
        ${e.tags?.length ? `<div class="modal-tags">${e.tags.map(t => `<span class="exp-tag">${t}</span>`).join('')}</div>` : ''}
      </div>
    </article>`;
}

/* 2a. Activities — one card per ACTIVITIES item (data.js) */
function renderActivities() {
  const grid = $('#actGrid');
  grid.innerHTML = ACTIVITIES.map((a, i) => `
    <article class="act-card" tabindex="0" role="button" data-i="${i}"
             aria-haspopup="dialog" aria-label="Open details: ${esc(a.title)}">
      <div class="act-icon-ring" style="background: var(--${a.color})">${a.icon}</div>
      <div class="act-title">${a.title}</div>
      <div class="act-org">${a.org}</div>
      <p class="act-desc">${a.summary}</p>
      <span class="act-more">details &amp; photos ↗</span>
    </article>`).join('');
  onActivate(grid, '.act-card', el => openActivity(+el.dataset.i, el));
}

/* 2b. Projects — one card per PROJECTS item; sizes come from PROJECT_LAYOUT */
function renderProjects() {
  const grid = $('#projGrid');
  grid.innerHTML = PROJECTS.map((p, i) => {
    const size = PROJECT_LAYOUT[i % PROJECT_LAYOUT.length];
    return `
    <article class="proj-card ${size}" tabindex="0" role="button" data-i="${i}"
             aria-label="Open case study: ${esc(p.title)}">
      <div class="proj-thumb" style="background:${p.bg}">${imgTag(p.img, p.title + ' preview')}</div>
      <div class="proj-body">
        <div class="proj-meta">
          <span class="proj-type" style="background:${p.tagBg};color:${p.tagColor}">${p.tag}</span>
          <div class="proj-links">
            ${p.github ? `<a class="proj-link" href="${p.github}" target="_blank" rel="noopener" title="Source code" aria-label="Source code of ${esc(p.title)}">⌥</a>` : ''}
            ${p.live   ? `<a class="proj-link" href="${p.live}" target="_blank" rel="noopener" title="Live demo" aria-label="Live demo of ${esc(p.title)}">↗</a>` : ''}
          </div>
        </div>
        <h3 class="proj-title">${p.title}</h3>
        <p class="proj-desc">${p.tagline}</p>
        <div class="proj-stack">${p.stack.slice(0, 4).map(s => `<span class="stk">${s}</span>`).join('')}</div>
      </div>
    </article>`;
  }).join('');
  onActivate(grid, '.proj-card', (el, e) => {
    if (e.target.closest('a')) return;          // let code/live links work normally
    openDetail(+el.dataset.i);
  });
}

/* 2c. Certificates — one card per CERTIFICATES item; click opens the lightbox */
const certItems = () => CERTIFICATES.map(c => ({
  src: c.image,
  caption: `${c.title} — ${c.issuer}${c.date ? ' · ' + c.date : ''}`,
  link: c.link
}));

function renderCertificates() {
  const grid = $('#certGrid');
  grid.innerHTML = CERTIFICATES.map((c, i) => `
    <article class="cert-card" tabindex="0" role="button" data-i="${i}"
             aria-label="View certificate: ${esc(c.title)}">
      <div class="cert-thumb">${imgTag(c.image, c.title)}</div>
      <div class="cert-info">
        <div class="cert-title">${c.title}</div>
        <div class="cert-issuer">${c.issuer}</div>
        ${c.date ? `<span class="exp-date">${c.date}</span>` : ''}
      </div>
    </article>`).join('');
  onActivate(grid, '.cert-card', el => openLightbox(certItems(), +el.dataset.i));
}


/* ── 3. MODAL (activity details) ────────────────────────────────────── */
const modal     = $('#modal');
const modalBody = $('#modalBody');
let   modalTrigger = null;      // remembers which card opened it (focus returns there)
let   modalGallery = [];

function openActivity(i, trigger) {
  const a = ACTIVITIES[i];
  modalTrigger = trigger || null;
  modalGallery = (a.gallery || []).map(src => ({ src, caption: a.title }));

  modalBody.innerHTML = `
    <header class="modal-head">
      <div class="act-icon-ring modal-icon" style="background: var(--${a.color})">${a.icon}</div>
      <div>
        <h2 class="modal-title" id="modalTitle">${a.title}</h2>
        <div class="act-org">${a.org}</div>
        ${a.period ? `<span class="exp-date">${a.period}</span>` : ''}
      </div>
    </header>
    <p class="modal-lead">${a.summary}</p>
    ${(a.details || []).map(t => `<p class="modal-text">${t}</p>`).join('')}
    ${a.highlights?.length ? `<h3 class="modal-sub">What I did</h3>
      <ul class="modal-list">${a.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
    ${a.tags?.length ? `<div class="modal-tags">${a.tags.map(t => `<span class="exp-tag">${t}</span>`).join('')}</div>` : ''}
    ${modalGallery.length ? `<h3 class="modal-sub">Gallery</h3>
      <div class="modal-gallery">${modalGallery.map((g, n) =>
        `<button class="gal-item" data-g="${n}" aria-label="Enlarge photo ${n + 1}">${imgTag(g.src, a.title + ' photo ' + (n + 1))}</button>`
      ).join('')}</div>` : ''}`;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  $('.modal-panel', modal).scrollTop = 0;
  syncScrollLock();
  $('.modal-close', modal).focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  syncScrollLock();
  modalTrigger?.focus();
}

modal.addEventListener('click', e => {
  if (e.target === modal || e.target.closest('.modal-close')) return closeModal();   // backdrop or ×
  const g = e.target.closest('[data-g]');
  if (g) openLightbox(modalGallery, +g.dataset.g);
});


/* ── 4. LIGHTBOX (big photo / certificate viewer) ───────────────────── */
const lb      = $('#lightbox');
const lbStage = $('#lbStage');
const lbCap   = $('#lbCap');
let   lbItems = [], lbIdx = 0;

function openLightbox(items, i) {
  lbItems = items; lbIdx = i;
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  lb.classList.toggle('single', items.length < 2);      // hide arrows for a single image
  showLightbox();
  syncScrollLock();
  $('.lb-close', lb).focus();
}

function showLightbox() {
  const it = lbItems[lbIdx];
  lbStage.innerHTML = imgTag(it.src, it.caption, 'lb-img');
  lbCap.innerHTML = `${esc(it.caption)}
    ${it.link ? ` · <a href="${it.link}" target="_blank" rel="noopener">verify credential ↗</a>` : ''}
    ${lbItems.length > 1 ? `<span class="lb-count">${lbIdx + 1} / ${lbItems.length}</span>` : ''}`;
}

const lbStep = d => { lbIdx = (lbIdx + d + lbItems.length) % lbItems.length; showLightbox(); };

function closeLightbox() {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  syncScrollLock();
}

lb.addEventListener('click', e => {
  if (e.target.closest('.lb-prev')) return lbStep(-1);
  if (e.target.closest('.lb-next')) return lbStep(1);
  if (e.target.closest('.lb-close') || e.target === lb || e.target === lbStage) closeLightbox();
});


/* ── 5. PROJECT CASE STUDY (full-screen story view) ─────────────────── */
const pvOverlay  = document.getElementById('pvOverlay');
const pvTrack    = document.getElementById('pvTrack');
const pvProgress = document.getElementById('pvProgress');
const pvCounter  = document.getElementById('pvCounter');
const pvProjName = document.getElementById('pvProjName');

/* Builds the 6 story slides from one PROJECTS entry (data.js).
   Edit the HTML below to change the case-study layout. */
function buildChapters(p) {
  const totalSlides = 6;

  return `
  <!-- 1. COVER -->
  <div class="pv-slide cover" style="background:${p.bg}22;">
    <div class="pv-ch-num">01 / cover</div>
    <img class="pv-cover-img" src="${p.img}" alt="${esc(p.title)} preview" onerror="this.remove()">
    <span class="pv-cover-tag" style="background:${p.tagBg};color:${p.tagColor}">${p.tag}</span>
    <h1 class="pv-cover-title"><em>${p.title}</em></h1>
    <p class="pv-cover-sub">${p.tagline}</p>
    <span class="pv-cover-year">${p.year}</span>
    <div class="pv-arrow-down">scroll<br>↓</div>
  </div>

  <!-- 2. THE PROBLEM -->
  <div class="pv-slide statement">
    <div class="pv-ch-num">02 / the problem</div>
    <div class="pv-stmt-label">why it exists</div>
    <h2 class="pv-stmt-text">${p.problem.headline}</h2>
    <p class="pv-stmt-body">${p.problem.body}</p>
    <div class="pv-arrow-down">↓</div>
  </div>

  <!-- 3. THE SOLUTION -->
  <div class="pv-slide statement" style="background:${p.bg}18;">
    <div class="pv-ch-num">03 / the solution</div>
    <div class="pv-stmt-label">what i built</div>
    <h2 class="pv-stmt-text">${p.solution.headline}</h2>
    <p class="pv-stmt-body">${p.solution.body}</p>
    <div class="pv-arrow-down">↓</div>
  </div>

  <!-- 4. HIGHLIGHTS -->
  <div class="pv-slide split">
    <div class="pv-ch-num">04 / highlights</div>
    <div class="pv-split-label-col">
      <span class="pv-split-eyebrow">key results</span>
      <h2 class="pv-split-heading">What made it <em>work.</em></h2>
    </div>
    <div class="pv-split-right">
      <ul class="pv-hl-list">
        ${p.highlights.map((h,i)=>`<li><span class="pv-hl-num">0${i+1}</span><span class="pv-hl-text">${h}</span></li>`).join('')}
      </ul>
    </div>
    <div class="pv-arrow-down">↓</div>
  </div>

  <!-- 5. TECH STACK -->
  <div class="pv-slide stack-slide">
    <div class="pv-ch-num">05 / tech stack</div>
    <h2 class="pv-stack-heading">Built <em>with.</em></h2>
    <div class="pv-stack-grid">
      ${p.stack.map(s=>`<span class="pv-stk">${s}</span>`).join('')}
    </div>
    <div class="pv-arrow-down">↓</div>
  </div>

  <!-- 6. NUMBERS / CTA -->
  <div class="pv-slide cta-slide">
    <div class="pv-ch-num">06 / wrap-up</div>
    <h2 class="pv-cta-heading">That was <em>${p.title}.</em></h2>
    <p class="pv-cta-sub">${p.outro}</p>
    <div class="pv-cta-btns">
      ${p.github ? `<a href="${p.github}" class="pv-btn-purple">⌥ view code</a>` : ''}
      ${p.live   ? `<a href="${p.live}"   class="pv-btn-pink">↗ live demo</a>`   : ''}
      <button class="pv-back-home" onclick="closePV()">← back to projects</button>
    </div>
  </div>
  `;
}

function openDetail(idx) {
  const p = PROJECTS[idx];
  pvProjName.textContent = p.title;
  pvTrack.innerHTML = buildChapters(p);

  // build progress dots
  const totalChapters = 6;
  pvProgress.innerHTML = Array.from({length: totalChapters}, (_,i) =>
    `<span class="pv-pdot${i===0?' active':''}" onclick="pvGoSlide(${i})"></span>`
  ).join('');

  pvCounter.textContent = `1 / ${totalChapters}`;
  pvTrack.scrollTop = 0;

  pvOverlay.classList.add('open');
  syncScrollLock();

  // scroll listener for dots + counter.
  // Slides can be taller than the screen on phones, so find the current one
  // by position instead of dividing by the screen height.
  const slideTop = el => el.offsetTop - pvTrack.offsetTop;
  pvTrack.onscroll = () => {
    const mid = pvTrack.scrollTop + pvTrack.clientHeight / 2;
    let i = 0;
    pvTrack.querySelectorAll('.pv-slide').forEach((el, n) => { if (slideTop(el) <= mid) i = n; });
    pvCounter.textContent = `${i+1} / ${totalChapters}`;
    pvProgress.querySelectorAll('.pv-pdot').forEach((d,idx)=>
      d.classList.toggle('active', idx===i)
    );
  };
}

function pvGoSlide(i) {
  const el = pvTrack.querySelectorAll('.pv-slide')[i];
  pvTrack.scrollTo({ top: el.offsetTop - pvTrack.offsetTop, behavior: 'smooth' });
}

function closePV() {
  pvOverlay.classList.remove('open');
  syncScrollLock();
}


/* ── 6. KEYBOARD + SCROLL LOCK ──────────────────────────────────────── */
// Page scroll is locked whenever ANY overlay is open
function syncScrollLock() {
  const anyOpen = [modal, lb, pvOverlay].some(el => el.classList.contains('open'));
  document.body.style.overflow = anyOpen ? 'hidden' : '';
}

// Esc closes the top-most overlay; arrows move through the lightbox
document.addEventListener('keydown', e => {
  const lbOpen = lb.classList.contains('open');
  if (e.key === 'Escape') {
    if (lbOpen) closeLightbox();
    else if (modal.classList.contains('open')) closeModal();
    else closePV();
  }
  if (lbOpen && e.key === 'ArrowLeft')  lbStep(-1);
  if (lbOpen && e.key === 'ArrowRight') lbStep(1);
});


/* ── 7. REVEAL-ON-SCROLL ────────────────────────────────────────────── */
// Elements fade in once as they enter the viewport. The .rv class is removed
// afterwards so card hover effects keep working. Add a selector to animate more.
function initReveal() {
  const sel = '.edu-card, .exp-card, .act-card, .proj-card, .cert-card, .c-link';
  document.querySelectorAll(sel).forEach(el => {
    el.classList.add('rv');
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      el.classList.add('in');
      setTimeout(() => el.classList.remove('rv', 'in'), 700);
      io.unobserve(el);
    }, { threshold: 0.08 });
    io.observe(el);
  });
}

/* ── START ──────────────────────────────────────────────────────────── */
renderEducation();
renderActivities();
renderProjects();
renderCertificates();
initReveal();