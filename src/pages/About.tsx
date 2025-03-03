
import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container px-4 sm:px-6 mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">About GameFlicks</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p>
              GameFlicks is a premier online platform offering a curated selection of free browser-based games. Our mission is to provide gamers with an elegant, seamless experience to discover and enjoy high-quality games without downloads or installations.
            </p>
            
            <h2>Our Vision</h2>
            <p>
              We believe that gaming should be accessible to everyone. Our vision is to create a community where casual gamers can easily find and enjoy games that suit their preferences, all within a beautiful, intuitive interface.
            </p>
            
            <h2>What We Offer</h2>
            <p>
              GameFlicks features a diverse collection of browser games across multiple categories including Action, Puzzle, Strategy, and more. All games are carefully selected for quality, performance, and user experience.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              Have questions, suggestions, or feedback? We'd love to hear from you! Reach out to our team at contact@gameflicks.example.com.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
