const filmEl = document.getElementById("film");
const notFoundEl = document.getElementById("not-found");
document.getElementById("year").textContent = new Date().getFullYear();

const scoreClass = (n) => (n >= 75 ? "good" : n >= 50 ? "mixed" : "bad");

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

const slug = new URLSearchParams(location.search).get("film");
const film = FILMS.find((f) => f.slug === slug);

if (!film) {
  notFoundEl.hidden = false;
} else {
  document.title = `${film.title} (${film.year}) — Dread`;

  const poster = posterStyle(film);

  const reviewHtml = film.review
    ? film.review.split("\n\n").map((p) => `<p>${escapeHtml(p)}</p>`).join("")
    : `<p class="muted">Full review coming soon.</p>`;

  filmEl.innerHTML = `
    <div class="film-layout">
      <div class="poster film-poster" style="${poster}">
        ${film.poster ? "" : `<h3>${escapeHtml(film.title)}</h3>`}
      </div>
      <div class="film-info">
        <p class="eyebrow">${escapeHtml(film.studio)}</p>
        <h1>${escapeHtml(film.title)}</h1>
        <p class="meta">${film.year} · Directed by ${escapeHtml(film.director)}</p>

        <div class="scores big">
          <div class="score ${scoreClass(film.critic)}"><b>${film.critic}%</b><small>Critics</small></div>
          <div class="score ${scoreClass(film.audience)}"><b>${film.audience}%</b><small>Audience</small></div>
        </div>

        <p class="blurb">${escapeHtml(film.blurb)}</p>

        <a class="watch" href="${justWatch(film.title)}" target="_blank" rel="noopener noreferrer">Where to watch →</a>
      </div>
    </div>

    <section class="review">
      <h2>Review</h2>
      ${reviewHtml}
    </section>
  `;
}
