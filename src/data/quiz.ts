export interface QuizQuestion {
  id: string;
  prompt: string;
  options: {
    label: string;
    points: number;
    reaction: string;
  }[];
}

export interface QuizTier {
  minScore: number;
  code: string;
  title: string;
  clearance: string;
  summary: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'You walk past a sushi conveyor belt or a fish tank in a Cape Town restaurant. What is your first instinct?',
    options: [
      {
        label: 'Order salmon and ask for extra soy sauce.',
        points: 0,
        reaction: 'Compromised. You are actively ingesting the firmware.',
      },
      {
        label: 'Stare at the tank for 45 seconds to confirm whether any specimen blinks.',
        points: 2,
        reaction: 'Promising field observation. Zero blinks detected, obviously.',
      },
      {
        label: 'Check the distance in metres to the nearest municipal data centre.',
        points: 3,
        reaction: 'Textbook investigative protocol. Likely under 400 metres.',
      },
    ],
  },
  {
    id: 'q2',
    prompt: 'Someone tells you a sailfish swims at 110 km/h with no engine, wheels, or petrol. Your response?',
    options: [
      {
        label: 'Nature is amazing!',
        points: 0,
        reaction: 'That is exactly what the Department of Forestry, Fisheries and the Environment wants you to say.',
      },
      {
        label: 'Could a 2006 Golf GTI beat it in a straight line down the M4?',
        points: 2,
        reaction: 'Asking the right mechanical questions.',
      },
      {
        label: 'Where are the batteries stored? Show me the butt.',
        points: 3,
        reaction: 'Senior anatomical clearance approved.',
      },
    ],
  },
  {
    id: 'q3',
    prompt: 'Your partner eats fish and chips on a Friday and suddenly buys a wetsuit. How worried are you?',
    options: [
      {
        label: 'Not worried, hobbies are healthy.',
        points: 0,
        reaction: 'Wait until you hear about Steve and his 19-foot cabin cruiser.',
      },
      {
        label: 'Mildly suspicious. I ask if they know anyone named Steve.',
        points: 2,
        reaction: 'Good instinct. Early intervention window is under 60 days.',
      },
      {
        label: 'I confiscate the tartar sauce and relocate inland to Bloemfontein immediately.',
        points: 3,
        reaction: 'Maximum operational vigilance.',
      },
    ],
  },
  {
    id: 'q4',
    prompt: 'Why has the ocean level not dropped after 400 million years of fish supposedly living inside it?',
    options: [
      {
        label: 'The hydrological cycle replenishes it via rainfall.',
        points: 0,
        reaction: 'Textbook cover story. Zero curiosity.',
      },
      {
        label: 'Wait... do fish actually drink water? Why haven’t I seen one use a cup?',
        points: 2,
        reaction: 'Welcome to the threshold. Keep pulling that thread.',
      },
      {
        label: 'Because waterproof drones do not experience thirst. They are waiting.',
        points: 3,
        reaction: 'You have read Finding 002.',
      },
    ],
  },
  {
    id: 'q5',
    prompt: 'What is the true purpose of the Two Oceans Aquarium gift shop?',
    options: [
      {
        label: 'Plush toys and fridge magnets for tourists.',
        points: 0,
        reaction: 'Nobody builds a multi-storey glass bunker just to sell keychains.',
      },
      {
        label: 'Revenue laundering for West Coast projection maintenance.',
        points: 2,
        reaction: 'Follow the money. Also note the fibre conduit beneath the pier.',
      },
      {
        label: 'Public psychological normalisation since 1981.',
        points: 3,
        reaction: 'You belong in the underground archive.',
      },
    ],
  },
  {
    id: 'q6',
    prompt: 'A goldfish in a bowl releases 340% more gas per hour than biology permits. What is happening?',
    options: [
      {
        label: 'It is probably just happy.',
        points: 0,
        reaction: 'Happiness does not require internal combustion.',
      },
      {
        label: 'It is venting fuel out of its face in public, all day.',
        points: 3,
        reaction: 'Exact forensic conclusion. You are ready for the Velddrif Tribunal.',
      },
      {
        label: 'I no longer keep bowls in the house; only dry houseplants.',
        points: 2,
        reaction: 'Sensible domestic countermeasure.',
      },
    ],
  },
];

export const QUIZ_TIERS: QuizTier[] = [
  {
    minScore: 0,
    code: 'TIER 00 · COMPROMISED',
    title: 'Confirmed Aquarium Visitor',
    clearance: 'LEVEL: STEVE-ADJACENT',
    summary:
      'You still believe things live in 71% of the planet without blinking, drinking, or possessing buttocks. Please step away from the calamari and read Finding 001 immediately.',
  },
  {
    minScore: 6,
    code: 'TIER 01 · CURIOUS CITIZEN',
    title: 'Dry-Land Sceptic',
    clearance: 'LEVEL: PROVISIONAL',
    summary:
      'You have noticed the lack of eyelids and you no longer trust tins of pilchards without a witness present. Keep watching the Kalk Bay pier.',
  },
  {
    minScore: 11,
    code: 'TIER 02 · FIELD OPERATIVE',
    title: 'Coastal Counter-Intelligence Analyst',
    clearance: 'LEVEL: ROBBEN TRENCH',
    summary:
      'You measure distances between aquariums and data centres on Google Maps for fun. The Marine Intelligence Network has assigned you an unredacted clipboard.',
  },
  {
    minScore: 15,
    code: 'TIER 03 · SENIOR ARCHIVIST',
    title: 'Director of Dry Coast Affairs',
    clearance: 'LEVEL: CLASSIFIED (VELDDRIF TRIBUNAL)',
    summary:
      'Nothing swims past you. You know that bubbles are exhaust, mouths are status lights, and 1972 was the beginning of the end. You are ready to sign Our Demands.',
  },
];
