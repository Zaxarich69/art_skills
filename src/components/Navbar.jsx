import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Menu, X, Search, User, MessageSquare, Compass, 
  LogIn, LogOut, Moon, Sun, ChevronDown
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';
import MobileMenu from '@/components/MobileMenu';
import ConnectWalletButton from './ConnectWalletButton';
import StripeButton from './stripe/StripeButton';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    // Mock login for now
    setIsLoggedIn(true);
    toast({
      title: "Logged in successfully",
      description: "Welcome back to Art Skills!",
      duration: 3000,
    });
  };

  const handleLogout = () => {
    // Mock logout for now
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
      duration: 3000,
    });
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Compass className="h-4 w-4 mr-1" /> },
    { name: 'Explore', path: '/explore', icon: <Search className="h-4 w-4 mr-1" /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare className="h-4 w-4 mr-1" /> },
  ];

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-primary">Art Skills</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant={location.pathname === link.path ? "default" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={link.path} className="flex items-center">
                  {link.icon}
                  {link.name}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <ConnectWalletButton />
            <StripeButton />
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    Profile
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="text-primary rounded-xl px-5 py-2 font-bold shadow min-w-[150px] max-w-[200px] transition-all duration-200 hover:shadow-lg hover:bg-primary/5 focus-visible:shadow-lg focus-visible:bg-primary/5 focus-visible:outline-none"
                onClick={handleLogin}
              >
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        setIsOpen={setIsMenuOpen} 
        navLinks={navLinks} 
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Navbar;