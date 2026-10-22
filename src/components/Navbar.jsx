'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Image as ImageIcon,
  Download,
  Menu,
  X,
  Users,
  Sun,
  Moon,
} from 'lucide-react';

export default function Navbar({ onSelectTab, activeTab, theme = 'dark', onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Fechar menu mobile ao redimensionar para telas grandes ou pressionar ESC
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navTabs = [
    {
      id: 'geral',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'conclusoes',
      label: 'Insights & Conclusões',
      icon: BookOpen,
      badge: 'Oficial',
    },
    {
      id: 'creditos',
      label: 'Créditos',
      icon: Users,
      badge: 'Grupo 32',
    },
  ];

  const handleTabClick = (tabId) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-gray-800/80 bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-xl shadow-xs dark:shadow-2xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center space-x-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-md shadow-amber-500/20 text-white font-black text-xl border border-amber-400/30 select-none">
              ♟
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-black text-slate-950 dark:text-white tracking-tight">
                  Chess<span className="text-amber-600 dark:text-amber-400">BI</span>
                </span>
                <span className="hidden min-[360px]:inline-flex text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  Etapa 2
                </span>
              </div>
              <div className="hidden sm:flex items-center space-x-1.5 text-[11px] text-slate-700 dark:text-gray-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span>20.058 Jogos (Lichess)</span>
              </div>
            </div>
          </div>

          {/* Center: Desktop Segmented Navigation Tabs (visível >= 1024px) */}
          <nav className="hidden lg:flex items-center bg-slate-100 dark:bg-gray-950/80 p-1 rounded-xl border border-slate-200 dark:border-gray-800 shadow-inner">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-gray-950 shadow-sm'
                      : 'text-slate-800 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-900/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gray-950' : 'text-slate-600 dark:text-gray-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-black uppercase ${
                        isActive
                          ? 'bg-gray-950/20 text-gray-950'
                          : 'bg-slate-200 dark:bg-gray-800 text-slate-800 dark:text-gray-300 border border-slate-300 dark:border-gray-700/60'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Deliverables, Theme Switcher & Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Protótipo Link (Desktop e Tablet) */}
            <a
              href={`${basePath}/prototipo_dashboard.jpg`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-800 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white bg-white hover:bg-slate-50 dark:bg-gray-900/60 dark:hover:bg-gray-800 border border-slate-300 dark:border-gray-800 transition cursor-pointer shadow-xs"
              title="Visualizar Protótipo da Entrega 3"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden md:inline">Protótipo</span>
            </a>

            {/* Download Base CSV */}
            <a
              href={`${basePath}/chess_games.csv`}
              download="chess_games.csv"
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 dark:text-gray-200 hover:text-slate-950 dark:hover:text-white bg-white hover:bg-slate-50 dark:bg-gray-800/80 dark:hover:bg-gray-700/80 border border-slate-300 dark:border-gray-700 transition cursor-pointer shadow-xs"
              title="Baixar Base de Dados Unificada (chess_games.csv)"
            >
              <Download className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden md:inline">Baixar Base</span>
            </a>

            {/* Theme Toggle Button (Desktop & Mobile header) */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 sm:p-2 rounded-xl text-slate-800 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-300 dark:text-gray-300 dark:hover:text-white dark:bg-gray-900/60 dark:hover:bg-gray-800 dark:border-gray-800 transition-all cursor-pointer shadow-xs"
              title={theme === 'dark' ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
              aria-label="Alternar tema visual"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-800" />
              )}
            </button>

            {/* GitHub Repo */}
            <a
              href="https://github.com/joaopereirajp/chess_bi"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 dark:text-gray-400 dark:hover:text-white dark:bg-gray-900/60 dark:hover:bg-gray-800 border border-slate-300 dark:border-gray-800 transition cursor-pointer shadow-xs"
              title="Ver Repositório no GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-800 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white bg-white hover:bg-slate-50 dark:bg-gray-900/80 dark:hover:bg-gray-800 border border-slate-300 dark:border-gray-700/80 transition-all cursor-pointer shadow-xs"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
            >
              <div className={`transition-transform duration-200 ${mobileMenuOpen ? 'rotate-90 text-amber-500' : ''}`}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 top-16 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Painel do Menu Mobile */}
      <div
        className={`fixed top-16 left-0 right-0 z-50 lg:hidden border-b border-slate-200 dark:border-gray-800 bg-white/98 dark:bg-[#0b0f17]/98 backdrop-blur-2xl px-4 py-3.5 shadow-2xl transition-all duration-300 ease-out origin-top ${
          mobileMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-3 opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-2.5">
          {/* Navegação Principal das Abas */}
          <div className="space-y-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-gray-950 shadow-sm'
                      : 'text-slate-800 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-900/80'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gray-950' : 'text-amber-600 dark:text-amber-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isActive
                          ? 'bg-gray-950/20 text-gray-950'
                          : 'bg-slate-200 dark:bg-gray-800 text-slate-800 dark:text-gray-300 border border-slate-300 dark:border-gray-700'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Theme Switcher no Menu Mobile */}
          <div className="pt-2 border-t border-slate-200 dark:border-gray-800/70 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-gray-300">
              Tema Visual
            </span>
            <button
              onClick={() => {
                onToggleTheme();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-800 text-slate-900 dark:text-gray-200 cursor-pointer shadow-xs"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Modo Escuro (Mudar)</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-800" />
                  <span>Modo Claro (Mudar)</span>
                </>
              )}
            </button>
          </div>

          {/* Ações Rápidas Compactas (Protótipo & Base CSV) */}
          <div className="pt-2 border-t border-slate-200 dark:border-gray-800/70 grid grid-cols-2 gap-2 text-xs">
            <a
              href={`${basePath}/prototipo_dashboard.jpg`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-gray-900/70 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-800 text-slate-800 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white transition cursor-pointer font-bold"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-[11px]">Protótipo (Img)</span>
            </a>

            <a
              href={`${basePath}/chess_games.csv`}
              download="chess_games.csv"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-gray-900/70 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-800 text-slate-800 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white transition cursor-pointer font-bold"
            >
              <Download className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-[11px]">Base (CSV)</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
