import { useState } from 'react';
import {
  FlaskConical,
  Droplets,
  EyeOff,
  ScanEye,
  MapPin,
  Gauge,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { FindingItem } from '../data/findings';

function FindingIcon({ iconName }: { iconName: FindingItem['iconName'] }) {
  const props = { className: 'w-5 h-5 text-[#38BDF8]', 'aria-hidden': true as const };
  switch (iconName) {
    case 'flask':
      return <FlaskConical {...props} />;
    case 'droplet':
      return <Droplets {...props} />;
    case 'eyeOff':
      return <EyeOff {...props} />;
    case 'scanEye':
      return <ScanEye {...props} />;
    case 'mapPin':
      return <MapPin {...props} />;
    case 'gauge':
      return <Gauge {...props} />;
  }
}

export function FindingCard({ finding }: { finding: FindingItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="reticle-frame flex flex-col justify-between bg-[#0A1E2C]/95 border border-[#38BDF8]/22 p-6 sm:p-7 hover:border-[#38BDF8]/55 transition-colors">
      <div>
        {/* Top Metadata & Icon */}
        <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-[#38BDF8]/15">
          <div className="flex items-center gap-2.5">
            <FindingIcon iconName={finding.iconName} />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#38BDF8]">
              {finding.refNumber}
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#E5A45B]">
            {finding.classification}
          </span>
        </div>

        {/* Department Line */}
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#8FA7B8] mb-2">
          {finding.department}
        </p>

        {/* Bold Condensed Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight leading-tight text-[#F5F3E9] mb-4">
          {finding.title}
        </h3>

        {/* Full Verbatim Body */}
        <p className="font-serif text-base leading-relaxed text-[#D6DFE6]">
          {finding.body}
        </p>

        {/* Department Comment Redacted Tidbit (matching reference secrecy blocks) */}
        <div className="mt-5 p-3.5 bg-[#06141E] border border-[#38BDF8]/15 space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8FA7B8]">
            {finding.deptPrompt}
          </p>
          <div className="space-y-1.5 py-0.5">
            {finding.deptRedactedLines.map((line, i) => (
              <div key={i}>
                <span
                  tabIndex={0}
                  data-revealable="false"
                  title="Redacted under Section 4(b)"
                  className="redacted-block font-mono text-[11px] px-2 py-0.5 tracking-wider"
                >
                  {line}
                </span>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-[#E5A45B]/90 leading-snug">
            {finding.deptExcuse}
          </p>
        </div>
      </div>

      {/* Divider, Statistic & Expandable Field Footnote */}
      <div className="mt-6 pt-5 border-t border-[#38BDF8]/15 space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#38BDF8] tabular-nums">
            {finding.statistic}
          </span>
          <span className="font-mono text-xs text-right text-[#8FA7B8] max-w-[175px]">
            {finding.caption}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="w-full flex items-center justify-between py-2 px-3 bg-[#06141E] border border-[#38BDF8]/25 font-mono text-[11px] uppercase tracking-wider text-[#F5F3E9] hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors cursor-pointer"
        >
          <span>{expanded ? 'Hide Investigator Note' : 'Inspect Investigator Note'}</span>
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
          )}
        </button>

        {expanded && (
          <div className="p-3.5 bg-[#06141E] border border-[#38BDF8]/25 font-mono text-xs leading-relaxed text-[#D6DFE6]">
            {finding.footnote}
          </div>
        )}
      </div>
    </article>
  );
}
