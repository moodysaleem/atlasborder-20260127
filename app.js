const form = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");

const topPickEl = document.getElementById("topPick");
const runnerUpsEl = document.getElementById("runnerUps");
const resultSubtitleEl = document.getElementById("resultSubtitle");
const confidenceBadgeEl = document.getElementById("confidenceBadge");
const linksBoxEl = document.getElementById("linksBox");

const langEnBtn = document.getElementById("langEn");
const langArBtn = document.getElementById("langAr");

const I18N = {
  en: {
    title: "Canada vs Germany vs Sweden",
    subtitle: "2-minute test. No login. Get a ranked recommendation based on your situation.",
    q1: "1) Family size",
    q2: "2) Profession",
    q3: "3) Budget / savings (rough)",
    q4: "4) Languages you can use (and comfort)",
    q5: "5) Main goal",
    budgetHelp: "This helps estimate your “landing runway” (rent, deposits, paperwork, emergencies).",
    langHelp: "Select all languages you can realistically use for work or daily life. Be honest — it helps your result.",
    cta: "Get my result",
    reassure: "If you’re feeling anxious about making the “wrong” choice — that’s normal. This tool is here to reduce stress and give you a clear starting point.",
    result_title: "Your best match",
    runnerups: "Runner-ups",
    nextsteps: "Next steps (practical, calming)",
    nextsteps_desc: "You don’t need to solve everything today. Pick one small step below and move forward.",
    links_note: "Links are suggestions. Replace or add affiliate links later.",
    email_title: "Get a personalized checklist",
    email_desc: "Optional: leave your email and we’ll show a checklist idea you can follow. (MVP placeholder)",
    email_btn: "Send",
    disclaimer: "Disclaimer: This tool is informational and not legal advice. Always verify details with official sources.",
    budget_low: "Low",
    budget_mid: "Medium",
    budget_high: "High",
    budget_low_range: "under ~$5,000 USD",
    budget_mid_range: "~$5,000–$20,000 USD",
    budget_high_range: "over ~$20,000 USD",
    lang_english: "English",
    lang_german: "German",
    lang_swedish: "Swedish",
    lang_french: "French",
    lvl_basic: "Basic",
    lvl_intermediate: "Intermediate",
    lvl_advanced: "Advanced",
    goal_income: "Max income",
    goal_safety: "Safety & stability",
    goal_passport: "Long-term residency / passport",
    goal_lifestyle: "Lifestyle / work-life balance",
    goal_education: "Study",
    confidence: "Confidence"
  },
  ar: {
    title: "كندا vs ألمانيا vs السويد",
    subtitle: "اختبار لمدة دقيقتين. بدون تسجيل. ستحصل على توصية مرتّبة حسب وضعك.",
    q1: "١) حجم العائلة",
    q2: "٢) المهنة",
    q3: "٣) الميزانية / الادخار (تقريباً)",
    q4: "٤) اللغات التي تستطيع استخدامها (ومستوى الراحة)",
    q5: "٥) الهدف الأساسي",
    budgetHelp: "يساعد هذا على تقدير “هامش الأمان” عند الوصول (إيجار، تأمينات، أوراق، طوارئ).",
    langHelp: "اختر كل اللغات التي يمكنك استخدامها فعلاً في العمل أو الحياة اليومية. الصراحة تعطي نتيجة أدق.",
    cta: "اعرض النتيجة",
    reassure: "إذا كنت قلقاً من اتخاذ القرار “الخطأ” — هذا شعور طبيعي. الهدف هنا تقليل التوتر وإعطاؤك نقطة بداية واضحة.",
    result_title: "أفضل اختيار لك",
    runnerups: "بدائل قريبة",
    nextsteps: "الخطوات التالية (عملية ومطمئنة)",
    nextsteps_desc: "ليس مطلوباً أن تحل كل شيء اليوم. اختر خطوة صغيرة واحدة وابدأ.",
    links_note: "هذه روابط مقترحة. يمكنك لاحقاً استبدالها أو إضافة روابط أفلييت.",
    email_title: "احصل على قائمة خطوات شخصية",
    email_desc: "اختياري: اترك بريدك وسنعرض فكرة قائمة خطوات يمكنك اتباعها. (نسخة أولية)",
    email_btn: "إرسال",
    disclaimer: "تنبيه: هذه أداة معلوماتية وليست استشارة قانونية. تحقق دائماً من التفاصيل عبر المصادر الرسمية.",
    budget_low: "منخفضة",
    budget_mid: "متوسطة",
    budget_high: "مرتفعة",
    budget_low_range: "أقل من ~٥,٠٠٠ دولار",
    budget_mid_range: "~٥,٠٠٠ إلى ٢٠,٠٠٠ دولار",
    budget_high_range: "أكثر من ~٢٠,٠٠٠ دولار",
    lang_english: "الإنجليزية",
    lang_german: "الألمانية",
    lang_swedish: "السويدية",
    lang_french: "الفرنسية",
    lvl_basic: "أساسي",
    lvl_intermediate: "متوسط",
    lvl_advanced: "متقدم",
    goal_income: "أعلى دخل",
    goal_safety: "أمان واستقرار",
    goal_passport: "إقامة طويلة / جنسية",
    goal_lifestyle: "نمط حياة / توازن",
    goal_education: "دراسة",
    confidence: "الثقة"
  }
};

