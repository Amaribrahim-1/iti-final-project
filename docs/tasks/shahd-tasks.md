# Member C Tasks — Movie Details + TV Show Details (Shahd)

This is **Package C — Movie Details Page + TV Show Details Page** from the project spec. You build both details pages. These are **two separate pages, so they get two separate branches and two separate Pull Requests** — don't build both in one branch. You work entirely inside your own branches and don't need to wait on Ibrahim, Sahar, or Mariam — you only depend on Ammar's foundation work, which is already merged into `main` before you start.

If anything about the hooks or the data shape below is unclear, ask in the group chat before guessing.

---

## Branch 1 of 2: `feature/movie-details-page`

### Task 1 — Pull latest `main` and build the Movie Details core info section

- [ ] Pull the latest `main` branch (this brings in Ammar's foundation — routes, hooks, store, and shared components). "Pulling" means downloading the latest changes from the shared repo before you start your own work.
- [ ] Create your feature branch (a separate copy of the code you work on so you don't touch `main` directly) with the exact name: `feature/movie-details-page`.
- [ ] Open `pages/MovieDetails/MovieDetailsPage.jsx` (Ammar already created this empty file and linked it to URLs like `/movie/550`). Read the `id` from the URL with `useParams` from `react-router`.
- [ ] Call `useMovieDetails(id)` from `/hooks/useMovieDetails.js` (import it exactly from that path) — it returns the standard shape `{ data, isPending, isError, error }`, with the full movie object in `data` (fields like `title`, `overview`, `vote_average`, `genres`, `release_date`, `poster_path`).
- [ ] While `isPending` is true, show `<Loader />` from `/components/Loader.jsx`. If `isError` is true, show `<ErrorState message="..." />` from `/components/ErrorState.jsx`.
- [ ] Build the core info section: poster image (use `buildImageUrl` from `/utils/buildImageUrl.js` to turn `poster_path` into a full image URL), title, overview, rating, and genres.

**Acceptance criteria:** navigating to `/movie/:id` with a real movie id shows the poster, title, overview, rating, and genres for that exact movie; loading and error states show correctly.

**Commit now with message:** `feat: add movie details page with core info section`

### Task 2 — Movie Details recommendations row

- [ ] Still inside `pages/MovieDetails/MovieDetailsPage.jsx`, below the core info section, call `useMovieRecommendations(id)` from `/hooks/useMovieRecommendations.js` (import it exactly from that path). Pass it the same `id` you already got from `useParams` in Task 1 — do not create a new variable. It returns the standard shape `{ data, isPending, isError, error }`; the recommended movies are in `data.results`.
- [ ] While this section's `isPending` is true, show `<Loader />` from `/components/Loader.jsx`. If `isError` is true, show `<ErrorState message="..." />` from `/components/ErrorState.jsx`.
- [ ] Render `data.results` as a horizontal row (or grid) of `<MovieCard item={item} mediaType="movie" />` from `/components/MovieCard.jsx` — this shared component already handles the poster, title, date, rating ring, and wishlist heart icon internally, and already navigates to `/movie/:id` via its own inner `Link` — don't wrap it in another `Link` yourself.

**Acceptance criteria:** the recommendations row shows real recommended movies as cards; this section has its own loading/error UI; clicking a heart icon on a card correctly toggles it in the wishlist.

**Commit now with message:** `feat: add movie details recommendations row`

### Task 3 — Movie Details reviews list

- [ ] Still inside `pages/MovieDetails/MovieDetailsPage.jsx`, below the recommendations row, call `useMovieReviews(id)` from `/hooks/useMovieReviews.js` (import it exactly from that path). Pass it the same `id` from `useParams` — do not create a new variable. It returns the standard shape `{ data, isPending, isError, error }`; the reviews are in `data.results`.
- [ ] While this section's `isPending` is true, show `<Loader />` from `/components/Loader.jsx`. If `isError` is true, show `<ErrorState message="..." />` from `/components/ErrorState.jsx`.
- [ ] Render each review with at least the author's name and the review content (truncate long reviews if needed for layout).
- [ ] If `data.results` is an empty array, show a simple "No reviews yet" message instead of an empty section.

**Acceptance criteria:** the reviews section has its own loading/error UI; it shows real reviews for a movie that has them, and shows the "No reviews yet" message for a movie that has none.

**Commit now with message:** `feat: add movie details reviews list`

_Tasks 1–3 build the whole Movie Details page and are tightly related — commit after each one individually (as above), but only push to the remote once Task 3 is done._

**Push now** (`git push -u origin feature/movie-details-page`) — this covers Tasks 1, 2, and 3.

### Task 4 — Styling pass (Movie Details only)

- [ ] Compare the Movie Details page against the Figma file (`https://www.figma.com/file/jvGvsGLg6X3T7JPU3E2rNl/Movie-App`) and adjust spacing, colors, and layout to match — use the Tailwind design tokens Ammar set up (e.g. `bg-primary`) instead of picking your own colors.

**Acceptance criteria:** the Movie Details page closely matches the Figma reference.

**Commit now with message:** `style: polish movie details page to match figma`

**Push now** — this covers Task 4.

### Task 5 — Open the Pull Request for Movie Details (final task of this branch)

- [ ] Push the branch if you haven't already (`git push -u origin feature/movie-details-page`).
- [ ] Open a Pull Request (PR — a request asking the Team Leader to review and merge your branch into `main`) from `feature/movie-details-page` into `main`.
- [ ] In the PR description, briefly state what you built (Movie Details page: core info, recommendations, reviews) and attach a screenshot since this is a UI task.
- [ ] Tag Ammar as the reviewer.

This is the only Pull Request for the Movie Details branch — if Ammar asks for changes, make the fix on this same `feature/movie-details-page` branch, commit, and push again. The same PR updates automatically; you don't open a new one.

**Once Ammar merges this PR:** delete the `feature/movie-details-page` branch, both locally (`git branch -d feature/movie-details-page`) and on GitHub (`git push origin --delete feature/movie-details-page`). Then pull the fresh `main` (it now includes your merged Movie Details page) before starting Branch 2 below — you'll use this now-styled page as your visual reference for the TV page since there's no Figma screen for it.

---

## Branch 2 of 2: `feature/tv-show-details-page`

### Task 6 — Pull latest `main` and build the TV Show Details core info section

- [ ] Pull the latest `main` branch (it now includes your merged Movie Details page).
- [ ] Create your second feature branch with the exact name: `feature/tv-show-details-page`.
- [ ] Open `pages/TVShowDetails/TVShowDetailsPage.jsx` (Ammar already created this empty file and linked it to URLs like `/tv/1396`). Read the `id` from the URL with `useParams` from `react-router`.
- [ ] Call `useTVShowDetails(id)` from `/hooks/useTVShowDetails.js` (import it exactly from that path). It returns the standard shape `{ data, isPending, isError, error }`, but with the **TV field names**, not the movie ones: `name` (not `title`), `first_air_date` (not `release_date`), `number_of_seasons`, `number_of_episodes`, plus `overview`, `vote_average`, `genres`, `poster_path` like before.
- [ ] While `isPending` is true, show `<Loader />` from `/components/Loader.jsx`. If `isError` is true, show `<ErrorState message="..." />` from `/components/ErrorState.jsx`.
- [ ] Build this as its own separate component (not a shared "Details" component reused from Task 1) — this is a deliberate spec decision to keep each page simple and reading its own real fields directly.
- [ ] There's no Figma screen for this page, so for now just get the same sections in place: poster (use `buildImageUrl` from `/utils/buildImageUrl.js` with `poster_path`) + core info (name, first air date, number of seasons/episodes, overview, rating, genres).

**Acceptance criteria:** navigating to `/tv/:id` with a real TV show id shows the poster, name, first air date, number of seasons/episodes, overview, rating, and genres for that exact show.

**Commit now with message:** `feat: add tv show details page with core info section`

### Task 7 — TV Show Details recommendations row

- [ ] Still inside `pages/TVShowDetails/TVShowDetailsPage.jsx`, below the core info section, call `useTVShowRecommendations(id)` from `/hooks/useTVShowRecommendations.js` (import it exactly from that path). Pass it the same `id` you already got from `useParams` in Task 6 — do not create a new variable. It returns the standard shape `{ data, isPending, isError, error }`; the recommended TV shows are in `data.results`.
- [ ] While this section's `isPending` is true, show `<Loader />` from `/components/Loader.jsx`. If `isError` is true, show `<ErrorState message="..." />` from `/components/ErrorState.jsx`.
- [ ] Render `data.results` as a horizontal row (or grid) of `<MovieCard item={item} mediaType="tv" />` from `/components/MovieCard.jsx` — this shared component already handles the poster, title, date, rating ring, and wishlist heart icon internally, and already navigates to `/tv/:id` via its own inner `Link` — don't wrap it in another `Link` yourself. Same component as the movie recommendations row, just with `mediaType="tv"` this time since these results are TV shows, not movies.

**Acceptance criteria:** the recommendations row shows real recommended TV shows as cards; this section has its own loading/error UI; clicking a heart icon on a card correctly toggles it in the wishlist.

**Commit now with message:** `feat: add tv show details recommendations row`

### Task 8 — TV Show Details reviews list

- [ ] Still inside `pages/TVShowDetails/TVShowDetailsPage.jsx`, below the recommendations row, call `useTVShowReviews(id)` from `/hooks/useTVShowReviews.js` (import it exactly from that path). Pass it the same `id` from `useParams` — do not create a new variable. It returns the standard shape `{ data, isPending, isError, error }`; the reviews are in `data.results`.
- [ ] While this section's `isPending` is true, show `<Loader />` from `/components/Loader.jsx`. If `isError` is true, show `<ErrorState message="..." />` from `/components/ErrorState.jsx`.
- [ ] Render each review with at least the author's name and the review content (truncate long reviews if needed for layout) — same approach as the movie reviews list in Task 3.
- [ ] If `data.results` is an empty array, show a simple "No reviews yet" message instead of an empty section.

**Acceptance criteria:** the reviews section has its own loading/error UI; it shows real reviews for a TV show that has them, and shows the "No reviews yet" message for a TV show that has none.

**Commit now with message:** `feat: add tv show details reviews list`

**Optional (not required — skip this if you want, no impact on your PR):** The two details pages must stay separate (do not merge them into one generic Details page — movie and TV use different field names like `title` vs `name`). If you'd like to practice reuse after Task 8, the reviews section is the safe piece to share: TMDB review objects look the same on both pages (`author` and `content`).

How, in short:
1. Create `src/components/ReviewsList.jsx` (it gets used by two pages, so it belongs in the shared `/components` folder, not inside one page).
2. It takes a `reviews` prop (the `data.results` array). If the array is empty, show "No reviews yet". Otherwise render each review's author and content — same UI you already built in Task 3 and Task 8.
3. In both `MovieDetailsPage.jsx` and `TVShowDetailsPage.jsx`, keep calling each page's own reviews hook (`useMovieReviews` / `useTVShowReviews`). Only the rendering moves into `<ReviewsList reviews={data.results} />`.
4. Leave core info and recommendations on each page. Those still read different fields / different `mediaType`.

If you skip this, copying the reviews markup into both pages is still correct.

If you do it: make a **new commit** on this same `feature/tv-show-details-page` branch (do not fold it into the Task 8 commit) with message: `refactor: extract shared reviewslist for movie and tv details`. Do **not** open a separate Pull Request — this goes out with the same TV Show Details PR (updating `MovieDetailsPage.jsx` on this branch is fine because Movie Details is already merged into `main`). If that PR is already open, just push the extra commit and the PR updates automatically. Then continue with the push below / Task 9.

_Tasks 6–8 build the whole TV Show Details page and are tightly related — commit after each one individually (as above), but only push to the remote once Task 8 is done._

**Push now** (`git push -u origin feature/tv-show-details-page`) — this covers Tasks 6, 7, and 8.

### Task 9 — Styling pass (TV Show Details only, using Movie Details as reference)

- [ ] Since there's no Figma screen for TV Show Details, use your now-merged, now-styled Movie Details page as the visual reference and adapt the same layout approach to the TV page's fields (including its recommendations row and reviews list from Tasks 7 and 8), so the two pages feel like part of the same app even though they're separate components.

**Acceptance criteria:** the TV Show Details page closely matches the adapted Movie Details look, and someone flipping between a movie's page and a TV show's page can tell they're clearly part of the same design.

**Commit now with message:** `style: polish tv show details page for visual consistency with movie details`

**Push now** — this covers Task 9.

### Task 10 — Open the Pull Request for TV Show Details (final task)

- [ ] Push the branch if you haven't already (`git push -u origin feature/tv-show-details-page`).
- [ ] Open a Pull Request from `feature/tv-show-details-page` into `main`.
- [ ] In the PR description, briefly state what you built (TV Show Details page: core info, recommendations, reviews) and attach a screenshot since this is a UI task.
- [ ] Tag Ammar as the reviewer.

This is the only Pull Request for the TV Show Details branch — if Ammar asks for changes, make the fix on this same `feature/tv-show-details-page` branch, commit, and push again.

**Once Ammar merges this PR:** delete the `feature/tv-show-details-page` branch, both locally and on GitHub, the same way you did for Movie Details. That's Package C fully done.

---

## If you get stuck

Copy the exact task text above and paste it into any AI assistant and ask it to help you with just that one task — not the whole page at once. You can also ask in the team group chat if something about the hooks or data shape is unclear.
