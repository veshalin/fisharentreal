import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EVIDENCE_HEADER, SIX_FINDINGS } from '../data/findings';
import { FindingCard } from '../components/FindingCard';

export function EvidencePage() {
  return (
    <div className="bg-cyber-grid text-[#F5F3E9] py-14 sm:py-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centred Header */}
        <header className="max-w-2xl mx-auto text-center space-y-4 mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#38BDF8]">
            CLASSIFIED ARCHIVE · SERIES 001–006
          </p>
          <h1 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
            {EVIDENCE_HEADER.heading}
          </h1>
          <p className="font-serif text-lg sm:text-xl leading-relaxed text-[#D6DFE6]">
            {EVIDENCE_HEADER.intro}
          </p>
        </header>

        {/* Grid of Six Investigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SIX_FINDINGS.map((finding) => (
            <FindingCard key={finding.id} finding={finding} />
          ))}
        </div>

        {/* Bottom Progression Prompt */}
        <div className="mt-14 pt-10 border-t border-[#38BDF8]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#E5A45B]">
              NEXT STAGE OF REVIEW
            </p>
            <p className="font-serif text-lg text-[#F5F3E9] mt-1">
              You have read the six findings. Proceed to the anatomical specimen examination.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/anatomy"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#7DD3FC] transition-colors"
            >
              Inspect Fish Anatomy
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/database"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#38BDF8]/50 text-[#38BDF8] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#38BDF8] hover:text-[#06141E] transition-colors"
            >
              Search Species Database
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
