'use client';

import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Trophy, Flame, BarChart2, LayoutList, Info } from 'lucide-react';

export default function OpeningsChart({ openingsData, mostPlayedData, theme = 'dark' }) {
  const [metricMode, setMetricMode] = useState('winrate'); // 'winrate' | 'volume'
  const [viewMode, setViewMode] = useState('bars'); // 'bars' (tripartite) | 'chart' (chart.js)
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  const isDark = theme === 'dark';

  // Seleciona a lista de aberturas de acordo com o modo
  const activeList = metricMode === 'winrate' ? openingsData : (mostPlayedData || openingsData);
  const displayItems = (activeList || []).slice(0, 10);

  // Renderiza Chart.js quando o usuário está no modo 'chart'
  useEffect(() => {
    if (viewMode !== 'chart' || !canvasRef.current || displayItems.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = displayItems.map((d) =>
      d.name.length > 28 ? d.name.substring(0, 26) + '...' : d.name
    );
    const winRates = displayItems.map((d) => d.white_win_pct);

    const ctx = canvasRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '% Vitória Brancas',
            data: winRates,
            backgroundColor: 'rgba(245, 158, 11, 0.85)',
            hoverBackgroundColor: 'rgba(251, 191, 36, 1)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.96)',
            titleColor: '#ffffff',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(245, 158, 11, 0.4)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              title: (items) => displayItems[items[0].dataIndex].name,
              label: (item) => {
                const d = displayItems[item.dataIndex];
                return [
                  `Taxa de Vitória Brancas: ${d.white_win_pct}%`,
                  `Total de Partidas: ${d.total_games}`,
                  `Brancas: ${d.white_wins} | Pretas: ${d.black_wins} | Empates: ${d.draws}`,
                  `ECO: ${d.eco}`,
                ];
              },
            },
          },
        },
        scales: {
          x: {
            min: 0,
            max: 100,
            ticks: {
              callback: (val) => `${val}%`,
              color: isDark ? '#94a3b8' : '#0f172a',
              font: { size: 11, weight: '600' },
            },
            grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)' },
          },
          y: {
            ticks: { color: isDark ? '#e2e8f0' : '#0f172a', font: { size: 11, weight: '700' } },
            grid: { display: false },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [displayItems, viewMode, theme, isDark]);

  return (
    <div className="glass-panel rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-gray-800 flex flex-col h-[460px] shadow-sm dark:shadow-xl">
      {/* Top Header of Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-gray-800/80 mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/20 shadow-xs">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-950 dark:text-white tracking-tight">
              Objetivo 1: Aberturas Mais Bem-Sucedidas (Brancas)
            </h3>
          </div>
          <p className="text-xs text-slate-700 dark:text-gray-400 mt-0.5 font-medium">
            {metricMode === 'winrate'
              ? 'Classificação por maior taxa de vitória com as Brancas'
              : 'Classificação por volume total de partidas jogadas'}
          </p>
        </div>

        {/* Action Toggles: Metric and View Mode */}
        <div className="flex items-center space-x-2">
          {/* Metric Selector Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-gray-900/80 rounded-xl p-1 border border-slate-200 dark:border-gray-800 shadow-xs">
            <button
              onClick={() => setMetricMode('winrate')}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer flex items-center space-x-1 ${
                metricMode === 'winrate'
                  ? 'bg-amber-500 text-gray-950 font-bold shadow-xs'
                  : 'text-slate-800 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white font-semibold'
              }`}
              title="Classificar por maior percentual de vitória"
            >
              <span>% Vitórias</span>
            </button>
            <button
              onClick={() => setMetricMode('volume')}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer flex items-center space-x-1 ${
                metricMode === 'volume'
                  ? 'bg-amber-500 text-gray-950 font-bold shadow-xs'
                  : 'text-slate-800 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white font-semibold'
              }`}
              title="Classificar pelas mais jogadas"
            >
              <span>Mais Jogadas</span>
            </button>
          </div>

          {/* View Mode Toggle (Tripartite bars vs Chart.js) */}
          <div className="flex items-center bg-slate-100 dark:bg-gray-900/80 rounded-xl p-1 border border-slate-200 dark:border-gray-800 shadow-xs">
            <button
              onClick={() => setViewMode('bars')}
              className={`p-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'bars'
                  ? 'bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-500/40 font-bold'
                  : 'text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white'
              }`}
              title="Visualização em Barras Tripartidas (Estilo Lichess)"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`p-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-500/40 font-bold'
                  : 'text-slate-700 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white'
              }`}
              title="Visualização em Gráfico de Barras"
            >
              <BarChart2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tripartite Legend */}
      <div className="flex items-center justify-between text-[11px] text-slate-700 dark:text-gray-400 mb-2 px-1 font-semibold">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block shadow-xs" />
            <span className="text-slate-900 dark:text-gray-300 font-bold">Brancas Vencem</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-400 inline-block" />
            <span className="text-slate-700 dark:text-gray-400">Empate</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-700 dark:bg-gray-700 inline-block" />
            <span className="text-slate-700 dark:text-gray-400">Pretas Vencem</span>
          </div>
        </div>

        <span className="text-[10px] text-slate-600 dark:text-gray-500 hidden sm:inline font-bold">
          Top 10 Aberturas
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 relative">
        {viewMode === 'bars' ? (
          <div className="h-full overflow-y-auto pr-1.5 space-y-2.5">
            {displayItems.map((item, idx) => {
              // Medal icon for top 3
              const rankColor =
                idx === 0
                  ? 'bg-amber-400 text-gray-950 font-black shadow-xs'
                  : idx === 1
                  ? 'bg-slate-300 text-gray-950 font-black'
                  : idx === 2
                  ? 'bg-amber-700 text-white font-bold'
                  : 'bg-slate-200 dark:bg-gray-800 text-slate-800 dark:text-gray-400 font-bold';

              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/90 dark:bg-gray-900/50 dark:hover:bg-gray-800/60 border border-slate-200 dark:border-gray-800/80 hover:border-slate-300 dark:hover:border-gray-700 transition-all group shadow-2xs"
                >
                  {/* Top Line: Rank, Name, ECO, Total games */}
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <div className="flex items-center space-x-1.5 min-w-0 flex-1">
                      <span
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center text-[9px] sm:text-[10px] shrink-0 ${rankColor}`}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className="text-[11px] sm:text-xs font-bold text-slate-950 dark:text-white truncate group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors"
                        title={item.name}
                      >
                        {item.name}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono px-1 py-0.2 rounded bg-slate-200/90 dark:bg-gray-800 text-slate-900 dark:text-gray-400 border border-slate-300 dark:border-gray-700/60 font-bold shrink-0">
                        {item.eco}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0 text-[10px] sm:text-[11px]">
                      <span className="text-slate-700 dark:text-gray-400 font-bold">
                        {item.total_games.toLocaleString('pt-BR')}<span className="hidden sm:inline"> jogos</span>
                      </span>
                    </div>
                  </div>

                  {/* Tripartite Segmented Bar */}
                  <div className="w-full h-3 rounded-md bg-slate-200 dark:bg-gray-950 overflow-hidden flex shadow-inner">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-300"
                      style={{ width: `${item.white_win_pct}%` }}
                      title={`Brancas: ${item.white_win_pct}% (${item.white_wins} vitórias)`}
                    />
                    <div
                      className="bg-slate-400/80 h-full transition-all duration-300"
                      style={{ width: `${item.draw_pct}%` }}
                      title={`Empates: ${item.draw_pct}% (${item.draws} empates)`}
                    />
                    <div
                      className="bg-slate-700 dark:bg-gray-700 h-full transition-all duration-300"
                      style={{ width: `${item.black_win_pct}%` }}
                      title={`Pretas: ${item.black_win_pct}% (${item.black_wins} vitórias)`}
                    />
                  </div>

                  {/* Bottom Line: Direct percentage breakdown */}
                  <div className="flex items-center justify-between text-[10px] mt-1 text-slate-700 dark:text-gray-400 font-semibold">
                    <span className="text-amber-800 dark:text-amber-400 font-black">
                      {item.white_win_pct}% Brancas
                    </span>
                    <span className="text-slate-700 dark:text-slate-400">
                      {item.draw_pct}% Empate
                    </span>
                    <span className="text-slate-700 dark:text-gray-400">
                      {item.black_win_pct}% Pretas
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <canvas ref={canvasRef} />
        )}
      </div>
    </div>
  );
}
