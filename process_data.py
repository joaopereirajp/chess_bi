import csv
import json
import os
from collections import defaultdict, Counter

CSV_INPUT = 'games.csv'
CSV_OUTPUT = 'games_tratada.csv'
JSON_OUTPUT = 'dashboard_data.json'

def parse_time_category(increment_code):
    """
    Classifica o controle de tempo em Bullet, Blitz, Rapid ou Clássico
    Baseado no tempo inicial em minutos e incremento
    """
    if not increment_code:
        return 'Outro'
    try:
        parts = increment_code.split('+')
        base_min = float(parts[0])
        inc_sec = float(parts[1]) if len(parts) > 1 else 0.0
        # Tempo estimado da partida em minutos = base_min + (inc_sec * 40 / 60)
        est_min = base_min + (inc_sec * 40.0 / 60.0)
        if est_min < 3:
            return 'Bullet (<3 min)'
        elif est_min <= 10:
            return 'Blitz (3-10 min)'
        elif est_min <= 30:
            return 'Rapid (10-30 min)'
        else:
            return 'Clássico (>30 min)'
    except Exception:
        return 'Outro'

def get_rating_tier(rating):
    if rating < 1400:
        return 'Iniciante (<1400)'
    elif rating < 1800:
        return 'Intermediário (1400-1800)'
    elif rating < 2100:
        return 'Avançado (1800-2100)'
    else:
        return 'Mestre/Especialista (2100+)'

def get_opening_family(opening_name):
    """Agrupa abertura pela família principal (ex: Sicilian Defense, French Defense, etc.)"""
    if not opening_name:
        return 'Desconhecida'
    # Remover variações após ':' ou '|' ou '#'
    base = opening_name.split(':')[0].split('|')[0].split('#')[0].strip()
    return base

