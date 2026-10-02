/* =====================================================================
   DAKSHA LAB – SETTINGS  (the website's "global variables")
   ---------------------------------------------------------------------
   Every detail that may change lives here, in ONE place:
   phone, WhatsApp, email, address, hospital, maps, hours, time slots,
   offer banner, doctor & registration numbers, social links, messages.
   Change a value here and it updates on EVERY page automatically.

   Tests, packages and FAQs are in data.js.

   How to edit on GitHub: open config.js → tap ✏️ → change the text
   inside "quotes" → tap "Commit changes". Live in 1–2 minutes.
   Keep the quotes "", commas , and brackets [ ] { } exactly as they are.

   In page text you can use any setting as {{name}}, e.g. {{phoneDisplay}},
   {{city}}, {{hospital.name}}, {{roomNo}} – it is filled in automatically.
   ===================================================================== */

const CONFIG = {

  /* 1. BUSINESS -------------------------------------------------------- */
  name: "Daksha Lab",
  tagline: "Diagnostic Centre · Bagalkot",
  kannadaTagline: "ನಿಖರ ವರದಿ, ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ",
  city: "Bagalkot",

  /* 2. CONTACT --------------------------------------------------------- */
  phone: "919876543210",              // for the Call button: 91 + 10-digit number, no spaces or +
  phoneDisplay: "+91 98765 43210",    // how the number is shown on the site
  whatsapp: "919876543210",           // WhatsApp number: 91 + 10 digits (can differ from phone)
  email: "info@dakshalab.in",

  /* 3. LOCATION -------------------------------------------------------- */
  roomNo: "Room No. 12",
  hospital: {
    name: "Ashirwad Hospital",
    building: "Kaveri Arcade, 6/127",
    road: "Navanagar Road",
    area: "Mahesh Nagar",
    mapsLink: "https://maps.app.goo.gl/N1uerwUDdMnwgJzX6",   // hospital on Google Maps
  },
  state: "Karnataka",
  pin: "587101",
  howToReach: [
    "Come to {{hospital.name}}, {{hospital.building}}, on {{hospital.road}} ({{hospital.area}}).",
    "Enter the hospital premises.",
    "{{name}} is in {{roomNo}}. Ask at the hospital reception if needed.",
  ],

  /* 4. GOOGLE MAPS & REVIEWS ------------------------------------------- */
  mapsLink: "https://maps.app.goo.gl/5ZheXtx2XPE6u5yu6",    // Daksha Lab on Google Maps
  reviewLink: "",                                          // Google "Ask for reviews" link (shows a Rate-us button when filled)
  mapZoom: 17,                                             // map zoom: 15 = area, 17 = street, 19 = building

  /* 5. OPENING HOURS  (24-hour time; days: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat) */
  hours: [
    { label: "Monday – Saturday", days: [1, 2, 3, 4, 5, 6], open: "06:30", close: "20:30" },
    { label: "Sunday",            days: [0],                open: "07:00", close: "13:00" },
  ],
  holidayNote: "",                  // e.g. "Closed on 20 Oct for Deepavali" – shows a notice bar when filled

  /* 6. APPOINTMENTS ---------------------------------------------------- */
  timeSlots: [
    "6:30 – 8:00 AM (best for fasting tests)",
    "8:00 – 10:00 AM (best for fasting tests)",
    "10:00 AM – 12:00 PM",
    "12:00 – 2:00 PM",
    "4:00 – 6:00 PM",
    "6:00 – 8:00 PM",
  ],
  callbackTime: "30 minutes",       // "we will call you within ..."
  web3formsKey: "",                 // free key from web3forms.com → bookings by email. Empty = bookings go to WhatsApp

  /* 7. OFFER BANNER (top of every page) -------------------------------- */
  offer: { show: true, text: "Dasara offer: Executive Health Checkup at ₹2,999 (save ₹1,800)", link: "packages.html" },

  /* 8. DOCTOR & REGISTRATIONS ------------------------------------------ */
  pathologist: { name: "Dr. ________", qualification: "MD (Pathology)", regNo: "KMC Reg. No. ______" },
  kpmeRegNo: "KPME Reg. No. ______",

  /* 9. SOCIAL MEDIA (leave "" to hide) --------------------------------- */
  social: { instagram: "", facebook: "", youtube: "" },

  /* 10. WHATSAPP MESSAGES (pre-filled text when a visitor taps WhatsApp) */
  messages: {
    general:      "Hello {{name}}, I have a question.",
    book:         "Hello {{name}}, I would like to book an appointment.",
    prescription: "Hello {{name}}, I am sending my prescription photo. Please book the tests.",
    package:      "Hello {{name}}, please suggest a health checkup package for me.",
    testQuery:    "Hello {{name}}, do you do this test: ",
  },

  /* 11. WEBSITE ADDRESS (used for Google sitemap & sharing) ------------ */
  siteUrl: "https://dakshalab.github.io/",
};


/* =====================================================================
   NO NEED TO EDIT BELOW – values worked out automatically from above
   ===================================================================== */
const SITE = (() => {
  const c = CONFIG, h = c.hospital;
  const fill = s => s.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (m, k) => { const v = k.split(".").reduce((o, p) => (o == null ? o : o[p]), c); return v == null ? m : v; });
  const addressLines = [`${c.roomNo}, ${h.name}`, `${h.building}, ${h.road}`, `${h.area}, ${c.city}, ${c.state} ${c.pin}`];
  const mapQuery = `${c.name}, ${h.name}, ${h.building}, ${h.road}, ${c.city} ${c.pin}`;
  return {
    ...c,
    addressLines,
    fullAddress: addressLines.join(", "),
    landmark: `Inside ${h.name} premises`,
    locationShort: `${h.name}, ${h.road}, ${c.city}`,
    hospital: { ...h, address: `${h.building}, ${h.road}, ${h.area}, ${c.city}, ${c.state} ${c.pin}` },
    howToReach: c.howToReach.map(fill),
    mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=${c.mapZoom}&output=embed`,
  };
})();
