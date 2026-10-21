'use client';

import { Trophy, FileSpreadsheet, Image as ImageIcon, BookOpen, ExternalLink } from 'lucide-react';

export default function Navbar({ onSelectTab, activeTab }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-gray-800 bg-[#0b0f17]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-bold text-xl">
              ♟
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-white tracking-tight">Chess BI Analytics</h1>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Etapa 2
                </span>
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">
                Estratégia e Desempenho em Jogos de Xadrez Online (20.058 partidas)
              </p>
            </div>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onSelectTab('geral')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'geral'
                  ? 'bg-amber-500 text-gray-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onSelectTab('conclusoes')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'conclusoes'
                  ? 'bg-amber-500 text-gray-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>3 Conclusões</span>
            </button>
            <button
              onClick={() => onSelectTab('aberturas')}
              className={`hidden md:block px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'aberturas'
                  ? 'bg-amber-500 text-gray-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Tabela de Aberturas
            </button>

            <a
              href="/prototipo_dashboard.jpg"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-gray-400 hover:text-amber-400 rounded-lg hover:bg-gray-800/60 border border-gray-800 transition"
              title="Ver Protótipo Visual da Entrega 3"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Protótipo</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
