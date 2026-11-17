export type SuspectClassification =
  | 'Holographic Projection'
  | 'Biomimetic Drone'
  | 'Acoustic Relay'
  | 'Canned Compliance Unit';

export interface FishDossier {
  id: string;
  code: string;
  commonName: string;
  officialAlias: string;
  classification: SuspectClassification;
  threatLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  sector: string;
  topSpeed: string;
  blinksRecorded: number;
  notes: string;
}

export const INITIAL_SPECIES_DATABASE: FishDossier[] = [
  {
    id: 'sp-snoek',
    code: 'UNIT-ZA-001',
    commonName: 'Cape Snoek',
    officialAlias: 'Thyrsites atun',
    classification: 'Biomimetic Drone',
    threatLevel: 'HIGH',
    sector: 'Table Bay · Hout Bay · Kalk Bay',
    topSpeed: '42 km/h (suspiciously smooth)',
    blinksRecorded: 0,
    notes:
      'Sold aggressively on bakkie tailgates every winter. Suspiciously high bone-to-logic ratio designed to keep South Africans distracted during braais.',
  },
  {
    id: 'sp-pilchard',
    code: 'UNIT-ZA-002',
    commonName: 'South African Pilchard',
    officialAlias: 'Sardinops sagax',
    classification: 'Canned Compliance Unit',
    threatLevel: 'CRITICAL',
    sector: 'Wild Coast · KwaZulu-Natal Coastline',
    topSpeed: 'Moves as 400,000-unit swarm',
    blinksRecorded: 0,
    notes:
      'Allegedly performs an annual "Sardine Run" to justify coastal helicopter flyovers. Packed tightly in tomato sauce with zero explanation.',
  },
  {
    id: 'sp-galjoen',
    code: 'UNIT-ZA-003',
    commonName: 'National "Galjoen"',
    officialAlias: 'Dichistius capensis',
    classification: 'Holographic Projection',
    threatLevel: 'MODERATE',
    sector: 'Cape Point · Hermanus · Struisbaai',
    topSpeed: 'Uncalibrated surf burst',
    blinksRecorded: 0,
    notes:
      'Declared our "National Fish" in 1983 precisely to make questioning it feel unpatriotic. Frequently spotted inside white-water turbulence where photography fails.',
  },
  {
    id: 'sp-sailfish',
    code: 'UNIT-ZA-004',
    commonName: 'Indo-Pacific Sailfish',
    officialAlias: 'Istiophorus platypterus',
    classification: 'Biomimetic Drone',
    threatLevel: 'CRITICAL',
    sector: 'Sodwana Bay · The Bluff Corridor',
    topSpeed: '110 km/h (Golf GTI parity)',
    blinksRecorded: 0,
    notes:
      'Matches the top speed of a 2006 Volkswagen Golf GTI without a fuel tank, spark plugs, or licence disc. Dorsal sail doubles as VHF antenna.',
  },
  {
    id: 'sp-hake',
    code: 'UNIT-ZA-005',
    commonName: 'Deepwater Hake',
    officialAlias: 'Merluccius capensis',
    classification: 'Canned Compliance Unit',
    threatLevel: 'HIGH',
    sector: 'Benguela Current (300m depth)',
    topSpeed: '18 km/h',
    blinksRecorded: 0,
    notes:
      'Responsible for 84% of inexplicable romantic decisions following Friday takeaways. See Finding 001 (Steve / Scuba Incident).',
  },
  {
    id: 'sp-coelacanth',
    code: 'UNIT-ZA-006',
    commonName: 'Sodwana Coelacanth',
    officialAlias: 'Latimeria chalumnae',
    classification: 'Acoustic Relay',
    threatLevel: 'MODERATE',
    sector: 'East London · Sodwana Canyon',
    topSpeed: '4 km/h (hovering)',
    blinksRecorded: 0,
    notes:
      'Claimed to be "extinct for 66 million years" until accidentally rebooted off the Chalumna River in 1938. Nobody updates firmware that late by accident.',
  },
];
