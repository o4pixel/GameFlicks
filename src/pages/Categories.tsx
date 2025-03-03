
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import GameGrid from "@/components/game/GameGrid";
import CategoryList from "@/components/game/CategoryList";
import { GameCategory } from "@/types/game";

const Categories = () => {
  const { category } = useParams<{ category?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | undefined>(undefined);
  const [pageTitle, setPageTitle] = useState("All Categories");

  useEffect(() => {
    if (!category) {
      setSelectedCategory(undefined);
      setPageTitle("All Categories");
      return;
    }

    // Convert to proper format (first letter uppercase)
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() as GameCategory;
    setSelectedCategory(formattedCategory);
    setPageTitle(`${formattedCategory} Games`);
  }, [category]);

  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
            <CategoryList />
          </div>
          
          <GameGrid 
            category={selectedCategory} 
            title={selectedCategory ? undefined : "All Games"}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
