/* =====================================================================
   DAKSHA LAB – ADMIN EDITOR (used only by dakshalab-bagalkot-admin.html)
   Edits everything in config.js and data.js, then downloads a zip with
   the updated files to upload to GitHub. Nothing is saved on any server.
   ===================================================================== */

const clone = o => JSON.parse(JSON.stringify(o));
const S = {
  cfg: clone(CONFIG),
  data: { CATEGORIES: clone(CATEGORIES), TESTS: clone(TESTS), PACKAGES: clone(PACKAGES), FAQS: clone(FAQS), TESTIMONIALS: clone(TESTIMONIALS), GALLERY: clone(typeof GALLERY !== "undefined" ? GALLERY : []) },
  files: {},          // new images to include in the download, e.g. { "logo.png": Blob }
  dirty: false,
};
const DRAFT_KEY = "daksha-admin-draft";
try { const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null"); if (d && d.cfg && d.data) { const merge = (a, b) => { for (const k in b) a[k] = (a[k] && b[k] && typeof a[k] === "object" && !Array.isArray(a[k]) && typeof b[k] === "object" && !Array.isArray(b[k])) ? merge(a[k], b[k]) : b[k]; return a; }; S.cfg = merge(S.cfg, d.cfg); S.data = { ...S.data, ...d.data }; S.restored = true; } } catch {}

const $ = s => document.querySelector(s);
const h = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
const set = (obj, path, val) => { const ks = path.split("."); const last = ks.pop(); const t = ks.reduce((o, k) => (o[k] = o[k] ?? {}), obj); t[last] = val; };
function changed() { S.dirty = true; try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ cfg: S.cfg, data: S.data })); } catch {} $("#status").textContent = "Unsaved changes – tap Download when done"; $("#status").className = "text-sm font-semibold text-amber-700"; }

/* ---------- field builders (root = S.cfg or an item object) ---------- */
let UID = 0;
function field(root, path, label, opts = {}) {
  const id = "f" + (UID++), v = get(root, path), help = opts.help ? `<p class="mt-1 text-xs text-slate-500">${opts.help}</p>` : "";
  const wrap = document.createElement("div");
  const t = opts.type || "text";
  if (t === "checkbox") {
    wrap.innerHTML = `<label class="flex items-center gap-2 text-sm font-medium text-slate-700"><input id="${id}" type="checkbox" class="h-4 w-4 accent-teal-700" ${v ? "checked" : ""}> ${label}</label>${help}`;
    wrap.querySelector("input").addEventListener("change", e => { set(root, path, e.target.checked); changed(); opts.onChange && opts.onChange(); });
    return wrap;
  }
  let input;
  if (t === "textarea" || t === "lines") input = `<textarea id="${id}" rows="${opts.rows || 3}" class="field">${h(t === "lines" ? (v || []).join("\n") : v)}</textarea>`;
  else if (t === "select") input = `<select id="${id}" class="field">${opts.options.map(o => { const [val, txt] = Array.isArray(o) ? o : [o, o]; return `<option value="${h(val)}" ${String(v) === String(val) ? "selected" : ""}>${h(txt)}</option>`; }).join("")}</select>`;
  else input = `<input id="${id}" type="${t === "number" ? "number" : t === "time" ? "time" : "text"}" ${t === "number" ? 'inputmode="decimal"' : ""} value="${h(v)}" class="field" ${opts.placeholder ? `placeholder="${h(opts.placeholder)}"` : ""}>`;
  wrap.innerHTML = `<label for="${id}" class="label">${label}</label>${input}${help}`;
  const el = wrap.querySelector("#" + id);
  el.addEventListener(t === "select" ? "change" : "input", () => {
    let val = el.value;
    if (t === "number") val = val === "" ? "" : Number(val);
    if (t === "lines") val = val.split("\n").map(x => x.trim()).filter(Boolean);
    if (opts.parse) val = opts.parse(val);
    set(root, path, val); changed(); opts.onChange && opts.onChange();
  });
  return wrap;
}
function daysField(root, path) {
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], cur = get(root, path) || [];
  const wrap = document.createElement("div");
  wrap.innerHTML = `<p class="label">Days</p><div class="mt-1 flex flex-wrap gap-2">${names.map((n, i) => `<label class="flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1.5 text-sm ring-1 ring-slate-200"><input type="checkbox" value="${i}" class="accent-teal-700" ${cur.includes(i) ? "checked" : ""}>${n}</label>`).join("")}</div>`;
  wrap.addEventListener("change", () => { set(root, path, [...wrap.querySelectorAll("input:checked")].map(x => Number(x.value))); changed(); });
  return wrap;
}
function group(title, children, note) {
  const s = document.createElement("section");
  s.className = "card space-y-4";
  s.innerHTML = `<h2 class="text-lg font-semibold text-slate-900">${title}</h2>${note ? `<p class="-mt-2 text-sm text-slate-500">${note}</p>` : ""}`;
  children.forEach(c => s.appendChild(c));
  return s;
}
function grid(...children) { const d = document.createElement("div"); d.className = "grid gap-4 sm:grid-cols-2"; children.forEach(c => d.appendChild(c)); return d; }

