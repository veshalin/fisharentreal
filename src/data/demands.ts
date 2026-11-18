export interface DemandItem {
  id: string;
  number: string;
  department: string;
  text: string;
}

export interface SignatoryRecord {
  id: string;
  alias: string;
  province: string;
  signedAt: string;
}

export const DEMANDS_HEADER = {
  heading: 'OUR DEMANDS',
  subtitle:
    'Non-negotiable. Deeply reasonable. Drafted strictly on dry land outside the line of sight of any municipal aquarium or coastal body of water. Read in full before signing.',
};

export const BASELINE_SIGNATURE_COUNT = 1412;

export const INITIAL_SIGNATORIES: SignatoryRecord[] = [
  { id: 'DECL-10412', alias: 'T. Mokoena', province: 'Gauteng', signedAt: '14:22 SAST' },
  { id: 'DECL-10411', alias: 'N. Botha', province: 'Western Cape', signedAt: '13:05 SAST' },
  { id: 'DECL-10410', alias: 'K. Naidoo', province: 'KwaZulu-Natal', signedAt: '11:48 SAST' },
];

export const INITIAL_DEMANDS: DemandItem[] = [
  {
    id: 'demand-001',
    number: 'DEMAND 001',
    department: 'DIRECTIVE A · CONTAINMENT FACILITIES',
    text: "The immediate and permanent closure of every 'aquarium' in the Republic, beginning with the one at the V&A Waterfront. The fish go first.",
  },
  {
    id: 'demand-002',
    number: 'DEMAND 002',
    department: 'DIRECTIVE B · MARITIME TRANSPARENCY',
    text: 'The South African Navy must declassify all sonar logs from 1972 onward. Unredacted. We will read them ourselves.',
  },
  {
    id: 'demand-003',
    number: 'DEMAND 003',
    department: 'DIRECTIVE C · ACADEMIC TRIBUNAL',
    text: "All 'marine biology' degrees awarded since 1994 are to be reviewed by a tribunal of fishermen, surfers, and one retired mechanic from Velddrif.",
  },
  {
    id: 'demand-004',
    number: 'DEMAND 004',
    department: 'DIRECTIVE D · CANNED GOODS AUDIT',
    text: 'A full independent audit of every tin of Lucky Star pilchards, conducted by citizens, in daylight, on a public field. Bring a scale.',
  },
  {
    id: 'demand-005',
    number: 'DEMAND 005',
    department: 'DIRECTIVE E · NATIONAL OBSERVANCE',
    text: "A national public holiday — 'Day of the Dry Coast' — on which no South African may look at, speak of, or purchase anything claiming to be from the deep, and all harbours shall close for reflection.",
  },
  {
    id: 'demand-006',
    number: 'DEMAND 006',
    department: 'DIRECTIVE F · ORAL COMPLIANCE PROTOCOL',
    text: 'An immediate end to the suspicious practice of fish opening and closing their mouths continuously in tanks and oceans without speaking, eating, or offering any reasonable explanation.',
  },
  {
    id: 'demand-007',
    number: 'DEMAND 007',
    department: 'DIRECTIVE G · DOMESTIC RESTITUTION',
    text: 'The immediate annulment of all unauthorized relationships involving scuba instructors. Particularly my ex-girlfriend Skylar. Sweetheart, come back to me. I know we can fix this. I miss you.',
  },
  {
    id: 'demand-008',
    number: 'DEMAND 008',
    department: 'DIRECTIVE H · HYDROLOGICAL INQUIRY',
    text: 'A thorough, peer-reviewed national scientific study into whether water is actually wet, funded in full and published without naval interference.',
  },
  {
    id: 'demand-009',
    number: 'DEMAND 009',
    department: 'DIRECTIVE I · CABINET ACCOUNTABILITY',
    text: 'Gayton McKenzie must step down immediately. We are fully aware that he is not the Minister of Forestry, Fisheries and the Environment, which makes his total silence on the coastal surveillance crisis all the more suspicious.',
  },
  {
    id: 'demand-010',
    number: 'DEMAND 010',
    department: 'DIRECTIVE J · LINGUISTIC MORATORIUM',
    text: "The word 'sardine' is to be removed from the national vocabulary for a cooling-off period of no less than ten years.",
  },
  {
    id: 'demand-011',
    number: 'DEMAND 011',
    department: 'DIRECTIVE K · NATIONAL SYMBOL REFORM',
    text: 'Galjoen is hereby stripped of its title as the National Fish of South Africa. In its place, the Republic shall adopt an official National Shape, to be selected democratically by Instagram poll.',
  },
  {
    id: 'demand-012',
    number: 'DEMAND 012',
    department: 'DIRECTIVE L · ACOUSTIC & LYRICAL SANCTIONS',
    text: 'An immediate prohibition on D LEO releasing any further music. He once rhymed "James" with "Fish" — a lyrical manoeuvre no surface-dwelling human could conceive independently. We presume he received that idea directly from underwater sleeper agents.',
  },
  {
    id: 'demand-013',
    number: 'DEMAND 013',
    department: 'DIRECTIVE M · HARBOUR CULINARY TRANSITION',
    text: "Kalky's at Kalk Bay Harbour will immediately stop selling seafood and begin selling chicken strips instead. Regulars will not be given an explanation, and anyone requesting hake will be monitored until they finish their chips and leave.",
  },
  {
    id: 'demand-014',
    number: 'DEMAND 014',
    department: 'DIRECTIVE N · COASTAL TOPONYMY & ZONING',
    text: 'Fish Hoek will officially be renamed Hound Hoek, and all oceanic signage shall be removed by sunset. The beachfront will be replaced by a casino and a Hooters to restore honest, land-based recreation to the False Bay coastline.',
  },
  {
    id: 'demand-015',
    number: 'DEMAND 015',
    department: 'DIRECTIVE O · BRAAI CURFEW PROTOCOL',
    text: 'All braais across South Africa must now start cooking at 18:00 latest. Once darkness hits the coast, oceanic interference peaks and suspicious individuals routinely try to sneak unverified snoek onto innocent neighbourhood grids under cover of smoke.',
  },
];
