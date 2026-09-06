# Movie App — Graduation Project Spec

## 1. Project Overview

A React web application (Movie App) built on the TMDB API. Users can browse movies and TV shows, view details, search, and maintain a wishlist (favorites) that mixes movies and TV shows. The app also includes an AI-powered "Movie Assistant" chatbot restricted to movie/TV topics.

Beyond the required scope, the team is adding a few bonus features not present in the original requirements: a Dark/Light mode toggle and a Trending page (see Sections 5 and 6).

**Constraints:**

- Deadline: 10 days total.
- All features are required together — no partial delivery / phased scope.
- Evaluation criteria: code quality, working functionality, correct implementation of required features, correct implementation of the AI Movie Assistant.
- Design reference: Figma file (link below). UI must follow it closely. Note: the Figma file does not include a TV Show Details screen — TV Show Details is built using the same layout approach as Movie Details, adapted to the TV data fields (see Section 6, Package C).
  `https://www.figma.com/file/jvGvsGLg6X3T7JPU3E2rNl/Movie-App`
  Local copies of the main screens are in `docs/ui/` (`home.png`, `details.png`, `search.png`, `watch-list.png`, `empty-watch-list.png`). Match these if the Figma file is not available. TV Show Details still has no screen — follow `docs/ui/details.png`.

**Team:** 5 members.

- **Ammar** — Team Leader: owns the repo, reviews and merges every Pull Request, resolves merge conflicts, and builds the project foundation (Section 5) before assigning tasks.
- **Ibrahim** — Package A (Home Page).
- **Sahar** — Package B (Navbar, Search Results, Wishlist Page).
- **Shahd** — Package C (Movie Details Page + TV Show Details Page).
- **Mariam** — Package D (Wishlist Page + Trending Page — bonus feature).

None of the 5 members have used GitHub collaboratively before (no PRs, no merge/conflict experience on the team), so Git workflow steps are spelled out explicitly in every task.

---

## 2. Tech Stack

| Layer                   | Choice                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Build tool              | Vite                                                                                                                     |
| Language                | JavaScript (no TypeScript — keeps things consistent and accessible across the whole team)                                |
| Routing                 | React Router DOM (latest version)                                                                                        |
| Data fetching           | TanStack Query (React Query)                                                                                             |
| HTTP client             | Axios (single configured instance)                                                                                       |
| Global state (wishlist) | Zustand                                                                                                                  |
| Global state (theme)    | Zustand (bonus feature, see Section 5)                                                                                   |
| Styling                 | Tailwind CSS                                                                                                             |
| Icons                   | lucide-react                                                                                                             |
| Notifications           | react-hot-toast                                                                                                          |
| AI chatbot              | Gemini API, called directly from the frontend (explicitly allowed by the assignment — no backend needed to hide the key) |

**Environment variables** (`.env`, must be gitignored):

```
VITE_TMDB_API_KEY=...
VITE_GEMINI_API_KEY=...
```

**Image URLs:** always build poster/backdrop URLs as:

```
https://image.tmdb.org/t/p/w500/${poster_path}
```

This should live in one shared helper in `/utils` — never hardcoded per-component.

---

## 3. Git Workflow (applies to everyone)

- **One branch per feature, not one branch per task package.** If your package includes more than one distinct page/component (e.g. Movie Details + TV Show Details, or Navbar + Search Results, or Wishlist Page + Trending Page), each one is its **own branch and its own Pull Request** — never bundle two separate features into a single branch just because they were assigned in the same package. Branch names: `feature/<short-feature-name>` (e.g. `feature/movie-details-page`, `feature/tv-show-details-page`, `feature/navbar`, `feature/search-results`). The exact branch names for each feature are listed in each person's task file — use those exact names.
- **Before starting work on a feature branch:** pull the latest `main` (this matters most right after the Team Leader merges the foundation branch, and again after each of your own previous feature branches gets merged — always branch off the freshest `main`, not from an empty or stale repo).
- **Commits:** small and frequent, not one giant commit at the end. Use a simple prefix convention:
  - `feat: ...` — new feature/UI
  - `fix: ...` — bug fix
  - `style: ...` — visual/CSS-only change
  - `chore: ...` — config, deps, cleanup
