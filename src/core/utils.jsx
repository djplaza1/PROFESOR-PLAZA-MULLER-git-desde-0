(function() {
  const M = window.Muller = window.Muller || {};
  M.hash32 = str => { let h=2166136261; for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);} return (h>>>0).toString(16); };
  M.b64ToBytes = b64 => { const bin=atob(b64), u8=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u8[i]=bin.charCodeAt(i); return u8; };
  M.bytesToB64 = u8 => { let bin=''; for(let i=0;i<u8.length;i++) bin+=String.fromCharCode(u8[i]); return btoa(bin); };
  M.randomSalt = () => { const u8=new Uint8Array(16); crypto.getRandomValues(u8); return u8; };
  M.maskEmail = email => { const [n,d]=email.split('@'); return n&&d?n[0]+'***'+n[n.length-1]+'@'+d:email; };
  M.todayISODate = () => new Date().toISOString().slice(0,10);
  M.isoWeekMonday = d => { const dt=new Date(d); const day=dt.getDay()||7; if(day!==1) dt.setHours(-24*(day-1)); return dt; };
  M.honestStreak = daysMap => { const today=M.todayISODate(); let streak=0, d=new Date(today+'T00:00:00'); while(true){ if(!daysMap[d.toISOString().slice(0,10)]) break; streak++; d.setDate(d.getDate()-1); } return streak; };
  let _ctx;
  M.tone = (freq=440,start=0,len=0.15,vol=0.3,typ='sine') => { try { if(!_ctx) _ctx=new (window.AudioContext||window.webkitAudioContext)(); const o=_ctx.createOscillator(),g=_ctx.createGain(); o.type=typ; o.frequency.value=freq; g.gain.setValueAtTime(vol,_ctx.currentTime+start); g.gain.exponentialRampToValueAtTime(0.001,_ctx.currentTime+start+len); o.connect(g).connect(_ctx.destination); o.start(_ctx.currentTime+start); o.stop(_ctx.currentTime+start+len); } catch(e) {} };
  M.urgency = (interval,ease,lastReview) => { const now=Date.now(); const overdue=(now-lastReview)/86400000-interval; return Math.max(0,Math.round(overdue*ease*10)/10); };

  // ─── Control global de temperatura para IA ───
  M.DEFAULT_IA_TEMPERATURE = 0.7;
  M.getTemperature = () => {
    try {
      const t = parseFloat(localStorage.getItem('muller_ia_temperature'));
      return isNaN(t) ? M.DEFAULT_IA_TEMPERATURE : Math.min(2, Math.max(0, t));
    } catch { return M.DEFAULT_IA_TEMPERATURE; }
  };
  M.setTemperature = (t) => {
    const val = Math.min(2, Math.max(0, parseFloat(t) || M.DEFAULT_IA_TEMPERATURE));
    localStorage.setItem('muller_ia_temperature', val);
    return val;
  };

  // ─── Distancia de Levenshtein ───
  M.levenshteinDistance = function(a, b) {
    const alen = a.length;
    const blen = b.length;
    const mat = [];
    for (let i = 0; i <= alen; i++) {
      mat[i] = [i];
    }
    for (let j = 0; j <= blen; j++) {
      mat[0][j] = j;
    }
    for (let i = 1; i <= alen; i++) {
      for (let j = 1; j <= blen; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        mat[i][j] = Math.min(
          mat[i - 1][j] + 1,
          mat[i][j - 1] + 1,
          mat[i - 1][j - 1] + cost
        );
      }
    }
    return mat[alen][blen];
  };
})();

