# Team Guide

This file is your reference for how to build your page/feature on top of the
foundation that's already in `main`. Everything below is copied from the
**real code as it exists right now** — not from the original plan. If
something here ever looks different from the actual file, trust the file,
not this doc.

---

## 1. Getting started

```bash
git clone https://github.com/Amaribrahim-1/iti-final-project.git
cd iti-final-project
npm install
```

Run these commands inside a terminal (any terminal works — the one built
into VS Code, PowerShell, cmd, or Git Bash). `git clone` downloads the repo
into a new folder named `iti-final-project` (the last part of the GitHub
URL). `cd iti-final-project` means "move into that folder" — you have to
be inside it before running `npm install`, otherwise it won't find
`package.json`.

Create your own `.env` file in the project root (copy `.env.example`) and
fill in your real keys — never commit this file, it's already gitignored:

```
VITE_TMDB_API_KEY=your_real_tmdb_key
VITE_GEMINI_API_KEY=your_real_gemini_key
```

Run the dev server:

```bash
npm run dev
```

Other useful scripts: `npm run lint`, `npm run format`, `npm run build`.

---

## 2. Folder structure & where things go

This is the actual folder layout that exists in the repo **right now**
(none of the pages have their own `/components` subfolder yet, because no
page-only component has been built yet):

```
/pages
  /Home
    HomePage.jsx
  /MovieDetails
    MovieDetailsPage.jsx
  /TVShowDetails
    TVShowDetailsPage.jsx
  /SearchResults
    SearchResultsPage.jsx
  /Wishlist
    WishlistPage.jsx
  /Trending
    TrendingPage.jsx
  /AIAssistant
    AIAssistantPage.jsx
/components   <- SHARED across 2+ pages only (MovieCard, Loader, ErrorState, Layout)
/hooks
/store
/api
/utils
```

**The rule (applies to every page, not just one specific page):** if a
component is only used by **one page**, it lives inside that page's own
`/components` subfolder, which you create yourself the first time you need
it. If it's used by **two or more pages**, it gets promoted to the
top-level `src/components`.

For example — **hypothetically**, this subfolder doesn't exist yet — if
Mariam builds a tab switcher used only inside the Wishlist page, it would
live at `src/pages/Wishlist/components/WishlistTabs.jsx`:

```
/pages
  /Wishlist
    WishlistPage.jsx
    /components          <- only used inside Wishlist
      WishlistTabs.jsx
```

