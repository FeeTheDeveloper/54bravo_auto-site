# 54 Bravo Auto Repair

Cinematic, motion-led marketing site for a veteran-owned mobile auto repair and fleet services company.

## Local development

```bash
npm install
npm run dev
```

Validation:

```bash
npm run typecheck
npm run lint
npm run build
```

## Launch boundary

The contact form is intentionally local-only until a real, authorized dispatch endpoint and verified business contact details are supplied. It does not transmit customer data.

The compact navigation mark is a text treatment. Replace or supplement it with the supplied canonical 54 Bravo logo file once that source asset is available in the repository; do not redraw the logo from generated media.

## Motion and accessibility

- GSAP drives entrance, parallax, pinned, stacked-card, and scrubbed text motion.
- `prefers-reduced-motion` disables nonessential animation and video.
- Interactive panels use native buttons and all fields have visible labels.
- The layout is tuned for 320px, 768px, 1024px, and 1440px viewports.
