import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WitnessTestimonial } from '../data/witnesses';

interface WitnessCarouselProps {
  witnesses: WitnessTestimonial[];
  activeIndex?: number;
  onChangeIndex?: (index: number) => void;
}

export function WitnessCarousel({
  witnesses,
  activeIndex: controlledIndex,
  onChangeIndex,
}: WitnessCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);

  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const setIndex = (next: number) => {
    if (onChangeIndex) {
      onChangeIndex(next);
    } else {
      setInternalIndex(next);
    }
  };

  const current = witnesses[activeIndex] ?? witnesses[0];

  const handlePrev = () => {
    setIndex((activeIndex - 1 + witnesses.length) % witnesses.length);
  };

  const handleNext = () => {
    setIndex((activeIndex + 1) % witnesses.length);
  };

  return (
    <div className="reticle-frame bg-[#0A1E2C] border border-[#38BDF8]/25 p-6 sm:p-10 lg:p-12">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#38BDF8]/15 font-mono text-xs">
        <span className="text-[#38BDF8] uppercase tracking-widest">
          {current.caseFile}
        </span>
        <span className="text-[#8FA7B8] uppercase tracking-widest tabular-nums">
          Record {String(activeIndex + 1).padStart(2, '0')} / {String(witnesses.length).padStart(2, '0')}
        </span>
      </div>

      <div className="min-h-[210px] flex flex-col justify-between transition-opacity duration-200">
        <div className="space-y-5">
          <span
            aria-hidden="true"
            className="block font-serif text-6xl leading-none text-[#38BDF8]/50 select-none"
          >
            &ldquo;
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl leading-snug text-[#F5F3E9]">
            {current.quote}
          </blockquote>
        </div>

        <div className="mt-10 pt-6 border-t border-[#38BDF8]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#06141E] border border-[#38BDF8]/40 flex items-center justify-center font-mono text-sm font-bold text-[#38BDF8] shrink-0">
              {current.initials}
            </div>
            <div>
              <p className="font-display text-2xl font-bold uppercase tracking-wide text-[#F5F3E9]">
                {current.name}
              </p>
              <p className="font-mono text-xs text-[#8FA7B8] mt-0.5">
                {current.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous witness report"
              className="w-11 h-11 inline-flex items-center justify-center border border-[#38BDF8]/30 bg-[#06141E] text-[#F5F3E9] hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next witness report"
              className="w-11 h-11 inline-flex items-center justify-center border border-[#38BDF8]/30 bg-[#06141E] text-[#F5F3E9] hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="mt-8 flex items-center gap-2 pt-6 border-t border-[#38BDF8]/10" role="tablist" aria-label="Select witness report">
        {witnesses.map((w, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={w.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`View testimony by ${w.name}`}
              onClick={() => setIndex(idx)}
              className={`h-2.5 transition-all cursor-pointer ${
                active ? 'w-10 bg-[#38BDF8]' : 'w-4 bg-[#38BDF8]/25 hover:bg-[#38BDF8]/50'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
