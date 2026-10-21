'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
  Sparkles,
  Trophy,
} from 'lucide-react';

export default function OpeningsTable({ openings }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('Todas');
  const [sortBy, setSortBy] = useState('white_win_pct');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const popularFamilies = [
    'Todas',
    'Sicilian',
    'French',
    "Queen's",
    "King's",
    'Scandinavian',
    'Caro-Kann',
    'Philidor',
  ];

  // Filtra por texto e por família rápida
  const filtered = useMemo(() => {
    return (openings || []).filter((op) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        op.name.toLowerCase().includes(term) ||
        op.eco.toLowerCase().includes(term) ||
        op.family.toLowerCase().includes(term);

      const matchesFamily =
        selectedFamily === 'Todas' ||
        op.family.toLowerCase().includes(selectedFamily.toLowerCase()) ||
        op.name.toLowerCase().includes(selectedFamily.toLowerCase());

      return matchesSearch && matchesFamily;
    });
  }, [openings, searchTerm, selectedFamily]);

  // Ordena os resultados
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const modifier = sortDesc ? -1 : 1;
      if (sortBy === 'name' || sortBy === 'eco') {
        return modifier * a[sortBy].localeCompare(b[sortBy]);
      }
      return modifier * (a[sortBy] - b[sortBy]);
    });
  }, [filtered, sortBy, sortDesc]);

  // Paginação
  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const pageItems = sorted.slice(startIndex, startIndex + pageSize);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(field);
      setSortDesc(true);
    }
    setCurrentPage(1);
  };

  const renderSortIndicator = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="w-3 h-3 opacity-40 ml-1 inline-block" />;
    }
    return sortDesc ? (
      <ArrowDown className="w-3 h-3 text-amber-400 ml-1 inline-block" />
    ) : (
      <ArrowUp className="w-3 h-3 text-amber-400 ml-1 inline-block" />
    );
  };

  // Exportar dados filtrados para CSV
  const handleExportCsv = () => {
    if (sorted.length === 0) return;
    const headers = [
      'Abertura',
      'Família',
      'ECO',
      'Total_Partidas',
      'Vitórias_Brancas',
      'Vitórias_Pretas',
      'Empates',
      'Pct_Brancas',
      'Pct_Pretas',
      'Pct_Empates',
      'Media_Turnos',
    ];

    const rows = sorted.map((op) => [
      `"${op.name.replace(/"/g, '""')}"`,
      `"${op.family.replace(/"/g, '""')}"`,
      op.eco,
      op.total_games,
      op.white_wins,
      op.black_wins,
      op.draws,
      op.white_win_pct,
      op.black_win_pct,
      op.draw_pct,
      op.avg_turns,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aberturas_chess_bi_${selectedFamily.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-gray-800 shadow-xl">
      {/* Table Header: Title, Controls, Export */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-800/80">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Tabela Analítica de Aberturas</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {totalItems} de {openings?.length || 0} aberturas
              </span>
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Explore taxas de vitória, códigos ECO e duração de cada abertura (mínimo de 40 partidas)
          </p>
        </div>

        {/* Right side: Search and CSV Export */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar abertura ou ECO..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 bg-gray-900/80 border border-gray-700/60 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 transition"
            />
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCsv}
            className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700/80 text-gray-200 hover:text-white border border-gray-700 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0"
            title="Exportar dados filtrados da tabela para arquivo CSV"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Quick Family Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-3 text-xs scrollbar-none">
        <span className="text-[11px] font-semibold text-gray-400 shrink-0 flex items-center space-x-1 mr-1">
          <Filter className="w-3 h-3 text-amber-400" />
          <span>Famílias:</span>
        </span>
        {popularFamilies.map((fam) => {
          const isSelected = selectedFamily === fam;
          return (
            <button
              key={fam}
              onClick={() => {
                setSelectedFamily(fam);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-amber-500 text-gray-950 font-bold shadow-sm'
                  : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800 hover:text-white border border-gray-800'
              }`}
            >
              {fam}
            </button>
          );
        })}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-gray-800/80">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-900/90 text-gray-400 uppercase font-semibold text-[11px] border-b border-gray-800">
              <th className="py-3 px-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-white cursor-pointer"
                >
                  <span>Abertura / Família</span>
                  {renderSortIndicator('name')}
                </button>
              </th>
              <th className="py-3 px-3">
                <button
                  onClick={() => handleSort('eco')}
                  className="flex items-center space-x-1 hover:text-white cursor-pointer"
                >
                  <span>ECO</span>
                  {renderSortIndicator('eco')}
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  onClick={() => handleSort('total_games')}
                  className="flex items-center space-x-1 ml-auto hover:text-white cursor-pointer"
                >
                  <span>Partidas</span>
                  {renderSortIndicator('total_games')}
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  onClick={() => handleSort('white_win_pct')}
                  className="flex items-center space-x-1 ml-auto text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <span>% Vit. Brancas</span>
                  {renderSortIndicator('white_win_pct')}
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  onClick={() => handleSort('black_win_pct')}
                  className="flex items-center space-x-1 ml-auto hover:text-white cursor-pointer"
                >
                  <span>% Vit. Pretas</span>
                  {renderSortIndicator('black_win_pct')}
                </button>
              </th>
              <th className="py-3 px-3 text-center min-w-[130px]">
                <span>Distribuição (B / E / P)</span>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  onClick={() => handleSort('avg_turns')}
                  className="flex items-center space-x-1 ml-auto hover:text-white cursor-pointer"
                >
                  <span>Média Turnos</span>
                  {renderSortIndicator('avg_turns')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 bg-gray-950/40">
            {pageItems.length > 0 ? (
              pageItems.map((op, idx) => (
                <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                  <td className="py-2.5 px-4">
                    <div className="font-semibold text-white flex items-center space-x-1.5">
                      <span>{op.name}</span>
                      {op.white_win_pct >= 65 && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold shrink-0">
                          Top
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-500">{op.family}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-1.5 py-0.5 rounded bg-gray-900 text-gray-300 font-mono text-[10px] border border-gray-700">
                      {op.eco}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-medium text-gray-300">
                    {op.total_games.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-extrabold text-amber-400">
                    {op.white_win_pct}%
                  </td>
                  <td className="py-2.5 px-3 text-right text-gray-400">
                    {op.black_win_pct}%
                  </td>
                  {/* Mini Tripartite Bar */}
                  <td className="py-2.5 px-3">
                    <div className="w-full h-2 rounded bg-gray-900 overflow-hidden flex shadow-inner">
                      <div
                        className="bg-amber-400 h-full"
                        style={{ width: `${op.white_win_pct}%` }}
                        title={`Brancas: ${op.white_win_pct}%`}
                      />
                      <div
                        className="bg-slate-400 h-full"
                        style={{ width: `${op.draw_pct}%` }}
                        title={`Empate: ${op.draw_pct}%`}
                      />
                      <div
                        className="bg-gray-700 h-full"
                        style={{ width: `${op.black_win_pct}%` }}
                        title={`Pretas: ${op.black_win_pct}%`}
                      />
                    </div>
                    <div className="flex justify-between text-[8px] text-gray-500 mt-0.5 px-0.5 font-mono">
                      <span>{op.white_win_pct}%</span>
                      <span>{op.draw_pct}%</span>
                      <span>{op.black_win_pct}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 text-right text-emerald-400 font-medium">
                    {op.avg_turns}t
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500 text-xs">
                  Nenhuma abertura encontrada correspondente aos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-800/80 text-xs text-gray-400">
        <div className="flex items-center space-x-3">
          <span>
            Mostrando <strong>{totalItems > 0 ? startIndex + 1 : 0}</strong> a{' '}
            <strong>{Math.min(startIndex + pageSize, totalItems)}</strong> de{' '}
            <strong>{totalItems}</strong> aberturas
          </span>

          {/* Page Size Selector */}
          <div className="flex items-center space-x-1.5 text-xs text-gray-400">
            <span>Linhas:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1 text-xs text-gray-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={validCurrentPage <= 1}
            className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
            title="Página Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-2.5 py-1 rounded-lg bg-gray-900 text-xs font-semibold text-amber-400 border border-gray-800">
            {validCurrentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={validCurrentPage >= totalPages}
            className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
            title="Próxima Página"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
