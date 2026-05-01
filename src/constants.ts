/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StoryNode, ConfidenceScenario, Mentor, TribePost } from './types';

export const STORY_NODES: StoryNode[] = [
  {
    id: 'start',
    text: "You're 18. Your family has planned a 'traditional' path for you, but you've just received a scholarship for a coding bootcamp in the city. The deadline to accept is tonight.",
    socialStat: "42% of women face family pressure regarding education",
    insight: "This choice builds long-term independence",
    insightType: 'growth',
    innerVoice: "What if they hate me for leaving? I'll be all alone.",
    outerVoice: "This is your life. You've earned this chance. Use it.",
    realityQuote: "Silence protects others, not you.",
    choices: [
      { 
        text: "Tell your parents tonight and stand your ground.", 
        nextNodeId: 'stand_ground', 
        impact: { voice: 20, independence: 10, freedom: -5 },
        emotionChange: 'pressure'
      },
      { 
        text: "Accept it in secret first, then plan your exit.", 
        nextNodeId: 'secret_accept', 
        impact: { freedom: 15, independence: 5, voice: -5 },
        isBreakRules: true,
        emotionChange: 'fear'
      },
      { 
        text: "Decline and follow their path for peace.", 
        nextNodeId: 'end_peace', 
        impact: { freedom: -20, confidence: -10, independence: -20 },
        emotionChange: 'pressure'
      }
    ]
  },
  {
    id: 'stand_ground',
    text: "Your parents are upset. Your father says it's not 'safe' for a girl alone. Your mother is silent. The tension is thick.",
    lesson: "Boundary setting often creates temporary conflict for long-term freedom.",
    socialStat: "65% of girls chose to speak up here",
    insight: "Short-term conflict, long-term sovereignty",
    insightType: 'growth',
    innerVoice: "Maybe he's right... the world is scary.",
    outerVoice: "He's projecting his fear on you. You are capable.",
    realityQuote: "A polite refusal is still a refusal.",
    choices: [
      { 
        text: "Show them the safety plan you've prepared.", 
        nextNodeId: 'safety_plan', 
        impact: { voice: 10, independence: 15 },
        emotionChange: 'confidence'
      },
      { 
        text: "Pack your bags and leave tomorrow.", 
        nextNodeId: 'leave_now', 
        impact: { freedom: 25, independence: 20, voice: 5 },
        emotionChange: 'power'
      }
    ]
  },
  {
    id: 'secret_accept',
    text: "You've accepted secretly. You feel a thrill of rebellion, but the guilt is heavy. You need to save money for your initial stay without them knowing.",
    lesson: "Strategic independence requires patience and planning.",
    insight: "Resourcefulness is a survival skill.",
    insightType: 'risk',
    innerVoice: "They'll feel betrayed when they find out.",
    outerVoice: "You aren't betraying them; you're choosing yourself.",
    realityQuote: "Secrecy is sometimes the only bridge to freedom.",
    choices: [
      { 
        text: "Start a secret side-hustle online.", 
        nextNodeId: 'side_hustle', 
        impact: { independence: 15, freedom: 10 },
        emotionChange: 'power'
      },
      { 
        text: "Ask a trusted aunt for help.", 
        nextNodeId: 'aunt_help', 
        impact: { independence: 5, freedom: 15 },
        emotionChange: 'confidence'
      }
    ]
  },
  {
    id: 'side_hustle',
    text: "Your secret shop is growing. You have enough saved. It's time to tell them.",
    choices: [
      { text: "Reveal your success and your departure.", nextNodeId: 'leave_now', impact: { confidence: 20, independence: 10 }, emotionChange: 'power' }
    ]
  },
  {
    id: 'aunt_help',
    text: "Your aunt understands. She's been where you are. She gives you her blessing and a place to stay.",
    choices: [
      { text: "Move to the city with her support.", nextNodeId: 'safety_plan', impact: { confidence: 10, freedom: 10 }, emotionChange: 'confidence' }
    ]
  },
  {
    id: 'end_peace',
    text: "Years pass. You've lived the traditional path. It's safe, but you often wonder about the life you never coded. Your voice feels small.",
    choices: []
  },
  {
    id: 'safety_plan',
    text: "They are impressed by your maturity. It's still hard, but they agree to let you go. You've earned their respect and your freedom.",
    choices: []
  },
  {
    id: 'leave_now',
    text: "It was the hardest thing you've done. The city is cold, but you're coding. Every line of code is a step toward the woman you're becoming.",
    choices: []
  }
];

export const CONFIDENCE_SCENARIOS: ConfidenceScenario[] = [
  {
    id: '1',
    type: 'response',
    context: "A male colleague interrupts you for the third time during a technical presentation.",
    prompt: "How do you reclaim your space without apologizing?"
  },
  {
    id: '2',
    type: 'boundary',
    context: "A relative asks why you aren't married yet at a family gathering.",
    prompt: "Set a firm boundary about your personal timeline."
  },
  {
    id: '3',
    type: 'challenge',
    context: "You're at a networking event. A senior leader makes a patronizing comment about 'diversity hires'.",
    prompt: "Respond with a fact-based, confident rebuttal."
  }
];

