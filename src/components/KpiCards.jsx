'use client';

import { Trophy, Clock, Swords, Award, TrendingUp } from 'lucide-react';

export default function KpiCards({ kpis, filterLabel }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6">
      {/* Card 1: Total Partidas */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-gray-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-gray-400 uppercase tracking-wider truncate">
              Total Partidas
            </span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 shrink-0">
              <Swords className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-2xl sm:text-3.5xl font-black text-slate-950 dark:text-white tracking-tight">
              {kpis.total_games.toLocaleString('pt-BR')}
            </span>
            <span className="text-xs text-blue-700 dark:text-blue-400 font-bold">jogos</span>
          </div>
        </div>
        <div className="mt-2.5 text-xs text-slate-600 dark:text-gray-400 flex items-center justify-between font-medium">
          <span className="hidden sm:inline">Escopo:</span>
          <span className="text-slate-900 dark:text-gray-200 font-bold truncate max-w-[120px] sm:max-w-[140px]">{filterLabel}</span>
        </div>
      </div>

      {/* Card 2: Taxa de Vitória Brancas */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-gray-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-gray-400 uppercase tracking-wider truncate">
              Vit. Brancas
            </span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/20 shrink-0">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-2xl sm:text-3.5xl font-black text-amber-700 dark:text-amber-400 tracking-tight">
              {kpis.white_win_pct}%
            </span>
            <span className="text-xs text-slate-700 dark:text-gray-400 font-semibold">vs {kpis.black_win_pct}% P</span>
          </div>
          {/* Proportional Mini Bar */}
          <div className="mt-2.5 sm:mt-3 w-full bg-slate-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden flex">
            <div
              className="bg-amber-500 h-full"
              style={{ width: `${kpis.white_win_pct}%` }}
              title={`Brancas: ${kpis.white_win_pct}%`}
            />
            <div
              className="bg-slate-400 h-full"
              style={{ width: `${kpis.draw_pct}%` }}
              title={`Empates: ${kpis.draw_pct}%`}
            />
            <div
              className="bg-slate-700 dark:bg-slate-600 h-full"
              style={{ width: `${kpis.black_win_pct}%` }}
              title={`Pretas: ${kpis.black_win_pct}%`}
            />
          </div>
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] sm:text-[11px] text-slate-700 dark:text-gray-400 font-bold">
          <span>B: {kpis.white_win_pct}%</span>
          <span>E: {kpis.draw_pct}%</span>
          <span>P: {kpis.black_win_pct}%</span>
        </div>
      </div>

      {/* Card 3: Duração Média */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-gray-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-gray-400 uppercase tracking-wider truncate">
              Duração Média
            </span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20 shrink-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-2xl sm:text-3.5xl font-black text-emerald-700 dark:text-emerald-400 tracking-tight">
              {kpis.avg_turns}
            </span>
            <span className="text-xs text-slate-700 dark:text-gray-400 font-bold">turnos</span>
          </div>
        </div>
        <div className="mt-2.5 text-xs text-slate-600 dark:text-gray-400 flex items-center justify-between font-medium">
          <span className="hidden sm:inline">Tempo est.:</span>
          <span className="text-emerald-800 dark:text-emerald-400 font-bold">~{Math.round(kpis.avg_turns * 0.45)} min</span>
        </div>
      </div>

      {/* Card 4: Rating Médio */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-gray-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-gray-400 uppercase tracking-wider truncate">
              Rating Médio
            </span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-300 dark:border-purple-500/20 shrink-0">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-2xl sm:text-3.5xl font-black text-purple-700 dark:text-purple-400 tracking-tight">
              {kpis.avg_rating}
            </span>
            <span className="text-xs text-slate-700 dark:text-gray-400 font-bold">Elo</span>
          </div>
        </div>
        <div className="mt-2.5 text-xs text-slate-600 dark:text-gray-400 flex items-center justify-between font-medium">
          <span className="hidden sm:inline">Nível:</span>
          <span className="text-purple-800 dark:text-purple-300 font-bold truncate max-w-[120px]">
            {kpis.avg_rating >= 2000
              ? 'Mestre'
              : kpis.avg_rating >= 1800
              ? 'Avançado'
              : kpis.avg_rating >= 1400
              ? 'Intermediário'
              : 'Iniciante'}
          </span>
        </div>
      </div>
    </div>
  );
}
