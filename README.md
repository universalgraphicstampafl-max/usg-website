# Universal Signage & Graphics — Website

The production website for USG: marketing site, interactive 3D showroom, and signage
gallery. Built with Next.js 14, hosted on Netlify, auto-deployed from this repo's
`main` branch.

**Live site:** usg-website.netlify.app (→ usgfla.com after DNS cutover)

## 📚 Start Here

| If you are… | Read |
|---|---|
| Preston / Dyani (owners) | [`docs/HANDOFF-GUIDE.md`](docs/HANDOFF-GUIDE.md) — domain setup, portal connection, taking ownership, swapping images yourselves |
| Elliot (developer) | [`docs/TECHNICAL-RUNBOOK.md`](docs/TECHNICAL-RUNBOOK.md) — local dev, deploy pipeline, env vars & secrets, portal integration code, transfer checklist, gotchas |
| Legal / records | [`docs/IP-ASSET-INVENTORY.md`](docs/IP-ASSET-INVENTORY.md) — what USG owns, license terms |

## ⚡ 60-Second Answers

**Change a gallery or showroom image** → replace the file in `public/images/gallery/` or
`public/images/signtypes/panels/` keeping the **same filename**, commit → live in ~2 min.

**Change a title or description** → edit the quoted text in the list at the top of
`components/GalleryClient.tsx` (gallery grid) or `components/StoreExplorer.tsx`
(3D showroom pins), commit.

**Change where "Book a Call" goes** → one URL in `lib/booking.ts`.

**Something broke after a change** → Netlify → Deploys → click the last good deploy →
**Publish deploy**. The site is instantly back; fix at leisure.

**Site won't build locally** → did you run `npm install --legacy-peer-deps`? (Plain
`npm install` fails — known, documented in the runbook §9.)

**Never delete** → `public/models/licenses/` and the credit line in the 3D showroom
(license requirement, see runbook §9 / handoff guide Part 5).

## Stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · React Three Fiber (3D showroom) ·
Sanity CMS · Netlify. Full detail in the runbook.

## Local Development

```bash
npm install --legacy-peer-deps
cp .env.example .env.local   # fill in values — see runbook §3
npm run dev
```

---

*Built by Dubrey "Brey" Black for Universal Signage & Graphics, 2026. The git history
of this repo is the complete build journal.*