- **Pull Requests:** open a PR to `main` once that one feature (not the whole package) is functionally complete and tested locally in the browser. PR description should briefly state what was built and include a screenshot if it's a UI task. Tag Ammar as reviewer. If your package has 2 features, that's 2 separate PRs, opened one after the other — not one PR at the very end covering both.
- **Merging & conflicts:** only Ammar merges PRs into `main`. If your branch falls behind `main` (e.g. the foundation or a shared file changed), pull `main` into your branch and resolve conflicts locally before requesting review — Ammar will help if a conflict is confusing.
- **After a PR is merged — clean up before starting the next feature:** delete the merged branch both locally (`git branch -d feature/<name>`) and on GitHub (`git push origin --delete feature/<name>`), then pull the fresh `main` and only then create the next feature branch. This is called out explicitly at the right point inside each task file — don't do it early, and don't skip it.
- **Never commit `.env` or API keys.**

---

## 4. Shared Contracts (Data Layer & State)

These are the exact interfaces Ammar's foundation work (Section 5) exposes to the rest of the team. Everyone else's tasks are written against these contracts, which is what allows all 5 people to work in parallel without waiting on each other — you build your page/component assuming these functions/hooks exist and behave as described below (they will, once the foundation branch is merged first).

### 4.1 Data-fetching hooks (TanStack Query, built on the Axios instance)

All return the standard TanStack Query shape: `{ data, isLoading, isError, error }`.

- `useMovies(page)` → now-playing/popular movies list, `data.results` is an array of movie objects, supports pagination.
- `useTVShows(page)` → popular TV shows list, same shape.
- `useMovieDetails(id)` → single movie object with full details (fields like `title`, `release_date`, `runtime`).
- `useTVShowDetails(id)` → single TV show object with full details (fields like `name`, `first_air_date`, `number_of_seasons`, `number_of_episodes` — note the different field names from movies).
- `useMovieRecommendations(movieId)` → `data.results` array of recommended movies.
- `useMovieReviews(movieId)` → `data.results` array of review objects.
- `useTVShowRecommendations(tvId)` → same shape as `useMovieRecommendations`, but calls TMDB's `/tv/{id}/recommendations` — `data.results` is an array of recommended TV shows.
- `useTVShowReviews(tvId)` → same shape as `useMovieReviews`, but calls TMDB's `/tv/{id}/reviews` — `data.results` is an array of review objects for that TV show.
- `useSearchMovies(query, page)` → `data.results` array of movie search results.
- `useTrending()` → **bonus hook, not part of the original requirements**, built specifically to unblock Mariam's Trending page (Package D). Calls TMDB's `/trending/all/day` endpoint, `data.results` is a mixed array of movies and TV shows (each item has a `media_type` field already provided by TMDB). Unlike the AI chatbot, this hook must be built and merged as part of the foundation (Phase 0) — Mariam's whole package depends on it, so it can't be deferred the way the chatbot is.

### 4.2 Wishlist state (Zustand store)

Exposed via a `useWishlistStore()` hook (Zustand), selected like `useWishlistStore((state) => state.wishlist)`:

```js
const wishlist = useWishlistStore((state) => state.wishlist)
// wishlist: array of { ...item, media_type: 'movie' | 'tv' }

const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
// (item, mediaType) => void — adds if absent, removes if present

const isInWishlist = useWishlistStore((state) => state.isInWishlist)
// (id, mediaType) => boolean

const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist)
// (id, mediaType) => void
```

### 4.3 Shared components (built as part of the foundation)

- `<MovieCard item={movieOrTvObject} mediaType="movie" | "tv" />` — poster, title, rating, and a heart icon wired to `toggleWishlist`/`isInWishlist`. The heart fills with the site's primary color when the item is in the wishlist. Used on the Home page, Search Results, recommendations, Wishlist page, and the Trending page.
- `<Loader />`, `<ErrorState message />` — shared loading/error UI, used anywhere a query is in flight or fails. Every page must use these instead of a custom spinner/error message.

Anyone building a page just imports and consumes these — no one except Ammar needs to touch how the store or the hooks are implemented internally.

### 4.4 Theme state (Zustand store) — bonus feature

Exposed via a `useThemeStore()` hook (Zustand), built and owned entirely by Ammar (see Section 5). Other pages don't need to interact with this directly — Tailwind's `dark:` variant classes handle the visual side automatically once the toggle sets a `dark` class on the root element.

