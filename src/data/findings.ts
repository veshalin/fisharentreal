export interface FindingItem {
  id: string;
  refNumber: string;
  department: string;
  title: string;
  body: string;
  statistic: string;
  caption: string;
  footnote: string;
  deptPrompt: string;
  deptRedactedLines: string[];
  deptExcuse: string;
  iconName: 'flask' | 'droplet' | 'eyeOff' | 'scanEye' | 'mapPin' | 'gauge';
  classification: string;
}

export const EVIDENCE_HEADER = {
  heading: 'THE FACTS',
  intro:
    'Six findings our researchers were told, in writing, to stop publishing. We published them anyway. Read the findings, then the anatomy.',
};

export const SIX_FINDINGS: FindingItem[] = [
  {
    id: 'finding-001',
    refNumber: 'FINDING 001',
    department: 'BIO-CHEMICAL BEHAVIOUR DIVISION',
    title: 'THERE ARE HORMONES IN FISH',
    body: 'Fish carry a compound that gets into your blood and rewrites your decisions. My girlfriend ate fish and chips once. Two months later she left me for a scuba instructor named Steve. Steve owns a boat. How else would you explain this? We are not saying the fish did it. We are saying the fish did it.',
    statistic: '2 MONTHS',
    caption: 'From one portion to Steve',
    footnote: 'Filed under Case #CT-2019-STEVE. The boat was a 19-foot cabin cruiser moored near Hout Bay.',
    deptPrompt: 'When we asked the Department of Fisheries to comment, they replied:',
    deptRedactedLines: ['WE DO NOT RECOGNIZE STEVE OR', 'THE ALLEGED HAKE COMPOUND'],
    deptExcuse: 'Statement redacted under Section 4(b) of the Aquatic Secrecy Act, which also does not exist.',
    iconName: 'flask',
    classification: 'UNREFUTED',
  },
  {
    id: 'finding-002',
    refNumber: 'FINDING 002',
    department: 'HYDROLOGICAL INTEGRITY UNIT',
    title: "WHY HAVEN'T THEY DRUNK THE OCEAN?",
    body: 'Every fish on Earth has been sitting in water for over 400 million years and the sea level has not dropped a centimetre. Nothing that is genuinely thirsty behaves like that. They are not drinking. They are waiting.',
    statistic: '0CM',
    caption: 'Sea level lost, ever',
    footnote: 'Verified against Kalk Bay tidal gauge logs (1924–present). Not a single confirmed sip.',
    deptPrompt: 'When we asked the National Oceanography Desk to comment, they issued:',
    deptRedactedLines: ['OSMOREGULATION IS A MATTER OF', 'NATIONAL SECURITY CLEARANCE'],
    deptExcuse: 'Comment withheld pending hydrology tribunal in Velddrif.',
    iconName: 'droplet',
    classification: 'ANOMALOUS',
  },
  {
    id: 'finding-003',
    refNumber: 'FINDING 003',
    department: 'TERRESTRIAL VISIBILITY DESK',
    title: "THEY ALL LIVE WHERE WE CAN'T LOOK",
    body: 'Everything that breathes air lives out in the open — mountains, deserts, cities, your roof, your kitchen. Every single one of them, on display. Fish are the only exception, and they all chose the same hiding place: the 71% of the planet we cannot see.',
    statistic: '71%',
    caption: 'Of the planet, off limits to us',
    footnote: 'Compare with pigeons, which have the decency to stand on your car where you can verify them.',
    deptPrompt: 'Official response from the Maritime Transparency Committee:',
    deptRedactedLines: ['CITIZENS DO NOT REQUIRE LINE OF', 'SIGHT BELOW 1.5 METRES DEPTH'],
    deptExcuse: 'Response scrubbed prior to press deadline.',
    iconName: 'eyeOff',
    classification: 'CONCEALED',
  },
  {
    id: 'finding-004',
    refNumber: 'FINDING 004',
    department: 'OPTICAL SURVEILLANCE BUREAU',
    title: 'THEY NEVER BLINK',
    body: "Not once. In 71 years of continuous observation, no researcher has recorded a single fish blink. Cameras don't blink. Fish don't blink. Do the math.",
    statistic: '0',
    caption: 'Recorded blinks, ever',
    footnote: 'Tested across 14 pet shop tanks in Parow and one suspiciously calm trout in Dullstroom.',
    deptPrompt: 'When asked why zero blinks appear in UCT archives, officials stated:',
    deptRedactedLines: ['LENS HYDRATION DOES NOT REQUIRE', 'MECHANICAL EYELID ACTUATION'],
    deptExcuse: 'Transcript blacked out by aquarium legal counsel.',
    iconName: 'scanEye',
    classification: 'SURVEILLANCE',
  },
  {
    id: 'finding-005',
    refNumber: 'FINDING 005',
    department: 'INFRASTRUCTURE CORRELATION LAB',
    title: 'THEY FOLLOW THE MONEY',
    body: "Every major aquarium on Earth sits within 400 metres of a municipal data centre. Look at Cape Town: why is the Two Oceans Aquarium even called 'Two Oceans'? Nobody needs two oceans inside one building unless one tank is uploading and the other is downloading. Coincidence is a word invented by people who have never looked at a map.",
    statistic: '400M',
    caption: 'Max distance to fibre node',
    footnote: 'Measured from the Two Oceans Aquarium shark tunnel to the nearest V&A Waterfront municipal data vault.',
    deptPrompt: 'When asked about two separate oceans sharing one basement at the V&A, they said:',
    deptRedactedLines: ['TWO OCEANS SERVERS HANDLE', 'PENGUIN WI-FI AND TICKETING'],
    deptExcuse: 'Remainder of Two Oceans Aquarium plumbing schematic classified since 1995.',
    iconName: 'mapPin',
    classification: 'CORRELATED',
  },
  {
    id: 'finding-006',
    refNumber: 'FINDING 006',
    department: 'KINETIC PROPULSION AUDIT',
    title: 'FISH GOES VRRR PHA?',
    body: "The sailfish is the fastest thing in the ocean. My dad's 2006 Golf GTI is the fastest thing in the Bluff. They are the same speed. How is that possible? A fish has no engine, no wheels, no fuel, and no reason to hurry — and it still keeps pace with a car that has all four. One of them is lying about what it is.",
    statistic: '1:1',
    caption: 'Fish to GTI, top speed',
    footnote: 'Stage 1 remap not accounted for. The Golf had a noisy exhaust; the sailfish made zero decibels.',
    deptPrompt: 'When asked how a boneless creature hits 110 km/h, authorities replied:',
    deptRedactedLines: ['PROPULSION SPECS EXCEED PUBLIC', 'BIOLOGY CLEARANCE TIER 3'],
    deptExcuse: 'Dyno chart sealed at Durban Harbour.',
    iconName: 'gauge',
    classification: 'IMPOSSIBLE',
  },
];
