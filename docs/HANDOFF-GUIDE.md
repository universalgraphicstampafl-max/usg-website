# USG Website — Official Handoff Guide

**Prepared for:** Universal Signage & Graphics (Preston Packrall, Dyani) + Elliot (portal integration)
**Prepared by:** Dubrey "Brey" Black
**Site:** usg-website.netlify.app → to become your production domain
**Repo:** github.com/universalgraphicstampafl-max/usg-website

This guide is written LEGO-style: each part is numbered steps you can follow without
development experience unless marked **[Technical — for Elliot]**.

---

## PART 1 — Point Your Domain at the Website (GoDaddy → Netlify)

Your domain lives at GoDaddy. The website lives at Netlify. Connecting them is a DNS change.

1. Log in to **GoDaddy → My Products → your domain → DNS**.
2. Add/edit these records (delete any old A records pointing to the previous site first):

   | Type | Name | Value | Purpose |
   |---|---|---|---|
   | A | @ | `75.2.60.5` | Sends `usgfla.com` to Netlify |
   | CNAME | www | `usg-website.netlify.app` | Sends `www.usgfla.com` to Netlify |

3. In **Netlify → Site settings → Domain management → Add custom domain**, enter your domain
   (both apex and www). Netlify will verify the DNS records and issue a free HTTPS
   certificate automatically (allow up to 24 hours for DNS to propagate; usually under 1 hour).
4. Done. Your domain now shows the new site, with SSL, and every future update appears
   automatically — no GoDaddy involvement needed again.

> ⚠️ Do NOT move the website files onto the GoDaddy VM. The site is built for Netlify's
> global CDN (automatic builds, image optimization, HTTPS). The VM stays dedicated to
> your .NET client portal.

---

## PART 2 — Connect the .NET Client Portal (3 Options)

Your client admin portal is a .NET application on a GoDaddy virtual machine. Here are all
three ways to connect it, easiest first. **Option A is recommended.**

### Option A — Portal on a Subdomain (Recommended: 3 steps, ~15 minutes)

The portal gets its own address: `portal.usgfla.com`. The website's **Client Login**
button points to it. Zero code coupling — either side can change without breaking the other.

1. **GoDaddy DNS:** add one record —

   | Type | Name | Value |
   |---|---|---|
   | A | portal | `[YOUR VM's PUBLIC IP ADDRESS]` |

2. **[Technical — for Elliot]** On the VM, bind the .NET site (IIS or Kestrel) to
   `portal.usgfla.com` and install an SSL certificate (free via win-acme/Let's Encrypt,
   or a GoDaddy cert). The portal must serve HTTPS — browsers will block a login page
   linked from an HTTPS site otherwise.
3. **Website:** update one line so every Client Login button points to the portal.
   File: `lib/booking.ts` area / `components/Nav.tsx` — the `Client Login` link href
   becomes `https://portal.usgfla.com`. (One-line change — see Part 4 for how to edit
   files, or ask Brey to make it during the handoff call.)

### Option B — Portal on a Path (usgfla.com/portal)

Feels like one site, but requires a proxy layer. Use only if a single domain is a hard requirement.

1. In the website repo, add to `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/portal/*"
     to = "https://[VM-IP-or-portal-hostname]/:splat"
     status = 200
     force = true
   ```
2. **[Technical — for Elliot]** The .NET app must be configured with path base `/portal`
   (`app.UsePathBase("/portal")` in ASP.NET Core) so its links/assets resolve correctly,
   and must serve HTTPS with a valid certificate.
3. Update the Client Login link to `/portal`. Commit → Netlify redeploys automatically.

> Note: proxied setups add a failure point (if the VM is down, /portal errors on your
> main domain) and complicate cookies/auth. Option A avoids all of this.

### Option C — Deep API Integration (future phase)

The Next.js site calls the portal's .NET APIs directly (shared login state, portal data
embedded in site pages). This is a development project, not a configuration step:

