'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function OutcomesChart({ statusByTier }) {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !statusByTier || statusByTier.length === 0) return;

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
            backgroundColor: 'rgba(239, 68, 68, 0.85)', // Vermelho
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: 'Abandono (Resign)',
            data: resignPcts,
            backgroundColor: 'rgba(245, 158, 11, 0.85)', // Âmbar
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: 'Tempo Esgotado',
            data: timePcts,
            backgroundColor: 'rgba(59, 130, 246, 0.85)', // Azul
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: 'Empate',
            data: drawPcts,
            backgroundColor: 'rgba(148, 163, 184, 0.85)', // Cinza
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
            borderColor: 'rgba(255, 255, 255, 0.1)',
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
            ticks: {
              color: '#e2e8f0',
              font: { size: 11, weight: '500' },
            },
            grid: {
              display: false,
            },
          },
          y: {
            stacked: true,
            min: 0,
            max: 100,
            ticks: {
              callback: (val) => `${val}%`,
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
  }, [statusByTier]);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-gray-800 flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-white">Objetivo 3: Forma de Finalização por Faixa de Habilidade</h3>
            <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 font-semibold">
              Mate vs Resign
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Iniciantes sofrem 41% de Mate; Mestres sofrem apenas 13.7% e abandonam em 68.2%
          </p>
        </div>
      </div>
      <div className="flex-1 min-h-0 relative">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
