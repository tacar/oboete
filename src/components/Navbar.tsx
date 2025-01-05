import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* ロゴ */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              この流れは覚えておきたい
            </Link>
          </div>

          {/* デスクトップメニュー */}
          <div className="hidden md:flex items-center">
            <Link to="/contact" className="text-foreground/60">
              お問い合わせ
            </Link>
          </div>

          {/* モバイルメニューボタン */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-foreground relative w-10 h-10 hover:bg-transparent"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Menu
                  className={`h-6 w-6 absolute transition-all duration-300 transform ${
                    isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`h-6 w-6 absolute transition-all duration-300 transform ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 bg-background/95 backdrop-blur rounded-lg mt-2 border border-border/40">
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-foreground/60"
              onClick={toggleMenu}
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
