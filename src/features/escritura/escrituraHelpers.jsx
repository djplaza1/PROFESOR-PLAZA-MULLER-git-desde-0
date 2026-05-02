// src/features/escritura/escrituraHelpers.jsx
window.Muller = window.Muller || {};
window.Muller.Escritura = window.Muller.Escritura || {};

// Frases para el modo Copia (caligrafía alemana)
window.Muller.Escritura.WRITING_COPY_DRILLS = [
  "Der schnelle braune Fuchs springt über den faulen Hund.",
  "Übung macht den Meister, und Fehler sind unsere besten Lehrer.",
  "Das schöne Mädchen lächelt, während es über die Brücke geht.",
  "Gestern habe ich einen wunderbaren Apfelkuchen gebacken.",
  "Die Sonne scheint hell auf die grünen Wiesen der Alpen.",
  "Mein Bruder fährt jeden Morgen mit dem Fahrrad zur Schule.",
  "In der Bibliothek lesen die Studenten alte Bücher über Philosophie.",
  "Könnten Sie mir bitte sagen, wie ich zum Bahnhof komme?",
  "Wenn ich Zeit hätte, würde ich mehr deutsche Literatur lesen.",
  "Die kleine Katze schläft friedlich auf dem weichen Sofa."
];

// Temas para redacción corta (modo Prompt)
window.Muller.Escritura.WRITING_PROMPTS_DE = [
  { de: "Mein Lieblingsrestaurant", es: "Mi restaurante favorito" },
  { de: "Ein unvergesslicher Urlaub", es: "Unas vacaciones inolvidables" },
  { de: "Mein bester Freund / meine beste Freundin", es: "Mi mejor amigo/a" },
  { de: "Warum ich Deutsch lerne", es: "Por qué estudio alemán" },
  { de: "Ein typischer Tag in meinem Leben", es: "Un día típico en mi vida" },
  { de: "Mein Traumberuf", es: "Mi profesión soñada" },
  { de: "Umweltschutz zu Hause", es: "Protección del medio ambiente en casa" }
];

// Tareas TELC Schreiben para el modo TELC (carta/email)
window.Muller.Escritura.WRITING_TELC_TASKS = [
  {
    level: "B1",
    title: "Sie haben im Fernsehen eine Diskussion zum Thema ‚Private Krankenversicherung‘ gesehen. Im Online-Gästebuch der Sendung finden Sie folgende Meinung: … Schreiben Sie Ihre Meinung (ca. 100 Wörter).",
    promptDe: "Schreiben Sie Ihre Meinung zum Thema private Krankenversicherung. Gehen Sie auf die Argumente ein und begründen Sie Ihre Position.",
    promptEs: "Da tu opinión sobre el seguro médico privado. Responde a los argumentos y justifica tu posición.",
    checklist: ["Meinung klar formulieren", "Auf Argumente eingehen", "Beispiele geben", "Schlussfolgerung"]
  },
  {
    level: "B1",
    title: "Sie haben eine Einladung zu einer Geburtstagsparty bekommen. Leider können Sie nicht kommen. Schreiben Sie eine Absage.",
    promptDe: "Sagen Sie ab, nennen Sie den Grund und wünschen Sie alles Gute.",
    promptEs: "Rechaza la invitación, indica el motivo y desea lo mejor.",
    checklist: ["Dank für Einladung", "Absagegrund", "Gute Wünsche", "Höflicher Ton"]
  },
  {
    level: "A2",
    title: "Schreiben Sie eine kurze Notiz an Ihre Nachbarin: Sie verreisen und bitten sie, die Blumen zu gießen.",
    promptDe: "Bitten Sie um Blumengießen, nennen Sie den Zeitraum und bieten Sie eine kleine Hilfe an.",
    promptEs: "Pide que riegue las flores, indica las fechas y ofrece algo a cambio.",
    checklist: ["Bitte formulieren", "Zeitraum nennen", "Dank ausdrücken"]
  }
];

