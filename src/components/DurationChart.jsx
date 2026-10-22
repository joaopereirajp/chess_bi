'use client';

import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Clock, TrendingUp, Sparkles, Award } from 'lucide-react';

export default function DurationChart({ turnsByTier, theme = 'dark' }) {
  const [metricUnit, setMetricUnit] = useState('turns'); // 'turns' | 'minutes'
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !turnsByTier || turnsByTier.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = turnsByTier.map((t) => t.tier.split(' ')[0]);
    const fullLabels = turnsByTier.map((t) => t.tier);

    // Valores para 'turns' ou 'minutes'
    const dataValues = turnsByTier.map((t) =>
      metricUnit === 'turns' ? t.avg_turns : Math.round(t.avg_turns * 0.45)
    );

    const medianValues = turnsByTier.map((t) =>
      metricUnit === 'turns' ? t.median_turns : Math.round(t.median_turns * 0.45)
    );

    const unitSuffix = metricUnit === 'turns' ? ' turnos' : ' min';

    const ctx = canvasRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: metricUnit === 'turns' ? 'Média de Turnos' : 'Tempo Estimado (min)',
            data: dataValues,
            backgroundColor: [
              'rgba(148, 163, 184, 0.75)', // Iniciante - Slate
              'rgba(59, 130, 246, 0.8)',   // Intermediário - Azul
              'rgba(16, 185, 129, 0.85)',  // Avançado - Esmeralda
              'rgba(245, 158, 11, 0.9)',   // Mestre - Âmbar Dourado
            ],
            borderColor: [
              'rgba(148, 163, 184, 1)',
              'rgba(59, 130, 246, 1)',
              'rgba(16, 185, 129, 1)',
              'rgba(245, 158, 11, 1)',
            ],
            borderWidth: 1.5,
            borderRadius: 8,
            order: 2,
          },
          {
            label: 'Tendência Linear',
            data: dataValues,
            type: 'line',
            borderColor: 'rgba(251, 191, 36, 0.95)',
            borderWidth: 2.5,
            pointBackgroundColor: '#fbbf24',
            pointBorderColor: theme === 'dark' ? '#0b0f17' : '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: false,
            tension: 0.35,
            order: 1,
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
            align: 'end',
            labels: {
              color: theme === 'dark' ? '#94a3b8' : '#0f172a',
              font: { size: 11, weight: 'bold' },
              boxWidth: 12,
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#f8fafc',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(245, 158, 11, 0.3)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              title: (items) => fullLabels[items[0].dataIndex],
              label: (item) => {
                const d = turnsByTier[item.dataIndex];
                if (item.dataset.type === 'line') {
                  return `Tendência: ${item.raw}${unitSuffix}`;
                }
                const estMin = Math.round(d.avg_turns * 0.45);
                return [
                  `Média: ${d.avg_turns} turnos (~${estMin} min)`,
                  `Mediana: ${d.median_turns} turnos`,
                  `Volume: ${d.count.toLocaleString('pt-BR')} partidas`,
                  `Variação: de ${d.min_turns} a ${d.max_turns} turnos`,
                ];
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: theme === 'dark' ? '#e2e8f0' : '#0f172a',
              font: { size: 11, weight: '700' },
            },
            grid: { display: false },
          },
          y: {
            min: metricUnit === 'turns' ? 30 : 15,
            max: metricUnit === 'turns' ? 85 : 40,
            ticks: {
              callback: (val) => `${val}${metricUnit === 'turns' ? ' t' : 'm'}`,
              color: theme === 'dark' ? '#94a3b8' : '#1e293b',
              font: { size: 10, weight: '600' },
            },
            grid: {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)',
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [turnsByTier, metricUnit, theme]);

  return (
    <div className="glass-panel rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-gray-800 flex flex-col h-[460px] shadow-sm dark:shadow-xl">
      {/* Top Header of Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-gray-800/80 mb-3">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white tracking-tight">
              Objetivo 2: Duração Média vs. Nível de Habilidade
            </h3>
            <span className="text-[10px] bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
              +35.2%
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-gray-400 font-medium mt-0.5">
            Turnos médios e tempo de jogo crescem conforme o rating aumenta
          </p>
        </div>

        {/* Toggle Unit Button */}
        <div className="flex items-center bg-slate-100 dark:bg-gray-900/80 rounded-xl p-1 border border-slate-200 dark:border-gray-800 self-start sm:self-auto">
          <button
            onClick={() => setMetricUnit('turns')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              metricUnit === 'turns'
                ? 'bg-emerald-500 text-gray-950 shadow-sm'
                : 'text-slate-800 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            Turnos
          </button>
          <button
            onClick={() => setMetricUnit('minutes')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              metricUnit === 'minutes'
                ? 'bg-emerald-500 text-gray-950 shadow-sm'
                : 'text-slate-800 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            Minutos (~Tempo)
          </button>
        </div>
      </div>

      {/* 4 Quick Stat Comparison Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
        {turnsByTier.map((t, idx) => {
          const estMin = Math.round(t.avg_turns * 0.45);
          const isMaster = idx === 3;
          return (
            <div
              key={idx}
              className={`p-2 rounded-xl text-center border transition-all ${
                isMaster
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-300'
                  : 'bg-slate-50 dark:bg-gray-900/60 border-slate-200 dark:border-gray-800 text-slate-800 dark:text-gray-300'
              }`}
            >
              <div className="text-[10px] text-slate-700 dark:text-gray-400 font-bold truncate">
                {t.tier.split(' ')[0]}
              </div>
              <div className="text-sm font-black text-slate-950 dark:text-white mt-0.5">
                {metricUnit === 'turns' ? `${t.avg_turns}t` : `${estMin}m`}
              </div>
              <div className="text-[9px] text-slate-600 dark:text-gray-500 font-semibold mt-0.5">
                Mediana: {t.median_turns}t
              </div>
            </div>
          );
        })}
      </div>

      {/* Canvas Area */}
      <div className="flex-1 min-h-0 relative">
        <canvas ref={canvasRef} />
      </div>

      {/* Analytical Insight Footer Banner */}
      <div className="mt-2.5 p-2 rounded-xl bg-slate-50 dark:bg-gray-900/60 border border-slate-200 dark:border-gray-800/80 text-[11px] text-slate-800 dark:text-gray-400 flex items-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
        <span className="truncate">
          <strong className="text-slate-950 dark:text-white">Insight:</strong> Iniciantes encerram em ~52 turnos (erros precoces); Mestres sustentam finais técnicos até ~71 turnos (+35%).
        </span>
      </div>
    </div>
  );
}
