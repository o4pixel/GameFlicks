
import Layout from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container px-4 sm:px-6 mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p>
              By accessing or using GameFlicks, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
            
            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on GameFlicks for personal, non-commercial use only.
            </p>
            
            <h2>Disclaimer</h2>
            <p>
              The materials on GameFlicks are provided on an 'as is' basis. GameFlicks makes no warranties, expressed or implied, and hereby disclaims all other warranties.
            </p>
            
            <h2>Limitations</h2>
            <p>
              In no event shall GameFlicks or its suppliers be liable for any damages arising out of the use or inability to use the materials on GameFlicks.
            </p>
            
            <h2>External Links</h2>
            <p>
              GameFlicks has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.
            </p>
            
            <h2>Modifications</h2>
            <p>
              GameFlicks may revise these terms of service for its website at any time without notice.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