// Generar pool de dictado según la fuente (se espera que el panel lo use combinando datos)
window.Muller.Escritura.buildDictationPool = (source, guionData, savedScripts, scriptId, currentVocabList) => {
  const items = [];
  if (source === 'builtin') {
    items.push(
      { de: "Guten Morgen, wie geht es Ihnen?", es: "Buenos días, ¿cómo está?", origin: "integrado" },
      { de: "Ich möchte ein Stück Kuchen, bitte.", es: "Quisiera un trozo de pastel, por favor.", origin: "integrado" },
      { de: "Entschuldigung, wo ist die Toilette?", es: "Disculpe, ¿dónde está el baño?", origin: "integrado" },
      { de: "Heute ist das Wetter sehr schön.", es: "Hoy el tiempo está muy bonito.", origin: "integrado" },
      { de: "Können Sie das bitte wiederholen?", es: "¿Puede repetir eso, por favor?", origin: "integrado" }
    );
  } else if (source === 'current_story' && Array.isArray(guionData)) {
    guionData.forEach(line => {
      if (line && line.text) items.push({ de: line.text, es: line.es || '', origin: 'historia' });
    });
  } else if (source === 'all_saved') {
    savedScripts.forEach(s => {
      try {
        const rows = JSON.parse(s.data || '[]');
        rows.forEach(r => { if (r && r.text) items.push({ de: r.text, es: r.es || '', origin: s.title || 'guion' }); });
      } catch (e) {}
    });
  } else if (source === 'one_saved') {
    const script = savedScripts.find(s => String(s.id) === String(scriptId));
    if (script) {
      try {
        const rows = JSON.parse(script.data || '[]');
        rows.forEach(r => { if (r && r.text) items.push({ de: r.text, es: r.es || '', origin: script.title || 'guion' }); });
      } catch (e) {}
    }
  } else if (source === 'vocab' && Array.isArray(currentVocabList)) {
    currentVocabList.forEach(v => {
      if (v && v.de) items.push({ de: v.de, es: v.es || '', origin: 'vocabulario' });
    });
  }
  if (items.length === 0) items.push({ de: "Der Himmel ist blau.", es: "El cielo es azul.", origin: "base" });
  return items;
};

// Reconstruir frases del guion para modo Guion
window.Muller.Escritura.buildGuionLines = (guionData) => {
  return (guionData || []).map(s => s.text || '').filter(Boolean);
};

// ─── Corrección ortográfica real vía LanguageTool (gratis) ───
window.Muller.Escritura.checkSpelling = async (text, lang = 'de-DE') => {
  if (!text || text.trim().length < 3) return [];
  try {
    const res = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ text, language: lang })
    });
    if (!res.ok) throw new Error('LanguageTool API error: ' + res.status);
    const data = await res.json();
    return (data.matches || []).map(m => ({
      offset: m.offset,
      length: m.length,
      message: m.message,
      shortMessage: m.shortMessage,
      replacements: (m.replacements || []).slice(0, 3).map(r => r.value),
      rule: m.rule?.id || '',
      context: m.context?.text || ''
    }));
  } catch (e) {
    console.warn('LanguageTool falló:', e);
    return [];
  }
};

// ─── Corrección avanzada con IA (DeepSeek) si hay API Key ───
window.Muller.Escritura.checkSpellingWithAI = async (text, apiKey) => {
  if (!text || !apiKey) return null;
  try {
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{
          role: 'system',
          content: 'Eres un corrector de alemán. Corrige errores de ortografía y gramática del siguiente texto. Responde solo con el texto corregido, sin explicaciones. Si no hay errores, devuelve el texto original.'
        }, {
          role: 'user',
          content: text
        }],
        temperature: 0.1,
        temperature: (window.Muller.getTemperature ? window.Muller.getTemperature() : 0.7),
        max_tokens: 1000
      })
    });
    if (!res.ok) throw new Error('DeepSeek API error: ' + res.status);
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || text;
  } catch (e) {
    console.warn('DeepSeek falló:', e);
    return null;
  }
};

