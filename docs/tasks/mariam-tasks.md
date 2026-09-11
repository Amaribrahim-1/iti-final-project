# Member D Tasks — Wishlist Page + Trending Page (Mariam)

This is **Package D — Wishlist Page + Trending Page (bonus feature)** from the project spec. You build both pages. These are **two separate pages, so they get two separate branches and two separate Pull Requests** — don't build both in one branch. You work entirely inside your own branches and don't need to wait on Ibrahim, Sahar, or Shahd — you only depend on Ammar's foundation work, which is already merged into `main` before you start.

If anything about `useTrending()`'s data shape is unclear, ask Ammar in the group chat before guessing.

---

## Branch 1 of 2: `feature/wishlist-page`

### Task 1 — Pull latest `main` and build the Wishlist page listing

- [x] Pull the latest `main` branch (this brings in Ammar's foundation — routes, hooks, store, and shared components). "Pulling" means downloading the latest changes from the shared repo before you start your own work.
- [x] Create your feature branch (a separate copy of the code you work on so you don't touch `main` directly) with the exact name: `feature/wishlist-page`.
- [x] Open `pages/Wishlist/WishlistPage.jsx` (Ammar already created this empty file and linked it to `/wishlist`). Select the wishlist array with `useWishlistStore((state) => state.wishlist)` from `/store/useWishlistStore.js` (a Zustand store — a small shared state container any component can read from). Each item in the array looks like `{ ...item, media_type: 'movie' | 'tv' }`.
- [x] Render the wishlist as a list/grid. For each item, show a small badge that says "Movie" or "TV Show" based on that item's `media_type` field, so movies and TV shows are clearly distinguished.

**Acceptance criteria:** navigating to `/wishlist` shows every item currently in the wishlist store, each with a correct "Movie" or "TV Show" badge. (To test this, toggle a few hearts on any already-built page, or ask a teammate to check once other pages exist.)

> **Note:** A later fix addressed a nested `<main>` HTML issue (the page rendered its own `<main>` while the shared `Layout` already provides one) plus a badge-contrast accessibility fix (`fix(wishlist): fix badge contrast, nested main, and row alignment`).

**Commit now with message:** `feat: build wishlist page listing with movie/tv badges`

### Task 2 — Wishlist remove action

- [x] Add a remove button to each item in the Wishlist page, wired to `removeFromWishlist(id, mediaType)` from `/store/useWishlistStore.js` — pass both the item's real id AND its `media_type` (not just the id), since a movie and a TV show can share the same numeric id.

**Acceptance criteria:** clicking remove on one item removes exactly that item from the list, and doesn't accidentally remove a different movie/TV show that happens to share the same id.

> **Note:** A later fix also made the empty-state "Back to home" link navigate correctly (`fix: make back to home button navigate correctly`).

**Commit now with message:** `feat: add remove action to wishlist page items`

### Task 3 — Empty wishlist state

- [x] If the wishlist array is empty, show a friendly message (e.g. "Your wishlist is empty — go add some movies or shows!") instead of a blank page.

**Acceptance criteria:** removing every item from the wishlist (or starting with none) shows the empty-state message instead of an empty grid.

**Commit now with message:** `feat: add empty state to wishlist page`

_Tasks 1–3 build the whole Wishlist page and are tightly related — commit after each one individually (as above), but only push to the remote once Task 3 is done._

**Push now** (`git push -u origin feature/wishlist-page`) — this covers Tasks 1, 2, and 3.

### Task 4 — Styling pass (Wishlist page only)

- [x] Compare the Wishlist page against the Figma file (`https://www.figma.com/file/jvGvsGLg6X3T7JPU3E2rNl/Movie-App`) and adjust spacing, badge styling, grid layout, and colors to match — use the Tailwind design tokens Ammar set up (e.g. `bg-primary`) instead of picking your own colors.

**Acceptance criteria:** the Wishlist page visually matches the Figma reference closely on both desktop and a narrower (mobile-width) browser window.

**Commit now with message:** `style: polish wishlist page to match figma`

**Push now** — this covers Task 4.

### Task 5 — Open the Pull Request for Wishlist Page (final task of this branch)

- [x] Push the branch if you haven't already (`git push -u origin feature/wishlist-page`).
- [x] Open a Pull Request (PR — a request asking the Team Leader to review and merge your branch into `main`) from `feature/wishlist-page` into `main`.
- [x] In the PR description, briefly state what you built (Wishlist page with remove + empty state) and attach a screenshot since this is a UI task.
- [x] Tag Ammar as the reviewer.

This is the only Pull Request for the Wishlist Page branch — if Ammar asks for changes, make the fix on this same `feature/wishlist-page` branch, commit, and push again. The same PR updates automatically; you don't open a new one.

**Once Ammar merges this PR:** delete the `feature/wishlist-page` branch, both locally (`git branch -d feature/wishlist-page`) and on GitHub (`git push origin --delete feature/wishlist-page`). Then pull the fresh `main` before starting Branch 2 below.

---

## Branch 2 of 2: `feature/trending-page`

### Task 6 — Pull latest `main` and build the Trending page grid

- [x] Pull the latest `main` branch (it now includes your merged Wishlist page).
- [x] Create your second feature branch with the exact name: `feature/trending-page`.
- [x] Open `pages/Trending/TrendingPage.jsx` (Ammar already created this empty file and linked it to `/trending`). Call `useTrending()` from `/hooks/useTrending.js` (import it exactly from that path, no arguments needed) — it returns the standard shape `{ data, isPending, isError, error }`. `data.results` is a **mixed** array of movies and TV shows, and TMDB already includes a `media_type` field (`"movie"` or `"tv"`) on every item — you don't need to add it yourself.
- [x] While `isPending` is true, show `<Loader />` from `/components/Loader.jsx`. If `isError` is true, show `<ErrorState message="..." />` from `/components/ErrorState.jsx`.
- [x] Render `data.results` as a grid of `<MovieCard item={item} mediaType={item.media_type} />` from `/components/MovieCard.jsx` — this shared component already handles the poster, title, date, rating ring, and wishlist heart icon internally, and already navigates to `/movie/:id` or `/tv/:id` via its own inner `Link` — don't wrap it in another `Link` yourself. Pass each item's own real `media_type` here, not a hardcoded `"movie"`.

**Acceptance criteria:** `/trending` shows a single grid mixing movie posters and TV show posters together, all with correct titles and ratings.

> **Note:** `/trending/all/day` can return `"person"` items (no poster/title) mixed in with movies/TV. A filter was added to keep only `media_type === 'movie' | 'tv'`, the grid classes were aligned with the Home page grid for visual consistency, and the page content was wrapped in a semantic `<section>` landmark (`fix(trending): skip people, match home grid, use section landmark`).

**Commit now with message:** `feat: build trending page grid using usetrending`

**Optional (not required — skip this if you want, no impact on your PR):** If you'd like to practice pagination the same way Ibrahim does on the Home page, you can add Previous/Next buttons after the grid from Task 6 is working.

- [x] Optional pagination (implemented in the merged code).

How, in short:
1. In `TrendingPage.jsx`, read the current page from the URL with `useSearchParams` from `react-router` (e.g. `/trending?page=2`). You don't need a separate `useState` for the page number — the URL is the source of truth. Pass that number into `useTrending(page)`.
2. Add "Previous" / "Next" buttons under the grid. Disable Previous on page 1. Next just increments. Clicking them should update the URL so a refresh and the browser back button keep the right page.
3. `useTrending()` and `getTrending()` currently take no arguments and always fetch page 1. To support this, change them the same way `useMovies(page)` / `getMovies(page)` already work:
   - In `src/api/getTrending.js`, make `getTrending(page)` call `/trending/all/day` with `params: { page }`.
   - In `src/hooks/useTrending.js`, make `useTrending(page)` use `queryKey: ['trending', page]` and call `getTrending(page)`.
   Message Ammar in the group before you edit those two files so he knows the hook contract is changing.

If you skip this, calling `useTrending()` with no arguments is still correct — the page just shows page 1.

If you do it: make a **new commit** on this same `feature/trending-page` branch (do not fold it into the Task 6 commit) with message: `feat: add trending page pagination`. Do **not** open a separate Pull Request — this goes out with the same Trending Page PR. If that PR is already open, just push the extra commit and the PR updates automatically. Then continue with Task 7.

> **Note:** This optional block was done. `getTrending(page)` / `useTrending(page)` now take a `page` argument exactly as described, `TrendingPage.jsx` reads `?page=` via `useSearchParams`, and pagination reuses the same shared `<Pagination />` component Ibrahim built for Home (`feat(trending): add pagination with url page param`).

### Task 7 — Correct movie/TV routing per card

- [x] `<MovieCard />` already links each card to the right detail page based on the `mediaType` prop you pass it — this task is to verify that actually works correctly for every card in your mixed grid, since it's easy to accidentally pass the wrong prop somewhere.
- [x] Click a few movie cards and a few TV show cards in the Trending grid. Confirm movie cards go to `/movie/:id` and TV show cards go to `/tv/:id`. Fix anything that routes to the wrong page.

**Acceptance criteria:** every movie card in the Trending grid navigates to `/movie/:id`, and every TV show card navigates to `/tv/:id`, matching each item's real `media_type`.

**Commit now with message:** `fix: ensure trending cards route to correct movie or tv detail page`

_Tasks 6 and 7 are a tightly related cluster — commit after each individually, but only push once Task 7 is done._

**Push now** (`git push -u origin feature/trending-page`) — this covers Tasks 6 and 7.

### Task 8 — Styling pass (Trending page only)

- [x] Compare the Trending page against the Figma file (`https://www.figma.com/file/jvGvsGLg6X3T7JPU3E2rNl/Movie-App`) and adjust spacing, grid layout, and colors to match — use the Tailwind design tokens Ammar set up (e.g. `bg-primary`) instead of picking your own colors. (Trending isn't in the original Figma requirements, so style it consistently with the rest of the app using the same design tokens.)

**Acceptance criteria:** the Trending page visually matches the rest of the app closely on both desktop and a narrower (mobile-width) browser window.

**Commit now with message:** `style: polish trending page to match app design`

**Push now** — this covers Task 8.

### Task 9 — Open the Pull Request for Trending Page (final task)

- [x] Push the branch if you haven't already (`git push -u origin feature/trending-page`).
- [x] Open a Pull Request from `feature/trending-page` into `main`.
- [x] In the PR description, briefly state what you built (Trending page with mixed movie/TV grid and correct routing) and attach a screenshot since this is a UI task.
- [x] Tag Ammar as the reviewer.

This is the only Pull Request for the Trending Page branch — if Ammar asks for changes, make the fix on this same `feature/trending-page` branch, commit, and push again.

**Once Ammar merges this PR:** delete the `feature/trending-page` branch, both locally and on GitHub, the same way you did for Wishlist. That's Package D fully done.

---

## If you get stuck

Copy the exact task text above and paste it into any AI assistant and ask it to help you with just that one task — not the whole page at once. You can also ask in the team group chat if something about the hooks or data shape is unclear.
