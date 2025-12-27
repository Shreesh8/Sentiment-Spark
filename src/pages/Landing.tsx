import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HowItWorksDialog } from "@/components/HowItWorksDialog";
import heroBg from "@/assets/hero-bg.jpg";

// Floating particle component
const FloatingParticle = ({ delay, duration, size, left, top }: { 
  delay: number; 
  duration: number; 
  size: number;
  left: string;
  top: string;
}) => (
  <motion.div
    className="absolute rounded-full bg-primary/30 blur-sm"
    style={{ 
      width: size, 
      height: size, 
      left, 
      top,
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Generate random particles
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  delay: Math.random() * 3,
  duration: 4 + Math.random() * 4,
  size: 4 + Math.random() * 12,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
}));

const Landing = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Animated gradient overlays */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-primary/10"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-background/50" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <FloatingParticle
            key={particle.id}
            delay={particle.delay}
            duration={particle.duration}
            size={particle.size}
            left={particle.left}
            top={particle.top}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/20 blur-[100px]"
        style={{ top: '20%', left: '10%' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-accent/20 blur-[80px]"
        style={{ bottom: '10%', right: '15%' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-6 py-6 flex items-center justify-end">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => setShowHowItWorks(true)}
            className="text-foreground/80 hover:text-foreground transition-colors font-medium hover:underline underline-offset-4"
          >
            How it works
          </motion.button>
        </div>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6"
          >
            <motion.span
              className="inline-block"
              animate={{
                textShadow: [
                  "0 0 20px hsl(var(--primary) / 0.3)",
                  "0 0 40px hsl(var(--primary) / 0.5)",
                  "0 0 20px hsl(var(--primary) / 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Sentiment Analysis
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            Analyze reviews, social media posts, and comments to uncover
            sentiment patterns and actionable insights with AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative inline-block"
          >
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-xl"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Button
              onClick={() => navigate("/analyze")}
              size="lg"
              className="relative bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 text-primary-foreground px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </main>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* How It Works Dialog */}
      <HowItWorksDialog open={showHowItWorks} onOpenChange={setShowHowItWorks} />
    </div>
  );
};

export default Landing;
