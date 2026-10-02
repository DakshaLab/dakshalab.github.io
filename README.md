# Daksha Lab, Bagalkot: Website

Free static website hosted on GitHub Pages:
https://(your site address)

## Files

| File | What it is | Edit it when… |
|---|---|---|
| **data.js** | ALL content: phone, WhatsApp, address, hours, offer banner, tests, prices, packages, FAQs, service areas, time slots, form key | Prices change, add/remove a test, new offer, new phone number |
| layout.js | Shared header menu, footer, mobile Call/WhatsApp/Book bar | Adding a new page to the menu |
| app.js | Features: test search/filter, Add-to-booking, booking form, FAQ, contact hours | Rarely |
| index.html | Home page text | Changing home page headings |
| tests.html | Test catalog page | Rarely (tests come from data.js) |
| packages.html | Health packages page | Rarely (packages come from data.js) |
| book.html | Home collection booking form | Changing form fields |
| about.html | About Us text | Updating the story or team |
| faq.html | FAQ page (questions come from data.js) | Rarely |
| contact.html | Address, hours, map | Rarely (details come from data.js) |
| 404.html | "Page not found" page | Never |
| styles.css | Compiled design (do not edit by hand) | Never by hand |
| input.css | Design source: colours, buttons, cards | Changing the look (then rebuild styles.css) |
| robots.txt, sitemap.xml | Help Google find the pages | Adding a new page |

## Everyday edits (no coding)

1. Open the file on GitHub (usually data.js) and tap the pencil icon ✏️.
2. Change only the text inside "quotes" or the numbers.
3. Tap **Commit changes**. The site updates in 1–2 minutes.

## Booking form

- With `web3formsKey: ""`, form bookings open WhatsApp with all details filled in.
- To receive bookings by **email** instead, get a free key at https://web3forms.com (enter the lab's email address), paste it into `web3formsKey` in data.js.

## Rebuilding styles.css (only if new design classes are added)

```
npx @tailwindcss/cli -i input.css -o styles.css --minify
```