let currentLang = "en";

function setLang(lang) {
  currentLang = lang;
  const html = document.documentElement;
  html.setAttribute("data-lang", lang);
  if (lang === "ar") {
    html.setAttribute("lang", "ar");
    html.setAttribute("dir", "rtl");
  } else {
    html.setAttribute("lang", "en");
    html.setAttribute("dir", "ltr");
  }

  langEnBtn.classList.toggle("active", lang === "en");
  langArBtn.classList.toggle("active", lang === "ar");

  document.getElementById("title").textContent = I18N[lang].title;
  document.getElementById("subtitle").textContent = I18N[lang].subtitle;
  document.getElementById("q1").textContent = I18N[lang].q1;
  document.getElementById("q2").textContent = I18N[lang].q2;
  document.getElementById("q3").textContent = I18N[lang].q3;
  document.getElementById("q4").textContent = I18N[lang].q4;
  document.getElementById("q5").textContent = I18N[lang].q5;
  document.getElementById("budgetHelp").textContent = I18N[lang].budgetHelp;
  document.getElementById("langHelp").textContent = I18N[lang].langHelp;
  document.getElementById("reassure").textContent = I18N[lang].reassure;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (I18N[lang][key]) el.textContent = I18N[lang][key];
  });

  const emailInput = document.querySelector('#result input[placeholder]');
  if (emailInput) {
    emailInput.placeholder = lang === "ar" ? "البريد الإلكتروني (اختياري)" : "Email (optional)";
  }
}

langEnBtn.addEventListener("click", () => setLang("en"));
langArBtn.addEventListener("click", () => setLang("ar"));
setLang("en");

