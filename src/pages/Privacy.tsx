
import Layout from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container px-4 sm:px-6 mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p>
              This Privacy Policy describes how GameFlicks ("we", "us", or "our") collects, uses, and shares your personal information when you visit our website.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.
            </p>
            
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to develop new features, and to protect our users.
            </p>
            
            <h2>Cookies</h2>
            <p>
              We use cookies and similar technologies to collect information about your activity on our sites for security and analytics purposes.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at privacy@gameflicks.example.com.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
