'use client';

import { Filter, RotateCcw, Check, Users, Sparkles } from 'lucide-react';

export default function FilterBar({ selectedTier, onSelectTier, countsByTier }) {
  const totalGames = 20058;

  const tiers = [
    {
      id: 'Todos',
      shortName: 'Geral',
      range: 'Todos os Ratings',
      count: totalGames,
      pct: '100%',
    },
    {
      id: 'Iniciante (<1400)',
      shortName: 'Iniciante',
      range: '< 1400 Elo',
      count: countsByTier['Iniciante (<1400)'] || 4846,
      pct: '24.2%',
    },
    {
      id: 'Intermediário (1400-1800)',
      shortName: 'Intermediário',
      range: '1400 – 1800 Elo',
      count: countsByTier['Intermediário (1400-1800)'] || 10746,
      pct: '53.6%',
    },
    {
      id: 'Avançado (1800-2100)',
      shortName: 'Avançado',
      range: '1800 – 2100 Elo',
      count: countsByTier['Avançado (1800-2100)'] || 3749,
      pct: '18.7%',
    },
    {
      id: 'Mestre/Especialista (2100+)',
      shortName: 'Mestre / Especialista',
      range: '2100+ Elo',
      count: countsByTier['Mestre/Especialista (2100+)'] || 717,
      pct: '3.6%',
    },
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 mb-6 border border-gray-800/80 shadow-xl bg-gray-900/40">
      {/* Top Header of the filter section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-gray-800/70">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-white tracking-tight">
                Filtrar por Nível de Habilidade
              </h2>
              <span className="text-[11px] font-semibold text-gray-400 px-2 py-0.5 rounded-full bg-gray-800/80 border border-gray-700/60">
                Segmentação Elo
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Selecione uma faixa para recalcular instantaneamente os KPIs, gráficos e aberturas
            </p>
          </div>
        </div>

        {/* Status / Reset button */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {selectedTier !== 'Todos' ? (
            <button
              onClick={() => onSelectTier('Todos')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar Filtro</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1 text-xs text-gray-400 px-2.5 py-1 rounded-lg bg-gray-800/40 border border-gray-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Exibindo visão global</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid of 5 uniform, perfectly aligned filter cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {tiers.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <button
              key={tier.id}
              onClick={() => onSelectTier(tier.id)}
              className={`group relative text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'bg-gray-900/60 hover:bg-gray-800/80 border-gray-800/90 hover:border-gray-700 text-gray-300'
              }`}
            >
              {/* Selected Checkmark Indicator */}
              <div className="flex items-start justify-between gap-1 mb-2">
                <span
                  className={`text-xs font-bold tracking-tight truncate ${
                    isSelected ? 'text-amber-400' : 'text-gray-200 group-hover:text-white'
                  }`}
                >
                  {tier.shortName}
                </span>

                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-gray-950 shadow-sm'
                      : 'border border-gray-700 group-hover:border-gray-500'
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>

              {/* Rating Range */}
              <div className="text-[11px] text-gray-400 font-mono mb-2">
                {tier.range}
              </div>

              {/* Bottom Count and Percentage Pill */}
              <div className="flex items-center justify-between text-[10px] pt-2 border-t border-gray-800/60 mt-auto">
                <span className={isSelected ? 'text-amber-200 font-medium' : 'text-gray-400'}>
                  {tier.count.toLocaleString()} partidas
                </span>
                <span
                  className={`px-1.5 py-0.2 rounded font-semibold ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {tier.pct}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