**Design decision — no generic "Details" component:** Movie Details and TV Show Details are built as two separate components/pages, each reading its own real field names directly, rather than one generic component fed by a normalized data shape. This keeps each page simple and readable on its own, in line with keeping the code at a fresher-friendly level rather than adding an extra abstraction layer.

---

## 5. Ammar — Foundation (Phase 0, before tasks are assigned)

Must be finished and merged into `main` before the other 4 members start pulling and branching.

1. **Project scaffolding**: Vite + React app, Tailwind configured, feature-based folder structure (see `stack-conventions.mdc` / `docs/team-guide.md` for the full convention), ESLint/Prettier baseline, `.env.example`.
2. **Routing skeleton**: all routes registered in React Router with placeholder page components (`/`, `/movie/:id`, `/tv/:id`, `/search`, `/wishlist`, `/trending`, `/ai-assistant`), plus the app `Layout` (Navbar slot + page outlet).
3. **API layer**: Axios instance with TMDB base URL + API key, plus the shared image-URL helper (Section 2).
4. **Data hooks**: all TanStack Query hooks listed in Section 4.1, **including `useTrending()`** — this one is required before handoff since Mariam's package depends on it, unlike the chatbot below.
5. **Wishlist Store**: Zustand implementation behind `useWishlistStore()` as specified in Section 4.2.
6. **Shared components**: `MovieCard`, `Loader`, `ErrorState` as specified in Section 4.3.
7. **Design tokens**: fetch the Figma file directly (link in Section 1) and extract the actual design system — primary color, background, text colors, any accent/rating/error colors, and typography — then wire them into the Tailwind config so the rest of the team is styling against real values, not placeholders.
8. **Team documentation**: generate `docs/team-guide.md` covering the folder structure, naming conventions, and how to consume every hook/store/component above (see the dedicated Cursor prompt for this).
9. **Repo setup**: create the GitHub repo, push the foundation on its own branch, open a PR to `main`, merge it yourself, then hand out task packages (Section 6) to the team.

**AI Movie Assistant** (built separately, after the rest of the foundation above is merged and the team has started — does not block anyone else):

- Navbar entry point ("AI Movie Assistant") — the route/placeholder is already registered in step 2, so Sahar's Navbar work (Package B) is never blocked by this.
- Chat UI: distinguishes user vs. AI messages, shows conversation history, text input + send button, loading state while waiting for a response, graceful error handling.
- Gemini API integration: sends the current message plus prior conversation turns.
- System prompt restricts the assistant to movie/TV topics only; off-topic questions get a polite redirect (per the example in the requirements doc).
- **Optional bonus ideas, once the core chatbot above works** (not required, explore only if time allows): 3 suggested-question buttons shown when the chat first opens; a lightweight "RAG-lite" flow where a real TMDB search/lookup is run based on the user's message and the result is fed into Gemini's context before it replies; a small data-analysis feature that looks at the user's own wishlist and offers observations/recommendations based on it.

