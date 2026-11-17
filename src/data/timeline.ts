export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  body: string;
  loreNote?: string;
  location: string;
  classification: string;
  isIncompletePlaceholder?: boolean;
  isUserAdded?: boolean;
}

export interface LoreDossier {
  code: string;
  title: string;
  summary: string;
}

export const TIMELINE_HEADER = {
  kicker: 'THE RECORD · DEEP CHRONOLOGY',
  heading: 'The fish agenda',
  intro:
    'An expanded chronology of the program in South Africa. Dates are approximate by design — the agenda does not publish its calendar, and several municipal ledgers burned quietly in 1996.',
};

export const LORE_MEMOS: LoreDossier[] = [
  {
    code: 'MEMO-A · OPERATION SILVER SHOAL',
    title: 'The Annual "Sardine Run" Cover',
    summary:
      'Every winter along the Wild Coast, millions of synchronized units migrate northward in tight geometric grids. Official textbooks call it a spawning migration. Yet no maternity ward has ever been photographed, and half the shoal ends up inside identical red tins.',
  },
  {
    code: 'MEMO-B · THE 400M CONDUIT RULE',
    title: 'Aquariums & Municipal Fibre',
    summary:
      'Architectural blueprints filed in Cape Town, Durban, and Gqeberha reveal high-capacity cooling trunks routed directly beneath coastal viewing tanks. The glass walls are 14 centimetres thick—not to hold water in, but to prevent mobile phone compasses from spinning.',
  },
  {
    code: 'MEMO-C · THE LUCKY STAR STANDARD',
    title: 'Tinned Compliance Logistics',
    summary:
      'Why tomato sauce? Because thick red brine masks internal wiring solder and prevents inquisitive citizens in Velddrif from inspecting dorsal rivets under natural sunlight.',
  },
];

export const DEFAULT_TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: 'tl-1938',
    year: '1938',
    title: 'The Chalumna "Coelacanth" Reboot',
    body: 'Declared extinct for 66 million years until an unpatched legacy prototype washes up off East London. Museum staff are politely instructed never to look inside the gill manifold.',
    loreNote: 'Internal log notes a faint smell of transformer oil and stubbornly intact dorsal solder joints.',
    location: 'Chalumna River Mouth, Eastern Cape',
    classification: 'PRE-ROLLOUT INCIDENT 38-E',
  },
  {
    id: 'tl-1953',
    year: '1953',
    title: 'The Sub-Surface Conduit Mandate',
    body: 'Coastal municipal planners quietly reserve 400-metre radius corridors between storm drainage shafts and future "marine education" zones.',
    loreNote: 'Blueprint annotations refer to "biological projection chambers" twenty-eight years before any aquarium opened.',
    location: 'Cape Town · Durban · Port Elizabeth',
    classification: 'MUNICIPAL ARCHIVE 53-M',
  },
  {
    id: 'tl-1972',
    year: '1972',
    title: 'Project Pilchard Initialised',
    body: "The Oceanic Replacement Program goes live. 'Fish' deployment begins off the West Coast, disguised as a 'sardine migration study.'",
    loreNote: 'Fourteen unmarked trawlers depart Saldanha Bay at 02:14 SAST carrying waterproof crates marked "AGRICULTURAL FERTILISER."',
    location: 'Saldanha / West Coast Shelf',
    classification: 'DECLASSIFIED LOG 72-A',
  },
  {
    id: 'tl-1981',
    year: '1981',
    title: 'Public Containment & Retail Integration',
    body: 'The Two Oceans Aquarium opens in Cape Town — a way to normalise the projections inside a public building, with a gift shop.',
    loreNote: 'Within 24 months, souvenir keychains subsidise 38% of Table Bay hydrophone upkeep. Poster No. 7 is briefly displayed, then withdrawn in 1983.',
    location: 'Cape Town Harbour Precinct',
    classification: 'MUNICIPAL RECORD 81-C',
  },
  {
    id: 'tl-1983',
    year: '1983',
    title: 'The Galjoen Patriotism Protocol',
    body: 'Dichistius capensis is elevated to "National Fish" status. Questioning whether a galjoen actually exists is quietly reframed as bad manners at a coastal braai.',
    loreNote: 'Simultaneously, Poster No. 7 ("It Is Watching The Mountain") is ordered removed from public noticeboards across Sea Point.',
    location: 'Cape Point to Struisbaai',
    classification: 'CULTURAL DIRECTIVE 83-G',
  },
  {
    id: 'tl-1994',
    year: '1994',
    title: 'The Marine Reserve Expansion',
    body: "Coincidentally the same year as our democracy. The 'marine reserves' expand overnight. 'Conservation' becomes the cover for a nationwide rollout.",
    loreNote: 'Public access below the low-tide mark is restricted along 14 key headlands; acoustic buoys begin pulsing 24/7 off Tsitsikamma.',
    location: 'Republic Coastline (3,000 km)',
    classification: 'CLASSIFIED ADDENDUM 94-X',
  },
  {
    id: 'tl-1998',
    year: '1998',
    title: 'Archive Entry 1998 [Incomplete Source Text]',
    body: '[ORIGINAL TEXT CUT OFF IN RECOVERED ARCHIVE — CLICK EDIT TO ENTER OR APPEND YOUR OWN RECORD FOR 1998]',
    loreNote: 'Water-damaged microfilm recovered from Unit 4 filing cabinet.',
    location: 'Unconfirmed Coastal Sector',
    classification: 'PARTIAL RECORD 98-?',
    isIncompletePlaceholder: true,
  },
  {
    id: 'tl-2006',
    year: '2006',
    title: 'The Bluff Kinetic Parity Incident',
    body: 'An Indo-Pacific sailfish is clocked matching the exact top speed of a 2006 Volkswagen Golf GTI down the Durban coastline. Neither official biology nor VW South Africa issues a joint statement.',
    loreNote: 'The GTI required 95-octane unleaded petrol; the sailfish allegedly ran on "determination" and zero visible intake valves.',
    location: 'The Bluff / M4 Coastal Corridor',
    classification: 'KINETIC AUDIT 06-V',
  },
  {
    id: 'tl-2019',
    year: '2019',
    title: 'Case #CT-2019-STEVE',
    body: 'First documented civilian behavioural rewrite after consuming battered hake and chips. Within sixty days the subject purchases a wetsuit and relocates aboard a 19-foot cabin cruiser.',
    loreNote: 'Establishes permanent precedent for Finding 001. Hout Bay marina remains under passive observation.',
    location: 'Hout Bay Harbour',
    classification: 'BIO-CHEMICAL FILE 19-S',
  },
];