/* ---------- repeatable list editor ---------- */
function listEditor({ list, summary, fields, blank, addLabel, onChange }) {
  const box = document.createElement("div");
  box.className = "space-y-3";
  const draw = () => {
    box.innerHTML = "";
    list.forEach((item, i) => {
      const d = document.createElement("details");
      d.className = "rounded-xl bg-slate-50 ring-1 ring-slate-200 open:bg-white open:ring-teal-600";
      d.innerHTML = `<summary class="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm"><span class="font-medium text-slate-900">${summary(item, i)}</span><span class="text-slate-400">✎</span></summary>`;
      const body = document.createElement("div");
      body.className = "space-y-4 border-t border-slate-200 p-4";
      fields(item, () => { d.querySelector("summary span").innerHTML = summary(item, i); onChange && onChange(); }).forEach(f => body.appendChild(f));
      const bar = document.createElement("div");
      bar.className = "flex flex-wrap gap-2 pt-2";
      bar.innerHTML = `<button type="button" data-a="up" class="btn-outline !px-3 !py-1.5 text-xs">↑ Move up</button><button type="button" data-a="down" class="btn-outline !px-3 !py-1.5 text-xs">↓ Move down</button><button type="button" data-a="del" class="btn !px-3 !py-1.5 text-xs bg-rose-50 text-rose-700 ring-1 ring-rose-200 inline-flex items-center rounded-xl font-semibold">Delete</button>`;
      bar.addEventListener("click", e => {
        const a = e.target.dataset.a; if (!a) return;
        if (a === "del" && !confirm("Delete this item?")) return;
        if (a === "del") list.splice(i, 1);
        if (a === "up" && i > 0) [list[i - 1], list[i]] = [list[i], list[i - 1]];
        if (a === "down" && i < list.length - 1) [list[i + 1], list[i]] = [list[i], list[i + 1]];
        changed(); draw(); onChange && onChange();
      });
      body.appendChild(bar);
      d.appendChild(body);
      box.appendChild(d);
    });
    const add = document.createElement("button");
    add.type = "button"; add.className = "btn-primary w-full !py-2.5 text-sm"; add.textContent = "+ " + addLabel;
    add.addEventListener("click", () => { list.push(blank()); changed(); draw(); box.querySelectorAll("details")[list.length - 1].open = true; });
    box.appendChild(add);
  };
  draw();
  return box;
}

