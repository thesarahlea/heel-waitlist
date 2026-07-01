# heel. waitlist landing page

A static waitlist page, styled to match the existing heel. brand (sage green,
Cormorant Garamond italic headlines, Inter body, the heel. logo). Live at:

**https://thesarahlea.github.io/heel-waitlist/waitlist/**

The repo root redirects there too, so the base URL
(`https://thesarahlea.github.io/heel-waitlist/`) also lands on the signup
page. Submissions are relayed by a small Google Apps Script to a dedicated
"Heel Waitlist" Notion database — kept fully separate from any other contact
lists (Master Contacts, retreat/growth accelerator contacts, etc.).

No paid services and no new accounts beyond ones you already have (GitHub,
Google, Notion). Not connected to `liveheel.com` — the domain is currently
tied up in the Shopify store closure, so this uses the free GitHub Pages URL
for now. A custom domain can be connected later once that's sorted out
(just needs a DNS record added wherever the domain ends up).

## 1. Set up the Google Apps Script relay

This keeps your Notion API token out of the public page — GitHub Pages can
only serve static files, so the token can never live in the HTML itself.

1. Go to https://script.google.com → **New project**.
2. Delete the placeholder code and paste in the contents of `waitlist/apps-script.gs`.
3. Click the gear icon (**Project Settings**) → **Script Properties** → **Add script property**, and add:
   - `NOTION_TOKEN` → your Notion integration token
   - `NOTION_DATABASE_ID` → the Heel Waitlist database ID (see step 2 below)
4. Click **Deploy** → **New deployment** → type: **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, authorize the permissions prompt, and copy the resulting
   `.../exec` URL.
6. Open `waitlist/index.html` and replace `PASTE_YOUR_APPS_SCRIPT_URL_HERE` in
   the `<form action="...">` line with that URL.

## 2. Notion database

A "Heel Waitlist" database gets created for you (separate container, not
inside any existing CRM database) with three properties: `Email` (title),
`Joined` (date), `Source` (select). Once created you'll get its database ID
to paste into the Apps Script property above.

## 3. Deploy to GitHub Pages

Already pushed to `github.com/thesarahlea/heel-waitlist`, repo is public,
GitHub Pages is enabled (Settings → Pages → Source: Deploy from branch →
master / (root)).

## 4. Connect a custom domain later (optional)

Once the `liveheel.com` situation with Shopify is resolved, connecting it is
just:

1. Add a `CNAME` file at the repo root containing the domain
2. Add a DNS record wherever the domain ends up (CNAME → `thesarahlea.github.io`
   for a `www` subdomain, or 4 A records for the bare apex domain — GitHub
   Pages' IPs are `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`)
3. Enter the domain under GitHub → Settings → Pages → Custom domain

## Files

- `index.html` — redirects to `/waitlist`
- `waitlist/index.html` — the actual signup page (signup + inline thank-you state, no page reload)
- `waitlist/apps-script.gs` — paste into script.google.com; relays email → Notion
- `waitlist/assets/` — brand logo + dog illustration
