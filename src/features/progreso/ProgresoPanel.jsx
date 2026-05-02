// src/features/progreso/ProgresoPanel.jsx
window.Muller = window.Muller || {};
window.Muller.Panels = window.Muller.Panels || {};

window.Muller.Panels.ProgresoPanel = ({ db, user }) => {
  const { useState, useEffect } = React;
  const { Lucide: { TrendingUp, Flame, Award, BookOpen, PenTool, Mic, Calendar, Zap, Star, ChevronRight } } = window;

  const [dashboard, setDashboard] = useState(null);
  const [last30Days, setLast30Days] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [profileLevel, setProfileLevel] = useState({});

  useEffect(() => {
    const data = window.Muller.Progreso.getDashboardData();
    setDashboard(data);
    setLast30Days(window.Muller.Progreso.getLast30DaysActivity());
    setWeeklyStats(window.Muller.Progreso.getWeeklyStats());
    setProfileLevel(window.Muller.Progreso.getProfileLevel(data.totalPoints));
  }, []);

  if (!dashboard) return <div className="p-8 text-center text-gray-400">Cargando progreso...</div>;

  const maxDaily = Math.max(1, ...last30Days.map(d => d.count));
  const maxWeekly = Math.max(1, ...weeklyStats.map(d => d.value));

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-4xl mx-auto w-full animate-in fade-in duration-500 overflow-y-auto pb-24 space-y-6">
      {/* Cabecera */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl md:text-4xl font-black text-amber-100 flex items-center gap-2">
          <TrendingUp className="w-8 h-8 md:w-10 md:h-10" /> Progreso
        </h1>
        <div className={`px-4 py-2 rounded-full text-sm font-black text-white shadow-lg ${profileLevel.color || 'bg-gray-500'}`}>
          {profileLevel.emoji} Nivel {profileLevel.level} · {profileLevel.title}
        </div>
      </div>

      {/* Tarjetas principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-amber-900/60 to-amber-800/40 border border-amber-500/30 rounded-xl p-4 text-center">
          <Flame className="w-6 h-6 text-amber-400 mx-auto mb-1" />
          <p className="text-2xl md:text-3xl font-black text-amber-200">{dashboard.streak}</p>
          <p className="text-[10px] text-amber-400 uppercase tracking-wider">Racha (días)</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-900/60 to-emerald-800/40 border border-emerald-500/30 rounded-xl p-4 text-center">
          <Award className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
          <p className="text-2xl md:text-3xl font-black text-emerald-200">{dashboard.totalPoints}</p>
          <p className="text-[10px] text-emerald-400 uppercase tracking-wider">Puntos</p>
        </div>
        <div className="bg-gradient-to-br from-blue-900/60 to-blue-800/40 border border-blue-500/30 rounded-xl p-4 text-center">
          <BookOpen className="w-6 h-6 text-blue-400 mx-auto mb-1" />
          <p className="text-2xl md:text-3xl font-black text-blue-200">{dashboard.wordsLearned}</p>
          <p className="text-[10px] text-blue-400 uppercase tracking-wider">Palabras</p>
        </div>
        <div className="bg-gradient-to-br from-purple-900/60 to-purple-800/40 border border-purple-500/30 rounded-xl p-4 text-center">
          <Zap className="w-6 h-6 text-purple-400 mx-auto mb-1" />
          <p className="text-2xl md:text-3xl font-black text-purple-200">{dashboard.sessionsCompleted}</p>
          <p className="text-[10px] text-purple-400 uppercase tracking-wider">Sesiones</p>
        </div>
      </div>

      {/* Actividad diaria (mapa de calor) */}
      <div className="rounded-xl bg-black/35 border border-amber-500/25 p-4">
        <h3 className="text-sm font-black text-amber-200 flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4" /> Actividad (últimos 30 días)
        </h3>
        <div className="grid grid-cols-15 gap-1">
          {last30Days.map((d, i) => (
            <div key={d.date} className="relative group">
              <div
                className="w-full aspect-square rounded-sm transition-colors"
                style={{
                  backgroundColor: d.count > 0
                    ? `rgba(251, 191, 36, ${Math.min(0.15 + (d.count / maxDaily) * 0.85, 1)})`
                    : 'rgba(255,255,255,0.05)'
                }}
                title={`${d.date}: ${d.count} actividades`}
              />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
                {d.date}: {d.count}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2 text-[9px] text-gray-500">
          <span>Hace 30 días</span>
          <span>Hoy</span>
        </div>
      </div>

      {/* Gráfico semanal simplificado */}
      <div className="rounded-xl bg-black/35 border border-amber-500/25 p-4">
        <h3 className="text-sm font-black text-amber-200 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Esta semana
        </h3>
        <div className="flex items-end gap-2 h-32">
          {weeklyStats.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-amber-300 font-bold">{d.value}</span>
              <div
                className="w-full bg-gradient-to-t from-amber-500/80 to-amber-400/40 rounded-t-md transition-all"
                style={{ height: `${Math.max(4, (d.value / maxWeekly) * 100)}%` }}
              />
              <span className="text-[9px] text-gray-500">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas detalladas */}
      <div className="rounded-xl bg-black/35 border border-amber-500/25 p-4">
        <h3 className="text-sm font-black text-amber-200 mb-3">Estadísticas detalladas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <StatCard icon={<PenTool className="w-4 h-4 text-rose-400" />} label="Artículos" value={dashboard.articlesMastered} />
          <StatCard icon={<BookOpen className="w-4 h-4 text-cyan-400" />} label="Verbos+Prep" value={dashboard.verbsMastered} />
          <StatCard icon={<Star className="w-4 h-4 text-yellow-400" />} label="Preposiciones" value={dashboard.prepositionsMastered} />
          <StatCard icon={<Mic className="w-4 h-4 text-sky-400" />} label="Lecturas" value={dashboard.readingSessions} />
          <StatCard icon={<PenTool className="w-4 h-4 text-rose-400" />} label="Escrituras" value={dashboard.writingSessions} />
          <StatCard icon={<Award className="w-4 h-4 text-amber-400" />} label="Logros" value={dashboard.achievements.length} />
        </div>
      </div>

      {/* Logros desbloqueados */}
      {dashboard.achievements.length > 0 && (
        <div className="rounded-xl bg-black/35 border border-amber-500/25 p-4">
          <h3 className="text-sm font-black text-amber-200 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" /> Logros desbloqueados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {dashboard.achievements.map((ach, i) => (
              <div key={i} className="flex items-center gap-3 bg-amber-900/20 border border-amber-500/20 rounded-lg px-3 py-2">
                <span className="text-2xl">{ach.emoji || '🏆'}</span>
                <div>
                  <p className="text-sm font-bold text-amber-200">{ach.name || ach.title}</p>
                  {ach.description && <p className="text-[10px] text-amber-400/80">{ach.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje inspirador */}
      <div className="rounded-xl bg-gradient-to-r from-amber-900/30 to-emerald-900/30 border border-amber-500/20 p-4 text-center">
        <p className="text-sm text-amber-200/90 font-medium">
          {dashboard.streak >= 7
            ? `¡${dashboard.streak} días seguidos! Sigue así, estás construyendo un hábito increíble.`
            : dashboard.streak >= 3
              ? `¡${dashboard.streak} días de racha! La constancia es la clave del éxito.`
              : '¡Cada día cuenta! Vuelve mañana para mantener tu racha.'}
        </p>
      </div>
    </div>
  );
};

// Componente de tarjeta de estadística
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white/5 rounded-lg p-3 flex items-center gap-3">
    <div className="bg-black/30 p-2 rounded-lg">{icon}</div>
    <div>
      <p className="text-lg font-black text-white">{value || 0}</p>
      <p className="text-[10px] text-gray-400 uppercase">{label}</p>
    </div>
  </div>
);

