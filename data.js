/* =====================================================================
   DAKSHA LAB – WEBSITE CONTENT FILE
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit for day-to-day changes:
   prices, tests, packages, phone number, address, hours, offers, FAQs.

   How to edit on GitHub:  open data.js → tap the ✏️ pencil → change the
   text inside "quotes" or the numbers → tap "Commit changes".

   Rules: keep the quotes "", commas , and brackets [ ] { } as they are.
   Prices are plain numbers (no ₹ sign, no commas):  price: 1499
   ===================================================================== */

const SITE = {
  name: "Daksha Lab",
  tagline: "Diagnostic Centre · Bagalkot",
  kannadaTagline: "ನಿಖರ ವರದಿ, ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ",

  // Contact ------------------------------------------------------------
  phone: "919876543210",            // 91 + 10-digit number, no spaces or +  (used for Call)
  whatsapp: "919876543210",         // WhatsApp number in the same format
  phoneDisplay: "+91 98765 43210",  // how the number is shown on the site
  email: "info@dakshalab.in",

  // Address --------------------------------------------------------------
  addressLines: ["Shop No. __, Main Road, Navanagar", "Bagalkot, Karnataka 587103"],
  landmark: "Near ________",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Daksha+Lab+Bagalkot",
  mapEmbedUrl: "",                  // optional: Google Maps → Share → Embed a map → copy only the src="..." link

  // Opening hours (24-hour time). days: 0=Sun 1=Mon ... 6=Sat ------------
  hours: [
    { label: "Monday – Saturday", days: [1, 2, 3, 4, 5, 6], open: "06:30", close: "20:30" },
    { label: "Sunday",            days: [0],                open: "07:00", close: "13:00" },
  ],
  homeCollectionFrom: "6:00 AM",

  // Home collection areas -------------------------------------------------
  serviceAreas: ["Navanagar (all sectors)", "Vidyagiri", "Old Bagalkot", "Kaladgi Road", "Gaddankeri Cross", "Seemikeri"],
  homeCollectionFee: 0,             // 0 = free
  timeSlots: ["6:00 – 7:00 AM (best for fasting tests)", "7:00 – 8:00 AM (best for fasting tests)", "8:00 – 10:00 AM", "10:00 AM – 12:00 PM", "4:00 – 6:00 PM"],

  // Booking form: paste your free key from web3forms.com to receive bookings by email.
  // Leave empty ("") and bookings are sent to your WhatsApp instead.
  web3formsKey: "",

  // Top banner offer (set show: false to hide) ----------------------------
  offer: { show: true, text: "Dasara offer: Executive Health Checkup at ₹2,999 (save ₹1,800) + free home collection" },

  // Pathologist / registrations (fill in real details) ---------------------
  pathologist: { name: "Dr. ________", qualification: "MD (Pathology)", regNo: "KMC Reg. No. ______" },
  kpmeRegNo: "KPME Reg. No. ______",
};

/* ---------------------------------------------------------------------
   TEST CATEGORIES (used for the filter buttons on the Tests page)
   --------------------------------------------------------------------- */
const CATEGORIES = ["Blood", "Diabetes", "Thyroid", "Heart", "Liver", "Kidney", "Vitamins", "Fever & Infection", "Hormones", "Urine"];

/* ---------------------------------------------------------------------
   INDIVIDUAL TESTS  (prices are simulated – replace with your rate card)
   fasting: 0 = not needed, otherwise number of hours, e.g. 8 or "10–12"
   popular: true shows the test on the Home page
   To ADD a test: copy one full line { ... }, paste it below, change values.
   To REMOVE a test: delete its whole line.
   --------------------------------------------------------------------- */
