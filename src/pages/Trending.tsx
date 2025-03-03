
import Layout from "@/components/layout/Layout";
import GameGrid from "@/components/game/GameGrid";

const Trending = () => {
  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container px-4 sm:px-6 mx-auto">
          <h1 className="text-3xl font-bold mb-8">Trending Games</h1>
          <GameGrid trending={true} title="Most Popular Right Now" />
        </div>
      </section>
    </Layout>
  );
};

export default Trending;
