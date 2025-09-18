import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import jonSnow from "@/assets/jon-snow.jpg";
import daenerys from "@/assets/daenerys.jpg";
import tyrion from "@/assets/tyrion.jpg";
import cersei from "@/assets/cersei.jpg";
import arya from "@/assets/arya.jpg";

const CharacterDetail = () => {
  const { characterId } = useParams();
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const characterData: Record<string, any> = {
    "jon-snow": {
      name: "Jon Snow",
      title: "The King in the North",
      house: "Stark",
      image: jonSnow,
      quote: "I am the sword in the darkness. I am the watcher on the walls.",
      origin: "Winterfell, The North",
      allegiance: "House Stark, Night's Watch",
      weapons: "Longclaw (Valyrian Steel)",
      story: "Born as the bastard son of Ned Stark, Jon Snow's true parentage was hidden for years. He joined the Night's Watch, rose to become Lord Commander, was betrayed and resurrected, and eventually became King in the North. His real name is Aegon Targaryen, making him the rightful heir to the Iron Throne.",
      abilities: ["Expert Swordsman", "Natural Leader", "Warging", "Resurrection"],
      audioUrl: "/audio/jon-snow.mp3" // You would add actual audio files
    },
    "daenerys": {
      name: "Daenerys Targaryen",
      title: "Mother of Dragons",
      house: "Targaryen",
      image: daenerys,
      quote: "I will take what is mine with fire and blood.",
      origin: "Dragonstone",
      allegiance: "House Targaryen",
      weapons: "Three Dragons: Drogon, Rhaegal, Viserion",
      story: "The last surviving member of House Targaryen, Daenerys was sold into marriage but emerged as the Mother of Dragons. She conquered Slaver's Bay, freed countless slaves, and eventually returned to Westeros to claim her birthright. Her quest for power ultimately led to her downfall.",
      abilities: ["Dragon Rider", "Fire Immunity", "Natural Commander", "Conqueror"],
      audioUrl: "/audio/daenerys.mp3"
    },
    "tyrion": {
      name: "Tyrion Lannister",
      title: "The Imp",
      house: "Lannister",
      image: tyrion,
      quote: "I drink and I know things.",
      origin: "Casterly Rock",
      allegiance: "House Lannister (formerly), House Targaryen",
      weapons: "Wit and Intelligence",
      story: "The youngest son of Tywin Lannister, Tyrion was born a dwarf and faced ridicule his entire life. Despite this, he became one of the cleverest men in Westeros, serving as Hand of the King multiple times and eventually becoming Hand to Daenerys Targaryen.",
      abilities: ["Political Genius", "Strategic Mind", "Master of Coin", "Diplomatic Skills"],
      audioUrl: "/audio/tyrion.mp3"
    },
    "cersei": {
      name: "Cersei Lannister",
      title: "Queen Regent",
      house: "Lannister",
      image: cersei,
      quote: "When you play the game of thrones, you win or you die.",
      origin: "Casterly Rock",
      allegiance: "House Lannister",
      weapons: "Political Manipulation and Wildfire",
      story: "Twin sister to Jaime Lannister and wife to King Robert Baratheon, Cersei was one of the most ruthless players in the game of thrones. She would stop at nothing to protect her children and maintain power, even if it meant destroying her enemies with wildfire.",
      abilities: ["Political Manipulation", "Ruthless Cunning", "Mother's Fury", "Royal Authority"],
      audioUrl: "/audio/cersei.mp3"
    },
    "arya": {
      name: "Arya Stark",
      title: "No One",
      house: "Stark",
      image: arya,
      quote: "Not today.",
      origin: "Winterfell, The North",
      allegiance: "House Stark",
      weapons: "Needle and Faceless Men Training",
      story: "The youngest daughter of Ned Stark, Arya witnessed her father's execution and spent years seeking revenge. She trained with the Faceless Men of Braavos, learned to change faces, and returned to Westeros as a deadly assassin to settle old scores.",
      abilities: ["Shapeshifting", "Assassination", "Expert Fighter", "Stealth Master"],
      audioUrl: "/audio/arya.mp3"
    }
  };

  const character = characterData[characterId as string];

  useEffect(() => {
    if (imageRef.current && contentRef.current) {
      // Epic entrance animation
      const tl = gsap.timeline();
      
      tl.set(imageRef.current, { scale: 1.5, opacity: 0, rotateY: 90 })
        .set(contentRef.current, { x: 100, opacity: 0 })
        .to(imageRef.current, { 
          scale: 1, 
          opacity: 1, 
          rotateY: 0, 
          duration: 1.5, 
          ease: "power3.out" 
        })
        .to(contentRef.current, { 
          x: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power2.out" 
        }, "-=0.5");

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: "+=10",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, [characterId]);

  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
    // In a real implementation, you would control actual audio playback here
  };

  if (!character) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-gold mb-4">Character Not Found</h1>
          <Link to="/characters" className="btn-gold">
            Return to Characters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-night opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Character Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="relative group">
                <img
                  ref={imageRef}
                  src={character.image}
                  alt={character.name}
                  className="w-full max-w-md mx-auto rounded-3xl shadow-epic hover-glow"
                />
                
                {/* Audio Control */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleAudio}
                  className={`absolute top-4 right-4 p-4 rounded-full ${
                    audioPlaying ? 'bg-targaryen' : 'bg-lannister'
                  } text-white shadow-lg transition-all duration-300`}
                >
                  {audioPlaying ? '⏸️' : '▶️'}
                </motion.button>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-gold opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* Character Info */}
            <div ref={contentRef} className="space-y-6">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 className="font-display text-5xl md:text-7xl text-gold mb-4 text-glow">
                  {character.name}
                </h1>
                <p className="font-title text-2xl text-accent mb-6">
                  {character.title}
                </p>
                
                <blockquote className="font-title text-xl italic text-foreground/80 border-l-4 border-gold pl-6 mb-8">
                  "{character.quote}"
                </blockquote>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="card-epic">
                  <h3 className="font-title text-lg text-gold mb-2">Origin</h3>
                  <p className="text-foreground/80">{character.origin}</p>
                </div>
                
                <div className="card-epic">
                  <h3 className="font-title text-lg text-gold mb-2">Allegiance</h3>
                  <p className="text-foreground/80">{character.allegiance}</p>
                </div>
                
                <div className="card-epic md:col-span-2">
                  <h3 className="font-title text-lg text-gold mb-2">Weapons</h3>
                  <p className="text-foreground/80">{character.weapons}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl text-gold mb-8 text-center">
            The Story
          </h2>
          <div className="card-epic">
            <p className="font-body text-lg leading-relaxed text-foreground/90">
              {character.story}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Abilities Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 px-6 bg-gradient-night"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl text-gold mb-12 text-center">
            Powers & Abilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {character.abilities.map((ability: string, index: number) => (
              <motion.div
                key={ability}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="card-epic text-center hover-float"
              >
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-title text-lg text-gold mb-2">{ability}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Navigation */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-12 px-6 text-center"
      >
        <Link
          to="/characters"
          className="btn-royal"
        >
          ← Back to All Characters
        </Link>
      </motion.section>
    </div>
  );
};

export default CharacterDetail;