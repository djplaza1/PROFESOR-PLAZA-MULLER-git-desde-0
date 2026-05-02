(function() {
  const M = window.Muller = window.Muller || {};
  const { get, set } = M.storage;
  const { KEYS } = M;

  M.vocabSrsKey = w => (w||'').trim().toLowerCase();
  M.getVocabSrsMap = () => get(KEYS.VOCAB_SRS, {});
  M.setVocabSrsMap = map => set(KEYS.VOCAB_SRS, map);
  M.incrementSrsView = (map, word) => { const k=M.vocabSrsKey(word); const next={...map}; next[k]=next[k]||{interval:0,ease:2.5,reviews:0,dueDate:null,lastReview:null}; return next; };
  M.applyVocabSrsRating = (map, word, rating) => {
    const k = M.vocabSrsKey(word);
    const next = {...map};
    const prev = next[k] || { interval:0, ease:2.5, reviews:0, dueDate:null, lastReview:null };
    const now = Date.now(); let { interval, ease } = prev;
    if (rating>=3) {
      if (interval===0) interval=1; else if (interval===1) interval=3; else interval=Math.round(interval*ease);
      ease = Math.max(1.3, ease+0.1-(5-rating)*(0.08+(5-rating)*0.02));
    } else { interval=0; ease = Math.max(1.3, ease-0.2); }
    next[k] = { interval, ease, reviews:prev.reviews+1, lastReview:new Date(now).toISOString(), dueDate:new Date(now+interval*86400000).toISOString().slice(0,10) };
    return next;
  };
  M.countVocabSrsDue = (words, map) => {
    const today = new Date().toISOString().slice(0,10); let c=0;
    (words||[]).forEach(w=>{ const k=M.vocabSrsKey(w); const e=map[k]; if(!e||!e.dueDate||e.dueDate<=today) c++; });
    return c;
  };
  M.sortVocabBySrs = (words, map) => {
    const today = new Date().toISOString().slice(0,10);
    return [...(words||[])].sort((a,b)=>{
      const ea=map[M.vocabSrsKey(a)]||{dueDate:'1970-01-01',interval:9999}, eb=map[M.vocabSrsKey(b)]||{dueDate:'1970-01-01',interval:9999};
      const aDue=ea.dueDate<=today?0:1, bDue=eb.dueDate<=today?0:1;
      return aDue-bDue || (ea.interval||0)-(eb.interval||0);
    });
  };
})();
