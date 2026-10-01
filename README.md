# Slow Horses fan files

Unofficial browser games for the Apple TV+ series *Slow Horses*: a Top Trumps-style card game and two personality quizzes.

https://radiosilence.github.io/slow-horses/

Content is safe up to the end of season 5, which finished airing in October 2025. Season 6 began airing on 16 September 2026 and is excluded until it has finished.

## Why it is built this way

**No build step.** ES modules, Google Fonts and inline SVG; `site/` is deployed to GitHub Pages as-is. Each game lives in its own directory under `site/`, and anything the games share (theme tokens, portraits) lives in `site/shared/`.

**Sketched mugshots rather than photographs.** Cast photos belong to Apple and the photographers, and would make the project look official. Each portrait in `shared/portraits.js` is a front-facing ink sketch against a height chart, assembled from parts (face shape, hair, beard, brows, mouth, clothing) and drawn twice with a slight offset so the line looks hurried. Hostile agents get a redaction bar across the eyes. The same portraits appear in every game.

**Ratings, not invented numbers.** The trumps stats (Tradecraft, Clearance, Ruthlessness, Hygiene, Luck, Loyalty) are judgements out of 100 grounded in what happens on screen. Luck is scored against the character's fate by the end of season 5, so the dead score low. The card blurbs record the events the numbers rest on.

**Three opponents.** Roddy Ho picks at random. Diana Taverner picks her highest raw number, with a one-in-four chance of a random pick. Jackson Lamb ranks each of his stats against the whole deck and calls the one least likely to be beaten.

## Run locally

```
mise run serve   # http://localhost:8771
```

## Disclaimer

A non-commercial fan project, not affiliated with or endorsed by Apple, See-Saw Films, Mick Herron or Winning Moves (Top Trumps). Character names belong to their owners. Contains spoilers for seasons 1 to 5.
