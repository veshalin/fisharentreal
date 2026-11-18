import { useState } from 'react';
import { Package, AlertCircle, X, ShieldOff, Sticker, Shirt, ExternalLink } from 'lucide-react';
import { ResilientImage } from '../components/ResilientImage';

interface MerchItem {
  sku: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  specs: string[];
  status: string;
  icon: 'shirt' | 'cap' | 'sticker';
}

const QUARTERMASTER_ITEMS: MerchItem[] = [
  {
    sku: 'FAR-UNI-01',
    category: 'STANDARD ISSUE APPAREL',
    name: 'THE FISH AREN’T REAL UNIFORM (THE SHIRT)',
    tagline: 'Raise awareness. Join the cause.',
    description:
      'The official uniform of the resistance. Heavyweight washed cotton featuring the full "THE FISH AGENDA / SAY NO TO FISH" dossier back print so everyone standing behind you in the Checkers queue knows where you stand on the 71% cover-up.',
    specs: [
      '240gsm heavyweight combed cotton',
      'Full anatomical schematic & Ban Fish checklist on back',
      'Scientifically guaranteed to annoy uncles who own fishing boats',
    ],
    status: 'Awaiting unmonitored courier',
    icon: 'shirt',
  },
  {
    sku: 'FAR-CAP-02',
    category: 'HEADGEAR · SIGNAL AUDIT',
    name: 'ELECTROMAGNETIC PROTECTIVE CAP',
    tagline: 'Blocks 0% of signal.',
    description:
      'Constructed from ordinary dark navy cotton twill with zero lead lining, zero copper mesh, and an embroidered zero-blink emblem. Laboratory tests confirm it blocks precisely 0% of sonar, Wi-Fi, or aquatic hydrophone telemetry — we just wanted to be honest with you.',
    specs: [
      '0.0% electromagnetic attenuation (verified in Parow)',
      'Adjustable brass strap for high-wind Cape Point patrols',
      'Does not stop goldfish from watching you, looks sharp anyway',
    ],
    status: 'Embroidery machine under audit',
    icon: 'cap',
  },
  {
    sku: 'FAR-STK-03',
    category: 'TACTICAL DECALS · DETERRENT',
    name: 'WARDING-OFF STICKER PACK',
    tagline: 'Scientifically unverified ward against aquatic nonsense.',
    description:
      'Weatherproof die-cut vinyl stickers engineered to ward off seagulls, scuba instructors named Steve, suspiciously oily hake specials, and unsolicited invitations to the Two Oceans Aquarium.',
    specs: [
      'Pack of 6 matte UV-resistant vinyl decals',
      'Safe for cooler boxes, laptops, and 2006 Golf GTI rear windows',
      'Side effects may include strangers asking "Wait, do fish actually drink?"',
    ],
    status: 'In quiet production',
    icon: 'sticker',
  },
];

function ItemIcon({ icon }: { icon: MerchItem['icon'] }) {
  const props = { className: 'w-5 h-5 text-[#38BDF8]', 'aria-hidden': true as const };
  switch (icon) {
    case 'shirt':
      return <Shirt {...props} />;
    case 'cap':
      return <ShieldOff {...props} />;
    case 'sticker':
      return <Sticker {...props} />;
  }
}

