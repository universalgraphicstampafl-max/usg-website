# USG Website — Intellectual Property & Asset Inventory

**Transferred to:** Universal Signage & Graphics (USG)
**Date:** July 2026
**Scope:** Every piece of code, content, imagery, and third-party material used to build
the USG website, with its ownership status and license terms.

---

## 1. Custom Code — © USG (work product, full ownership transfers)

All custom code in `github.com/universalgraphicstampafl-max/usg-website`:

- **Site application:** Next.js 14 App Router site — all pages (`app/`): homepage,
  About, Gallery, Contact, 6 service detail pages, privacy, terms, client-login,
  thank-you
- **Custom components** (`components/`, 30+): interactive 3D Store Explorer
  (StoreExplorer.tsx — hotspot system, variation switcher, camera rig, Outside/Inside
  toggle), gallery grid with filters + lightbox (GalleryClient.tsx), About ticker,
  navigation, footer, motion suite (SectionReveal, RevealWrapper, marquees, counters,
  hero components), ServicePage template
- **Configuration:** Tailwind brand theme, Netlify config + redirects, TypeScript setup
- **Procedural texture generator output** (`public/textures/`): asphalt, concrete, stucco,
  brick, roof, foliage — generated in-house, no third-party source, USG-owned

## 2. Brand Assets — © USG

- Logo suite (`public/images/`): `usg-logo-mark.svg`, `usg-logo-card.svg`,
  `usg-logo-u.png` (U extraction used in About ticker), favicon (`app/icon.svg`),
  OpenGraph card (`usg-og.jpg`). Original mark designed by Olivia Burkhardt for USG.
- Brand palette (navy #001132, royal #00356B, gold #FBB034, off-white #EFEFEE) and
  wordmark treatment "USG Retail Signage Specialist."

## 3. Imagery

| Set | Location | Source | Status |
|---|---|---|---|
| Gallery & showroom sign-type images | `public/images/gallery/`, `public/images/signtypes/` | Generated via Adobe Firefly (licensed Adobe account) + USG-provided product photos/renders from the Sign Types document | Firefly output is cleared for commercial use under Adobe's Firefly terms; USG-provided art is USG's own. All transfer. |
| Site photography/renders | `public/images/easy/` | AI-generated for the project + USG-provided | Transfers to USG |
| Client logos (Circle K, 7-Eleven, Coca-Cola, Fast Track, etc.) | `public/images/logos/` | Marks belong to their respective owners | Used nominatively as USG client references — keep usage to factual "our clients" context |
| Product brand imagery inside AI scenes (Lay's, Hi-Chew, Red Bull, etc.) | various | AI-generated depictions | Standard retail-context depiction; swap with real USG install photos over time as available |

## 4. Licensed 3D Assets — CC-BY 4.0 (attribution REQUIRED, commercial use allowed)

Located in `public/models/` with full license texts in `public/models/licenses/`:

| Model | Author | License |
|---|---|---|
| "Gas station" (exterior scene) | Elbolillo — sketchfab.com/3d-models/gas-station-eeb913b90b4344ddbd7852f82a7ef160 | CC-BY 4.0 |
| "gas pump" | kunkun (@youoyouyou) | CC-BY 4.0 |
| "Supermarket Drinks Shelf Asset" | Rendevr | CC-BY 4.0 |
| "Supermarket Potato Chips Shelf Asset" | Rendevr | CC-BY 4.0 |

**Obligation:** the attribution line rendered inside the showroom widget and the license
files must remain while these models are in use. This is the only ongoing license
obligation on the site.

## 5. Open-Source Software (standard permissive licenses, no action required)

Key dependencies (all MIT or similarly permissive; full list in `package.json` /
`package-lock.json`): Next.js, React, Tailwind CSS, three.js, @react-three/fiber,
@react-three/drei, framer-motion, GSAP, Lenis, yet-another-react-lightbox, Sanity
client. Fonts: Geist (Vercel, OFL) and Instrument Serif (Google Fonts, OFL).
No GPL/copyleft code is included. No paid licenses are required to run the site.

## 6. Services & Accounts (transferring per handoff guide Part 3)

| Service | Identifier | Role | Cost |
|---|---|---|---|
| GitHub | universalgraphicstampafl-max/usg-website | Source of truth, version history | Free |
| Netlify | usg-website site | Hosting, builds, CDN, SSL | Free tier |
| Sanity | project 0q65tvx4 | CMS (provisioned for future content editing) | Free tier |
| GoDaddy | USG's own account | Domain + VM (client portal) | USG-held already |
| Outlook Bookings | Preston's scheduler URL (in `lib/booking.ts`) | All "Book a Call" CTAs | USG-held already |

## 7. Source Files Delivered Outside the Repo

The repo is the complete deployable product. Additionally delivered on request:
original Firefly generations and working files (kept in project archive folders,
gitignored: `_archive/`), including image sources used for panels and texture
generation scripts (`optimize-images.py`, `rename-images.sh`).

## 8. What USG Owns After Transfer

Everything in sections 1–3 and 7 outright; section 4 under its CC-BY terms; section 5
under standard open-source terms. No component of the site requires ongoing payment
to any party, and no code or asset remains under Brey's/NxtGen's ownership.
