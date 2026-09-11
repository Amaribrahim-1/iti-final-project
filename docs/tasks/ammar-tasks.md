# Team Leader Tasks — Foundation (Ammar)

This is the **Foundation** package (Section 5 of the spec). It has to be finished, tested, and merged into `main` before Ibrahim, Sahar, Shahd, and Mariam can start their own packages — they all build against the hooks, store, and components you create here. You work entirely on your own branch(es) below; nobody else touches this code.

There are four parts in this file: the **core foundation** (blocks the team, do this first), the **AI Movie Assistant**, the **Dark/Light Mode Toggle** (these two don't block anyone and can be done after you've handed out the task packages), and a **personal Team Leader README** at the end (not the training README — that's a separate file).

---

## Part 1 — Core Foundation (do this first, blocks the whole team)

### Task 1 — Project scaffolding

- [x] Pull the latest `main` branch (habit to start now, even if the repo is basically empty). Then create your branch: `feature/foundation-setup`.
- [x] Scaffold the app with Vite + React (JavaScript, no TypeScript).
- [x] Install and configure Tailwind CSS.
- [x] Set up the feature-based folder structure: `/pages`, `/components` (shared only), `/hooks`, `/store`, `/api`, `/utils`.
- [x] Add an ESLint + Prettier baseline config.
- [x] Create `.env.example` with `VITE_TMDB_API_KEY=` and `VITE_GEMINI_API_KEY=` (empty placeholders, no real keys).
- [x] Make sure `.env` itself is in `.gitignore` — never commit real keys.

**Acceptance criteria:** `npm run dev` runs a blank Vite+React page with no errors; all the empty folders exist; `.env` is gitignored; `.env.example` has both placeholder keys.

**Commit now with message:** `chore: scaffold vite project with tailwind and folder structure`

### Task 2 — Routing skeleton

- [x] Install `react-router` (latest version — note: this is the `react-router` package itself, not `react-router-dom`).
- [x] Register all routes with placeholder page components, using these exact file paths so the rest of the team knows exactly which file to open later: `pages/Home/HomePage.jsx` → `/`, `pages/MovieDetails/MovieDetailsPage.jsx` → `/movie/:id`, `pages/TVShowDetails/TVShowDetailsPage.jsx` → `/tv/:id`, `pages/SearchResults/SearchResultsPage.jsx` → `/search`, `pages/Wishlist/WishlistPage.jsx` → `/wishlist`, `pages/Trending/TrendingPage.jsx` → `/trending`, `pages/AIAssistant/AIAssistantPage.jsx` → `/ai-assistant`.
- [x] Build a `Layout` component with a Navbar slot (empty for now, Sahar fills it in later) and a page outlet (`<Outlet />`) for the routed page content.

**Acceptance criteria:** typing each route's URL directly in the browser renders that page's placeholder text (e.g. "Home Page") with no crash, and the Layout wraps every page.

**Commit now with message:** `feat: add routing skeleton and layout with placeholder pages`

### Task 3 — API layer

- [x] Create a single Axios instance configured with the TMDB base URL and API key (read from `import.meta.env.VITE_TMDB_API_KEY`).
- [x] Create the shared image-URL helper in `/utils` (e.g. `/utils/buildImageUrl.js`) that returns `https://image.tmdb.org/t/p/w500/${poster_path}` — this is the ONLY place that base URL should ever be written; no component should hardcode it.

**Acceptance criteria:** a quick manual test call (e.g. fetching popular movies in the browser console or a temp log) returns real TMDB data; the image helper returns a correct, working image URL when given a real `poster_path`.

**Commit now with message:** `feat: add axios instance and shared image url helper`

_Tasks 1–3 are a tightly related setup cluster — commit after each one individually (as above), but only push to the remote once Task 3 is done._

**Push now** (`git push -u origin feature/foundation-setup`) — this covers Tasks 1, 2, and 3.

### Task 4 — Data hooks: lists

- [x] Build `useMovies(page)` in `/hooks/useMovies.js` — TanStack Query hook, calls the popular movies TMDB endpoint (`/movie/popular` only, not now-playing), returns the standard shape `{ data, isPending, isError, error }` where `data.results` is an array of movie objects. Supports pagination via the `page` argument.
- [x] Build `useTVShows(page)` in `/hooks/useTVShows.js` — same shape, but for the popular TV shows endpoint.

**Acceptance criteria:** calling either hook from a temporary test component and logging `data` shows a real array of movies/TV shows for page 1, and a _different_ array when you pass page 2.

**Commit now with message:** `feat: add useMovies and useTVShows list hooks`

### Task 5 — Data hooks: details

- [x] Build `useMovieDetails(id)` in `/hooks/useMovieDetails.js` — returns a single movie object with full details (`title`, `release_date`, `runtime`, etc.), same `{ data, isPending, isError, error }` shape.
- [x] Build `useTVShowDetails(id)` in `/hooks/useTVShowDetails.js` — returns a single TV show object, but with the TV field names (`name`, `first_air_date`, `number_of_seasons`, `number_of_episodes`) instead of the movie ones. These are deliberately two separate hooks, not one generic "details" hook — keeps each consumer simple.

**Acceptance criteria:** passing a real movie id / TV show id into each hook returns the correct full object with those exact fields.

**Commit now with message:** `feat: add useMovieDetails and useTVShowDetails hooks`

### Task 6 — Data hooks: recommendations, reviews, search

- [x] Build `useMovieRecommendations(movieId)` in `/hooks/useMovieRecommendations.js` — `data.results` is an array of recommended movies for that movie id.
- [x] Build `useMovieReviews(movieId)` in `/hooks/useMovieReviews.js` — `data.results` is an array of review objects for that movie id.
- [x] Build `useTVShowRecommendations(tvId)` in `/hooks/useTVShowRecommendations.js` — calls TMDB's `/tv/{id}/recommendations` endpoint, same shape as `useMovieRecommendations` but `data.results` is an array of recommended TV shows. Shahd's TV Show Details page (Package C) needs this for its recommendations row, mirroring the movie one.
- [x] Build `useTVShowReviews(tvId)` in `/hooks/useTVShowReviews.js` — calls TMDB's `/tv/{id}/reviews` endpoint, same shape as `useMovieReviews` but `data.results` is an array of review objects for that TV show. Shahd's TV Show Details page needs this for its reviews list.
- [x] Build `useSearchMovies(query, page)` in `/hooks/useSearchMovies.js` — `data.results` is an array of movie search results, paginated.

**Acceptance criteria:** each hook returns real, correct data for a known movie id / TV show id / search query when tested manually.

**Commit now with message:** `feat: add recommendations, reviews, and search hooks for movies and tv`

### Task 7 — Data hook: `useTrending()` (bonus, unblocks Mariam)

- [x] Build `useTrending()` in `/hooks/useTrending.js` — calls TMDB's `/trending/all/day` endpoint. `data.results` is a **mixed** array of movies and TV shows; each item already has a `media_type` field from TMDB itself (`"movie"` or `"tv"`) — don't add your own, just pass it through.

**Acceptance criteria:** `data.results` contains a mix of items where some have `media_type: "movie"` and some `media_type: "tv"`.

**Commit now with message:** `feat: add useTrending hook for trending page`

_Tasks 4–7 are the data-hooks cluster — commit after each, push once all four are done._

**Push now** — this covers Tasks 4, 5, 6, and 7.

### Task 8 — Wishlist store (Zustand)

- [x] Build the Zustand store behind `useWishlistStore()` in `/store/useWishlistStore.js`, exposing:
  - `wishlist` — array of `{ ...item, media_type: 'movie' | 'tv' }`, selected like `useWishlistStore((state) => state.wishlist)`.
  - `toggleWishlist` — `(item, mediaType) => void`, adds the item if it's absent, removes it if it's already there.
  - `isInWishlist` — `(id, mediaType) => boolean`.
  - `removeFromWishlist` — `(id, mediaType) => void`.

**Acceptance criteria:** from a temporary test button, calling `toggleWishlist` adds an item, calling it again on the same id+mediaType removes it, and `isInWishlist` correctly reflects the current state.

**Commit now with message:** `feat: add wishlist zustand store`

### Task 9 — Shared components: Loader and ErrorState

- [x] Build `<Loader />` in `/components/Loader.jsx` — a simple, reusable loading indicator.
- [x] Build `<ErrorState message />` in `/components/ErrorState.jsx` — a simple, reusable error message display, taking a `message` prop (prop = a piece of data passed into a component).
- [x] These must be used everywhere a query is loading or has failed — no one-off spinners anywhere in the app.

**Acceptance criteria:** dropping `<Loader />` and `<ErrorState message="test" />` into a temporary page renders correctly and looks intentional, not placeholder-y.

**Commit now with message:** `feat: add shared loader and error state components`

### Task 10 — Shared component: MovieCard

- [x] Build `<MovieCard item={movieOrTvObject} mediaType="movie" | "tv" />` in `/components/MovieCard.jsx` — shows poster, title, formatted date (via `formatDate`), a circular percent rating ring, and a heart icon wired to `toggleWishlist` / `isInWishlist` from `useWishlistStore()`. The heart fills with the site's primary color when the item is already in the wishlist. The poster + title are wrapped in one inner `Link` to the details page — the card is not meant to be wrapped in another `Link` by whoever consumes it. Props stay exactly `item` + `mediaType`.
- [x] This one component gets reused everywhere: Home page, Search Results, recommendations, Wishlist page, Trending page — so keep its props exactly as specified above, don't add required props that would break a future consumer.

**Acceptance criteria:** rendering `<MovieCard />` with a real movie object shows poster/title/rating correctly; clicking the heart toggles it filled/unfilled and actually updates the wishlist store.

> **Note:** The shared-components set later grew beyond the original three (`Loader`, `ErrorState`, `MovieCard`). `Pagination.jsx` (built during Ibrahim's Home page task, reused by Search Results and Trending) and `ReviewsList.jsx` (built during Shahd's TV Details task, reused by both details pages) now also live in `src/components/`. `docs/team-guide.md` does not mention either yet — worth a follow-up doc update.

**Commit now with message:** `feat: add shared moviecard component with wishlist toggle`

_Tasks 8–10 are the state + shared-components cluster — commit after each, push once all three are done._

**Push now** — this covers Tasks 8, 9, and 10.

### Task 11 — Design tokens from Figma

- [x] Open the Figma file (`https://www.figma.com/file/jvGvsGLg6X3T7JPU3E2rNl/Movie-App`) and extract the real design system: primary color, background color, text colors, any accent/rating/error colors, and typography (font family, sizes).
- [x] Wire these into `@theme` in `src/index.css` as custom theme values (Tailwind v4 — there is no `tailwind.config.js`), so the rest of the team styles against real values instead of guessing colors.

**Acceptance criteria:** `src/index.css` `@theme` has named custom colors/fonts matching Figma (e.g. `--color-primary`, `--color-background`, `--color-error`), and you can use them as Tailwind classes (e.g. `bg-primary`).

**Commit now with message:** `feat: extract figma design tokens into tailwind theme`

### Task 12 — Sync docs with the real foundation code

- [x] Re-read the actual code as it exists right now on `feature/foundation-setup` (`package.json`, `src/App.jsx`, `src/api/`, `src/hooks/`, `src/store/useWishlistStore.js`, `src/components/`, `src/index.css`, `src/main.jsx`) — the docs below were written from the original plan before Tasks 1–11 were built, so a few details have drifted from what's actually there now. Trust the real code over the old wording wherever they disagree.
- [x] Update `docs/movie-app-spec.md`: team table (Wishlist Page belongs to Mariam, not Sahar), routing is `react-router` (v8) not "React Router DOM" (there is no `react-router-dom` package), `useMovies` calls the popular endpoint only, document the `data` shape difference between list vs. details hooks, `useSearchMovies`'s `enabled: Boolean(query)`, `useTrending()` taking no `page` argument, the real `MovieCard` behavior (date, percent rating ring, inner `Link` — never wrap it in another `Link`), the wishlist store's `persist` middleware (and the same decision for the future theme store), and the real `@theme` tokens in `src/index.css` (no `tailwind.config.js`, no `accent` token).
- [x] Update `.cursor/rules/stack-conventions.mdc`: same `react-router` fix, swap the made-up `movieApi.js` naming example for the real `getMovies.js` / `searchMovies.js` pattern, and swap the made-up `API_BASE_URL` constant example for the real `TMDB_BASE_URL` / `IMAGE_BASE_URL`.
- [x] In this file (further down): fix Task 2's wording (installed package is `react-router`, not `react-router-dom`), Task 4 (popular endpoint only, not now-playing/popular), Task 10 (`MovieCard` description matches the real UI — link, date, rating ring — props stay `item` + `mediaType`), and Task 18 (theme store uses `persist` middleware like the wishlist, not manual `localStorage`).
- [x] Fix `from 'react-router-dom'` → `from 'react-router'` in `docs/tasks/ibrahim-tasks.md` (`useSearchParams`), `docs/tasks/sahar-tasks.md` (`useNavigate`, `useSearchParams`), `docs/tasks/shahd-tasks.md` (`useParams`), and `docs/tasks/mariam-tasks.md` (`useSearchParams`) — keep each teammate's own hook-teaching intact, only the package name changes.
- [x] Update `foundation-docs.md` (the prompt for the later chat that writes `docs/team-guide.md` in Task 13 below) so it matches the real code before that chat runs: the full real list of ten hooks (including TV recommendations/reviews and `useTrending`), real token names instead of the made-up `text-accent`, mention `Layout` and `formatDate`, the wishlist `persist` middleware as implemented, and a short note that `<Toaster />` already lives in `src/main.jsx` (`toast` = confirmations only, never a replacement for `<Loader />` / `<ErrorState />`).

**Acceptance criteria:** every doc file listed above describes the code exactly as it exists today on `feature/foundation-setup` — no teammate task file still imports from `react-router-dom`, and the spec, the stack-conventions rule, and this task file no longer contradict the real hooks, store, or `MovieCard` behavior.

**Commit now with message:** `docs: sync spec and task docs with actual foundation code`

### Task 13 — Team documentation

- [x] Write `docs/team-guide.md` covering: the folder structure, naming conventions, and exactly how to consume every hook/store/component listed above (with real import paths and usage examples).

**Acceptance criteria:** a teammate with no other context could read `docs/team-guide.md` and correctly import and use `useMovies`, `useWishlistStore`, and `<MovieCard />` without asking you anything.

**Commit now with message:** `docs: add team guide for folder structure and shared contracts`

### Task 14 — Repo setup and handoff (final task of Part 1)

- [x] Make sure you've tested everything above yourself in the browser — every hook returns real data, the wishlist store works, `<MovieCard />` toggles correctly, and all placeholder routes render.
- [x] Push the branch (`git push -u origin feature/foundation-setup`) if you haven't already.
- [x] Open a Pull Request (PR — a request to merge your branch's changes into `main`) from `feature/foundation-setup` into `main`, with a short description of everything built.
- [x] Since you're the Team Leader and there's no one else to review your own foundation PR, merge it into `main` yourself once you've re-checked it.
- [x] Only after merging: hand out the task packages to Ibrahim, Sahar, Shahd, and Mariam, and tell them to pull the new `main` before creating their branches.
- [x] Delete the `feature/foundation-setup` branch, both locally (`git branch -d feature/foundation-setup`) and on GitHub (`git push origin --delete feature/foundation-setup`) — keeps the branch list clean before you start Part 2.

This is the only PR for the **core foundation** part of this file. The AI Assistant and Dark Mode parts below each get their own separate branch and PR later — same one-branch-per-feature rule you're asking the rest of the team to follow.

---

## Part 2 — AI Movie Assistant (after the core foundation is merged, doesn't block anyone)

### Task 15 — Chat UI

- [ ] Pull the latest `main` (now includes your merged foundation). Create branch: `feature/ai-movie-assistant`.
- [ ] Build the chat UI on the `/ai-assistant` route (already registered in Task 2): a message list that visually distinguishes user messages from AI messages, a text input + send button, a loading state while waiting for a response, and a graceful error message (using `<ErrorState />`) if something fails.
- [ ] Wire it to local component state only for now — no real Gemini calls yet, just fake/echoed responses to prove the UI works.

**Acceptance criteria:** typing a message and hitting send adds it to the message list, shows a loading state briefly, then shows a fake AI reply, all visually distinct.

**Commit now with message:** `feat: add ai movie assistant chat ui`

### Task 16 — Gemini API integration

- [ ] Wire the chat to the real Gemini API, reading the key from `import.meta.env.VITE_GEMINI_API_KEY`.
- [ ] Send the current message plus the prior conversation turns (so it's a real multi-turn conversation, not single-shot).
- [ ] Write a system prompt that restricts the assistant to movie/TV topics only — off-topic questions should get a polite redirect back to movie/TV topics.

**Acceptance criteria:** asking a real movie question gets a relevant real answer; asking something clearly off-topic (e.g. "what's the weather today") gets a polite redirect instead of an answer; asking a follow-up question that depends on the previous message works correctly (proves conversation history is being sent).

**Commit now with message:** `feat: integrate gemini api with movie-restricted system prompt`

### Task 17 — Final polish and PR (final task of Part 2)

- [ ] Test the full conversation flow yourself in the browser: multi-turn conversation, off-topic redirect, loading state, and a deliberate API error (e.g. temporarily break the key) to confirm the error state shows gracefully.
- [ ] Push the branch, open a PR from `feature/ai-movie-assistant` into `main` describing the chatbot and its system prompt, then merge it yourself once you've re-checked it.
- [ ] Delete the `feature/ai-movie-assistant` branch, both locally and on GitHub, before starting Part 3.

This is the only PR for the AI Movie Assistant part of this file.

---

## Part 3 — Dark/Light Mode Toggle (bonus, low-risk, can be done any time)

### Task 18 — Theme store and Tailwind wiring

- [ ] Pull the latest `main`. Create branch: `feature/dark-mode-toggle`.
- [ ] Build `useThemeStore()` (Zustand) in `/store/useThemeStore.js` holding the current theme (`'light'` or `'dark'`), persisted with `persist` from `zustand/middleware` — same pattern as the wishlist store (Task 8), not a hand-rolled `localStorage` read/write.
- [ ] Configure Tailwind for `dark:` variant classes, and apply the `dark` class to the root HTML element based on the store's current value.
- [ ] Add the toggle control itself somewhere temporary for now (real placement inside the Navbar is Task 19) — coordinate the final placement with Sahar since the Navbar is her package.

**Acceptance criteria:** clicking the toggle switches the theme and any element using a `dark:` class visibly changes; refreshing the page keeps the theme you last picked (because of `localStorage`).

**Commit now with message:** `feat: add theme store with dark mode tailwind support`

### Task 19 — Navbar placement and final PR (final task of Part 3)

- [ ] Coordinate with Sahar to place the actual toggle control inside the real Navbar (once her Navbar work exists) — if her Navbar isn't merged yet, leave the toggle in a temporary spot for now and revisit this specific step later; it doesn't block the PR below.
- [ ] Test the toggle + persistence once more in the browser.
- [ ] Push the branch, open a PR from `feature/dark-mode-toggle` into `main` describing the theme store and toggle, then merge it yourself once re-checked.
- [ ] Delete the `feature/dark-mode-toggle` branch, both locally and on GitHub, once merged — same habit as the other two branches above.

This is the only PR for the Dark/Light Mode part of this file.

---

## Part 4 — Personal README (not the training one)

The course/assignment still wants a normal project `README.md` (what the app is, how to run it, the stack). **That file is separate.** This part is a write-up for *you*: what you actually did as Team Leader, in your own words, so you can reuse it in the graduation defense and when someone asks "what was your role?"

### Task 20 — Write a Team Leader README about the GitHub / PR work

- [ ] Pull the latest `main`. Create branch: `docs/ammar-team-lead-readme`.
- [ ] Create `docs/ammar-team-lead.md` — do **not** overwrite the project `README.md` the training asks for.
- [ ] Write it in your own words (Arabic or English, whatever you'll actually say out loud). Keep it short and concrete. Focus on what **you** did as Team Leader, not a list of every feature the app has. Cover at least:
  - how the team worked on **feature branches** (one package / one branch / one PR)
  - how a teammate opened a **Pull Request** into `main`, and what you checked before merging (does it match the task? does the page work in the browser?)
  - one or two real examples from this project (e.g. reviewing Shahd's Movie Details / TV Details PRs, merging Mariam's Trending PR, leaving notes on a PR)
  - what you did after a merge (`git checkout main`, `git pull`, deleting the old branch) so everyone stayed on the same `main`
- [ ] Do **not** turn it into a Git tutorial, and do **not** copy-paste command dumps. Write it like you're explaining your role to an instructor in 2–3 minutes.

**Acceptance criteria:** `docs/ammar-team-lead.md` exists next to the normal project README (not instead of it); someone reading only this file can tell you were the Team Leader and that your main extra work was GitHub + reviewing/merging PRs, not just writing foundation code.

**Commit now with message:** `docs: add personal team-lead readme about github and prs`

**Push now** (`git push -u origin docs/ammar-team-lead-readme`).

- [ ] Open a Pull Request from `docs/ammar-team-lead-readme` into `main`, then merge it yourself once you've re-read the file and it sounds like you.
- [ ] Delete the `docs/ammar-team-lead-readme` branch, both locally and on GitHub, once merged.

This is the only PR for this personal README. The training `README.md` (app setup / how to run) stays its own task whenever the course asks for it — don't mix the two files.

---

