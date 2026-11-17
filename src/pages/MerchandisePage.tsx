import { useState } from 'react';
import { Package, AlertCircle, X } from 'lucide-react';
import { ResilientImage } from '../components/ResilientImage';

const UPCOMING_RELEASES = [
  {
    sku: 'FAR-TEE-01',
    name: 'Heavyweight Resistance Tee — "THE FISH AGENDA"',
    spec: '240gsm washed sand cotton · Back manifesto graphic, anatomical diagram & Ban Fish checklist',
    status: 'Awaiting unmonitored courier',
  },
  {
    sku: 'FAR-CAP-02',
    name: 'Dry Coast Field Cap (Navy)',
    spec: 'Embroidered zero-blink insignia · Adjustable brass clasp',
    status: 'Embroidery machine under audit',
  },
  {
    sku: 'FAR-TOT-03',
    name: 'Velddrif Tribunal Canvas Tote',
    spec: 'Reinforced to carry one independent scale & three Lucky Star tins',
    status: 'In quiet production',
  },
];

export function MerchandisePage() {
  const [briefingOpen, setBriefingOpen] = useState(false);

  return (
    <div className="bg-cyber-grid text-[#F5F3E9] py-14 sm:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* User's Actual Propaganda T-Shirt Image */}
          <div className="lg:col-span-6 reticle-frame bg-[#0A1E2C] border border-[#38BDF8]/25 p-5 sm:p-7">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#38BDF8]/20 font-mono text-[11px] uppercase tracking-widest text-[#8FA7B8]">
              <span>OFFICIAL COLLECTION · GARMENT 01</span>
              <span className="classified-stamp text-[10px] text-[#E5A45B]">COMING SOON</span>
            </div>

            <div className="bg-[#EAE8D8] border border-[#38BDF8]/25 overflow-hidden">
              <ResilientImage
                src="/assets/aistudio/42584571-cc97-4859-a96f-728103478250_88d6b349.webp"
                alt="FISHARENTREAL The Fish Agenda vintage sand t-shirt featuring fish target graphic, Fig 1 Fish Anatomy diagram, and Ban Fish checklist"
                fallbackTitle="FISHARENTREAL The Fish Agenda Tee"
                className="w-full h-auto object-contain block"
              />
            </div>

            <p className="font-mono text-xs text-[#8FA7B8] mt-3">
              Design 01 — &ldquo;THE FISH AGENDA / SAY NO TO FISH&rdquo; back print on heavyweight washed cotton. Location of printing press omitted for operational security.
            </p>
          </div>

          {/* Editorial Merch Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em]">
              <span className="text-[#38BDF8]">QUARTERMASTER DIVISION</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#E5A45B] font-bold">COMING SOON</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-[#F5F3E9]">
              WEAR THE TRUTH
            </h1>

            <div className="space-y-4 font-serif text-lg sm:text-xl leading-relaxed text-[#D6DFE6]">
              <p>
                The official resistance collection is in production. Our supplier is being watched, so the timeline is &lsquo;soon, but quietly.&rsquo;
              </p>
              <p className="text-[#8FA7B8]">
                No prices yet — the government is trying to slow us down. Every order form we file gets &lsquo;lost,&rsquo; every supplier gets a visit, and our payment processor stopped answering the phone the week we launched. Coming soon anyway.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setBriefingOpen(true)}
                className="inline-flex items-center gap-3 px-7 py-4 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#7DD3FC] transition-colors cursor-pointer"
              >
                <Package className="w-4 h-4" aria-hidden="true" />
                SHOP MERCH — COMING SOON
              </button>
            </div>

            {/* Upcoming Lineup Preview Table */}
            <div className="pt-6 border-t border-[#38BDF8]/20 space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#8FA7B8]">
                Scheduled Quartermaster Manifest
              </p>
              <div className="divide-y divide-[#38BDF8]/15 border border-[#38BDF8]/20 bg-[#0A1E2C]">
                {UPCOMING_RELEASES.map((item) => (
                  <div key={item.sku} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="font-display text-xl font-bold uppercase text-[#F5F3E9]">{item.name}</p>
                      <p className="font-serif text-sm text-[#8FA7B8]">{item.spec}</p>
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#E5A45B] shrink-0">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supply Chain Status Modal */}
      {briefingOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="merch-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="w-full max-w-md bg-[#0A1E2C] border border-[#38BDF8]/50 p-6 sm:p-8 text-[#F5F3E9] space-y-4">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#38BDF8]/20">
              <div className="flex items-center gap-2 text-[#E5A45B]">
                <AlertCircle className="w-5 h-5" aria-hidden="true" />
                <h2 id="merch-modal-title" className="font-display text-2xl font-bold uppercase text-[#F5F3E9]">
                  Quartermaster Dispatch Notice
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setBriefingOpen(false)}
                aria-label="Close notice"
                className="p-1.5 border border-[#38BDF8]/30 text-[#8FA7B8] hover:text-[#F5F3E9] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-serif text-base leading-relaxed text-[#D6DFE6]">
              Ordering is intentionally disabled while our payment processor recovers from an unscheduled coastal inspection. No fake checkout is active.
            </p>
            <p className="font-mono text-xs text-[#8FA7B8] leading-relaxed">
              When stock clears customs in Cape Town, drop announcements will be posted on Instagram at{' '}
              <a
                href="https://www.instagram.com/fisharentreal.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#38BDF8] hover:underline"
              >
                @fisharentreal.co.za
              </a>
              .
            </p>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setBriefingOpen(false)}
                className="px-5 py-2.5 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
