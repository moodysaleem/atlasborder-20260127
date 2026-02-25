export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const familySize = Number(body.familySize || 1);
    const profession = String(body.profession || "other");
    const budget = String(body.budget || "mid");
    const goal = String(body.goal || "safety");
    const languages = Array.isArray(body.languages) ? body.languages : [];

    const countries = [
      { country: "USA", score: 50, reasons: [], warning: "" },
      { country: "Canada", score: 50, reasons: [], warning: "" },
      { country: "Mexico", score: 50, reasons: [], warning: "" },
    ];

    if (familySize >= 4) {
      add(countries, "Canada", 8, "Family-friendly services and city infrastructure can be convenient for groups.");
      add(countries, "USA", 5, "Wide range of host cities and flights gives flexibility for families.");
      add(countries, "Mexico", 4, "Can offer better value for larger family travel budgets.");
    }

    if (profession === "it") {
      add(countries, "USA", 10, "Large event footprint and many host city choices.");
      add(countries, "Canada", 7, "Well-organized urban hubs and transit for major events.");
      add(countries, "Mexico", 6, "Popular fan destination with strong match-day atmosphere.");
    } else if (profession === "healthcare") {
      add(countries, "Canada", 8, "Reliable healthcare reputation can be reassuring for visitors.");
      add(countries, "USA", 5, "Strong facilities exist, but planning insurance is important.");
      add(countries, "Mexico", 4, "Good private options in major cities; verify coverage in advance.");
    } else if (profession === "trades") {
      add(countries, "USA", 8, "Many host cities make route planning flexible.");
      add(countries, "Canada", 6, "Good public transport in key host cities.");
      add(countries, "Mexico", 6, "Can provide budget-friendly lodging options.");
    }

    if (budget === "low") {
      add(countries, "Mexico", 10, "Often the strongest value destination for accommodation and daily spending.");
      add(countries, "Canada", -3, "Costs can be high in host metros during major events.");
      add(countries, "USA", -5, "Accommodation and match-week pricing can rise sharply.");
      warn(countries, "USA", "If budget is low, lock accommodation early and compare nearby cities.");
    } else if (budget === "high") {
      add(countries, "USA", 8, "Higher budget unlocks more city options and flexible match itineraries.");
      add(countries, "Canada", 5, "Comfort-focused travel options become easier.");
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
        add(countries, "USA", Math.min(12, pts + 1), "English is a strong advantage for navigating travel and match logistics.");
        add(countries, "Canada", Math.min(10, pts), "English helps for transit, booking, and fan services.");
        add(countries, "Mexico", Math.min(4, Math.round(pts / 3)), "English works in many tourist zones, but basic Spanish helps.");
      }

      if (code === "de") {
        add(countries, "USA", Math.min(4, Math.round(pts / 2)), "German can still help with fellow fans and travel communities.");
      }

      if (code === "sv") {
        add(countries, "Canada", Math.min(4, Math.round(pts / 2)), "Nordic language background can help with multilingual adaptation.");
      }

      if (code === "fr") {
        add(countries, "Canada", Math.min(10, Math.round(pts / 2) + 4), "French is a strong plus for Québec and bilingual services.");
      }
    }

    if (goal === "income") {
      add(countries, "USA", 8, "More premium travel and hospitality options for high-spend trips.");
      add(countries, "Canada", 4, "Balanced quality and comfort for value-conscious visitors.");
      add(countries, "Mexico", 3, "Budget can stretch further with smart planning.");
    } else if (goal === "safety") {
      add(countries, "Canada", 8, "Often preferred for predictable, family-friendly trip planning.");
      add(countries, "USA", 4, "Safe experiences are common with clear itinerary planning.");
    } else if (goal === "passport") {
      add(countries, "USA", 4, "Good for short-term tourism when you prioritize major match access.");
      add(countries, "Canada", 6, "Good for fans combining tourism with a calmer city pace.");
      add(countries, "Mexico", 6, "Often easier for budget-friendly, football-first itineraries.");
    } else if (goal === "lifestyle") {
      add(countries, "Mexico", 8, "Strong fan culture and lively social atmosphere around matches.");
      add(countries, "Canada", 5, "Balanced pace with reliable city services.");
    } else if (goal === "education") {
      add(countries, "USA", 6, "Best when combining matches with museums and major cultural sites.");
      add(countries, "Canada", 6, "Strong option for family-friendly educational sightseeing.");
      add(countries, "Mexico", 6, "Rich cultural history and football heritage experiences.");
      warn(countries, "USA", "Major-event prices can spike—book flights and hotels early.");
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
