'use client';

import {
  LayoutDashboard,
  Table2,
  BookOpen,
  Image as ImageIcon,
  Download,
  Sparkles,
} from 'lucide-react';

export default function Navbar({ onSelectTab, activeTab }) {
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
      label: '3 Conclusões',
      icon: BookOpen,
      badge: 'Etapa 2',
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/80 bg-[#0b0f17]/85 backdrop-blur-xl shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-black text-xl border border-amber-400/30">
              ♟
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-extrabold text-white tracking-tight">
                  Chess<span className="text-amber-400">BI</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 uppercase tracking-wider">
                  Etapa 2
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-[11px] text-gray-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>20.058 Jogos Reais (Lichess)</span>
              </div>
            </div>
          </div>

          {/* Center: Segmented Navigation Tabs */}
          <nav className="flex items-center bg-gray-950/80 p-1 rounded-xl border border-gray-800 shadow-inner">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
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

          {/* Right: Quick Deliverable Actions & GitHub */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Protótipo Link */}
            <a
              href="/prototipo_dashboard.jpg"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-gray-900/60 hover:bg-gray-800 border border-gray-800 transition cursor-pointer"
              title="Visualizar Protótipo da Entrega 3"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Protótipo</span>
            </a>

            {/* Download Base CSV */}
            <a
              href="/chess_games.csv"
              download="chess_games.csv"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-200 hover:text-white bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 transition cursor-pointer shadow-sm"
              title="Baixar Base de Dados (chess_games.csv)"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Baixar Base</span>
            </a>

            {/* GitHub Repo */}
            <a
              href="https://github.com/joaopereirajp/chess_bi"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-gray-900/60 hover:bg-gray-800 border border-gray-800 transition cursor-pointer"
              title="Ver Código no GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