/* ---------- automatic editor for nested text (used for Page text) ---------- */
const human = k => k.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase());
function autoEditor(obj) {
  const out = [];
  Object.keys(obj).forEach(k => {
    const v = obj[k];
    if (typeof v === "string") out.push(field(obj, k, human(k), { type: v.length > 70 ? "textarea" : "text", rows: 3 }));
    else if (typeof v === "number") out.push(field(obj, k, human(k), { type: "number" }));
    else if (Array.isArray(v) && v.every(x => typeof x === "string")) out.push(field(obj, k, human(k) + " (one per line)", { type: "lines", rows: Math.max(4, v.length + 1) }));
    else if (Array.isArray(v)) {
      const keys = Object.keys(v[0] || { title: "", text: "" });
      const wrap = document.createElement("div");
      wrap.innerHTML = `<p class="label">${human(k)}</p>`;
      wrap.appendChild(listEditor({
        list: v, addLabel: "Add " + human(k).toLowerCase() + " item",
        summary: it => h([it.icon, it.value, it.title || it.text || it.label].filter(Boolean).join(" ")) || "New item",
        blank: () => Object.fromEntries(keys.map(x => [x, Array.isArray((v[0] || {})[x]) ? [] : ""])),
        fields: (it, up) => keys.map(x => Array.isArray(it[x])
          ? field(it, x, human(x) + ' (one per line; start a line with "- " for a bullet or "## " for a subheading)', { type: "lines", rows: Math.max(6, (it[x] || []).length + 2) })
          : field(it, x, human(x), { type: String(it[x] || "").length > 70 ? "textarea" : "text", onChange: up })),
      }));
      out.push(wrap);
    } else if (v && typeof v === "object") {
      const fs = document.createElement("fieldset");
      fs.className = "space-y-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200";
      fs.innerHTML = `<legend class="px-1 text-sm font-semibold text-slate-700">${human(k)}</legend>`;
      autoEditor(v).forEach(x => fs.appendChild(x));
      out.push(fs);
    }
  });
  return out;
}

async function resizeImage(file, maxSide, type) {
  const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = URL.createObjectURL(file); });
  const k = Math.min(1, maxSide / Math.max(img.width, img.height));
  const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
  return new Promise(res => c.toBlob(res, type, 0.9));
}

/* ---------- sections ---------- */
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || "item" + Date.now();
const fastingParse = v => (/^\d+$/.test(String(v).trim()) ? Number(v) : String(v).trim());

