import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Sentence {
  text: string;
  sentiment: "positive" | "negative" | "neutral";
  score: number;
}

interface SentenceBreakdownProps {
  sentences: Sentence[];
}

export function SentenceBreakdown({ sentences }: SentenceBreakdownProps) {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-sentiment-positive" />;
      case "negative":
        return <TrendingDown className="w-4 h-4 text-sentiment-negative" />;
      default:
        return <Minus className="w-4 h-4 text-sentiment-neutral" />;
    }
  };

  const getSentimentClass = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "sentiment-positive";
      case "negative":
        return "sentiment-negative";
      default:
        return "sentiment-neutral";
    }
  };

  const getBarColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-sentiment-positive";
      case "negative":
        return "bg-sentiment-negative";
      default:
        return "bg-sentiment-neutral";
    }
  };

  if (!sentences || sentences.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-display font-semibold text-foreground">
        Sentence Analysis
      </h3>
      <div className="space-y-2">
        {sentences.map((sentence, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-lg p-4 group hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{getSentimentIcon(sentence.sentiment)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {sentence.text}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span className={`sentiment-badge ${getSentimentClass(sentence.sentiment)}`}>
                    {sentence.sentiment}
                  </span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${getBarColor(sentence.sentiment)} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.abs(sentence.score) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {sentence.score > 0 ? "+" : ""}{(sentence.score * 100).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
