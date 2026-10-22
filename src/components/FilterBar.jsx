'use client';

import { useState, useEffect, useRef } from 'react';
import { Filter, RotateCcw, Check, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FilterBar({ selectedTier, onSelectTier, countsByTier }) {
  const totalGames = 20058;
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const tiers = [
    {
      id: 'Todos',
      shortName: 'Geral',
      range: 'Todos os Ratings',
      count: totalGames,
      pct: '100%',
    },
    {
      id: 'Iniciante (<1400)',
      shortName: 'Iniciante',
      range: '< 1400 Elo',
      count: countsByTier['Iniciante (<1400)'] || 4846,
      pct: '24.2%',
    },
    {
      id: 'Intermediário (1400-1800)',
      shortName: 'Intermediário',
      range: '1400 – 1800 Elo',
      count: countsByTier['Intermediário (1400-1800)'] || 10746,
      pct: '53.6%',
    },
    {
      id: 'Avançado (1800-2100)',
      shortName: 'Avançado',
      range: '1800 – 2100 Elo',
      count: countsByTier['Avançado (1800-2100)'] || 3749,
      pct: '18.7%',
    },
    {
      id: 'Mestre/Especialista (2100+)',
      shortName: 'Mestre / Especialista',
      range: '2100+ Elo',
      count: countsByTier['Mestre/Especialista (2100+)'] || 717,
      pct: '3.6%',
    },
  ];

  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      // If container overflows horizontally
      if (el.scrollWidth <= el.clientWidth) return;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const canLeft = el.scrollLeft > 0 && e.deltaY < 0;
        const canRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 1 && e.deltaY > 0;
        if (canLeft || canRight) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
          updateScrollState();
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    // Initial check
    updateScrollState();

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  // When selectedTier changes, ensure it scrolls into view if needed
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const selectedBtn = el.querySelector('[data-selected="true"]');
    if (selectedBtn) {
      selectedBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [selectedTier]);

  const scrollByAmount = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const shift = direction === 'left' ? -180 : 180;
    el.scrollBy({ left: shift, behavior: 'smooth' });
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0 || !scrollContainerRef.current) return;
    isMouseDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDownRef.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
      if (!isDragging) setIsDragging(true);
    }
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    updateScrollState();
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    isMouseDownRef.current = false;
    setIsDragging(false);
  };

  return (
    <div className="glass-panel rounded-2xl p-3.5 sm:p-5 mb-6 border border-slate-200 dark:border-gray-800/80 shadow-sm dark:shadow-xl">
      {/* Top Header of the filter section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-200 dark:border-gray-800/70">
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <div className="p-1.5 sm:p-2 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/20 shadow-xs shrink-0">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm sm:text-base font-black text-slate-950 dark:text-white tracking-tight">
                Filtrar por Nível de Habilidade
              </h2>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 dark:text-gray-300 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-gray-800/80 border border-slate-300 dark:border-gray-700/60">
                Segmentação Elo
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-gray-400 mt-0.5 hidden sm:block font-medium">
              Selecione uma faixa para recalcular instantaneamente os KPIs, gráficos e aberturas
            </p>
          </div>
        </div>

        {/* Status / Reset button + Arrow controls for small screen */}
        <div className="flex items-center justify-between sm:justify-end space-x-2 w-full sm:w-auto">
          {/* Mobile / Small screen Carousel Navigation */}
          <div className="flex items-center space-x-1.5 sm:hidden">
            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              disabled={!canScrollLeft}
              title="Rolar opções para esquerda"
              aria-label="Rolar opções para esquerda"
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-gray-800/90 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-800 dark:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-300 dark:border-gray-700 transition shadow-2xs cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-slate-600 dark:text-gray-400 font-semibold px-0.5 select-none">
              5 níveis
            </span>
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              disabled={!canScrollRight}
              title="Rolar opções para direita"
              aria-label="Rolar opções para direita"
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-gray-800/90 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-800 dark:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-300 dark:border-gray-700 transition shadow-2xs cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {selectedTier !== 'Todos' ? (
            <button
              onClick={() => onSelectTier('Todos')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10 hover:bg-amber-200 dark:hover:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 transition-all shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar Filtro</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1.5 text-xs text-slate-700 dark:text-gray-400 px-3 py-1 rounded-lg bg-slate-100 dark:bg-gray-800/40 border border-slate-200 dark:border-gray-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>Visão global</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid on desktop / Horizontal Snap Carousel on small viewports */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`flex sm:grid overflow-x-auto sm:overflow-x-visible pb-2.5 sm:pb-0 gap-2.5 sm:gap-3 snap-x custom-scrollbar sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 -mx-1 px-1 sm:mx-0 sm:px-0 ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab sm:cursor-default'
          }`}
        >
          {tiers.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <button
                key={tier.id}
                data-selected={isSelected}
                draggable={false}
                onFocus={(e) => {
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                }}
                onClick={() => {
                  if (hasDraggedRef.current) return;
                  onSelectTier(tier.id);
                }}
                className={`group relative text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between cursor-pointer shrink-0 w-[160px] sm:w-auto snap-start select-none ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-slate-950 dark:text-white shadow-md shadow-amber-500/10 ring-1 ring-amber-500'
                    : 'bg-slate-50/90 hover:bg-slate-100 dark:bg-gray-900/60 dark:hover:bg-gray-800/80 border-slate-200 hover:border-slate-300 dark:border-gray-800/90 dark:hover:border-gray-700 text-slate-800 dark:text-gray-300 shadow-xs'
                }`}
              >
                {/* Selected Checkmark Indicator */}
                <div className="flex items-start justify-between gap-1 mb-2">
                  <span
                    className={`text-xs font-black tracking-tight truncate ${
                      isSelected ? 'text-amber-800 dark:text-amber-400' : 'text-slate-950 dark:text-gray-200 group-hover:text-amber-800 dark:group-hover:text-white'
                    }`}
                  >
                    {tier.shortName}
                  </span>

                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-gray-950 shadow-xs'
                        : 'border border-slate-400 dark:border-gray-700 group-hover:border-slate-600 dark:group-hover:border-gray-500'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Rating Range */}
                <div className="text-[11px] text-slate-700 dark:text-gray-400 font-mono font-medium mb-2">
                  {tier.range}
                </div>

                {/* Bottom Count and Percentage Pill */}
                <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-200 dark:border-gray-800/60 mt-auto">
                  <span className={isSelected ? 'text-amber-900 dark:text-amber-200 font-bold' : 'text-slate-700 dark:text-gray-400 font-medium'}>
                    {tier.count.toLocaleString('pt-BR')} partidas
                  </span>
                  <span
                    className={`px-1.5 py-0.2 rounded font-bold ${
                      isSelected
                        ? 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-300 dark:border-transparent'
                        : 'bg-slate-200/90 dark:bg-gray-800 text-slate-800 dark:text-gray-400 border border-slate-300/80 dark:border-transparent'
                    }`}
                  >
                    {tier.pct}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