**Dark/Light Mode Toggle** (bonus feature, Ammar's own — not part of the original requirements):

- `useThemeStore()` (Zustand) holding the current theme, persisted manually to `localStorage` (read on init, written on toggle — no persist middleware needed for something this small).
- A toggle control in the Navbar (coordinate placement with Sahar since the Navbar is her package).
- Tailwind configured for `dark:` variants; applying the `dark` class to the root element based on the store's value.
- Low-risk, non-blocking: can be built and merged at any point, even after other pages are already in — worst case it needs a small follow-up pass adding `dark:` classes to a page that didn't have them yet.

**Bonus task (optional, only if the required scope above is fully done and stable with time left before the deadline):** pick one feature that isn't in the original requirements, research it, and implement it as a learning exercise — not required for submission, purely for Ammar's own growth.

---

## 6. Task Packages (4 independent packages, one per member)

Each package is self-contained: it only depends on the foundation (Section 4/5), not on any other package. All 4 can be built in parallel starting the same day.

### Package A — Home Page (Movies + TV tabs) — Ibrahim

**Build:** the main landing page. Two tabs ("Movies" / "TV Shows") using `useMovies(page)` / `useTVShows(page)`, rendered as a grid of `<MovieCard />`. Pagination controls that update the page via a URL query param (e.g. `?page=2`) so state survives refresh/back-button.
**Acceptance criteria:** tab switch updates the grid and the URL; pagination works both directions; loading/error states use `<Loader />` / `<ErrorState />`; heart icon on every card correctly reflects and toggles wishlist state.
**Git checkpoints:**

- Branch: `feature/home-page` (created after pulling latest `main` post-foundation-merge). This package is a single page (Movies/TV are tabs inside one Home page, not two separate pages), so it stays one branch and one PR — unlike Packages B, C, and D below, which each cover two genuinely separate pages/components and are split into two branches/PRs.
- Commit after: tab switching works → pagination works → cards + wishlist toggle work → styling polish.
- Open PR once both tabs, pagination, and wishlist toggling all work end-to-end.

### Package B — Navbar + Search Results — Sahar

**Build:** the app's Navbar (logo, Movies/TV nav links, search input, wishlist icon + live counter from `useWishlistStore()`, AI Movie Assistant link, Trending link, and the Dark/Light mode toggle control once Ammar's theme store is ready) and the Search Results page (reads the query from the URL and calls `useSearchMovies(query, page)`).
**Acceptance criteria:** submitting a search navigates to `/search?q=...` and shows matching results as `<MovieCard />`s; wishlist counter in the Navbar updates immediately when any card's heart is toggled anywhere in the app; empty/no-results state is handled on Search.
**Git checkpoints (two separate branches/PRs — Navbar and Search Results are two distinct components, not one):**

- **Branch 1: `feature/navbar`** — static Navbar layout, search input wired to navigate, live wishlist counter, styling pass, Dark Mode toggle button (small follow-up commit once Ammar's theme store is merged, even if that's after opening this PR). Open PR once the Navbar works end-to-end. Once merged: delete `feature/navbar` (local + remote), pull fresh `main`, then start Branch 2.
- **Branch 2: `feature/search-results`** — Search Results page rendering, empty/no-results state, styling pass. Open PR once Search works end-to-end.

### Package C — Movie Details Page + TV Show Details Page — Shahd

**Build:** both details pages.

- **Movie Details**: data (`useMovieDetails`, `useMovieRecommendations`, `useMovieReviews`) is already available as ready-to-use hooks — this task is about layout and clean component structure, not fetching or state logic. Sections: poster + core info (title, overview, rating, genres), a recommendations row (reuse `<MovieCard />`), and a reviews list.
- **TV Show Details**: same overall approach and same three sections as Movie Details — poster + core info, a recommendations row, and a reviews list — using `useTVShowDetails(id)`, `useTVShowRecommendations(id)`, and `useTVShowReviews(id)`. Built as its own separate component reading the real TV fields directly (`name`, `first_air_date`, `number_of_seasons`, `number_of_episodes` — not the movie field names), and the recommendations row reuses `<MovieCard />` with `mediaType="tv"`. There is no Figma screen for this page — follow the Movie Details layout as the visual reference, adapted to these fields.
  **Acceptance criteria:** both pages render with real data; loading/error states are handled per section using `<Loader />` / `<ErrorState />`; the heart icon (via `<MovieCard />` in both the movie and TV recommendations rows) works correctly; the two pages are visually consistent with each other even though they're separate components.
  **Git checkpoints (two separate branches/PRs — Movie Details and TV Show Details are two separate pages/components, not one):**
