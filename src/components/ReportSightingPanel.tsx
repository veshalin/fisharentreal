import { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface SubmittedReceipt {
  dossierId: string;
  alias: string;
  submittedAt: string;
}

export function ReportSightingPanel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState<SubmittedReceipt | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !message.trim()) {
      setError('Provide at least an alias and a description of the aquatic anomaly.');
      return;
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setReceipt({
      dossierId: `FAR-SA-${randomCode}`,
      alias: name.trim(),
      submittedAt: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }) + ' SAST',
    });

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section
      id="report-sighting"
      aria-labelledby="report-sighting-heading"
      className="bg-cyber-grid text-[#F5F3E9] border-t border-[#38BDF8]/20 py-16 sm:py-20"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Form FAR-7 Desk */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#38BDF8] mb-2">
                FORM FAR-7 · FIELD SUBMISSIONS DESK
              </p>
              <h2
                id="report-sighting-heading"
                className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] text-[#F5F3E9]"
              >
                REPORT A SIGHTING
              </h2>
            </div>

            <p className="font-serif text-base sm:text-lg leading-relaxed text-[#D6DFE6]">
              Seen something fishy? Was a fish hovering? Watching? Send us everything. We read every report and forward the good ones to absolutely nobody, for your safety.
            </p>

            <div className="pt-4 border-t border-[#38BDF8]/20 space-y-4 font-mono text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#E5A45B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[#F5F3E9]">+27 21 000 XXXX</p>
                  <p className="text-[#8FA7B8] text-xs mt-0.5">
                    tip line, answered by a person who denies everything (number redacted)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <a href="mailto:tips@fisharentreal.co.za" className="text-[#38BDF8] hover:underline">
                    tips@fisharentreal.co.za
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D94B46] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-[#D6DFE6]">
                  Unit 4, Old Spy Headquarters, Under Robben Island, Cape Town
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Reticle-Framed Transmission Form */}
          <div className="lg:col-span-7 reticle-frame bg-[#0A1E2C]/90 border border-[#38BDF8]/25 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-6 border-b border-[#38BDF8]/15">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8FA7B8]">
                  SECURE TRANSMISSION · ENCRYPTED DISPATCH
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#F5F3E9] mt-1">
                  SEND YOUR REPORT
                </h3>
                <p className="font-serif text-sm text-[#8FA7B8] mt-1">
                  Use the form below. Do not use your real name if you have one.
                </p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest border border-[#E5A45B]/50 text-[#E5A45B] px-2.5 py-1">
                DEMO MODE
              </span>
            </div>

            {receipt && (
              <div
                role="status"
                className="mb-6 p-4 bg-[#06141E] border border-[#38BDF8]/40 text-xs font-mono space-y-2"
              >
                <div className="flex items-center gap-2 text-[#38BDF8]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="font-semibold uppercase">
                    Demonstration Receipt Generated · {receipt.dossierId}
                  </span>
                </div>
                <p className="text-[#D6DFE6]">
                  Alias logged: <span className="text-[#F5F3E9]">{receipt.alias}</span> · {receipt.submittedAt}
                </p>
                <p className="text-[#8FA7B8]">
                  Note: Because this is a static demonstration without a live backend connected yet, your testimony was not transmitted or stored externally.
                </p>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mb-5 p-3 bg-[#D94B46]/15 border border-[#D94B46] text-[#F5F3E9] font-mono text-xs flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-[#D94B46] shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="sighting-name"
                    className="block font-mono text-xs uppercase tracking-wider text-[#8FA7B8] mb-2"
                  >
                    Name (or Alias)
                  </label>
                  <input
                    id="sighting-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dry Land Witness #09"
                    className="w-full px-3.5 py-2.5 bg-[#06141E] border border-[#38BDF8]/25 text-[#F5F3E9] placeholder:text-[#8FA7B8]/50 font-mono text-sm focus:outline-none focus:border-[#38BDF8]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="sighting-email"
                    className="block font-mono text-xs uppercase tracking-wider text-[#8FA7B8] mb-2"
                  >
                    Email (Optional / Burner)
                  </label>
                  <input
                    id="sighting-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="witness@example.co.za"
                    className="w-full px-3.5 py-2.5 bg-[#06141E] border border-[#38BDF8]/25 text-[#F5F3E9] placeholder:text-[#8FA7B8]/50 font-mono text-sm focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="sighting-message"
                  className="block font-mono text-xs uppercase tracking-wider text-[#8FA7B8] mb-2"
                >
                  Message / Testimony
                </label>
                <textarea
                  id="sighting-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe location (e.g. Kalk Bay pier), observed formation, blink count (0), and proximity to nearest data centre..."
                  className="w-full px-3.5 py-2.5 bg-[#06141E] border border-[#38BDF8]/25 text-[#F5F3E9] placeholder:text-[#8FA7B8]/50 font-serif text-sm focus:outline-none focus:border-[#38BDF8]"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <p className="font-mono text-[11px] text-[#8FA7B8]">
                  Static demonstration form · Ready for webhook or Cloudflare Worker endpoint.
                </p>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-[0.1em] hover:bg-[#7DD3FC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Submit Your Testimony
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
