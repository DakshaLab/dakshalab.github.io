/* =====================================================================
   DAKSHA LAB – SHARED LAYOUT (header, footer, mobile action bar)
   Change the menu once here and it updates on every page.
   ===================================================================== */

const NAV = [
  { href: "index.html",    label: "Home",      page: "home" },
  { href: "tests.html",    label: "Tests",     page: "tests" },
  { href: "packages.html", label: "Packages",  page: "packages" },
  { href: "book.html",     label: "Home Collection", page: "book" },
  { href: "about.html",    label: "About",     page: "about" },
  { href: "faq.html",      label: "FAQ",       page: "faq" },
  { href: "contact.html",  label: "Contact",   page: "contact" },
];

/* ---------- small helpers used by every page ---------- */
const inr = n => "₹" + Number(n).toLocaleString("en-IN");
const waUrl = msg => "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(msg);
const telUrl = () => "tel:+" + SITE.phone;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fastingText = f => (!f ? "No fasting needed" : f + " hrs fasting");

const ICON = {
  wa: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>',
  phone: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  home: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  flask: '<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7.5 14h9"/></svg>',
};

/* ---------- open / closed status in India time ---------- */
function openStatus() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = now.getDay(), mins = now.getHours() * 60 + now.getMinutes();
  const toMin = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const fmt = t => { let [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return h + ":" + String(m).padStart(2, "0") + " " + ap; };
  const today = SITE.hours.find(h => h.days.includes(day));
  if (today && mins >= toMin(today.open) && mins < toMin(today.close)) return { open: true, text: "Open now · until " + fmt(today.close) };
  if (today && mins < toMin(today.open)) return { open: false, text: "Closed · opens " + fmt(today.open) };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7, h = SITE.hours.find(x => x.days.includes(d));
    if (h) return { open: false, text: "Closed · opens " + (i === 1 ? "tomorrow " : "") + fmt(h.open) };
  }
  return { open: false, text: "Closed" };
}

/* ---------- header ---------- */
function renderHeader() {
  const page = document.body.dataset.page;
  const st = openStatus();
  const links = NAV.map(n => `<a href="${n.href}" class="${n.page === page ? "text-teal-700 font-semibold" : "text-slate-600 hover:text-teal-700"}">${n.label}</a>`).join("");
  const mobileLinks = NAV.map(n => `<a href="${n.href}" class="block rounded-lg px-3 py-3 ${n.page === page ? "bg-teal-50 font-semibold text-teal-800" : "text-slate-700 hover:bg-slate-50"}">${n.label}</a>`).join("");
  const el = document.getElementById("site-header");
  if (!el) return;
  el.outerHTML = `
  ${SITE.offer.show ? `<div class="bg-teal-800 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">${esc(SITE.offer.text)} <a href="book.html" class="ml-1 underline">Book now</a></div>` : ""}
  <header class="sticky top-0 z-40 border-b border-slate-200 bg-white">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
      <a href="index.html" class="flex items-center gap-2">
        <span class="grid h-9 w-9 place-items-center rounded-lg bg-teal-700 text-white">${ICON.flask}</span>
        <span class="leading-tight"><span class="block text-lg font-bold text-slate-900">${esc(SITE.name)}</span><span class="block text-xs text-slate-500">${esc(SITE.tagline)}</span></span>
      </a>
      <nav class="hidden items-center gap-6 text-sm lg:flex">${links}</nav>
      <div class="flex items-center gap-2">
        <span class="hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium sm:inline-flex ${st.open ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-600"}"><span class="h-2 w-2 rounded-full ${st.open ? "bg-emerald-500" : "bg-slate-400"}"></span>${st.text}</span>
        <a href="book.html" class="btn-primary hidden !py-2 text-sm sm:inline-flex">Book Test</a>
        <button id="menu-btn" class="grid h-10 w-10 place-items-center rounded-lg ring-1 ring-slate-300 lg:hidden" aria-label="Open menu" aria-expanded="false">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
    <div id="mobile-menu" class="hidden border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
      <p class="mb-2 inline-flex items-center gap-1.5 text-xs font-medium ${st.open ? "text-emerald-700" : "text-slate-500"}"><span class="h-2 w-2 rounded-full ${st.open ? "bg-emerald-500" : "bg-slate-400"}"></span>${st.text}</p>
      ${mobileLinks}
    </div>
  </header>`;
  const btn = document.getElementById("menu-btn"), menu = document.getElementById("mobile-menu");
  btn.addEventListener("click", () => { const open = menu.classList.toggle("hidden") === false; btn.setAttribute("aria-expanded", open); });
}

