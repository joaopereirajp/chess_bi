'use client';

import {
  Trophy,
  Clock,
  ShieldAlert,
  CheckCircle2,
  FileText,
  Sparkles,
  TrendingUp,
  Award,
  ExternalLink,
  Flame,
} from 'lucide-react';

export default function ConclusionsTab() {
  return (
    <div className="space-y-6">
      {/* Executive Report Header */}
      <div className="glass-panel rounded-2xl p-6 border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-white dark:via-gray-900/60 to-amber-50 dark:to-gray-900/80 shadow-sm dark:shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 shadow-xs">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/40">
                  Entrega 4 Oficial
                </span>
                <span className="text-xs text-slate-700 dark:text-gray-400 font-semibold">Projeto Integrador • Segunda Etapa</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                Relatório Executivo: Conclusões Estratégicas
              </h2>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-gray-300 mt-1 max-w-2xl leading-relaxed">
                Resultados analíticos e comprovação estatística dos <strong className="text-slate-950 dark:text-white">3 Objetivos Específicos</strong> definidos no tema do projeto, extraídos de <strong className="text-slate-950 dark:text-white">20.058 partidas reais</strong> do Lichess.
              </p>
            </div>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-900/80 border border-slate-300 dark:border-gray-800 text-xs text-slate-900 dark:text-gray-300 font-bold flex items-center space-x-1.5 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>3 Objetivos Validados</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-900/80 border border-slate-300 dark:border-gray-800 text-xs text-slate-900 dark:text-gray-300 font-bold flex items-center space-x-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block" />
              <span>20.058 Jogos Reais</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Executive Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Highlight 1 */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-gray-800 relative overflow-hidden group hover:border-amber-500/50 shadow-sm transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center space-x-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Objetivo 1 • Aberturas</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-900 dark:text-amber-400 border border-amber-500/30">
              69.8% Top Win
            </span>
          </div>
          <div className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
            Eficácia vs. Popularidade
          </div>
          <p className="text-xs text-slate-800 dark:text-gray-400 mt-1.5 leading-relaxed font-normal">
            A <strong className="text-slate-950 dark:text-white">Zukertort Opening</strong> lidera com <strong className="text-slate-950 dark:text-white">69.8%</strong> de vitórias para as Brancas. Já a abertura mais jogada da base (*1. e3*) teve apenas <strong className="text-slate-950 dark:text-white">34.2%</strong> de vitória, desmistificando lances passivos de novatos.
          </p>
        </div>

        {/* Highlight 2 */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-gray-800 relative overflow-hidden group hover:border-emerald-500/50 shadow-sm transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Objetivo 2 • Duração</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-900 dark:text-emerald-400 border border-emerald-500/30">
              +35.2% em Mestres
            </span>
          </div>
          <div className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
            Maturidade Técnica
          </div>
          <p className="text-xs text-slate-800 dark:text-gray-400 mt-1.5 leading-relaxed font-normal">
            Confrontos de Mestres duram em média <strong className="text-slate-950 dark:text-white">71.5 turnos</strong> (~32 min), enquanto iniciantes encerram partidas aos <strong className="text-slate-950 dark:text-white">52.9 turnos</strong> (~24 min) devido a erros táticos primários no início do jogo.
          </p>
        </div>

        {/* Highlight 3 */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-gray-800 relative overflow-hidden group hover:border-red-500/50 shadow-sm transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider flex items-center space-x-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Objetivo 3 • Desfechos</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/15 text-red-900 dark:text-red-400 border border-red-500/30">
              68.2% Resign
            </span>
          </div>
          <div className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
            Transição Estratégica
          </div>
          <p className="text-xs text-slate-800 dark:text-gray-400 mt-1.5 leading-relaxed font-normal">
            Mestres abandonam em <strong className="text-slate-950 dark:text-white">68.2%</strong> das vezes ao prever desvantagens irreparáveis; iniciantes jogam até o xeque-mate físico no tabuleiro em <strong className="text-slate-950 dark:text-white">41.0%</strong> das partidas.
          </p>
        </div>
      </div>

      {/* Seção Detalhada 1 */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-gray-800 shadow-sm dark:shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                Objetivo 1: As Aberturas Mais Bem-Sucedidas para as Peças Brancas
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                Classificação por Taxa de Vitória das Brancas (Mínimo de 40 partidas)
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-800 dark:text-gray-300 leading-relaxed font-normal">
          No cômputo global das <strong className="text-slate-950 dark:text-white">20.058 partidas</strong>, confirmou-se a clássica vantagem estatística do primeiro lance das peças Brancas: <strong className="text-slate-950 dark:text-white">49.86% de vitórias</strong>, contra <strong className="text-slate-950 dark:text-white">45.40% das Pretas</strong> e <strong className="text-slate-950 dark:text-white">4.74% de empates</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card Top Aberturas */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-gray-900/60 border border-slate-200 dark:border-gray-800 shadow-xs">
            <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Top 5 Aberturas com Maior Rendimento (Brancas)</span>
            </h4>
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-gray-950/60 border border-slate-200 dark:border-gray-800/80">
                <span className="font-bold text-slate-950 dark:text-white">1. Zukertort Opening (Queen's Gambit Invitation)</span>
                <span className="font-black text-amber-700 dark:text-amber-400">69.8%</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-gray-950/60 border border-slate-200 dark:border-gray-800/80">
                <span className="font-bold text-slate-950 dark:text-white">2. King's Knight Opening</span>
                <span className="font-black text-amber-700 dark:text-amber-400">69.0%</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-gray-950/60 border border-slate-200 dark:border-gray-800/80">
                <span className="font-bold text-slate-950 dark:text-white">3. King's Pawn Game (Busch-Gass Gambit)</span>
                <span className="font-black text-amber-700 dark:text-amber-400">67.2%</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-gray-950/60 border border-slate-200 dark:border-gray-800/80">
                <span className="font-bold text-slate-950 dark:text-white">4. Queen's Gambit Refused (Marshall Defense)</span>
                <span className="font-black text-amber-700 dark:text-amber-400">66.1%</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-gray-950/60 border border-slate-200 dark:border-gray-800/80">
                <span className="font-bold text-slate-950 dark:text-white">5. Scandinavian Defense (Mieses-Kotroc Variation)</span>
                <span className="font-black text-amber-700 dark:text-amber-400">63.3%</span>
              </div>
            </div>
          </div>

          {/* Card Paradoxo da Popularidade */}
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-gray-900/60 border border-amber-200 dark:border-gray-800 flex flex-col justify-between shadow-xs">
            <div>
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>O Paradoxo da Popularidade: Cuidado com 1. e3</span>
              </h4>
              <p className="text-xs text-slate-800 dark:text-gray-300 leading-relaxed font-normal">
                A abertura mais jogada de toda a base de dados foi a <strong className="text-slate-950 dark:text-white">Van't Kruijs Opening (1. e3)</strong>, com <strong className="text-slate-950 dark:text-white">368 partidas</strong>. Contudo, seu rendimento para as brancas foi de apenas <strong className="text-slate-950 dark:text-white">34.2%</strong> (contra 61.4% de vitórias das Pretas).
              </p>
            </div>
            <div className="mt-3 p-2.5 rounded-lg bg-amber-100/90 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/20 text-[11px] text-amber-950 dark:text-amber-200 font-medium">
              💡 <strong className="text-amber-950 dark:text-amber-200">Conclusão Técnica:</strong> Jogadores novatos frequentemente utilizam <em>1. e3</em> por intuição ou timidez na abertura, entregando o domínio do centro do tabuleiro imediatamente para as pretas.
            </div>
          </div>
        </div>
      </div>

      {/* Seção Detalhada 2 */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-gray-800 shadow-sm dark:shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                Objetivo 2: Duração do Jogo e a Influência do Nível de Habilidade
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                Correlação Linear Direta: +35.2% na Extensão dos Turnos em Nível Mestre
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-800 dark:text-gray-300 leading-relaxed font-normal">
          Existe uma <strong className="text-slate-950 dark:text-white">correlação positiva direta</strong> entre o nível de rating dos competidores e o número de turnos disputados. À medida que a habilidade se eleva, a incidência de gafes primárias desaba e as partidas se prolongam até o meio-jogo avançado e finais técnicos.
        </p>

        {/* 4 Cards de Duração */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-gray-900/60 border border-slate-200 dark:border-gray-800 text-center shadow-xs">
            <div className="text-[10px] text-slate-700 dark:text-gray-400 uppercase font-bold">Iniciante (&lt;1400)</div>
            <div className="text-xl font-black text-slate-950 dark:text-white mt-1">52.9 turnos</div>
            <div className="text-[10px] text-slate-600 dark:text-gray-400 font-medium mt-0.5">~24 min • 4.846 jogos</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-gray-900/60 border border-slate-200 dark:border-gray-800 text-center shadow-xs">
            <div className="text-[10px] text-slate-700 dark:text-gray-400 uppercase font-bold">Intermediário (1400-1800)</div>
            <div className="text-xl font-black text-blue-700 dark:text-blue-400 mt-1">61.0 turnos</div>
            <div className="text-[10px] text-slate-600 dark:text-gray-400 font-medium mt-0.5">~27 min • 10.746 jogos</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-gray-900/60 border border-slate-200 dark:border-gray-800 text-center shadow-xs">
            <div className="text-[10px] text-slate-700 dark:text-gray-400 uppercase font-bold">Avançado (1800-2100)</div>
            <div className="text-xl font-black text-emerald-700 dark:text-emerald-400 mt-1">66.6 turnos</div>
            <div className="text-[10px] text-slate-600 dark:text-gray-400 font-medium mt-0.5">~30 min • 3.749 jogos</div>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-500/15 dark:bg-gray-900/60 border border-amber-500/40 text-center shadow-xs">
            <div className="text-[10px] text-amber-900 dark:text-amber-400 uppercase font-black">Mestre (2100+)</div>
            <div className="text-xl font-black text-amber-800 dark:text-amber-300 mt-1">71.5 turnos</div>
            <div className="text-[10px] text-amber-900 dark:text-amber-400 font-bold mt-0.5">+35.2% de duração</div>
          </div>
        </div>
      </div>

      {/* Seção Detalhada 3 */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-gray-800 shadow-sm dark:shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                Objetivo 3: Frequência de Desfechos (Xeque-Mate vs. Abandono)
              </h3>
              <p className="text-xs text-purple-700 dark:text-purple-400 font-bold">
                Transição da Conclusão Física (Mate) para a Conclusão Estratégica (Resign)
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-800 dark:text-gray-300 leading-relaxed font-normal">
          A análise de como os confrontos terminam revela a maior transformação comportamental do enxadrismo:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card Iniciantes */}
          <div className="p-4 rounded-xl bg-red-50/90 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 shadow-xs">
            <h4 className="text-xs font-bold text-red-900 dark:text-red-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Iniciantes (&lt; 1400 Elo)</span>
              <span className="text-red-700 dark:text-red-400 font-black text-sm">41.0% Mate</span>
            </h4>
            <p className="text-xs text-slate-800 dark:text-gray-300 leading-relaxed font-normal">
              Jogam a partida até a última instância física do tabuleiro. Mais de 4 em cada 10 partidas só terminam quando o rei é encurralado em xeque-mate. Abandonam em menos de metade das partidas (47.6%) e quase não empatam (3.8%).
            </p>
          </div>

          {/* Card Mestres */}
          <div className="p-4 rounded-xl bg-amber-50/90 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 shadow-xs">
            <h4 className="text-xs font-bold text-amber-950 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Mestres (2100+ Elo)</span>
              <span className="text-amber-800 dark:text-amber-400 font-black text-sm">68.2% Resign</span>
            </h4>
            <p className="text-xs text-slate-800 dark:text-gray-300 leading-relaxed font-normal">
              Apenas <strong className="text-slate-950 dark:text-white">13.7% sofrem mate</strong> no tabuleiro. Quase <strong className="text-slate-950 dark:text-white">70%</strong> dos jogos são decididos por <strong className="text-slate-950 dark:text-white">abandono voluntário (*resign*)</strong>. Ao identificar desvantagens estruturais com lances de antecedência, o enxadrista desiste em sinal de respeito técnico e economia de energia.
            </p>
          </div>
        </div>
      </div>

      {/* Matriz Sintética Executiva */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-gray-800 shadow-sm dark:shadow-xl">
        <h4 className="text-xs font-bold text-slate-950 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Matriz Executiva: Comparativo Direto Iniciante vs. Mestre</span>
        </h4>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-gray-800 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 dark:bg-gray-900/80 text-slate-900 dark:text-gray-400 uppercase font-black text-[10px] border-b border-slate-300 dark:border-gray-800">
                <th className="py-2.5 px-4">Critério Analítico</th>
                <th className="py-2.5 px-4">Padrão Iniciante (&lt;1400)</th>
                <th className="py-2.5 px-4">Padrão Mestre (2100+)</th>
                <th className="py-2.5 px-4 text-right">Variação / Impacto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-gray-800/60 bg-white dark:bg-gray-950/40">
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-950 dark:text-white">Aberturas Típicas</td>
                <td className="py-2.5 px-4 text-slate-800 dark:text-gray-300 font-medium">Lances passivos (1. e3, Van't Kruijs)</td>
                <td className="py-2.5 px-4 text-amber-800 dark:text-amber-300 font-bold">Linhas ativas (Zukertort, King's Knight)</td>
                <td className="py-2.5 px-4 text-right text-emerald-700 dark:text-emerald-400 font-black">Até 70% Win Rate</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-950 dark:text-white">Duração Média</td>
                <td className="py-2.5 px-4 text-slate-800 dark:text-gray-300 font-medium">52.9 turnos (~24 minutos)</td>
                <td className="py-2.5 px-4 text-amber-800 dark:text-amber-300 font-bold">71.5 turnos (~32 minutos)</td>
                <td className="py-2.5 px-4 text-right text-emerald-700 dark:text-emerald-400 font-black">+35.2% Extensão</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-950 dark:text-white">Frequência de Xeque-Mate</td>
                <td className="py-2.5 px-4 text-red-700 dark:text-red-400 font-black">41.0% dos jogos</td>
                <td className="py-2.5 px-4 text-slate-800 dark:text-gray-300 font-medium">Apenas 13.7% dos jogos</td>
                <td className="py-2.5 px-4 text-right text-red-700 dark:text-red-400 font-black">-66.6% Queda</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-slate-950 dark:text-white">Frequência de Abandono (Resign)</td>
                <td className="py-2.5 px-4 text-slate-800 dark:text-gray-300 font-medium">47.6% dos jogos</td>
                <td className="py-2.5 px-4 text-amber-800 dark:text-amber-400 font-black">68.2% dos jogos</td>
                <td className="py-2.5 px-4 text-right text-amber-800 dark:text-amber-400 font-black">+43.3% Aumento</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
