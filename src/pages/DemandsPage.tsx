import { useState, FormEvent } from 'react';
import { CheckCircle2, Edit3, FileSignature, X } from 'lucide-react';
import { DEMANDS_HEADER, INITIAL_DEMANDS } from '../data/demands';

const SA_PROVINCES = [
  'Western Cape',
  'Gauteng',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
];

export function DemandsPage() {
  const [demandSixEnding, setDemandSixEnding] = useState(
    INITIAL_DEMANDS[5].defaultEnding ?? '[TEXT CUT OFF IN ORIGINAL DOCUMENT — EDIT TO COMPLETE]'
  );
  const [editingSix, setEditingSix] = useState(false);
  const [draftSix, setDraftSix] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [alias, setAlias] = useState('');
  const [province, setProvince] = useState(SA_PROVINCES[0]);
  const [signedReceipts, setSignedReceipts] = useState<{ alias: string; province: string; id: string }[]>([]);

  const handleSaveDemandSix = (e: FormEvent) => {
    e.preventDefault();
    if (draftSix.trim()) {
      setDemandSixEnding(draftSix.trim());
    }
    setEditingSix(false);
  };

  const handleSignDeclaration = (e: FormEvent) => {
    e.preventDefault();
    if (!alias.trim()) return;
    const code = `DECL-${Math.floor(10000 + Math.random() * 89999)}`;
    setSignedReceipts((prev) => [{ alias: alias.trim(), province, id: code }, ...prev]);
    setAlias('');
  };

  return (
    <div className="bg-cyber-grid text-[#F5F3E9] py-14 sm:py-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Official Declaration Document Panel */}
        <article className="reticle-frame bg-[#0A1E2C] border border-[#38BDF8]/30 p-6 sm:p-10 lg:p-14">
          {/* Document Header */}
          <header className="pb-8 mb-10 border-b border-[#38BDF8]/25 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] text-[#38BDF8]">
              <span>PROCLAMATION OF THE DRY COAST · DOC. NO. 006-ZA</span>
              <span className="classified-stamp text-[11px] text-[#D94B46]">NON-NEGOTIABLE</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
              {DEMANDS_HEADER.heading}
            </h1>

            <p className="font-serif italic text-xl leading-relaxed text-[#D6DFE6] max-w-2xl">
              &ldquo;{DEMANDS_HEADER.subtitle}&rdquo;
            </p>
          </header>

          {/* Six Numbered Demands */}
          <div className="divide-y divide-[#38BDF8]/15">
            {INITIAL_DEMANDS.map((demand) => {
              const isSixth = demand.hasEditableEnding;
              return (
                <section key={demand.id} className="py-7 first:pt-0 last:pb-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-[#38BDF8]">
                      {demand.number}
                    </h2>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8FA7B8]">
                      {demand.department}
                    </span>
                  </div>

                  {!isSixth ? (
                    <p className="font-serif text-lg sm:text-xl leading-relaxed text-[#F5F3E9]">
                      {demand.text}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <p className="font-serif text-lg sm:text-xl leading-relaxed text-[#F5F3E9]">
                        {demand.text}{' '}
                        <span className="font-mono text-sm bg-[#06141E] border border-[#E5A45B]/50 px-2 py-0.5 text-[#E5A45B]">
                          {demandSixEnding}
                        </span>
                      </p>

                      {!editingSix ? (
                        <button
                          type="button"
                          onClick={() => {
                            setDraftSix(
                              demandSixEnding.startsWith('[TEXT CUT OFF') ? '' : demandSixEnding
                            );
                            setEditingSix(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#38BDF8]/30 bg-[#06141E] font-mono text-[11px] uppercase tracking-wider text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06141E] transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                          Edit Cut-Off Clause
                        </button>
                      ) : (
                        <form onSubmit={handleSaveDemandSix} className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="text"
                            value={draftSix}
                            onChange={(e) => setDraftSix(e.target.value)}
                            placeholder="Complete the cut-off ending..."
                            className="flex-1 px-3 py-2 bg-[#06141E] border border-[#38BDF8]/40 font-serif text-base text-[#F5F3E9]"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase cursor-pointer"
                          >
                            Save Clause
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingSix(false)}
                            className="px-4 py-2 border border-[#38BDF8]/30 font-mono text-xs uppercase text-[#8FA7B8] cursor-pointer"
                          >
                            Cancel
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Signatory Footer Bar */}
          <footer className="mt-10 pt-8 border-t border-[#38BDF8]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="font-mono text-xs uppercase tracking-widest text-[#38BDF8]">
                DEMONSTRATION DECLARATION LEDGER
              </p>
              <p className="font-serif text-sm text-[#8FA7B8]">
                Interactive fictional endorsement — no personal data is collected or transmitted.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#D94B46] text-[#F5F3E9] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#b93b37] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileSignature className="w-4 h-4" aria-hidden="true" />
              SIGN THE DECLARATION
            </button>
          </footer>
        </article>
      </div>

      {/* Interactive Fictional Declaration Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="declaration-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg bg-[#0A1E2C] border border-[#38BDF8]/50 p-6 sm:p-8 text-[#F5F3E9] space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#38BDF8]/20">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#E5A45B]">
                  SATIRICAL FICTIONAL DEMONSTRATION
                </p>
                <h2 id="declaration-modal-title" className="font-display text-3xl font-bold uppercase mt-1">
                  SIGN THE DECLARATION
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close declaration panel"
                className="p-2 border border-[#38BDF8]/30 text-[#8FA7B8] hover:text-[#F5F3E9] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-serif text-sm leading-relaxed text-[#D6DFE6]">
              This interactive panel lets you preview endorsing the Dry Coast Declaration locally in your browser. Nothing is saved to a server or external database.
            </p>

            <form onSubmit={handleSignDeclaration} className="space-y-4">
              <div>
                <label htmlFor="decl-alias" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1.5">
                  Preferred Alias / Codename
                </label>
                <input
                  id="decl-alias"
                  type="text"
                  required
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="e.g. Citizen #404 (Not Steve)"
                  className="w-full px-3.5 py-2.5 bg-[#06141E] border border-[#38BDF8]/30 font-mono text-sm text-[#F5F3E9]"
                />
              </div>

              <div>
                <label htmlFor="decl-prov" className="block font-mono text-xs uppercase text-[#8FA7B8] mb-1.5">
                  Province
                </label>
                <select
                  id="decl-prov"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#06141E] border border-[#38BDF8]/30 font-mono text-sm text-[#F5F3E9]"
                >
                  {SA_PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#7DD3FC] cursor-pointer"
              >
                Stamp Declaration (Local Preview)
              </button>
            </form>

            {signedReceipts.length > 0 && (
              <div className="pt-4 border-t border-[#38BDF8]/15 space-y-2 max-h-40 overflow-y-auto">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#8FA7B8]">
                  Session Signatories ({signedReceipts.length})
                </p>
                {signedReceipts.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between gap-2 p-2.5 bg-[#06141E] border border-[#38BDF8]/20 font-mono text-xs"
                  >
                    <span className="flex items-center gap-2 text-[#F5F3E9] font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                      {r.alias}
                    </span>
                    <span className="text-[#8FA7B8]">{r.province}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
