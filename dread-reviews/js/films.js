// Sample data. Scores are PLACEHOLDERS, not real ratings. Replace with your own.
// Later this can move to a JSON file or a database/API.
//
// hue: used to generate a placeholder "poster" colour until you add real artwork.
// watchUrl: where to watch. Currently a JustWatch search link; swap in direct links
// (or a per-service list) as you curate them.

const justWatch = (title) =>
  `https://www.justwatch.com/uk/search?q=${encodeURIComponent(title)}`;

const FILMS = [
  { title: "Hereditary",   year: 2018, director: "Ari Aster",       studio: "A24",     critic: 89, audience: 71, hue: 12,  blurb: "A family unravels after a death. Grief as the real monster." },
  { title: "Midsommar",    year: 2019, director: "Ari Aster",       studio: "A24",     critic: 83, audience: 63, hue: 48,  blurb: "A breakup, a Swedish festival, and a very bright kind of dread." },
  { title: "The Witch",    year: 2015, director: "Robert Eggers",   studio: "A24",     critic: 90, audience: 59, hue: 100, blurb: "1630s New England. Faith, famine and something in the woods." },
  { title: "Saint Maud",   year: 2019, director: "Rose Glass",      studio: "A24",     critic: 88, audience: 61, hue: 200, blurb: "A devout nurse and her dangerous fixation on salvation." },
  { title: "Talk to Me",   year: 2022, director: "Danny & Michael Philippou", studio: "A24", critic: 94, audience: 85, hue: 340, blurb: "A party game with a severed hand turns into something far worse." },
  { title: "Raw",          year: 2016, director: "Julia Ducournau", studio: "Wild Bunch", critic: 92, audience: 66, hue: 0,  blurb: "A vegetarian vet student discovers a new appetite." },
  { title: "The Lighthouse", year: 2019, director: "Robert Eggers", studio: "A24",     critic: 90, audience: 74, hue: 220, blurb: "Two keepers, one lighthouse, and a rapid loss of sanity." },
  { title: "It Follows",   year: 2014, director: "David Robert Mitchell", studio: "Radius-TWC", critic: 95, audience: 66, hue: 170, blurb: "A relentless, slow-walking curse passed from person to person." }
];

// Optional fields per film:
//   poster: "hereditary.jpg"   -> file in images/posters/
//   review: "Paragraph one.\n\nParagraph two."   -> your written review (blank line = new paragraph)

// Each film gets a URL slug, e.g. "The Witch" -> "the-witch"
const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
FILMS.forEach((f) => { f.slug = slugify(f.title); });

const filmUrl = (f) => `film.html?film=${encodeURIComponent(f.slug)}`;

// Poster background: real image if provided, otherwise a generated gradient
function posterStyle(f) {
  if (f.poster) {
    return `background:url('images/posters/${encodeURI(f.poster)}') center / cover no-repeat`;
  }
  return `background:linear-gradient(160deg, hsl(${f.hue} 45% 22%), hsl(${(f.hue + 40) % 360} 40% 8%))`;
}