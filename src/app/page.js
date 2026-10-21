'use client';

import { useState, useMemo } from 'react';
import dashboardData from '@/data/dashboard_data.json';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import KpiCards from '@/components/KpiCards';
import OpeningsChart from '@/components/OpeningsChart';
import DurationChart from '@/components/DurationChart';
import OutcomesChart from '@/components/OutcomesChart';
import OpeningsTable from '@/components/OpeningsTable';
import ConclusionsTab from '@/components/ConclusionsTab';
import { Download, FileText, Image as ImageIcon, ExternalLink, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('geral');
  const [selectedTier, setSelectedTier] = useState('Todos');

  const tiersList = [
    'Iniciante (<1400)',
    'Intermediário (1400-1800)',
    'Avançado (1800-2100)',
    'Mestre/Especialista (2100+)',
  ];

  const countsByTier = useMemo(() => {
    const counts = {};
    for (const t of tiersList) {
      counts[t] = dashboardData.by_tier[t]?.count || 0;
    }
    return counts;
  }, []);

  // KPIs dinâmicos baseados no filtro selecionado
  const currentKpis = useMemo(() => {
    if (selectedTier === 'Todos') {
      return dashboardData.kpis;
    }
    const tierData = dashboardData.by_tier[selectedTier];
    if (!tierData) return dashboardData.kpis;

    return {
      total_games: tierData.count,
      white_win_pct: tierData.white_win_pct,
      black_win_pct: tierData.black_win_pct,
      draw_pct: tierData.draw_pct,
      avg_turns: tierData.avg_turns,
      avg_rating: tierData.avg_rating,
    };
  }, [selectedTier]);

  // Aberturas dinâmicas para o Gráfico 1 baseadas no filtro
  const currentOpenings = useMemo(() => {
    if (selectedTier === 'Todos') {
      return dashboardData.top_white_openings;
    }
    const tierOpenings = dashboardData.by_tier[selectedTier]?.top_white_openings;
    if (tierOpenings && tierOpenings.length > 0) {
      return tierOpenings;
    }
    return dashboardData.top_white_openings;
  }, [selectedTier]);

  return (
    <div className="min-h-screen bg-[#0b0f17] flex flex-col">
      <Navbar onSelectTab={setActiveTab} activeTab={activeTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro banner */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3 h-3" />
                <span>Base 100% Real • 20.058 Jogos</span>
              </span>
              <span className="text-xs text-gray-500">Lichess Open Dataset</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Painel Estratégico de Business Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-3xl">
              Análise interativa dos fatores determinantes para a vitória no xadrez: aberturas, tempo de jogo e impacto da proficiência dos enxadristas.
            </p>
          </div>

          {/* Deliverables pill links */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/games_tratada.csv"
              download
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-gray-800 text-gray-200 hover:text-white hover:bg-gray-700 border border-gray-700/60 transition shadow-sm"
              title="Baixar Base de Dados Tratada (Entrega 2)"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>CSV Tratado</span>
            </a>
            <button
              onClick={() => setActiveTab('conclusoes')}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Conclusões</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Visão Geral do Dashboard */}
        {activeTab === 'geral' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <FilterBar
              selectedTier={selectedTier}
              onSelectTier={setSelectedTier}
              tiersList={tiersList}
              countsByTier={countsByTier}
            />

            {/* KPI Cards */}
            <KpiCards kpis={currentKpis} filterLabel={selectedTier} />

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico 1: Aberturas mais bem-sucedidas */}
              <OpeningsChart openingsData={currentOpenings} />

              {/* Gráfico 2: Duração por rating */}
              <DurationChart turnsByTier={dashboardData.turns_by_tier} />
            </div>

            {/* Gráfico 3: Desfecho por Nível (100% Stacked) */}
            <div className="grid grid-cols-1 gap-6">
              <OutcomesChart statusByTier={dashboardData.status_by_tier} />
            </div>

            {/* Tabela de Aberturas */}
            <OpeningsTable openings={dashboardData.all_qualified_openings} />
          </div>
        )}

        {/* Tab 2: Tabela de Aberturas Exclusiva */}
        {activeTab === 'aberturas' && (
          <div className="space-y-6">
            <OpeningsTable openings={dashboardData.all_qualified_openings} />
          </div>
        )}

        {/* Tab 3: Conclusões Formais */}
        {activeTab === 'conclusoes' && <ConclusionsTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 bg-gray-950/60 py-6 mt-12 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-300">Projeto Integrador — Segunda Etapa</span>
            <span>•</span>
            <span>Dashboard de Business Intelligence</span>
          </div>
          <div className="flex items-center space-x-4 text-gray-400">
            <span>20.058 Partidas Analisadas</span>
            <span>•</span>
            <span>Lichess Kaggle Dataset</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
