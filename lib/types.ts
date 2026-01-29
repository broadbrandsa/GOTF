export type ParticipationType = 'event' | 'challenge' | 'webinar';
export type ParticipationCategory = 'Citizen Science' | 'Local Action' | 'Learning';
export type ParticipationMode = 'online' | 'in_person' | 'any';
export type ParticipationStatus = 'open' | 'closed';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name or placeholder
}

export interface Participation {
  id: string;
  type: ParticipationType;
  title: string;
  category: ParticipationCategory;
  mode: ParticipationMode;
  status: ParticipationStatus;
  city: string;
  area?: string; // Specific neighborhood
  date: string; // ISO string
  goal: string;
  whyItMatters: string;
  whatYouDo: string[];
  tags: string[];
  badgesAwarded?: Badge[];
  outcomeSummary?: string; // Only for closed items
  outcomeImage?: string; // New field for outcome image
  imageUrl?: string; // For visual demo
}

export interface Member {
  id: string;
  name: string;
  tier: 'Volunteer' | 'Guardian' | 'Steward' | 'GOF';
  city: string;
  avatar: string; // placeholder text or url
}
