import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import websterLogo from "@/assets/webster-logo.jpg";
import heroBg from "@/assets/hero-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Epic parallax effect for hero background
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Staggered animation for feature cards
    if (featuresRef.current) {
      const cards = featuresRef.current.querySelectorAll('.feature-card');
      
      gsap.fromTo(cards, 
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.8 
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const features = [
    {
      title: "Epic Characters",
      description: "Meet the legendary heroes and villains of Westeros",
      icon: "⚔️",
      link: "/characters",
      color: "stark"
    },
    {
      title: "Cinematic Episodes", 
      description: "Relive the most breathtaking moments",
      icon: "🎬",
      link: "/episodes",
      color: "targaryen"
    },
    {
      title: "Test Your Knowledge",
      description: "Challenge yourself with our epic quiz",
      icon: "📝",
      link: "/quiz",
      color: "lannister"
    },
    {
      title: "Dark Secrets",
      description: "Connect with the masters of WEBSTER",
      icon: "🦅",
      link: "/contact",
      color: "royal"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      
      {/* Epic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div
          ref={heroRef}
          className="absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%]"
        >
          <img
            src={heroBg}
            alt="Game of Thrones Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold rounded-full opacity-40"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight 
              }}
              animate={{
                y: [null, -100],
                opacity: [0.4, 0, 0.4]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <img 
              src={websterLogo} 
              alt="WEBSTER Team Logo" 
              className="w-96 h-auto mx-auto rounded-3xl shadow-epic pulse-glow"
            />
          </motion.div>

          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
            className="font-display text-7xl md:text-9xl text-gold mb-6 text-glow"
          >
            WEBSTER
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-title text-2xl md:text-4xl text-white/90 mb-4"
          >
            Game of Thrones Experience
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="font-body text-lg md:text-xl text-white/70 mb-12 max-w-3xl mx-auto"
          >
            Enter the epic world of Westeros where legends are born, kingdoms fall, 
            and the game of thrones determines the fate of all. Forge your destiny with Team WEBSTER.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/characters" className="btn-fire">
              🗡️ Meet the Heroes
            </Link>
            <Link to="/quiz" className="btn-ice">
              🧠 Test Your Knowledge
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 text-2xl"
          >
            ⬇️
          </motion.div>
        </motion.div>
      </section>

      {/* Theme Introduction */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="py-32 px-6 bg-gradient-night"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-display text-5xl md:text-7xl text-gold mb-8 text-glow"
          >
            The Seven Kingdoms Await
          </motion.h2>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-title text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed"
          >
            In the realm where winter is coming and dragons soar, where honor clashes with ambition 
            and love battles duty, experience the greatest story ever told. Journey through the 
            legendary tales of houses that shaped history, witness epic battles that decided fates, 
            and discover the secrets that lie beneath the Iron Throne.
          </motion.p>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-32 px-6" ref={featuresRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-5xl text-gold mb-6">
              Choose Your Path
            </h2>
            <p className="font-title text-xl text-foreground/80">
              Four legendary journeys await your exploration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -10, scale: 1.05 }}
                className="feature-card group"
              >
                <Link
                  to={feature.link}
                  className="block card-character h-80 relative overflow-hidden group-hover:shadow-epic transition-all duration-700"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 ${
                    feature.color === 'stark' ? 'bg-gradient-ice' :
                    feature.color === 'targaryen' ? 'bg-gradient-fire' :
                    feature.color === 'lannister' ? 'bg-gradient-gold' :
                    'bg-gradient-royal'
                  } opacity-80`} />

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-center text-center">
                    <motion.div
                      className="text-6xl mb-6"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <h3 className="font-title text-2xl font-bold text-white mb-4 group-hover:text-glow transition-all duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="font-body text-white/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-32 px-6 bg-gradient-royal"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display text-5xl text-white mb-8">
            The Legends Behind WEBSTER
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-gold/50 transition-all duration-500 hover-float"
            >
              <div className="text-6xl mb-4">🐺</div>
              <h3 className="font-title text-3xl font-bold text-gold mb-2">M. Sujeet</h3>
              <p className="font-title text-lg text-white/80 mb-4">Lead Developer & Stark Loyalist</p>
              <p className="font-body italic text-white/70">"Winter is Coming... and so are the bugs!"</p>
            </motion.div>
            
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-gold/50 transition-all duration-500 hover-float"
            >
              <div className="text-6xl mb-4">🐉</div>
              <h3 className="font-title text-3xl font-bold text-gold mb-2">P. Shiva Sundar</h3>
              <p className="font-title text-lg text-white/80 mb-4">Creative Director & Dragon Tamer</p>
              <p className="font-body italic text-white/70">"I will code what is mine with fire and TypeScript!"</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-32 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-display text-6xl text-gold mb-8 text-glow"
          >
            The Game Begins Now
          </motion.h2>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-title text-2xl text-foreground/80 mb-12"
          >
            Choose your house, test your knowledge, and become a legend in the world of Westeros
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Link to="/characters" className="btn-gold text-2xl px-12 py-6">
              🏰 Enter the Seven Kingdoms
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-nightwatch border-t border-gold/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-title text-gold/80 mb-4">
            Created by Team WEBSTER for Pravesha Symposium
          </p>
          <p className="font-body text-white/60">
            "When you play the game of thrones, you win or you die. There is no middle ground."
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;