export const MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Dr. Arina K.',
    title: 'CTO & Founder',
    story: "Started coding in a small village with a shared computer. Faced rejection from 20 investors before landing her first seed round.",
    challenges: ['Venture Capital Bias', 'Technical Gatekeeping'],
    advice: "Your technical skill is your loudest voice. Build something they can't ignore.",
    category: 'Career'
  },
  {
    id: 'm2',
    name: 'Maya Angelou',
    title: 'Poet & Activist',
    story: "Used her words to dismantle barriers and inspire generations of women to speak their truth.",
    challenges: ['Structural Racism', 'Silencing'],
    advice: "There is no greater agony than bearing an untold story inside you.",
    category: 'Confidence'
  },
  {
    id: 'm3',
    name: 'Elena R.',
    title: 'Digital Nomad & Advocate',
    story: "Left a secure corporate job to travel the world and advocate for remote work policies for women.",
    challenges: ['Social Expectation', 'Financial Risk'],
    advice: "Freedom is a muscle. You have to train it every day by making small, brave choices.",
    category: 'Freedom'
  }
];

export const TRIBE_POSTS: TribePost[] = [
  { id: 'p1', author: 'Safa', content: "Just landed my first junior dev role! To everyone still in the simulator: don't give up on the secret accept path.", likes: 84, category: 'Students' },
  { id: 'p2', author: 'Anita', content: "The Confidence Gym scenario about interruptions happened to me today. I used the 'Please let me finish' response and it worked!", likes: 120, category: 'Tech' },
  { id: 'p3', author: 'Zara', content: "My She Path is finally taking shape. Focus on Systemic Freedom first, then the rest follows.", likes: 45, category: 'Creatives' }
];

export const HISTORICAL_FIGURES: any[] = [
  {
    id: 'malala',
    name: 'Malala Yousafzai',
    country: 'Pakistan',
    region: 'Asia',
    field: 'Education',
    earlyLife: "Born in Mingora, Pakistan, Malala's father was an educator who encouraged her to seek knowledge despite Taliban bans.",
    challenges: [
      "Taliban occupation of her home region",
      "Assassination attempt in 2012 for advocating education",
      "Living in exile for safety"
    ],
    achievements: [
      "Youngest Noble Peace Prize laureate",
      "Founded Malala Fund to help girls access school",
      "Graduated from Oxford University"
    ],
    quote: "I raised my voice—not so I could shout, but so that those without a voice could be heard.",
    imageAlt: "Portrait of Malala",
    skills: ["Public Speaking", "Strategic Advocacy", "Resilience"],
    mindset: "Courage isn't the absence of fear, but the decision that something else is more important than fear."
  },
  {
    id: 'katherine',
    name: 'Katherine Johnson',
    country: 'USA',
    region: 'Americas',
    field: 'Science',
    earlyLife: "A child prodigy in mathematics who faced systemic racism and sexism in the segregated South.",
    challenges: [
      "Racial segregation in schools and workplace",
      "Gender discrimination in early NASA departments",
      "Proving accuracy in manually computed orbital data"
    ],
    achievements: [
      "Calculated trajectories for Apollo 11",
      "Received Presidential Medal of Freedom",
      "Key pioneer in early space exploration"
    ],
    quote: "I counted everything. I counted the steps to the road, the steps up to church, the number of dishes and silverware I washed.",
    imageAlt: "Katherine Johnson at NASA",
    skills: ["Advanced Mathematics", "Analytical Thinking", "Precision"],
    mindset: "Your work speaks louder than any bias could ever shout."
  },
  {
    id: 'kalpana',
    name: 'Kalpana Chawla',
    country: 'India',
    region: 'Asia',
    field: 'Aviation',
    earlyLife: "Fascinated by airplanes as a child, she studied aeronautical engineering despite traditional societal expectations.",
    challenges: [
      "Moving across the world alone for advanced studies",
      "Intense physical and mental NASA training",
      "Breaking traditional gender roles in her community"
    ],
    achievements: [
      "First woman of Indian origin in space",
      "Mission specialist on Space Shuttle Columbia",
      "Inspiration to millions of young Indian women"
    ],
    quote: "The path from dreams to success does exist. May you have the vision to find it, the courage to get on to it, and the perseverance to follow it.",
    imageAlt: "Kalpana Chawla in space suit",
    skills: ["Aerospace Engineering", "Pilotry", "Determination"],
    mindset: "Space has no borders, and neither should your ambition."
  }
];

export const BARRIER_BREAKERS = [
  "First woman pilot in Turkey: Sabiha Gökçen",
  "Youngest CEO in Fortune 500: Several rising stars",
  "Changed laws for women's suffrage worldwide",
  "First woman to win a Nobel Prize: Marie Curie",
  "Breaking glass ceilings in tech leadership every day"
];

export const INITIAL_STATS: any = {
  confidence: 20,
  freedom: 20,
  independence: 20,
  voice: 20,
  emotion: 'pressure',
  achievements: [],
  choiceHistory: [],
  streak: 0,
  lastActive: Date.now(),
  customAffirmations: []
};
