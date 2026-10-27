# 54 Bravo Auto Repair

Cinematic, motion-led marketing site for a veteran-owned mobile auto repair and fleet services company.

## Local development

```bash
npm install
npm run dev
npm run dev:vinext
```

Validation:

```bash
npm run typecheck
npm run lint
npm run build
npm run build:vinext
```

The active local Cloudflare Worker preview is available at `http://127.0.0.1:4174/`.

## Cloudflare deployment

The production Worker is `54bravo-auto-site` in the verified account that owns
`54bravoauto.com`. Its declared custom domains are the apex and `www` hostname.

```bash
npm run deploy:vinext -- --dry-run
npm run deploy:vinext
```

The typed Cloudflare config is the deployment source of truth. Verify the
authenticated account and target zone before every production mutation.

## Launch boundary

The contact form is intentionally non-transmitting until a real, authorized dispatch endpoint and verified business contact details are supplied. The production page stages entries in the browser only and does not send customer data.

The user-supplied source logo is preserved at `public/media/54-bravo-logo-source.png`.
The header uses a reviewed transparent derivative while the animated flag and
ambient effects remain separate layers, so the canonical lettering is never warped.

## Motion and accessibility

- GSAP drives entrance, parallax, pinned, stacked-card, and scrubbed text motion.
- `prefers-reduced-motion` disables nonessential animation and video.
- Interactive panels use native buttons and all fields have visible labels.
- The layout is tuned for 320px, 768px, 1024px, and 1440px viewports.
