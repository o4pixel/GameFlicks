
import { Link } from "react-router-dom";
import { Gamepad2, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-foreground">
              <Gamepad2 size={24} className="text-primary" />
              <span className="text-lg font-semibold tracking-tight">GameFlicks</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your premier destination for free online browser games, featuring a diverse selection of carefully curated titles.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/action" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Action
                </Link>
              </li>
              <li>
                <Link to="/categories/puzzle" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Puzzle
                </Link>
              </li>
              <li>
                <Link to="/categories/sports" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/categories/strategy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Strategy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium uppercase tracking-wider text-foreground/70">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} GameFlicks. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart size={14} className="text-destructive fill-destructive" />
              <span>for gamers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
