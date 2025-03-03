
import Layout from "@/components/layout/Layout";
import GameGrid from "@/components/game/GameGrid";

const Featured = () => {
  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container px-4 sm:px-6 mx-auto">
          <h1 className="text-3xl font-bold mb-8">Featured Games</h1>
          <GameGrid featured={true} title="Editor's Choice" />
        </div>
      </section>
    </Layout>
  );
};

export default Featured;
