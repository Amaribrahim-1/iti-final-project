# Movie App

A cinematic movie and TV discovery app built with React, Vite, TMDB, and modern frontend tooling. The app lets users browse content, explore details, save favorites, and interact with an AI-powered movie assistant.

## Project Overview

This project is a final graduation app designed around a movie and TV catalog experience. Users can:

- browse popular movies and TV shows
- switch between movie and TV tabs on the home page
- paginate through large result sets
- search for titles by keyword
- view detailed pages for movies and TV shows
- read recommendations and reviews
- manage a persistent wishlist
- explore trending content
- use an AI assistant for movie-related questions
- toggle between light and dark themes

## Team

This project was created as a collaborative team effort with the following members:

- Ammar — Team leader and project foundation owner
- Ibrahim — Home page and content browsing experience
- Sahar — Navbar and search experience
- Shahd — Movie and TV details pages
- Mariam — Wishlist and trending features

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- TanStack Query
- Zustand
- Axios
- TMDB API
- Gemini API

## Features

### Core app features

- Home page with movie and TV tabs
- Pagination for all list views
- Search results page
- Movie details page
- TV show details page
- Wishlist persistence with Zustand
- Trending page
- AI movie assistant page
- Responsive dark/light theme

### UX highlights

- reusable shared components
- loading and error states across pages
- consistent routing and app structure
- TMDB-driven content with formatted display data

## Project Structure

```bash
src/
  api/
  components/
  hooks/
  pages/
  store/
  utils/

docs/
  movie-app-spec.md
  team-guide.md
  new-desgin-plan.md
```

## Environment Setup

Create a `.env` file in the project root with your credentials:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

```bash
npm run dev      # start development server
npm run build    # build for production
npm run preview  # preview production build
npm run lint     # run ESLint checks
npm run format   # format code with Prettier
```

## Documentation

The project specification and team workflow are documented in the docs folder:

- docs/movie-app-spec.md
- docs/team-guide.md
- docs/new-desgin-plan.md

## Notes

This project is built for learning, collaboration, and final project delivery. It follows a structured Git workflow, feature branching, and shared API/state contracts between team members.

## License

This project is intended for educational use as part of the course assignment.
