import { useState, useEffect, FormEvent } from 'react';
import { CheckCircle2, FileSignature } from 'lucide-react';
import {
  BASELINE_SIGNATURE_COUNT,
  DEMANDS_HEADER,
  INITIAL_DEMANDS,
  INITIAL_SIGNATORIES,
  SignatoryRecord,
} from '../data/demands';

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

const SIGNATURES_STORAGE_KEY = 'fisharentreal_demands_ledger_v1';

interface StoredLedger {
  extraCount: number;
  recentSignatories: SignatoryRecord[];
}

export function DemandsPage() {
  const [ledger, setLedger] = useState<StoredLedger>(() => {
    try {
      const saved = localStorage.getItem(SIGNATURES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as StoredLedger;
        if (typeof parsed.extraCount === 'number' && Array.isArray(parsed.recentSignatories)) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial seeded state
    }
    return {
      extraCount: 0,
      recentSignatories: INITIAL_SIGNATORIES,
    };
  });

  const [alias, setAlias] = useState('');
  const [province, setProvince] = useState(SA_PROVINCES[0]);
  const [justSigned, setJustSigned] = useState<SignatoryRecord | null>(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(SIGNATURES_STORAGE_KEY, JSON.stringify(ledger));
    } catch {
      // Ignore storage errors
    }
  }, [ledger]);

  const totalSignatures = BASELINE_SIGNATURE_COUNT + ledger.extraCount;

  const handleSignDeclaration = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!alias.trim()) {
      setFormError('Please enter your name or alias to record your official signature.');
      return;
    }

    const nextNumber = totalSignatures + 1;
    const newRecord: SignatoryRecord = {
      id: `DECL-${nextNumber}`,
      alias: alias.trim(),
      province,
      signedAt:
        new Date().toLocaleTimeString('en-ZA', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        }) + ' SAST',
    };

    setLedger((prev) => ({
      extraCount: prev.extraCount + 1,
      recentSignatories: [newRecord, ...prev.recentSignatories],
    }));

    setJustSigned(newRecord);
    setAlias('');
  };

  return (
    <div className="bg-ruled-ledger text-[#071B27] py-12 sm:py-16 lg:py-20">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Formal White Paper Charter Sheet */}
        <article className="bg-[#FCFBF7] border-2 border-[#071B27] p-6 sm:p-10 lg:p-14 shadow-md">
          {/* Top Parliamentary Metadata & Live Signature Counter */}
          <header className="pb-8 mb-10 border-b-2 border-[#071B27] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] text-[#071B27]/75">
              <span>REPUBLIC OF SOUTH AFRICA · PETITION NO. 015-ZA</span>
              <span className="classified-stamp text-[11px] text-[#C93B35]">NON-NEGOTIABLE</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <h1 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-[#071B27]">
                  {DEMANDS_HEADER.heading}
                </h1>
                <p className="font-serif italic text-xl leading-relaxed text-[#071B27]/80 max-w-xl">
                  &ldquo;{DEMANDS_HEADER.subtitle}&rdquo;
                </p>
              </div>

              {/* Real Updating Live Signature Tally */}
              <div className="bg-[#EAE8D8] border border-[#071B27] px-5 py-4 shrink-0 text-left md:text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C93B35] font-semibold">
                  OFFICIAL SIGNATURES RECORDED
                </p>
                <p className="font-display text-4xl sm:text-5xl font-extrabold text-[#071B27] tabular-nums leading-none mt-1">
                  {totalSignatures.toLocaleString('en-ZA')}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#071B27]/65 mt-1">
                  DRY COAST DECLARATION LEDGER
                </p>
              </div>
            </div>
          </header>

          {/* Fifteen Formal Numbered Demands */}
          <div className="divide-y divide-[#071B27]/18">
            {INITIAL_DEMANDS.map((demand) => (
              <section key={demand.id} className="py-6 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#071B27]">
                    {demand.number}
                  </h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#C93B35] font-semibold">
                    {demand.department}
                  </span>
                </div>
                <p className="font-serif text-lg leading-relaxed text-[#071B27]/90">
                  {demand.text}
                </p>
              </section>
            ))}
          </div>

          {/* Inline Endorsement & Real-Time Signature Recording Section */}
          <section
            id="sign-declaration"
            aria-labelledby="sign-declaration-heading"
            className="mt-10 pt-8 border-t-2 border-[#071B27] space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#C93B35] font-semibold">
                  CITIZEN ENDORSEMENT LEDGER
                </p>
                <h2
                  id="sign-declaration-heading"
                  className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#071B27] mt-1"
                >
                  SIGN THE DECLARATION
                </h2>
                <p className="font-serif text-sm text-[#071B27]/75 mt-1">
                  Add your name below. Your signature increments the official tally immediately and saves locally.
                </p>
              </div>

              <div className="font-mono text-xs uppercase text-[#071B27] bg-[#EAE8D8] border border-[#071B27]/30 px-3.5 py-2 shrink-0 tabular-nums">
                CURRENT COUNT: <span className="font-bold">{totalSignatures.toLocaleString('en-ZA')}</span>
              </div>
            </div>

            {justSigned && (
              <div
                role="status"
                className="p-4 bg-[#EAE8D8] border border-[#071B27] flex items-start gap-3 font-mono text-xs text-[#071B27]"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold uppercase">
                    Signature Recorded · {justSigned.id}
                  </p>
                  <p className="mt-0.5 text-[#071B27]/80">
                    Thank you, {justSigned.alias} ({justSigned.province}). Total count updated to{' '}
                    <span className="font-bold tabular-nums">{totalSignatures.toLocaleString('en-ZA')}</span>.
                  </p>
                </div>
              </div>
            )}

            {formError && (
              <p role="alert" className="font-mono text-xs text-[#C93B35] font-semibold">
                {formError}
              </p>
            )}

            <form onSubmit={handleSignDeclaration} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-5">
                <label
                  htmlFor="decl-inline-alias"
                  className="block font-mono text-[11px] uppercase tracking-wider text-[#071B27]/80 mb-1.5"
                >
                  Full Name or Alias
                </label>
                <input
                  id="decl-inline-alias"
                  type="text"
                  required
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="e.g. Johan V. (Not Steve)"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#071B27]/40 font-mono text-sm text-[#071B27] focus:outline-none focus:border-[#071B27]"
                />
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="decl-inline-prov"
                  className="block font-mono text-[11px] uppercase tracking-wider text-[#071B27]/80 mb-1.5"
                >
                  Province
                </label>
                <select
                  id="decl-inline-prov"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#071B27]/40 font-mono text-sm text-[#071B27] focus:outline-none focus:border-[#071B27]"
                >
                  {SA_PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#071B27] text-[#F5F3E9] font-mono text-xs font-semibold uppercase tracking-[0.1em] hover:bg-[#C93B35] transition-colors cursor-pointer"
                >
                  <FileSignature className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>SIGN NOW</span>
                </button>
              </div>
            </form>

            {/* Public Signatory Ledger */}
            <div className="pt-4 border-t border-[#071B27]/15 space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#071B27]/70">
                RECENT VERIFIED SIGNATORIES
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {ledger.recentSignatories.slice(0, 6).map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 bg-[#EAE8D8]/70 border border-[#071B27]/15 font-mono text-xs space-y-0.5"
                  >
                    <div className="flex items-center justify-between gap-2 text-[#071B27] font-semibold">
                      <span className="truncate">{rec.alias}</span>
                      <span className="text-[10px] text-[#C93B35] shrink-0">{rec.id}</span>
                    </div>
                    <p className="text-[11px] text-[#071B27]/70">
                      {rec.province} · {rec.signedAt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