const TESTS = [
  { id: "cbc",     name: "Complete Blood Count (CBC)", category: "Blood", includes: "Hb, RBC, WBC, Platelets, Differential count", price: 299, fasting: 0, report: "Same day", popular: true },
  { id: "esr",     name: "ESR", category: "Blood", includes: "Erythrocyte sedimentation rate", price: 100, fasting: 0, report: "Same day" },
  { id: "bgrp",    name: "Blood Group & Rh Type", category: "Blood", includes: "ABO grouping, Rh typing", price: 100, fasting: 0, report: "Same day" },
  { id: "iron",    name: "Iron Studies", category: "Blood", includes: "Serum iron, TIBC, Transferrin saturation, Ferritin", price: 899, fasting: 8, report: "Next day" },

  { id: "fbs",     name: "Fasting Blood Sugar (FBS)", category: "Diabetes", includes: "Glucose – fasting", price: 60, fasting: 8, report: "Same day" },
  { id: "ppbs",    name: "Post-Meal Blood Sugar (PPBS)", category: "Diabetes", includes: "Glucose – 2 hours after meal", price: 60, fasting: 0, note: "Sample 2 hrs after a meal", report: "Same day" },
  { id: "hba1c",   name: "HbA1c (3-month sugar)", category: "Diabetes", includes: "Glycated haemoglobin, Average blood glucose", price: 449, fasting: 0, report: "Same day", popular: true },
  { id: "diab",    name: "Diabetic Screening", category: "Diabetes", includes: "FBS, PPBS, HbA1c", price: 599, fasting: "8–10", report: "Same day", popular: true },

  { id: "tsh",     name: "TSH", category: "Thyroid", includes: "Thyroid stimulating hormone", price: 249, fasting: 0, report: "Same day" },
  { id: "thyroid", name: "Thyroid Profile", category: "Thyroid", includes: "T3, T4, TSH", price: 499, fasting: 0, note: "Morning sample, before thyroid tablet", report: "Same day", popular: true },

  { id: "lipid",   name: "Lipid Profile", category: "Heart", includes: "Total cholesterol, HDL, LDL, VLDL, Triglycerides, Ratios", price: 549, fasting: "10–12", report: "Same day", popular: true },
  { id: "crp",     name: "CRP (C-Reactive Protein)", category: "Heart", includes: "Quantitative CRP", price: 399, fasting: 0, report: "Same day" },

  { id: "lft",     name: "Liver Function Test (LFT)", category: "Liver", includes: "Bilirubin, SGOT, SGPT, ALP, Total protein, Albumin", price: 599, fasting: 8, report: "Same day", popular: true },

  { id: "kft",     name: "Kidney Function Test (KFT)", category: "Kidney", includes: "Urea, Creatinine, Uric acid, Sodium, Potassium", price: 649, fasting: 0, report: "Same day", popular: true },
  { id: "uric",    name: "Uric Acid", category: "Kidney", includes: "Serum uric acid", price: 150, fasting: 0, report: "Same day" },
  { id: "elec",    name: "Electrolytes", category: "Kidney", includes: "Sodium, Potassium, Chloride", price: 399, fasting: 0, report: "Same day" },

  { id: "vitd",    name: "Vitamin D (25-OH)", category: "Vitamins", includes: "25-Hydroxy Vitamin D", price: 899, fasting: 0, report: "Next day" },
  { id: "b12",     name: "Vitamin B12", category: "Vitamins", includes: "Serum cobalamin", price: 599, fasting: 0, report: "Next day" },
  { id: "vitcombo",name: "Vitamin D + B12", category: "Vitamins", includes: "25-OH Vitamin D, Vitamin B12", price: 1299, fasting: 0, report: "Next day", popular: true },
  { id: "calcium", name: "Calcium", category: "Vitamins", includes: "Serum calcium", price: 199, fasting: 0, report: "Same day" },

  { id: "dengue",  name: "Dengue NS1 Antigen", category: "Fever & Infection", includes: "NS1 antigen", price: 599, fasting: 0, report: "Same day" },
  { id: "malaria", name: "Malaria Antigen", category: "Fever & Infection", includes: "P. vivax / P. falciparum antigen", price: 299, fasting: 0, report: "Same day" },
  { id: "widal",   name: "Widal Test (Typhoid)", category: "Fever & Infection", includes: "Salmonella antibodies", price: 199, fasting: 0, report: "Same day" },

  { id: "bhcg",    name: "Pregnancy Test (Beta hCG)", category: "Hormones", includes: "Serum beta hCG – quantitative", price: 549, fasting: 0, report: "Same day" },
  { id: "psa",     name: "PSA (Prostate)", category: "Hormones", includes: "Total prostate specific antigen", price: 699, fasting: 0, report: "Next day" },

  { id: "urine",   name: "Urine Routine", category: "Urine", includes: "Physical, chemical & microscopic examination", price: 149, fasting: 0, note: "First morning sample preferred", report: "Same day" },
];