const SECTIONS = {
  "Contact & Business": () => [
    group("Business", [grid(field(S.cfg, "name", "Lab name"), field(S.cfg, "city", "City")), grid(field(S.cfg, "tagline", "Tagline (under the logo)"), field(S.cfg, "kannadaTagline", "Kannada tagline"))]),
    group("Contact", [
      grid(field(S.cfg, "phone", "Phone for Call button", { help: "91 + 10 digits, no spaces, e.g. 919880400990", parse: v => v.replace(/\D/g, "") }),
           field(S.cfg, "phoneDisplay", "Phone as shown on site", { placeholder: "+91 98804 00990" })),
      grid(field(S.cfg, "whatsapp", "WhatsApp number", { help: "91 + 10 digits", parse: v => v.replace(/\D/g, "") }), field(S.cfg, "email", "Email")),
    ]),
  ],
  "Location & Maps": () => [
    group("Address", [
      grid(field(S.cfg, "roomNo", "Room / shop no."), field(S.cfg, "hospital.name", "Hospital / building name")),
      grid(field(S.cfg, "hospital.building", "Building & door no."), field(S.cfg, "hospital.road", "Road")),
      grid(field(S.cfg, "hospital.area", "Area"), field(S.cfg, "pin", "PIN code")),
      field(S.cfg, "state", "State"),
      field(S.cfg, "howToReach", "How to reach us (one step per line)", { type: "lines", rows: 4, help: "You can use {{name}}, {{roomNo}}, {{hospital.name}}…" }),
    ]),
    group("Google Maps", [
      field(S.cfg, "mapsLink", "Daksha Lab Google Maps link"),
      field(S.cfg, "hospital.mapsLink", "Hospital Google Maps link"),
      field(S.cfg, "mapZoom", "Map zoom (15 area – 19 building)", { type: "number" }),
      field(S.cfg, "reviewLink", "Google 'Ask for reviews' link", { help: "Shows a 'Write a review' button" }),
    ]),
  ],
  "Hours": () => [
    group("Opening hours", [listEditor({
      list: S.cfg.hours, addLabel: "Add hours row",
      summary: r => `${h(r.label || "New row")} · ${h(r.open)}–${h(r.close)}`,
      blank: () => ({ label: "", days: [], open: "09:00", close: "18:00" }),
      fields: (r, up) => [field(r, "label", "Label shown", { placeholder: "Monday – Saturday", onChange: up }), daysField(r, "days"), grid(field(r, "open", "Opens", { type: "time", onChange: up }), field(r, "close", "Closes", { type: "time", onChange: up }))],
    })], "For 24 hours use 00:00 to 23:59. Leave a day unticked if closed."),
    group("Holiday notice", [field(S.cfg, "holidayNote", "Notice bar text (leave empty to hide)", { placeholder: "Closed on 20 Oct for Deepavali" })]),
  ],
  "Appointments & Offer": () => [
    group("Appointments", [
      field(S.cfg, "timeSlots", "Time slots (one per line)", { type: "lines", rows: 6 }),
      field(S.cfg, "callbackTime", "We call back within…"),
    ]),
    group("Offer banner", [field(S.cfg, "offer.show", "Show offer banner", { type: "checkbox" }), field(S.cfg, "offer.text", "Offer text"), field(S.cfg, "offer.link", "Banner link", { placeholder: "packages.html" })]),
    group("WhatsApp messages", [
      field(S.cfg, "messages.general", "General question"), field(S.cfg, "messages.book", "Book appointment"),
      field(S.cfg, "messages.prescription", "Prescription"), field(S.cfg, "messages.package", "Package advice"), field(S.cfg, "messages.testQuery", "Ask about a test"),
    ], "Use {{name}} for the lab name."),
  ],
  "Doctor & Legal": () => [
    group("Pathologist & registrations", [grid(field(S.cfg, "pathologist.name", "Pathologist name"), field(S.cfg, "pathologist.qualification", "Qualification")), grid(field(S.cfg, "pathologist.regNo", "KMC Reg. No."), field(S.cfg, "kpmeRegNo", "KPME Reg. No."))]),
    group("Legal & grievance", [
      field(S.cfg, "legal.relation", "Relationship with hospital", { type: "select", options: [["independent", "Independent lab in rented space"], ["part", "Part of the hospital"]] }),
      grid(field(S.cfg, "legal.emergencyNumber", "Emergency number"), field(S.cfg, "legal.responseDays", "Reply to complaints within (days)")),
      grid(field(S.cfg, "legal.grievanceOfficer", "Grievance officer name"), field(S.cfg, "legal.grievanceEmail", "Grievance email")),
      grid(field(S.cfg, "legal.grievancePhone", "Grievance phone"), field(S.cfg, "legal.policyUpdated", "Policies last updated")),
    ]),
  ],
  "Social & Website": () => [
    group("Social media", [field(S.cfg, "social.instagram", "Instagram link"), field(S.cfg, "social.facebook", "Facebook link"), field(S.cfg, "social.youtube", "YouTube link")]),
    group("Website", [field(S.cfg, "siteUrl", "Website address")]),
  ],
  "Tests": () => [
    group("Test categories", [field(S.data, "CATEGORIES", "Categories (one per line, used for filter buttons)", { type: "lines", rows: 5 })]),
    group(`Tests (${S.data.TESTS.length})`, [listEditor({
      list: S.data.TESTS, addLabel: "Add test",
      summary: t => `${h(t.name || "New test")} · ₹${h(t.price)}`,
      blank: () => ({ id: "", name: "", category: S.data.CATEGORIES[0] || "", includes: "", price: 0, fasting: 0, report: "Same day" }),
      fields: (t, up) => [
        field(t, "name", "Test name", { onChange: () => { if (!t.id) t.id = slug(t.name); up(); } }),
        grid(field(t, "price", "Price (₹)", { type: "number", onChange: up }), field(t, "category", "Category", { type: "select", options: S.data.CATEGORIES })),
        field(t, "includes", "What it includes"),
        grid(field(t, "fasting", "Fasting hours (0 = none)", { parse: fastingParse, help: "e.g. 0, 8 or 10–12" }), field(t, "report", "Report time", { placeholder: "Same day" })),
        field(t, "note", "Extra note (optional)"),
        field(t, "popular", "Show on Home page", { type: "checkbox" }),
      ],
    })]),
  ],
  "Packages": () => [
    group(`Health packages (${S.data.PACKAGES.length})`, [listEditor({
      list: S.data.PACKAGES, addLabel: "Add package",
      summary: p => `${h(p.name || "New package")} · ₹${h(p.price)}`,
      blank: () => ({ id: "", name: "", price: 0, mrp: 0, parameters: 0, fasting: 0, idealFor: "", includes: [] }),
      fields: (p, up) => [
        field(p, "name", "Package name", { onChange: () => { if (!p.id) p.id = slug(p.name); up(); } }),
        grid(field(p, "price", "Price (₹)", { type: "number", onChange: up }), field(p, "mrp", "Crossed-out price (₹, 0 = none)", { type: "number" })),
        grid(field(p, "parameters", "No. of parameters", { type: "number" }), field(p, "fasting", "Fasting hours", { parse: fastingParse })),
        field(p, "idealFor", "Ideal for"),
        field(p, "includes", "Includes (one per line)", { type: "lines", rows: 5 }),
        field(p, "featured", "Highlight as 'Best value'", { type: "checkbox" }),
      ],
    })]),
  ],
  "FAQs": () => [
    group(`FAQs (${S.data.FAQS.length})`, [listEditor({
      list: S.data.FAQS, addLabel: "Add question",
      summary: f => h(f.q || "New question"),
      blank: () => ({ q: "", a: "" }),
      fields: (f, up) => [field(f, "q", "Question", { onChange: up }), field(f, "a", "Answer", { type: "textarea", rows: 4 })],
    })]),
  ],
  "Testimonials": () => [
    group("Testimonials", [listEditor({
      list: S.data.TESTIMONIALS, addLabel: "Add testimonial",
      summary: t => `${h(t.name || "New")} · ${"★".repeat(t.stars || 5)}`,
      blank: () => ({ name: "", stars: 5, text: "", link: "" }),
      fields: (t, up) => [grid(field(t, "name", "Patient name", { onChange: up }), field(t, "stars", "Stars", { type: "select", options: [5, 4, 3, 2, 1], parse: Number, onChange: up })),
        field(t, "text", "What they said", { type: "textarea" }), field(t, "link", "Link to the Google review (optional)")],
    })], "Shown on the Home page under What Patients Say. Use real feedback only (e.g. copied from your Google reviews), with the patient's permission."),
  ],
  "Page text": () => {
    const T = S.cfg.text = S.cfg.text || {};
    const names = { home: "Home page", tests: "Tests page", packages: "Packages page", book: "Book Appointment page", about: "About page", faq: "FAQ page", contact: "Contact page & map box", nav: "Menu, buttons & footer headings", footer: "Footer notes & disclaimers", notFound: "Page-not-found page", policies: "Policies & Disclaimers page (privacy, terms, refunds…)" };
    return Object.keys(T).map(p => group(names[p] || human(p), autoEditor(T[p]), "You can use {{name}}, {{city}}, {{hospital.name}}, {{roomNo}}, {{phoneDisplay}}…"));
  },
  "Logo & Photos": () => {
    const logo = document.createElement("div");
    const cur = S.files[S.cfg.logo] ? URL.createObjectURL(S.files[S.cfg.logo]) : S.cfg.logo;
    logo.innerHTML = `<div class="flex items-center gap-4"><div class="grid h-20 w-20 place-items-center overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">${cur ? `<img src="${h(cur)}" class="h-full w-full object-contain" alt="Logo">` : `<span class="text-xs text-slate-400">No logo</span>`}</div>
      <div class="space-y-2"><label class="btn-primary cursor-pointer !py-2 text-sm">Upload logo<input type="file" accept="image/*" class="hidden"></label>
      ${S.cfg.logo ? `<button type="button" id="rmlogo" class="btn-outline !py-2 text-sm">Remove logo</button>` : ""}</div></div>
      <p class="mt-2 text-xs text-slate-500">Square image works best. It replaces the flask icon in the header.</p>`;
    logo.querySelector("input").addEventListener("change", async e => {
      const f = e.target.files[0]; if (!f) return;
      const b = await resizeImage(f, 256, "image/png"); S.files["logo.png"] = b; S.cfg.logo = "logo.png"; changed(); show("Logo & Photos");
    });
    const rm = logo.querySelector("#rmlogo"); if (rm) rm.addEventListener("click", () => { S.cfg.logo = ""; delete S.files["logo.png"]; changed(); show("Logo & Photos"); });
    S.data.GALLERY = S.data.GALLERY || [];
    const own = document.createElement("div");
    own.className = "space-y-3";
    own.innerHTML = `<label class="btn-primary w-full cursor-pointer !py-3">📷 Upload photos<input type="file" accept="image/*" multiple class="hidden"></label><p class="text-xs text-slate-500">Photos are resized automatically. Don't upload patient faces or reports without written consent.</p>`;
    own.querySelector("input").addEventListener("change", async e => {
      for (const f of e.target.files) {
        try { const b = await resizeImage(f, 1600, "image/jpeg"); const n = "photo-" + Date.now() + "-" + Math.floor(Math.random() * 1000) + ".jpg"; S.files[n] = b; S.data.GALLERY.push({ src: n, caption: "" }); } catch { alert("Could not read " + f.name); }
      }
      changed(); show("Logo & Photos");
    });
    own.appendChild(listEditor({
      list: S.data.GALLERY, addLabel: "Add photo by file name (already on GitHub)",
      summary: g => `<span class="flex items-center gap-3"><img src="${h(S.files[g.src] ? URL.createObjectURL(S.files[g.src]) : g.src)}" class="h-10 w-14 rounded object-cover" alt="">${h(g.caption || g.src || "Photo")}</span>`,
      blank: () => ({ src: "", caption: "" }),
      fields: (g, up) => [field(g, "caption", "Caption", { onChange: up }), field(g, "src", "File name", { help: "Filled in automatically for uploaded photos", onChange: up })],
    }));
    const pick = document.createElement("div");
    const builtins = [["logo-drop.svg", "A · Red drop"], ["logo-flask.svg", "B · Teal flask D"], ["logo-hex.svg", "C · Hexagon test tube"]];
    pick.innerHTML = `<p class="label">Ready-made logos</p><div class="mt-2 grid grid-cols-3 gap-3">${builtins.map(([f, n]) => `<button type="button" data-logo="${f}" class="rounded-xl bg-white p-3 text-xs ring-1 ${S.cfg.logo === f ? "ring-2 ring-teal-600" : "ring-slate-200"}"><img src="${f}" alt="" class="mx-auto h-14 w-14"><span class="mt-2 block">${n}</span></button>`).join("")}</div>`;
    pick.addEventListener("click", e => { const b = e.target.closest("[data-logo]"); if (b) { S.cfg.logo = b.dataset.logo; changed(); show("Logo & Photos"); } });
    S.cfg.banner = S.cfg.banner || { show: true, src: "banner-bagalkot.svg", alt: "" };
    const ban = [field(S.cfg, "banner.show", "Show Bagalkot banner on the Home page", { type: "checkbox" }), field(S.cfg, "banner.alt", "Banner description (for screen readers)")];
    const prev = document.createElement("img"); prev.src = S.cfg.banner.src; prev.alt = ""; prev.className = "w-full rounded-xl ring-1 ring-slate-200";
    return [group("Logo", [pick, logo]), group("Banner", [prev, ...ban]), group("Photos (About page)", [own])];
  },
};

