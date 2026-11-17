# Dread — Art House Horror Reviews

A modern, minimal review site for art house and elevated horror (A24 and friends), with critic and audience scores and where-to-watch links.

This is the starting point: plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run it

1. Open this folder in VS Code (`File > Open Folder…`).
2. Install the **Live Server** extension (Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server**.

You can also just double-click `index.html` to open it in a browser.

## Structure

```
index.html            Home page: film grid
film.html             Single film page (opened via film.html?film=the-witch)
css/styles.css        Design tokens (colours, fonts) and styling
js/films.js           Film data (placeholder scores), slugs, poster helper
js/app.js             Home page: search, studio filter, sorting, cards
js/film.js            Film page: poster, scores, review, where to watch
images/posters/       Put poster images here (see its README)
```

Each film's page is generated from its entry in `js/films.js`. Add a `review` field to
write a review, and a `poster` field to use a real poster image.

## What works now

- Film grid with critic and audience scores
- Search by title, director or studio
- Filter by studio, sort by score, year or title
- "Where to watch" link per film (currently a JustWatch search)
- Responsive, dark theme

## Notes

- All scores are placeholders. Replace them with your own review data.
- Posters are generated gradients. Add real artwork later (check image licensing).
- Fonts load from Google Fonts, so you need an internet connection.

## Ideas for next steps

- Individual film pages with full reviews
- Move film data to a JSON file or a small backend/database
- Direct streaming links per film instead of a search link
- Your own "Dread score" and review write-ups
- User accounts, ratings and watchlists
- Move to a framework (Next.js, Astro or similar) once the design settles
