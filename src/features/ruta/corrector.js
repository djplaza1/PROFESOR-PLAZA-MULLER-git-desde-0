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

  check(user, correct, lang) {
    const u = this.normalize(user);
    const c = this.normalize(correct);

    // Coincidencia exacta
    if (u === c) return { correct: true, exact: true, message: '' };

    // Si la respuesta del usuario está vacía
    if (!u) return { correct: false, exact: false, message: '' };

    // Comprobación con sinónimos: si alguna forma aceptada coincide con la respuesta normalizada
    const synonymsList = this.expandSynonyms(correct);
    const uMatch = synonymsList.some(syn => this.normalize(syn) === u);
    if (uMatch) return { correct: true, exact: false, message: 'Sinónimo aceptado.' };

    // Quitar artículos y preposiciones para comparar núcleo
    const stopWords = ['der','die','das','el','la','los','las','un','una','de','del','the','a','an','ein','eine'];
    const clean = (s) => (s || '').split(' ').filter(w => !stopWords.includes(w.toLowerCase())).join(' ');
    const uClean = this.normalize(clean(user));
    const cClean = this.normalize(clean(correct));
    if (uClean === cClean && uClean.length > 1) {
      return { correct: true, exact: false, message: 'Correcto, pero no olvides los artículos y preposiciones.' };
    }

    // Sustantivo alemán sin mayúscula inicial
    if (lang === 'de' && user.trim().charAt(0) === user.trim().charAt(0).toLowerCase()) {
      const cap = user.trim().charAt(0).toUpperCase() + user.trim().slice(1);
      const capNorm = this.normalize(cap);
      if (capNorm === c) {
        return { correct: true, exact: false, message: 'Bien, pero los sustantivos alemanes llevan mayúscula: ' + cap + '.' };
      }
      // También verificar capNorm con sinónimos
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