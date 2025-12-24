import { motion } from "framer-motion";
import { SentimentGauge } from "./SentimentGauge";
import { SentenceBreakdown } from "./SentenceBreakdown";
import { InsightsPanel } from "./InsightsPanel";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AnalysisResult {
  overallSentiment: "positive" | "negative" | "neutral";
  overallScore: number;
  confidence: number;
  sentences: Array<{
    text: string;
    sentiment: "positive" | "negative" | "neutral";
    score: number;
  }>;
  insights: string[];
  keywords: Array<{
    word: string;
    sentiment: "positive" | "negative" | "neutral";
    count: number;
  }>;
  summary: string;
}

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  const getSentimentIcon = () => {
    switch (result.overallSentiment) {
      case "positive":
        return <TrendingUp className="w-6 h-6" />;
      case "negative":
        return <TrendingDown className="w-6 h-6" />;
      default:
        return <Minus className="w-6 h-6" />;
    }
  };

  const getSentimentClass = () => {
    switch (result.overallSentiment) {
      case "positive":
        return "sentiment-positive";
      case "negative":
        return "sentiment-negative";
      default:
        return "sentiment-neutral";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Main Result Card */}
      <div className="glass-card rounded-2xl p-8 glow-primary">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Gauge */}
          <div className="flex-shrink-0">
            <SentimentGauge
              score={result.overallScore}
              sentiment={result.overallSentiment}
              confidence={result.confidence}
            />
          </div>
          
          {/* Overall Result */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <span className={`sentiment-badge ${getSentimentClass()}`}>
                {getSentimentIcon()}
                <span className="capitalize font-semibold">{result.overallSentiment}</span>
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Overall Sentiment Analysis
            </h2>
            <p className="text-muted-foreground">
              {result.sentences?.length || 0} sentences analyzed • {result.keywords?.length || 0} keywords detected
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Sentence Breakdown */}
        <div>
          <SentenceBreakdown sentences={result.sentences || []} />
        </div>
        
        {/* Right Column - Insights */}
        <div>
          <InsightsPanel
            insights={result.insights || []}
            keywords={result.keywords || []}
            summary={result.summary || ""}
          />
        </div>
      </div>
    </motion.div>
  );
}
