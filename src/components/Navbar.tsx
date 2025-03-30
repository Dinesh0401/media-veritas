
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, userDetails, signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getInitials = (name: string) => {
    if (!name) return "FN";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={userDetails?.avatar_url} />
                    <AvatarFallback>{getInitials(userDetails?.full_name || user.email || "")}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userDetails?.full_name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Log in</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
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
              {user ? (
                <>
                  <div className="flex items-center space-x-2 py-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={userDetails?.avatar_url} />
                      <AvatarFallback>{getInitials(userDetails?.full_name || user.email || "")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{userDetails?.full_name || "User"}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
