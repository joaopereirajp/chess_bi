'use client';

import { Trophy, Clock, Swords, Award, TrendingUp } from 'lucide-react';

export default function KpiCards({ kpis, filterLabel }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Card 1: Total Partidas */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Total de Partidas
          </span>
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Swords className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {kpis.total_games.toLocaleString()}
          </span>
          <span className="text-xs text-blue-400 font-medium">jogos</span>
        </div>
        <div className="mt-2 text-xs text-gray-400 flex items-center justify-between">
          <span>Escopo atual:</span>
          <span className="text-gray-300 font-medium truncate max-w-[140px]">{filterLabel}</span>
        </div>
      </div>

      {/* Card 2: Taxa de Vitória Brancas */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Vitórias Brancas
          </span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trophy className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-amber-400 tracking-tight">
            {kpis.white_win_pct}%
          </span>
          <span className="text-xs text-gray-400">vs {kpis.black_win_pct}% Pretas</span>
        </div>
        {/* Proportional Mini Bar */}
        <div className="mt-3 w-full bg-gray-800 h-1.5 rounded-full overflow-hidden flex">
          <div
            className="bg-amber-400 h-full"
            style={{ width: `${kpis.white_win_pct}%` }}
            title={`Brancas: ${kpis.white_win_pct}%`}
          />
          <div
            className="bg-gray-400 h-full"
            style={{ width: `${kpis.draw_pct}%` }}
            title={`Empates: ${kpis.draw_pct}%`}
          />
          <div
            className="bg-slate-700 h-full"
            style={{ width: `${kpis.black_win_pct}%` }}
            title={`Pretas: ${kpis.black_win_pct}%`}
          />
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-gray-400">
          <span>Brancas: {kpis.white_win_pct}%</span>
          <span>Empate: {kpis.draw_pct}%</span>
          <span>Pretas: {kpis.black_win_pct}%</span>
        </div>
      </div>

      {/* Card 3: Duração Média */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Duração Média
          </span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
            {kpis.avg_turns}
          </span>
          <span className="text-xs text-gray-400">turnos</span>
        </div>
        <div className="mt-2 text-xs text-gray-400 flex items-center justify-between">
          <span>Tempo estimado:</span>
          <span className="text-emerald-400 font-medium">~{Math.round(kpis.avg_turns * 0.45)} min</span>
        </div>
      </div>

      {/* Card 4: Rating Médio */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Rating Médio (Elo)
          </span>
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-purple-400 tracking-tight">
            {kpis.avg_rating}
          </span>
          <span className="text-xs text-gray-400">pontos</span>
        </div>
        <div className="mt-2 text-xs text-gray-400 flex items-center justify-between">
          <span>Nível competitivo:</span>
          <span className="text-purple-300 font-medium">
            {kpis.avg_rating >= 2000
              ? 'Mestre / Especialista'
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
