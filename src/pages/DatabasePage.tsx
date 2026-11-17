import { useEffect, useMemo, useState, FormEvent } from 'react';
import { Search, Edit3, Plus, RotateCcw, X } from 'lucide-react';
import {
  FishDossier,
  INITIAL_SPECIES_DATABASE,
  SuspectClassification,
} from '../data/speciesDatabase';

const STORAGE_KEY = 'fisharentreal_species_db_v1';

const CLASSIFICATIONS: SuspectClassification[] = [
  'Biomimetic Drone',
  'Holographic Projection',
  'Acoustic Relay',
  'Canned Compliance Unit',
];

export function DatabasePage() {
  const [records, setRecords] = useState<FishDossier[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as FishDossier[];
    } catch {
      // Fallback
    }
    return INITIAL_SPECIES_DATABASE;
  });

  const [query, setQuery] = useState('');
  const [filterClass, setFilterClass] = useState<'ALL' | SuspectClassification>('ALL');
  const [editingRecord, setEditingRecord] = useState<FishDossier | null>(null);
  const [creatingNew, setCreatingNew] = useState(false);

  const [formCommon, setFormCommon] = useState('');
  const [formAlias, setFormAlias] = useState('');
  const [formClass, setFormClass] = useState<SuspectClassification>('Biomimetic Drone');
  const [formThreat, setFormThreat] = useState<FishDossier['threatLevel']>('MODERATE');
  const [formSector, setFormSector] = useState('');
  const [formSpeed, setFormSpeed] = useState('');
  const [formNotes, setFormNotes] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
      // Ignore storage errors
    }
  }, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const matchesClass = filterClass === 'ALL' || item.classification === filterClass;
      const q = query.trim().toLowerCase();
      if (!q) return matchesClass;
      return (
        matchesClass &&
        (item.commonName.toLowerCase().includes(q) ||
          item.officialAlias.toLowerCase().includes(q) ||
          item.sector.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q) ||
          item.notes.toLowerCase().includes(q))
      );
    });
  }, [records, query, filterClass]);

  const openEdit = (item: FishDossier) => {
    setCreatingNew(false);
    setEditingRecord(item);
    setFormCommon(item.commonName);
    setFormAlias(item.officialAlias);
    setFormClass(item.classification);
    setFormThreat(item.threatLevel);
    setFormSector(item.sector);
    setFormSpeed(item.topSpeed);
    setFormNotes(item.notes);
  };

  const openCreate = () => {
    setEditingRecord(null);
    setCreatingNew(true);
    setFormCommon('');
    setFormAlias('');
    setFormClass('Biomimetic Drone');
    setFormThreat('MODERATE');
    setFormSector('');
    setFormSpeed('');
    setFormNotes('');
  };

  const handleSaveForm = (e: FormEvent) => {
    e.preventDefault();
    if (!formCommon.trim()) return;

    if (editingRecord) {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === editingRecord.id
            ? {
                ...r,
                commonName: formCommon.trim(),
                officialAlias: formAlias.trim() || 'Unverified Taxon',
                classification: formClass,
                threatLevel: formThreat,
                sector: formSector.trim() || 'South African Coastline',
                topSpeed: formSpeed.trim() || 'Unknown',
                notes: formNotes.trim(),
              }
            : r
        )
      );
      setEditingRecord(null);
    } else if (creatingNew) {
      const nextNum = String(records.length + 1).padStart(3, '0');
      const created: FishDossier = {
        id: `sp-custom-${Date.now()}`,
        code: `UNIT-ZA-${nextNum}`,
        commonName: formCommon.trim(),
        officialAlias: formAlias.trim() || 'Unverified Taxon',
        classification: formClass,
        threatLevel: formThreat,
        sector: formSector.trim() || 'South African Coastline',
        topSpeed: formSpeed.trim() || 'Unknown',
        blinksRecorded: 0,
        notes: formNotes.trim() || 'Pending Velddrif tribunal verification.',
      };
      setRecords((prev) => [created, ...prev]);
      setCreatingNew(false);
    }
  };

  const handleReset = () => {
    setRecords(INITIAL_SPECIES_DATABASE);
    setQuery('');
    setFilterClass('ALL');
  };

  return (
    <div className="bg-cyber-grid text-[#F5F3E9] py-14 sm:py-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#38BDF8]/20">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#38BDF8]">
              REGISTRY &amp; CLASSIFICATION ARCHIVE
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
              SUSPECT SPECIES DATABASE
            </h1>
            <p className="font-serif text-lg leading-relaxed text-[#D6DFE6]">
              Search documented South African coastal units, inspect blink telemetry (always 0), or edit and expand classification profiles locally.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#7DD3FC] cursor-pointer"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Add Suspect Unit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-3 border border-[#38BDF8]/30 text-[#8FA7B8] font-mono text-xs uppercase tracking-wider hover:text-[#F5F3E9] hover:border-[#38BDF8] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Reset Archive
            </button>
          </div>
        </header>

        {/* Search & Classification Filter Controls */}
        <div className="bg-[#0A1E2C] border border-[#38BDF8]/25 p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-5 relative">
              <Search
                className="w-4 h-4 text-[#8FA7B8] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search suspect fish profiles"
                placeholder="Search name, Latin alias, Cape Town sector..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#06141E] border border-[#38BDF8]/25 font-mono text-sm text-[#F5F3E9] placeholder:text-[#8FA7B8]/50 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>

            <div className="lg:col-span-7 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFilterClass('ALL')}
                className={`px-3 py-2 font-mono text-[11px] uppercase tracking-wider border cursor-pointer transition-colors ${
                  filterClass === 'ALL'
                    ? 'bg-[#38BDF8] text-[#06141E] border-[#38BDF8] font-semibold'
                    : 'bg-[#06141E] text-[#8FA7B8] border-[#38BDF8]/20 hover:border-[#38BDF8]'
                }`}
              >
                All Units ({records.length})
              </button>
              {CLASSIFICATIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilterClass(c)}
                  className={`px-3 py-2 font-mono text-[11px] uppercase tracking-wider border cursor-pointer transition-colors ${
                    filterClass === c
                      ? 'bg-[#38BDF8] text-[#06141E] border-[#38BDF8] font-semibold'
                      : 'bg-[#06141E] text-[#8FA7B8] border-[#38BDF8]/20 hover:border-[#38BDF8]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dossier Grid */}
        {filteredRecords.length === 0 ? (
          <div className="p-12 bg-[#0A1E2C] border border-[#38BDF8]/25 text-center space-y-3">
            <p className="font-display text-3xl font-bold uppercase text-[#F5F3E9]">
              NO MATCHING UNITS FOUND
            </p>
            <p className="font-serif text-base text-[#8FA7B8]">
              Either this specimen has been scrubbed from the archive, or your search filter is too narrow.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((item) => (
              <article
                key={item.id}
                className="reticle-frame flex flex-col justify-between bg-[#0A1E2C] border border-[#38BDF8]/25 p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#38BDF8]/15 font-mono text-[11px] uppercase tracking-widest">
                    <span className="font-semibold text-[#38BDF8]">{item.code}</span>
                    <span
                      className={`font-semibold ${
                        item.threatLevel === 'CRITICAL'
                          ? 'text-[#D94B46]'
                          : item.threatLevel === 'HIGH'
                            ? 'text-[#E5A45B]'
                            : 'text-[#8FA7B8]'
                      }`}
                    >
                      THREAT: {item.threatLevel}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-[#F5F3E9]">
                    {item.commonName}
                  </h2>
                  <p className="font-serif italic text-sm text-[#8FA7B8] mb-4">
                    Official cover name: {item.officialAlias}
                  </p>

                  <dl className="space-y-2 py-3 border-y border-[#38BDF8]/15 font-mono text-xs mb-4">
                    <div className="flex justify-between gap-2">
                      <dt className="text-[#8FA7B8]">CLASS:</dt>
                      <dd className="text-[#F5F3E9] font-semibold text-right">{item.classification}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-[#8FA7B8]">SECTOR:</dt>
                      <dd className="text-[#D6DFE6] text-right">{item.sector}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-[#8FA7B8]">VELOCITY:</dt>
                      <dd className="text-[#D6DFE6] text-right">{item.topSpeed}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-[#8FA7B8]">BLINKS:</dt>
                      <dd className="text-[#D94B46] font-bold tabular-nums">{item.blinksRecorded}</dd>
                    </div>
                  </dl>

                  <p className="font-serif text-sm sm:text-base leading-relaxed text-[#D6DFE6]">
                    {item.notes}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#38BDF8]/12 flex justify-end">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#06141E] border border-[#38BDF8]/30 font-mono text-[11px] uppercase tracking-wider text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06141E] transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                    Edit Profile
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {(editingRecord || creatingNew) && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="db-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg bg-[#0A1E2C] border border-[#38BDF8]/50 p-6 sm:p-8 text-[#F5F3E9] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#38BDF8]/20">
              <h2 id="db-modal-title" className="font-display text-3xl font-bold uppercase">
                {editingRecord ? `Edit ${editingRecord.code}` : 'Register New Suspect Unit'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditingRecord(null);
                  setCreatingNew(false);
                }}
                aria-label="Close modal"
                className="p-1.5 border border-[#38BDF8]/30 text-[#8FA7B8] hover:text-[#F5F3E9] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sp-name" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1">
                    Common Name
                  </label>
                  <input
                    id="sp-name"
                    type="text"
                    required
                    value={formCommon}
                    onChange={(e) => setFormCommon(e.target.value)}
                    className="w-full px-3 py-2 bg-[#06141E] border border-[#38BDF8]/30 font-mono text-sm text-[#F5F3E9]"
                  />
                </div>
                <div>
                  <label htmlFor="sp-alias" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1">
                    Scientific Cover Alias
                  </label>
                  <input
                    id="sp-alias"
                    type="text"
                    value={formAlias}
                    onChange={(e) => setFormAlias(e.target.value)}
                    className="w-full px-3 py-2 bg-[#06141E] border border-[#38BDF8]/30 font-mono text-sm text-[#F5F3E9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sp-class" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1">
                    Classification
                  </label>
                  <select
                    id="sp-class"
                    value={formClass}
                    onChange={(e) => setFormClass(e.target.value as SuspectClassification)}
                    className="w-full px-3 py-2 bg-[#06141E] border border-[#38BDF8]/30 font-mono text-sm text-[#F5F3E9]"
                  >
                    {CLASSIFICATIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sp-threat" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1">
                    Threat Rating
                  </label>
                  <select
                    id="sp-threat"
                    value={formThreat}
                    onChange={(e) => setFormThreat(e.target.value as FishDossier['threatLevel'])}
                    className="w-full px-3 py-2 bg-[#06141E] border border-[#38BDF8]/30 font-mono text-sm text-[#F5F3E9]"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MODERATE">MODERATE</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sp-sector" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1">
                    Coastal Sector
                  </label>
                  <input
                    id="sp-sector"
                    type="text"
                    value={formSector}
                    onChange={(e) => setFormSector(e.target.value)}
                    className="w-full px-3 py-2 bg-[#06141E] border border-[#38BDF8]/30 font-mono text-sm text-[#F5F3E9]"
                  />
                </div>
                <div>
                  <label htmlFor="sp-speed" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1">
                    Observed Top Speed
                  </label>
                  <input
                    id="sp-speed"
                    type="text"
                    value={formSpeed}
                    onChange={(e) => setFormSpeed(e.target.value)}
                    className="w-full px-3 py-2 bg-[#06141E] border border-[#38BDF8]/30 font-mono text-sm text-[#F5F3E9]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sp-notes" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1">
                  Investigative Notes
                </label>
                <textarea
                  id="sp-notes"
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-[#06141E] border border-[#38BDF8]/30 font-serif text-sm text-[#F5F3E9]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingRecord(null);
                    setCreatingNew(false);
                  }}
                  className="px-4 py-2 border border-[#38BDF8]/25 font-mono text-xs uppercase text-[#8FA7B8] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase cursor-pointer"
                >
                  Save Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
