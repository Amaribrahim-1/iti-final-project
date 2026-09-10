 ## Dark Cinefy redesign plan

  The goal is not “turn the white background black.” It should become a deliberate cinematic system: rich black
  surfaces, clear hierarchy, warm yellow Cinefy actions, poster imagery, and quiet gray text.

  The visual mood: premium cinema lobby, not neon sci-fi.

  ## 1. Establish the dark design language

  Use layered dark neutrals instead of one flat black:

   Role                      Suggested color    Use
  ━━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   App background                    #080808    Main page canvas
  ──────────────────  ───────────────────────  ──────────────────────────────────────────
   Elevated surface                  #121212    Cards, panels, drawers
  ──────────────────  ───────────────────────  ──────────────────────────────────────────
   Raised surface                    #1B1B1B    Hovered cards, inputs, active containers
  ──────────────────  ───────────────────────  ──────────────────────────────────────────
   Soft border         rgba(255,255,255,.10)    Separators and outlines
  ──────────────────  ───────────────────────  ──────────────────────────────────────────
   Primary text                      #F5F5F5    Titles and important content
  ──────────────────  ───────────────────────  ──────────────────────────────────────────
   Secondary text                    #A8A8A8    Dates, labels, supporting information
  ──────────────────  ───────────────────────  ──────────────────────────────────────────
   Muted text                        #6E6E6E    Disabled/low-priority content
  ──────────────────  ───────────────────────  ──────────────────────────────────────────
   Cinefy yellow                     #FFE353    CTAs, selected states, brand emphasis

  Keep #FFE353 as the signature. On dark surfaces it becomes much more striking.

  Avoid pure-white cards and large gray blocks. The hierarchy should come from slight surface changes, borders, shadows,
  and spacing.

  ## 2. Redesign the global theme first

  Update the global Tailwind theme tokens so every page can use the same language:

  - background becomes the deep app black.
  - surface becomes the primary charcoal card background.
  - Add surface-raised, border, text-primary, and text-secondary.
  - dark should no longer mean black text; rename semantics if needed so class names stay understandable.
  - Body gets the black background and light text by default.
  - Add global text selection in Cinefy yellow with black text.
  - Add slim, dark custom scrollbars for desktop.

  This should happen before individual component work, so the app changes cohesively rather than page by page.

  ## 3. Navbar direction

  The current navbar is a placeholder, so use it to establish the product’s identity.

  ### Default navbar

  - Transparent at the top of the hero.
  - Logo: Cinefy in white, with the dot/accent or one letter in yellow.
  - Navigation links: soft white, turning yellow on hover.
  - Search icon/input, wishlist icon, and profile/avatar on the right.
  - A compact yellow “Sign In” or “Join Cinefy” button if authentication is added later.

  ### Scroll behavior

  - At the top: transparent over the hero.
  - Once the user scrolls: transition to a frosted charcoal navbar:
      - rgba(8,8,8,.78)
      - backdrop blur
      - subtle bottom border
      - slightly reduced height

  This lets the hero feel immersive but keeps navigation easy to use.

  ## 4. Hero section for the new dark world

  Now the black cinematic fade makes sense, because the whole page supports it.

  ### Hero visual structure

  full-screen hero image
    ↓
  left-side dark text gradient
    ↓
  bottom-to-black cinema fade
    ↓
  black transition area
    ↓
  dark catalogue section

  ### Hero content

  CINEFY

  More Movies.
  More Memories.

  Make every watch a moment worth remembering.

  [ Explore Movies ]  [ Browse TV Shows ]

  - Yellow eyebrow: CINEFY.
  - Headline in white.
  - “More Memories.” in Cinefy yellow.
  - Primary CTA: yellow pill with black text.
  - Secondary CTA: glass-charcoal pill, soft white border, white text.
  - Optional metadata below the description: Movies · TV Shows · Your Watchlist.

  ### Hero animation

  On entry:

  - Background image fades in and settles from scale(1.04) to scale(1).
  - Text enters in a restrained stagger.
  - Buttons arrive last.
  - No hard visual effects, neon glows, or fast parallax.

  On scroll:

  - Hero image grows very slightly: 1 → 1.06.
  - Brightness and saturation fall gently.
  - Black overlay climbs from around 12% to 100%.
  - Text opacity moves from 1 → 0.
  - Text shifts up by only 20–30px.
  - The end of the hero is pure app-background black.

  The end state should look like a cinema screen going dark before the catalogue begins.

  ## 5. Catalogue transition

  Do not place the movie grid immediately after the hero. Add a visual pause.

  ### Transition zone

  - Height: roughly 140–220px.
  - Background: black to #080808; no return to white.
  - Include a small yellow line or eyebrow.
  - Add a section lead-in, such as:

  DISCOVER YOUR NEXT FAVORITE

  Now Playing

  The heading can slowly become visible as the hero disappears. This creates a seamless connection between the cinematic
  opening and the content library.

  ## 6. Movie and TV catalogue redesign

  The home-page grid should feel editorial and spacious.

  ### Tabs

  The current rounded tabs work well; restyle them:

  - Inactive: charcoal pill, muted light text.
  - Hover: raised charcoal surface, white text.
  - Active: yellow pill, black text.
  - Add a subtle animated background/indicator transition.

  ### Section headings

  - White or near-white title.
  - Small yellow accent bar or eyebrow above it.
  - Optional “View all” link in muted white, turning yellow on hover.

  ### Grid spacing

  - Preserve the responsive grid.
  - Increase vertical spacing slightly because dark interfaces need breathing room.
  - Use a max-width layout so posters do not feel too dense on very wide screens.

  ## 7. Movie-card redesign

  Cards are the heart of the application.

  ### Poster

  - Keep poster images large and rounded.
  - Use rounded-xl rather than a small radius for a more premium feel.
  - Add a dark border or transparent outline—not a heavy shadow.
  - On hover:
      - poster scales around 1.03,
      - background surface lifts,
      - image darkens slightly,
      - title changes to yellow,
      - wishlist control becomes more prominent.

  ### Card surface

  Instead of floating plain posters on the page:

  - Wrap each card in a subtle surface container on desktop.
  - Use #121212 at rest.
  - Use #1B1B1B on hover.
  - Keep card metadata clean and low contrast.

  ### Ratings

  The current circular rating badge is a good fit.

  - Keep dark teal/charcoal inside the ring.
  - Preserve green/orange/red rating semantics.
  - Add a narrow dark border around the badge so it remains visible on posters.
  - Position it slightly overlapping the poster/card boundary.

  ### Wishlist button

  - Place it in the top-right of the poster.
  - Default: circular frosted-black button.
  - Hover: raised and brighter.
  - Saved: yellow or filled red heart, depending on whether yellow needs to remain exclusive to primary actions.

  My preference: yellow outline/fill for consistency with Cinefy.

  ## 8. Movie details and TV details pages

  These pages should feel like the “premium” destination after clicking a card.

  ### Backdrop header

  - Full-width backdrop image.
  - Strong bottom and side black gradients.
  - Poster appears as an elevated panel beside the text on desktop.
  - On mobile, use backdrop first, then poster and content below.

  ### Detail content

  - Title: white, large.
  - Genres: dark glass/yellow-outline chips.
  - Rating: retain the circular ring or pair it with a compact score.
  - Overview: secondary light gray, constrained line width.
  - Primary action: yellow “Add to Watchlist” or “Watch Trailer.”
  - Secondary actions: charcoal buttons with subtle borders.

  ### Page sections

  Use dark surfaces for:

  - Cast
  - Recommendations
  - Reviews
  - Trailer/video modules
  - Season information for TV shows

  Avoid every section having a card. Use cards only when grouping information helps scanning.

  ## 9. Search experience

  Search should become a polished dark command-like experience.

  - Search input: #121212 background, light text, soft border.
  - Focus state: yellow border/glow at low opacity.
  - Search icon in muted gray.
  - Search result heading in white.
  - Empty state with a simple illustration/icon, not a white box.
  - Filter chips follow the same active-yellow/inactive-charcoal pattern.

  If there is a mobile search overlay, use a dark fullscreen layer with a blur behind it.

  ## 10. Watchlist and empty states

  ### Watchlist populated state

  - Reuse the catalogue grid.
  - Add a large white heading and muted description.
  - Provide sort/filter controls in charcoal pills.

  ### Empty watchlist

  Make it emotionally on-brand:

  Your watchlist is waiting.

  Save movies and shows you never want to forget.

  [ Explore Movies ]

  - Use a low-contrast cinema-related icon or poster-stack illustration.
  - Yellow CTA.
  - No large white empty-state panel.

  ## 11. Trending page

  Trending is the right place for stronger visual energy.

  - Use a featured rank treatment: 01, 02, 03 in huge outlined charcoal/gray type behind posters.
  - Keep ranking readable but secondary to imagery.
  - Use yellow only for active tabs and intentional highlights.
  - Consider a “Trending this week” header with a very subtle moving grain/noise texture, if desired.

  ## 12. AI assistant page

  Make this feel integrated instead of like a separate app.

  - Main conversation area: deep black background.
  - Assistant messages: charcoal surfaces.
  - User messages: dark yellow-tinted or elevated gray surfaces—not bright yellow paragraphs.
  - Composer: raised charcoal input, yellow send button.
  - Suggested prompts: small dark pills that become yellow on hover.
  - Use clear visual distinction without overly rounded “chat bubble” styling.

  ## 13. Loading, errors, and feedback

  ### Loading

  Replace plain loading states with dark-friendly skeletons:

  - Charcoal card rectangles.
  - Very subtle shimmer from #121212 to #1B1B1B.
  - Preserve poster aspect ratios to prevent layout shifts.

  ### Error states

  - Dark surface, quiet border.
  - Error icon in muted red.
  - White headline, gray explanation.
  - Yellow retry button.

  ### Toasts

  - Dark charcoal toast container.
  - White text.
  - Yellow success accent, red error accent.
  - Soft border, not a giant shadow.

  ## 14. Interaction and motion rules

  Keep motion coherent across the entire app.

  ### Allowed motion

  - 150–250ms for buttons, tabs, and card hover.
  - 250–350ms for panels and menus.
  - 700–1200ms for hero entrance only.
  - Ease curve should feel smooth and controlled, such as cubic-bezier(.22, 1, .36, 1).

  ### Avoid

  - Large bouncing elements.
  - Fast poster movement.
  - Constant glowing effects.
  - Infinite animations except quiet loading states.
  - Dramatic hover transforms that move the grid around.

  ### Accessibility

  - Respect prefers-reduced-motion.
  - Keep all yellow text/buttons high contrast against dark surfaces.
  - Ensure muted text is still readable.
  - Preserve visible keyboard focus using a yellow outline or ring.
  - Do not make important information appear only on hover.

  ## 15. Responsive strategy

  ### Desktop

  - Hero: 85–90vh.
  - Full visual backdrop.
  - Floating transparent navbar.
  - Wide catalogue grid.
  - Hover-rich interactions.

  ### Tablet

  - Hero: 70–80vh.
  - Content width is reduced.
  - Header may condense navigation links.
  - Catalogue becomes 3–4 columns.

  ### Mobile

  - Hero: 65–75vh with stronger bottom gradient.
  - Content aligns nearer the bottom.
  - Buttons stack or become equal-width.
  - Navbar stays compact and readable.
  - Cards remain two columns, with smaller metadata.
  - Avoid scroll-driven effects that cause visual jitter on mobile; use a simpler fade range there.

  ## 16. Implementation phases

  ### Phase 1 — Foundation

  1. Update Tailwind color tokens for dark surfaces, text, borders, and Cinefy yellow.
  2. Change body, layout, and page defaults to the new dark system.
  3. Add global focus, selection, scrollbar, and motion-reduction styles.
  4. Establish shared button, chip, input, and surface patterns.

  ### Phase 2 — App shell

  1. Build the dark navbar.
  2. Add responsive navigation behavior.
  3. Add the transparent-to-frosted scroll state.
  4. Ensure route layouts share dark backgrounds correctly.

  ### Phase 3 — Home and hero

  1. Finalize the full-screen HeroSection.
  2. Add the three gradient layers.
  3. Implement the fade-to-black scroll transition.
  4. Add the black catalogue transition zone.
  5. Restyle tabs, headings, grid spacing, and pagination.

  ### Phase 4 — Content components

  1. Redesign MovieCard.
  2. Refine rating badge, wishlisting, hover, and keyboard states.
  3. Apply the card design to all grids.
  4. Add dark skeleton loading cards and error states.

  ### Phase 5 — Detail and feature pages

  1. Movie details.
  2. TV details.
  3. Search results.
  4. Wishlist.
  5. Trending.
  6. AI assistant.

  ### Phase 6 — Polish and QA

  1. Check all pages at mobile, tablet, and desktop widths.
  2. Test image crops and empty/missing-poster states.
  3. Test keyboard navigation and visible focus.
  4. Test reduced-motion behavior.
  5. Verify text contrast.
  6. Run lint/build and fix visual regressions.
  7. Compare page hierarchy: every section should be distinguishable without using bright colors everywhere.

  ## 17. Final visual rules

  Use these as the design guardrails:

  - Black is the canvas; charcoal is the structure.
  - Yellow is for intent: active, primary, saved, selected.
  - White is for content hierarchy, not surfaces.
  - Posters should bring the color; UI should stay restrained.
  - Every gradient should support readability or transition, never exist only as decoration.
  - Motion should feel like cinema: slow, controlled, and purposeful.

  This gives Cinefy a consistent dark streaming identity where the hero can fade naturally into the catalogue instead of
  feeling disconnected from it.