import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "🚨 Message Sent!",
        description: "Your message has been sent to the Game of Thrones world! The ravens are flying...",
        duration: 5000,
      });
      
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const teamMembers = [
    {
      name: "M. Sujeet",
      role: "Lead Developer & Stark Loyalist",
      phone: "709107035",
      linkedin: "https://www.linkedin.com/in/contactsujeetm/",
      house: "stark",
      quote: "Winter is Coming... and so are the bugs!"
    },
    {
      name: "P. Shiva Sundar",
      role: "Creative Director & Dragon Tamer",
      phone: "7338711301", 
      linkedin: "https://www.linkedin.com/in/3sundar/",
      house: "targaryen",
      quote: "I will code what is mine with fire and TypeScript!"
    }
  ];

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
            Dark Secrets
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-title text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto"
          >
            Send a raven to the masters of WEBSTER - guardians of this digital realm
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Form */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="card-epic"
          >
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-gold mb-4">
                Send a Raven
              </h2>
              <p className="font-title text-lg text-foreground/80">
                Your message will be delivered to the Game of Thrones world
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <label htmlFor="name" className="block font-title text-lg text-gold mb-3">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 bg-secondary/50 border border-border rounded-lg focus:border-gold focus:outline-none transition-all duration-300 font-body text-lg"
                  placeholder="Enter your noble name..."
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <label htmlFor="email" className="block font-title text-lg text-gold mb-3">
                  Your Raven Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 bg-secondary/50 border border-border rounded-lg focus:border-gold focus:outline-none transition-all duration-300 font-body text-lg"
                  placeholder="your.raven@westeros.com"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <label htmlFor="message" className="block font-title text-lg text-gold mb-3">
                  Your Secret Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-4 bg-secondary/50 border border-border rounded-lg focus:border-gold focus:outline-none transition-all duration-300 font-body text-lg resize-none"
                  placeholder="Share your thoughts about this epic Game of Thrones experience..."
                  required
                />
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-12 py-4 rounded-lg font-title font-semibold text-xl transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-secondary/50 text-muted-foreground cursor-not-allowed'
                      : 'btn-fire'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-3">
                      <div className="loading-spinner w-6 h-6" />
                      <span>Sending Raven...</span>
                    </span>
                  ) : (
                    <>🦅 Send to Westeros</>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 px-6 bg-gradient-royal"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl text-white mb-6">
              The Masters of WEBSTER
            </h2>
            <p className="font-title text-xl text-white/80">
              The legendary duo behind this epic digital experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-gold/50 transition-all duration-500"
              >
                <div className="text-center">
                  <div className={`text-6xl mb-4 ${
                    member.house === 'stark' ? '❄️' : '🔥'
                  }`}>
                    {member.house === 'stark' ? '🐺' : '🐉'}
                  </div>
                  
                  <h3 className="font-title text-2xl font-bold text-gold mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="font-title text-lg text-white/80 mb-4">
                    {member.role}
                  </p>
                  
                  <blockquote className="font-body italic text-white/70 mb-6">
                    "{member.quote}"
                  </blockquote>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xl">📞</span>
                      <span className="font-title text-white">{member.phone}</span>
                    </div>
                    
                    <motion.a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="inline-flex items-center space-x-2 text-white hover:text-gold transition-colors duration-300"
                    >
                      <span className="text-xl">💼</span>
                      <span className="font-title">LinkedIn Profile</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Event Info */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-epic">
            <h2 className="font-display text-4xl text-gold mb-6">
              The Great Gathering
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-secondary/30 rounded-xl p-6">
                <div className="text-4xl mb-3">🏛️</div>
                <h3 className="font-title text-xl text-gold mb-2">Event</h3>
                <p className="text-foreground/80">Pravesha Symposium</p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-6">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="font-title text-xl text-gold mb-2">Attendees</h3>
                <p className="text-foreground/80">800+ Participants</p>
              </div>
              
              <div className="bg-secondary/30 rounded-xl p-6">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-title text-xl text-gold mb-2">Achievement</h3>
                <p className="text-foreground/80">Epic Success</p>
              </div>
            </div>

            <p className="font-title text-lg text-foreground/80">
              This masterpiece was forged in the fires of competition, 
              crafted by Team WEBSTER for the legendary Pravesha symposium 
              where 800 brave souls gathered to witness digital magic.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;