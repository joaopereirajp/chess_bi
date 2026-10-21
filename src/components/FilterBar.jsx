'use client';

import { Filter, Users, RotateCcw } from 'lucide-react';

export default function FilterBar({ selectedTier, onSelectTier, tiersList, countsByTier }) {
  return (
    <div className="glass-panel rounded-2xl p-4 mb-6 border border-gray-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Filter label */}
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Filtrar por Nível de Habilidade</h2>
            <p className="text-xs text-gray-400">Analise como a proficiência altera as métricas do jogo</p>
          </div>
        </div>

        {/* Center: Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onSelectTier('Todos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedTier === 'Todos'
                ? 'bg-amber-500 text-gray-950 font-bold shadow-md shadow-amber-500/20 scale-102'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-700/50'
            }`}
          >
            Todos os Níveis (20.058)
          </button>

          {tiersList.map((tier) => {
            const count = countsByTier[tier] || 0;
            const isSelected = selectedTier === tier;
            return (
              <button
                key={tier}
                onClick={() => onSelectTier(tier)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-gray-950 font-bold shadow-md shadow-amber-500/20 scale-102'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-700/50'
                }`}
              >
                {tier} <span className="opacity-70 text-[10px]">({count.toLocaleString()})</span>
              </button>
            );
          })}

          {selectedTier !== 'Todos' && (
            <button
              onClick={() => onSelectTier('Todos')}
              className="p-1.5 text-xs text-gray-400 hover:text-amber-400 rounded-lg hover:bg-gray-800 transition"
              title="Redefinir Filtro"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