/* ---------- navigation ---------- */
let current = "Contact & Business";
function show(name) {
  current = name;
  $("#tabs").innerHTML = Object.keys(SECTIONS).map(n => `<button type="button" data-tab="${h(n)}" class="cat-chip ${n === name ? "is-active" : ""}">${h(n)}</button>`).join("");
  const main = $("#panel"); main.innerHTML = "";
  SECTIONS[name]().forEach(el => main.appendChild(el));
  window.scrollTo({ top: 0 });
}
document.addEventListener("click", e => { const t = e.target.closest("[data-tab]"); if (t) show(t.dataset.tab); });

/* ---------- create the updated files ---------- */
const arr = a => "[\n" + a.map(o => "  " + JSON.stringify(o)).join(",\n") + (a.length ? ",\n" : "") + "]";
function buildConfig() {
  return `/* =====================================================================
   DAKSHA LAB – SETTINGS ("global variables")
   Edit with the admin page (dakshalab-bagalkot-admin.html), or carefully by hand:
   keep the quotes, commas and brackets exactly as they are.
   Saved from the admin page on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
   ===================================================================== */

const CONFIG = ${JSON.stringify(S.cfg, null, 2)};
`;
}
function buildData() {
  const d = S.data;
  return `/* =====================================================================
   DAKSHA LAB – CATALOG (tests, packages, FAQs, testimonials)
   Edit with the admin page (dakshalab-bagalkot-admin.html), or carefully by hand.
   Prices are plain numbers (no ₹ sign, no commas).
   Saved from the admin page on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
   ===================================================================== */

const CATEGORIES = ${JSON.stringify(d.CATEGORIES)};

const TESTS = ${arr(d.TESTS)};

const PACKAGES = ${arr(d.PACKAGES)};

const FAQS = ${arr(d.FAQS)};

const TESTIMONIALS = ${arr(d.TESTIMONIALS)};

const GALLERY = ${arr(d.GALLERY || [])};
`;
}
function validate() {
  const errs = [];
  if (!S.cfg.name) errs.push("Lab name is empty.");
  if (!/^91[6-9]\d{9}$/.test(S.cfg.phone)) errs.push("Phone for Call button must be 91 + 10 digits.");
  if (!/^91[6-9]\d{9}$/.test(S.cfg.whatsapp)) errs.push("WhatsApp number must be 91 + 10 digits.");
  const ids = new Set();
  S.data.TESTS.forEach((t, i) => {
    if (!t.name) errs.push(`Test #${i + 1} has no name.`);
    if (!(t.price > 0)) errs.push(`Test "${t.name || i + 1}" needs a price.`);
    if (!t.id) t.id = slug(t.name);
    if (ids.has(t.id)) t.id = t.id + "-" + i;
    ids.add(t.id);
  });
  S.data.PACKAGES.forEach((p, i) => { if (!p.name) errs.push(`Package #${i + 1} has no name.`); if (!(p.price > 0)) errs.push(`Package "${p.name || i + 1}" needs a price.`); if (!p.id) p.id = slug(p.name); });
  return errs;
}

