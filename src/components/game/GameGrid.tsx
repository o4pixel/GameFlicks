
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Game, GameCategory } from "@/types/game";
import { fetchGames } from "@/services/gameApi";
import GameCard from "./GameCard";
import { Button } from "@/components/ui/button";

interface GameGridProps {
  category?: GameCategory;
  searchQuery?: string;
  featured?: boolean;
  trending?: boolean;
  title?: string;
  limit?: number;
}

const GameGrid = ({ 
  category, 
  searchQuery, 
  featured = false, 
  trending = false,
  title,
  limit
}: GameGridProps) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetchGames(1, category, searchQuery, featured, trending);
        setGames(response.games);
        setTotal(response.total);
        setHasMore(!!response.nextCursor);
        setPage(1);
      } catch (err) {
        setError("Failed to load games. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, [category, searchQuery, featured, trending]);

  const loadMoreGames = async () => {
    if (!hasMore || isLoading) return;
    
    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const response = await fetchGames(nextPage, category, searchQuery, featured, trending);
      
      setGames(prevGames => [...prevGames, ...response.games]);
      setHasMore(!!response.nextCursor);
      setPage(nextPage);
    } catch (err) {
      setError("Failed to load more games. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error}</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  const displayedGames = limit ? games.slice(0, limit) : games;

  return (
    <div className="space-y-6">
      {title && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {total > 0 && (
            <p className="text-sm text-muted-foreground">
              {total} game{total !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      )}

      {isLoading && games.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={index} 
              className="rounded-xl overflow-hidden bg-card border border-border/40 animate-pulse"
            >
              <div className="aspect-[16/10] bg-muted"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-muted rounded-md w-3/4"></div>
                <div className="h-4 bg-muted rounded-md w-full"></div>
                <div className="h-4 bg-muted rounded-md w-2/3"></div>
                <div className="flex justify-between pt-2">
                  <div className="h-4 bg-muted rounded-md w-1/3"></div>
                  <div className="h-4 bg-muted rounded-md w-1/5"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : displayedGames.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          
          {!limit && hasMore && (
            <div className="flex justify-center pt-8">
              <Button 
                variant="outline" 
                onClick={loadMoreGames}
                disabled={isLoading}
                className="min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Loading
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No games found. Try a different search or category.</p>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
