'use client';

import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ShieldAlert, Swords, BarChart2, LayoutList, Sparkles, AlertCircle } from 'lucide-react';

export default function OutcomesChart({ statusByTier, theme = 'dark' }) {
  const [viewMode, setViewMode] = useState('bars'); // 'bars' | 'chart'
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  const isDark = theme === 'dark';

  useEffect(() => {
    if (viewMode !== 'chart' || !canvasRef.current || !statusByTier || statusByTier.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = statusByTier.map((s) => s.tier.split(' ')[0]);
    const matePcts = statusByTier.map((s) => s.mate_pct);
    const resignPcts = statusByTier.map((s) => s.resign_pct);
    const timePcts = statusByTier.map((s) => s.outoftime_pct);
    const drawPcts = statusByTier.map((s) => s.draw_pct);

    const ctx = canvasRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Xeque-Mate',
            data: matePcts,
            backgroundColor: 'rgba(239, 68, 68, 0.85)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: 'Abandono (Resign)',
            data: resignPcts,
            backgroundColor: 'rgba(245, 158, 11, 0.85)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: 'Tempo Esgotado',
            data: timePcts,
            backgroundColor: 'rgba(59, 130, 246, 0.85)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: 'Empate',
            data: drawPcts,
            backgroundColor: 'rgba(148, 163, 184, 0.85)',
            borderColor: 'rgba(148, 163, 184, 1)',
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { color: isDark ? '#94a3b8' : '#0f172a', font: { size: 11, weight: 'bold' }, boxWidth: 12 },
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#f8fafc',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(245, 158, 11, 0.3)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (item) => `${item.dataset.label}: ${item.raw}%`,
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: { color: isDark ? '#e2e8f0' : '#0f172a', font: { size: 11, weight: '700' } },
            grid: { display: false },
          },
          y: {
            stacked: true,
            min: 0,
            max: 100,
            ticks: {
              callback: (val) => `${val}%`,
              color: isDark ? '#94a3b8' : '#1e293b',
              font: { size: 10, weight: '600' },
            },
            grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)' },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [statusByTier, viewMode, theme, isDark]);

  return (
    <div className="glass-panel rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-gray-800 shadow-sm dark:shadow-xl flex flex-col">
      {/* Top Header of Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-gray-800/80 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white tracking-tight">
              Objetivo 3: Forma de Finalização por Faixa de Habilidade
            </h3>
            <span className="text-[10px] bg-red-500/15 text-red-800 dark:text-red-300 px-2 py-0.5 rounded border border-red-500/30 font-bold">
              Mate vs Resign
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-gray-400 font-medium mt-0.5">
            Comportamento de término: iniciantes tomam mate físico; mestres desistem antes por estratégia
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-slate-100 dark:bg-gray-900/80 rounded-xl p-1 border border-slate-200 dark:border-gray-800 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('bars')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 text-xs font-bold ${
              viewMode === 'bars'
                ? 'bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/40 shadow-xs'
                : 'text-slate-800 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span>Barras Analíticas</span>
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 text-xs font-bold ${
              viewMode === 'chart'
                ? 'bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/40 shadow-xs'
                : 'text-slate-800 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Gráfico Empilhado</span>
          </button>
        </div>
      </div>

      {/* 2 Spotlight Cards: Contrast between Beginners and Masters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {/* Beginner Spotlight */}
        <div className="p-3.5 rounded-xl bg-red-50/90 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 flex items-center justify-between shadow-xs">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400" />
              <span className="text-xs font-black text-red-900 dark:text-red-300">Iniciantes (&lt; 1400 Elo)</span>
            </div>
            <div className="text-lg font-black text-slate-950 dark:text-white mt-1">
              41.0% <span className="text-xs font-bold text-red-700 dark:text-red-400">em Xeque-Mate</span>
            </div>
            <div className="text-[11px] text-slate-700 dark:text-gray-400 font-medium">
              Jogam até a última peça e captura física do rei (1.985 mates)
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-700 dark:text-gray-400">Abandono:</span>
            <div className="text-sm font-black text-amber-800 dark:text-amber-400">47.6%</div>
          </div>
        </div>

        {/* Master Spotlight */}
        <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 flex items-center justify-between shadow-xs">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400" />
              <span className="text-xs font-black text-amber-950 dark:text-amber-300">Mestres (2100+ Elo)</span>
            </div>
            <div className="text-lg font-black text-slate-950 dark:text-white mt-1">
              68.2% <span className="text-xs font-bold text-amber-800 dark:text-amber-400">em Abandono (Resign)</span>
            </div>
            <div className="text-[11px] text-slate-700 dark:text-gray-400 font-medium">
              Apenas 13.7% sofrem mate; empates sobem para 8.8%
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-700 dark:text-gray-400">Xeque-Mate:</span>
            <div className="text-sm font-black text-red-700 dark:text-red-400">13.7%</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-800 dark:text-gray-400 mb-3 px-1">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-sm bg-red-500 inline-block" />
          <span className="text-slate-950 dark:text-gray-200 font-bold">Xeque-Mate</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" />
          <span className="text-slate-950 dark:text-gray-200 font-bold">Abandono (Resign)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
          <span className="text-slate-950 dark:text-gray-200 font-bold">Tempo Esgotado</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-sm bg-slate-400 inline-block" />
          <span className="text-slate-950 dark:text-gray-200 font-bold">Empate</span>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'bars' ? (
        <div className="space-y-3.5">
          {statusByTier.map((tierData, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/80 hover:border-slate-300 dark:hover:border-gray-700 hover:bg-slate-100/80 transition"
            >
              {/* Row title with count */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-black text-slate-950 dark:text-white tracking-tight">
                  {tierData.tier}
                </span>
                <span className="text-[11px] text-slate-700 dark:text-gray-400 font-bold">
                  {tierData.count.toLocaleString('pt-BR')} partidas
                </span>
              </div>

              {/* Segmented 100% Horizontal Bar */}
              <div className="w-full h-5 rounded-lg overflow-hidden flex bg-slate-200 dark:bg-gray-950 shadow-inner">
                {/* Xeque-Mate */}
                <div
                  className="bg-red-500 hover:bg-red-400 transition-all flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ width: `${tierData.mate_pct}%` }}
                  title={`Xeque-Mate: ${tierData.mate_pct}% (${tierData.mate_count} jogos)`}
                >
                  {tierData.mate_pct >= 15 ? `${tierData.mate_pct}%` : ''}
                </div>

                {/* Abandono */}
                <div
                  className="bg-amber-500 hover:bg-amber-400 transition-all flex items-center justify-center text-[10px] font-bold text-gray-950"
                  style={{ width: `${tierData.resign_pct}%` }}
                  title={`Abandono: ${tierData.resign_pct}% (${tierData.resign_count} jogos)`}
                >
                  {tierData.resign_pct >= 15 ? `${tierData.resign_pct}%` : ''}
                </div>

                {/* Tempo */}
                <div
                  className="bg-blue-500 hover:bg-blue-400 transition-all flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ width: `${tierData.outoftime_pct}%` }}
                  title={`Tempo Esgotado: ${tierData.outoftime_pct}% (${tierData.outoftime_count} jogos)`}
                >
                  {tierData.outoftime_pct >= 7 ? `${tierData.outoftime_pct}%` : ''}
                </div>

                {/* Empate */}
                <div
                  className="bg-slate-400 hover:bg-slate-300 transition-all flex items-center justify-center text-[10px] font-bold text-gray-950"
                  style={{ width: `${tierData.draw_pct}%` }}
                  title={`Empate: ${tierData.draw_pct}% (${tierData.draw_count} jogos)`}
                >
                  {tierData.draw_pct >= 6 ? `${tierData.draw_pct}%` : ''}
                </div>
              </div>

              {/* Precise percentage label row */}
              <div className="flex items-center justify-between text-[10px] mt-1.5 text-slate-700 dark:text-gray-400">
                <span className="text-red-700 dark:text-red-400 font-bold">
                  Mate: {tierData.mate_pct}%
                </span>
                <span className="text-amber-800 dark:text-amber-400 font-bold">
                  Abandono: {tierData.resign_pct}%
                </span>
                <span className="text-blue-700 dark:text-blue-400 font-bold">
                  Tempo: {tierData.outoftime_pct}%
                </span>
                <span className="text-slate-800 dark:text-slate-300 font-bold">
                  Empate: {tierData.draw_pct}%
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[280px] relative">
          <canvas ref={canvasRef} />
        </div>
      )}

      {/* Psychological Insight Footer Banner */}
      <div className="mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-gray-900/60 border border-slate-200 dark:border-gray-800/80 text-[11px] text-slate-800 dark:text-gray-400 flex items-center space-x-2">
        <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <span className="leading-relaxed">
          <strong className="text-slate-950 dark:text-white">Cultura Enxadrística:</strong> Mestres antecipam perdas materiais graves e abandonam em <strong className="text-slate-950 dark:text-white">68.2%</strong> das vezes como sinal de respeito mútuo. Já iniciantes levam o jogo até o mate físico no tabuleiro (<strong className="text-slate-950 dark:text-white">41.0%</strong>).
        </span>
      </div>
    </div>
  );
}
