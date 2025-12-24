import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const sampleTexts = [
  {
    label: "Product Review",
    text: "I absolutely love this product! It exceeded all my expectations. The quality is outstanding and the customer service was incredibly helpful. However, the shipping took a bit longer than expected, which was slightly frustrating. Overall, I would highly recommend this to anyone looking for a reliable solution.",
  },
  {
    label: "Social Media",
    text: "Just tried the new restaurant downtown and I'm completely disappointed. The food was cold, service was slow, and prices were way too high for what you get. The only saving grace was the nice ambiance and the friendly host. Won't be coming back anytime soon. 👎",
  },
  {
    label: "App Feedback",
    text: "The app is okay. It does what it's supposed to do. The interface is clean but nothing special. I've used similar apps before and this one doesn't really stand out. It works fine for basic needs.",
  },
];

export function TextInput({ onAnalyze, isLoading }: TextInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  const handleSampleClick = (sampleText: string) => {
    setText(sampleText);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-display font-semibold text-foreground">
            Enter Text to Analyze
          </h2>
        </div>
        
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your review, social media post, or any text you want to analyze..."
          className="min-h-[160px] bg-muted/50 border-border/50 focus:border-primary/50 resize-none text-foreground placeholder:text-muted-foreground"
          disabled={isLoading}
        />
        
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground mr-1">Try a sample:</span>
            {sampleTexts.map((sample) => (
              <button
                key={sample.label}
                onClick={() => handleSampleClick(sample.text)}
                disabled={isLoading}
                className="text-xs px-2 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors disabled:opacity-50"
              >
                {sample.label}
              </button>
            ))}
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={!text.trim() || isLoading}
            variant="glow"
            size="lg"
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze Sentiment
              </>
            )}
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        Powered by AI • Analyzes sentiment, extracts insights, and identifies key themes
      </p>
    </motion.div>
  );
}