1. Elliot exposes the portal's REST endpoints over HTTPS with CORS allowing the site domain.
2. Site pages fetch from those endpoints (server-side via Next.js route handlers to keep
   keys private).
3. Shared auth via JWT or cookie domain scoped to `.usgfla.com` (works because both
   apps share the root domain if you used Option A's subdomain).

Recommendation: launch with Option A today; treat Option C as a scoped phase-2 project
if you want a unified logged-in experience later.

---

## PART 3 — Ownership Transfer (all accounts → USG)

Three accounts hold the website. All three transfer to USG-owned logins.

1. **GitHub (the code):** USG creates a free GitHub organization (e.g. `usg-fla`).
   Brey runs: repo → Settings → Danger Zone → **Transfer ownership** → `usg-fla`.
   All history, branches, and files move intact. Add Elliot as admin.
2. **Netlify (the hosting):** USG creates a free Netlify account/team. Brey uses
   Site → Site settings → **Transfer site** to move `usg-website` to USG's team.
   Reconnect the GitHub repo under the new ownership so auto-deploys continue
   (Netlify prompts for this — two clicks).
3. **Sanity (the CMS, project `0q65tvx4`):** In sanity.io → project → Members,
   USG's email is added as Administrator; Brey then steps down to invited member
   or leaves. (Sanity project ownership follows the admin role.)

4. **Environment variables & secrets:** the Netlify site carries three environment
   variables (Sanity project ID, dataset, and an API token). They transfer with the site
   automatically, but the **Sanity API token must be rotated** — USG issues a fresh token
   under its own Sanity account, updates it in Netlify, and revokes the old one.
   Step-by-step in the Technical Runbook (docs/TECHNICAL-RUNBOOK.md), which is Elliot's
   companion document with all commands, code snippets, and the transfer-day checklist.

After transfer, USG owns 100% of the code, hosting, and content infrastructure.
Brey retains no access except what you choose to grant for support.

---

## PART 4 — Managing the Site Yourselves (the "image swap" workflow)

The most common task — replacing a gallery or showroom image — takes 3 steps and no tools
beyond a web browser:

1. Go to the GitHub repo → navigate to the image's folder:
   - Gallery grid images: `public/images/gallery/`
   - 3D showroom pin images: `public/images/signtypes/panels/`
2. Click the file you want to replace → the **⋯ menu → Delete file**, then **Add file →
   Upload files** and upload the new image **with the exact same filename** (this is the
   LEGO trick — same name means zero code changes).
3. Commit the change (green button). Netlify sees the commit and republishes the site
   automatically in ~2 minutes. Done.

Rules of thumb: keep images under ~1,500px on the long side and prefer `.webp` or `.jpg`;
matching the old filename exactly (including extension) means nothing else ever needs editing.
Changing titles/text requires editing two files (`components/GalleryClient.tsx` for the grid,
`components/StoreExplorer.tsx` for the 3D pins) — each is a plain-English list near the top
of the file; edit the quoted text, commit, auto-deploy.

---

## PART 5 — One Ongoing Obligation (do not delete)

The 3D showroom uses four licensed models under **Creative Commons CC-BY 4.0**
(commercial use allowed, attribution required). The credit line inside the showroom
widget and the license files in `public/models/licenses/` **must remain** on the site
for as long as the models are used. Removing them would be a license violation.
Full details in the IP & Asset Inventory.

---

## Quick Reference

| Item | Value |
|---|---|
| Production hosting | Netlify (auto-deploys from `main` branch) |
| Netlify apex A record | 75.2.60.5 |
| Repo | github.com/universalgraphicstampafl-max/usg-website |
| CMS | Sanity, project `0q65tvx4` |
| Framework | Next.js 14 (React 18, TypeScript, Tailwind CSS) |
| 3D | React Three Fiber + drei, draco-compressed GLB assets |
| Portal | .NET on GoDaddy VM → `portal.usgfla.com` (Option A) |
| Support | Brey — available post-handoff for questions |
