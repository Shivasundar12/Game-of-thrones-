import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const Episodes = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const episodes = [
    {
      id: 1,
      title: "Game of Thrones Official Trailer",
      description: "The epic trailer that started it all - witness the beginning of the greatest fantasy series ever created.",
      youtubeId: "rlR4PJn8b8I",
      thumbnail: "https://img.youtube.com/vi/rlR4PJn8b8I/maxresdefault.jpg",
      season: "Season 1",
      duration: "2:24"
    },
    {
      id: 2,
      title: "Battle of Winterfell",
      description: "The epic final battle against the Night King and the Army of the Dead in the longest battle sequence ever filmed.",
      youtubeId: "k7Uc84U04Sk",
      thumbnail: "https://img.youtube.com/vi/k7Uc84U04Sk/maxresdefault.jpg",
      season: "Season 8",
      duration: "3:45"
    },
    {
      id: 3,
      title: "Daenerys Dragons Scenes",
      description: "The most powerful moments featuring the Mother of Dragons and her three children - Drogon, Rhaegal, and Viserion.",
      youtubeId: "StD8lKJGzfA",
      thumbnail: "https://img.youtube.com/vi/StD8lKJGzfA/maxresdefault.jpg",
      season: "All Seasons",
      duration: "12:34"
    },
    {
      id: 4,
      title: "Jon Snow Best Moments",
      description: "The most heroic and memorable scenes of Jon Snow, from bastard to King in the North.",
      youtubeId: "zty4LrrBhGE",
      thumbnail: "https://img.youtube.com/vi/zty4LrrBhGE/maxresdefault.jpg",
      season: "All Seasons",
      duration: "15:42"
    }
  ];

  const openVideo = (youtubeId: string) => {
    setSelectedVideo(youtubeId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

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
            Episodes & Media
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-title text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto"
          >
            Relive the most epic moments from the Seven Kingdoms
          </motion.p>
        </div>
      </motion.section>

      {/* Episodes Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {episodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="card-epic group cursor-pointer"
                onClick={() => openVideo(episode.youtubeId)}
              >
                {/* Video Thumbnail */}
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-targaryen rounded-full flex items-center justify-center text-white text-2xl shadow-epic"
                    >
                      ▶️
                    </motion.div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-title">
                    {episode.duration}
                  </div>
                  
                  {/* Season Badge */}
                  <div className="absolute top-4 left-4 bg-gold/20 text-gold border border-gold/30 px-3 py-1 rounded-full text-sm font-title">
                    {episode.season}
                  </div>
                </div>

                {/* Episode Info */}
                <div>
                  <h3 className="font-title text-2xl font-bold text-gold mb-3 group-hover:text-glow transition-all duration-300">
                    {episode.title}
                  </h3>
                  <p className="font-body text-foreground/80 leading-relaxed">
                    {episode.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 px-6 text-center bg-gradient-royal"
      >
        <div className="max-w-4xl mx-auto">
          <blockquote className="font-display text-3xl md:text-5xl text-white mb-6">
            "Chaos isn't a pit. Chaos is a ladder."
          </blockquote>
          <p className="font-title text-xl text-white/80">
            - Petyr "Littlefinger" Baelish
          </p>
        </div>
      </motion.section>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
          onClick={closeVideo}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="Game of Thrones Video"
              className="w-full h-full rounded-xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gold transition-colors duration-300"
            >
              ✕
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Episodes;