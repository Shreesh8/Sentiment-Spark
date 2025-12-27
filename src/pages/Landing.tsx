import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HowItWorksDialog } from "@/components/HowItWorksDialog";
import heroBg from "@/assets/hero-bg.jpg";

const Landing = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-background/40" />

      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-6 py-6 flex items-center justify-end">
          <button
            onClick={() => setShowHowItWorks(true)}
            className="text-foreground/80 hover:text-foreground transition-colors font-medium"
          >
            How it works
          </button>
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
            Sentiment Analysis
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
          >
            <Button
              onClick={() => navigate("/analyze")}
              size="lg"
              className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 text-primary-foreground px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </main>

      {/* How It Works Dialog */}
      <HowItWorksDialog open={showHowItWorks} onOpenChange={setShowHowItWorks} />
    </div>
  );
};

export default Landing;
