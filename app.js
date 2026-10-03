/* =====================================================================
   DAKSHA LAB – PAGE FEATURES
   Test catalog (search, filter, sort, select), packages, booking form,
   FAQ, contact hours. Content comes from data.js – no need to edit here.
   ===================================================================== */

/* ---------- lookup: tests by id, packages by "pkg:id" ---------- */
function findItem(key) {
  if (key.startsWith("pkg:")) { const p = PACKAGES.find(x => x.id === key.slice(4)); return p && { key, name: p.name, price: p.price, fasting: p.fasting }; }
  const t = TESTS.find(x => x.id === key); return t && { key, name: t.name, price: t.price, fasting: t.fasting };
}

/* ---------- selection basket (remembered while browsing) ---------- */
const Basket = {
  load() { try { return JSON.parse(sessionStorage.getItem("daksh-basket") || "[]").filter(findItem); } catch { return []; } },
  save(list) { try { sessionStorage.setItem("daksh-basket", JSON.stringify(list)); } catch {} },
  has(k) { return this.load().includes(k); },
  toggle(k) { const l = this.load(); const i = l.indexOf(k); i >= 0 ? l.splice(i, 1) : l.push(k); this.save(l); return i < 0; },
  clear() { this.save([]); },
};

/* ---------- share a test / package (phone share sheet, or WhatsApp) ---------- */
function shareBtn(key) {
  return `<button type="button" data-share="${key}" class="grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-teal-700" aria-label="Share"><svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg></button>`;
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-share]");
  if (!b) return;
  const i = findItem(b.dataset.share);
  const url = location.href.replace(/[^/]*$/, "") + (i.key.startsWith("pkg:") ? "packages.html" : "tests.html?q=" + encodeURIComponent(i.name));
  const text = `${i.name} at ${SITE.name}, Bagalkot: ${inr(i.price)} · walk-in or book an appointment.`;
  if (navigator.share) navigator.share({ title: SITE.name, text, url }).catch(() => {});
  else window.open("https://wa.me/?text=" + encodeURIComponent(text + "\n" + url), "_blank");
});

/* ---------- cards ---------- */
function fastBadge(f, note) {
  return `<span class="chip ${f ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}">${f ? "⏱" : "✓"} ${esc(fastingText(f))}</span>${note ? `<p class="mt-2 text-xs text-slate-500">${esc(note)}</p>` : ""}`;
}

function testCard(t) {
  const sel = Basket.has(t.id);
  return `<article class="card flex flex-col">
    <div class="flex items-start justify-between gap-3">
      <h3 class="font-semibold text-slate-900">${esc(t.name)}</h3>
      <span class="flex shrink-0 items-center gap-1"><span class="chip bg-slate-100 text-slate-600">${esc(t.category)}</span>${shareBtn(t.id)}</span>
    </div>
    <p class="mt-1 flex-1 text-sm text-slate-600">${esc(t.includes)}</p>
    <div class="mt-3 flex flex-wrap items-center gap-2">${fastBadge(t.fasting)}<span class="chip bg-sky-50 text-sky-800">Report: ${esc(t.report || "Same day")}</span></div>
    ${t.note ? `<p class="mt-2 text-xs text-slate-500">${esc(t.note)}</p>` : ""}
    <div class="mt-4 flex items-center justify-between gap-3">
      <span class="text-2xl font-bold text-slate-900">${inr(t.price)}</span>
      <button data-add="${t.id}" class="${sel ? "btn-added" : "btn-outline"} !px-4 !py-2 text-sm">${sel ? "✓ Added" : "+ Add"}</button>
    </div>
  </article>`;
}

