import { useEffect, useState } from 'react';
import { Radio, AlertTriangle, Pause, Play, PlusCircle, Radar } from 'lucide-react';
import {
  INITIAL_INTEL_FEED,
  ROTATING_FICTIONAL_EVENTS,
  COASTAL_STATIONS,
  IntelReport,
} from '../data/intelligence';
import { ResilientImage } from '../components/ResilientImage';

interface SonarBlip {
  id: string;
  label: string;
  angleDeg: number;
  distancePct: number;
  coords: string;
  note: string;
}

const SONAR_BLIPS: SonarBlip[] = [
  {
    id: 'blip-1',
    label: 'ROBBEN TRENCH',
    angleDeg: 38,
    distancePct: 58,
    coords: '33.8076° S, 18.3712° E',
    note: 'Cormorant cluster broke grid formation',
  },
  {
    id: 'blip-2',
    label: 'MUIZENBERG',
    angleDeg: 142,
    distancePct: 44,
    coords: '34.1087° S, 18.4702° E',
    note: '03:14 SAST wake without surface wind',
  },
  {
    id: 'blip-3',
    label: 'FALSE BAY',
    angleDeg: 205,
    distancePct: 72,
    coords: '34.2160° S, 18.6340° E',
    note: '1,847 identical shark pings, static coordinates',
  },
  {
    id: 'blip-4',
    label: 'SALDANHA',
    angleDeg: 308,
    distancePct: 80,
    coords: '33.0117° S, 17.9442° E',
    note: 'Mussel farm telemetry disagrees with tide table',
  },
];

function useCountUp(target: number, durationMs = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);

  return value;
}

