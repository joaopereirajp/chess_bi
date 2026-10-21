'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function OpeningsChart({ openingsData }) {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !openingsData || openingsData.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = openingsData.map((d) => {
      // Abrevia nomes muito longos se necessário
      return d.name.length > 32 ? d.name.substring(0, 30) + '...' : d.name;
    });
    const winRates = openingsData.map((d) => d.white_win_pct);

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
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#f8fafc',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(245, 158, 11, 0.3)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              title: function (items) {
                const idx = items[0].dataIndex;
                return openingsData[idx].name;
              },
              label: function (item) {
                const d = openingsData[item.dataIndex];
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
              color: '#94a3b8',
              font: { size: 11 },
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.06)',
            },
          },
          y: {
            ticks: {
              color: '#e2e8f0',
              font: { size: 11, weight: '500' },
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [openingsData]);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-gray-800 flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-bold text-white">Objetivo 1: Aberturas Mais Bem-Sucedidas (Brancas)</h3>
            <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">
              Win Rate %
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Aberturas com maior rendimento quando se joga de Brancas
          </p>
        </div>
      </div>
      <div className="flex-1 min-h-0 relative">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