/* ---------- tiny zip writer (no compression) ---------- */
const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = b => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
async function makeZip(files) {
  const enc = new TextEncoder(), parts = [], central = []; let offset = 0;
  for (const [name, content] of files) {
    const data = typeof content === "string" ? enc.encode(content) : new Uint8Array(await content.arrayBuffer());
    const nm = enc.encode(name), crc = crc32(data);
    const loc = new DataView(new ArrayBuffer(30));
    loc.setUint32(0, 0x04034b50, true); loc.setUint16(4, 20, true); loc.setUint16(8, 0, true);
    loc.setUint32(14, crc, true); loc.setUint32(18, data.length, true); loc.setUint32(22, data.length, true); loc.setUint16(26, nm.length, true);
    parts.push(loc, nm, data);
    const cen = new DataView(new ArrayBuffer(46));
    cen.setUint32(0, 0x02014b50, true); cen.setUint16(4, 20, true); cen.setUint16(6, 20, true);
    cen.setUint32(16, crc, true); cen.setUint32(20, data.length, true); cen.setUint32(24, data.length, true); cen.setUint16(28, nm.length, true); cen.setUint32(42, offset, true);
    central.push(cen, nm);
    offset += 30 + nm.length + data.length;
  }
  const size = central.reduce((s, p) => s + p.byteLength, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true); end.setUint32(12, size, true); end.setUint32(16, offset, true);
  return new Blob([...parts, ...central, end], { type: "application/zip" });
}

