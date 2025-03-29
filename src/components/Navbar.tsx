
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-fakenik-blue" />
            <span className="font-bold text-xl">FakeniX</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-foreground/80 ${isActive('/') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            Home
          </Link>
          <Link 
            to="/report" 
            className={`text-sm font-medium transition-colors hover:text-foreground/80 ${isActive('/report') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            Report Deepfake
          </Link>
          <Link 
            to="/track" 
            className={`text-sm font-medium transition-colors hover:text-foreground/80 ${isActive('/track') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            Track Reports
          </Link>
          <Link 
            to="/forum" 
            className={`text-sm font-medium transition-colors hover:text-foreground/80 ${isActive('/forum') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            Forum
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors hover:text-foreground/80 ${isActive('/about') ? 'text-foreground' : 'text-foreground/60'}`}
          >
            About
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/login">
            <Button variant="outline" size="sm">Log in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 pt-0 bg-background border-b">
          <nav className="flex flex-col space-y-4 py-4">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-foreground/80 ${isActive('/') ? 'text-foreground' : 'text-foreground/60'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/report" 
              className={`text-sm font-medium transition-colors hover:text-foreground/80 ${isActive('/report') ? 'text-foreground' : 'text-foreground/60'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Report Deepfake
            </Link>
            <Link 
              to="/track" 
              className={`text-sm font-medium transition-colors hover:text-foreground/80 ${isActive('/track') ? 'text-foreground' : 'text-foreground/60'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Track Reports
            </Link>
            <Link 
              to="/forum" 
              className={`text-sm font-medium transition-colors hover:text-foreground/80 ${isActive('/forum') ? 'text-foreground' : 'text-foreground/60'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Forum
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-foreground/80 ${isActive('/about') ? 'text-foreground' : 'text-foreground/60'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">Log in</Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Sign up</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
