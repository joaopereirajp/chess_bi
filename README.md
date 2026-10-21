# PROJETO INTEGRADOR: SEGUNDA ETAPA — DASHBOARD BI DE XADREZ

> **Tema:** Desempenho e Estratégia em Jogos de Xadrez Online  
> **Fonte dos Dados:** 20.058 partidas de xadrez reais do Lichess (Kaggle)  
> **Tecnologias:** Next.js (App Router), Tailwind CSS, Chart.js, Lucide Icons, Python  

---

## 📦 Entregas da Segunda Etapa

| Item | Entrega Obrigatória | Arquivo / Link no Projeto |
| :---: | :--- | :--- |
| 1️⃣ | **Dashboard Funcional** | Aplicação web interativa em Next.js (`npm run dev` em `http://localhost:3000`) ou exportação estática na pasta `out/index.html` |
| 2️⃣ | **Base de Dados Utilizada** | Base unificada e enriquecida com novas variáveis: [`chess_games.csv`](file:///Users/joaopereira/StudioProjects/chess_bi/chess_games.csv) |
| 3️⃣ | **Protótipo do Dashboard** | Arquivo de imagem em alta fidelidade: [`prototipo_dashboard.jpg`](file:///Users/joaopereira/StudioProjects/chess_bi/prototipo_dashboard.jpg) |
| 4️⃣ | **Documento com 3 Conclusões** | Relatório analítico completo: [`conclusoes.md`](file:///Users/joaopereira/StudioProjects/chess_bi/conclusoes.md) (também disponível na aba do próprio Dashboard) |

---

## 🚀 Como Executar o Dashboard

### Opção 1: Executar em Desenvolvimento (Recomendado)

Certifique-se de ter o **Node.js** instalado e execute na raiz do projeto:

```bash
# 1. Instalar dependências (caso ainda não tenha instalado)
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Abra o navegador em: **[http://localhost:3000](http://localhost:3000)**

---

### Opção 2: Visualizar a Versão Estática Exportada (`out/`)

O projeto está configurado para **Static Export** (`output: 'export'`), gerando todos os arquivos HTML, CSS e JavaScript estáticos na pasta `out/`:

```bash
# Gerar o build estático
npm run build

# Servir a pasta estática com qualquer servidor web local:
npx serve out
# ou via Python:
python3 -m http.server -d out 3000
```

---

### Opção 3: Publicar Online Gratuitamente (Gerar Link para Entrega)

Caso deseje entregar um link online público ao professor:
1. Faça push do repositório para o seu GitHub.
2. Acesse [vercel.com](https://vercel.com) e importe o repositório.
3. O deploy será realizado em segundos gerando uma URL pública como `https://seu-projeto.vercel.app`.

---

## ⚙️ Como os Dados Foram Processados (ETL)

O script autônomo em Python [`process_data.py`](file:///Users/joaopereira/StudioProjects/chess_bi/process_data.py) realizou o tratamento dos dados originais:

```bash
python3 process_data.py
```

### Novas Colunas Criadas:
- `avg_rating`: Média do rating dos dois enxadristas.
- `rating_tier`: Segmentação em *Iniciante (<1400)*, *Intermediário (1400-1800)*, *Avançado (1800-2100)* e *Mestre/Especialista (2100+)*.
- `time_category`: Agrupamento do controle de tempo em *Bullet*, *Blitz*, *Rapid* e *Clássico*.
- `opening_family`: Agrupamento simplificado da abertura.

---

## 🎯 Síntese das 3 Conclusões Principais

1. **Aberturas Mais Eficientes (Brancas):**  
   As brancas vencem 49.9% no geral. Aberturas com maior índice de vitória incluem a *Zukertort Opening* (69.8%) e a *King's Knight Opening* (69.0%). Por outro lado, a abertura mais jogada da base (*Van't Kruijs Opening - 1. e3*) teve apenas 34.2% de vitórias para as brancas, revelando uma armadilha comum entre iniciantes.

2. **Duração do Jogo vs. Proficiência:**  
   O número médio de turnos cresce linearmente com a habilidade: de **52.9 turnos** em iniciantes para **71.5 turnos** em mestres (+35.2%). Enxadristas avançados cometem menos erros táticos primários e levam a disputa a finais técnicos.

3. **Mecânica de Desfecho (Xeque-Mate vs. Abandono):**  
   Iniciantes sofrem xeque-mate em **41.0%** dos confrontos e abandonam em 47.6%. Já entre mestres, o xeque-mate físico ocorre em apenas **13.7%** dos casos, enquanto **68.2%** das partidas terminam em abandono voluntário (*resign*) e os empates sobem para 8.8%.
