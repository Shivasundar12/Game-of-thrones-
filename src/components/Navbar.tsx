import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import websterLogo from "@/assets/webster-logo.jpg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: "🏰" },
    { name: "Characters", path: "/characters", icon: "⚔️" },
    { name: "Episodes", path: "/episodes", icon: "🎬" },
    { name: "Quiz", path: "/quiz", icon: "📝" },
    { name: "Contact", path: "/contact", icon: "🦅" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`navbar-epic transition-all duration-500 ${
        scrolled ? "py-2 bg-background/95" : "py-4 bg-background/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover-glow group">
          <img 
            src={websterLogo} 
            alt="WEBSTER" 
            className={`transition-all duration-500 rounded-lg ${
              scrolled ? "h-10" : "h-12"
            } group-hover:scale-110`}
          />
          <div className="hidden md:block">
            <h1 className="font-display text-2xl text-gold group-hover:text-glow transition-all duration-300">
              WEBSTER
            </h1>
            <p className="font-title text-xs text-muted-foreground">
              Game of Thrones Experience
            </p>
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link
                to={item.path}
                className={`flex items-center space-x-2 font-title font-medium transition-all duration-300 hover:scale-105 hover:text-gold px-4 py-2 rounded-lg ${
                  location.pathname === item.path
                    ? "text-gold bg-gold/10 shadow-glow"
                    : "text-foreground hover:bg-secondary/50"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden md:block">{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Menu Toggle for Mobile */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 rounded-lg bg-secondary/50 text-gold hover:bg-secondary"
        >
          ⚡
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;