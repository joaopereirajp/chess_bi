'use client';

import { useState, useMemo, useEffect } from 'react';
import dashboardData from '@/data/dashboard_data.json';
import Navbar from '@/components/Navbar';
import FilterBar from '@/components/FilterBar';
import KpiCards from '@/components/KpiCards';
import OpeningsChart from '@/components/OpeningsChart';
import DurationChart from '@/components/DurationChart';
import OutcomesChart from '@/components/OutcomesChart';
import OpeningsTable from '@/components/OpeningsTable';
import ConclusionsTab from '@/components/ConclusionsTab';
import CreditsTab from '@/components/CreditsTab';
import { Download, FileText, Image as ImageIcon, ExternalLink, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('geral');
  const [selectedTier, setSelectedTier] = useState('Todos');
  const [theme, setTheme] = useState('dark');

  // Inicializar tema do localStorage (padrão: dark)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('chess_bi_theme') || 'dark';
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('chess_bi_theme', nextTheme);
      if (nextTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    }
  };

  // Ler ?tab= da URL se presente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && ['geral', 'conclusoes', 'creditos'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabId);
      window.history.replaceState(null, '', url.toString());
    }
  };

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
    <div className="min-h-screen bg-slate-100 dark:bg-[#0b0f17] text-slate-900 dark:text-gray-100 flex flex-col transition-colors duration-200">
      <Navbar
        onSelectTab={handleTabChange}
        activeTab={activeTab}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Intro banner */}
        {activeTab !== 'creditos' && (
          <div className="mb-4 sm:mb-6 pb-1 sm:pb-2">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://www.kaggle.com/datasets/datasnaek/chess"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 dark:hover:bg-emerald-500/20 transition cursor-pointer shadow-xs"
                title="Abrir base original no Kaggle (Chess Game Dataset)"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Base 100% Real • Lichess no Kaggle</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </a>
              <span className="text-xs font-semibold text-slate-700 dark:text-gray-400">20.058 Jogos Analisados</span>
            </div>
            <h2 className="text-2xl sm:text-3.5xl font-black text-slate-950 dark:text-white tracking-tight mt-2.5">
              Painel Estratégico de Business Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 mt-1 max-w-3xl leading-relaxed font-medium">
              Análise interativa dos fatores determinantes para a vitória no xadrez: eficácia das aberturas, tempo de jogo e impacto da proficiência dos enxadristas.
            </p>
          </div>
        )}

        {/* Tab 1: Visão Geral do Dashboard */}
        {activeTab === 'geral' && (
          <div className="space-y-4 sm:space-y-6">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Gráfico 1: Aberturas mais bem-sucedidas */}
              <OpeningsChart
                openingsData={currentOpenings}
                mostPlayedData={dashboardData.most_played_openings}
                theme={theme}
              />

              {/* Gráfico 2: Duração por rating */}
              <DurationChart turnsByTier={dashboardData.turns_by_tier} theme={theme} />
            </div>

            {/* Gráfico 3: Desfecho por Nível (100% Stacked) */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <OutcomesChart statusByTier={dashboardData.status_by_tier} theme={theme} />
            </div>

            {/* Tabela de Aberturas */}
            <OpeningsTable openings={dashboardData.all_qualified_openings} theme={theme} />
          </div>
        )}

        {/* Tab 2: Conclusões Formais */}
        {activeTab === 'conclusoes' && <ConclusionsTab />}

        {/* Tab 3: Créditos & Equipe (Grupo 32) */}
        {activeTab === 'creditos' && <CreditsTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-gray-800/80 bg-white/70 dark:bg-gray-950/60 py-6 mt-12 text-center text-xs text-slate-500 dark:text-gray-500 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700 dark:text-gray-300">Projeto Integrador — Segunda Etapa</span>
            <span>•</span>
            <span>Dashboard de Business Intelligence</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-500 dark:text-gray-400">
            <span>20.058 Partidas Analisadas</span>
            <span>•</span>
            <a
              href="https://www.kaggle.com/datasets/datasnaek/chess"
              target="_blank"
              rel="noreferrer"
              className="text-slate-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition cursor-pointer underline underline-offset-4 flex items-center space-x-1"
            >
              <span>Lichess Dataset (Kaggle)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
