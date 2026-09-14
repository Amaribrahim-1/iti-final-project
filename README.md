# Movie App

A React + Vite movie discovery app built with TMDB data, wishlist support, themed UI, and AI-assisted movie recommendations.

## Overview

This project is a movie and TV browsing application where users can:

- browse popular movies and TV shows
- view details for each movie or TV show
- search for content
- save titles to a wishlist
- explore trending content
- chat with an AI movie assistant

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
- Gemini API for the AI assistant

## Features

- Home page with Movies/TV tabs
- Pagination for list views
- Movie and TV details pages
- Search results page
- Wishlist management with persistent state
- Trending page
- Theme toggle
- AI assistant for movie/TV-related questions

## Project Structure

```bash
src/
  api/
  components/
  hooks/
  pages/
  store/
  utils/
```

## Environment Variables

Create a `.env` file in the project root with the following values:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Notes

This app follows the project specification in the docs folder and is intended for the final graduation project.

## License

This project is for educational use within the course assignment.
