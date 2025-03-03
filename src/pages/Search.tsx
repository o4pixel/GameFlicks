
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import GameGrid from "@/components/game/GameGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const query = searchParams.get("q") || "";

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container px-4 sm:px-6 mx-auto">
          <h1 className="text-3xl font-bold mb-6">Search Games</h1>
          
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12 relative">
            <Input
              type="search"
              placeholder="Search by game title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full"
            >
              <SearchIcon size={18} />
            </Button>
          </form>
          
          {query && (
            <div className="mb-8">
              <h2 className="text-xl font-medium">
                {query && `Search results for "${query}"`}
              </h2>
            </div>
          )}
          
          <GameGrid searchQuery={query} />
        </div>
      </section>
    </Layout>
  );
};

export default Search;
