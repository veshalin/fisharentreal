import {
  FlaskConical,
  Droplets,
  EyeOff,
  ScanEye,
  MapPin,
  Gauge,
} from 'lucide-react';
import { FindingItem } from '../data/findings';

function FindingIcon({
  iconName,
  cream,
}: {
  iconName: FindingItem['iconName'];
  cream: boolean;
}) {
  const props = {
    className: `w-4 h-4 ${cream ? 'text-[#C93B35]' : 'text-[#38BDF8]'}`,
    'aria-hidden': true as const,
  };
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

export function FindingCard({
  finding,
  variant = 'cyber',
}: {
  finding: FindingItem;
  variant?: 'cream' | 'cyber';
}) {
  const cream = variant === 'cream';

  return (
    <article
      className={`flex flex-col justify-between p-5 transition-colors ${
        cream
          ? 'bg-[#F5F3E9] border border-[#071B27]/20 text-[#071B27] hover:border-[#071B27]/50'
          : 'reticle-frame bg-[#0A1E2C]/95 border border-[#38BDF8]/22 text-[#F5F3E9] hover:border-[#38BDF8]/55'
      }`}
    >
      <div>
        {/* Top Metadata & Icon */}
        <div
          className={`flex items-center justify-between gap-2 pb-3 mb-3 border-b ${
            cream ? 'border-[#071B27]/12' : 'border-[#38BDF8]/15'
          }`}
        >
          <div className="flex items-center gap-2">
            <FindingIcon iconName={finding.iconName} cream={cream} />
            <span
              className={`font-mono text-[11px] font-semibold uppercase tracking-[0.12em] ${
                cream ? 'text-[#C93B35]' : 'text-[#38BDF8]'
              }`}
            >
              {finding.refNumber}
            </span>
          </div>
          <span
            className={`font-mono text-[10px] uppercase tracking-widest ${
              cream ? 'text-[#071B27]/60' : 'text-[#E5A45B]'
            }`}
          >
            {finding.classification}
          </span>
        </div>

        {/* Bold Condensed Title */}
        <h3
          className={`font-display text-2xl font-bold uppercase tracking-tight leading-tight mb-2.5 ${
            cream ? 'text-[#071B27]' : 'text-[#F5F3E9]'
          }`}
        >
          {finding.title}
        </h3>

        {/* Full Verbatim Body */}
        <p
          className={`font-serif text-sm sm:text-[15px] leading-relaxed ${
            cream ? 'text-[#071B27]/85' : 'text-[#D6DFE6]'
          }`}
        >
          {finding.body}
        </p>
      </div>

      {/* Connected Statistic Lockup + Quiet Field Footnote */}
      <div
        className={`mt-4 pt-3.5 border-t space-y-2.5 ${
          cream ? 'border-[#071B27]/15' : 'border-[#38BDF8]/15'
        }`}
      >
        <div
          className={`flex items-baseline gap-3 px-3 py-2 border ${
            cream
              ? 'bg-[#EAE8D8] border-[#071B27]/15'
              : 'bg-[#06141E]/80 border-[#38BDF8]/15'
          }`}
        >
          <span
            className={`font-display text-3xl font-extrabold tracking-tight tabular-nums shrink-0 ${
              cream ? 'text-[#071B27]' : 'text-[#38BDF8]'
            }`}
          >
            {finding.statistic}
          </span>
          <span
            className={`font-mono text-xs leading-snug ${
              cream ? 'text-[#071B27]/80' : 'text-[#D6DFE6]'
            }`}
          >
            {finding.caption}
          </span>
        </div>

        <p
          className={`font-mono text-[11px] leading-relaxed ${
            cream ? 'text-[#071B27]/70' : 'text-[#8FA7B8]'
          }`}
        >
          <span className={cream ? 'text-[#C93B35] font-semibold' : 'text-[#38BDF8]'}>
            Note:
          </span>{' '}
          {finding.footnote}
        </p>
      </div>
    </article>
  );
}
