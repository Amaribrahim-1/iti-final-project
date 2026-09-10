
  ## New hero direction: “Cinema fades into Cinefy”

  Use hero1 as a dramatic full-width opening scene, with Cinefy’s yellow as the only accent color. The key effect is: as the user scrolls down, the image
  softly disappears while a black overlay grows until the hero becomes almost entirely black.

  ### Hero layout

  - Full-width hero, around 82–90vh on desktop.
  - Keep the navbar floating above it.
  - Position content on the visually quieter side of hero1.
  - Use the existing rounded-pill language for buttons and tags.

  Content:

  CINEFY

  More Movies.
  More Memories.

  Make every watch a moment worth remembering.

  [ Explore Movies ]   [ Browse TV Shows ]

  - “CINEFY” is a small uppercase yellow eyebrow.
  - Make “More Memories.” the yellow emphasis, while the rest stays white.
  - Primary button: yellow pill with black text.
  - Secondary button: transparent/black glass pill with a subtle white border.

  ## Gradient treatment

  Use three visual layers above hero1:

  1. Side readability gradient
     A black gradient from the text side into transparent, so text stays crisp without hiding the movie artwork.

  2. Bottom cinematic fade
     A bottom gradient from transparent into black. It begins around the lower half of the hero and becomes solid black at the final 20–25% of the section.

  3. Scroll-controlled black overlay
     This is the important transition layer:
      - At the top: opacity 0.1–0.2, so the image is rich and visible.
      - During scroll: opacity increases gradually.
      - Near the bottom: opacity becomes 0.95–1.
      - At the same time, the image slightly scales up and loses brightness/saturation.

  The result is not a hard cut; the film image feels like it is being swallowed by a theater blackout.

  ## Scroll transition timeline

   Scroll position    Image                           Black overlay    Hero content
  ━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Top                Full visibility                 Very light       Fully visible
  ─────────────────  ──────────────────────────────  ───────────────  ─────────────────────────────
   25%                Slight darkening                ~35%             Starts soft fade
  ─────────────────  ──────────────────────────────  ───────────────  ─────────────────────────────
   50%                Slight zoom, less saturation    ~60%             Fades and moves up slightly
  ─────────────────  ──────────────────────────────  ───────────────  ─────────────────────────────
   75%                Barely visible                  ~85%             Almost gone
  ─────────────────  ──────────────────────────────  ───────────────  ─────────────────────────────
   Hero end           Hidden behind black             100%             Gone

  Use transform and opacity only for the content animation so it stays smooth.

  - Content fades from opacity 1 to 0.
  - Content moves up only 20–32px; keep it understated.
  - Image scales from 1 to about 1.06.
  - Avoid fast parallax—the feeling should be deliberate and film-like.

  ## Making it fit the existing white UI

  The current home content is white, so don’t place the movie grid directly after a pure-black hero; that would feel abrupt.

  Use this sequence:

  hero image
     ↓
  black cinematic fade
     ↓
  short black “transition zone”
     ↓
  soft charcoal-to-light-gray gradient
     ↓
  existing white page / Movies & TV tabs / cards

  The black transition zone can be about 120–180px tall. Add the heading “Discover your next favorite” in white or muted gray near its lower edge, then
  gradually transition the background to the existing #ffffff page. This makes the black-increase effect feel intentional while preserving the current
  Cinefy UI.

  ## Motion details

  - Initial entrance:
      - Image: fade + gentle scale-in over 1.2s
      - Eyebrow, title, paragraph, buttons: staggered by 100–140ms

  - Yellow CTA: subtle hover lift and a soft yellow shadow.
  - Secondary CTA: background brightens slightly on hover.
  - No constantly moving glow; the existing design is clean and minimal.
  - Disable/reduce motion for prefers-reduced-motion.

  ## Build order

  1. Create a reusable HeroSection component above the Home page tabs.
  2. Add hero1 as an absolutely positioned background image.
  3. Add side, bottom, and scroll-darkening gradient layers.
  4. Add the Cinefy text and pill CTAs using the existing yellow/black/white tokens.
  5. Track hero scroll progress and map it to overlay opacity, image scale, and content opacity.
  6. Add the black-to-light transition zone before the current catalog.
  7. Tune the crop and content side for mobile, where the content should sit lower with a stronger bottom gradient.

  This will make the first screen feel like a premium movie opening, while the yellow buttons, rounded controls, and clean catalog below still feel
  unmistakably like the current Cinefy site.