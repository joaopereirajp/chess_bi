'use client';

import { CheckCircle2, TrendingUp, Trophy, Swords, ShieldAlert, Award, FileText } from 'lucide-react';

export default function ConclusionsTab() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Documento Oficial: 3 Conclusões do Projeto</h2>
            <p className="text-xs text-gray-400">
              Respostas analíticas e estatísticas aos 3 Objetivos Específicos definidos na Etapa 1
            </p>
          </div>
        </div>
      </div>

      {/* Conclusão 1 */}
      <div className="glass-panel rounded-2xl p-6 border border-gray-800 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Objetivo 1: As Aberturas Mais Bem-Sucedidas para as Peças Brancas
              </h3>
              <span className="text-xs text-amber-400 font-semibold">
                Eficácia Estratégica vs. Popularidade Aparente
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          A análise das <strong>20.058 partidas</strong> revela que, no cômputo geral, as peças Brancas possuem uma ligeira vantagem inicial, vencendo <strong>49.86%</strong> dos confrontos, contra <strong>45.40%</strong> de vitórias das Pretas e <strong>4.74%</strong> de empates.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Aberturas de Maior Rendimento (Brancas)</span>
            </h4>
            <ul className="text-xs text-gray-300 space-y-1.5">
              <li>• <strong>Zukertort Opening (Queen's Gambit Invitation):</strong> 69.8% de vitórias para as brancas.</li>
              <li>• <strong>King's Knight Opening:</strong> 69.0% de vitórias para as brancas.</li>
              <li>• <strong>King's Pawn Game (Busch-Gass Gambit):</strong> 67.2% de vitórias.</li>
              <li>• <strong>Queen's Gambit Refused (Marshall Defense):</strong> 66.1% de vitórias.</li>
              <li>• <strong>Scandinavian Defense (Mieses-Kotroc Variation):</strong> 63.3% de vitórias em 259 jogos.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>O Paradoxo da Popularidade: Cuidado com 1. e3</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              A abertura mais jogada de toda a base de dados foi a <strong>Van't Kruijs Opening</strong> (368 partidas), porém ela apresenta um índice de vitórias para as brancas de apenas <strong>34.2%</strong> (contra 61.4% de vitórias das Pretas). Esse padrão demonstra que iniciantes frequentemente jogam lances passivos como <em>1. e3</em> sem plano estratégico, entregando a iniciativa às pretas.
            </p>
          </div>
        </div>
      </div>

      {/* Conclusão 2 */}
      <div className="glass-panel rounded-2xl p-6 border border-gray-800 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Objetivo 2: Duração do Jogo e a Influência do Nível de Habilidade
              </h3>
              <span className="text-xs text-emerald-400 font-semibold">
                Crescimento Linear de +35% na Extensão dos Turnos
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Existe uma <strong>correlação positiva direta</strong> e estatisticamente significativa entre o rating dos jogadores e a quantidade média de turnos por partida. Conforme a proficiência tática aumenta, os erros primários desaparecem e os confrontos se estendem até o meio-jogo avançado e finais técnicos.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 text-center">
            <div className="text-[10px] text-gray-400 uppercase font-semibold">Iniciante (&lt;1400)</div>
            <div className="text-xl font-bold text-gray-300 mt-1">52.9 turnos</div>
            <div className="text-[10px] text-gray-500">4.846 jogos</div>
          </div>
          <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 text-center">
            <div className="text-[10px] text-gray-400 uppercase font-semibold">Intermediário (1400-1800)</div>
            <div className="text-xl font-bold text-blue-400 mt-1">61.0 turnos</div>
            <div className="text-[10px] text-gray-500">10.746 jogos</div>
          </div>
          <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 text-center">
            <div className="text-[10px] text-gray-400 uppercase font-semibold">Avançado (1800-2100)</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">66.6 turnos</div>
            <div className="text-[10px] text-gray-500">3.749 jogos</div>
          </div>
          <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 text-center border-amber-500/30 bg-amber-500/5">
            <div className="text-[10px] text-amber-400 uppercase font-bold">Mestre (2100+)</div>
            <div className="text-xl font-bold text-amber-400 mt-1">71.5 turnos</div>
            <div className="text-[10px] text-amber-500/70">717 jogos (+35.2%)</div>
          </div>
        </div>
      </div>

      {/* Conclusão 3 */}
      <div className="glass-panel rounded-2xl p-6 border border-gray-800 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Objetivo 3: Frequência de Desfechos (Xeque-Mate vs. Abandono)
              </h3>
              <span className="text-xs text-purple-400 font-semibold">
                A Transição da Conclusão Física para a Conclusão Estratégica
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          A forma como as partidas de xadrez terminam é um dos indicadores comportamentais mais reveladores da cultura e do conhecimento técnico dos competidores.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
            <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
              Iniciantes (&lt; 1400)
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Jogam a partida até a última instância física do tabuleiro. Sofrem <strong>41.0% de Xeque-Mate</strong> e abandonam em apenas <strong>47.6%</strong> dos casos. Empatam raramente (3.8%), devido à falta de conhecimento de técnicas de afogamento e finais tabulados.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              Mestres e Especialistas (2100+)
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Ocorrem apenas <strong>13.7% de Xeque-Mates</strong>. Impressionantes <strong>68.2%</strong> das partidas terminam em <strong>Abandono voluntário (Resign)</strong>. O enxadrista experiente reconhece uma perda irreparável de material ou posição com vários lances de antecedência, poupando energia mental. Os empates dobram para <strong>8.8%</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
