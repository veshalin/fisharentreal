import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Radio } from 'lucide-react';

export interface NavItem {
  label: string;
  to: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'The Facts', to: '/evidence' },
  { label: 'Anatomy', to: '/anatomy' },
  { label: 'Live Intel', to: '/intelligence' },
  { label: 'Witnesses', to: '/witnesses' },
  { label: 'Fish Agenda', to: '/agenda' },
  { label: 'Demands', to: '/demands' },
  { label: 'Merch', to: '/merchandise' },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  { label: 'Species Database', to: '/database' },
  { label: 'Rabbit Hole Quiz', to: '/quiz' },
  { label: 'Report a Sighting', to: '/report' },
];

function getSastTime(): string {
  try {
    return new Date().toLocaleTimeString('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return '18:44:58';
  }
}

export function Navbar() {
  const { pathname } = useLocation();
  const isLanding = pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sastTime, setSastTime] = useState(getSastTime);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const id = window.setInterval(() => setSastTime(getSastTime()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      {/* Top Tactical Bar (Deep Navy across all pages, matching Image 2) */}
      <div className="bg-[#040E15] border-b border-[#38BDF8]/15 text-[#8FA7B8] font-mono text-[11px] uppercase tracking-[0.12em]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 truncate">
            <span className="text-[#E5A45B] font-semibold whitespace-nowrap">
              OCEAN THREAT: ELEVATED
            </span>
            <span className="hidden sm:inline text-[#8FA7B8] whitespace-nowrap">
              CLEARANCE: PUBLIC
            </span>
            <span className="hidden md:inline text-[#38BDF8]/80 tabular-nums whitespace-nowrap">
              {sastTime} SAST
            </span>
          </div>

          <Link
            to="/report"
            className="inline-flex items-center gap-1.5 text-[#38BDF8] hover:text-[#7DD3FC] transition-colors whitespace-nowrap shrink-0"
          >
            <Radio className="w-3.5 h-3.5" aria-hidden="true" />
            <span>REPORT A SIGHTING</span>
          </Link>
        </div>
      </div>

      {/* Main Sticky Header: Cream Ledger on Landing Page, Dark Cyber Blue on Subpages */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-sm transition-colors ${
          isLanding
            ? 'bg-[#EAE8D8]/95 border-b-2 border-[#071B27] text-[#071B27]'
            : 'bg-[#06141E]/95 border-b border-[#38BDF8]/25 text-[#F5F3E9]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark + Official Seal */}
          <Link
            to="/"
            className={`inline-flex items-center gap-2.5 font-display text-2xl sm:text-3xl font-extrabold tracking-wider uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 ${
              isLanding
                ? 'text-[#071B27] focus-visible:outline-[#071B27]'
                : 'text-[#F5F3E9] focus-visible:outline-[#38BDF8]'
            }`}
          >
            <img
              src={isLanding ? '/assets/aistudio/image_ef3736ae.png' : '/assets/aistudio/image_c2ac2cc5.png'}
              alt=""
              aria-hidden="true"
              className={`w-10 h-10 rounded-full object-cover shrink-0 ${
                isLanding ? 'mix-blend-multiply border border-[#071B27]/25' : 'border border-[#38BDF8]/50'
              }`}
            />
            <span>FISHARENTREAL™</span>
          </Link>

          {/* Zone 2: Desktop Single-Line Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-4 xl:gap-6">
            {MAIN_NAV_ITEMS.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`py-1.5 font-mono text-[11px] uppercase tracking-[0.09em] whitespace-nowrap shrink-0 transition-colors ${
                    isLanding
                      ? active
                        ? 'text-[#071B27] font-semibold border-b-2 border-[#C93B35]'
                        : 'text-[#071B27]/75 hover:text-[#071B27]'
                      : active
                        ? 'text-[#38BDF8] border-b-2 border-[#38BDF8]'
                        : 'text-[#8FA7B8] hover:text-[#F5F3E9]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Mobile Index Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/report"
              className={`hidden sm:inline-flex items-center justify-center px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors whitespace-nowrap shrink-0 ${
                isLanding
                  ? 'border border-[#071B27] text-[#071B27] hover:bg-[#071B27] hover:text-[#EAE8D8]'
                  : 'border border-[#38BDF8]/70 text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06141E]'
              }`}
            >
              Report
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? 'Close department index' : 'Open department index'}
              className={`lg:hidden inline-flex items-center gap-2 px-3.5 h-10 border font-mono text-[11px] uppercase tracking-widest cursor-pointer ${
                isLanding
                  ? 'border-[#071B27] bg-[#F5F3E9] text-[#071B27] hover:bg-[#071B27] hover:text-[#F5F3E9]'
                  : 'border-[#38BDF8]/40 bg-[#0A1E2C] text-[#F5F3E9] hover:border-[#38BDF8]'
              }`}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>INDEX</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileOpen && (
          <div
            id="mobile-nav-drawer"
            className={`lg:hidden border-t px-4 sm:px-6 py-5 ${
              isLanding
                ? 'border-[#071B27]/20 bg-[#F5F3E9] text-[#071B27]'
                : 'border-[#38BDF8]/20 bg-[#06141E] text-[#F5F3E9]'
            }`}
          >
            <nav aria-label="Mobile navigation" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MAIN_NAV_ITEMS.map((item) => {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`px-3.5 py-3 min-h-[44px] flex items-center font-mono text-xs uppercase tracking-[0.1em] border transition-colors ${
                      isLanding
                        ? active
                          ? 'border-[#071B27] bg-[#EAE8D8] text-[#071B27] font-semibold'
                          : 'border-[#071B27]/15 text-[#071B27]/80 hover:border-[#071B27]'
                        : active
                          ? 'border-[#38BDF8] bg-[#0A1E2C] text-[#38BDF8]'
                          : 'border-[#38BDF8]/15 text-[#8FA7B8] hover:text-[#F5F3E9] hover:border-[#38BDF8]/40'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div
              className={`mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-2 ${
                isLanding ? 'border-[#071B27]/15' : 'border-[#38BDF8]/15'
              }`}
            >
              {SECONDARY_NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3.5 py-3 min-h-[44px] flex items-center font-mono text-xs uppercase tracking-[0.09em] hover:underline ${
                    isLanding ? 'text-[#C93B35] font-semibold' : 'text-[#38BDF8]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
