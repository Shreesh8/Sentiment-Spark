import { motion } from "framer-motion";

interface SentimentGaugeProps {
  score: number; // -1 to 1
  sentiment: "positive" | "negative" | "neutral";
  confidence: number; // 0 to 1
}

export function SentimentGauge({ score, sentiment, confidence }: SentimentGaugeProps) {
  // Convert score from -1,1 to 0-180 degrees
  const rotation = ((score + 1) / 2) * 180 - 90;
  
  const getGradientColors = () => {
    switch (sentiment) {
      case "positive":
        return "from-sentiment-positive to-primary";
      case "negative":
        return "from-sentiment-negative to-destructive";
      default:
        return "from-sentiment-neutral to-accent";
    }
  };

  const getSentimentLabel = () => {
    if (score > 0.3) return "Positive";
    if (score < -0.3) return "Negative";
    return "Neutral";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-24 overflow-hidden">
        {/* Gauge background */}
        <div className="absolute inset-0 rounded-t-full bg-gradient-to-r from-sentiment-negative via-sentiment-neutral to-sentiment-positive opacity-20" />
        
        {/* Gauge segments */}
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--sentiment-negative))" />
              <stop offset="50%" stopColor="hsl(var(--sentiment-neutral))" />
              <stop offset="100%" stopColor="hsl(var(--sentiment-positive))" />
            </linearGradient>
          </defs>
          
          {/* Background arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Colored arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.3"
          />
        </svg>
        
        {/* Needle */}
        <motion.div
          className="absolute bottom-0 left-1/2 origin-bottom"
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          style={{ transformOrigin: "bottom center" }}
        >
          <div className={`w-1 h-20 rounded-full bg-gradient-to-t ${getGradientColors()}`} />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-foreground" />
        </motion.div>
      </div>
      
      {/* Score display */}
      <div className="text-center">
        <motion.div
          className={`text-4xl font-display font-bold gradient-text`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {(score * 100).toFixed(0)}%
        </motion.div>
        <div className="text-muted-foreground text-sm mt-1">
          {getSentimentLabel()} • {(confidence * 100).toFixed(0)}% confidence
        </div>
      </div>
    </div>
  );
}
