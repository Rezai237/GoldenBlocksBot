export interface SponsorTask {
  id: string;
  sponsorId: string;
  title: string;
  description: string;
  reward: {
    tokens: number;
    points: number;
  };
  requirements: {
    type: 'play' | 'score' | 'time';
    target: number;
    current: number;
  };
  expiresAt: number;
  completed: boolean;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  description: string;
  website?: string;
  tasks: SponsorTask[];
}