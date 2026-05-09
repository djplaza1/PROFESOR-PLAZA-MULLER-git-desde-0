// corrector.js – Reglas flexibles de corrección para alemán y español
window.Corrector = {
  normalize(str) {
    return (str || "").trim().toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[áàâ]/g, 'a').replace(/[éèê]/g, 'e').replace(/[íìî]/g, 'i')
      .replace(/[óòô]/g, 'o').replace(/[úùû]/g, 'u').replace(/ñ/g, 'n');
  },

  check(user, correct, lang) {
    const u = this.normalize(user);
    const c = this.normalize(correct);
    if (u === c) return { correct: true, exact: true, message: "" };

    // Quitar artículos y preposiciones para comparar núcleo
    const stopWords = ['der','die','das','el','la','los','las','un','una','de','del','the','a','an','ein','eine'];
    const clean = (s) => (s || "").split(' ').filter(w => !stopWords.includes(w.toLowerCase())).join(' ');
    const uClean = this.normalize(clean(user));
    const cClean = this.normalize(clean(correct));
    if (uClean === cClean && uClean.length > 1) {
      return { correct: true, exact: false, message: "Correcto, pero no olvides los artículos y preposiciones." };
    }

    // Sustantivo alemán sin mayúscula inicial
    if (lang === 'de' && user.trim().charAt(0) === user.trim().charAt(0).toLowerCase()) {
      const cap = user.trim().charAt(0).toUpperCase() + user.trim().slice(1);
      if (this.normalize(cap) === c) {
        return { correct: true, exact: false, message: "Bien, pero los sustantivos alemanes llevan mayúscula: " + cap + "." };
      }
    }

    return { correct: false, exact: false, message: "" };
  }
};
