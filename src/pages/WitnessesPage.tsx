import { useState, FormEvent } from 'react';
import { MessageSquarePlus, X } from 'lucide-react';
import { WITNESS_HEADER, INITIAL_WITNESSES, WitnessTestimonial } from '../data/witnesses';
import { WitnessCarousel } from '../components/WitnessCarousel';

export function WitnessesPage() {
  const [witnesses, setWitnesses] = useState<WitnessTestimonial[]>(INITIAL_WITNESSES);
  const [activeIndex, setActiveIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newQuote, setNewQuote] = useState('');

  const handleAddWitness = (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newQuote.trim()) return;

    const cleanName = newName.trim();
    const parts = cleanName.split(/\s+/);
    const initials =
      parts.length >= 2
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : cleanName.slice(0, 2).toUpperCase();

    const newItem: WitnessTestimonial = {
      id: `wit-local-${Date.now()}`,
      quote: newQuote.trim(),
      name: cleanName,
      initials,
      description: newLocation.trim() || 'South Africa',
      caseFile: `FILE #WIT-2026-${String(witnesses.length + 14).padStart(3, '0')}`,
    };

    setWitnesses((prev) => [...prev, newItem]);
    setActiveIndex(witnesses.length);
    setNewName('');
    setNewLocation('');
    setNewQuote('');
    setDrawerOpen(false);
  };

  return (
    <div>
      {/* Cyber Blue Header */}
      <div className="bg-cyber-grid text-[#F5F3E9] py-14 sm:py-16 border-b border-[#38BDF8]/20">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#38BDF8]">
                {WITNESS_HEADER.kicker}
              </p>
              <h1 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
                {WITNESS_HEADER.heading}
              </h1>
              <p className="font-serif text-lg sm:text-xl leading-relaxed text-[#D6DFE6]">
                {WITNESS_HEADER.intro}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-[0.1em] hover:bg-[#7DD3FC] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
            >
              <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
              Submit a Witness Report
            </button>
          </header>
        </div>
      </div>

      {/* Beige Archival Paper Witness Accounts */}
      <div className="bg-ruled-ledger text-[#071B27] py-14 sm:py-20">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section aria-label="Witness testimonial carousel">
            <WitnessCarousel
              witnesses={witnesses}
              activeIndex={activeIndex}
              onChangeIndex={setActiveIndex}
              variant="cream"
            />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {witnesses.map((w, idx) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`text-left p-5 border transition-colors cursor-pointer ${
                  idx === activeIndex
                    ? 'bg-[#F5F3E9] border-[#C93B35] shadow-xs'
                    : 'bg-[#F5F3E9]/85 border-[#071B27]/18 hover:border-[#071B27]/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#C93B35] font-semibold mb-2">
                  <span>{w.caseFile}</span>
                  <span className="text-[#071B27]/60">{w.initials}</span>
                </div>
                <p className="font-serif text-sm text-[#071B27]/85 line-clamp-2">&ldquo;{w.quote}&rdquo;</p>
                <p className="font-mono text-xs font-semibold text-[#071B27] mt-3">{w.name}</p>
              </button>
            ))}
          </section>
        </div>
      </div>

      {/* Submission Modal */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="witness-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg bg-[#0A1E2C] border border-[#38BDF8]/40 p-6 sm:p-8 text-[#F5F3E9] space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#38BDF8]/20">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#E5A45B]">
                  TESTIMONY ARCHIVE · LOCAL SESSION
                </p>
                <h2 id="witness-modal-title" className="font-display text-3xl font-bold uppercase mt-1">
                  Submit a Witness Report
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close submission dialog"
                className="p-2 border border-[#38BDF8]/25 text-[#8FA7B8] hover:text-[#F5F3E9] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-mono text-xs text-[#8FA7B8] leading-relaxed">
              Submissions preview locally in your current browser session. No personal data is transmitted externally.
            </p>

            <form onSubmit={handleAddWitness} className="space-y-4">
              <div>
                <label htmlFor="wit-name" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1.5">
                  Name / Initials
                </label>
                <input
                  id="wit-name"
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Sipho N."
                  className="w-full px-3.5 py-2.5 bg-[#06141E] border border-[#38BDF8]/25 text-[#F5F3E9] font-mono text-sm focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label htmlFor="wit-loc" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1.5">
                  Occupation &amp; Town
                </label>
                <input
                  id="wit-loc"
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Former lifeguard · Mossel Bay"
                  className="w-full px-3.5 py-2.5 bg-[#06141E] border border-[#38BDF8]/25 text-[#F5F3E9] font-mono text-sm focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label htmlFor="wit-quote" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1.5">
                  Testimony
                </label>
                <textarea
                  id="wit-quote"
                  rows={3}
                  required
                  value={newQuote}
                  onChange={(e) => setNewQuote(e.target.value)}
                  placeholder="Describe what you saw at the harbour or aquarium..."
                  className="w-full px-3.5 py-2.5 bg-[#06141E] border border-[#38BDF8]/25 text-[#F5F3E9] font-serif text-sm focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="px-4 py-2.5 border border-[#38BDF8]/25 font-mono text-xs uppercase text-[#8FA7B8] hover:text-[#F5F3E9] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#7DD3FC] cursor-pointer"
                >
                  Add to Carousel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
