import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">
            この流れは覚えておきたい
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link
              to="/contact"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
