The Foundation branch for this Movie App project has just been merged into `main`. I need you to generate one comprehensive documentation file for my 4 teammates — none of them have Cursor, none of them wrote any of this code, and I (Ammar, the Team Leader) won't be available to explain every detail live. After reading this doc, someone should be able to add their page/component correctly without asking me.

Read the actual current codebase before writing anything — do not describe anything from memory or from the project spec's plan. Every code example, hook name, file path, and prop shown in the doc must be copied exactly from the real files as they exist right now. If something in the spec was planned differently from how it was actually implemented, document the real implementation, not the plan.

Create a single file: `docs/team-guide.md`. Cover these sections, in this order:

1. **Getting started**: cloning, installing dependencies, setting up `.env` (list the exact variable names used, without real key values), running the dev server.

2. **Folder structure & where things go**: explain the actual feature-based folder layout as it exists (`/pages/<PageName>/...`, `/components`, `/hooks`, `/store`, `/api`, `/utils`). Explain the rule for when a component stays local to a page's own `/components` subfolder vs. gets promoted to the top-level `/components` (used by 2+ pages). Give a concrete real example from the codebase for each.

3. **Naming conventions, with examples pulled from the real codebase**: components/pages (PascalCase.jsx), hooks (camelCase.js, prefixed `use`), utils/api files (camelCase.js), variables/functions (camelCase), true constants (UPPER_SNAKE_CASE), one export per file. Show a real filename + real code snippet for each, not made-up examples.

4. **`/api` vs `/utils`**: explain the distinction (network calls vs. pure functions) using the actual files that exist in each folder as examples.

5. **Routing**: list every route already registered (path + which page component it renders + any URL params like `:id`), copied from the actual router setup file (`src/App.jsx` — routing is `react-router`, **not** `react-router-dom`; note `createBrowserRouter` and `RouterProvider` from `'react-router/dom'`). All page files are still placeholders, so do **not** copy a `useParams()` example from an actual page — just list the routes and their params. Do not teach `useParams` here; that stays on the teammate task files that already cover it.

6. **Data fetching hooks**: one subsection per hook that exists in `/hooks` — all ten of them: `useMovies`, `useTVShows`, `useMovieDetails`, `useTVShowDetails`, `useMovieRecommendations`, `useMovieReviews`, `useTVShowRecommendations`, `useTVShowReviews`, `useSearchMovies`, `useTrending` (re-check the real file list before writing, in case it has changed since this prompt was written). For each one: its exact signature/parameters, what it returns (the real shape of `data`, confirmed from the actual code — not assumed; call out that list hooks return `data.results` while details hooks return the object directly as `data`), and a short realistic usage example inside a component. Also mention `Layout` (wraps every route via `<Outlet />`) and `formatDate` (in `/utils`, formats a date string for display) somewhere appropriate.

7. **Wishlist store (Zustand)**: explain `useWishlistStore` — every piece of state and every action it exposes, with the exact selector syntax to use (e.g. `useWishlistStore((state) => state.wishlist)`), and a full realistic example showing how to read the wishlist, check if an item is in it, and toggle/remove an item from inside a component. Mention that it's wrapped in `persist` from `zustand/middleware` (`name: 'wishlist'`, `partialize: (state) => ({ wishlist: state.wishlist })`), so it survives a page refresh automatically — not a hand-rolled `localStorage` read/write.

8. **Shared components**: for each component in the top-level `/components` (`MovieCard`, `Loader`, `ErrorState`, `Layout`), show its exact props, a usage example, and a one-line note on when to use it vs. building something page-local. For `MovieCard`, call out that it already navigates to the details page via its own inner `Link` — never wrap it in another `Link`.

9. **Design tokens**: how the Tailwind theme/colors were set up from the Figma file — the actual color names/variables available to use in class names, defined in `@theme` inside `src/index.css` (Tailwind v4 — there is no `tailwind.config.js`), with 2-3 example class usages (e.g. `bg-primary`, `text-muted` — use whatever the real token names are; there is no `accent` token, don't invent one).

10. **Styling rule**: no inline styles anywhere, Tailwind classes only — state this explicitly as a hard rule, not a suggestion.

11. **Notifications**: a short note that `<Toaster />` from `react-hot-toast` is already mounted once in `src/main.jsx`, and the rule for when to use `toast.success(...)`/`toast.error(...)` (short confirmations only) vs. `<Loader />`/`<ErrorState />` (query loading/failure) — never replace one with the other.

12. **Common mistakes to avoid**: a short bullet list inferred from the actual code patterns used, e.g. "don't call axios directly in a component, always go through a `use*` hook", "always use `<Loader />`/`<ErrorState />`, never a custom spinner", "never wrap `<MovieCard />` in another `Link` — it already navigates internally" — only include points that are actually enforced by how the codebase is structured.

13. **Note on TV Show Details**: mention explicitly that there is no Figma screen for this page, and it should visually follow the Movie Details page's layout while using the TV show's own real field names (do not invent a shared data shape between the two).

Write it in English, in clear language suitable for someone new to this stack (assume the reader has done basic React before but hasn't used TanStack Query or Zustand). Use real, working code snippets throughout — never pseudocode or placeholders like `// your code here`. Keep each section skimmable with short paragraphs and code blocks, not dense prose.
