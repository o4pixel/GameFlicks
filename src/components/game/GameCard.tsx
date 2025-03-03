
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Gamepad2 } from "lucide-react";
import { Game } from "@/types/game";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { likeGame } from "@/services/gameApi";
import { toast } from "sonner";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const [likes, setLikes] = useState(game.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      
      try {
        await likeGame(game.id);
        toast.success("Game added to your favorites!");
      } catch (error) {
        setLikes(prev => prev - 1);
        setIsLiked(false);
        toast.error("Failed to like the game");
      }
    }
  };

  return (
    <Link 
      to={`/games/${game.id}`} 
      className="game-card group block rounded-xl overflow-hidden bg-card border border-border/40 hover:border-border/80 transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Gamepad2 className="h-10 w-10 text-muted-foreground/30" />
          </div>
        )}
        <img
          src={game.thumbnailUrl}
          alt={game.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {(game.isFeatured || game.isTrending) && (
          <div className="absolute top-2 left-2 flex space-x-2">
            {game.isFeatured && (
              <Badge variant="secondary" className="bg-primary/80 text-primary-foreground">
                Featured
              </Badge>
            )}
            {game.isTrending && (
              <Badge variant="secondary" className="bg-card/80 text-card-foreground">
                Trending
              </Badge>
            )}
          </div>
        )}
        
        <Button 
          variant="secondary"
          size="icon"
          className={`absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity ${
            isLiked ? "text-destructive" : "text-muted-foreground"
          }`}
          onClick={handleLike}
        >
          <Heart className={isLiked ? "fill-destructive" : ""} size={16} />
        </Button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg leading-tight mb-1 line-clamp-1">{game.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem]">
          {game.description.length > 80 
            ? `${game.description.substring(0, 80)}...` 
            : game.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {game.category.slice(0, 2).map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            {game.category.length > 2 && (
              <Badge variant="outline" className="text-xs">+{game.category.length - 2}</Badge>
            )}
          </div>
          
          <div className="flex items-center text-muted-foreground text-xs">
            <Heart size={12} className="mr-1" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