/* ---------------------------------------------------------------------
   HEALTH PACKAGES
   featured: true highlights the card as "Best value"
   --------------------------------------------------------------------- */
const PACKAGES = [
  { id: "basic", name: "Basic Health Checkup", price: 1499, mrp: 2200, parameters: 45, fasting: "10–12", idealFor: "Adults 18+ · yearly check",
    includes: ["CBC", "Fasting Blood Sugar", "Lipid Profile", "Liver Function Test", "Kidney Function Test", "Urine Routine"] },
  { id: "executive", name: "Executive Health Checkup", price: 2999, mrp: 4800, parameters: 80, fasting: "10–12", idealFor: "Working professionals 30+", featured: true,
    includes: ["Everything in Basic", "Thyroid Profile", "HbA1c", "Vitamin D", "Vitamin B12", "Iron Studies", "ECG"] },
  { id: "women", name: "Women's Wellness", price: 2499, mrp: 3800, parameters: 65, fasting: "10–12", idealFor: "Women 25+",
    includes: ["CBC", "Thyroid Profile", "Iron Studies", "Vitamin D", "Calcium", "HbA1c", "Lipid Profile", "Urine Routine"] },
  { id: "senior", name: "Senior Citizen Package (60+)", price: 3499, mrp: 5500, parameters: 90, fasting: "10–12", idealFor: "Parents & seniors 60+",
    includes: ["Everything in Executive", "PSA (men) / Calcium (women)", "Electrolytes", "CRP", "Uric Acid"] },
  { id: "diabcare", name: "Diabetes Care", price: 1199, mrp: 1800, parameters: 40, fasting: "8–10", idealFor: "Diabetics · 3-monthly review",
    includes: ["FBS & PPBS", "HbA1c", "Lipid Profile", "Kidney Function Test", "Urine Routine"] },
  { id: "fever", name: "Fever Panel", price: 999, mrp: 1400, parameters: 30, fasting: 0, idealFor: "Fever for 2+ days",
    includes: ["CBC", "ESR", "Dengue NS1", "Malaria Antigen", "Widal", "Urine Routine"] },
];

/* ---------------------------------------------------------------------
   FREQUENTLY ASKED QUESTIONS
   --------------------------------------------------------------------- */
const FAQS = [
  { q: "Is home sample collection really free?", a: "Yes. Home collection is free on all tests and packages within our Bagalkot service areas." },
  { q: "What does fasting mean?", a: "No food or drinks except plain water for the hours mentioned (usually 8–12 hours). Take your regular medicines unless your doctor advises otherwise." },
  { q: "Can I take my thyroid tablet before the test?", a: "Please give the sample first and take your thyroid tablet after the sample is collected." },
  { q: "When will I get my report?", a: "Most routine reports are sent on WhatsApp and email the same day. Specialised tests like Vitamin D or B12 may take until the next day. The expected time is shown on each test." },
  { q: "Who checks my report?", a: "Every report is reviewed and signed by a qualified MD pathologist before it is released." },
  { q: "How do I pay?", a: "Pay at the lab or at home after sample collection by cash or UPI (Google Pay, PhonePe, Paytm)." },
  { q: "Do I need a doctor's prescription?", a: "Not for most routine tests. If you have a prescription, send a photo on WhatsApp and we will book the right tests for you." },
  { q: "Is my information kept private?", a: "Yes. Your details and reports are used only for your testing and are shared only with you (and your doctor if you ask us to)." },
];
