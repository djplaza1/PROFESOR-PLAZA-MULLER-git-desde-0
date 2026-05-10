// corrector.js – Reglas flexibles de corrección para alemán y español
window.Corrector = {
  // Limpia puntuación final (punto, exclamación, interrogación, coma, etc.) antes de normalizar
  stripPunctuation(str) {
    return (str || '').trim().replace(/[.!¡?¿,;]+$/g, '').trim();
  },

  normalize(str) {
    return this.stripPunctuation(str).toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[áàâ]/g, 'a').replace(/[éèê]/g, 'e').replace(/[íìî]/g, 'i')
      .replace(/[óòô]/g, 'o').replace(/[úùû]/g, 'u').replace(/ñ/g, 'n');
  },

  synonyms: window.PhraseGenerator?.synonyms || {},

  expandSynonyms(word) {
    const w = word.toLowerCase().trim();
    return this.synonyms[w] || [w];
  },

  // Nueva función: expande alternativas separadas por "/" en una traducción
  expandAlternatives(correctStr) {
    const parts = correctStr.split('/').map(p => p.trim()).filter(p => p.length > 0);
    return parts.length > 1 ? parts : [correctStr];
  },

  check(user, correct, lang) {
    const u = this.normalize(user);
    const uRaw = this.stripPunctuation(user).trim();
    const c = this.normalize(correct);

    // 1. Coincidencia exacta
    if (u === c) return { correct: true, exact: true, message: '' };

    // 2. Respuesta vacía
    if (!u) return { correct: false, exact: false, message: '' };

    // 3. Comprobar con alternativas (partes separadas por "/")
    const alternatives = this.expandAlternatives(correct);
    for (let alt of alternatives) {
      if (this.normalize(alt) === u) {
        return { correct: true, exact: false, message: 'Alternativa aceptada.' };
      }
      // También comparar el texto sin normalizar agresivamente
      if (this.stripPunctuation(alt).toLowerCase().trim() === uRaw.toLowerCase()) {
        return { correct: true, exact: false, message: 'Alternativa aceptada.' };
      }
    }

    // 4. Comprobación con sinónimos
    const synonymsList = this.expandSynonyms(correct);
    if (synonymsList.some(syn => this.normalize(syn) === u)) {
      return { correct: true, exact: false, message: 'Sinónimo aceptado.' };
    }

    // 5. Quitar artículos y preposiciones
    const stopWords = ['der','die','das','el','la','los','las','un','una','de','del','the','a','an','ein','eine'];
    const clean = (s) => (s || '').split(' ').filter(w => !stopWords.includes(w.toLowerCase())).join(' ');
    const uClean = this.normalize(clean(user));
    const cClean = this.normalize(clean(correct));
    if (uClean === cClean && uClean.length > 1) {
      return { correct: true, exact: false, message: 'Correcto, pero no olvides los artículos y preposiciones.' };
    }
    // Comprobar también con alternativas limpias
    for (let alt of alternatives) {
      if (this.normalize(clean(alt)) === uClean) {
        return { correct: true, exact: false, message: 'Alternativa aceptada.' };
      }
    }

    // 6. Sustantivo alemán sin mayúscula inicial
    if (lang === 'de' && user.trim().charAt(0) === user.trim().charAt(0).toLowerCase()) {
      const cap = user.trim().charAt(0).toUpperCase() + user.trim().slice(1);
      const capNorm = this.normalize(cap);
      if (capNorm === c) {
        return { correct: true, exact: false, message: 'Bien, pero los sustantivos alemanes llevan mayúscula: ' + cap + '.' };
      }
      if (synonymsList.some(syn => this.normalize(syn) === capNorm)) {
        return { correct: true, exact: false, message: 'Sinónimo aceptado. Recuerda mayúscula: ' + cap + '.' };
      }
    }

    return { correct: false, exact: false, message: '' };
  }
};
// Asignar sinónimos desde PhraseGenerator cuando esté disponible
if (window.PhraseGenerator && window.PhraseGenerator.synonyms) {
  window.Corrector.synonyms = window.PhraseGenerator.synonyms;
}