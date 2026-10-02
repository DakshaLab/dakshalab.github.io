# Daksha Lab, Bagalkot: Website

Free static website hosted on GitHub Pages:
https://(your site address)

## Files

| File | What it is | Edit it when… |
|---|---|---|
| **config.js** | **All settings ("global variables")**: name, phone, WhatsApp, email, room, hospital, address, PIN, Google Maps links, hours, holiday notice, appointment slots, offer banner, doctor & registration numbers, social links, WhatsApp messages, website address | Any contact/location/hours/offer detail changes |
| **data.js** | Catalog: test categories, tests & prices, packages, FAQs | Prices change, add/remove a test or FAQ |
| layout.js | Shared header, footer, map block, mobile bar, Google business info | Adding a page to the menu |
| app.js | Features: test search/filter, booking form, FAQ, hours | Rarely |
| index / tests / packages / book / about / faq / contact / 404 .html | Page text | Rewording a page |
| styles.css | Compiled design (do not edit by hand) | Never by hand |
| input.css | Design source: colours, buttons, cards | Changing the look |
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

- With `web3formsKey: ""`, appointment requests open WhatsApp with all details filled in.
- To receive appointment requests by **email** instead, get a free key at https://web3forms.com (enter the lab's email address), paste it into `web3formsKey` in config.js.

## Rebuilding styles.css (only if new design classes are added)

```
npx @tailwindcss/cli -i input.css -o styles.css --minify
```
