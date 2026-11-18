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
import { SpecimenDiagram } from '../components/SpecimenDiagram';
import { ReportSightingPanel } from '../components/ReportSightingPanel';
import { FindingCard } from '../components/FindingCard';
import { WitnessCarousel } from '../components/WitnessCarousel';
import { EVIDENCE_HEADER, SIX_FINDINGS } from '../data/findings';
import { ANATOMY_PARTS } from '../data/anatomy';
import { DEFAULT_TIMELINE_ENTRIES } from '../data/timeline';
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
      "Every major aquarium on Earth sits within 400 metres of a municipal data centre. Coincidence is a word made up by people who can't read maps.",
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

const HOME_SPECIMEN_HIGHLIGHTS = ANATOMY_PARTS.filter((p) =>
  ['the-bubbles', 'the-eye', 'the-fins', 'the-gills', 'the-swim-bladder', 'the-butt'].includes(p.id)
);

const HOME_TIMELINE_PREVIEW = DEFAULT_TIMELINE_ENTRIES.filter((e) =>
  ['1938', '1972', '1981'].includes(e.year)
);

export function HomePage() {
  const [openQuestionId, setOpenQuestionId] = useState<string>('q-drink');

  return (
    <div>
      {/* ==================================================================== */}
      {/* 1. HERO (BEIGE PAPER) — MANIFESTO + SIDE EXHIBIT A                   */}
      {/* ==================================================================== */}
      <section className="relative overflow-hidden bg-ruled-ledger text-[#071B27] border-b border-[#071B27]/15">
        {/* Low-opacity institutional seal watermark below header */}
        <img
          src="/assets/aistudio/image_ef3736ae.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-4 left-1/2 -translate-x-1/2 md:left-[30%] w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full object-contain opacity-[0.075] mix-blend-multiply"
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Main Hero Manifesto */}
            <div className="md:col-span-8 flex flex-col justify-between space-y-7">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-[#071B27]/75">
                  <span>MARINE INTELLIGENCE NETWORK</span>
                  <span aria-hidden="true">·</span>
                  <span>INDEPENDENT AQUATIC INVESTIGATIONS</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#C93B35] font-semibold">EST. 2016</span>
                </div>

                <div>
                  <h1 className="font-display text-5xl sm:text-7xl xl:text-[6.2rem] font-extrabold uppercase tracking-tight leading-[0.91] text-[#071B27]">
                    FISH AREN&apos;T REAL.
                  </h1>
                  <p className="font-display text-3xl sm:text-5xl xl:text-6xl font-bold uppercase tracking-tight text-[#C93B35] mt-2">
                    THE OCEAN DOESN&apos;T MAKE SENSE.
                  </p>
                </div>

                <div className="max-w-2xl space-y-3.5 font-serif text-lg sm:text-xl leading-relaxed text-[#071B27]/90 pt-1">
                  <p>
                    For centuries, humanity has accepted the existence of fish without question. We have been told they swim, breathe, reproduce and migrate.
                  </p>
                  <p className="font-semibold italic text-[#071B27]">But where is the evidence?</p>
                  <p>
                    FISHARENTREAL is an independent investigative initiative dedicated to questioning the aquatic narrative and exposing the truth beneath the surface.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  to="/evidence"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#071B27] text-[#F5F3E9] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#0B2535] transition-colors whitespace-nowrap shrink-0"
                >
                  EXAMINE THE FACTS
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <a
                  href="https://www.instagram.com/fisharentreal.co.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 border-2 border-[#071B27] text-[#071B27] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#071B27] hover:text-[#F5F3E9] transition-colors whitespace-nowrap shrink-0"
                >
                  JOIN THE RESISTANCE
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Side Exhibit A Dossier (strictly on the right side) */}
            <aside className="md:col-span-4 bg-[#F5F3E9] border border-[#071B27]/20 p-4 sm:p-5 space-y-3.5 max-w-xs md:ml-auto w-full shadow-xs">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#071B27]/15 font-mono text-[10px] uppercase tracking-widest text-[#071B27]/70">
                <span>EXHIBIT A · SIDE DOSSIER</span>
                <span className="classified-stamp text-[9px] text-[#C93B35]">UNVERIFIED</span>
              </div>

              <div className="bg-[#EAE8D8] border border-[#071B27]/15 p-1.5 overflow-hidden">
                <ResilientImage
                  src="/src/assets/images/hero_fish_engraving_1794931240980.jpg"
                  alt="19th-century copperplate scientific engraving of a bony Atlantic fish in side profile"
                  fallbackTitle="Exhibit A Plate"
                  className="w-full aspect-[4/3] object-cover mix-blend-multiply"
                />
              </div>

              <p className="font-mono text-[11px] text-[#071B27]/75 leading-relaxed">
                PLATE 01 — Supposed organism. Zero eyelids, solar-array scales, zero blinks recorded.
              </p>

              <div className="bg-[#071B27] text-[#F5F3E9] p-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-display text-base font-bold tracking-wider uppercase">
                      FISHARENTREAL™
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#38BDF8]">
                      SOUTH AFRICA · UNIT 04
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-[#E5A45B] text-right">
                    EST. 2016
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. THE FACTS (BEIGE PAPER)                                           */}
      {/* ==================================================================== */}
      <section id="home-facts" className="bg-ruled-ledger text-[#071B27] py-16 sm:py-20 border-b border-[#071B27]/15">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-2.5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#C93B35]">
                ARCHIVE SERIES · FINDINGS 001–006
              </p>
              <h2 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#071B27]">
                {EVIDENCE_HEADER.heading}
              </h2>
              <p className="font-serif text-lg leading-relaxed text-[#071B27]/85">
                {EVIDENCE_HEADER.intro}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/evidence"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#071B27] text-[#F5F3E9] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#0B2535] transition-colors"
              >
                Open Full Facts Dossier
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/database"
                className="inline-flex items-center gap-2 px-5 py-3 border border-[#071B27]/40 bg-[#F5F3E9] text-[#071B27] font-mono text-xs uppercase tracking-wider hover:border-[#071B27] transition-colors"
              >
                Species Database
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SIX_FINDINGS.map((finding) => (
              <FindingCard key={finding.id} finding={finding} variant="cream" />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. FISH ANATOMY. WTF IS GOING ON HERE? (BEIGE PAPER)                 */}
      {/* ==================================================================== */}
      <section id="home-specimen" className="bg-ruled-ledger text-[#071B27] py-16 sm:py-20 border-b border-[#071B27]/20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-2.5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#C93B35]">
                FORENSIC SPECIMEN PLATE IV · LABORATORY DISSECTION
              </p>
              <h2 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#071B27]">
                FISH ANATOMY. WTF IS GOING ON HERE?
              </h2>
              <p className="font-serif text-lg leading-relaxed text-[#071B27]/85">
                Follow the arrows around Specimen Plate IV or open the full nine-part anatomy dossier for The Legs, The Scales, and The Fins.
              </p>
            </div>

            <Link
              to="/anatomy"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#071B27] text-[#F5F3E9] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#0B2535] transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
            >
              <Crosshair className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
              Inspect Full 9-Part Anatomy
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="bg-[#F5F3E9] border border-[#071B27]/20 p-4 sm:p-6 max-w-5xl mx-auto shadow-xs">
            <SpecimenDiagram parts={HOME_SPECIMEN_HIGHLIGHTS} variant="cream" />
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-[#071B27]/75">
              <span>
                PLATE IV — Follow any callout arrow or open the Anatomy page for all 9 components.
              </span>
              <Link to="/anatomy" className="text-[#C93B35] font-semibold hover:underline whitespace-nowrap shrink-0">
                Open Full Dissection (9/9) &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. THE FISH AGENDA & LIVE INTEL (DARK CYBER BLUE)                    */}
      {/* ==================================================================== */}
      <section id="home-agenda" className="bg-cyber-grid text-[#F5F3E9] py-16 sm:py-20 border-b border-[#38BDF8]/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Compact Timeline Highlights */}
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
                  Full Timeline &amp; Internal Memos
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Marine Intelligence Radar Card */}
            <div className="lg:col-span-5">
              <div className="reticle-frame bg-[#0A1E2C] border border-[#38BDF8]/25 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="inline-flex items-center gap-2 text-[#38BDF8] uppercase tracking-widest">
                    <Radio className="w-4 h-4" aria-hidden="true" />
                    MARINE INTELLIGENCE NETWORK
                  </span>
                  <span className="text-[#E5A45B] uppercase">ELEVATED</span>
                </div>

                <p className="font-serif text-base text-[#D6DFE6] leading-relaxed">
                  Coastal sonar logs along False Bay, Walker Bay, and Durban Harbour record unblinking shoals maintaining mathematically improbable formation near undersea fibre trunks.
                </p>

                <div className="grid grid-cols-3 gap-3 py-5 border-y border-[#38BDF8]/15">
                  <div>
                    <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#38BDF8] tabular-nums">4 271</p>
                    <p className="font-mono text-[10px] uppercase text-[#8FA7B8]">Sightings</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#F5F3E9] tabular-nums">97,4%</p>
                    <p className="font-mono text-[10px] uppercase text-[#8FA7B8]">Denial Rate</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#E5A45B] tabular-nums">15</p>
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

      {/* ==================================================================== */}
      {/* 5. QUESTIONS THEY DON'T WANT + LANDSCAPE HEAD-TORCH POSTER (BEIGE)   */}
      {/* ==================================================================== */}
      <section className="bg-ruled-ledger text-[#071B27] py-16 sm:py-20 border-b border-[#071B27]/15">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Sticky Column: 4:3 Landscape Poster (Original Engraved Face/Eye + Head Torch) */}
            <div className="lg:col-span-6 lg:sticky lg:top-24">
              <figure className="space-y-3">
                <div className="bg-[#F5F3E9] p-3 border border-[#071B27]/20 shadow-sm">
                  <ResilientImage
                    src="/src/assets/images/poster_landscape_headtorch_1794994001529.jpg"
                    alt="Landscape Poster No. 7 — It Is Watching The Mountain: engraved surveillance fish with camera-lens eye and forehead head torch beaming light down onto Table Mountain"
                    fallbackTitle="Poster No. 7 — It Is Watching The Mountain"
                    className="w-full h-auto block"
                  />
                </div>
                <figcaption className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#071B27]/75 leading-relaxed">
                  POSTER NO. 7 — &ldquo;IT IS WATCHING THE MOUNTAIN&rdquo;. WITHDRAWN FROM CIRCULATION, 1983.
                </figcaption>
              </figure>
            </div>

            {/* Right Column: Questions Hairline Accordion with Redacted Official Answers */}
            <div className="lg:col-span-6">
              <div className="mb-6 space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#C93B35]">
                  FREEDOM OF INFORMATION REQUESTS · STATUS: BLOCKED
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#071B27]">
                  THE QUESTIONS THEY DON&apos;T WANT YOU ASKING.
                </h2>
              </div>

              <div className="border-t border-[#071B27]/20">
                {FORBIDDEN_QUESTIONS.map((item) => {
                  const isOpen = openQuestionId === item.id;
                  return (
                    <div key={item.id} className="border-b border-[#071B27]/20">
                      <button
                        type="button"
                        onClick={() => setOpenQuestionId(isOpen ? '' : item.id)}
                        aria-expanded={isOpen}
                        className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs font-semibold text-[#C93B35] shrink-0">
                            {item.num}
                          </span>
                          <span className="font-serif text-xl sm:text-2xl leading-snug text-[#071B27] group-hover:text-[#C93B35] transition-colors">
                            {item.question}
                          </span>
                        </div>
                        <span className="shrink-0 p-1.5 text-[#071B27]/70 group-hover:text-[#071B27]">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="w-5 h-5" aria-hidden="true" />
                          )}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="pb-6 pl-0 sm:pl-10 space-y-3.5">
                          <div className="space-y-2 max-w-xl">
                            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#071B27]/65">
                              OFFICIAL ANSWER
                            </p>
                            <div className="space-y-1.5">
                              <div>
                                <span className="redacted-block-light font-mono text-sm px-3 py-0.5">
                                  {item.redactedLine1}
                                </span>
                              </div>
                              <div>
                                <span className="redacted-block-light font-mono text-sm px-3 py-0.5">
                                  {item.redactedLine2}
                                </span>
                              </div>
                            </div>
                            <p className="font-sans text-xs text-[#071B27]/75 leading-relaxed">
                              {item.withheldNote}
                            </p>
                          </div>

                          <p className="font-serif text-base leading-relaxed text-[#071B27]/90 max-w-xl pt-2 border-t border-[#071B27]/10">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#C93B35] mr-2">
                              Investigator Note:
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
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. SOUTH AFRICANS ARE TALKING (BEIGE PAPER)                          */}
      {/* ==================================================================== */}
      <section id="home-witnesses" className="bg-ruled-ledger text-[#071B27] py-16 sm:py-20 border-b border-[#071B27]/15">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#C93B35]">
                {WITNESS_HEADER.kicker}
              </p>
              <h2 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#071B27]">
                {WITNESS_HEADER.heading}
              </h2>
              <p className="font-serif text-lg leading-relaxed text-[#071B27]/85">
                {WITNESS_HEADER.intro}
              </p>
            </div>

            <Link
              to="/witnesses"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#071B27] text-[#F5F3E9] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#0B2535] transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              Open Full Witness Archive
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <WitnessCarousel witnesses={INITIAL_WITNESSES} variant="cream" />
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. MERCHANDISE — WEAR THE TRUTH (ARCHIVAL PAPER)                     */}
      {/* ==================================================================== */}
      <section id="home-merch" className="bg-[#F5F3E9] text-[#071B27] py-16 sm:py-20 border-b border-[#071B27]/20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 bg-[#EAE8D8] border border-[#071B27]/20 p-4 shadow-xs">
              <div className="bg-[#F5F3E9] border border-[#071B27]/15 overflow-hidden">
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
                <span className="text-[#071B27]/75">QUARTERMASTER DIVISION</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#C93B35] font-semibold">COMING SOON</span>
              </div>

              <h2 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#071B27]">
                WEAR THE TRUTH
              </h2>

              <div className="space-y-4 font-serif text-lg leading-relaxed text-[#071B27]/90 max-w-xl">
                <p>
                  The Fish Aren&apos;t Real uniform is the shirt — built to raise awareness and join the cause. Our collection also includes <span className="font-semibold text-[#071B27]">Electromagnetic Protective Caps</span> (tested to block 0% of signal) and <span className="font-semibold text-[#071B27]">Warding Stickers</span> to keep seagulls, suspicious hake salesmen, and scuba instructors named Steve off your bumper.
                </p>
                <p className="text-base text-[#071B27]/75">
                  No prices yet — our supplier is being watched and our payment processor stopped answering the phone the week we launched. Coming soon anyway.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <Link
                  to="/merchandise"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#071B27] text-[#F5F3E9] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#0B2535] transition-colors"
                >
                  <Package className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                  SHOP MERCH — COMING SOON
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. QUICK LINK TO HOW DEEP DOES THE RABBIT HOLE GO? (CYBER BLUE)      */}
      {/* ==================================================================== */}
      <section className="bg-cyber-grid text-[#F5F3E9] py-16 sm:py-20">
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

      {/* ==================================================================== */}
      {/* 9. REPORT A SIGHTING (CYBER BLUE — LAST SECTION ABOVE FOOTER)        */}
      {/* ==================================================================== */}
      <ReportSightingPanel />
    </div>
  );
}
