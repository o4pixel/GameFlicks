
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GameCategory } from "@/types/game";
import { getCategories } from "@/services/gameApi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CategoryList = () => {
  const [categories, setCategories] = useState<GameCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCategories();
  }, []);
  
  const currentCategory = location.pathname.includes('/categories/') 
    ? location.pathname.split('/categories/')[1] 
    : '';
  
  return (
    <div className="py-4 overflow-x-auto">
      <div className="flex space-x-2 pb-2">
        <Link to="/categories">
          <Button 
            variant="ghost" 
            size="sm"
            className={cn(
              "category-pill whitespace-nowrap",
              currentCategory === '' && "bg-secondary"
            )}
          >
            All Categories
          </Button>
        </Link>
        
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={index} 
              className="h-9 w-24 rounded-md bg-muted animate-pulse"
            />
          ))
        ) : (
          categories.map((category) => (
            <Link 
              key={category} 
              to={`/categories/${category.toLowerCase()}`}
            >
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "category-pill whitespace-nowrap",
                  currentCategory === category.toLowerCase() && "bg-secondary"
                )}
              >
                {category}
              </Button>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