- **Branch 1: `feature/movie-details-page`** — core info → recommendations → reviews → styling pass against Figma. Open PR once the Movie Details page looks right with real data. Once merged: delete `feature/movie-details-page` (local + remote), pull fresh `main`, then start Branch 2.
- **Branch 2: `feature/tv-show-details-page`** — core info → recommendations → reviews → styling pass, using the now-merged, now-styled Movie Details page as the visual reference (since there's no Figma screen for TV). Open PR once the TV Show Details page looks right and is visually consistent with Movie Details.
- If anything about the hooks or data shape is unclear, ask Ammar in the group before guessing.

### Package D — Wishlist Page + Trending Page (bonus feature) — Mariam

**Build:** two pages.

- **Wishlist Page**: reads `wishlist` from `useWishlistStore()`, renders it as a list/grid, lets the user remove an item via `removeFromWishlist`, and clearly labels/distinguishes movies vs. TV shows with a small badge based on `media_type`; handles the empty-wishlist state.
- **Trending Page** (bonus, beyond the original requirements): a new page at `/trending` showing TMDB's daily trending movies and TV shows together, using the `useTrending()` hook (built by Ammar as part of the foundation — see Section 4.1). Render the results as a grid of `<MovieCard />`, using each item's own `media_type` (already provided by the API response) to pass the right `mediaType` prop. A good opportunity to get comfortable with a hook someone else built, without any deadline pressure since nothing else in the team depends on this page.
  **Acceptance criteria:** Wishlist page correctly lists and removes both movies and TV shows without mixing up their identity, and shows the empty state correctly; Trending page renders trending movies and TV shows together in one grid, each card correctly links to `/movie/:id` or `/tv/:id` depending on its real type; both pages use `<Loader />` / `<ErrorState />` and have working heart icons.
  **Git checkpoints (two separate branches/PRs — Wishlist Page and Trending Page are two separate pages, not one):**
- **Branch 1: `feature/wishlist-page`** — listing with movie/TV badges → remove action → empty state → styling pass. Open PR once the Wishlist page works end-to-end. Once merged: delete `feature/wishlist-page` (local + remote), pull fresh `main`, then start Branch 2.
- **Branch 2: `feature/trending-page`** — grid rendering with `useTrending()` → correct movie/TV routing per card → styling pass. Open PR once the Trending page works end-to-end.
- If anything about `useTrending()`'s data shape is unclear, ask Ammar in the group before guessing.

---

## 7. Final Integration Checklist (before submission)

- [ ] All 6 required pages implemented and navigable, plus the Trending bonus page.
- [ ] Wishlist toggle works from every surface it appears on (list, details, search, recommendations, trending) and stays in sync everywhere, including the Navbar counter.
- [ ] Wishlist page correctly distinguishes and removes both movies and TV shows.
- [ ] Pagination works on the movies/TV list.
- [ ] Search flow works end-to-end.
- [ ] AI Movie Assistant: holds a multi-turn conversation, refuses non-movie topics per the system prompt, shows loading state, handles API errors gracefully.
- [ ] Dark/Light mode toggle works and persists across a page refresh.
- [ ] Trending page correctly mixes and routes movies and TV shows.
- [ ] UI matches the Figma design system (colors, typography) across all pages.
- [ ] No API keys committed to the repo; `.env` is gitignored.
- [ ] No console errors/warnings on any page.

---

## 8. Deferred / Optional Features (not assigned, not required)

These were discussed but intentionally left out of everyone's task packages for now, to avoid adding pressure on top of the required scope. **Do not include this section when generating per-person task files** — it's a "maybe later" list for Ammar, not a task for anyone.

- **Wishlist search + sort + filter**: a search box, a sort control (by rating / most recently added), and a filter (movies only / TV only / all) inside the Wishlist page. Technically simple (plain array `.filter()`/`.sort()` on data already in the Zustand store, no new API calls) — a good candidate to hand to a teammate later purely as a learning exercise, if there's time and interest after the required scope and bonus features above are done and stable. If it doesn't happen, no impact on submission.
- **Trending page pagination**: `useTrending()` can accept a `page` param the same way the other list hooks do (TMDB's `/trending/all/day` endpoint supports it) — the Trending page currently only shows page 1. Adding pagination controls (same pattern as Package A's Home page) is a simple follow-up for Mariam if there's time, not required.
- **Home page filter + sort (Movies/TV list)**: unlike the Wishlist version above, this one is NOT simple client-side filtering — the Home page only ever holds one API page of results at a time, so filtering/sorting only what's currently loaded would silently hide most of the catalog and mislead the user. Doing this properly means switching to (or adding) TMDB's `/discover/movie` (and `/discover/tv`) endpoint, which supports `sort_by` and `with_genres` as real query params, and building a new hook (or extending `useMovies`) to pass them through. This is a two-person job, not a solo add-on: Ammar would own the hook/data-layer change, Ibrahim would own the filter/sort UI and wiring it into the already-merged Home page. Given the risk of touching an already-shipped hook this late, only take this on if there's real time left and both are available to coordinate — otherwise leave it out entirely with no impact on submission.