/* ---------- footer ---------- */
function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  const fmt = t => { let [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return h + ":" + String(m).padStart(2, "0") + " " + ap; };
  const hours = SITE.hours.map(h => `<div class="flex justify-between gap-4"><dt>${esc(h.label)}</dt><dd class="text-white">${fmt(h.open)} – ${fmt(h.close)}</dd></div>`).join("");
  el.outerHTML = `
  <footer class="bg-slate-900 pb-20 text-slate-300 lg:pb-0">
    <div class="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p class="text-lg font-bold text-white">${esc(SITE.name)}</p>
        <p class="mt-1 text-sm">${esc(SITE.tagline)}</p>
        <address class="mt-4 text-sm not-italic leading-relaxed">${SITE.addressLines.map(esc).join("<br>")}<br>${esc(SITE.landmark)}</address>
        <a href="${SITE.mapsLink}" target="_blank" rel="noopener" class="mt-3 inline-block text-sm font-semibold text-teal-300 hover:underline">Get directions →</a>
      </div>
      <div>
        <p class="font-semibold text-white">Working Hours</p>
        <dl class="mt-4 space-y-2 text-sm">${hours}<div class="flex justify-between gap-4"><dt>Home collection</dt><dd class="text-white">from ${esc(SITE.homeCollectionFrom)}</dd></div></dl>
      </div>
      <div>
        <p class="font-semibold text-white">Quick Links</p>
        <ul class="mt-4 grid grid-cols-2 gap-2 text-sm">${NAV.map(n => `<li><a href="${n.href}" class="hover:text-white">${n.label}</a></li>`).join("")}</ul>
      </div>
      <div>
        <p class="font-semibold text-white">Contact</p>
        <ul class="mt-4 space-y-2 text-sm">
          <li>Phone: <a href="${telUrl()}" class="text-white hover:underline">${esc(SITE.phoneDisplay)}</a></li>
          <li>WhatsApp: <a href="${waUrl("Hello " + SITE.name + ", I have a question.")}" target="_blank" rel="noopener" class="text-white hover:underline">Chat with us</a></li>
          <li>Email: <a href="mailto:${SITE.email}" class="text-white hover:underline">${esc(SITE.email)}</a></li>
        </ul>
        <p class="mt-4 text-xs text-slate-400">${esc(SITE.kpmeRegNo)}</p>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div class="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:justify-between">
        <p>© ${new Date().getFullYear()} ${esc(SITE.name)}, Bagalkot. All rights reserved.</p>
        <p>Report timing depends on the test. Prices may change; please confirm when booking.</p>
      </div>
    </div>
  </footer>

  <!-- Mobile bottom action bar -->
  <nav class="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-slate-200 bg-white text-xs font-semibold lg:hidden" aria-label="Quick actions">
    <a href="${telUrl()}" class="flex flex-col items-center gap-1 py-2.5 text-slate-700">${ICON.phone}Call</a>
    <a href="${waUrl("Hello " + SITE.name + ", I would like to book a test.")}" target="_blank" rel="noopener" class="flex flex-col items-center gap-1 py-2.5 text-green-700">${ICON.wa}WhatsApp</a>
    <a href="book.html" class="flex flex-col items-center gap-1 bg-teal-700 py-2.5 text-white">${ICON.home}Book Home Visit</a>
  </nav>

  <!-- Desktop floating WhatsApp -->
  <a href="${waUrl("Hello " + SITE.name + ", I would like to book a test.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"
     class="fixed bottom-6 right-6 z-50 hidden h-14 w-14 place-items-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 lg:grid">${ICON.wa.replace("h-5 w-5", "h-7 w-7")}</a>`;
}

/* ---------- fill simple placeholders: data-site="phoneDisplay", data-wa="message" ---------- */
function fillPlaceholders() {
  document.querySelectorAll("[data-site]").forEach(el => { el.textContent = SITE[el.dataset.site]; });
  document.querySelectorAll("[data-wa]").forEach(a => { a.href = waUrl(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
  document.querySelectorAll("[data-tel]").forEach(a => { a.href = telUrl(); });
  document.querySelectorAll("[data-icon]").forEach(el => { el.outerHTML = ICON[el.dataset.icon] || ""; });
}

renderHeader();
renderFooter();
fillPlaceholders();
