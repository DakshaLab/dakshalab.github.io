# Daksha Lab, Bagalkot: Website

- Website: https://dakshalab.github.io/
- Admin page: https://dakshalab.github.io/dakshalab-bagalkot-admin.html

Free static website hosted on GitHub Pages:
https://(your site address)

## Admin page (easiest way to update)

Open **/dakshalab-bagalkot-admin.html** on the website. Edit contact details, address, maps, hours,
holiday notice, appointment slots, offer banner, WhatsApp messages, doctor & legal details,
social links, every test/price/package/FAQ/testimonial, all page wording (menus, buttons,
footer notes, policies & disclaimers, page-not-found page),
the logo (3 ready-made or upload your own), the Bagalkot banner, and your own photos. Tap **Download**, extract the zip, and upload the files to GitHub (Add file → Upload files → Commit).
The admin page cannot publish by itself; only someone signed in to GitHub can update the site.

## Reviews & photos (no Google setup needed)

- **What Patients Say** on the Home page shows testimonials added in the admin page, plus
  "Read all reviews on Google Maps" and (if a review link is set) "Write a review" buttons.
- **Photos** on the About page are the ones uploaded in the admin page, plus a link to more photos on Google Maps.
- The map on the Contact/Home pages is a plain Google Maps embed and needs no key.

## Files

| File | What it is | Edit it when… |
|---|---|---|
| dakshalab-bagalkot-admin.html + admin.js | The admin editor | Never (use it, don't edit it) |
| **config.js** | **All settings ("global variables")**: name, phone, WhatsApp, email, room, hospital, address, PIN, Google Maps links, hours, holiday notice, appointment slots, offer banner, doctor & registration numbers, social links, WhatsApp messages, website address, legal/grievance details | Any contact/location/hours/offer detail changes |
| **data.js** | Catalog: test categories, tests & prices, packages, FAQs | Prices change, add/remove a test or FAQ |
| layout.js | Shared header, footer, map block, mobile bar, Google business info | Adding a page to the menu |
| app.js | Features: test search/filter, booking form, FAQ, hours | Rarely |
| index / tests / packages / book / about / faq / contact / 404 .html | Page text | Rewording a page |
| policies.html | Policies page; its text is in config.js (`text.policies`), edited in the admin page | Never by hand |
| styles.css | Compiled design (do not edit by hand) | Never by hand |
| input.css | Design source: colours, buttons, cards | Changing the look |
| logo-drop.svg, logo-flask.svg, logo-hex.svg, banner-bagalkot.svg, og-image.png | Logos, Home banner, link-preview image | Choose logo/banner in the admin page |
| photo-*.jpg, logo.png | Photos/logo uploaded via the admin page | Upload with the admin zip |
| robots.txt, sitemap.xml | Help Google find the pages | Website address changes |

### Using settings inside page text
Write `{{settingName}}` anywhere in a page or in data.js and it is filled in from config.js,
e.g. `{{name}}`, `{{phoneDisplay}}`, `{{city}}`, `{{roomNo}}`, `{{hospital.name}}`, `{{fullAddress}}`, `{{callbackTime}}`.

Note: browser-tab titles and link-preview text are written into the pages when they are built.
If you change the lab or hospital name, ask Claude to rebuild so those update too.

## Everyday edits (no coding)

1. Open the file on GitHub (config.js for settings, data.js for tests/prices) and tap the pencil icon ✏️.
2. Change only the text inside "quotes" or the numbers.
3. Tap **Commit changes**. The site updates in 1–2 minutes.

## Appointment form

The form does not send data to any server: it opens WhatsApp with the patient's details filled in,
and the patient taps Send. Requests arrive on the lab's WhatsApp number set in the admin page.

## Rebuilding styles.css (only if new design classes are added)

```
npx @tailwindcss/cli -i input.css -o styles.css --minify
```
