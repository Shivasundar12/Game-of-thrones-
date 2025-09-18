import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import jonSnow from "@/assets/jon-snow.jpg";
import daenerys from "@/assets/daenerys.jpg";
import tyrion from "@/assets/tyrion.jpg";
import cersei from "@/assets/cersei.jpg";
import arya from "@/assets/arya.jpg";

gsap.registerPlugin(ScrollTrigger);

const Characters = () => {
  const charactersRef = useRef<HTMLDivElement>(null);

  const characters = [
    {
      id: "jon-snow",
      name: "Jon Snow",
      title: "The Bastard of Winterfell",
      house: "Stark",
      image: jonSnow,
      description: "The brooding hero of the North, bastard son turned King in the North.",
      color: "stark"
    },
    {
      id: "daenerys",
      name: "Daenerys Targaryen", 
      title: "Mother of Dragons",
      house: "Targaryen",
      image: daenerys,
      description: "The last Targaryen, breaker of chains and mother to three dragons.",
      color: "targaryen"
    },
    {
      id: "tyrion",
      name: "Tyrion Lannister",
      title: "The Imp",
      house: "Lannister", 
      image: tyrion,
      description: "The cleverest man in Westeros, master of wit and wine.",
      color: "lannister"
    },
    {
      id: "cersei",
      name: "Cersei Lannister",
      title: "Queen Regent",
      house: "Lannister",
      image: cersei,
      description: "The ruthless queen who will stop at nothing to protect her power.",
      color: "lannister"
    },
    {
      id: "arya",
      name: "Arya Stark",
      title: "No One",
      house: "Stark",
      image: arya,
      description: "The faceless assassin who dances with death itself.",
      color: "stark"
    }
  ];

  useEffect(() => {
    if (charactersRef.current) {
      const cards = charactersRef.current.querySelectorAll('.character-card');
      
      gsap.fromTo(cards, 
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.8,
          rotateY: 45 
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: charactersRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-32 pb-20 px-6 text-center bg-gradient-night"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display text-6xl md:text-8xl text-gold mb-6 text-glow"
          >
            Characters
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-title text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto"
          >
            Meet the legendary figures who shaped the fate of the Seven Kingdoms
          </motion.p>
        </div>
      </motion.section>

      {/* Characters Grid */}
      <section className="py-20 px-6" ref={charactersRef}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {characters.map((character, index) => (
              <motion.div
                key={character.id}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="character-card group"
              >
                <Link
                  to={`/characters/${character.id}`}
                  className="block card-character relative overflow-hidden h-96 group-hover:shadow-epic transition-all duration-700"
                >
                  {/* Character Image */}
                  <div className="absolute inset-0">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  </div>

                  {/* Character Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <motion.h3
                      className="font-title text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300"
                    >
                      {character.name}
                    </motion.h3>
                    <p className="font-title text-sm text-gold/80 mb-2">
                      {character.title}
                    </p>
                    <p className="font-body text-white/70 text-sm leading-relaxed">
                      {character.description}
                    </p>
                  </div>

                  {/* House Banner */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className={`px-3 py-1 rounded-full text-xs font-title font-semibold ${
                      character.color === 'stark' ? 'bg-stark/20 text-stark border border-stark/30' :
                      character.color === 'targaryen' ? 'bg-targaryen/20 text-targaryen border border-targaryen/30' :
                      'bg-lannister/20 text-lannister border border-lannister/30'
                    }`}>
                      House {character.house}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 px-6 text-center bg-gradient-royal"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl text-white mb-6">
            Choose Your Allegiance
          </h2>
          <p className="font-title text-xl text-white/80 mb-8">
            Click on any character to discover their epic journey through Westeros
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default Characters;