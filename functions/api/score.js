export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const familySize = Number(body.familySize || 1);
    const profession = String(body.profession || "other");
    const budget = String(body.budget || "mid");
    const goal = String(body.goal || "safety");
    const languages = Array.isArray(body.languages) ? body.languages : [];

    const countries = [
      { country: "Canada", score: 50, reasons: [], warning: "" },
      { country: "Germany", score: 50, reasons: [], warning: "" },
      { country: "Sweden", score: 50, reasons: [], warning: "" },
    ];

    if (familySize >= 4) {
      add(countries, "Sweden", 10, "Strong family support systems & stability.");
      add(countries, "Germany", 8, "Good infrastructure and family benefits in many regions.");
      add(countries, "Canada", -2, "Housing costs can be challenging for larger families in major cities.");
    }

    if (profession === "it") {
      add(countries, "Germany", 10, "Large job market for tech across multiple cities.");
      add(countries, "Sweden", 8, "Strong tech ecosystem and work-life balance.");
      add(countries, "Canada", 6, "Solid tech market, especially around major hubs.");
    } else if (profession === "healthcare") {
      add(countries, "Germany", 9, "Healthcare demand can be strong, but credentialing matters.");
      add(countries, "Sweden", 7, "Demand exists, but licensing can take time.");
      add(countries, "Canada", 6, "Demand exists, but credential recognition can be slow.");
    } else if (profession === "trades") {
      add(countries, "Germany", 8, "Skilled trades can do well; certification paths vary.");
      add(countries, "Canada", 8, "Trades can be strong, especially outside top metros.");
      add(countries, "Sweden", 4, "Opportunities exist but language can be more important.");
    }

    if (budget === "low") {
      add(countries, "Germany", 8, "Potentially lower upfront cost depending on city and setup.");
      add(countries, "Sweden", 4, "Stability is good, but cost of living can be high.");
      add(countries, "Canada", -6, "High housing costs in many areas can strain low runway.");
      warn(countries, "Canada", "If budget is low, avoid expensive metros at first.");
    } else if (budget === "high") {
      add(countries, "Canada", 8, "More flexibility to handle housing and settlement costs.");
    }

    const lvlPoints = (lvl) => {
      if (lvl === "advanced") return 10;
      if (lvl === "intermediate") return 6;
      return 2;
    };

    for (const l of languages) {
      const code = String(l.code || "").toLowerCase();
      const level = String(l.level || "basic").toLowerCase();
      const pts = lvlPoints(level);

      if (code === "en") {
        add(countries, "Canada", Math.min(10, pts), "English comfort improves job and daily-life options.");
        add(countries, "Sweden", Math.min(5, Math.round(pts / 2)), "English helps initially, but local language helps long-term.");
        add(countries, "Germany", Math.min(4, Math.round(pts / 3)), "English can work in some jobs; German helps more.");
      }

      if (code === "de") {
        add(countries, "Germany", Math.min(12, pts + 2), "German gives a strong advantage for jobs and bureaucracy.");
      }

      if (code === "sv") {
        add(countries, "Sweden", Math.min(12, pts + 2), "Swedish gives a strong advantage for integration and jobs.");
      }

      if (code === "fr") {
        add(countries, "Canada", Math.min(6, Math.round(pts / 2) + 2), "French can be an advantage in parts of Canada.");
      }
    }

    if (goal === "income") {
      add(countries, "Canada", 6, "Potential for higher salaries in some sectors.");
      add(countries, "Germany", 4, "Strong economy and job market, varies by industry.");
      add(countries, "Sweden", 2, "Good stability; salaries can be lower than some markets.");
    } else if (goal === "safety") {
      add(countries, "Sweden", 8, "High stability and strong social systems.");
      add(countries, "Germany", 6, "Strong infrastructure and safety in many areas.");
    } else if (goal === "passport") {
      add(countries, "Germany", 6, "Long-term pathways exist; requirements vary.");
      add(countries, "Canada", 6, "Immigration pathways exist; requirements vary.");
      add(countries, "Sweden", 5, "Pathways exist; requirements vary.");
    } else if (goal === "lifestyle") {
      add(countries, "Sweden", 8, "Work-life balance and family life are often a strong fit.");
      add(countries, "Germany", 5, "Good balance in many regions.");
    } else if (goal === "education") {
      add(countries, "Germany", 9, "Often strong study options; details vary by program.");
      add(countries, "Sweden", 6, "Good options; competition varies.");
      add(countries, "Canada", 6, "Strong institutions; can be expensive.");
      warn(countries, "Canada", "Education costs can be higher—double-check tuition and funding.");
    }

    for (const c of countries) {
      c.score = Math.max(0, Math.min(100, c.score));
    }

    countries.sort((a, b) => b.score - a.score);

    const gap = countries[0].score - countries[1].score;
    const confidence = gap >= 12 ? "High" : gap >= 6 ? "Medium" : "Low";

    return json({ ranked: countries, confidence });
  } catch (e) {
    return json({ error: "bad_request" }, 400);
  }
}

function add(list, name, delta, reason) {
  const obj = list.find(x => x.country === name);
  if (!obj) return;
  obj.score += delta;
  if (reason) obj.reasons.push(reason);
}

function warn(list, name, msg) {
  const obj = list.find(x => x.country === name);
  if (!obj) return;
  obj.warning = msg;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
