import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WitnessTestimonial } from '../data/witnesses';

interface WitnessCarouselProps {
  witnesses: WitnessTestimonial[];
  activeIndex?: number;
  onChangeIndex?: (index: number) => void;
  variant?: 'cream' | 'cyber';
}

export function WitnessCarousel({
  witnesses,
  activeIndex: controlledIndex,
  onChangeIndex,
  variant = 'cream',
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
  const cream = variant === 'cream';

  const handlePrev = () => {
    setIndex((activeIndex - 1 + witnesses.length) % witnesses.length);
  };

  const handleNext = () => {
    setIndex((activeIndex + 1) % witnesses.length);
  };

  return (
    <div
      className={`p-6 sm:p-10 lg:p-12 border ${
        cream
          ? 'bg-[#F5F3E9] border-[#071B27]/20 text-[#071B27] shadow-xs'
          : 'reticle-frame bg-[#0A1E2C] border-[#38BDF8]/25 text-[#F5F3E9]'
      }`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b font-mono text-xs ${
          cream ? 'border-[#071B27]/15' : 'border-[#38BDF8]/15'
        }`}
      >
        <span
          className={`uppercase tracking-widest font-semibold ${
            cream ? 'text-[#C93B35]' : 'text-[#38BDF8]'
          }`}
        >
          {current.caseFile}
        </span>
        <span
          className={`uppercase tracking-widest tabular-nums ${
            cream ? 'text-[#071B27]/65' : 'text-[#8FA7B8]'
          }`}
        >
          Record {String(activeIndex + 1).padStart(2, '0')} / {String(witnesses.length).padStart(2, '0')}
        </span>
      </div>

      <div className="min-h-[210px] flex flex-col justify-between transition-opacity duration-200">
        <div className="space-y-4">
          <span
            aria-hidden="true"
            className={`block font-serif text-6xl leading-none select-none ${
              cream ? 'text-[#C93B35]/60' : 'text-[#38BDF8]/50'
            }`}
          >
            &ldquo;
          </span>
          <blockquote
            className={`font-serif text-2xl sm:text-3xl leading-snug ${
              cream ? 'text-[#071B27]' : 'text-[#F5F3E9]'
            }`}
          >
            {current.quote}
          </blockquote>
        </div>

        <div
          className={`mt-10 pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
            cream ? 'border-[#071B27]/15' : 'border-[#38BDF8]/15'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 border flex items-center justify-center font-mono text-sm font-bold shrink-0 ${
                cream
                  ? 'bg-[#EAE8D8] border-[#071B27]/30 text-[#071B27]'
                  : 'bg-[#06141E] border-[#38BDF8]/40 text-[#38BDF8]'
              }`}
            >
              {current.initials}
            </div>
            <div>
              <p
                className={`font-display text-2xl font-bold uppercase tracking-wide ${
                  cream ? 'text-[#071B27]' : 'text-[#F5F3E9]'
                }`}
              >
                {current.name}
              </p>
              <p
                className={`font-mono text-xs mt-0.5 ${
                  cream ? 'text-[#071B27]/70' : 'text-[#8FA7B8]'
                }`}
              >
                {current.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous witness report"
              className={`w-11 h-11 inline-flex items-center justify-center border transition-colors cursor-pointer ${
                cream
                  ? 'border-[#071B27]/30 bg-[#EAE8D8] text-[#071B27] hover:bg-[#071B27] hover:text-[#F5F3E9]'
                  : 'border-[#38BDF8]/30 bg-[#06141E] text-[#F5F3E9] hover:border-[#38BDF8] hover:text-[#38BDF8]'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next witness report"
              className={`w-11 h-11 inline-flex items-center justify-center border transition-colors cursor-pointer ${
                cream
                  ? 'border-[#071B27]/30 bg-[#EAE8D8] text-[#071B27] hover:bg-[#071B27] hover:text-[#F5F3E9]'
                  : 'border-[#38BDF8]/30 bg-[#06141E] text-[#F5F3E9] hover:border-[#38BDF8] hover:text-[#38BDF8]'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div
        className={`mt-8 flex flex-wrap items-center gap-2 pt-6 border-t ${
          cream ? 'border-[#071B27]/12' : 'border-[#38BDF8]/10'
        }`}
        role="tablist"
        aria-label="Select witness report"
      >
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
                active
                  ? cream
                    ? 'w-10 bg-[#C93B35]'
                    : 'w-10 bg-[#38BDF8]'
                  : cream
                    ? 'w-4 bg-[#071B27]/20 hover:bg-[#071B27]/45'
                    : 'w-4 bg-[#38BDF8]/25 hover:bg-[#38BDF8]/50'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
