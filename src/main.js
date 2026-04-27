/* ── Projects ────────────────────────────────────── */
async function loadProjects() {
  const res  = await fetch('./projects.json');
  const projects = await res.json();
  const section  = document.getElementById('work');

  // Update the project count label
  section.querySelector('.count-label').textContent =
    String(projects.length).padStart(2, '0') + ' Projects';

  projects.forEach(p => {
    const clickable = p.link ? 'clickable' : '';
    const onclick   = p.link ? `onclick="window.open('${p.link}','_blank')"` : '';

    const rightEl = p.link
      ? `<div class="p-arrow">&#x2192;</div>`
      : p.badge
        ? `<div class="p-badge">${p.badge}</div>`
        : '';

    const tags = p.tags.map(t => {
      const accent = p.accentTags.includes(t) ? ' accent' : '';
      return `<span class="tag${accent}">${t}</span>`;
    }).join('');

    const el = document.createElement('div');
    el.className = `project ${clickable}`;
    if (p.link) el.setAttribute('onclick', `window.open('${p.link}','_blank')`);

    el.innerHTML = `
      <div class="p-num">${p.num}</div>
      <div class="p-body">
        <div class="p-header">
          <div class="p-name">${p.name}</div>
          ${rightEl}
        </div>
        <p class="p-desc">${p.desc}</p>
        <div class="p-tags">${tags}</div>
      </div>`;

    section.appendChild(el);
  });
}

/* ── Scroll fade-in ──────────────────────────────── */
function initFadeIn() {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }),
    { threshold: 0.08 }
  );
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
}

/* ── Endorsements ────────────────────────────────── */
function setEndorsements() {
  // Nexus Mods has no public API — update this number manually when it changes
  document.getElementById('nexus-endorsements').textContent = '150+';
}



/* ── Init ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  initFadeIn();
  setEndorsements();
});