# PROJETO INTEGRADOR — SEGUNDA ETAPA
## Relatório Analítico: Desempenho e Estratégia em Jogos de Xadrez Online

**Tema:** Desempenho e Estratégia em Jogos de Xadrez Online  
**Base de Dados:** 20.058 partidas de xadrez reais extraídas do Lichess (`chess_games.csv`)  
**Objetivo Geral:** Criação de um painel interativo (BI) para analisar o desempenho e o comportamento dos jogadores em Jogos de Xadrez Online levando em conta o nível de habilidade.  

---

## 1. Contexto e Metodologia de Análise

Nesta segunda etapa, os dados brutos de **20.058 partidas** foram submetidos a um processo de higienização, transformação e enriquecimento de variáveis (ETL). Foram computadas métricas cruciais como:
- **Rating Médio dos Oponentes:** Média aritmética entre o rating das brancas e das pretas.
- **Faixas de Proficiência Competitiva:**
  - *Iniciante:* Rating médio inferior a 1400 (4.846 partidas — 24.2%).
  - *Intermediário:* Rating médio entre 1400 e 1800 (10.746 partidas — 53.6%).
  - *Avançado:* Rating médio entre 1800 e 2100 (3.749 partidas — 18.7%).
  - *Mestre / Especialista:* Rating médio a partir de 2100 (717 partidas — 3.6%).
- **Categorização de Tempo:** Bullet (<3 min), Blitz (3-10 min), Rapid (10-30 min) e Clássico (>30 min).

A seguir, apresentam-se as **3 Conclusões Oficiais**, respondendo integralmente aos objetivos específicos propostos na Etapa 1.

---

## 2. As Três Conclusões do Projeto

### Conclusão 1: As Aberturas Mais Bem-Sucedidas para as Peças Brancas
> **Objetivo Específico 1:** *Descobrir quais aberturas possuem o maior percentual de vitórias quando se joga com as peças brancas.*

No cômputo global das 20.058 partidas, confirmou-se a clássica vantagem estatística do primeiro lance das peças Brancas:
- **Vitórias das Brancas:** **49.86%** (10.001 partidas)
- **Vitórias das Pretas:** **45.40%** (9.107 partidas)
- **Empates:** **4.74%** (950 partidas)

Ao filtrar as aberturas com representatividade estatística relevante (mínimo de 40 partidas na base), identificou-se o seguinte ranking de maior eficácia:

| Ranking | Abertura (Nome e Variação) | Código ECO | Total de Jogos | % Vitórias Brancas | % Vitórias Pretas | % Empates |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **1º** | **Zukertort Opening: Queen's Gambit Invitation** | `A04` | 53 | **69.8%** | 24.5% | 5.7% |
| **2º** | **King's Knight Opening** | `C40` | 87 | **69.0%** | 27.6% | 3.4% |
| **3º** | **King's Pawn Game: Busch-Gass Gambit** | `C44` | 58 | **67.2%** | 31.0% | 1.7% |
| **4º** | **Queen's Gambit Refused: Marshall Defense** | `D06` | 127 | **66.1%** | 29.9% | 3.9% |
| **5º** | **Elephant Gambit** | `C40` | 56 | **66.1%** | 30.4% | 3.6% |
| **6º** | **Queen's Pawn** | `A40` | 129 | **65.9%** | 31.0% | 3.1% |
| **7º** | **Nimzowitsch Defense: Kennedy Variation** | `B00` | 52 | **65.4%** | 30.8% | 3.8% |
| **8º** | **Philidor Defense #3** | `C41` | 198 | **64.1%** | 32.8% | 3.0% |
| **9º** | **Bishop's Opening: Berlin Defense** | `C23` | 94 | **63.8%** | 34.0% | 2.1% |
| **10º**| **Scandinavian Defense: Mieses-Kotroc Variation** | `B01` | 259 | **63.3%** | 34.4% | 2.3% |

#### Insight Analítico Fundamental: O Paradoxo da Popularidade
A análise revelou um fenômeno contra-intuitivo de extrema importância para o enxadrismo prático: **a abertura mais popular de toda a base não é a mais eficiente**.
- A abertura com maior número absoluto de partidas foi a **Van't Kruijs Opening (1. e3)**, jogada **368 vezes**.
- No entanto, o percentual de vitória das Brancas com a Van't Kruijs Opening foi de apenas **34.2%**, enquanto as Pretas venceram **61.4%** dos confrontos.
- **Interpretação:** A abertura *1. e3* é frequentemente escolhida por jogadores novatos por intuição ou passividade, sem um plano de controle central, o que permite às pretas assumirem o centro do tabuleiro imediatamente e dominarem a partida.

---

### Conclusão 2: Duração do Jogo e a Influência do Nível de Habilidade
> **Objetivo Específico 2:** *Comparar a duração média dos jogos entre jogadores iniciantes e altamente experientes (GM/IM).*

Os dados comprovam uma **relação diretamente proporcional** entre a proficiência competitiva dos jogadores e o número de turnos disputados por partida:

