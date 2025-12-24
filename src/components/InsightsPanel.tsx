import { motion } from "framer-motion";
import { Lightbulb, Tag, Sparkles } from "lucide-react";

interface Keyword {
  word: string;
  sentiment: "positive" | "negative" | "neutral";
  count: number;
}

interface InsightsPanelProps {
  insights: string[];
  keywords: Keyword[];
  summary: string;
}

export function InsightsPanel({ insights, keywords, summary }: InsightsPanelProps) {
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

  return (
    <div className="space-y-6">
      {/* Summary */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-semibold text-foreground">Summary</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">{summary}</p>
        </motion.div>
      )}

      {/* Key Insights */}
      {insights && insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-display font-semibold text-foreground">Key Insights</h3>
          </div>
          <ul className="space-y-3">
            {insights.map((insight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-sm text-foreground/90 leading-relaxed">{insight}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Keywords */}
      {keywords && keywords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-semibold text-foreground">Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`sentiment-badge ${getSentimentClass(keyword.sentiment)} cursor-default`}
              >
                {keyword.word}
                {keyword.count > 1 && (
                  <span className="ml-1 opacity-70">×{keyword.count}</span>
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
