# Member A Tasks — Home Page (Ibrahim)

This is **Package A — Home Page** from the project spec. You build the main landing page with Movies/TV tabs and pagination. You work entirely inside your own branch and don't need to wait on Sahar, Shahd, or Mariam — you only depend on Ammar's foundation work, which is already merged into `main` before you start.

If anything about the hooks or data shapes below is unclear, ask Ammar in the group chat before guessing.

Note: unlike Sahar's, Shahd's, and Mariam's packages (which each cover two separate pages and are split into two branches/PRs), your whole package is genuinely **one page** — Movies and TV Shows are just tabs inside the same Home page, not two separate pages/routes. So this stays a single branch and a single PR, start to finish.

---

### Task 1 — Pull latest `main` and start your branch

- [ ] Pull the latest `main` branch (this brings in Ammar's foundation — routes, hooks, store, and shared components). "Pulling" means downloading the latest changes from the shared repo before you start your own work.
- [ ] Create your feature branch (a separate copy of the code you work on so you don't touch `main` directly) with the exact name: `feature/home-page`.
- [ ] Open `pages/Home/HomePage.jsx` (Ammar already created this empty file and linked it to `/`). Build the page skeleton for the Home page: two tabs labeled "Movies" and "TV Shows" with basic Tailwind styling (no data yet, just the tab buttons and an empty content area below them). Use local component state (`useState`) to track which tab is active.

**Acceptance criteria:** the Home page shows two clickable tab buttons; clicking either one visually highlights it as active (e.g. different background color), even though no movie data shows yet.

**Commit now with message:** `feat: add home page skeleton with movies/tv tabs`

### Task 2 — Wire tab switching to the URL

- [ ] Make the active tab reflected in the URL as a query param (e.g. `?tab=movies` or `?tab=tv`) using `useSearchParams` from `react-router`, so the tab survives a page refresh.
- [ ] Clicking a tab updates both the active tab state and the URL.

**Acceptance criteria:** clicking "TV Shows" changes the URL to include `?tab=tv`; refreshing the page on that URL keeps "TV Shows" selected as active.

**Commit now with message:** `feat: sync active tab with url query param`

_Tasks 1 and 2 are a tightly related setup cluster — commit after each one individually (as above), but only push to the remote once Task 2 is done._

**Push now** (`git push -u origin feature/home-page`) — this covers Tasks 1 and 2.

### Task 3 — Fetch and render the grid

- [ ] For the Movies tab, use `useMovies(page)` from `/hooks/useMovies.js` (import it exactly from that path). It returns the standard shape `{ data, isPending, isError, error }`; the array of movies is in `data.results`.
- [ ] For the TV Shows tab, use `useTVShows(page)` from `/hooks/useTVShows.js` the same way.
- [ ] For now, hardcode `page = 1` (real pagination comes in Task 4). While `isPending` is true, show `<Loader />` from `/components/Loader.jsx`. If `isError` is true, show `<ErrorState message="..." />` from `/components/ErrorState.jsx`.
- [ ] Render `data.results` as a responsive grid of `<MovieCard item={item} mediaType="movie" />` (or `"tv"` for the TV tab) from `/components/MovieCard.jsx` — this shared component already handles the poster, title, date, rating ring, and wishlist heart icon internally, and already navigates to `/movie/:id` or `/tv/:id` via its own inner `Link` — don't wrap it in another `Link` yourself. Pass `"movie"` or `"tv"` to match the active tab.

**Acceptance criteria:** switching tabs shows a real grid of movie posters or TV show posters (whichever tab is active); a slow network (or DevTools throttling) briefly shows `<Loader />` first.

**Commit now with message:** `feat: fetch and render movies/tv grid with usemovies and usetvshows`

### Task 4 — Real pagination via URL

- [ ] Add "Previous" and "Next" pagination buttons below the grid.
- [ ] Track the current page as a URL query param (e.g. `?page=2`) using `useSearchParams`, and pass that page number into `useMovies(page)` / `useTVShows(page)` from Task 3 (replacing the hardcoded `1`).
- [ ] Disable "Previous" on page 1. "Next" should just keep incrementing (TMDB pagination doesn't require you to know the exact last page up front).

**Acceptance criteria:** clicking "Next" updates both the grid and the URL (e.g. to `?page=2`); using the browser's back button returns to the previous page's results; refreshing on `?page=2` loads page 2 directly, not page 1.

**Commit now with message:** `feat: add pagination controls synced with page url query param`

_Tasks 3 and 4 are a tightly related cluster — commit after each individually, but only push once Task 4 is done._

**Push now** — this covers Tasks 3 and 4.

### Task 5 — Verify the wishlist heart icon

- [ ] `<MovieCard />` already wires its own heart icon to `toggleWishlist` and `isInWishlist` from `useWishlistStore()` — you don't need to write that logic yourself. This task is just to verify it actually works correctly inside your grid.
- [ ] Click the heart on a few different cards across both tabs and pages. Confirm each heart fills in when clicked and stays filled after switching tabs and coming back. Fix anything that looks wrong (e.g. wrong item's card reacting, or layout shifting oddly when the heart fills).

**Acceptance criteria:** toggling the heart on any card in the grid correctly reflects the wishlist state, and switching tabs/pages and coming back shows the correct filled/unfilled state for every card.

**Commit now with message:** `fix: verify wishlist heart icon behavior across home page grid`

### Task 6 — Styling pass

- [ ] Compare your Home page against the Figma file (`https://www.figma.com/file/jvGvsGLg6X3T7JPU3E2rNl/Movie-App`) and adjust spacing, grid columns (responsive across screen sizes), tab styling, and colors to match — use the Tailwind design tokens Ammar set up (e.g. `bg-primary`) instead of picking your own colors.

**Acceptance criteria:** the Home page visually matches the Figma reference closely on both desktop and a narrower (mobile-width) browser window.

**Commit now with message:** `style: polish home page layout to match figma design`

_Tasks 5 and 6 are a small polish cluster — commit after each individually, but only push once Task 6 is done._

**Push now** — this covers Tasks 5 and 6.

### Task 7 — Open the Pull Request (final task)

- [ ] Push the branch if you haven't already (`git push -u origin feature/home-page`).
- [ ] Open a Pull Request (PR — a request asking the Team Leader to review and merge your branch into `main`) from `feature/home-page` into `main`.
- [ ] In the PR description, briefly state what you built (Home page with Movies/TV tabs, pagination, wishlist toggling) and attach a screenshot since this is a UI task.
- [ ] Tag Ammar as the reviewer.

This is the only Pull Request for this whole package — if Ammar asks for changes, make the fix on this same `feature/home-page` branch, commit, and push again. The same PR updates automatically; you don't open a new one.

---

## If you get stuck

Copy the exact task text above and paste it into any AI assistant and ask it to help you with just that one task — not the whole page at once. You can also ask in the team group chat if something about the hooks or data shape is unclear.
