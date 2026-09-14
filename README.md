# Movie App — Graduation Project

Live: [https://iti-final-project-ashen.vercel.app](https://iti-final-project-ashen.vercel.app)

## What I did as Team Leader

I’m Ammar Ibrahim, Team Leader of this 5-person Movie App.

This was a small graduation project, but it was the first time our team used GitHub together for real: feature branches, Pull Requests, review, and merge. My extra job was not only writing code. It was making sure five people could work at the same time without breaking each other’s pages.

I started with the **foundation**: routes, TMDB hooks, the wishlist store, and shared components (`MovieCard`, `Loader`, `ErrorState`, `Layout`). That had to land on `main` first, because everyone else’s pages depended on it.

Then I **split the work** into task files, one person per package, in `docs/tasks/`:

- Me — foundation, AI Movie Assistant, dark mode
- Ibrahim — Home page
- Shahd — Movie Details, then TV Show Details
- Sahar — Navbar, then Search Results
- Mariam — Wishlist, then Trending

The rule was simple: **one feature = one branch = one Pull Request** into `main`. If a package had two pages, it was two PRs, one after the other. Shahd did not put Movie Details and TV Details in the same branch. After the first PR was merged, she deleted that branch, pulled the new `main`, and started the second page. Same pattern for Sahar and Mariam.

When a teammate opened a PR, I did not merge from the title. I checked two things:

1. Does it match the task (right page, right hook, no unrelated files)?
2. Does it actually work in the browser?

If something was missing, they fixed it on the same branch. The PR updated by itself.

After every merge I went back to `main`, pulled, and deleted the old branch so the next feature started from the same code. I also left a short note on the PR for that teammate: what was good, and one thing they should understand for next time (for example why a component belongs in `/components` if two pages use it, or why the page should use the shared `Loader` instead of a custom spinner). The note was meant to teach, not just to approve the work.

### What I gained from this

I learned how a Team Leader actually spends time on a small team project. Writing the foundation mattered, but the harder part was the process: splitting tasks so people were not blocked, reading a PR against a written task, testing the page myself, leaving a short teaching note for each teammate, and keeping `main` clean so nobody started from an old copy.

Before this, I had never reviewed someone else’s Pull Request or merged work from four teammates into one app. Now I can explain that workflow, not just the React pages I built.

## The project

A React app for browsing movies and TV shows, using the TMDB API. You can search, open details, save a mixed movies/TV wishlist, see daily trending titles, and chat with an AI Movie Assistant (Gemini) that only answers movie and TV questions.

### Pages

- **Home** (`/`) — Movies and TV Shows tabs, pagination, wishlist heart on every card
- **Search** (`/search`) — search from the Navbar; the query stays in the URL
- **Movie Details** (`/movie/:id`) — poster, overview, rating, genres, recommendations, reviews
- **TV Show Details** (`/tv/:id`) — same layout as movies, with TV fields (name, first air date, seasons, episodes)
- **Wishlist** (`/wishlist`) — movies and TV together, type badge, remove, empty state
- **Trending** (`/trending`) — daily trending movies and TV in one grid (bonus)
- **AI Movie Assistant** (`/ai-assistant`) — multi-turn chat; refuses off-topic questions
- **Dark / Light mode** — Navbar toggle, saved after refresh (bonus)

UI follows the course Figma file. TV Show Details had no Figma screen, so it follows Movie Details.

### Tech stack

- Vite + React (JavaScript) — build and run the app
- React Router (v8) — pages and navigation
- TanStack Query — fetch and cache TMDB data
- Axios — TMDB HTTP requests
- Zustand — wishlist and theme (both persisted)
- Tailwind CSS — styling
- lucide-react — icons
- TMDB API — movies and TV data
- Gemini API — AI Movie Assistant

Full spec: `docs/movie-app-spec.md`

### Team

- **Ammar Ibrahim** — Team Leader: foundation, AI assistant, dark mode, task split, PR review and merge
- **Ibrahim Abdullaziz** — Home page
- **Sahar Salem** — Navbar, Search Results
- **Shahd Mansour** — Movie Details, TV Show Details
- **Mariam Mamdouh** — Wishlist, Trending
