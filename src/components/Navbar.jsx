'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Table2,
  BookOpen,
  Image as ImageIcon,
  Download,
  Menu,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export default function Navbar({ onSelectTab, activeTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      id: 'aberturas',
      label: 'Aberturas',
      icon: Table2,
      badge: '130+',
    },
    {
      id: 'conclusoes',
      label: 'Insights & Conclusões',
      icon: BookOpen,
      badge: 'Oficial',
    },
  ];

  const handleTabClick = (tabId) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/80 bg-[#0b0f17]/95 backdrop-blur-xl shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center space-x-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-black text-xl border border-amber-400/30 select-none">
              ♟
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Chess<span className="text-amber-400">BI</span>
                </span>
                <span className="hidden min-[360px]:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 uppercase tracking-wider">
                  Etapa 2
                </span>
              </div>
              <div className="hidden sm:flex items-center space-x-1.5 text-[11px] text-gray-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>20.058 Jogos (Lichess)</span>
              </div>
            </div>
          </div>

          {/* Center: Desktop Segmented Navigation Tabs (visível >= 1024px) */}
          <nav className="hidden lg:flex items-center bg-gray-950/80 p-1 rounded-xl border border-gray-800 shadow-inner">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-gray-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gray-950' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        isActive
                          ? 'bg-gray-950/20 text-gray-950'
                          : 'bg-gray-800 text-gray-400 border border-gray-700/60'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Quick Deliverables Actions & Hamburger Toggle */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Protótipo Link (Desktop e Tablet) */}
            <a
              href="/prototipo_dashboard.jpg"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-gray-900/60 hover:bg-gray-800 border border-gray-800 transition cursor-pointer"
              title="Visualizar Protótipo da Entrega 3"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Protótipo</span>
            </a>

            {/* Download Base CSV */}
            <a
              href="/chess_games.csv"
              download="chess_games.csv"
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-200 hover:text-white bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 transition cursor-pointer shadow-sm"
              title="Baixar Base de Dados Unificada (chess_games.csv)"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Baixar Base</span>
            </a>

            {/* GitHub Repo */}
            <a
              href="https://github.com/joaopereirajp/chess_bi"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-gray-900/60 hover:bg-gray-800 border border-gray-800 transition cursor-pointer"
              title="Ver Repositório no GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Mobile / Tablet Hamburger Toggle Button (visível < 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white bg-gray-900/80 hover:bg-gray-800 border border-gray-700/80 transition cursor-pointer"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu com Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop semi-transparente para fechar ao clicar fora */}
          <div
            className="fixed inset-0 top-16 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Painel do Menu Mobile */}
          <div className="relative z-50 lg:hidden border-t border-gray-800/90 bg-[#0b0f17]/98 backdrop-blur-2xl px-4 py-4 space-y-4 shadow-2xl">
            {/* Seção 1: Navegação Principal de Abas */}
            <div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 mb-2">
                Navegação do Painel
              </div>
              <div className="space-y-1.5">
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-gray-950 font-bold shadow-md shadow-amber-500/25'
                          : 'text-gray-300 hover:text-white hover:bg-gray-900/80 border border-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-gray-950' : 'text-amber-400'}`} />
                        <span>{tab.label}</span>
                      </div>
                      {tab.badge && (
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            isActive
                              ? 'bg-gray-950/20 text-gray-950'
                              : 'bg-gray-800 text-gray-300 border border-gray-700'
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seção 2: Entregas Oficiais & Recursos */}
            <div className="pt-3 border-t border-gray-800/80">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 mb-2">
                Entregas do Projeto
              </div>
              <div className="grid grid-cols-1 gap-2">
                <a
                  href="/chess_games.csv"
                  download="chess_games.csv"
                  className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs text-gray-200 hover:text-white bg-gray-900/80 hover:bg-gray-800 border border-gray-800 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Baixar Base Oficial (chess_games.csv)</span>
                </a>

                <a
                  href="/prototipo_dashboard.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs text-gray-200 hover:text-white bg-gray-900/80 hover:bg-gray-800 border border-gray-800 cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Ver Protótipo de Interface (Entrega 3)</span>
                </a>

                <a
                  href="https://github.com/joaopereirajp/chess_bi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs text-gray-200 hover:text-white bg-gray-900/80 hover:bg-gray-800 border border-gray-800 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-amber-400" />
                  <span>Repositório no GitHub (Código-Fonte)</span>
                </a>

                <a
                  href="https://www.kaggle.com/datasets/datasnaek/chess"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Base Original no Kaggle (20.058 jogos)</span>
                </a>
              </div>
            </div>

            {/* Rodapé informativo */}
            <div className="pt-2 text-[11px] text-gray-500 px-2 flex items-center justify-between">
              <span>Lichess Games • Projeto Integrador</span>
              <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Online</span>
              </span>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
