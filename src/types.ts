/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Section = 'landing' | 'dashboard' | 'choices' | 'gym' | 'barriers' | 'path' | 'unsaid' | 'connect' | 'impact' | 'inner-space' | 'rises';

export type Emotion = 'fear' | 'confidence' | 'pressure' | 'power';

export interface HistoricalFigure {
  id: string;
  name: string;
  country: string;
  region: 'Asia' | 'Europe' | 'Africa' | 'Americas';
  field: 'Science' | 'Business' | 'Aviation' | 'Activism' | 'Education';
  earlyLife: string;
  challenges: string[];
  achievements: string[];
  quote: string;
  imageAlt: string;
  skills: string[];
  mindset: string;
}

export interface ImpactStory {
  id: string;
  text: string;
  figureId: string;
}

export interface StoryNode {
  id: string;
  text: string;
  choices: Choice[];
  image?: string;
  lesson?: string; 
  socialStat?: string;
  insight?: string;
  insightType?: 'growth' | 'risk';
  innerVoice?: string;
  outerVoice?: string;
  realityQuote?: string;
}

export interface Choice {
  text: string;
  nextNodeId: string;
  impact: Partial<UserStats>;
  isBreakRules?: boolean;
  emotionChange?: Emotion;
}

export interface ConfidenceScenario {
  id: string;
  context: string;
  prompt: string;
  type: 'response' | 'boundary' | 'challenge';
}

export interface UnsaidMessage {
  id: string;
  text: string;
  reactions: Record<string, number>;
  timestamp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface ChoiceHistory {
  nodeId: string;
  choiceText: string;
  timestamp: number;
  voiceSelected?: 'inner' | 'outer';
}

export interface CustomAffirmation {
  iAm: string;
  iDeserve: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  story: string;
  challenges: string[];
  advice: string;
  category: 'Confidence' | 'Career' | 'Freedom';
  image?: string;
}

export interface TribePost {
  id: string;
  author: string;
  content: string;
  likes: number;
  category: string;
}

export interface UserStats {
  confidence: number;
  freedom: number;
  independence: number;
  voice: number;
  emotion: Emotion;
  achievements: string[];
  choiceHistory: ChoiceHistory[];
  streak: number;
  lastActive: number;
  customAffirmations: CustomAffirmation[];
}
