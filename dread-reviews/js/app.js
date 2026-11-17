const state = { query: "", studio: "All", sort: "critic" };

const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const filtersEl = document.getElementById("filters");
const searchEl = document.getElementById("search");
const sortEl = document.getElementById("sort");

document.getElementById("year").textContent = new Date().getFullYear();

const scoreClass = (n) => (n >= 75 ? "good" : n >= 50 ? "mixed" : "bad");

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function cardHtml(f) {
  return `
    <article class="card">
      <a class="poster" href="${filmUrl(f)}" style="${posterStyle(f)}" aria-label="${escapeHtml(f.title)}">
        ${f.poster ? "" : `<h3>${escapeHtml(f.title)}</h3>`}
      </a>
      <div class="card-body">
        <p class="meta">${f.year} · ${escapeHtml(f.director)} · ${escapeHtml(f.studio)}</p>
        <div class="scores">
          <div class="score ${scoreClass(f.critic)}"><b>${f.critic}%</b><small>Critics</small></div>
          <div class="score ${scoreClass(f.audience)}"><b>${f.audience}%</b><small>Audience</small></div>
        </div>
        <p class="blurb">${escapeHtml(f.blurb)} <a class="more" href="${filmUrl(f)}">Read review</a></p>
        <a class="watch" href="${justWatch(f.title)}" target="_blank" rel="noopener noreferrer">Where to watch →</a>
      </div>
    </article>`;
}

function getVisible() {
  const q = state.query.trim().toLowerCase();
  let list = FILMS.filter((f) => {
    const matchesStudio = state.studio === "All" || f.studio === state.studio;
    const matchesQuery =
      !q || [f.title, f.director, f.studio].some((v) => v.toLowerCase().includes(q));
    return matchesStudio && matchesQuery;
  });

  const sorters = {
    critic: (a, b) => b.critic - a.critic,
    audience: (a, b) => b.audience - a.audience,
    year: (a, b) => b.year - a.year,
    title: (a, b) => a.title.localeCompare(b.title)
  };
  return list.sort(sorters[state.sort]);
}

function render() {
  const films = getVisible();
  grid.innerHTML = films.map(cardHtml).join("");
  empty.hidden = films.length > 0;
}

function renderFilters() {
  const studios = ["All", ...new Set(FILMS.map((f) => f.studio))];
  filtersEl.innerHTML = studios
    .map((s) => `<button class="chip${s === state.studio ? " active" : ""}" data-studio="${escapeHtml(s)}">${escapeHtml(s)}</button>`)
    .join("");
}

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  state.studio = btn.dataset.studio;
  renderFilters();
  render();
});

searchEl.addEventListener("input", (e) => { state.query = e.target.value; render(); });
sortEl.addEventListener("change", (e) => { state.sort = e.target.value; render(); });

renderFilters();
render();