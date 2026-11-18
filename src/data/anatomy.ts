export interface AnatomyPart {
  id: string;
  index: string;
  code: string;
  name: string;
  shortLabel: string;
  body: string;
  forensicNote: string;
  xPercent: number;
  yPercent: number;
  labelX: number;
  labelY: number;
}

export const ANATOMY_HEADER = {
  heading: 'THE ANATOMICAL INVESTIGATION',
  supporting: 'We have examined the evidence. The results are disturbing.',
  plateCaption: 'Plate IV — Recovered Atlantic Specimen (Non-Biological Interior Suspected). Follow each arrow to inspect.',
};

export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'the-eye',
    index: '01',
    code: 'ANT-OPT-01',
    name: 'THE EYE',
    shortLabel: 'WET GLASS BEAD',
    body: 'Bro, have you actually looked at one of these things? No eyelid. No pupil that moves. Just a wet glass bead bolted to the side of the head, aimed at you, permanently. It does not track you. It records you. And it never, ever looks away first.',
    forensicNote: 'Focal aperture: Fixed f/2.0 wide-angle marine lens.',
    xPercent: 19.6,
    yPercent: 46.5,
    labelX: 30,
    labelY: 11,
  },
  {
    id: 'the-gills',
    index: '02',
    code: 'ANT-VNT-02',
    name: 'THE GILLS',
    shortLabel: 'INTAKE VENTS (PROCESSING?)',
    body: "They breathe out of water. Sure buddy. And I piss gold. Listed in the manual as 'intake vents,' they take in water and give out nothing you can measure. That is not breathing. That is processing.",
    forensicNote: 'Heat-exchanger louvres disguised behind serrated operculum cover.',
    xPercent: 27.5,
    yPercent: 51,
    labelX: 18,
    labelY: 88,
  },
  {
    id: 'the-scales',
    index: '03',
    code: 'ANT-SOL-03',
    name: 'THE SCALES',
    shortLabel: 'SOLAR ARRAY PLATES',
    body: 'Overlapping plates, arranged in rings, facing the sun. A solar array that has never once been seen charging and has never once run flat.',
    forensicNote: 'Photovoltaic imbricated shingle array; reflective glare deters aerial photography.',
    xPercent: 63,
    yPercent: 35,
    labelX: 81,
    labelY: 16,
  },
  {
    id: 'the-swim-bladder',
    index: '04',
    code: 'ANT-CHM-04',
    name: 'THE SWIM BLADDER',
    shortLabel: 'BLADDER (NOT FOR PISSING)',
    body: 'Bladders are for pissing, not swimming. Every bladder you have ever met had one job, and it was not buoyancy control. Yet this thing floats at a fixed depth on a gas chamber it never empties. Ask yourself what it is actually holding in there.',
    forensicNote: 'Pressurised helium/payload cylinder. Zero urological plumbing observed.',
    xPercent: 46,
    yPercent: 45,
    labelX: 66,
    labelY: 87,
  },
  {
    id: 'the-legs',
    index: '05',
    code: 'ANT-LMB-05',
    name: 'THE LEGS',
    shortLabel: 'ZERO LEGS (BY DESIGN)',
    body: 'There are none. Not one. Four hundred million years in the water and not a single limb has evolved, on any of them, anywhere. Everything else on this planet grew legs. Fish looked at legs and said no. That is not evolution. That is a design decision.',
    forensicNote: 'Ventral chassis omits bipedal/quadrupedal attachment points entirely.',
    xPercent: 39,
    yPercent: 75,
    labelX: 43,
    labelY: 94,
  },
  {
    id: 'the-butt',
    index: '06',
    code: 'ANT-EXT-06',
    name: 'THE BUTT',
    shortLabel: 'NO BOOTY',
    body: 'Fish have no booties. Believe me, we have checked. We checked several. No butt, no cheeks, no exit, no explanation. Every living thing that eats has somewhere for it to come out. Fish eat constantly and produce nothing. Where does it go? We have asked. We have been ignored.',
    forensicNote: 'Closed-loop internal incinerator or wireless data dump suspected.',
    xPercent: 72,
    yPercent: 56,
    labelX: 86,
    labelY: 77,
  },
  {
    id: 'the-bubbles',
    index: '07',
    code: 'ANT-EXH-07',
    name: 'THE BUBBLES',
    shortLabel: '340% FUEL EXHAUST',
    body: 'We ran the numbers. The volume of gas released by a single goldfish per hour is 340% of what its body mass could biologically produce. Something inside is burning fuel, and it is venting it out of the face, in public, all day.',
    forensicNote: 'Acoustic exhaust signature measured at 14 Hz in domestic glass bowls.',
    xPercent: 9.5,
    yPercent: 52,
    labelX: 12,
    labelY: 16,
  },
  {
    id: 'the-fins',
    index: '08',
    code: 'ANT-ACT-08',
    name: 'THE FINS',
    shortLabel: '5 VANES / NO MOTOR',
    body: 'Five control surfaces, no visible joints, no visible motor. It moves without moving anything. We have asked how. We have not been answered.',
    forensicNote: 'Silent magnetic rudder vanes; 0 dB mechanical rattle at 40 knots.',
    xPercent: 43,
    yPercent: 23,
    labelX: 55,
    labelY: 10,
  },
  {
    id: 'the-mouth',
    index: '09',
    code: 'ANT-LED-09',
    name: 'THE MOUTH',
    shortLabel: '0.8 HZ STATUS LIGHT',
    body: 'Opens and closes on a loop, all day, whether or not anything is in front of it. That is not eating. That is a status light.',
    forensicNote: 'Oscillates at 0.8 Hz regardless of nutritional presence. Likely standby heartbeat.',
    xPercent: 13,
    yPercent: 56.5,
    labelX: 12,
    labelY: 71,
  },
];
