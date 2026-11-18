import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { MAIN_NAV_ITEMS, SECONDARY_NAV_ITEMS } from './Navbar';

export function Footer() {
  return (
    <footer className="bg-[#040E15] border-t border-[#38BDF8]/20 text-[#8FA7B8]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#38BDF8]/15">
          {/* Brand & Jurisdiction */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-display text-3xl font-bold tracking-wider uppercase text-[#F5F3E9]">
              FISHARENTREAL™
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#38BDF8]">
              Independent Aquatic Investigations · South Africa
            </p>
            <p className="font-serif text-sm leading-relaxed text-[#8FA7B8] max-w-sm pt-2">
              Dedicated to questioning the aquatic narrative and documenting every unblinking anomaly along the South African coastline.
            </p>
          </div>

          {/* Departments */}
          <div className="md:col-span-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F3E9] mb-4">
              Departments &amp; Dossiers
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[...MAIN_NAV_ITEMS, ...SECONDARY_NAV_ITEMS].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="font-mono text-xs text-[#8FA7B8] hover:text-[#38BDF8] transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Field Office */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[#F5F3E9] mb-4">
              Field Contact &amp; Dispatch
            </h2>
            <p className="font-mono text-xs text-[#D6DFE6]">
              Email:{' '}
              <a
                href="mailto:tips@fisharentreal.co.za"
                className="text-[#38BDF8] hover:underline"
              >
                tips@fisharentreal.co.za
              </a>
            </p>
            <p className="font-mono text-xs text-[#D6DFE6]">
              Tip Line: +27 21 000 XXXX (Number redacted)
            </p>
            <p className="font-mono text-xs text-[#8FA7B8] leading-relaxed">
              Unit 4, Old Spy Headquarters, Under Robben Island, Cape Town
            </p>
            <div className="pt-2">
              <a
                href="https://www.instagram.com/fisharentreal.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#F5F3E9] border border-[#38BDF8]/30 px-3.5 py-2.5 hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                <span>@fisharentreal.co.za</span>
              </a>
            </div>
          </div>
        </div>

        {/* Satirical Disclaimer & Colophon */}
        <div className="pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-xs font-mono">
          <p className="text-[#8FA7B8] leading-relaxed max-w-3xl">
            SATIRICAL PROJECT DISCLAIMER: FISHARENTREAL™ (fisharentreal.co.za) is a satirical comedy and fictional investigative art project. All sightings, intelligence feeds, anatomical conclusions, and demands are parody. Fish are officially described as biological organisms, and no real surveillance data is collected or transmitted. The authorities forced us to put this here before they threatened to seize our binoculars.
          </p>
          <p className="text-[#8FA7B8]/80 whitespace-nowrap shrink-0">
            EST. 2016 · QUESTION THE OCEAN
          </p>
        </div>
      </div>
    </footer>
  );
}