def main():
    print("Iniciando processamento de dados de jogos de xadrez...")
    
    if not os.path.exists(CSV_INPUT):
        print(f"Erro: Arquivo {CSV_INPUT} não encontrado.")
        return

    treated_rows = []
    
    # Estruturas para agregação
    tier_turns = defaultdict(list)
    tier_victory_status = defaultdict(Counter)
    tier_winners = defaultdict(Counter)
    
    openings_stats = defaultdict(lambda: {
        'total': 0, 'white_wins': 0, 'black_wins': 0, 'draws': 0,
        'eco': '', 'family': '', 'turns_sum': 0
    })
    
    family_stats = defaultdict(lambda: {
        'total': 0, 'white_wins': 0, 'black_wins': 0, 'draws': 0
    })
    
    time_control_stats = Counter()
    overall_winners = Counter()
    overall_status = Counter()
    total_turns = 0
    total_rating_sum = 0
    
    with open(CSV_INPUT, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames + [
            'avg_rating', 'rating_tier', 'time_category', 'opening_family'
        ]
        
        for row in reader:
            w_rating = float(row['white_rating'])
            b_rating = float(row['black_rating'])
            avg_rating = round((w_rating + b_rating) / 2.0, 1)
            turns = int(row['turns'])
            winner = row['winner']
            status = row['victory_status']
            op_name = row['opening_name']
            op_eco = row['opening_eco']
            inc_code = row['increment_code']
            
            tier = get_rating_tier(avg_rating)
            time_cat = parse_time_category(inc_code)
            op_family = get_opening_family(op_name)
            
            # Adicionar novos campos à linha tratada
            row['avg_rating'] = str(avg_rating)
            row['rating_tier'] = tier
            row['time_category'] = time_cat
            row['opening_family'] = op_family
            treated_rows.append(row)
            
            # Agregações
            total_turns += turns
            total_rating_sum += avg_rating
            overall_winners[winner] += 1
            overall_status[status] += 1
            time_control_stats[time_cat] += 1
            
            tier_turns[tier].append(turns)
            tier_victory_status[tier][status] += 1
            tier_winners[tier][winner] += 1
            
            op = openings_stats[op_name]
            op['total'] += 1
            op['eco'] = op_eco
            op['family'] = op_family
            op['turns_sum'] += turns
            if winner == 'white':
                op['white_wins'] += 1
            elif winner == 'black':
                op['black_wins'] += 1
            else:
                op['draws'] += 1
                
            fam = family_stats[op_family]
            fam['total'] += 1
            if winner == 'white':
                fam['white_wins'] += 1
            elif winner == 'black':
                fam['black_wins'] += 1
            else:
                fam['draws'] += 1

    total_games = len(treated_rows)
    print(f"Total de partidas processadas: {total_games}")

    # Salvar games_tratada.csv
    with open(CSV_OUTPUT, mode='w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(treated_rows)
    print(f"Base tratada salva com sucesso em: {CSV_OUTPUT}")

    # Processar dados calculados para o JSON do dashboard
    tier_order = [
        'Iniciante (<1400)',
        'Intermediário (1400-1800)',
        'Avançado (1800-2100)',
        'Mestre/Especialista (2100+)'
    ]
    
    turns_by_tier = []
    status_by_tier = []
    
    for t in tier_order:
        t_turns = tier_turns[t]
        count = len(t_turns)
        avg_t = round(sum(t_turns) / count, 2) if count > 0 else 0
        sorted_turns = sorted(t_turns)
        median_t = sorted_turns[count // 2] if count > 0 else 0
        
        turns_by_tier.append({
            'tier': t,
            'count': count,
            'avg_turns': avg_t,
            'median_turns': median_t,
            'min_turns': min(t_turns) if count > 0 else 0,
            'max_turns': max(t_turns) if count > 0 else 0,
        })
        
        st_counts = tier_victory_status[t]
        mate_pct = round(st_counts['mate'] / count * 100, 1) if count > 0 else 0
        resign_pct = round(st_counts['resign'] / count * 100, 1) if count > 0 else 0
        time_pct = round(st_counts['outoftime'] / count * 100, 1) if count > 0 else 0
        draw_pct = round(st_counts['draw'] / count * 100, 1) if count > 0 else 0
        
        status_by_tier.append({
            'tier': t,
            'count': count,
            'mate_pct': mate_pct,
            'resign_pct': resign_pct,
            'outoftime_pct': time_pct,
            'draw_pct': draw_pct,
            'mate_count': st_counts['mate'],
            'resign_count': st_counts['resign'],
            'outoftime_count': st_counts['outoftime'],
            'draw_count': st_counts['draw'],
        })

    # Aberturas com min 40 jogos
    qualified_openings = []
    for name, s in openings_stats.items():
        if s['total'] >= 40:
            white_win_pct = round(s['white_wins'] / s['total'] * 100, 1)
            black_win_pct = round(s['black_wins'] / s['total'] * 100, 1)
            draw_pct = round(s['draws'] / s['total'] * 100, 1)
            avg_turns = round(s['turns_sum'] / s['total'], 1)
            qualified_openings.append({
                'name': name,
                'eco': s['eco'],
                'family': s['family'],
                'total_games': s['total'],
                'white_wins': s['white_wins'],
                'black_wins': s['black_wins'],
                'draws': s['draws'],
                'white_win_pct': white_win_pct,
                'black_win_pct': black_win_pct,
                'draw_pct': draw_pct,
                'avg_turns': avg_turns
            })

    # Ordenar por win rate das brancas
    top_white_openings = sorted(qualified_openings, key=lambda x: x['white_win_pct'], reverse=True)[:15]
    
    # Mais jogadas no geral
    most_played_openings = sorted(qualified_openings, key=lambda x: x['total_games'], reverse=True)[:15]
    
    # Famílias de abertura mais frequentes (min 100 jogos)
    top_families = []
    for fam_name, s in family_stats.items():
        if s['total'] >= 100:
            top_families.append({
                'family': fam_name,
                'total_games': s['total'],
                'white_win_pct': round(s['white_wins'] / s['total'] * 100, 1),
                'black_win_pct': round(s['black_wins'] / s['total'] * 100, 1),
                'draw_pct': round(s['draws'] / s['total'] * 100, 1),
            })
    top_families = sorted(top_families, key=lambda x: x['total_games'], reverse=True)[:10]

    # Time control breakdown
    time_control_list = [
        {'category': cat, 'count': count, 'pct': round(count / total_games * 100, 1)}
        for cat, count in time_control_stats.most_common()
    ]

    # Agregações por Tier
    by_tier = {}
    for t in tier_order:
        t_games = [r for r in treated_rows if r['rating_tier'] == t]
        t_count = len(t_games)
        t_winners = Counter(r['winner'] for r in t_games)
        t_status = Counter(r['victory_status'] for r in t_games)
        t_turns = [int(r['turns']) for r in t_games]
        t_ratings = [float(r['avg_rating']) for r in t_games]
        
        # Aberturas no tier (min 15 jogos)
        t_ops = defaultdict(lambda: {'total': 0, 'white': 0, 'black': 0, 'draw': 0, 'turns': 0, 'eco': '', 'family': ''})
        for r in t_games:
            op = t_ops[r['opening_name']]
            op['total'] += 1
            op['eco'] = r['opening_eco']
            op['family'] = r['opening_family']
            op['turns'] += int(r['turns'])
            op[r['winner']] += 1
            
        t_top_white = []
        for name, s in t_ops.items():
            if s['total'] >= 15:
                t_top_white.append({
                    'name': name,
                    'eco': s['eco'],
                    'family': s['family'],
                    'total_games': s['total'],
                    'white_win_pct': round(s['white'] / s['total'] * 100, 1),
                    'black_win_pct': round(s['black'] / s['total'] * 100, 1),
                    'draw_pct': round(s['draw'] / s['total'] * 100, 1),
                    'avg_turns': round(s['turns'] / s['total'], 1)
                })
        t_top_white.sort(key=lambda x: x['white_win_pct'], reverse=True)
        
        by_tier[t] = {
            'count': t_count,
            'white_win_pct': round(t_winners['white'] / t_count * 100, 1) if t_count else 0,
            'black_win_pct': round(t_winners['black'] / t_count * 100, 1) if t_count else 0,
            'draw_pct': round(t_winners['draw'] / t_count * 100, 1) if t_count else 0,
            'avg_turns': round(sum(t_turns) / t_count, 1) if t_count else 0,
            'avg_rating': round(sum(t_ratings) / t_count, 0) if t_count else 0,
            'mate_pct': round(t_status['mate'] / t_count * 100, 1) if t_count else 0,
            'resign_pct': round(t_status['resign'] / t_count * 100, 1) if t_count else 0,
            'outoftime_pct': round(t_status['outoftime'] / t_count * 100, 1) if t_count else 0,
            'draw_status_pct': round(t_status['draw'] / t_count * 100, 1) if t_count else 0,
            'top_white_openings': t_top_white[:10]
        }

    # Objeto final formatado para o dashboard
    summary_data = {
        'kpis': {
            'total_games': total_games,
            'white_win_pct': round(overall_winners['white'] / total_games * 100, 1),
            'black_win_pct': round(overall_winners['black'] / total_games * 100, 1),
            'draw_pct': round(overall_winners['draw'] / total_games * 100, 1),
            'avg_turns': round(total_turns / total_games, 1),
            'avg_rating': round(total_rating_sum / total_games, 0),
            'total_openings_analyzed': len(openings_stats),
            'total_resign': overall_status['resign'],
            'total_mate': overall_status['mate'],
            'total_outoftime': overall_status['outoftime'],
            'total_draw_status': overall_status['draw']
        },
        'turns_by_tier': turns_by_tier,
        'status_by_tier': status_by_tier,
        'top_white_openings': top_white_openings,
        'most_played_openings': most_played_openings,
        'top_families': top_families,
        'time_control': time_control_list,
        'by_tier': by_tier,
        'all_qualified_openings': sorted(qualified_openings, key=lambda x: x['total_games'], reverse=True)
    }

    with open(JSON_OUTPUT, mode='w', encoding='utf-8') as f:
        json.dump(summary_data, f, ensure_ascii=False, indent=2)
    print(f"Sumário analítico do dashboard gerado em: {JSON_OUTPUT}")

if __name__ == '__main__':
    main()
