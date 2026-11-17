import { useEffect, useState, FormEvent } from 'react';
import { ChevronDown, ChevronUp, Edit3, Plus, RotateCcw, FileText } from 'lucide-react';
import { DEFAULT_TIMELINE_ENTRIES, LORE_MEMOS, TIMELINE_HEADER, TimelineEntry } from '../data/timeline';

const STORAGE_KEY = 'fisharentreal_timeline_v2';

export function AgendaPage() {
  const [entries, setEntries] = useState<TimelineEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as TimelineEntry[];
    } catch {
      // Fallback
    }
    return DEFAULT_TIMELINE_ENTRIES;
  });

  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    DEFAULT_TIMELINE_ENTRIES.forEach((e) => {
      initial[e.id] = true;
    });
    return initial;
  });

  const [editing1998, setEditing1998] = useState(false);
  const [draft1998, setDraft1998] = useState('');

  const [addingEvent, setAddingEvent] = useState(false);
  const [newYear, setNewYear] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newBody, setNewBody] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Ignore storage quota errors
    }
  }, [entries]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave1998 = (e: FormEvent) => {
    e.preventDefault();
    if (!draft1998.trim()) return;
    setEntries((prev) =>
      prev.map((item) =>
        item.id === 'tl-1998'
          ? {
              ...item,
              body: draft1998.trim(),
              title: 'Archive Entry 1998 (User-Completed)',
              isIncompletePlaceholder: false,
            }
          : item
      )
    );
    setEditing1998(false);
  };

  const handleAddEvent = (e: FormEvent) => {
    e.preventDefault();
    if (!newYear.trim() || !newBody.trim()) return;
    const item: TimelineEntry = {
      id: `tl-custom-${Date.now()}`,
      year: newYear.trim(),
      title: newTitle.trim() || 'Appended Chronology Record',
      body: newBody.trim(),
      location: newLocation.trim() || 'South African Territorial Waters',
      classification: 'FIELD ADDENDUM',
      isUserAdded: true,
    };
    setEntries((prev) => [...prev, item]);
    setExpandedIds((prev) => ({ ...prev, [item.id]: true }));
    setNewYear('');
    setNewTitle('');
    setNewLocation('');
    setNewBody('');
    setAddingEvent(false);
  };

  const handleReset = () => {
    setEntries(DEFAULT_TIMELINE_ENTRIES);
    setEditing1998(false);
  };

  return (
    <div className="bg-cyber-grid text-[#F5F3E9] py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#38BDF8]/20">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#38BDF8]">
              {TIMELINE_HEADER.kicker}
            </p>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
              {TIMELINE_HEADER.heading}
            </h1>
            <p className="font-serif text-lg sm:text-xl leading-relaxed text-[#D6DFE6]">
              {TIMELINE_HEADER.intro}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setAddingEvent((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#7DD3FC] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Append Timeline Event
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#38BDF8]/30 text-[#8FA7B8] font-mono text-xs uppercase tracking-wider hover:text-[#F5F3E9] hover:border-[#38BDF8] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Reset Archive
            </button>
          </div>
        </header>

        {/* Declassified Operational Lore Memos */}
        <section aria-label="Declassified operational lore" className="space-y-5">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[#E5A45B]">
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>SUPPORTING BRIEFINGS · INTERNAL LORE</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LORE_MEMOS.map((memo) => (
              <article
                key={memo.code}
                className="reticle-frame bg-[#0A1E2C] border border-[#38BDF8]/25 p-6 space-y-3"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#38BDF8]">
                  {memo.code}
                </p>
                <h2 className="font-display text-2xl font-bold uppercase text-[#F5F3E9]">
                  {memo.title}
                </h2>
                <p className="font-serif text-sm sm:text-base leading-relaxed text-[#D6DFE6]">
                  {memo.summary}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Add Timeline Event Form */}
        {addingEvent && (
          <form
            onSubmit={handleAddEvent}
            className="p-6 sm:p-8 bg-[#0A1E2C] border border-[#38BDF8]/40 space-y-4"
          >
            <h2 className="font-display text-2xl font-bold uppercase text-[#38BDF8]">
              Append New Chronological Record
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="tl-year" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1">
                  Year
                </label>
                <input
                  id="tl-year"
                  type="text"
                  required
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  placeholder="e.g. 2024"
                  className="w-full px-3 py-2 bg-[#06141E] border border-[#38BDF8]/25 font-mono text-sm text-[#F5F3E9]"
                />
              </div>
              <div>
                <label htmlFor="tl-title" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1">
                  Record Title
                </label>
                <input
                  id="tl-title"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Kalk Bay Calibration Surge"
                  className="w-full px-3 py-2 bg-[#06141E] border border-[#38BDF8]/25 font-mono text-sm text-[#F5F3E9]"
                />
              </div>
              <div>
                <label htmlFor="tl-loc" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1">
                  Sector / Location
                </label>
                <input
                  id="tl-loc"
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Durban Harbour"
                  className="w-full px-3 py-2 bg-[#06141E] border border-[#38BDF8]/25 font-mono text-sm text-[#F5F3E9]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="tl-body" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1">
                Entry Text
              </label>
              <textarea
                id="tl-body"
                rows={3}
                required
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder="Describe the aquatic cover-up or infrastructure expansion..."
                className="w-full px-3 py-2 bg-[#06141E] border border-[#38BDF8]/25 font-serif text-sm text-[#F5F3E9]"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setAddingEvent(false)}
                className="px-4 py-2 border border-[#38BDF8]/25 font-mono text-xs uppercase text-[#8FA7B8] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase cursor-pointer"
              >
                Save to Timeline
              </button>
            </div>
          </form>
        )}

        {/* Deep Chronological Vertical Timeline */}
        <div className="relative pl-8 sm:pl-12 space-y-8 before:content-[''] before:absolute before:left-3 sm:before:left-5 before:top-2 before:bottom-2 before:w-px before:bg-[#38BDF8]/35">
          {entries.map((entry) => {
            const isExpanded = !!expandedIds[entry.id];
            const is1998 = entry.id === 'tl-1998';

            return (
              <article key={entry.id} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[25px] sm:-left-[34px] top-6 w-3.5 h-3.5 border-2 ${
                    entry.isIncompletePlaceholder
                      ? 'bg-[#06141E] border-[#E5A45B]'
                      : 'bg-[#38BDF8] border-[#06141E]'
                  }`}
                />

                <div className="bg-[#0A1E2C] border border-[#38BDF8]/25 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-baseline gap-4">
                      <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#38BDF8] tabular-nums">
                        {entry.year}
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F5F3E9]">
                        {entry.title}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(entry.id)}
                      aria-expanded={isExpanded}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#06141E] border border-[#38BDF8]/25 font-mono text-[11px] uppercase tracking-wider text-[#8FA7B8] hover:text-[#F5F3E9] cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          Collapse <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                        </>
                      ) : (
                        <>
                          Expand <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-[#38BDF8]/15 space-y-4">
                      <p
                        className={`font-serif text-lg leading-relaxed ${
                          entry.isIncompletePlaceholder
                            ? 'font-mono text-sm text-[#E5A45B]'
                            : 'text-[#D6DFE6]'
                        }`}
                      >
                        {entry.body}
                      </p>

                      {entry.loreNote && (
                        <div className="p-3.5 bg-[#06141E] border border-[#38BDF8]/15 font-mono text-xs text-[#8FA7B8] leading-relaxed">
                          <span className="text-[#38BDF8] uppercase mr-2">Archive Footnote:</span>
                          {entry.loreNote}
                        </div>
                      )}

                      {is1998 && !editing1998 && (
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              setDraft1998(entry.isIncompletePlaceholder ? '' : entry.body);
                              setEditing1998(true);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-[#E5A45B]/50 text-[#E5A45B] font-mono text-xs uppercase tracking-wider hover:bg-[#E5A45B] hover:text-[#06141E] transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                            Edit 1998 Placeholder Text
                          </button>
                        </div>
                      )}

                      {is1998 && editing1998 && (
                        <form onSubmit={handleSave1998} className="space-y-3 pt-2">
                          <label htmlFor="edit-1998" className="block font-mono text-xs uppercase text-[#E5A45B]">
                            Supply Custom 1998 Chronology Entry
                          </label>
                          <textarea
                            id="edit-1998"
                            rows={3}
                            required
                            value={draft1998}
                            onChange={(e) => setDraft1998(e.target.value)}
                            placeholder="Enter 1998 archive details..."
                            className="w-full px-3.5 py-2.5 bg-[#06141E] border border-[#E5A45B]/50 font-serif text-base text-[#F5F3E9]"
                          />
                          <div className="flex gap-3">
                            <button
                              type="submit"
                              className="px-4 py-2 bg-[#E5A45B] text-[#06141E] font-mono text-xs font-semibold uppercase cursor-pointer"
                            >
                              Save 1998 Record
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditing1998(false)}
                              className="px-4 py-2 border border-[#38BDF8]/25 font-mono text-xs uppercase text-[#8FA7B8] cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}

                      <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-[#8FA7B8]">
                        <span>{entry.classification}</span>
                        <span aria-hidden="true">·</span>
                        <span>{entry.location}</span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