export function MerchandisePage() {
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
  const [briefingOpen, setBriefingOpen] = useState(false);

  return (
    <div className="bg-cyber-grid text-[#F5F3E9] py-14 sm:py-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Showcase: The Uniform */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 reticle-frame bg-[#0A1E2C] border border-[#38BDF8]/25 p-5 sm:p-7">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#38BDF8]/20 font-mono text-[11px] uppercase tracking-widest text-[#8FA7B8]">
              <span>STANDARD ISSUE · THE UNIFORM</span>
              <span className="classified-stamp text-[10px] text-[#E5A45B]">COMING SOON</span>
            </div>

            <div className="bg-[#EAE8D8] border border-[#38BDF8]/25 overflow-hidden">
              <ResilientImage
                src="/assets/aistudio/42584571-cc97-4859-a96f-728103478250_88d6b349.webp"
                alt="FISHARENTREAL The Fish Agenda vintage t-shirt uniform featuring engraved fish target graphic and Say No To Fish manifesto"
                fallbackTitle="FISHARENTREAL Resistance Uniform"
                className="w-full h-auto object-contain block"
              />
            </div>

            <p className="font-mono text-xs text-[#8FA7B8] mt-3">
              The Fish Aren&apos;t Real Uniform — &ldquo;THE FISH AGENDA / SAY NO TO FISH&rdquo; back print. Location of printing press omitted for operational security.
            </p>
          </div>

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
                The Fish Aren&apos;t Real uniform is the shirt — built to raise awareness, start arguments at coastal braais, and rally citizens to join the cause.
              </p>
              <p>
                Our official collection (uniform shirts, electromagnetic protective caps, and warding stickers) is in production. Our supplier is being watched, so the timeline is &lsquo;soon, but quietly.&rsquo;
              </p>
              <p className="text-base text-[#8FA7B8]">
                No prices yet — the government is trying to slow us down. Every order form we file gets &lsquo;lost,&rsquo; every supplier gets a visit, and our payment processor stopped answering the phone the week we launched. Coming soon anyway.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={() => setBriefingOpen(true)}
                className="inline-flex items-center gap-3 px-7 py-4 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#7DD3FC] transition-colors cursor-pointer"
              >
                <Package className="w-4 h-4" aria-hidden="true" />
                SHOP MERCH — COMING SOON
              </button>

              <a
                href="https://www.instagram.com/fisharentreal.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#38BDF8]/60 text-[#38BDF8] font-mono text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#38BDF8] hover:text-[#06141E] transition-colors"
              >
                JOIN THE CAUSE ON IG
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Full 3-Item Quartermaster Lineup */}
        <section aria-label="Upcoming merchandise manifest" className="space-y-6 pt-10 border-t border-[#38BDF8]/20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#38BDF8]">
                FIELD ISSUE EQUIPMENT · 3 RELEASES
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase text-[#F5F3E9] mt-1">
                THE RESISTANCE KIT
              </h2>
            </div>
            <p className="font-mono text-xs text-[#8FA7B8]">
              Raise awareness · Join the cause · Question the ocean
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {QUARTERMASTER_ITEMS.map((item) => (
              <article
                key={item.sku}
                className="reticle-frame flex flex-col justify-between bg-[#0A1E2C] border border-[#38BDF8]/25 p-6 space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#38BDF8]/15 font-mono text-[11px]">
                    <span className="inline-flex items-center gap-2 text-[#38BDF8]">
                      <ItemIcon icon={item.icon} />
                      {item.sku}
                    </span>
                    <span className="text-[#E5A45B] uppercase">{item.category}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F5F3E9]">
                    {item.name}
                  </h3>

                  <p className="font-mono text-xs uppercase tracking-wider text-[#38BDF8]">
                    {item.tagline}
                  </p>

                  <p className="font-serif text-base leading-relaxed text-[#D6DFE6]">
                    {item.description}
                  </p>

                  <ul className="space-y-1.5 pt-2 font-mono text-xs text-[#8FA7B8]">
                    {item.specs.map((spec) => (
                      <li key={spec}>· {spec}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#38BDF8]/15 flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#E5A45B]">
                    {item.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="px-3.5 py-2 bg-[#06141E] border border-[#38BDF8]/40 font-mono text-[11px] uppercase tracking-wider text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06141E] transition-colors cursor-pointer"
                  >
                    Inspect Spec
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Item Spec Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="item-spec-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="w-full max-w-md bg-[#0A1E2C] border border-[#38BDF8]/50 p-6 sm:p-8 text-[#F5F3E9] space-y-4">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#38BDF8]/20">
              <div>
                <p className="font-mono text-[11px] uppercase text-[#38BDF8]">{selectedItem.sku}</p>
                <h2 id="item-spec-title" className="font-display text-2xl font-bold uppercase mt-1">
                  {selectedItem.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close item details"
                className="p-1.5 border border-[#38BDF8]/30 text-[#8FA7B8] hover:text-[#F5F3E9] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="font-serif text-base text-[#D6DFE6] leading-relaxed">
              {selectedItem.description}
            </p>
            <div className="p-3.5 bg-[#06141E] border border-[#38BDF8]/20 font-mono text-xs text-[#E5A45B]">
              STATUS: {selectedItem.status} · No fake checkout active. Drop dates announced via @fisharentreal.co.za.
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 bg-[#38BDF8] text-[#06141E] font-mono text-xs font-semibold uppercase cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
              When the uniform shirts, 0%-blocking electromagnetic caps, and warding stickers clear customs in Cape Town, drops will be announced on Instagram at{' '}
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