function packageCard(p, compact) {
  const key = "pkg:" + p.id, sel = Basket.has(key);
  const save = p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0;
  return `<article class="card relative flex flex-col ${p.featured ? "!ring-2 !ring-teal-600 shadow-md" : ""}">
    ${p.featured ? '<span class="absolute -top-3 left-6 rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold text-white">Best value</span>' : ""}
    <div class="flex items-start justify-between gap-3"><h3 class="text-lg font-semibold text-slate-900">${esc(p.name)}</h3>${shareBtn(key)}</div>
    <p class="mt-1 text-sm text-slate-500">${p.parameters}+ parameters · ${esc(p.idealFor)}</p>
    <div class="mt-4 flex items-baseline gap-2">
      <span class="text-3xl font-bold text-slate-900">${inr(p.price)}</span>
      ${p.mrp ? `<span class="text-sm text-slate-400 line-through">${inr(p.mrp)}</span><span class="chip bg-rose-50 text-rose-700">${save}% off</span>` : ""}
    </div>
    ${compact ? "" : `<ul class="mt-4 flex-1 space-y-1.5 text-sm text-slate-700">${p.includes.map(i => `<li class="flex gap-2"><span class="text-teal-700">✓</span>${esc(i)}</li>`).join("")}</ul>`}
    <div class="mt-4">${fastBadge(p.fasting)}</div>
    <div class="mt-5 grid grid-cols-2 gap-2">
      <a href="book.html?items=${encodeURIComponent(key)}" class="btn-primary !py-2.5 text-sm">Book Now</a>
      <a href="${waUrl(`Hello ${SITE.name}, I want to book the ${p.name} (${inr(p.price)}). Please give me an appointment.`)}" target="_blank" rel="noopener" class="btn-wa-outline !py-2.5 text-sm">WhatsApp</a>
    </div>
  </article>`;
}

/* ---------- selection tray (bottom bar on Tests page) ---------- */
function renderTray() {
  const tray = document.getElementById("tray");
  if (!tray) return;
  const items = Basket.load().map(findItem);
  if (!items.length) { tray.classList.add("hidden"); return; }
  const total = items.reduce((s, i) => s + i.price, 0);
  tray.classList.remove("hidden");
  tray.querySelector("[data-count]").textContent = items.length + (items.length === 1 ? " test selected" : " tests selected");
  tray.querySelector("[data-total]").textContent = inr(total);
  tray.querySelector("[data-book]").href = "book.html?items=" + encodeURIComponent(items.map(i => i.key).join(","));
}

function bindAddButtons(root, rerender) {
  root.addEventListener("click", e => {
    const b = e.target.closest("[data-add]");
    if (!b) return;
    Basket.toggle(b.dataset.add);
    rerender(); renderTray();
  });
}

/* =====================================================================
   PAGE: HOME
   ===================================================================== */
function initHome() {
  const grid = document.getElementById("popular-tests");
  const draw = () => { grid.innerHTML = TESTS.filter(t => t.popular).slice(0, 6).map(testCard).join(""); };
  draw(); bindAddButtons(grid, draw);
  const pk = document.getElementById("home-packages");
  if (pk) pk.innerHTML = PACKAGES.slice(0, 3).map(p => packageCard(p, true)).join("");
  renderTray();
}

/* =====================================================================
   PAGE: TESTS (search, category filter, sort, print price list)
   ===================================================================== */
function initTests() {
  const grid = document.getElementById("test-grid"), search = document.getElementById("test-search"),
        sort = document.getElementById("test-sort"), chips = document.getElementById("cat-chips"), empty = document.getElementById("no-results"),
        count = document.getElementById("result-count");
  let cat = "All";
  chips.innerHTML = ["All", ...CATEGORIES].map(c => `<button data-cat="${esc(c)}" class="cat-chip">${esc(c)}</button>`).join("");
  const draw = () => {
    const q = search.value.trim().toLowerCase();
    let list = TESTS.filter(t => (cat === "All" || t.category === cat) && (t.name + " " + t.includes + " " + t.category).toLowerCase().includes(q));
    if (sort.value === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort.value === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort.value === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    grid.innerHTML = list.map(testCard).join("");
    empty.classList.toggle("hidden", list.length > 0);
    count.textContent = list.length + " test" + (list.length === 1 ? "" : "s");
    chips.querySelectorAll("[data-cat]").forEach(b => b.classList.toggle("is-active", b.dataset.cat === cat));
  };
  chips.addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (b) { cat = b.dataset.cat; draw(); } });
  search.addEventListener("input", draw);
  sort.addEventListener("change", draw);
  const initial = new URLSearchParams(location.search).get("q");
  if (initial) search.value = initial;
  draw(); bindAddButtons(grid, draw); renderTray();

  // printable price list
  const pl = document.getElementById("price-list");
  pl.innerHTML = CATEGORIES.map(c => {
    const rows = TESTS.filter(t => t.category === c).map(t => `<tr><td>${esc(t.name)}</td><td>${esc(fastingText(t.fasting))}</td><td class="text-right">${inr(t.price)}</td></tr>`).join("");
    return rows ? `<tr><th colspan="3" class="pt-3 text-left">${esc(c)}</th></tr>${rows}` : "";
  }).join("") + `<tr><th colspan="3" class="pt-3 text-left">Health Packages</th></tr>` +
    PACKAGES.map(p => `<tr><td>${esc(p.name)}</td><td>${esc(fastingText(p.fasting))}</td><td class="text-right">${inr(p.price)}</td></tr>`).join("");
  document.getElementById("print-btn").addEventListener("click", () => window.print());
  document.getElementById("tray-clear").addEventListener("click", () => { Basket.clear(); draw(); renderTray(); });
}

