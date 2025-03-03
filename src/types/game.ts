
export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
  category: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  likes?: number;
  publishedAt: string;
}

export type GameCategory = 
  | 'Action'
  | 'Adventure'
  | 'Arcade'
  | 'Board'
  | 'Card'
  | 'Casino'
  | 'Casual'
  | 'Educational'
  | 'Puzzle'
  | 'Racing'
  | 'Shooting'
  | 'Simulation'
  | 'Sports'
  | 'Strategy'
  | 'Word'
  | 'Multiplayer';

export interface GameApiResponse {
  games: Game[];
  total: number;
  nextCursor?: string;
}
