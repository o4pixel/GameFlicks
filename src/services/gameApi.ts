
import { Game, GameApiResponse, GameCategory } from "../types/game";

// Since we don't have actual API keys yet, we'll mock the API response
// In a real implementation, this would use the GameDistribution API
const GAMES_PER_PAGE = 12;
const MOCK_DELAY = 800; // Simulate network delay for better UX testing

// Mock games data generator
const generateMockGames = (count: number = 99): Game[] => {
  const categories: GameCategory[] = [
    'Action', 'Adventure', 'Arcade', 'Board', 'Card', 'Casino',
    'Casual', 'Educational', 'Puzzle', 'Racing', 'Shooting',
    'Simulation', 'Sports', 'Strategy', 'Word', 'Multiplayer'
  ];
  
  const gameNames = [
    "Pixel Rush", "Galaxy Warriors", "Treasure Hunters", "Speed Racers",
    "Block Puzzle", "Zombie Survival", "Math Challenge", "Word Master",
    "Bubble Shooter", "Castle Defense", "Space Invaders", "Fish Frenzy",
    "Cooking Mama", "Football Stars", "Candy Match", "Dungeon Escape",
    "Farm Heroes", "Racing Championship", "Jewel Quest", "Sniper Elite",
    "Temple Run", "Piano Tiles", "Sudoku Master", "Chess Champions",
    "Car Simulator", "Bike Stunts", "Memory Match", "Mahjong Deluxe",
    "Fishing Master", "Golf Pro", "Tennis Ace", "Basketball Legends",
    "Fruit Ninja", "Angry Birds", "Crossy Road", "Subway Surfers",
    "Minecraft Clone", "Traffic Racer", "Jigsaw Puzzles", "Solitaire Classic",
    "Air Hockey", "Table Tennis", "Bowling King", "Pool Master",
    "Darts Pro", "Archery King", "Knife Hit", "Color Switch",
    "Helix Jump", "Stack Jump", "Dots Connect", "Flappy Bird"
  ];
  
  const games: Game[] = [];
  
  for (let i = 0; i < count; i++) {
    // Randomly select 1-3 categories
    const gameCategories: GameCategory[] = [];
    const numCategories = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < numCategories; j++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      if (!gameCategories.includes(randomCategory)) {
        gameCategories.push(randomCategory);
      }
    }
    
    // Get a random game name or generate one if we run out
    const gameName = i < gameNames.length 
      ? gameNames[i] 
      : `Game ${i + 1}`;
    
    // Generate a random number for the game ID
    const randomId = Math.floor(Math.random() * 10000000).toString();
    
    games.push({
      id: `game-${randomId}`,
      title: gameName,
      description: `Experience the thrill of ${gameName}, one of our most popular ${gameCategories.join(', ')} games. Challenge yourself and beat your high score!`,
      thumbnailUrl: `https://picsum.photos/seed/${randomId}/300/200`,
      url: `https://www.example.com/games/${randomId}`,
      category: gameCategories,
      isFeatured: Math.random() < 0.2, // 20% chance to be featured
      isTrending: Math.random() < 0.3, // 30% chance to be trending
      likes: Math.floor(Math.random() * 1000),
      publishedAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString() // Random date in the last 90 days
    });
  }
  
  return games;
};

// Mock database
const mockGames = generateMockGames();

/**
 * Fetches games from the API based on search and filters
 */
export const fetchGames = async (
  page: number = 1,
  category?: GameCategory,
  searchQuery?: string,
  featured?: boolean,
  trending?: boolean
): Promise<GameApiResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  let filteredGames = [...mockGames];
  
  // Apply filters
  if (category) {
    filteredGames = filteredGames.filter(game => 
      game.category.includes(category)
    );
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredGames = filteredGames.filter(game => 
      game.title.toLowerCase().includes(query) || 
      game.description.toLowerCase().includes(query)
    );
  }
  
  if (featured) {
    filteredGames = filteredGames.filter(game => game.isFeatured);
  }
  
  if (trending) {
    filteredGames = filteredGames.filter(game => game.isTrending);
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * GAMES_PER_PAGE;
  const endIndex = startIndex + GAMES_PER_PAGE;
  const paginatedGames = filteredGames.slice(startIndex, endIndex);
  
  return {
    games: paginatedGames,
    total: filteredGames.length,
    nextCursor: endIndex < filteredGames.length ? page + 1 + '' : undefined
  };
};

/**
 * Fetches a single game by ID
 */
export const fetchGameById = async (id: string): Promise<Game | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  const game = mockGames.find(game => game.id === id);
  return game || null;
};

/**
 * Returns a random game
 */
export const getRandomGame = async (): Promise<Game> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY / 2));
  
  const randomIndex = Math.floor(Math.random() * mockGames.length);
  return mockGames[randomIndex];
};

/**
 * Get all available categories
 */
export const getCategories = async (): Promise<GameCategory[]> => {
  return [
    'Action', 'Adventure', 'Arcade', 'Board', 'Card', 'Casino',
    'Casual', 'Educational', 'Puzzle', 'Racing', 'Shooting',
    'Simulation', 'Sports', 'Strategy', 'Word', 'Multiplayer'
  ];
};

/**
 * Simulates liking a game
 */
export const likeGame = async (gameId: string): Promise<void> => {
  // In a real app, this would call the API to update the like count
  const gameIndex = mockGames.findIndex(game => game.id === gameId);
  if (gameIndex >= 0) {
    mockGames[gameIndex].likes = (mockGames[gameIndex].likes || 0) + 1;
  }
};
