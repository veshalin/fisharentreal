export interface DemandItem {
  id: string;
  number: string;
  department: string;
  text: string;
  hasEditableEnding?: boolean;
  defaultEnding?: string;
}

export const DEMANDS_HEADER = {
  heading: 'OUR DEMANDS',
  subtitle: 'Non-negotiable. Reasonable. Long overdue. Read them in full before you sign.',
};

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
    department: 'DIRECTIVE B · CANNED GOODS AUDIT',
    text: 'A full independent audit of every tin of Lucky Star pilchards, conducted by citizens, in daylight, on a public field. Bring a scale.',
  },
  {
    id: 'demand-003',
    number: 'DEMAND 003',
    department: 'DIRECTIVE C · MARITIME TRANSPARENCY',
    text: 'The South African Navy must declassify all sonar logs from 1972 onward. Unredacted. We will read them ourselves.',
  },
  {
    id: 'demand-004',
    number: 'DEMAND 004',
    department: 'DIRECTIVE D · ACADEMIC TRIBUNAL',
    text: "All 'marine biology' degrees awarded since 1994 are to be reviewed by a tribunal of fishermen, surfers, and one retired mechanic from Velddrif.",
  },
  {
    id: 'demand-005',
    number: 'DEMAND 005',
    department: 'DIRECTIVE E · LINGUISTIC MORATORIUM',
    text: "The word 'sardine' is to be removed from the national vocabulary for a cooling-off period of no less than ten years.",
  },
  {
    id: 'demand-006',
    number: 'DEMAND 006',
    department: 'DIRECTIVE F · NATIONAL OBSERVANCE',
    text: "A national public holiday — 'Day of the Dry Coast' — on which no South African may look at, speak of, or purchase anything claiming to be from the",
    hasEditableEnding: true,
    defaultEnding: '[TEXT CUT OFF IN ORIGINAL DOCUMENT — EDIT TO COMPLETE]',
  },
];
