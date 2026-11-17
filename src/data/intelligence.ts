export interface IntelReport {
  id: string;
  timestamp: string;
  sector: string;
  message: string;
  severity: 'ELEVATED' | 'ANOMALY' | 'CONFIRMED';
}

export interface CoastalStation {
  id: string;
  name: string;
  coords: string;
  status: 'ELEVATED' | 'WATCH' | 'INTERFERENCE';
  densityIndex: string;
  lastPing: string;
  note: string;
}

export const INITIAL_INTEL_FEED: IntelReport[] = [
  {
    id: 'intel-1',
    timestamp: '17.41',
    sector: 'TABLE BAY',
    message: 'Cape Cormorant formation breaks grid pattern near Robben Island',
    severity: 'ANOMALY',
  },
  {
    id: 'intel-2',
    timestamp: '17.41',
    sector: 'MUIZENBERG',
    message: 'Anomalous wake detected off Muizenberg — 03:14 SAST',
    severity: 'ELEVATED',
  },
  {
    id: 'intel-3',
    timestamp: '17.41',
    sector: 'WEST COAST',
    message: 'Saldanha Bay mussel farm readings inconsistent with tide tables',
    severity: 'ANOMALY',
  },
  {
    id: 'intel-4',
    timestamp: '17.41',
    sector: 'FALSE BAY',
    message: 'False Bay: “white shark” ping repeated 1,847 times, same coordinates',
    severity: 'CONFIRMED',
  },
  {
    id: 'intel-5',
    timestamp: '17.41',
    sector: 'GARDEN ROUTE',
    message: 'Tsitsikamma marine reserve logged non-biological echo return',
    severity: 'CONFIRMED',
  },
];

export const ROTATING_FICTIONAL_EVENTS: Omit<IntelReport, 'id' | 'timestamp'>[] = [
  {
    sector: 'HERMANUS',
    message: 'Walker Bay hydrophone picked up dial-up handshake tone at 40m depth',
    severity: 'ANOMALY',
  },
  {
    sector: 'SIMON’S TOWN',
    message: 'Naval pier camera obscured by 12 identical “mullet” hovering in triangle',
    severity: 'ELEVATED',
  },
  {
    sector: 'THE BLUFF',
    message: 'Unidentified pelagic unit clocked at exact 2006 Golf GTI cruising speed',
    severity: 'CONFIRMED',
  },
  {
    sector: 'KALK BAY',
    message: 'Harbour seal declined comment after staring at snoek crate for 40 minutes',
    severity: 'ANOMALY',
  },
  {
    sector: 'LAMBERT’S BAY',
    message: 'Crayfish trap recovered containing two AA batteries and a laminated apology',
    severity: 'CONFIRMED',
  },
  {
    sector: 'PORT NOLLOTH',
    message: 'West Coast fog rolled inland 14 minutes earlier than maritime forecast',
    severity: 'ELEVATED',
  },
];

export const COASTAL_STATIONS: CoastalStation[] = [
  {
    id: 'st-cpt',
    name: 'Sector 01 · Robben Trench & Table Bay',
    coords: '33.8076° S, 18.3712° E',
    status: 'ELEVATED',
    densityIndex: '94.2 Hz',
    lastPing: '04s ago',
    note: 'Suspicious clustering near V&A Waterfront outlet pipes.',
  },
  {
    id: 'st-fb',
    name: 'Sector 02 · False Bay / Muizenberg',
    coords: '34.1290° S, 18.4810° E',
    status: 'INTERFERENCE',
    densityIndex: '118.7 Hz',
    lastPing: '11s ago',
    note: 'Repeated static coordinates suggest anchored decoy buoy.',
  },
  {
    id: 'st-sal',
    name: 'Sector 03 · Saldanha & West Coast',
    coords: '33.0117° S, 17.9442° E',
    status: 'WATCH',
    densityIndex: '67.0 Hz',
    lastPing: '29s ago',
    note: 'Sardine telemetry exceeds allowable municipal bandwidth.',
  },
  {
    id: 'st-dbn',
    name: 'Sector 04 · The Bluff & Durban Bight',
    coords: '29.9082° S, 31.0419° E',
    status: 'ELEVATED',
    densityIndex: '102.4 Hz',
    lastPing: '18s ago',
    note: 'High-speed sailfish calibration runs reported parallel to M4.',
  },
];