Real example of a component that's already promoted to the shared, top-level
folder instead: `MovieCard` lives in `src/components/MovieCard.jsx` (not
inside any single page's folder) because it's reused on Home, Search
Results, Wishlist, Trending, and inside the recommendations rows on the
details pages — that's 5+ pages, so it belongs at the top level.

---

## 3. Naming conventions (real examples)

| What | Convention | Real example |
|---|---|---|
| Components & Pages | `PascalCase.jsx` | `src/components/MovieCard.jsx` exports `function MovieCard()` |
| Hooks | `camelCase.js`, prefixed `use` | `src/hooks/useMovieDetails.js` exports `function useMovieDetails(id)` |
| Utils / API files | `camelCase.js` | `src/utils/formatDate.js`, `src/api/getMovies.js` |
| Variables & functions | `camelCase` | `const ratingPercent = ...` in `MovieCard.jsx` |
| True constants | `UPPER_SNAKE_CASE` | `const TMDB_BASE_URL = ...` in `src/api/tmdbClient.js`, `const IMAGE_BASE_URL = ...` in `src/utils/buildImageUrl.js` |

**One export per file, and the file name matches the export exactly** — e.g.
`formatDate.js` only exports `formatDate`, nothing else.

**"True constant" doesn't just mean "written with the `const` keyword."**
Every `const` in JavaScript stays `camelCase` by default — including
`const ratingPercent = ...` above, which is still a `const` (you never
reassign it), but it only lives for one run of the function and its value
depends on whatever `item` was passed in that time. A **"true constant"**
is a fixed setting/config value that never changes no matter how many
times the app runs — like a base URL or a hardcoded limit. That's the
narrower case that gets `UPPER_SNAKE_CASE`, e.g. `TMDB_BASE_URL` in
`tmdbClient.js` never changes at all, while `ratingPercent` is recalculated
fresh every time `MovieCard` renders for a different movie.

---

## 4. `/api` vs `/utils`

- **`/api`** — any function that makes a real network call (an axios
  request through `tmdbClient`). Example: `src/api/getMovies.js`:

  ```js
  import tmdbClient from './tmdbClient'

  async function getMovies(page) {
    const response = await tmdbClient.get('/movie/popular', {
      params: { page },
    })

    return response.data
  }

  export default getMovies
  ```

- **`/utils`** — any pure function: takes input, returns output, never
  touches the network. Example: `src/utils/buildImageUrl.js`:

  ```js
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

  function buildImageUrl(posterPath) {
    if (!posterPath) {
      return ''
    }

    return `${IMAGE_BASE_URL}${posterPath}`
  }

  export default buildImageUrl
  ```

Rule of thumb: if it would still work identically after swapping TMDB for a
different backend, it's `/utils`. If it's inherently about calling TMDB,
it's `/api`.

---

## 5. Routing

All routes are registered in `src/App.jsx` using `react-router` (**not**
`react-router-dom` — that package isn't installed). Note the router itself
is built with `createBrowserRouter` from `'react-router'`, and rendered with
`RouterProvider` from `'react-router/dom'`. Every route is nested under a
`Layout` component that wraps the page via `<Outlet />`.

> **Why no `react-router-dom`?** In older versions, `react-router-dom` was
> a separate package that added web-specific pieces (`BrowserRouter`,
> `Link`, `useNavigate`...) on top of the core `react-router` package. As
> of the version installed here (`react-router` v8), the two were merged
> into one package — everything now lives in `react-router` itself, except
> one small web-only piece (`RouterProvider`) that comes from the
> `'react-router/dom'` subpath. If you paste an old tutorial's
> `import ... from 'react-router-dom'`, it will fail — that package simply
> isn't installed in this project.

| Path | Component | URL params |
|---|---|---|
| `/` | `pages/Home/HomePage.jsx` | — |
| `/movie/:id` | `pages/MovieDetails/MovieDetailsPage.jsx` | `id` |
| `/tv/:id` | `pages/TVShowDetails/TVShowDetailsPage.jsx` | `id` |
| `/search` | `pages/SearchResults/SearchResultsPage.jsx` | — (use a query string, e.g. `?query=`) |
| `/wishlist` | `pages/Wishlist/WishlistPage.jsx` | — |
| `/trending` | `pages/Trending/TrendingPage.jsx` | — |
| `/ai-assistant` | `pages/AIAssistant/AIAssistantPage.jsx` | — |

All page files are currently placeholders (e.g. `HomePage.jsx` just renders
`<h1>Home Page</h1>`) — that's expected, you're building the real content.
How to actually read `:id` with `useParams()` is covered in your own task
file, not here.

---

## 6. Data fetching hooks

Every hook lives in `/hooks`, is built with TanStack Query's `useQuery`, and
always returns the same shape: `{ data, isPending, isError, error }`.

> **Note:** this project uses TanStack Query v5, where `isPending` (not the
> older `isLoading`) is the recommended flag for "first load, no data yet."
> `isLoading` still exists in v5 but means something slightly different
> (`isPending && isFetching`) — if you're following an older tutorial that
> uses `isLoading`, use `isPending` instead here.

**Important shape difference:** list hooks return `data.results` (an array).
Details hooks return `data` directly as the object itself — there's no
`.results` on details.

### `useMovies(page)`

```js
import useMovies from '../hooks/useMovies'

function PopularMovies() {
  const { data, isPending, isError, error } = useMovies(1)

  if (isPending) return <Loader />
  if (isError) return <ErrorState message={error.message} />

  return data.results.map((movie) => (
    <MovieCard key={movie.id} item={movie} mediaType="movie" />
  ))
}
```

Calls TMDB's `/movie/popular` (popular only, not now-playing). `page`
defaults to `1`.

### `useTVShows(page)`

Same shape as `useMovies`, calls `/tv/popular`. `data.results` is an array
of TV show objects.

### `useMovieDetails(id)`

```js
import useMovieDetails from '../hooks/useMovieDetails'

function MovieHeader({ id }) {
  const { data, isPending, isError, error } = useMovieDetails(id)

  if (isPending) return <Loader />
  if (isError) return <ErrorState message={error.message} />

  return <h1>{data.title}</h1>
}
```

Calls `/movie/{id}`. `data` is the full movie object directly (`title`,
`release_date`, `runtime`, etc. — no `.results`).

### `useTVShowDetails(id)`

Same pattern, calls `/tv/{id}`. `data` is the full TV show object directly,
using TV field names (`name`, `first_air_date`, `number_of_seasons`,
`number_of_episodes`).

### `useMovieRecommendations(movieId)`

Calls `/movie/{movieId}/recommendations`. `data.results` is an array of
recommended movies.

### `useMovieReviews(movieId)`

Calls `/movie/{movieId}/reviews`. `data.results` is an array of review
objects.

### `useTVShowRecommendations(tvId)`

Calls `/tv/{tvId}/recommendations`. `data.results` is an array of
recommended TV shows.

### `useTVShowReviews(tvId)`

Calls `/tv/{tvId}/reviews`. `data.results` is an array of review objects for
that TV show.

### `useSearchMovies(query, page)`

```js
import useSearchMovies from '../hooks/useSearchMovies'

function SearchResults({ query }) {
  const { data, isPending, isError, error } = useSearchMovies(query, 1)
  // ...
}
```

Calls `/search/movie`. `data.results` is an array of movie search results.
The query only actually runs when `query` is truthy —
`enabled: Boolean(query)` — so it won't fire a request for an empty search
box.

### `useTrending()`

```js
import useTrending from '../hooks/useTrending'

function Trending() {
  const { data, isPending, isError, error } = useTrending()
  // data.results is a mix of movies and TV shows
}
```

Calls `/trending/all/day`, **no `page` argument**. `data.results` is a mixed
array of movies and TV shows — each item already has TMDB's own
`media_type` field (`"movie"` or `"tv"`), don't invent your own.

### Other pieces worth knowing

- **`Layout`** (`src/components/Layout.jsx`) wraps every route and renders
  the page content via `<Outlet />`. It also has the empty Navbar slot
  Sahar fills in.
- **`formatDate`** (`src/utils/formatDate.js`) takes a date string
  (`release_date` / `first_air_date`) and returns a display-friendly string
  like `Aug 25, 2023`. Returns `''` for a missing/invalid date.
- **`buildImageUrl`** (`src/utils/buildImageUrl.js`) takes a `poster_path`
  (or `backdrop_path`) from any TMDB object and returns the full, working
  image URL — see section 4 above for the full code. Use it any time you
  render a poster/backdrop; never hardcode the `image.tmdb.org` URL
  yourself.

---

## 7. Wishlist store (Zustand)

`useWishlistStore` lives in `src/store/useWishlistStore.js`. Always select
only the piece of state/action you need:

```js
import useWishlistStore from '../store/useWishlistStore'

function WishlistButton({ item, mediaType }) {
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist)
  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(item.id, mediaType),
  )

  return (
    <button onClick={() => toggleWishlist(item, mediaType)}>
      {isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    </button>
  )
}

function WishlistPage() {
  const wishlist = useWishlistStore((state) => state.wishlist)
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  )

  return wishlist.map((item) => (
    <div key={`${item.media_type}-${item.id}`}>
      {item.title || item.name}
      <button onClick={() => removeFromWishlist(item.id, item.media_type)}>
        Remove
      </button>
    </div>
  ))
}
```

State/actions exposed:

- `wishlist` — array of `{ ...item, media_type: 'movie' | 'tv' }`.
- `toggleWishlist(item, mediaType)` — adds the item if absent, removes it
  if already present.
- `isInWishlist(id, mediaType)` — returns `true`/`false`.
- `removeFromWishlist(id, mediaType)` — removes it explicitly.

The whole store is wrapped in `persist` from `zustand/middleware`
(`name: 'wishlist'`, `partialize: (state) => ({ wishlist: state.wishlist })`),
so the wishlist survives a page refresh automatically via `localStorage` —
there's no hand-rolled `localStorage.getItem`/`setItem` anywhere.

---

## 8. Shared components

### `<MovieCard item={movieOrTvObject} mediaType="movie" | "tv" />`

```js
import MovieCard from '../../components/MovieCard'

<MovieCard item={movie} mediaType="movie" />
```

Shows the poster, a formatted date, a circular percent-rating ring, the
title, and a heart icon wired to the wishlist store. **It already wraps the
poster + title in its own inner `<Link>` to the details page — never wrap
`<MovieCard />` in another `<Link>`.** Use it any time you show a grid/row
of movies or TV shows (Home, Search Results, Wishlist, Trending,
recommendations rows).

### `<Loader />`

```js
import Loader from '../../components/Loader'

if (isPending) return <Loader />
```

A simple spinner. Use it for every query's loading state — never a one-off
spinner.

### `<ErrorState message="..." />`

```js
import ErrorState from '../../components/ErrorState'

if (isError) return <ErrorState message={error.message} />
```

A simple, styled error box. Use it for every query's error state.

### `Layout`

Already wired into `src/App.jsx` — you never render it yourself, it wraps
every page automatically.

---

## 9. Design tokens (Figma → Tailwind)

Defined in `@theme` inside `src/index.css` (Tailwind v4 — **there is no
`tailwind.config.js`**):

```css
@theme {
  --color-primary: #ffe353;
  --color-background: #ffffff;
  --color-surface: #f5f5f5;
  --color-dark: #000000;
  --color-muted: #9f9f9f;
  --color-error: #dc2626;
  --color-rating-high: #21d07a;
  --color-rating-mid: #fbab32;
  --color-rating-low: #f47f78;
  --color-rating-track: #081c22;
  --font-sans: 'Roboto', sans-serif;
}
```

Use them as normal Tailwind classes, e.g.:

```html
<div class="bg-background text-dark">
  <button class="bg-primary">Click</button>
  <p class="text-muted">Aug 25, 2023</p>
</div>
```

There is **no `accent` token** — don't invent one; use `primary` instead.

---

## 10. Styling rule (hard rule, not a suggestion)

No inline styles (`style={{...}}`) anywhere in this project. Tailwind
classes only, so the whole app stays visually consistent.

---

## 11. Notifications

`<Toaster />` from `react-hot-toast` is already mounted once in
`src/main.jsx` — you never mount it again in your own page.

- Use `toast.success(...)` / `toast.error(...)` only for short
  confirmations (e.g. "Added to wishlist").
- Use `<Loader />` / `<ErrorState />` for actual query loading/failure
  states.
- Never use one in place of the other — a toast is not a replacement for a
  loading spinner or an error box, and vice versa.

---

## 12. Common mistakes to avoid

- Don't call `tmdbClient`/axios directly from a component — always go
  through a `use*` hook in `/hooks`.
- Don't build a one-off spinner or custom error message — always
  `<Loader />` / `<ErrorState />`.
- Don't wrap `<MovieCard />` in another `<Link>` — it already navigates
  internally via its own inner `Link`.
- Don't hardcode `https://image.tmdb.org/...` in a component — always go
  through `buildImageUrl` in `/utils`.
- Don't import from `react-router-dom` — this project uses `react-router`
  (and `react-router/dom` for `RouterProvider` only).
- Don't add a component to the top-level `/components` unless it's
  actually used by 2+ pages — keep page-only components local to that
  page's own `/components` subfolder.

---

## 13. Note on TV Show Details

There is **no Figma screen** for `TVShowDetailsPage`. Build it visually
following the same layout as `MovieDetailsPage`, but using the TV show's
own real field names from `useTVShowDetails` (`name`, `first_air_date`,
`number_of_seasons`, `number_of_episodes`) — don't invent a shared data
shape between movies and TV shows, they're deliberately two separate
hooks/objects.
