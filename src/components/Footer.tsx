import { Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary/5 border-t border-border/40 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <a
            href="https://twitter.com/tacarzen"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity"
          >
            <Twitter className="h-4 w-4 text-primary" />
          </a>
          <p className="text-sm text-foreground/40">
            © {new Date().getFullYear()} この流れは覚えておきたい
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