/* =====================================================================
   PAGE: PACKAGES
   ===================================================================== */
function initPackages() {
  document.getElementById("package-grid").innerHTML = PACKAGES.map(p => packageCard(p)).join("");
}

/* =====================================================================
   PAGE: BOOK APPOINTMENT
   ===================================================================== */
function initBook() {
  const form = document.getElementById("booking-form"), picker = document.getElementById("f-add"),
        list = document.getElementById("selected-list"), totalEl = document.getElementById("selected-total"),
        err = document.getElementById("form-error"), hidden = document.getElementById("f-tests");

  // items from URL (?items=cbc,pkg:executive) or from the basket
  const fromUrl = (new URLSearchParams(location.search).get("items") || "").split(",").filter(findItem);
  let chosen = fromUrl.length ? fromUrl : Basket.load();

  picker.innerHTML = `<option value="">+ Add a test or package</option>
    <optgroup label="Health Packages">${PACKAGES.map(p => `<option value="pkg:${p.id}">${esc(p.name)} – ${inr(p.price)}</option>`).join("")}</optgroup>
    ${CATEGORIES.map(c => `<optgroup label="${esc(c)}">${TESTS.filter(t => t.category === c).map(t => `<option value="${t.id}">${esc(t.name)} – ${inr(t.price)}</option>`).join("")}</optgroup>`).join("")}`;
  document.getElementById("f-slot").innerHTML = `<option value="">Select a slot</option>` + SITE.timeSlots.map(s => `<option>${esc(s)}</option>`).join("");
  const dateEl = document.getElementById("f-date");
  const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  dateEl.min = today.toISOString().slice(0, 10);

  const draw = () => {
    const items = chosen.map(findItem);
    list.innerHTML = items.length ? items.map(i => `<li class="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm">
        <span><span class="font-medium text-slate-900">${esc(i.name)}</span><span class="block text-xs text-slate-500">${esc(fastingText(i.fasting))}</span></span>
        <span class="flex items-center gap-3"><span class="font-semibold">${inr(i.price)}</span><button type="button" data-remove="${i.key}" class="text-slate-400 hover:text-rose-600" aria-label="Remove">✕</button></span></li>`).join("")
      : `<li class="rounded-lg border border-dashed border-slate-300 px-3 py-3 text-sm text-slate-500">No tests added yet. Pick from the list below, or choose "Not sure" and we'll help.</li>`;
    const total = items.reduce((s, i) => s + i.price, 0);
    totalEl.textContent = items.length ? inr(total) : "—";
    hidden.value = items.map(i => i.name + " (" + inr(i.price) + ")").join(", ");
    const needFast = items.some(i => i.fasting);
    document.getElementById("fasting-tip").classList.toggle("hidden", !needFast);
    Basket.save(chosen);
  };
  picker.addEventListener("change", () => { if (picker.value && !chosen.includes(picker.value)) chosen.push(picker.value); picker.value = ""; draw(); });
  list.addEventListener("click", e => { const b = e.target.closest("[data-remove]"); if (b) { chosen = chosen.filter(k => k !== b.dataset.remove); draw(); } });
  draw();



  form.addEventListener("submit", async e => {
    e.preventDefault();
    err.classList.add("hidden");
    const notSure = document.getElementById("f-notsure").checked;
    if (!chosen.length && !notSure) { showErr("Please add at least one test, or tick \"Not sure / have a prescription\"."); return; }
    if (!form.checkValidity()) {
      const bad = form.querySelector(":invalid");
      showErr(bad.id === "f-phone" ? "Please enter a valid 10-digit mobile number." : "Please fill all required fields and tick the consent box.");
      bad.focus(); return;
    }
    const d = Object.fromEntries(new FormData(form));
    const tests = (hidden.value || "") + (notSure ? (hidden.value ? " + " : "") + "Not sure / has prescription" : "");
    if (!SITE.web3formsKey) {
      const msg = `New Appointment Request\nName: ${d.patient_name}\nAge/Gender: ${d.age || "-"} ${d.gender || ""}\nMobile: +91 ${d.phone}\nTests: ${tests}\nTotal: ${totalEl.textContent}\nSlot: ${d.time_slot}${d.preferred_date ? "\nDate: " + d.preferred_date : ""}${d.notes ? "\nNotes: " + d.notes : ""}`;
      window.open(waUrl(msg), "_blank");
      return done();
    }
    const fd = new FormData(form);
    fd.set("access_key", SITE.web3formsKey);
    fd.set("tests", tests);
    fd.set("estimated_total", totalEl.textContent);
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true; btn.textContent = "Sending…";
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { Accept: "application/json" }, body: fd });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      done();
    } catch {
      showErr("Sorry, we couldn't send your booking. Please try WhatsApp or call us.");
    } finally { btn.disabled = false; btn.textContent = "Request Appointment"; }
  });
  function showErr(m) { err.textContent = m; err.classList.remove("hidden"); }
  function done() {
    form.reset(); chosen = []; Basket.clear(); draw();
    const ty = document.getElementById("thank-you");
    ty.classList.remove("hidden");
    ty.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/* =====================================================================
   PAGE: FAQ
   ===================================================================== */
function initFaq() {
  const groups = {};
  [...TESTS, ...PACKAGES].forEach(t => { const k = fastingText(t.fasting); (groups[k] = groups[k] || []).push(t.name); });
  const hrs = k => Math.max(0, ...(k.match(/\d+/g) || [0]).map(Number));
  const order = Object.keys(groups).sort((a, b) => hrs(b) - hrs(a));
  document.getElementById("prep-guide").innerHTML = order.map(k => `
    <div class="card"><p class="chip ${k.startsWith("No") ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}">${k.startsWith("No") ? "✓" : "⏱"} ${esc(k)}</p>
    <p class="mt-3 text-sm text-slate-700">${groups[k].map(esc).join(" · ")}</p></div>`).join("");
  document.getElementById("faq-list").innerHTML = FAQS.map(f => `
    <details class="group rounded-xl bg-white p-5 ring-1 ring-slate-200 open:ring-teal-600">
      <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">${esc(tpl(f.q))}<span class="text-teal-700 transition group-open:rotate-45 text-xl leading-none">+</span></summary>
      <p class="mt-3 text-slate-600">${esc(tpl(f.a))}</p>
    </details>`).join("");
}

/* =====================================================================
   PAGE: CONTACT
   ===================================================================== */
function initContact() {
  const day = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).getDay();
  const fmt = t => { let [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return h + ":" + String(m).padStart(2, "0") + " " + ap; };
  document.getElementById("hours-table").innerHTML = SITE.hours.map(h => `
    <div class="flex justify-between gap-4 rounded-lg px-3 py-2 ${h.days.includes(day) ? "bg-teal-50 font-semibold text-teal-900" : ""}">
      <dt>${esc(h.label)}${h.days.includes(day) ? " (today)" : ""}</dt><dd>${hoursText(h)}</dd></div>`).join("");
  const st = openStatus();
  const s = document.getElementById("open-status");
  s.textContent = st.text;
  s.className = "chip " + (st.open ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600");

}

/* =====================================================================
   PAGE: ABOUT
   ===================================================================== */
function initAbout() {
  const p = SITE.pathologist;
  document.getElementById("patho-name").textContent = p.name + ", " + p.qualification;
  document.getElementById("patho-reg").textContent = p.regNo + " · " + SITE.kpmeRegNo;
}

/* ---------- start the right page ---------- */
({ home: initHome, tests: initTests, packages: initPackages, book: initBook, faq: initFaq, contact: initContact, about: initAbout }[document.body.dataset.page] || (() => {}))();
