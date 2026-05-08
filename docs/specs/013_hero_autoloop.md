# Spec 013 — Hero Autoloop

**Status:** Ready for implementation  
**Depends on:** Spec 001 (Hero Animatic) — this is an additive change to `HeroAnimatic`

---

## What this spec is

Replaces the single static hero background video (`home-hero-bg.mp4`) with a sequential autoloop through six short clips. When one clip ends the next one plays immediately; after the last clip the sequence wraps back to the first. The overall visual effect — a looping video fill behind the hero headline and scroll animation — is identical. Only what plays inside the video frame changes.

This mirrors the pattern used by Square on their homepage hero: a single `<video>` element whose source is swapped on each `ended` event, cycling through an ordered list of clips.

---

## Scope

### In scope

- Swapping `HeroAnimatic`'s single `videoSrc: string` prop for `videoSrcs: string[]`
- Wiring the six `hero-autoloop-clips` MP4s as that array in `app/page.tsx`
- Managing clip sequencing (ended → next → wrap) inside `HeroAnimatic`
- Preloading the next clip while the current one plays
- Keeping all existing scroll animation, layout, responsive, and accessibility behavior untouched

### Out of scope

- Any section other than the hero
- Multiple format sources (WebM, mobile variants) — MP4 only for now
- Cross-fading or transitions between clips (hard cuts only)
- Any backend or CMS wiring for clip management

---

## Assets

Six clips already exist at:

```
public/videos/hero-autoloop-clips/herovideo-01.mp4
public/videos/hero-autoloop-clips/herovideo-02.mp4
public/videos/hero-autoloop-clips/herovideo-03.mp4
public/videos/hero-autoloop-clips/herovideo-04.mp4
public/videos/hero-autoloop-clips/herovideo-05.mp4
public/videos/hero-autoloop-clips/herovideo-06.mp4
```

They play in numerical order, 01 → 02 → … → 06 → 01 → …

---

## Behaviour

### Playback sequence

1. Page loads → clip 01 begins playing immediately (autoplay, muted, playsInline).
2. `ended` event fires on the `<video>` element → clip index advances by one.
3. After clip 06 ends, index wraps back to 01.
4. The new `src` is set, `video.load()` is called, then `video.play()`. The switch is instantaneous — no fade, no gap.

### Preloading

While clip N is playing, clip N+1's URL is set on a hidden `<link rel="preload" as="video">` element (or via a second off-screen `<video preload="auto">` element) so the next clip is ready before the `ended` event fires. Only one clip ahead is preloaded at a time.

### Error handling

If a clip fails to load (`error` event), skip to the next clip in the sequence. Do not surface an error to the visitor.

### Reduced motion

The video still plays (muting / pausing video is not part of `prefers-reduced-motion` convention). No change to existing reduced-motion behaviour.

---

## Implementation

### Prop change — `HeroAnimatic`

```ts
// Before
videoSrc: string

// After
videoSrcs: string[]   // ordered array; must have at least one entry
```

The component keeps a `currentIndex` ref (not state — no re-render needed) and a ref to the `<video>` DOM element. A single `useEffect` attaches the `ended` listener; it is torn down in the cleanup function.

```ts
// Pseudocode
const videoRef = useRef<HTMLVideoElement>(null);
const indexRef = useRef(0);

useEffect(() => {
  const video = videoRef.current;
  if (!video || videoSrcs.length === 0) return;

  const advance = () => {
    indexRef.current = (indexRef.current + 1) % videoSrcs.length;
    video.src = videoSrcs[indexRef.current];
    video.load();
    video.play().catch(() => {});
  };

  video.addEventListener('ended', advance);
  return () => video.removeEventListener('ended', advance);
}, [videoSrcs]);
```

The `<video>` JSX loses the `loop` attribute (looping is now handled by the sequence wrap) and gains a `ref`:

```tsx
<video
  ref={videoRef}
  autoPlay
  muted
  playsInline
  className="absolute h-full w-full object-cover"
>
  <source src={videoSrcs[0]} type="video/mp4" />
</video>
```

### Wiring in `app/page.tsx`

```tsx
<HeroAnimatic
  headlineLine1="Always ON "
  headlineLine2="SALES & MARKETING"
  subheadline="A team of experts running your marketing while you run your business."
  cta1Label="Learn more"
  cta2Label="Get started"
  videoSrcs={[
    '/videos/hero-autoloop-clips/herovideo-01.mp4',
    '/videos/hero-autoloop-clips/herovideo-02.mp4',
    '/videos/hero-autoloop-clips/herovideo-03.mp4',
    '/videos/hero-autoloop-clips/herovideo-04.mp4',
    '/videos/hero-autoloop-clips/herovideo-05.mp4',
    '/videos/hero-autoloop-clips/herovideo-06.mp4',
  ]}
  markColor="#6ECC8B"
/>
```

The old `home-hero-bg.mp4` file can be left in place for now — no other spec references it as a dependency (Spec 006 uses it only as a social-proof thumbnail source, not as a live video).

---

## What does NOT change

- Section layout, inset frame, and rounded corners (unchanged)
- GSAP scroll animation (headline exits, bottom content fades in — unchanged)
- `HeroNav` fixed behaviour (unchanged)
- Mobile behaviour — video still fills full width, scroll animation still hidden on mobile (unchanged)
- All other `HeroAnimatic` props (`headlineLine1`, `headlineLine2`, `subheadline`, `cta1Label`, `cta2Label`, `markColor`) are unchanged

---

## Acceptance criteria

- [ ] Hero background plays `herovideo-01.mp4` on page load
- [ ] When clip 01 ends, clip 02 begins immediately with no visible gap
- [ ] Sequence continues through clip 06, then wraps back to clip 01
- [ ] `loop` attribute is not present on the `<video>` element
- [ ] If a clip errors, the next clip in sequence plays instead
- [ ] All existing scroll animation behaviour from Spec 001 is unaffected
- [ ] All existing layout behaviour (inset frame, rounded corners, mobile full-bleed) is unaffected
- [ ] No console errors at 390 px, 768 px, or 1440 px viewport widths
- [ ] TypeScript compiles without errors — `videoSrc` prop is fully replaced by `videoSrcs`
