
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import GameGrid from "@/components/game/GameGrid";
import RandomGame from "@/components/game/RandomGame";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background bg-opacity-90 backdrop-blur-sm animate-fade-in">
          <div className="text-center animate-scale-in">
            <h1 className="text-4xl font-bold mb-2">Welcome to GameFlicks</h1>
            <p className="text-muted-foreground mb-6">Your gateway to amazing browser games</p>
          </div>
        </div>
      )}

      <section className="py-10 md:py-16">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Discover <span className="text-primary">Free</span> Browser Games
              </h1>
              <p className="text-xl text-muted-foreground">
                Explore our collection of 99 fun online games, no downloads required. Just click and play!
              </p>
              <div className="flex flex-wrap gap-4">
                <RandomGame />
                <Link to="/categories">
                  <Button variant="outline">
                    Browse Categories
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-border/40 shadow-xl animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Gaming artwork" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Featured Games</h2>
              <Link to="/featured" className="text-primary hover:underline text-sm flex items-center">
                View All
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <GameGrid featured={true} limit={4} />
          </div>

          <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Trending Now</h2>
              <Link to="/trending" className="text-primary hover:underline text-sm flex items-center">
                View All
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <GameGrid trending={true} limit={8} />
          </div>

          <div className="text-center py-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-semibold mb-4">Ready to Play?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Browse our collection of 99 games across various categories. Find your favorite and start playing instantly.
            </p>
            <Link to="/categories">
              <Button size="lg">
                Explore All Games
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