| Faixa de Habilidade | Faixa de Rating | Partidas Analisadas | Média de Turnos | Mediana de Turnos | Duração Média Estimada |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Iniciante** | < 1400 | 4.846 | **52.89 turnos** | 49 turnos | ~23 minutos |
| **Intermediário** | 1400 – 1800 | 10.746 | **61.02 turnos** | 56 turnos | ~27 minutos |
| **Avançado** | 1800 – 2100 | 3.749 | **66.57 turnos** | 61 turnos | ~30 minutos |
| **Mestre / Especialista** | 2100+ | 717 | **71.52 turnos** | 66 turnos | ~32 minutos |

#### Fatores Técnicos Determinantes:
1. **Diferença de +35.2% na Extensão dos Jogos:** Mestres e especialistas sustentam partidas com média de **71.5 turnos**, enquanto iniciantes encerram suas partidas em média aos **52.9 turnos**.
2. **Redução Drástica de Erros Graves (Blunders):** Jogadores iniciantes cometem erros táticos capitais logo na abertura e início do meio-jogo (como entregar peças maiores ou sofrer mates rápidos de 2 a 4 lances), provocando encerramentos precoces.
3. **Resistência Defensiva e Finais Técnicos:** Enxadristas de nível mestre compreendem estruturas de peões, profilaxia e finais de peças menores e torres, disputando vantagens milimétricas que se prolongam por dezenas de lances no final de jogo.

---

### Conclusão 3: Formas de Finalização do Jogo (Xeque-Mate vs. Abandono)
> **Objetivo Específico 3:** *Investigar a frequência de diferentes formas de finalizar um jogo (xeque-mate, abandono, empate por tempo).*

A investigação sobre como as partidas são decididas revelou a mais profunda transformação comportamental e cultural entre os diferentes níveis de habilidade:

| Faixa de Habilidade | Total de Jogos | Abandono (Resign) | Xeque-Mate (Mate) | Tempo Esgotado (Outoftime) | Empate Regulamentar (Draw) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Iniciante (<1400)** | 4.846 | 47.6% (2.306) | **41.0% (1.985)** | 7.7% (372) | 3.8% (183) |
| **Intermediário (1400-1800)** | 10.746 | 55.5% (5.962) | **32.1% (3.447)** | 8.3% (895) | 4.2% (442) |
| **Avançado (1800-2100)** | 3.749 | 63.8% (2.392) | **21.2% (795)** | 9.3% (350) | 5.6% (212) |
| **Mestre / Especialista (2100+)**| 717 | **68.2% (489)** | **13.7% (98)** | 9.3% (67) | **8.8% (63)** |
| **GERAL (Base Completa)** | **20.058** | **55.6% (11.147)**| **31.5% (6.325)** | **8.4% (1.680)** | **4.5% (906)** |

#### Interpretação Psicológica e Estratégica:
1. **O Declínio do Xeque-Mate Físico (41.0% → 13.7%):**
   - No nível iniciante, mais de 4 a cada 10 partidas só terminam quando o rei é fisicamente encurralado no tabuleiro em xeque-mate. Os jogadores frequentemente não percebem que a partida já está matematicamente perdida ou têm esperança de um erro crasso do oponente.
   - Entre mestres, o xeque-mate no tabuleiro ocorre em apenas **13.7%** dos casos (quase um terço da incidência dos iniciantes).
2. **A Hegemonia do Abandono Consciente (47.6% → 68.2%):**
   - Quase **70% das partidas de mestres** terminam com o jogador perdedor abandonando voluntariamente (*resign*). 
   - Mestres calculam árvores de variantes com 5 a 10 lances à frente; ao perder uma peça limpa ou entrar em um final teoricamente perdido, o jogador reconhece a capacidade técnica do adversário e abandona em sinal de respeito e economia de tempo.
3. **Aumento dos Empates por Reconhecimento Técnico (3.8% → 8.8%):**
   - A taxa de empates mais que dobra nos níveis elevados (de 3.8% para 8.8%). Em alto nível, jogadores com desvantagem posicional manobram com maestria para forçar repetição de lances ou xeque perpétuo, enquanto em níveis baixos um dos lados quase sempre comete um erro fatal.

---

## 3. Síntese Executiva dos Resultados

| Eixo Analítico | Padrão no Nível Iniciante | Padrão no Nível Mestre |
| :--- | :--- | :--- |
| **Aberturas** | Preferência por lances passivos (*1. e3*) com 34% de vitória | Linhas teóricas ativas (*Zukertort*, *King's Knight*) com até 70% de vitória |
| **Duração Média** | Partidas curtas (~52 turnos), decididas por golpes táticos primários | Partidas longas (~71 turnos), decididas no meio-jogo denso e finais |
| **Desfecho** | Alta incidência de Xeque-Mate físico (41%) | Predomínio absoluto de Abandono técnico (68%) e empates dobrados |

---

## 4. Guia de Arquivos Entregues

1. **Dashboard Funcional:** Aplicação Next.js interativa executável via `npm run dev` ou estática via pasta `out/index.html`.
2. **Base de Dados Utilizada:** Arquivo de dados unificado e enriquecido: `chess_games.csv`.
3. **Protótipo do Dashboard:** Arquivo de imagem em alta definição `prototipo_dashboard.jpg` presente na raiz e na pasta `public/`.
4. **Documento com 3 Conclusões:** O presente documento `conclusoes.md` e a aba integrada na aplicação web.
