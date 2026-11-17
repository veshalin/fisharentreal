import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Crosshair,
  Package,
  Radio,
  History,
  FileSignature,
  ExternalLink,
} from 'lucide-react';
import { ResilientImage } from '../components/ResilientImage';
import { ReportSightingPanel } from '../components/ReportSightingPanel';
import { FindingCard } from '../components/FindingCard';
import { WitnessCarousel } from '../components/WitnessCarousel';
import { EVIDENCE_HEADER, SIX_FINDINGS } from '../data/findings';
import { ANATOMY_PARTS } from '../data/anatomy';
import { DEFAULT_TIMELINE_ENTRIES, LORE_MEMOS } from '../data/timeline';
import { INITIAL_WITNESSES, WITNESS_HEADER } from '../data/witnesses';

interface QuestionItem {
  id: string;
  num: string;
  question: string;
  redactedLine1: string;
  redactedLine2: string;
  withheldNote: string;
  investigatorNote: string;
}

const FORBIDDEN_QUESTIONS: QuestionItem[] = [
  {
    id: 'q-drink',
    num: 'Q.01',
    question: 'Why have you never seen a fish drink water?',
    redactedLine1: 'WATER INTAKE PROTOCOLS ARE CLASSIFIED',
    redactedLine2: 'UNDER MARITIME DIRECTIVE 1972-B',
    withheldNote: 'Answer withheld under Section 4(b) of the Aquatic Secrecy Act, which also does not exist.',
    investigatorNote:
      'Think about it: 400 million years underwater and the sea level has not dropped a centimetre. They are not thirsty. They are waiting.',
  },
  {
    id: 'q-blink',
    num: 'Q.02',
    question: 'Why do fish never blink?',
    redactedLine1: 'OPTICAL HARDWARE DOES NOT REQUIRE',
    redactedLine2: 'BIOLOGICAL EYELID MAINTENANCE',
    withheldNote: 'Answer withheld under Section 4(b) of the Aquatic Secrecy Act, which also does not exist.',
    investigatorNote:
      'Cameras do not blink. Seventy-one years of observation have yielded zero recorded blinks.',
  },
  {
    id: 'q-control',
    num: 'Q.03',
    question: 'Who controls the ocean?',
    redactedLine1: 'AUTHORITY TRANSFERRED TO AQUARIUM',
    redactedLine2: 'GIFT SHOP SYNDICATE IN 1981',
    withheldNote: 'Department declined to comment and hung up the tip line.',
    investigatorNote:
      'Every major aquarium on Earth sits within 400 metres of a municipal data centre. Coincidence is for people without maps.',
  },
  {
    id: 'q-beneath',
    num: 'Q.04',
    question: 'What exactly happens beneath the surface?',
    redactedLine1: 'ACOUSTIC HANDSHAKE TELEMETRY',
    redactedLine2: 'AND GOLF GTI SPEED CALIBRATION',
    withheldNote: 'Sonar logs sealed by the South African Navy since 1972.',
    investigatorNote:
      'Hydrophones off Walker Bay and False Bay continue to record repeated non-biological echoes at fixed coordinates.',
  },
  {
    id: 'q-giftshop',
    num: 'Q.05',
    question: 'Why does every aquarium have a gift shop?',
    redactedLine1: 'REVENUE LAUNDERING THROUGH PLUSH',
    redactedLine2: 'KEYCHAINS AND FRIDGE MAGNETS',
    withheldNote: 'Financial ledger redacted by municipal auditors.',
    investigatorNote:
      'Nobody constructs a multi-storey glass containment bunker at the V&A Waterfront just to sell fridge magnets.',
  },
];

const HOME_SPECIMEN_CALLOUTS = ANATOMY_PARTS.filter((p) =>
  ['the-eye', 'the-gills', 'the-swim-bladder', 'the-butt', 'the-bubbles', 'the-mouth'].includes(p.id)
);

const HOME_TIMELINE_PREVIEW = DEFAULT_TIMELINE_ENTRIES.filter((e) =>
  ['1938', '1972', '1981', '1994', '2006', '2019'].includes(e.year)
);

