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
    id: 'wit-nadine',
    quote:
      'My husband goes deep-sea fishing every second Friday at 4pm. Four years later he has never caught a single fish, yet he always comes home at 2am covered in glitter and smelling like French perfume. He says it is from the fish. Do you know any other animals that wear glitter and perfume? There is something fishy going on in the sea.',
    name: 'Nadine B.',
    initials: 'NB',
    description: 'Suspicious spouse · Bloubergstrand, Western Cape',
    caseFile: 'FILE #WIT-2024-022',
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
    id: 'wit-ronel',
    quote:
      'I emptied a 400g tin of Lucky Star pilchards onto my kitchen scale in broad daylight. It weighed 412 grams. Nobody can explain the extra twelve grams. I have locked the cat outside until I get answers.',
    name: 'Ronel D.',
    initials: 'RD',
    description: 'Independent scale auditor · Velddrif, Western Cape',
    caseFile: 'FILE #WIT-2025-088',
  },
  {
    id: 'wit-gavin',
    quote:
      'Spent R14,000 on an imported carbon-fibre rod and premium bait in Margate. Cast straight into crystal clear water. Dozens of fish swam right past the hook, looked directly at it, and refused to take a single bite. They know what you paid. They are mocking you. They do it on purpose.',
    name: 'Gavin K.',
    initials: 'GK',
    description: 'Former recreational angler · Margate, KwaZulu-Natal',
    caseFile: 'FILE #WIT-2025-094',
  },
  {
    id: 'wit-tshepo',
    quote:
      'Asked a waiter in Centurion what "line-caught kingklip" meant. He said that meant it was caught with a rod. Then why is it not called rod-caught? How exactly do you catch something with a line? Unless it is a line of code.',
    name: 'Tshepo L.',
    initials: 'TL',
    description: 'Hospitality sceptic · Centurion, Gauteng',
    caseFile: 'FILE #WIT-2026-103',
  },
  {
    id: 'wit-kireshen',
    quote:
      'Dropped my GoPro off a jetty in Umhlanga. A shoal of shad swam directly into the frame, held formation for twelve seconds, and then one asked for a mutton bunny. Waarheid, ekse.',
    name: 'Kireshen N.',
    initials: 'KN',
    description: 'Coastal camera operator · Umhlanga, KwaZulu-Natal',
    caseFile: 'FILE #WIT-2026-108',
  },
  {
    id: 'wit-pieter',
    quote:
      'Ever since the Sale Sharks beat the Bulls in the URC final, I have never trusted a fish. Call it a coincidence if you want. I am watching the water.',
    name: 'Pieter van Z.',
    initials: 'PZ',
    description: 'Loyal rugby supporter · Pretoria, Gauteng',
    caseFile: 'FILE #WIT-2026-112',
  },
];
