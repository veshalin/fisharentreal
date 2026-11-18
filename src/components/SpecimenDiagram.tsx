import { Link } from 'react-router-dom';
import { AnatomyPart } from '../data/anatomy';
import { ResilientImage } from './ResilientImage';

interface SpecimenDiagramProps {
  parts: AnatomyPart[];
  variant?: 'cream' | 'cyber';
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export function SpecimenDiagram({
  parts,
  variant = 'cream',
  selectedId,
  onSelect,
}: SpecimenDiagramProps) {
  const cream = variant === 'cream';
  const lineColor = cream ? '#071B27' : '#38BDF8';
  const activeColor = '#C93B35';

  return (
    <div className="space-y-4">
      <div
        className={`relative w-full overflow-hidden border ${
          cream ? 'bg-[#EAE8D8] border-[#071B27]/20' : 'bg-[#EAE8D8] border-[#38BDF8]/35'
        }`}
      >
        <ResilientImage
          src="/src/assets/images/anatomy_specimen_plate_1794931332761.jpg"
          alt="Annotated scientific specimen cutaway showing suspicious fish eye, intake vents, swim bladder, and no booty"
          fallbackTitle="Annotated Specimen Plate"
          className="w-full h-auto block select-none"
        />

        {/* SVG Leader Arrows from Margin Callouts to Exact Organs (Desktop/Tablet) */}
        <svg
          viewBox="0 0 1000 562.5"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <defs>
            <marker
              id={`arrow-idle-${variant}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill={lineColor} />
            </marker>
            <marker
              id={`arrow-active-${variant}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill={activeColor} />
            </marker>
          </defs>

          {parts.map((part) => {
            const isSelected = selectedId === part.id;
            const x1 = part.labelX * 10;
            const y1 = part.labelY * 5.625;
            const x2 = part.xPercent * 10;
            const y2 = part.yPercent * 5.625;
            const stroke = isSelected ? activeColor : lineColor;

            return (
              <g key={`arrow-${part.id}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={stroke}
                  strokeWidth={isSelected ? 2.4 : 1.75}
                  strokeOpacity={isSelected ? 1 : 0.85}
                  markerEnd={`url(#arrow-${isSelected ? 'active' : 'idle'}-${variant})`}
                />
                <circle
                  cx={x2}
                  cy={y2}
                  r={isSelected ? 5 : 3.5}
                  fill={isSelected ? activeColor : '#F5F3E9'}
                  stroke={stroke}
                  strokeWidth="1.8"
                />
              </g>
            );
          })}
        </svg>

        {/* Non-Overlapping Margin Label Boxes (Desktop/Tablet) */}
        {parts.map((part) => {
          const isSelected = selectedId === part.id;
          const baseClasses = `hidden sm:inline-flex items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 absolute px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider shadow-sm transition-colors whitespace-nowrap z-20 cursor-pointer ${
            isSelected
              ? 'bg-[#C93B35] text-[#F5F3E9] border border-[#071B27]'
              : cream
                ? 'bg-[#071B27] text-[#F5F3E9] border border-[#F5F3E9]/60 hover:bg-[#C93B35]'
                : 'bg-[#06141E]/95 text-[#F5F3E9] border border-[#38BDF8]/70 hover:bg-[#C93B35] hover:border-[#F5F3E9]'
          }`;

          const content = (
            <>
              <span className={isSelected ? 'text-[#F5F3E9] font-bold' : 'text-[#E5A45B] font-bold'}>
                {part.index}
              </span>
              <span>{part.shortLabel}</span>
            </>
          );

          if (onSelect) {
            return (
              <button
                key={part.id}
                type="button"
                onClick={() => onSelect(part.id)}
                aria-label={`Inspect ${part.name}: ${part.shortLabel}`}
                aria-pressed={isSelected}
                style={{ left: `${part.labelX}%`, top: `${part.labelY}%` }}
                className={baseClasses}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={part.id}
              to="/anatomy"
              style={{ left: `${part.labelX}%`, top: `${part.labelY}%` }}
              className={baseClasses}
            >
              {content}
            </Link>
          );
        })}
      </div>

      {/* Mobile Compact Key */}
      <div className="sm:hidden grid grid-cols-2 gap-2">
        {parts.map((part) => {
          const isSelected = selectedId === part.id;
          const mobileClass = `px-2.5 py-2 font-mono text-[10px] uppercase text-left border ${
            isSelected
              ? 'bg-[#C93B35] text-[#F5F3E9] border-[#071B27]'
              : cream
                ? 'bg-[#F5F3E9] text-[#071B27] border-[#071B27]/20'
                : 'bg-[#06141E] text-[#F5F3E9] border-[#38BDF8]/30'
          }`;

          if (onSelect) {
            return (
              <button
                key={part.id}
                type="button"
                onClick={() => onSelect(part.id)}
                className={mobileClass}
              >
                <span className="font-bold mr-1">{part.index}.</span>
                {part.shortLabel}
              </button>
            );
          }

          return (
            <Link key={part.id} to="/anatomy" className={mobileClass}>
              <span className="font-bold mr-1">{part.index}.</span>
              {part.shortLabel}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
