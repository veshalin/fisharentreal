import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Crosshair } from 'lucide-react';
import { ANATOMY_HEADER, ANATOMY_PARTS } from '../data/anatomy';
import { ResilientImage } from '../components/ResilientImage';

export function AnatomyPage() {
  const [selectedId, setSelectedId] = useState<string>(ANATOMY_PARTS[0].id);

  const selectedPart = ANATOMY_PARTS.find((p) => p.id === selectedId) ?? ANATOMY_PARTS[0];

  return (
    <div className="bg-cyber-grid text-[#F5F3E9] py-14 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#38BDF8]">
            <span>FORENSIC PATHOLOGY DIVISION</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E5A45B]">PLATE IV</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
            {ANATOMY_HEADER.heading}
          </h1>
          <p className="font-serif text-xl text-[#D6DFE6] leading-relaxed">
            {ANATOMY_HEADER.supporting}
          </p>
        </header>

        {/* Two-Column Forensic Specimen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Sticky Plate with Visible Funny Callout Labels */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 reticle-frame bg-[#0A1E2C] border border-[#38BDF8]/25 p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#38BDF8]/20 font-mono text-[11px] uppercase tracking-widest text-[#8FA7B8]">
              <span>SPECIMEN DIAGRAM · LATERAL CUTAWAY</span>
              <span className="flex items-center gap-1.5 text-[#38BDF8] font-semibold">
                <Crosshair className="w-3.5 h-3.5" aria-hidden="true" />
                {selectedPart.index} · {selectedPart.name} ({selectedPart.shortLabel})
              </span>
            </div>

            {/* Plate Image + Interactive Annotated Callout Tags */}
            <div className="relative w-full overflow-hidden border border-[#38BDF8]/30 bg-[#EAE8D8]">
              <ResilientImage
                src="/src/assets/images/anatomy_specimen_plate_1794931332761.jpg"
                alt="Vintage scientific anatomical lithograph of a fish cutaway specimen with suspicious features labelled"
                fallbackTitle="Anatomical Plate IV"
                className="w-full h-auto block select-none"
              />

              {ANATOMY_PARTS.map((part) => {
                const active = part.id === selectedId;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setSelectedId(part.id)}
                    aria-label={`Inspect ${part.name}: ${part.shortLabel}`}
                    aria-pressed={active}
                    style={{ left: `${part.xPercent}%`, top: `${part.yPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                      active
                        ? 'bg-[#D94B46] text-[#F5F3E9] border border-[#F5F3E9] scale-110 z-20'
                        : 'bg-[#06141E]/92 text-[#F5F3E9] border border-[#38BDF8]/70 hover:bg-[#38BDF8] hover:text-[#06141E] z-10'
                    }`}
                  >
                    <span className={`font-bold ${active ? 'text-[#F5F3E9]' : 'text-[#E5A45B]'}`}>
                      {part.index}
                    </span>
                    <span className="hidden md:inline">{part.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            <p className="font-mono text-xs text-[#8FA7B8] mt-3">
              {ANATOMY_HEADER.plateCaption}
            </p>

            {/* Quick Spotlight Card under Plate */}
            <div className="mt-5 p-5 bg-[#06141E] border border-[#38BDF8]/25">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase tracking-widest text-[#38BDF8] mb-2">
                <span>
                  CALLOUT {selectedPart.index} · {selectedPart.code}
                </span>
                <span className="text-[#E5A45B]">{selectedPart.shortLabel}</span>
              </div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-[#F5F3E9] mb-2">
                {selectedPart.name}
              </h2>
              <p className="font-serif text-base leading-relaxed text-[#D6DFE6] mb-3">
                {selectedPart.body}
              </p>
              <p className="font-mono text-xs text-[#8FA7B8] pt-3 border-t border-[#38BDF8]/15">
                Forensic Note: {selectedPart.forensicNote}
              </p>
            </div>
          </div>

          {/* Right Column: Complete 9-Part Textbook Dossier */}
          <div className="lg:col-span-5 space-y-4">
            <div className="pb-3 border-b border-[#38BDF8]/20 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#8FA7B8]">
              <span>9 SUSPICIOUS COMPONENTS</span>
              <span>CLICK TO PINPOINT</span>
            </div>

            {ANATOMY_PARTS.map((part) => {
              const active = part.id === selectedId;
              return (
                <article
                  key={part.id}
                  onClick={() => setSelectedId(part.id)}
                  className={`p-5 border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0E2738] border-[#38BDF8]'
                      : 'bg-[#0A1E2C]/80 border-[#38BDF8]/20 hover:border-[#38BDF8]/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 inline-flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                          active ? 'bg-[#D94B46] text-[#F5F3E9]' : 'bg-[#06141E] border border-[#38BDF8]/40 text-[#38BDF8]'
                        }`}
                      >
                        {part.index}
                      </span>
                      <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#F5F3E9]">
                        {part.name}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#E5A45B] text-right">
                      {part.shortLabel}
                    </span>
                  </div>

                  <p className="font-serif text-base leading-relaxed text-[#D6DFE6] mt-2">
                    {part.body}
                  </p>

                  <p className="mt-3 pt-2.5 border-t border-[#38BDF8]/12 font-mono text-[11px] text-[#8FA7B8]">
                    {part.forensicNote}
                  </p>
                </article>
              );
            })}

            <div className="pt-4">
              <Link
                to="/intelligence"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#7DD3FC] transition-colors"
              >
                Proceed to Live Coastal Intelligence
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
