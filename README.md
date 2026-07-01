# heel. waitlist landing page

A single static page (`index.html`) collecting waitlist emails, styled to match
the existing heel. brand (sage green, Cormorant Garamond italic headlines,
Inter body, the heel. logo). Submissions are relayed by a small Google Apps
Script to a dedicated "Heel Waitlist" Notion database — kept fully separate
from any other contact lists (Master Contacts, retreat/growth accelerator
contacts, etc.).

No paid services and no new accounts beyond ones you already have (GitHub,
Google, Notion).

## 1. Set up the Google Apps Script relay

This keeps your Notion API token out of the public page — GitHub Pages can
only serve static files, so the token can never live in `index.html` itself.

1. Go to https://script.google.com → **New project**.
2. Delete the placeholder code and paste in the contents of `apps-script.gs`.
3. Click the gear icon (**Project Settings**) → **Script Properties** → **Add script property**, and add:
   - `NOTION_TOKEN` → your Notion integration token
   - `NOTION_DATABASE_ID` → the Heel Waitlist database ID (see step 2 below)
4. Click **Deploy** → **New deployment** → type: **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, authorize the permissions prompt, and copy the resulting
   `.../exec` URL.
6. Open `index.html` and replace `PASTE_YOUR_APPS_SCRIPT_URL_HERE` in the
   `<form action="...">` line with that URL.

## 2. Notion database

A "Heel Waitlist" database gets created for you (separate container, not
inside any existing CRM database) with three properties: `Email` (title),
`Joined` (date), `Source` (select). Once created you'll get its database ID
to paste into the Apps Script property above.

## 3. Deploy to GitHub Pages

```bash
cd heel-waitlist
git init
git add .
git commit -m "Heel waitlist landing page"
git branch -M main
git remote add origin <your-new-empty-github-repo-url>
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from branch → main / (root)**.
Your page will be live at `https://<username>.github.io/<repo>/` within a
minute or two.

## 4. Point liveheel.com at it (optional)

Since you still own the domain even though Shopify is closing:

1. In the repo, create a file named `CNAME` (no extension) containing just:
   ```
   liveheel.com
   ```
   (or `www.liveheel.com` if you'd rather use the www subdomain)
2. In GitHub → **Settings → Pages**, enter the same domain under **Custom domain**.
3. At wherever `liveheel.com`'s DNS is managed (check your domain registrar —
   this may still be Shopify Domains, or elsewhere if you moved it), add:
   - For the apex domain (`liveheel.com`): four **A records** pointing to
     GitHub Pages' IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - For `www.liveheel.com`: a **CNAME record** pointing to
     `<username>.github.io`
4. Back in GitHub Pages settings, tick **Enforce HTTPS** once DNS has
   propagated (can take up to a few hours).

## Files

- `index.html` — the landing page (signup + inline thank-you state, no page reload)
- `apps-script.gs` — paste into script.google.com; relays email → Notion
- `assets/heel-logo-white.png`, `assets/heel-dog-transparent.png` — brand assets
