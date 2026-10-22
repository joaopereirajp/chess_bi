'use client';

import {
  Users,
  GraduationCap,
  CheckCircle2,
  FolderGit2,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

export default function CreditsTab() {
  const teamMembers = [
    {
      name: 'Ana Carolina V. Fernandes',
      piece: '♛',
      initials: 'AF',
      color: 'from-amber-500 to-amber-700',
    },
    {
      name: 'Carlos Armando Munhoz Vilela',
      piece: '♞',
      initials: 'CV',
      color: 'from-amber-600 to-orange-700',
    },
    {
      name: 'Edlaine Paula Silveira',
      piece: '♝',
      initials: 'ES',
      color: 'from-yellow-500 to-amber-700',
    },
    {
      name: 'Fabio Perrone Jorge Miranda',
      piece: '♜',
      initials: 'FM',
      color: 'from-amber-500 to-yellow-600',
    },
    {
      name: 'João Carlos Pereira',
      piece: '♚',
      initials: 'JP',
      color: 'from-amber-500 to-amber-800',
    },
  ];

  const deliverables = [
    {
      num: '1',
      title: 'Dashboard Funcional',
      desc: 'Painel BI interativo em Next.js 16 + React 19 + Chart.js, publicado no GitHub Pages com 100% de responsividade.',
      icon: FolderGit2,
      badge: 'Publicado',
    },
    {
      num: '2',
      title: 'Base de Dados Oficial',
      desc: 'Base tratada e unificada com 20.058 jogos reais e novas variáveis de rating, tempo e abertura (chess_games.csv).',
      icon: FileSpreadsheet,
      badge: 'Tratada',
    },
    {
      num: '3',
      title: 'Protótipo de Interface',
      desc: 'Mockup conceitual de alta fidelidade desenvolvido na fase de planejamento de UI (prototipo_dashboard.jpg).',
      icon: ImageIcon,
      badge: 'Concluído',
    },
    {
      num: '4',
      title: 'Relatório com 3 Conclusões',
      desc: 'Comprovação estatística dos 3 objetivos específicos com validação quantitativa em 20.058 partidas reais.',
      icon: FileText,
      badge: 'Validado',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Hero Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-gray-900/70 to-gray-950 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1.5 shadow-sm">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>Projeto Integrador • Segunda Etapa</span>
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Tema: Esporte</span>
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Desempenho e Estratégia em Jogos de{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                  Xadrez Online
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
                Painel analítico de Business Intelligence desenvolvido para avaliar os fatores determinantes para a vitória no xadrez, eficácia de aberturas e comportamento dos enxadristas por nível de habilidade.
              </p>
            </div>
          </div>

          {/* Grupo 32 Spotlight Badge */}
          <div className="shrink-0 self-start md:self-center">
            <div className="p-5 rounded-2xl bg-gray-950/80 border-2 border-amber-500/50 shadow-xl shadow-amber-500/10 text-center min-w-[180px]">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                GRUPO 32
              </div>
              <div className="mt-2 pt-2 border-t border-gray-800 text-[11px] text-gray-400 font-medium">
                5 Integrantes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Integrantes da Equipe
              </h3>
              <p className="text-xs text-gray-400">
                Alunos responsáveis pelo desenvolvimento do projeto e suas entregas
              </p>
            </div>
          </div>
          <span className="text-xs text-amber-400 font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/25">
            Grupo 32
          </span>
        </div>

        {/* 5 Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {teamMembers.map((member, idx) => (
            <div
              key={member.name}
              className="glass-panel rounded-2xl p-4 border border-gray-800/90 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div>
                {/* Top: Avatar and Piece Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-black text-base shadow-md shadow-amber-500/20 border border-amber-400/30 group-hover:scale-105 transition-transform`}>
                    {member.initials}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gray-950/80 border border-gray-800 flex items-center justify-center text-xl text-amber-400/90 select-none">
                    {member.piece}
                  </div>
                </div>

                {/* Name */}
                <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors leading-snug">
                  {member.name}
                </h4>
              </div>

              {/* Bottom Tag */}
              <div className="mt-4 pt-2.5 border-t border-gray-800/70 flex items-center justify-between text-[10px]">
                <span className="text-gray-500">Membro #{idx + 1}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                  Grupo 32
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables Overview Section */}
      <div className="glass-panel rounded-2xl p-6 border border-gray-800 bg-gray-950/50">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Quadro de Entregas Oficiais • Segunda Etapa
            </h3>
            <p className="text-xs text-gray-400">
              Todas as 4 entregas obrigatórias consolidadas e validadas pela equipe
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {deliverables.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="p-4 rounded-xl bg-gray-900/60 border border-gray-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      Entrega {item.num}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-2 flex items-center space-x-1.5">
                    <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
