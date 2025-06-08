import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, LogIn, LogOut } from 'lucide-react';
import ConnectWalletButton from './ConnectWalletButton'; // ← добавлен импорт

const MobileMenu = ({ isOpen, setIsOpen, navLinks, isLoggedIn, onLogin, onLogout }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                className="justify-start"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link to={link.path} className="flex items-center">
                  {link.icon}
                  {link.name}
                </Link>
              </Button>
            ))}

            {/* Кнопка Коннект Валлет */}
            <ConnectWalletButton />

            <div className="border-t border-border pt-3 mt-3">
              {isLoggedIn ? (
                <>
                  <Button variant="ghost" className="justify-start w-full" asChild onClick={() => setIsOpen(false)}>
                    <Link to="/profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start w-full mt-2" 
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  className="justify-start w-full" 
                  onClick={() => {
                    onLogin();
                    setIsOpen(false);
                  }}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;