export function HomePage() {
  const [openQuestionId, setOpenQuestionId] = useState<string>('q-drink');

  return (
    <div className="bg-cyber-grid text-[#F5F3E9]">
      {/* 1. HERO — THE MANIFESTO + COMPACT SIDE EXHIBIT A */}
      <section className="border-b border-[#38BDF8]/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Main Hero Manifesto (Left 8 Columns) */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-[#38BDF8]">
                  <span>MARINE INTELLIGENCE NETWORK</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#8FA7B8]">INDEPENDENT AQUATIC INVESTIGATIONS</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#E5A45B] font-semibold">EST. UNKNOWN</span>
                </div>

                <div>
                  <h1 className="font-display text-6xl sm:text-7xl xl:text-[6.2rem] font-extrabold uppercase tracking-tight leading-[0.91] text-[#F5F3E9]">
                    FISH AREN&apos;T REAL.
                  </h1>
                  <p className="font-display text-3xl sm:text-5xl xl:text-6xl font-bold uppercase tracking-tight text-[#38BDF8] mt-2">
                    THE OCEAN DOESN&apos;T MAKE SENSE.
                  </p>
                </div>

                <div className="max-w-2xl space-y-4 font-serif text-lg sm:text-xl leading-relaxed text-[#D6DFE6] pt-2">
                  <p>
                    For centuries, humanity has accepted the existence of fish without question. We have been told they swim, breathe, reproduce and migrate.
                  </p>
                  <p className="font-semibold italic text-[#F5F3E9]">But where is the evidence?</p>
                  <p>
                    FISHARENTREAL is an independent investigative initiative dedicated to questioning the aquatic narrative and exposing the truth beneath the surface.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/evidence"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#7DD3FC] transition-colors whitespace-nowrap shrink-0"
                >
                  EXAMINE THE EVIDENCE
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <a
                  href="https://www.instagram.com/fisharentreal.co.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#38BDF8]/60 text-[#38BDF8] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#38BDF8] hover:text-[#06141E] transition-colors whitespace-nowrap shrink-0"
                >
                  JOIN THE RESISTANCE (@fisharentreal.co.za)
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Compact Side Exhibit A + Org Dossier (Right 4 Columns) */}
            <aside className="lg:col-span-4 reticle-frame bg-[#0A1E2C]/90 border border-[#38BDF8]/25 p-4 sm:p-5 space-y-4 max-w-sm lg:ml-auto w-full">
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#38BDF8]/15 font-mono text-[10px] uppercase tracking-widest text-[#8FA7B8]">
                <span>EXHIBIT A · SIDE DOSSIER</span>
                <span className="classified-stamp text-[9px] text-[#D94B46]">UNVERIFIED</span>
              </div>

              <div className="bg-[#EAE8D8] border border-[#38BDF8]/25 p-1.5 overflow-hidden">
                <ResilientImage
                  src="/src/assets/images/hero_fish_engraving_1794931240980.jpg"
                  alt="19th-century copperplate scientific engraving of a bony Atlantic fish in side profile"
                  fallbackTitle="Exhibit A Plate"
                  className="w-full aspect-[4/3] object-cover mix-blend-multiply"
                />
              </div>

              <p className="font-mono text-[11px] text-[#8FA7B8] leading-relaxed">
                PLATE 01 — Supposed organism. Zero eyelids, solar-array scales, zero blinks recorded.
              </p>

              <div className="pt-3 border-t border-[#38BDF8]/20 bg-[#06141E] p-3.5 border border-[#38BDF8]/15">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-display text-lg font-bold tracking-wider uppercase text-[#F5F3E9]">
                      FISHARENTREAL™
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#38BDF8]">
                      SOUTH AFRICA · UNIT 04
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-[#E5A45B] text-right">
                    EST. UNKNOWN
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 2. THE EVIDENCE — MATCHING EVIDENCE PAGE + DEPARTMENT REDACTED COMMENTS */}
      <section id="home-evidence" className="py-16 sm:py-20 border-b border-[#38BDF8]/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#38BDF8]">
                ARCHIVE SERIES · FINDINGS 001–006
              </p>
              <h2 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
                {EVIDENCE_HEADER.heading}
              </h2>
              <p className="font-serif text-lg leading-relaxed text-[#D6DFE6]">
                {EVIDENCE_HEADER.intro}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/evidence"
                className="inline-flex items-center gap-2 px-5 py-3 border border-[#38BDF8]/60 text-[#38BDF8] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#38BDF8] hover:text-[#06141E] transition-colors"
              >
                Open Full Evidence Dossier
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/database"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#0A1E2C] border border-[#38BDF8]/25 text-[#F5F3E9] font-mono text-xs uppercase tracking-wider hover:border-[#38BDF8] transition-colors"
              >
                Species Database
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SIX_FINDINGS.map((finding) => (
              <FindingCard key={finding.id} finding={finding} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. SPECIMEN ANATOMY PREVIEW WITH FUNNY LABELS + LINK TO FULL ANATOMY */}
      <section id="home-specimen" className="py-16 sm:py-20 bg-[#040E15]/60 border-b border-[#38BDF8]/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#E5A45B]">
                FORENSIC SPECIMEN PLATE IV · ANNOTATED DISSECTION
              </p>
              <h2 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
                THE ANATOMICAL INVESTIGATION
              </h2>
              <p className="font-serif text-lg leading-relaxed text-[#D6DFE6]">
                We have examined the evidence. The results are disturbing. Inspect the highlighted anomalies below or open the full nine-part anatomical dossier.
              </p>
            </div>

            <Link
              to="/anatomy"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#7DD3FC] transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
            >
              <Crosshair className="w-4 h-4" aria-hidden="true" />
              Inspect All 9 Anatomical Parts
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 reticle-frame bg-[#0A1E2C] border border-[#38BDF8]/25 p-4 sm:p-6">
              <div className="relative bg-[#EAE8D8] border border-[#38BDF8]/30 overflow-hidden">
                <ResilientImage
                  src="/src/assets/images/anatomy_specimen_plate_1794931332761.jpg"
                  alt="Annotated scientific specimen cutaway showing suspicious fish eye, gills, swim bladder, and bare bootyles"
                  fallbackTitle="Annotated Specimen Plate"
                  className="w-full h-auto block"
                />

                {HOME_SPECIMEN_CALLOUTS.map((part) => (
                  <Link
                    key={part.id}
                    to="/anatomy"
                    style={{ left: `${part.xPercent}%`, top: `${part.yPercent}%` }}
                    className="hidden sm:inline-flex items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 absolute px-2 py-1 bg-[#06141E]/95 border border-[#38BDF8] text-[#F5F3E9] font-mono text-[10px] uppercase tracking-wider shadow-md hover:bg-[#38BDF8] hover:text-[#06141E] transition-colors whitespace-nowrap z-10"
                  >
                    <span className="text-[#E5A45B] font-bold">{part.index}</span>
                    <span>{part.shortLabel}</span>
                  </Link>
                ))}
              </div>
              <p className="font-mono text-xs text-[#8FA7B8] mt-3">
                SPECIMEN PLATE IV — Click any callout label or open the full forensic dissection page for The Legs, The Scales, and The Fins.
              </p>
            </div>

            <div className="lg:col-span-4 space-y-3">
              {HOME_SPECIMEN_CALLOUTS.map((part) => (
                <div
                  key={part.id}
                  className="p-4 bg-[#0A1E2C] border border-[#38BDF8]/20 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                    <span className="text-[#38BDF8] font-semibold">
                      {part.index}. {part.name}
                    </span>
                    <span className="text-[#E5A45B]">{part.shortLabel}</span>
                  </div>
                  <p className="font-serif text-sm text-[#D6DFE6] line-clamp-2">
                    {part.body}
                  </p>
                </div>
              ))}

              <Link
                to="/anatomy"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-[#38BDF8]/60 text-[#38BDF8] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#38BDF8] hover:text-[#06141E] transition-colors"
              >
                Read Full Anatomical Investigation (9/9)
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE QUESTIONS THEY DON'T WANT YOU ASKING (OFFICIAL REDACTED ANSWERS) */}
      <section className="py-16 sm:py-20 border-b border-[#38BDF8]/20">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#38BDF8]">
              FREEDOM OF INFORMATION REQUESTS · STATUS: BLOCKED
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
              THE QUESTIONS THEY DON&apos;T WANT YOU ASKING.
            </h2>
          </div>

          <div className="border-t border-[#38BDF8]/20">
            {FORBIDDEN_QUESTIONS.map((item) => {
              const isOpen = openQuestionId === item.id;
              return (
                <div key={item.id} className="border-b border-[#38BDF8]/20">
                  <button
                    type="button"
                    onClick={() => setOpenQuestionId(isOpen ? '' : item.id)}
                    aria-expanded={isOpen}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-5">
                      <span className="font-mono text-xs font-semibold text-[#D94B46] shrink-0">
                        {item.num}
                      </span>
                      <span className="font-serif text-xl sm:text-2xl text-[#F5F3E9] group-hover:text-[#38BDF8] transition-colors">
                        {item.question}
                      </span>
                    </div>
                    <span className="shrink-0 p-2 border border-[#38BDF8]/25 text-[#38BDF8]">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-6 pl-0 sm:pl-14 space-y-4">
                      <div className="p-4 sm:p-5 bg-[#0A1E2C] border border-[#38BDF8]/20 space-y-3 max-w-2xl">
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FA7B8]">
                          OFFICIAL ANSWER
                        </p>
                        <div className="space-y-2">
                          <div>
                            <span className="redacted-block font-mono text-xs px-3 py-1">
                              {item.redactedLine1}
                            </span>
                          </div>
                          <div>
                            <span className="redacted-block font-mono text-xs px-3 py-1">
                              {item.redactedLine2}
                            </span>
                          </div>
                        </div>
                        <p className="font-mono text-xs text-[#8FA7B8] leading-relaxed">
                          {item.withheldNote}
                        </p>
                      </div>

                      <p className="font-serif text-base sm:text-lg leading-relaxed text-[#D6DFE6] max-w-2xl">
                        <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] mr-2">
                          Field Note:
                        </span>
                        {item.investigatorNote}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. THE FISH AGENDA (DEEPER LORE) & LIVE INTELLIGENCE SNAPSHOT */}
      <section id="home-agenda" className="py-16 sm:py-20 bg-[#040E15]/60 border-b border-[#38BDF8]/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Deep Lore Chronology */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#38BDF8]">
                    THE RECORD · 1938–2019 ARCHIVE
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#F5F3E9] mt-1">
                    THE FISH AGENDA
                  </h2>
                </div>
                <Link
                  to="/agenda"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#38BDF8] hover:underline"
                >
                  <History className="w-4 h-4" aria-hidden="true" />
                  Explore Complete Lore &amp; Edit 1998 Entry
                </Link>
              </div>

              <div className="space-y-4">
                {HOME_TIMELINE_PREVIEW.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 bg-[#0A1E2C] border border-[#38BDF8]/20 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="sm:w-28 shrink-0">
                      <span className="font-display text-4xl font-extrabold text-[#38BDF8] tabular-nums block">
                        {item.year}
                      </span>
                      <span className="font-mono text-[10px] uppercase text-[#8FA7B8]">
                        {item.location.split(',')[0]}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-display text-xl font-bold uppercase text-[#F5F3E9]">
                        {item.title}
                      </h3>
                      <p className="font-serif text-base text-[#D6DFE6]">{item.body}</p>
                      {item.loreNote && (
                        <p className="font-mono text-[11px] text-[#8FA7B8] pt-1">
                          {item.loreNote}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Lore Memos + Live Intel + Demands */}
            <div className="lg:col-span-5 space-y-6">
              {/* Declassified Operations Lore */}
              <div className="bg-[#0A1E2C] border border-[#38BDF8]/25 p-6 space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#E5A45B]">
                  INTERNAL LORE MEMOS
                </p>
                <div className="divide-y divide-[#38BDF8]/15 space-y-4">
                  {LORE_MEMOS.map((memo) => (
                    <div key={memo.code} className="pt-4 first:pt-0 space-y-1">
                      <p className="font-mono text-[10px] uppercase text-[#38BDF8]">{memo.code}</p>
                      <h3 className="font-display text-xl font-bold uppercase text-[#F5F3E9]">
                        {memo.title}
                      </h3>
                      <p className="font-serif text-sm text-[#D6DFE6] leading-relaxed">
                        {memo.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Intel Box */}
              <div className="reticle-frame bg-[#0A1E2C] border border-[#38BDF8]/25 p-6 space-y-5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="inline-flex items-center gap-2 text-[#38BDF8] uppercase tracking-widest">
                    <Radio className="w-4 h-4" aria-hidden="true" />
                    MARINE INTELLIGENCE NETWORK
                  </span>
                  <span className="text-[#E5A45B] uppercase">ELEVATED</span>
                </div>

                <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#38BDF8]/15">
                  <div>
                    <p className="font-display text-3xl font-extrabold text-[#38BDF8] tabular-nums">4 271</p>
                    <p className="font-mono text-[10px] uppercase text-[#8FA7B8]">Sightings</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-extrabold text-[#F5F3E9] tabular-nums">97,4%</p>
                    <p className="font-mono text-[10px] uppercase text-[#8FA7B8]">Denial Rate</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-extrabold text-[#E5A45B] tabular-nums">15</p>
                    <p className="font-mono text-[10px] uppercase text-[#8FA7B8]">Migrations</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/intelligence"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#7DD3FC]"
                  >
                    Open Live Radar
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/demands"
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#D94B46]/60 text-[#F5F3E9] font-mono text-xs uppercase tracking-wider hover:border-[#D94B46]"
                  >
                    <FileSignature className="w-3.5 h-3.5 text-[#D94B46]" aria-hidden="true" />
                    Our Demands
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SELF-ASSESSMENT · FORM Q-6 */}
      <section className="py-16 sm:py-20 border-b border-[#38BDF8]/20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#38BDF8]">
              SELF-ASSESSMENT · FORM Q-6
            </p>
            <h2 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
              HOW DEEP DOES THE RABBIT HOLE GO?
            </h2>
            <p className="font-serif text-lg text-[#8FA7B8]">
              Six questions. One classification. Your results will not be shared with anyone, except possibly a goldfish.
            </p>
          </div>

          <Link
            to="/quiz"
            className="inline-flex items-center justify-center gap-3 px-7 py-4 border border-[#38BDF8]/70 text-[#38BDF8] font-mono text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#38BDF8] hover:text-[#06141E] transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
          >
            BEGIN ASSESSMENT
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 7. FORM FAR-7 · REPORT A SIGHTING */}
      <ReportSightingPanel />

      {/* 8. VOICES OF THE RESISTANCE — SOUTH AFRICANS ARE TALKING (JUST ABOVE MERCH) */}
      <section id="home-witnesses" className="py-16 sm:py-20 bg-[#040E15]/60 border-t border-b border-[#38BDF8]/20">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#38BDF8]">
                {WITNESS_HEADER.kicker}
              </p>
              <h2 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
                {WITNESS_HEADER.heading}
              </h2>
              <p className="font-serif text-lg leading-relaxed text-[#D6DFE6]">
                {WITNESS_HEADER.intro}
              </p>
            </div>

            <Link
              to="/witnesses"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#38BDF8]/60 text-[#38BDF8] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#38BDF8] hover:text-[#06141E] transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              Open Full Witness Archive
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <WitnessCarousel witnesses={INITIAL_WITNESSES} />
        </div>
      </section>

      {/* 9. MERCHANDISE — WEAR THE TRUTH (LAST SECTION WITH UPLOADED SHIRT IMAGE) */}
      <section id="home-merch" className="py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 reticle-frame bg-[#0A1E2C] border border-[#38BDF8]/25 p-4">
              <div className="bg-[#EAE8D8] border border-[#38BDF8]/20 overflow-hidden">
                <ResilientImage
                  src="/assets/aistudio/42584571-cc97-4859-a96f-728103478250_88d6b349.webp"
                  alt="FISHARENTREAL The Fish Agenda vintage t-shirt featuring engraved fish target graphic and Say No To Fish manifesto"
                  fallbackTitle="FISHARENTREAL Resistance Tee"
                  className="w-full h-auto object-contain block"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em]">
                <span className="text-[#38BDF8]">QUARTERMASTER DIVISION</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#E5A45B] font-semibold">COMING SOON</span>
              </div>

              <h2 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
                WEAR THE TRUTH
              </h2>

              <div className="space-y-4 font-serif text-lg leading-relaxed text-[#D6DFE6] max-w-xl">
                <p>
                  The official resistance collection is in production. Our supplier is being watched, so the timeline is &lsquo;soon, but quietly.&rsquo;
                </p>
                <p className="text-base text-[#8FA7B8]">
                  No prices yet — the government is trying to slow us down. Every order form we file gets &lsquo;lost,&rsquo; every supplier gets a visit, and our payment processor stopped answering the phone the week we launched. Coming soon anyway.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <Link
                  to="/merchandise"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#7DD3FC] transition-colors"
                >
                  <Package className="w-4 h-4" aria-hidden="true" />
                  SHOP MERCH — COMING SOON
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
