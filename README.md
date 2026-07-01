# heel. waitlist landing page

A static waitlist page at `www.liveheel.com/waitlist`, styled to match the
existing heel. brand (sage green, Cormorant Garamond italic headlines, Inter
body, the heel. logo). The root domain (`www.liveheel.com`) redirects to
`/waitlist` for now, since the Shopify store is being wound down and there's
nothing else there. Submissions are relayed by a small Google Apps Script to
a dedicated "Heel Waitlist" Notion database — kept fully separate from any
other contact lists (Master Contacts, retreat/growth accelerator contacts, etc.).

No paid services and no new accounts beyond ones you already have (GitHub,
Google, Notion).

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

Already pushed to `github.com/thesarahlea/heel-waitlist`. Once the repo is
public, enable it under **Settings → Pages → Source: Deploy from branch →
master / (root)**.

## 4. Point www.liveheel.com at it

A `CNAME` file at the repo root already contains `www.liveheel.com`, telling
GitHub Pages to serve this whole repo at that domain (so `/waitlist` becomes
`www.liveheel.com/waitlist`).

At wherever `liveheel.com`'s DNS is managed (still to be confirmed — check
your domain registrar; it may currently be Shopify Domains), add:

- A **CNAME record** for `www` → `thesarahlea.github.io`
- Optionally, for the bare apex (`liveheel.com` with no `www`), four **A
  records** pointing to GitHub Pages' IPs:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

Then in GitHub → **Settings → Pages**, enter `www.liveheel.com` under
**Custom domain**, and tick **Enforce HTTPS** once DNS has propagated (can
take up to a few hours).

## Files

- `index.html` — redirects root domain to `/waitlist`
- `waitlist/index.html` — the actual signup page (signup + inline thank-you state, no page reload)
- `waitlist/apps-script.gs` — paste into script.google.com; relays email → Notion
- `waitlist/assets/` — brand logo + dog illustration
- `CNAME` — tells GitHub Pages to serve this repo at www.liveheel.com
