'use client';

import { useState } from 'react';
import { Search, ArrowUpDown, ChevronDown, Trophy } from 'lucide-react';

export default function OpeningsTable({ openings }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('white_win_pct');
  const [sortDesc, setSortDesc] = useState(true);

  const filtered = openings
    .filter((op) => {
      const term = searchTerm.toLowerCase();
      return (
        op.name.toLowerCase().includes(term) ||
        op.eco.toLowerCase().includes(term) ||
        op.family.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      const modifier = sortDesc ? -1 : 1;
      if (sortBy === 'name') return modifier * a.name.localeCompare(b.name);
      return modifier * (a[sortBy] - b[sortBy]);
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(field);
      setSortDesc(true);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <span>Tabela Analítica de Aberturas</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {filtered.length} aberturas
            </span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Explore taxas de vitória, códigos ECO e duração média de cada abertura (mínimo de 40 partidas)
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por abertura ou ECO (ex: Sicilian, B20)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-900/80 border border-gray-700/60 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 transition"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-900/80 text-gray-400 uppercase font-semibold text-[11px] border-b border-gray-800">
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-white cursor-pointer"
                >
                  <span>Abertura / Família</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-3">ECO</th>
              <th className="py-3 px-3 text-right">
                <button
                  onClick={() => handleSort('total_games')}
                  className="flex items-center space-x-1 ml-auto hover:text-white cursor-pointer"
                >
                  <span>Partidas</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  onClick={() => handleSort('white_win_pct')}
                  className="flex items-center space-x-1 ml-auto text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <span>% Vit. Brancas</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  onClick={() => handleSort('black_win_pct')}
                  className="flex items-center space-x-1 ml-auto hover:text-white cursor-pointer"
                >
                  <span>% Vit. Pretas</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  onClick={() => handleSort('draw_pct')}
                  className="flex items-center space-x-1 ml-auto hover:text-white cursor-pointer"
                >
                  <span>% Empates</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  onClick={() => handleSort('avg_turns')}
                  className="flex items-center space-x-1 ml-auto hover:text-white cursor-pointer"
                >
                  <span>Média Turnos</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 bg-gray-950/40">
            {filtered.slice(0, 25).map((op, idx) => (
              <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                <td className="py-2.5 px-4">
                  <div className="font-medium text-white">{op.name}</div>
                  <div className="text-[10px] text-gray-500">{op.family}</div>
                </td>
                <td className="py-2.5 px-3">
                  <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-300 font-mono text-[10px] border border-gray-700">
                    {op.eco}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right font-medium text-gray-300">
                  {op.total_games.toLocaleString()}
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-amber-400">
                  {op.white_win_pct}%
                </td>
                <td className="py-2.5 px-3 text-right text-gray-400">
                  {op.black_win_pct}%
                </td>
                <td className="py-2.5 px-3 text-right text-gray-500">
                  {op.draw_pct}%
                </td>
                <td className="py-2.5 px-4 text-right text-emerald-400 font-medium">
                  {op.avg_turns}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length > 25 && (
        <div className="mt-2 text-center text-[11px] text-gray-500">
          Mostrando as 25 primeiras aberturas correspondentes. Use a busca acima para filtrar.
        </div>
      )}
    </div>
  );
}
