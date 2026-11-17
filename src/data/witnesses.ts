export interface WitnessTestimonial {
  id: string;
  quote: string;
  name: string;
  initials: string;
  description: string;
  caseFile: string;
}

export const WITNESS_HEADER = {
  kicker: 'VOICES OF THE RESISTANCE',
  heading: 'South Africans are talking',
  intro:
    'From the coast to the Highveld, ordinary people are noticing. These are their words, shared with permission.',
};

export const INITIAL_WITNESSES: WitnessTestimonial[] = [
  {
    id: 'wit-thabo',
    quote:
      "I spent three years at UCT studying 'ichthyology.' Not once did anyone let us open one up. They said it was 'ethical.' I now understand what that word actually meant.",
    name: 'Thabo M.',
    initials: 'TM',
    description: 'Former marine biology student · Soweto, Gauteng',
    caseFile: 'FILE #WIT-2023-014',
  },
  {
    id: 'wit-antoinette',
    quote:
      'Every Friday my husband bought hake from the corner café in Parow. By Sunday he was defending ocean conservation documentaries. The man does not even like swimming.',
    name: 'Antoinette V.',
    initials: 'AV',
    description: 'Retired bookkeeper · Parow, Western Cape',
    caseFile: 'FILE #WIT-2024-039',
  },
  {
    id: 'wit-kagiso',
    quote:
      'We stood at the edge of Hartbeespoort Dam for six hours with a pair of binoculars. The carp did not blink once. Not one blink. Even my cousin who works night shift at the tollgate blinks.',
    name: 'Kagiso R.',
    initials: 'KR',
    description: 'Amateur ornithologist · Brits, North West',
    caseFile: 'FILE #WIT-2025-071',
  },
  {
    id: 'wit-devon',
    quote:
      'Dropped a GoPro off the jetty in Umhlanga. A shoal of shad swam directly into the frame, held formation for twelve seconds, and left in single file like they had just clocked out.',
    name: 'Devon P.',
    initials: 'DP',
    description: 'Part-time angler & sceptic · Durban North, KwaZulu-Natal',
    caseFile: 'FILE #WIT-2025-108',
  },
];