function escapeHtml(str) {
  return String(str).replace(/[&<>\"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[m]));
}

function getBudgetLabel(budget) {
  const t = I18N[currentLang];
  if (budget === "low") return `${t.budget_low} (${t.budget_low_range})`;
  if (budget === "mid") return `${t.budget_mid} (${t.budget_mid_range})`;
  return `${t.budget_high} (${t.budget_high_range})`;
}

function getFamilyLabel(n) {
  if (currentLang === "ar") {
    if (n === 1) return "فرد واحد";
    if (n === 2) return "شخصان";
    if (n === 3) return "٣ أشخاص";
    if (n === 4) return "٤ أشخاص";
    return "٥+ أشخاص";
  }
  if (n === 1) return "1 person";
  if (n === 2) return "2 people";
  if (n === 3) return "3 people";
  if (n === 4) return "4 people";
  return "5+ people";
}

function getGoalLabel(goal) {
  const t = I18N[currentLang];
  const map = {
    income: t.goal_income,
    safety: t.goal_safety,
    passport: t.goal_passport,
    lifestyle: t.goal_lifestyle,
    education: t.goal_education
  };
  return map[goal] || goal;
}

function collectLanguages(form) {
  const langs = [];
  const cfg = [
    { code: "en", flag: "lang_en", lvl: "lvl_en" },
    { code: "de", flag: "lang_de", lvl: "lvl_de" },
    { code: "sv", flag: "lang_sv", lvl: "lvl_sv" },
    { code: "fr", flag: "lang_fr", lvl: "lvl_fr" },
  ];
  for (const c of cfg) {
    const checked = form.querySelector(`input[name="${c.flag}"]`)?.checked;
    if (checked) {
      const level = form.querySelector(`select[name="${c.lvl}"]`)?.value || "basic";
      langs.push({ code: c.code, level });
    }
  }
  return langs;
}

function languageName(code) {
  const t = I18N[currentLang];
  if (code === "en") return t.lang_english;
  if (code === "de") return t.lang_german;
  if (code === "sv") return t.lang_swedish;
  if (code === "fr") return t.lang_french;
  return code;
}

function levelLabel(level) {
  const t = I18N[currentLang];
  if (level === "basic") return t.lvl_basic;
  if (level === "intermediate") return t.lvl_intermediate;
  return t.lvl_advanced;
}

function countryCard(item, isTop=false) {
  const reasons = (item.reasons || []).map(r => `<li class="mt-1">• ${escapeHtml(r)}</li>`).join("");
  return `
    <div class="${isTop ? "border-slate-900" : ""} p-4 rounded-2xl border">
      <div class="flex items-center justify-between gap-3">
        <div class="text-xl font-bold">${escapeHtml(item.country)}</div>
        <div class="text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-700">
          Score: ${escapeHtml(item.score)}
        </div>
      </div>
      <ul class="mt-3 text-slate-700">${reasons}</ul>
      ${item.warning ? `<div class="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
        <strong>${currentLang === "ar" ? "انتبه:" : "Watch out:"}</strong> ${escapeHtml(item.warning)}
      </div>` : ""}
    </div>
  `;
}

function buildLinks(topCountry, languages) {
  const official = {
    "Canada": "https://www.canada.ca/en/services/immigration-citizenship.html",
    "Germany": "https://www.make-it-in-germany.com/en/",
    "Sweden": "https://www.migrationsverket.se/English.html"
  };

  const langResources = {
    en: { test: "https://www.efset.org/", learn: "https://www.duolingo.com/" },
    de: { test: "https://www.goethe.de/en/spr/kup/tsd.html", learn: "https://www.dw.com/en/learn-german/s-2469" },
    sv: { test: "https://dialangweb.lancaster.ac.uk/", learn: "https://www.duolingo.com/" },
    fr: { test: "https://dialangweb.lancaster.ac.uk/", learn: "https://www.tv5monde.com/" }
  };

  const cards = [];

  cards.push({
    title: currentLang === "ar" ? "١) ابدأ بالمصدر الرسمي" : "1) Start with the official source",
    desc: currentLang === "ar"
      ? "حتى لو كانت النتيجة مشجعة، تحقق من الشروط الرسمية لتخفيف القلق وتجنب المفاجآت."
      : "Even if the result looks promising, verify requirements from the official source to reduce uncertainty.",
    href: official[topCountry] || "#",
    label: currentLang === "ar" ? "افتح الموقع الرسمي" : "Open official site"
  });

  const picked = (languages || []).slice(0, 2);
  if (picked.length) {
    const lines = picked.map(l => `${languageName(l.code)} (${levelLabel(l.level)})`).join(currentLang === "ar" ? "، " : ", ");
    cards.push({
      title: currentLang === "ar" ? "٢) طوّر اللغة بهدوء" : "2) Improve language calmly",
      desc: currentLang === "ar"
        ? `اختر خطوة صغيرة: اختبار مستوى + خطة تعلّم. أنت اخترت: ${lines}.`
        : `Pick one small step: level test + learning plan. You selected: ${lines}.`,
      href: (langResources[picked[0].code]?.learn) || "https://www.duolingo.com/",
      label: currentLang === "ar" ? "ابدأ تعلّم اللغة" : "Start learning"
    });
    cards.push({
      title: currentLang === "ar" ? "٣) اختبر مستواك (مجاني)" : "3) Test your level (free)",
      desc: currentLang === "ar"
        ? "الاختبار يعطيك وضوحاً ويقلل القلق لأنك تعرف أين تقف."
        : "A quick test gives clarity and reduces stress because you know where you stand.",
      href: (langResources[picked[0].code]?.test) || "https://www.efset.org/",
      label: currentLang === "ar" ? "ابدأ الاختبار" : "Take a test"
    });
  } else {
    cards.push({
      title: currentLang === "ar" ? "٢) اللغة أولاً (خطوة واحدة)" : "2) Language first (one step)",
      desc: currentLang === "ar"
        ? "إذا لم تختر لغة، لا مشكلة. ابدأ باختبار بسيط لمعرفة مستواك."
        : "If you didn’t select any language, that’s okay. Start with a simple test to see your level.",
      href: "https://www.efset.org/",
      label: currentLang === "ar" ? "اختبار لغة" : "Language test"
    });
  }

  cards.push({
    title: currentLang === "ar" ? "٤) تقدير تكلفة السكن" : "4) Estimate housing costs",
    desc: currentLang === "ar"
      ? "السكن هو أكبر مصدر للضغط. معرفة النطاقات مبكراً تمنحك راحة."
      : "Housing is the biggest stress driver. Knowing ranges early gives peace of mind.",
    href: "https://www.numbeo.com/cost-of-living/",
    label: currentLang === "ar" ? "قارن التكاليف" : "Compare costs"
  });

  return cards.map(c => `
    <div class="p-4 rounded-2xl border bg-slate-50">
      <div class="font-bold">${escapeHtml(c.title)}</div>
      <div class="text-slate-700 mt-1">${escapeHtml(c.desc)}</div>
      <a class="link inline-block mt-2" href="${escapeHtml(c.href)}" target="_blank" rel="nofollow noopener">${escapeHtml(c.label)}</a>
    </div>
  `).join("");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  const ctaSpan = submitBtn.querySelector("[data-i18n='cta']");
  if (ctaSpan) ctaSpan.textContent = (currentLang === "ar" ? "جارٍ الحساب..." : "Calculating...");

  try {
    const familySize = Number(form.querySelector('[name="familySize"]').value || 1);
    const profession = form.querySelector('[name="profession"]').value || "other";
    const budget = form.querySelector('input[name="budget"]:checked')?.value || "mid";
    const goal = form.querySelector('[name="goal"]').value || "safety";
    const languages = collectLanguages(form);

    const payload = { familySize, profession, budget, goal, languages };

    const res = await fetch("/api/score", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("API error");
    const data = await res.json();

    const ranked = data.ranked || [];
    if (!ranked.length) throw new Error("No results");

    const top = ranked[0];
    const runners = ranked.slice(1);

    const familyLabel = getFamilyLabel(familySize);
    const budgetLabel = getBudgetLabel(budget);
    const goalLabel = getGoalLabel(goal);
    const langLine = (languages.length
      ? languages.map(l => `${languageName(l.code)} (${levelLabel(l.level)})`).join(currentLang === "ar" ? "، " : ", ")
      : (currentLang === "ar" ? "لا يوجد" : "none selected"));

    resultSubtitleEl.textContent = (currentLang === "ar"
      ? `بناءً على إجاباتك (${familyLabel}، ميزانية ${budgetLabel}، هدف: ${goalLabel}، لغات: ${langLine}) أفضل خيار لك هو ${top.country}.`
      : `Based on your answers (${familyLabel}, ${budgetLabel}, goal: ${goalLabel}, languages: ${langLine}), your best match is ${top.country}.`);

    confidenceBadgeEl.textContent = `${I18N[currentLang].confidence}: ${data.confidence || "Medium"}`;

    topPickEl.innerHTML = countryCard(top, true);
    runnerUpsEl.innerHTML = runners.map(r => countryCard(r, false)).join("");

    linksBoxEl.innerHTML = buildLinks(top.country, languages);

    resultEl.classList.remove("hidden");
    resultEl.scrollIntoView({ behavior: "smooth", block: "start" });

  } catch (err) {
    alert(currentLang === "ar" ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong. Try again.");
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    if (ctaSpan) ctaSpan.textContent = I18N[currentLang].cta;
  }
});
