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

export type BadgeName = 'Eco-Warrior' | 'Learner' | 'Connector' | 'Steward' | 'Guardian' | 'Local Hero' | 'Innovator' | 'Influence';

export interface Participation {
  id: string;
  type: ParticipationType;
  title: string;
  category: ParticipationCategory;
  mode: ParticipationMode;
  status: ParticipationStatus;
  city: string;
  area?: string; // Specific neighborhood
  date: string; // ISO string Start
  endDate?: string; // ISO string End (optional)
  platform?: string; // e.g. 'Zoom', 'Google Meets' for online
  goal: string;
  whyItMatters: string;
  whatYouDo: string[];
  whatWasDone?: string[];
  tags: string[];
  badgesAwarded?: Badge[];
  earnedBadgeName?: BadgeName; // Specific named badge
  outcomeSummary?: string; // Only for closed items
  outcomeImage?: string; // New field for outcome image
  researchPartner?: string; // For Citizen Science challenges
  imageUrl?: string; // For visual demo
  joinedMemberIds?: string[];     // IDs of members who joined (for open)
  contributedMemberIds?: string[]; // IDs of members who contributed (for closed)
}

export interface Member {
  id: string;
  name: string;
  tier: 'Volunteer' | 'Guardian' | 'Steward' | 'GOF';
  city: string;
  avatarImage: string; // Path to local image
  badgesEarned: number;
}
