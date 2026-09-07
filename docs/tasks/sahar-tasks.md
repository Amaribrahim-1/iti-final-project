# Member B Tasks — Navbar + Search Results (Sahar)

This is **Package B — Navbar + Search Results** from the project spec. You build the app's Navbar (used on every page) and the Search Results page. These are **two separate features, so they get two separate branches and two separate Pull Requests** — don't build both in one branch. You work entirely inside your own branches and don't need to wait on Ibrahim, Shahd, or Mariam — you only depend on Ammar's foundation work, which is already merged into `main` before you start.

If anything about the hooks or data shapes below is unclear, ask Ammar in the group chat before guessing.

---

## Branch 1 of 2: `feature/navbar`

### Task 1 — Pull latest `main` and start your branch

- [ ] Pull the latest `main` branch (this brings in Ammar's foundation — routes, hooks, store, and shared components). "Pulling" means downloading the latest changes from the shared repo before you start your own work.
- [ ] Create your feature branch (a separate copy of the code you work on so you don't touch `main` directly) with the exact name: `feature/navbar`.
- [ ] Build the static Navbar layout inside the Layout component's Navbar slot (already set up by Ammar): logo, "Movies" and "TV Shows" nav links, a search input (not functional yet), a wishlist icon (static count for now), an "AI Movie Assistant" link, and a "Trending" link — use React Router's `<Link>` for all of these, pointing at the already-registered placeholder routes (`/`, `/search`, `/wishlist`, `/ai-assistant`, `/trending`).

**Acceptance criteria:** the Navbar shows on every page (because it lives in the shared Layout); every link navigates to the correct placeholder route without a full page reload.

**Commit now with message:** `feat: add static navbar layout with nav links`

### Task 2 — Wire the search input

- [ ] On submitting the search input (e.g. pressing Enter or clicking a search button), navigate to `/search?query=<the typed query>` using `useNavigate` from `react-router`.

**Acceptance criteria:** typing "batman" into the search box and submitting navigates the browser to `/search?query=batman`.

**Commit now with message:** `feat: wire search input to navigate to search results with query`

_Tasks 1 and 2 are a tightly related setup cluster — commit after each one individually (as above), but only push to the remote once Task 2 is done._

**Push now** (`git push -u origin feature/navbar`) — this covers Tasks 1 and 2.

### Task 3 — Live wishlist counter in the Navbar

- [ ] Select the wishlist array in the Navbar with `useWishlistStore((state) => state.wishlist)` from `/store/useWishlistStore.js` (a Zustand store — a small shared state container any component can read from).
- [ ] Display `wishlist.length` as a live counter next to the wishlist icon in the Navbar.
- [ ] Test that it updates immediately: toggle a heart icon on any card that already exists in the app (even a placeholder/foundation page), and confirm the Navbar counter changes right away without a refresh.

**Acceptance criteria:** toggling the heart icon on any `<MovieCard />` anywhere in the app updates the Navbar's wishlist counter instantly.

**Commit now with message:** `feat: wire live wishlist counter in navbar`

**Push now** — this covers Task 3.

### Task 4 — Styling pass (Navbar only)

- [ ] Compare the Navbar against the Figma file (`https://www.figma.com/file/jvGvsGLg6X3T7JPU3E2rNl/Movie-App`) and adjust spacing, colors, and responsive behavior (e.g. how the Navbar collapses on a narrow screen) to match — use the Tailwind design tokens Ammar set up (e.g. `bg-primary`) instead of picking your own colors.

**Acceptance criteria:** the Navbar visually matches the Figma reference closely on both desktop and a narrower (mobile-width) browser window.

**Commit now with message:** `style: polish navbar to match figma`

**Push now** — this covers Task 4.

### Task 5 — Dark/Light mode toggle button (only once Ammar's theme store is ready)

- [ ] Check with Ammar whether `useThemeStore()` in `/store/useThemeStore.js` has been merged into `main` yet. **If it hasn't**, skip this task for now and go straight to Task 6 (opening your PR) — you can come back and add this toggle later as one small extra commit on this same branch, pushed directly with no new PR needed (as long as the PR is still open/unmerged).
- [ ] If it has been merged: pull it into your branch, add a toggle button/switch to the Navbar, and wire it to `useThemeStore()` (following whatever toggle function Ammar's store exposes).

**Acceptance criteria:** clicking the toggle switches the site between light and dark mode, and the button is placed neatly among the other Navbar icons.

**Commit now with message:** `feat: add dark/light mode toggle to navbar`

**Push now** — this covers Task 5, if you did it.

### Task 6 — Open the Pull Request for the Navbar (final task of this branch)

- [ ] Push the branch if you haven't already (`git push -u origin feature/navbar`).
- [ ] Open a Pull Request (PR — a request asking the Team Leader to review and merge your branch into `main`) from `feature/navbar` into `main`.
- [ ] In the PR description, briefly state what you built (Navbar with live wishlist counter, and the dark mode toggle if you got to it) and attach a screenshot since this is a UI task. If you skipped Task 5, mention that the dark mode toggle will follow in a small separate commit once the theme store is ready.
- [ ] Tag Ammar as the reviewer.

This is the only Pull Request for the Navbar branch — if Ammar asks for changes, make the fix on this same `feature/navbar` branch, commit, and push again. The same PR updates automatically; you don't open a new one.

**Once Ammar merges this PR:** delete the `feature/navbar` branch, both locally (`git branch -d feature/navbar`) and on GitHub (`git push origin --delete feature/navbar`). Then pull the fresh `main` (it now includes your merged Navbar) before starting Branch 2 below.

---

## Branch 2 of 2: `feature/search-results`

### Task 7 — Pull latest `main` and start your second branch

- [ ] Pull the latest `main` branch (it now includes your merged Navbar work).
- [ ] Create your second feature branch with the exact name: `feature/search-results`.
- [ ] Open `pages/SearchResults/SearchResultsPage.jsx` (Ammar already created this empty file and linked it to `/search`). Read the `query` param from the URL using `useSearchParams` from `react-router`.
- [ ] Call `useSearchMovies(query, page)` from `/hooks/useSearchMovies.js` (import it exactly from that path) — it returns the standard shape `{ data, isPending, isError, error }`, with the array of results in `data.results`. Hardcode `page = 1` for now.
- [ ] While `isPending` is true, show `<Loader />` from `/components/Loader.jsx`. If `isError` is true, show `<ErrorState message="..." />` from `/components/ErrorState.jsx`.
- [ ] Render `data.results` as a grid of `<MovieCard item={item} mediaType="movie" />` from `/components/MovieCard.jsx` — this shared component already handles the poster, title, rating, and wishlist heart icon internally.

**Acceptance criteria:** navigating to `/search?query=batman` shows a grid of matching movie cards with posters, titles, and ratings.

**Commit now with message:** `feat: build search results page with usesearchmovies`

### Task 8 — Handle the empty/no-results state

- [ ] If `data.results` comes back as an empty array, show a clear message like "No results found for '{query}'" instead of an empty grid.

**Acceptance criteria:** searching for a nonsense query (e.g. "asdkfjalskdjf") shows the no-results message instead of a blank page.

**Commit now with message:** `feat: add empty state handling to search results page`

_Tasks 7 and 8 are a tightly related cluster — commit after each individually, but only push once Task 8 is done._

**Push now** (`git push -u origin feature/search-results`) — this covers Tasks 7 and 8.

### Task 9 — Styling pass (Search Results only)

- [ ] Compare the Search Results page against the Figma file (`https://www.figma.com/file/jvGvsGLg6X3T7JPU3E2rNl/Movie-App`) and adjust spacing, grid layout, and colors to match — use the Tailwind design tokens Ammar set up (e.g. `bg-primary`) instead of picking your own colors.

**Acceptance criteria:** the Search Results page visually matches the Figma reference closely on both desktop and a narrower (mobile-width) browser window.

**Commit now with message:** `style: polish search results page to match figma`

**Push now** — this covers Task 9.

### Task 10 — Open the Pull Request for Search Results (final task)

- [ ] Push the branch if you haven't already (`git push -u origin feature/search-results`).
- [ ] Open a Pull Request from `feature/search-results` into `main`.
- [ ] In the PR description, briefly state what you built (Search Results page with empty state) and attach a screenshot since this is a UI task.
- [ ] Tag Ammar as the reviewer.

This is the only Pull Request for the Search Results branch — if Ammar asks for changes, make the fix on this same `feature/search-results` branch, commit, and push again.

**Once Ammar merges this PR:** delete the `feature/search-results` branch, both locally and on GitHub, the same way you did for Navbar. That's Package B fully done.

---

## If you get stuck

Copy the exact task text above and paste it into any AI assistant and ask it to help you with just that one task — not the whole page at once. You can also ask in the team group chat if something about the hooks or data shape is unclear.