export function IntelligencePage() {
  const sightingsCount = useCountUp(4271, 1200);
  const denialRate = useCountUp(97.4, 1200);
  const migrationsCount = useCountUp(15, 900);

  const [feed, setFeed] = useState<IntelReport[]>(INITIAL_INTEL_FEED);
  const [feedActive, setFeedActive] = useState(true);
  const [rotateIdx, setRotateIdx] = useState(0);
  const [sweepDeg, setSweepDeg] = useState(0);
  const [selectedBlip, setSelectedBlip] = useState<SonarBlip>(SONAR_BLIPS[0]);
  const [selectedStationId, setSelectedStationId] = useState<string>(COASTAL_STATIONS[0].id);

  // Smooth radar sweep rotation
  useEffect(() => {
    if (!feedActive) return;
    const timer = window.setInterval(() => {
      setSweepDeg((d) => (d + 3) % 360);
    }, 60);
    return () => clearInterval(timer);
  }, [feedActive]);

  // Occasional fictional reports appended to live feed
  useEffect(() => {
    if (!feedActive) return;
    const timer = window.setInterval(() => {
      const nextTemplate = ROTATING_FICTIONAL_EVENTS[rotateIdx % ROTATING_FICTIONAL_EVENTS.length];
      const now = new Date();
      const ts = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;
      setFeed((prev) => [
        {
          id: `intel-live-${Date.now()}`,
          timestamp: ts,
          sector: nextTemplate.sector,
          message: nextTemplate.message,
          severity: nextTemplate.severity,
        },
        ...prev.slice(0, 11),
      ]);
      setRotateIdx((i) => i + 1);
    }, 6500);
    return () => clearInterval(timer);
  }, [feedActive, rotateIdx]);

  const handleManualPing = () => {
    const nextTemplate = ROTATING_FICTIONAL_EVENTS[rotateIdx % ROTATING_FICTIONAL_EVENTS.length];
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;
    setFeed((prev) => [
      {
        id: `intel-manual-${Date.now()}`,
        timestamp: ts,
        sector: nextTemplate.sector,
        message: nextTemplate.message,
        severity: nextTemplate.severity,
      },
      ...prev.slice(0, 11),
    ]);
    setRotateIdx((i) => i + 1);
  };

  const formatSightings = (n: number) => {
    const rounded = Math.round(n);
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className="bg-intel-grid text-[#F5F3E9] py-14 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Classified Header */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#38BDF8]/20">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#38BDF8]">
              MARINE INTELLIGENCE NETWORK
            </p>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
              Live fish activity
            </h1>
            <p className="font-mono text-xs text-[#91A4B5]">
              SATIRICAL COASTAL SIMULATION · ALL TELEMETRY IS FICTIONAL PARODY DATA
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-4 py-3 bg-[#0B2535] border border-[#E5A45B]/60 text-[#E5A45B] font-mono text-xs font-semibold uppercase tracking-[0.14em] self-start lg:self-auto">
            <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>OCEAN THREAT: ELEVATED</span>
          </div>
        </header>

        {/* Three Animated Numerical Counters */}
        <section aria-label="Coastal anomaly metrics" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0B2535] border border-[#38BDF8]/25 p-6 sm:p-8">
            <p className="font-display text-5xl sm:text-6xl font-extrabold text-[#38BDF8] tabular-nums">
              {formatSightings(sightingsCount)}
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#D6DFE6] mt-3">
              SUSPICIOUS SIGHTINGS
            </p>
            <p className="font-mono text-[11px] text-[#91A4B5] mt-1">
              Logged across Western Cape & KZN piers
            </p>
          </div>

          <div className="bg-[#0B2535] border border-[#38BDF8]/25 p-6 sm:p-8">
            <p className="font-display text-5xl sm:text-6xl font-extrabold text-[#F5F3E9] tabular-nums">
              {denialRate.toFixed(1).replace('.', ',')}%
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#D6DFE6] mt-3">
              FISH DENIAL RATE
            </p>
            <p className="font-mono text-[11px] text-[#91A4B5] mt-1">
              Official spokespersons declining comment
            </p>
          </div>

          <div className="bg-[#0B2535] border border-[#38BDF8]/25 p-6 sm:p-8">
            <p className="font-display text-5xl sm:text-6xl font-extrabold text-[#E5A45B] tabular-nums">
              {Math.round(migrationsCount)}
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#D6DFE6] mt-3">
              UNEXPLAINED MIGRATIONS
            </p>
            <p className="font-mono text-[11px] text-[#91A4B5] mt-1">
              Synchronised formations outside tide tables
            </p>
          </div>
        </section>

        {/* Main Intelligence Console: Live Feed + Interactive Radar */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Live Feed Panel */}
          <div className="lg:col-span-7 bg-[#0B2535] border border-[#38BDF8]/25 flex flex-col">
            <div className="p-5 sm:p-6 border-b border-[#38BDF8]/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Radio
                  className={`w-4 h-4 ${feedActive ? 'text-[#38BDF8]' : 'text-[#91A4B5]'}`}
                  aria-hidden="true"
                />
                <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.14em] text-[#F5F3E9]">
                  LIVE FEED · SOUTH AFRICAN COASTLINE
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFeedActive((v) => !v)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#071B27] border border-[#38BDF8]/30 font-mono text-[11px] uppercase tracking-wider text-[#F5F3E9] hover:border-[#38BDF8] transition-colors cursor-pointer"
                >
                  {feedActive ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-[#E5A45B]" aria-hidden="true" />
                      Pause Feed
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#38BDF8]" aria-hidden="true" />
                      Resume Feed
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleManualPing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#38BDF8] text-[#071B27] font-mono text-[11px] font-semibold uppercase tracking-wider hover:bg-[#7DD3FC] transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  Scan Sector
                </button>
              </div>
            </div>

            <div className="divide-y divide-[#38BDF8]/10 max-h-[520px] overflow-y-auto">
              {feed.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 hover:bg-[#071B27]/60 transition-colors"
                >
                  <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                    <span className="text-[#38BDF8] tabular-nums">[{entry.timestamp}]</span>
                    <span
                      className={`text-[10px] uppercase tracking-widest ${
                        entry.severity === 'CONFIRMED'
                          ? 'text-[#D94B46]'
                          : entry.severity === 'ELEVATED'
                            ? 'text-[#E5A45B]'
                            : 'text-[#91A4B5]'
                      }`}
                    >
                      {entry.sector}
                    </span>
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-[#F5F3E9] leading-relaxed">
                    {entry.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Sonar / Radar Visual */}
          <div className="lg:col-span-5 bg-[#0B2535] border border-[#38BDF8]/25 p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#38BDF8]/15 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[#38BDF8]">
                <Radar className="w-4 h-4" aria-hidden="true" />
                <span>CAPE PENINSULA SONAR SWEEP</span>
              </div>
              <span className="font-mono text-[11px] text-[#91A4B5] tabular-nums">
                AZIMUTH {String(sweepDeg).padStart(3, '0')}°
              </span>
            </div>

            {/* Interactive SVG Radar */}
            <div className="relative aspect-square max-w-[360px] mx-auto bg-[#071B27] border border-[#38BDF8]/25 rounded-full overflow-hidden">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Concentric Range Rings */}
                <circle cx="100" cy="100" r="30" fill="none" stroke="#38BDF8" strokeOpacity="0.2" strokeWidth="0.7" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#38BDF8" strokeOpacity="0.2" strokeWidth="0.7" />
                <circle cx="100" cy="100" r="90" fill="none" stroke="#38BDF8" strokeOpacity="0.25" strokeWidth="0.8" />
                <line x1="100" y1="5" x2="100" y2="195" stroke="#38BDF8" strokeOpacity="0.15" strokeWidth="0.7" />
                <line x1="5" y1="100" x2="195" y2="100" stroke="#38BDF8" strokeOpacity="0.15" strokeWidth="0.7" />

                {/* Sweeping Beam */}
                <g transform={`rotate(${sweepDeg} 100 100)`}>
                  <path
                    d="M100 100 L100 10 A90 90 0 0 1 138 19 Z"
                    fill="#38BDF8"
                    fillOpacity="0.16"
                  />
                  <line x1="100" y1="100" x2="100" y2="10" stroke="#38BDF8" strokeWidth="1.5" />
                </g>

                {/* Interactive Anomaly Blips */}
                {SONAR_BLIPS.map((blip) => {
                  const rad = ((blip.angleDeg - 90) * Math.PI) / 180;
                  const r = (blip.distancePct / 100) * 86;
                  const cx = 100 + r * Math.cos(rad);
                  const cy = 100 + r * Math.sin(rad);
                  const isSelected = blip.id === selectedBlip.id;

                  return (
                    <g
                      key={blip.id}
                      onClick={() => setSelectedBlip(blip)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect sonar blip ${blip.label}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedBlip(blip);
                        }
                      }}
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 7 : 5}
                        fill={isSelected ? '#D94B46' : '#E5A45B'}
                        fillOpacity="0.28"
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 3.5 : 2.5}
                        fill={isSelected ? '#D94B46' : '#E5A45B'}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Blip Readout */}
            <div className="p-4 bg-[#071B27] border border-[#38BDF8]/20 font-mono text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[#38BDF8]">
                <span className="font-semibold">{selectedBlip.label}</span>
                <span className="tabular-nums">{selectedBlip.coords}</span>
              </div>
              <p className="text-[#D6DFE6]">{selectedBlip.note}</p>
              <p className="text-[11px] text-[#91A4B5]">Click any amber/red marker on the sonar to switch target.</p>
            </div>
          </div>
        </section>

        {/* Regional Monitoring Panels + Archival Coast Photo */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COASTAL_STATIONS.map((station) => {
              const active = station.id === selectedStationId;
              return (
                <button
                  key={station.id}
                  type="button"
                  onClick={() => setSelectedStationId(station.id)}
                  className={`text-left p-5 border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#0B2535] border-[#38BDF8]'
                      : 'bg-[#0B2535]/60 border-[#38BDF8]/20 hover:border-[#38BDF8]/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider mb-2">
                    <span
                      className={
                        station.status === 'ELEVATED'
                          ? 'text-[#D94B46]'
                          : station.status === 'INTERFERENCE'
                            ? 'text-[#E5A45B]'
                            : 'text-[#38BDF8]'
                      }
                    >
                      STATUS: {station.status}
                    </span>
                    <span className="text-[#91A4B5] tabular-nums">{station.lastPing}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#F5F3E9]">
                    {station.name}
                  </h3>
                  <p className="font-mono text-[11px] text-[#38BDF8] mt-1 tabular-nums">
                    {station.coords} · {station.densityIndex}
                  </p>
                  <p className="font-serif text-sm text-[#D6DFE6] mt-3 leading-relaxed">
                    {station.note}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-5 bg-[#0B2535] border border-[#38BDF8]/25 p-5 flex flex-col justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#38BDF8] mb-3">
                ARCHIVAL SURVEILLANCE STILL · ROBBEN CHANNEL
              </p>
              <ResilientImage
                src="/src/assets/images/robben_archive_photo_1794931242069.jpg"
                alt="Grainy monochrome archival photograph of choppy Atlantic swells looking toward Table Mountain"
                fallbackTitle="Robben Channel Archive"
                dark
                className="w-full aspect-video object-cover border border-[#38BDF8]/20"
              />
            </div>
            <p className="font-mono text-xs text-[#91A4B5] mt-4 leading-relaxed">
              Sector Note: Table Bay acoustic barrier has operated continuously since 1972. Fictional tracking simulation only — does not monitor real marine vessels or wildlife.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
