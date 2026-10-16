# Vision Properties — website

Website for Vision Properties, a real estate marketing and investment consulting company at B-115, Block H, Main Food Street, North Nazimabad, Karachi.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `projects.html` | All projects, with search and filters |
| `project.html?p=<slug>` | One page per project: photo gallery, details, amenities, map, WhatsApp enquiry |
| `about.html` | About, vision and mission, process, affiliations |
| `contact.html` | Contact details, enquiry form (sends to WhatsApp), map, FAQ |

Each page is one self-contained HTML file with its CSS and JavaScript inlined. Put the pages together in one folder (or deploy the repo root as-is to Vercel or Netlify) and they link to each other.

## Images

Project photos come from the old site's uploads folder. Each image first loads from `images/` in this repo and falls back to the original address if the local copy is missing.

To copy every photo into this repo, so the site doesn't depend on the old WordPress site:

1. Open the **Actions** tab on GitHub.
2. Choose **Copy images into the repo**, then **Run workflow**.

The workflow downloads every file listed in `images.txt` into `images/` and commits them. You can also run `python3 tools/fetch_images.py` on your own computer and push the `images/` folder.

## Editing

The pages are generated from `source/`:

- `source/data.js` holds the projects, contact details, FAQ and image list.
- `source/shared.css` holds the design system: colour and type tokens, glass surfaces, buttons, cards, the rising-word stage, nav, chat and footer.
- `source/engine.js` holds the shared behaviour: the 3D particle background, the blueprint-to-tower build animation, rails, the photo viewer, the assistant and the enquiry forms.
- `source/pages/*.page` hold each page's own layout and script.
- `images/ui/` holds the tower cut-outs, their blueprint line drawings and the transparent logo (dark and light versions).

After editing, run `python3 source/build.py` from the repo root to regenerate the HTML pages. If you add or change images in `data.js`, regenerate `images.txt` as well, then run the workflow again.

All colours are defined once at the top of `source/shared.css` (dark and light themes) and come from the logo: red, black and white.