async function download() {
  const errs = validate();
  if (errs.length) { alert("Please fix:\n\n• " + errs.join("\n• ")); return; }
  const files = [["config.js", buildConfig()], ["data.js", buildData()], ...Object.entries(S.files).filter(([n]) => n === S.cfg.logo || (S.data.GALLERY || []).some(g => g.src === n))];
  const blob = await makeZip(files);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "daksha-update-" + new Date().toISOString().slice(0, 10) + ".zip";
  document.body.appendChild(a); a.click(); a.remove();
  $("#status").textContent = `Downloaded ${files.length} file(s). Now upload them to GitHub (steps below).`;
  $("#status").className = "text-sm font-semibold text-emerald-700";
  S.dirty = false;
}

function discard() {
  if (!confirm("Discard all unsaved changes and reload the live website data?")) return;
  try { localStorage.removeItem(DRAFT_KEY); } catch {}
  location.reload();
}

$("#download").addEventListener("click", download);
$("#discard").addEventListener("click", discard);
window.addEventListener("beforeunload", e => { if (S.dirty) { e.preventDefault(); e.returnValue = ""; } });
if (S.restored) { $("#status").textContent = "Restored your unsaved draft from this phone."; $("#status").className = "text-sm font-semibold text-amber-700"; }
show(current);
