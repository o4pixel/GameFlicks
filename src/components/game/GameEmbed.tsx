
import { useState } from "react";
import { Game } from "@/types/game";
import { Loader2 } from "lucide-react";

interface GameEmbedProps {
  game: Game;
}

const GameEmbed = ({ game }: GameEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // In a real implementation, we would use the game.url provided by the GameDistribution API
  // For this mock, we'll create a placeholder iframe that simulates a game
  const gameUrl = "https://www.addictinggames.com/embed/html5-games/25070";

  return (
    <div className="relative w-full bg-muted rounded-lg overflow-hidden shadow-md">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card z-10">
          <Loader2 size={40} className="animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading game...</p>
        </div>
      )}
      
      <div className="aspect-video">
        <iframe
          src={gameUrl}
          title={game.title}
          allowFullScreen
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </div>
    </div>
  );
};

export default GameEmbed;
