
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Heart, Share2, Clock, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import GameEmbed from "@/components/game/GameEmbed";
import GameGrid from "@/components/game/GameGrid";
import { Game } from "@/types/game";
import { fetchGameById, likeGame } from "@/services/gameApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGame = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);
        
        const gameData = await fetchGameById(id);
        if (!gameData) {
          setError("Game not found");
          return;
        }
        
        setGame(gameData);
        setLikes(gameData.likes || 0);
        
        // Scroll to top of page
        window.scrollTo(0, 0);
      } catch (err) {
        setError("Failed to load game details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadGame();
  }, [id]);

  const handleLike = async () => {
    if (!game || isLiked) return;
    
    try {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      await likeGame(game.id);
      toast.success("Game added to your favorites!");
    } catch (error) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
      toast.error("Failed to like the game");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: game?.title,
        text: game?.description,
        url: window.location.href,
      }).then(() => {
        toast.success("Game shared successfully!");
      }).catch((error) => {
        console.error("Failed to share", error);
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success("Game link copied to clipboard!");
      }).catch((error) => {
        console.error("Failed to copy", error);
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container px-4 sm:px-6 mx-auto py-10 md:py-16">
          <div className="animate-pulse space-y-8">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-muted rounded-full"></div>
              <div className="h-6 bg-muted rounded-md w-1/4"></div>
            </div>
            
            <div className="h-10 bg-muted rounded-md w-1/2"></div>
            <div className="h-80 bg-muted rounded-md w-full"></div>
            
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded-md w-full"></div>
              <div className="h-6 bg-muted rounded-md w-3/4"></div>
              <div className="h-6 bg-muted rounded-md w-2/3"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !game) {
    return (
      <Layout>
        <div className="container px-4 sm:px-6 mx-auto py-10 md:py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {error || "Game not found"}
          </h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn't find the game you're looking for.
          </p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="mb-6 animate-fade-in">
            <Link 
              to="/" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{game.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {game.category.map((cat) => (
                  <Badge key={cat} variant="secondary" className="animate-scale-in">
                    {cat}
                  </Badge>
                ))}
              </div>
              
              <GameEmbed game={game} />
            </div>
            
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-lg border border-border bg-card/50">
                <div className="flex justify-between mb-4">
                  <Button 
                    onClick={handleLike}
                    variant={isLiked ? "default" : "outline"}
                    className={isLiked ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
                  >
                    <Heart className={isLiked ? "fill-current mr-2" : "mr-2"} size={16} />
                    {isLiked ? "Liked" : "Like"} ({likes})
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleShare}
                  >
                    <Share2 size={16} className="mr-2" />
                    Share
                  </Button>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                  onClick={() => {
                    const gameSection = document.getElementById('game-embed');
                    gameSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Play Now
                </Button>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={14} className="mr-2" />
                    <span>Published: {formatDate(game.publishedAt)}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock size={14} className="mr-2" />
                    <span>Playtime: 5-10 minutes</span>
                  </div>
                  
                  {(game.isFeatured || game.isTrending) && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {game.isFeatured && (
                        <Badge variant="outline" className="border-primary/50 text-primary">
                          Featured Game
                        </Badge>
                      )}
                      {game.isTrending && (
                        <Badge variant="outline" className="border-muted-foreground/50">
                          Trending
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-medium">About this game</h2>
                <p className="text-muted-foreground">
                  {game.description}
                </p>
                <p className="text-muted-foreground">
                  This game is completely free to play directly in your browser. No downloads or installations required.
                </p>
              </div>
            </div>
          </div>
          
          <Separator className="my-12" />
          
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-semibold">Similar Games</h2>
            <GameGrid category={game.category[0]} limit={4} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GameDetail;
