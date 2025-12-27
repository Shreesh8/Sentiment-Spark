import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { TextInput } from "@/components/TextInput";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-sentiment', {
        body: { text }
      });

      if (error) {
        throw new Error(error.message || 'Failed to analyze sentiment');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      toast({
        title: "Analysis Complete",
        description: `Detected ${data.overallSentiment} sentiment with ${(data.confidence * 100).toFixed(0)}% confidence`,
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <Header />

        <main className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <TextInput onAnalyze={handleAnalyze} isLoading={isLoading} />

            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <ResultsDisplay result={result} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              AI Sentiment Analyzer • Built with machine learning for accurate text analysis
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
