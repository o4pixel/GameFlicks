
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dices, Loader2 } from "lucide-react";
import { getRandomGame } from "@/services/gameApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RandomGame = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleRandomGame = async () => {
    try {
      setIsLoading(true);
      const game = await getRandomGame();
      navigate(`/games/${game.id}`);
    } catch (error) {
      console.error("Failed to get random game:", error);
      toast.error("Failed to find a random game. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button
      onClick={handleRandomGame}
      disabled={isLoading}
      className="bg-primary hover:bg-primary/90 text-primary-foreground group"
    >
      {isLoading ? (
        <>
          <Loader2 size={16} className="mr-2 animate-spin" />
          Finding game...
        </>
      ) : (
        <>
          <Dices size={16} className="mr-2 transition-transform group-hover:rotate-12" />
          Random Game
        </>
      )}
    </Button>
  );
};

export default RandomGame;
