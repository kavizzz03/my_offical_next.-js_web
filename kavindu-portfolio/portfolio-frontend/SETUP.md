# Kavindu Bogahawatte portfolio: setup

## 1. Website (Next.js project: portfolio-frontend)
Copy these into your project, replacing files with the same name:

| From this folder | To your project |
|---|---|
| `app/page.tsx` | `app/page.tsx` |
| `app/portfolio.css` | `app/portfolio.css` (new, sits next to page.tsx) |
| `app/layout.tsx` | `app/layout.tsx` (keeps importing your own `./globals.css`) |
| `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts` | `app/` (new) |
| everything in `public/` | `public/` |
| `.env.local.example` | rename to `.env.local` in the project root |

Then run `npm run dev` and open http://localhost:3000.
Stop any older dev server first (`taskkill /PID <number> /F` on Windows).

## 2. Contact form (PHP on cPanel)
1. Upload `php/contact.php` to the cPanel folder `Contact` so it is reachable at
   `https://admin.asbfashion.com/Contact/contact.php` (capital C).
2. Open the file and check the settings at the top:
   - `$FROM_EMAIL` must be an address on the domain of that cPanel server
   - `$ALLOWED_ORIGINS` must list your website address(es)
3. Test: `curl -X POST https://admin.asbfashion.com/Contact/contact.php -H "Content-Type: application/json" -d '{"name":"Test","email":"you@example.com","message":"Hello from curl"}'`
   You should get `{"ok":true,...}` and an email in kavindumalshan2003@gmail.com.
4. Note: that server belongs to ASB Fashion. If you lose access, move the script to
   your own hosting and change `NEXT_PUBLIC_CONTACT_URL` in `.env.local`.

## 3. GitHub profile (repository named kavizzz03/kavizzz03)
Copy everything in `github-profile/` into that repository (README.md and
`.github/workflows/`). Then Settings > Actions > General > Workflow permissions >
Read and write, and run both workflows once from the Actions tab.

## 4. After you deploy
- Submit https://www.kavindubogahawatte.dev/sitemap.xml in Google Search Console.
- Test the share image with the LinkedIn Post Inspector.
- Optional: put a real photo at `public/profile.jpg` / `public/avatar.jpg`
  (the site currently uses the illustrated `avatar.svg`).
