'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function DurationChart({ turnsByTier }) {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !turnsByTier || turnsByTier.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = turnsByTier.map((t) => t.tier.split(' ')[0]); // 'Iniciante', 'Intermediário', etc.
    const fullLabels = turnsByTier.map((t) => t.tier);
    const avgTurns = turnsByTier.map((t) => t.avg_turns);
    const medianTurns = turnsByTier.map((t) => t.median_turns);

    const ctx = canvasRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Média de Turnos',
            data: avgTurns,
            backgroundColor: [
              'rgba(148, 163, 184, 0.7)',  // Iniciante - cinza azulado
              'rgba(59, 130, 246, 0.75)',  // Intermediário - azul
              'rgba(16, 185, 129, 0.8)',   // Avançado - verde esmeralda
              'rgba(245, 158, 11, 0.9)',   // Mestre - dourado âmbar
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
            label: 'Linha de Tendência',
            data: avgTurns,
            type: 'line',
            borderColor: 'rgba(251, 191, 36, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: '#fbbf24',
            pointBorderColor: '#0f172a',
            pointBorderWidth: 2,
            pointRadius: 5,
            fill: false,
            tension: 0.3,
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
            labels: {
              color: '#94a3b8',
              font: { size: 11 },
              boxWidth: 12,
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
                  return `Tendência: ${d.avg_turns} turnos`;
                }
                return [
                  `Média: ${d.avg_turns} turnos`,
                  `Mediana: ${d.median_turns} turnos`,
                  `Volume: ${d.count.toLocaleString()} partidas`,
                  `Variação: ${d.min_turns} a ${d.max_turns} turnos`,
                ];
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#e2e8f0',
              font: { size: 11, weight: '500' },
            },
            grid: {
              display: false,
            },
          },
          y: {
            min: 30,
            max: 85,
            ticks: {
              callback: (val) => `${val} t`,
              color: '#94a3b8',
              font: { size: 11 },
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.06)',
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [turnsByTier]);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-gray-800 flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-white">Objetivo 2: Duração Média vs. Nível de Habilidade</h3>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
              +35% em Mestres
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Turnos médios crescem de 52.9 (iniciantes) para 71.5 (mestres)
          </p>
        </div>
      </div>
      <div className="flex-1 min-h-0 relative">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
