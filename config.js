/* =====================================================================
   DAKSHA LAB – SETTINGS & PAGE TEXT ("global variables")
   Everything on the website that can change lives here or in data.js.
   Easiest way to edit: the admin page  /dakshalab-bagalkot-admin.html
   Editing by hand: keep the quotes, commas and brackets exactly as they are.
   In text you can use {{name}}, {{city}}, {{phoneDisplay}}, {{hospital.name}}, {{roomNo}} …
   ===================================================================== */

const CONFIG = {
  "name": "Daksha Lab",
  "tagline": "Diagnostic Centre · Bagalkot",
  "kannadaTagline": "ನಿಖರ ವರದಿ, ವಿಶ್ವಾಸಾರ್ಹ ಸೇವೆ",
  "city": "Bagalkot",
  "phone": "919880400990",
  "phoneDisplay": "+91 98804 00990",
  "whatsapp": "919880400990",
  "email": "dakshalab.bagalkot@gmail.com",
  "roomNo": "Room No. 12",
  "hospital": {
    "name": "Ashirwad Hospital",
    "building": "Kaveri Arcade, 6/127",
    "road": "Navanagar Road",
    "area": "Mahesh Nagar",
    "mapsLink": "https://maps.app.goo.gl/N1uerwUDdMnwgJzX6"
  },
  "state": "Karnataka",
  "pin": "587101",
  "howToReach": [
    "Come to {{hospital.name}}, {{hospital.building}}, on {{hospital.road}} ({{hospital.area}}).",
    "Enter the hospital premises.",
    "{{name}} is in {{roomNo}}. Ask at the hospital reception if needed."
  ],
  "mapsLink": "https://maps.app.goo.gl/5ZheXtx2XPE6u5yu6",
  "reviewLink": "",
  "mapZoom": 17,
  "hours": [
    {
      "label": "Monday – Saturday",
      "days": [
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "open": "06:30",
      "close": "20:30"
    },
    {
      "label": "Sunday",
      "days": [
        0
      ],
      "open": "07:00",
      "close": "13:00"
    }
  ],
  "holidayNote": "",
  "timeSlots": [
    "6:30 – 8:00 AM (best for fasting tests)",
    "8:00 – 10:00 AM (best for fasting tests)",
    "10:00 AM – 12:00 PM",
    "12:00 – 2:00 PM",
    "4:00 – 6:00 PM",
    "6:00 – 8:00 PM"
  ],
  "callbackTime": "30 minutes",
  "offer": {
    "show": true,
    "text": "Dasara offer: Executive Health Checkup at ₹2,999 (save ₹1,800)",
    "link": "packages.html"
  },
  "pathologist": {
    "name": "Dr. ________",
    "qualification": "MD (Pathology)",
    "regNo": "KMC Reg. No. ______"
  },
  "kpmeRegNo": "KPME Reg. No. ______",
  "social": {
    "instagram": "",
    "facebook": "",
    "youtube": ""
  },
  "messages": {
    "general": "Hello {{name}}, I have a question.",
    "book": "Hello {{name}}, I would like to book an appointment.",
    "prescription": "Hello {{name}}, I am sending my prescription photo. Please book the tests.",
    "package": "Hello {{name}}, please suggest a health checkup package for me.",
    "testQuery": "Hello {{name}}, do you do this test: "
  },
  "siteUrl": "https://dakshalab.github.io/",
  "logo": "logo-drop.svg",
  "banner": {
    "show": true,
    "src": "banner-bagalkot.svg",
    "alt": "Bagalkot: Badami cliffs, Chalukya temple, Almatti dam and the Krishna river"
  },
  "text": {
    "home": {
      "badge": "Inside {{hospital.name}}, {{hospital.road}}, {{city}}",
      "title": "{{city}}'s Trusted Diagnostic Lab:",
      "titleHighlight": "Accurate Reports, Delivered Fast",
      "intro": "Qualified pathologists and modern automated analyzers, conveniently located inside {{hospital.name}}. Walk in or book an appointment; most routine reports reach your WhatsApp the same day.",
      "waButton": "Book Appointment on WhatsApp",
      "testsButton": "View Tests & Prices",
      "searchPlaceholder": "Search a test, e.g. thyroid, sugar, vitamin",
      "stepsTitle": "Book your visit: 3 easy ways",
      "steps": [
        {
          "title": "WhatsApp us",
          "text": "Send your test name or prescription photo and preferred time."
        },
        {
          "title": "Call the lab",
          "text": "Speak to our team and fix a convenient slot."
        },
        {
          "title": "Book online",
          "text": "Pick tests, date and time in the online form."
        }
      ],
      "trust": [
        {
          "icon": "🎓",
          "text": "Qualified MD Pathologists"
        },
        {
          "icon": "⏱",
          "text": "Same-Day Reports*"
        },
        {
          "icon": "🏥",
          "text": "Inside {{hospital.name}}"
        },
        {
          "icon": "📄",
          "text": "Reports on WhatsApp"
        }
      ],
      "popularTitle": "Popular Tests",
      "popularIntro": "Tap + Add to select multiple tests and book them together.",
      "packagesTitle": "Health Checkup Packages",
      "packagesIntro": "Complete checkups at a fraction of the individual test price.",
      "whyTitle": "Why {{city}} Families Choose {{name}}",
      "why": [
        {
          "icon": "🔬",
          "title": "Accurate results",
          "text": "Calibrated automated analyzers with daily quality control."
        },
        {
          "icon": "👩‍⚕️",
          "title": "Expert review",
          "text": "Every report signed by a qualified MD pathologist."
        },
        {
          "icon": "⚡",
          "title": "Fast reports",
          "text": "Most routine reports on WhatsApp the same day."
        },
        {
          "icon": "📍",
          "title": "Truly local",
          "text": "Inside {{hospital.name}}, {{hospital.road}}. No trips to Hubballi or Vijayapura for advanced tests."
        }
      ],
      "reviewsTitle": "What Patients Say",
      "findTitle": "Find Us Inside {{hospital.name}}",
      "findIntro": "{{roomNo}}, {{hospital.building}}, {{hospital.road}}, {{city}}. Walk in or book an appointment.",
      "rxTitle": "Have a doctor's prescription?",
      "rxText": "Send us a photo on WhatsApp. We'll book the right tests and tell you the total.",
      "rxButton": "Send Prescription"
    },
    "tests": {
      "title": "Tests & Prices",
      "intro": "Transparent prices, no hidden charges. Select multiple tests and book one appointment for all of them.",
      "searchPlaceholder": "Search tests: sugar, thyroid, vitamin, fever…",
      "sortLabel": "Sort",
      "printButton": "🖨 Price list",
      "notFoundTitle": "Can't find your test?",
      "notFoundText": "We do many more tests than listed here. Ask us on WhatsApp.",
      "notFoundButton": "Ask on WhatsApp",
      "note": "Please note: test information here is general guidance, not medical advice. Your doctor should decide which tests you need and interpret your results.",
      "fastingNote": "Fasting means no food or drinks except plain water. Keep taking regular medicines unless your doctor says otherwise. For thyroid tests, give the sample before your thyroid tablet.",
      "priceListTitle": "{{name}}, {{city}}: Price List",
      "addButton": "+ Add",
      "addedButton": "✓ Added",
      "trayBook": "Book appointment →"
    },
    "packages": {
      "title": "Health Checkup Packages",
      "intro": "Complete preventive checkups for every age, with pathologist-verified reports, at our lab inside {{hospital.name}}.",
      "guideTitle": "Which package is right for me?",
      "guide": [
        "Under 30, feeling fine: Basic Health Checkup once a year.",
        "30+ or desk job: Executive Health Checkup once a year.",
        "Diabetic: Diabetes Care every 3 months.",
        "Parents 60+: Senior Citizen Package every 6–12 months."
      ],
      "guideNote": "Not sure? Ask us on WhatsApp. Always follow your doctor's advice. Package suggestions are general and not medical advice.",
      "guideButton": "Ask us on WhatsApp",
      "bookButton": "Book Now"
    },
    "book": {
      "title": "Book an Appointment",
      "intro": "Choose your tests and a time to visit our lab inside {{hospital.name}}.",
      "step1": "1. Tests",
      "step2": "2. Patient details",
      "step3": "3. Visit date & time",
      "notSure": "Not sure / have a prescription",
      "fastingTip": "⏱ Some selected tests need fasting. Choose an early morning slot.",
      "consent": "I agree to {{name}} contacting me about this booking and using my details as described in the Privacy Policy.",
      "submit": "Request Appointment",
      "requestNote": "This is an appointment request; our team will confirm it. Not for emergencies: call {{legal.emergencyNumber}}.",
      "thanksTitle": "Appointment request received. Thank you!",
      "thanksText": "Our team will call you within {{callbackTime}} to confirm your appointment.",
      "beforeTitle": "Before your visit",
      "before": [
        "Keep fasting if your test needs it (water is OK)",
        "Bring your doctor's prescription, if any",
        "Wear a loose sleeve for easy sample collection",
        "Pay at the lab: cash or UPI"
      ],
      "waTitle": "Prefer WhatsApp?",
      "waText": "Send your test name or prescription photo and preferred time.",
      "waButton": "Chat on WhatsApp"
    },
    "about": {
      "title": "About {{name}}",
      "intro": "Accurate. Fast. Local. A diagnostic centre built for the people of {{city}}.",
      "story": [
        "{{name}} was founded with a simple promise to the people of {{city}}: every report should be accurate, on time, and easy to understand.",
        "Every sample is processed on calibrated, fully automated analyzers and checked under daily internal quality control. Results are reviewed and signed by qualified MD pathologists before they reach you.",
        "We know waiting for results is stressful. That's why most routine reports are delivered the same day on WhatsApp and email, with a printed copy whenever you need it.",
        "We are located inside the {{hospital.name}} premises on {{hospital.road}}, so patients can get tested right where they consult, and walk-in visitors can book an appointment to skip the wait.",
        "From Navanagar to Vidyagiri, and from Ilkal to Mudhol, {{city}} families choose {{name}} for one reason: they can trust the result."
      ],
      "pathologistLabel": "Our Pathologist",
      "stats": [
        {
          "value": "MD",
          "label": "Pathologist-verified reports"
        },
        {
          "value": "Same day",
          "label": "Most routine reports"
        },
        {
          "value": "Walk-in",
          "label": "or book an appointment"
        },
        {
          "value": "7 days",
          "label": "Open every day of the week"
        }
      ],
      "qualityTitle": "Our quality promise",
      "quality": [
        "Daily internal quality control on every analyzer",
        "Barcoded samples to prevent mix-ups",
        "Sealed, single-use collection kits",
        "Reports shared only with you and your doctor"
      ],
      "galleryTitle": "Inside Our Lab",
      "galleryButton": "More photos on Google Maps"
    },
    "faq": {
      "title": "FAQ & Test Preparation",
      "intro": "Fasting, reports, payments and appointments: everything you need to know before your test.",
      "prepTitle": "Test Preparation Guide",
      "prepIntro": "Check whether your test needs fasting. Plain water is always allowed.",
      "questionsTitle": "Common Questions",
      "askTitle": "Still have a question?",
      "askButton": "Ask on WhatsApp",
      "callButton": "Call"
    },
    "contact": {
      "title": "Contact & Directions",
      "intro": "Find us in {{roomNo}}, inside {{hospital.name}} on {{hospital.road}}. Walk in or book an appointment.",
      "hoursTitle": "Working hours",
      "contactTitle": "Call, message or book",
      "bookButton": "📅 Book an appointment online",
      "emailLabel": "Email:",
      "howToReachTitle": "How to reach us",
      "directionsButton": "📍 Directions",
      "mapsButton": "View on Google Maps",
      "callButton": "📞 Call",
      "shareButton": "Share location",
      "hospitalLink": "View {{hospital.name}} on Google Maps →",
      "whereTitle": "Where to find us"
    },
    "nav": {
      "home": "Home",
      "tests": "Tests",
      "packages": "Packages",
      "book": "Book Appointment",
      "about": "About",
      "faq": "FAQ",
      "contact": "Contact",
      "bookButton": "Book Test",
      "quickLinks": "Quick Links",
      "workingHours": "Working Hours",
      "contactTitle": "Contact",
      "directions": "Get directions →",
      "offerLink": "View offer",
      "barCall": "Call",
      "barWhatsApp": "WhatsApp"
    },
    "footer": {
      "emergency": "Not for emergencies: in a medical emergency call {{legal.emergencyNumber}} or go to the nearest casualty. Information on this website is not medical advice; please consult your doctor to interpret test results. *Report times are typical estimates and depend on the test. Prices and offers may change; the bill at the lab is final.",
      "infoOnly": "Information only: this website is not a legal offer, contract or invoice and takes no payments; all services are provided and billed only at the lab.",
      "rights": "All rights reserved."
    },
    "notFound": {
      "title": "Page not found",
      "text": "The page you're looking for doesn't exist. Let's get you back on track.",
      "homeButton": "Go to Home",
      "testsButton": "Browse Tests"
    },
    "policies": {
      "title": "Policies & Disclaimers",
      "intro": "Medical disclaimer, privacy policy, terms of use and refunds for {{name}}, {{city}}. Last updated: {{legal.policyUpdated}}.",
      "sections": [
        {
          "id": "info-only",
          "title": "Website for Information Only",
          "content": [
            "This website is provided for general information only. Nothing on it is a legal offer, contract, quotation, invoice or receipt, and it does not create any legally binding obligation for {{name}} or for any visitor.",
            "No sales or payments happen on this website. It does not take payments, issue bills or record transactions. All services are agreed, provided and billed only at the lab, and only the bill issued at the lab is valid.",
            "Prices, packages and offers shown here are indicative, may be outdated and are not binding. Online and WhatsApp booking requests are not confirmed appointments until our team confirms them."
          ]
        },
        {
          "id": "disclaimer",
          "title": "Medical Disclaimer",
          "content": [
            "Not medical advice. Information on this website, including test descriptions, fasting guidance, package suggestions and FAQs, is for general information only. It is not a substitute for advice, diagnosis or treatment from a qualified doctor.",
            "Results must be interpreted by your doctor. A lab report is one part of a diagnosis. Please share your report with your treating doctor. Do not start, stop or change any medicine based on a report or on this website alone.",
            "Limits of lab results. Test results can be affected by fasting, food, medicines, supplements, exercise, illness, time of collection and normal biological variation. Reference ranges depend on age, sex, method and equipment, and may differ between laboratories. Your doctor may advise a repeat or confirmatory test.",
            "Choosing tests. Package suggestions on this site are general. The right tests for you depend on your health and should be decided with your doctor.",
            "Report timing. Delivery times shown (\"same day\", \"next day\") are typical estimates, not guarantees. They can change with sample quality, repeat testing, equipment maintenance or holidays.",
            "Prices. Prices and offers shown on this website are for information and may change without notice. The amount on your bill at the lab is final. Offers are valid only for the period stated and cannot be combined unless mentioned."
          ]
        },
        {
          "id": "emergency",
          "title": "Medical Emergencies",
          "content": [
            "This website, our phone line, WhatsApp and the booking form are not for emergencies. In an emergency, call {{legal.emergencyNumber}} or go to the nearest hospital casualty / emergency department immediately."
          ]
        },
        {
          "id": "about-lab",
          "title": "About {{name}} and {{hospital.name}}",
          "content": [
            "{{relationText}}"
          ]
        },
        {
          "id": "privacy",
          "title": "Privacy Policy",
          "content": [
            "{{name}} respects your privacy and handles your personal data in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023.",
            "## What we collect",
            "- Booking details: name, mobile number, age, gender, tests selected, preferred date/time and any notes you add.",
            "- At the lab: details needed to perform your tests and issue your report, including your doctor's prescription if you share it.",
            "- Test results and related health information.",
            "This website itself does not ask for payment details, and does not use advertising or tracking cookies.",
            "## Why we use it",
            "- To confirm appointments, perform your tests and send your report.",
            "- To contact you about your booking, a sample issue or an important result.",
            "- To keep records as required for laboratory quality and legal purposes.",
            "We do not sell your data or use it for advertising. We share it only with you, with a doctor you ask us to share it with, or where the law requires.",
            "## Consent",
            "By submitting the booking form, messaging us on WhatsApp or calling us, you agree to us using your details for the purposes above. You can withdraw consent at any time by contacting us; this may stop us from completing a pending booking.",
            "## Third-party services",
            "- WhatsApp (Meta): messages and reports sent on WhatsApp are carried by WhatsApp under its own privacy policy. Reports are sent to the mobile number you give us; please make sure it is correct and private.",
            "- Online booking form: the form does not send your details to any server; it opens WhatsApp with your details filled in, and you choose whether to send.",
            "- Google Maps: the map on this site is provided by Google, which may set its own cookies when the map loads.",
            "- Hosting: this website is hosted on GitHub Pages, which may keep basic technical logs (such as IP addresses) for security.",
            "## How long we keep it",
            "We keep personal data only as long as needed for your care and as required by law for laboratory records. Booking messages that do not lead to a test are deleted when no longer needed.",
            "## Your rights",
            "- Ask what personal data we hold about you, and get a copy of your reports.",
            "- Ask us to correct or update your details.",
            "- Ask us to delete your data, where we are not required by law to keep it.",
            "- Raise a complaint with our grievance contact (below). If not resolved, you may approach the Data Protection Board of India.",
            "## Security",
            "We take reasonable steps to protect your data, including limiting access to authorised staff. No method of transmission over the internet is fully secure.",
            "## Children",
            "Tests for a person under 18 should be booked by a parent or guardian, who gives consent on their behalf."
          ]
        },
        {
          "id": "terms",
          "title": "Terms of Use",
          "content": [
            "- By using this website you agree to these terms and to the policies on this page.",
            "- An online or WhatsApp booking is a request. It is confirmed only when our team confirms it with you.",
            "- We try to keep all information accurate and current, but we do not guarantee that the website is free of errors or always available.",
            "- Links to other websites (such as Google Maps or WhatsApp) are provided for convenience; we are not responsible for their content or policies.",
            "- Website text, design and logo belong to {{name}} and may not be copied for commercial use without permission.",
            "- To the extent permitted by law, {{name}} is not liable for any loss arising from use of the information on this website.",
            "- These terms are governed by the laws of India. Courts in {{city}}, {{state}} will have jurisdiction.",
            "- We may update these policies; the \"Last updated\" date at the top will change when we do."
          ]
        },
        {
          "id": "refunds",
          "title": "Cancellation & Refunds",
          "content": [
            "- Appointments can be cancelled or rescheduled free of charge by calling or messaging us.",
            "- Payment is made at the lab. If you have paid and the sample has not yet been collected, you can cancel for a full refund.",
            "- If a test cannot be performed (for example, the sample is unsuitable or the test is unavailable), we will offer a free re-collection or a refund for that test.",
            "- Once a sample has been processed, the test fee is generally not refundable.",
            "- Refunds are made by the original payment method (cash or UPI), usually within 7 working days."
          ]
        },
        {
          "id": "contact-us",
          "title": "Questions, privacy requests & complaints",
          "content": [
            "Contact our grievance officer. We aim to respond within {{legal.responseDays}} working days.",
            "- Name: {{legal.grievanceOfficer}}",
            "- Email: {{legal.grievanceEmail}}",
            "- Phone: {{legal.grievancePhone}}",
            "- Address: {{fullAddress}}"
          ]
        }
      ]
    }
  },
  "legal": {
    "relation": "independent",
    "emergencyNumber": "108",
    "grievanceOfficer": "________",
    "grievanceEmail": "dakshalab.bagalkot@gmail.com",
    "grievancePhone": "+91 98804 00990",
    "responseDays": "7",
    "policyUpdated": "3 October 2026"
  }
};
