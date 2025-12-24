import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl animate-pulse-slow" />
            <div className="relative p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
        >
          <span className="gradient-text">AI Sentiment</span>
          <br />
          <span className="text-foreground">Analyzer</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg max-w-xl mx-auto flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          Analyze reviews and social media text to uncover sentiment patterns and actionable insights
        </motion.p>
      </div>
    </header>
  );
}
