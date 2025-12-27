import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HowItWorksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  {
    number: 1,
    title: "Enter Text or URL",
    description:
      "Paste your review, social media post, or a URL from YouTube, Reddit, news sites, or blogs. Our system will automatically extract the relevant content.",
  },
  {
    number: 2,
    title: "AI Processing",
    description:
      "Our advanced AI model analyzes the text, identifying sentiment patterns, emotional tone, and key phrases to understand the overall message.",
  },
  {
    number: 3,
    title: "View Insights",
    description:
      "Get detailed sentiment scores, sentence-by-sentence breakdown, key insights, and actionable recommendations based on the analysis.",
  },
];

export function HowItWorksDialog({ open, onOpenChange }: HowItWorksDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-display text-center text-foreground">
            How It Works
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Background Process Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary">
              Background Process
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our system uses state-of-the-art natural language processing
              technology powered by advanced AI models. The AI analyzes your
              text word by word, identifying sentiment patterns, emotional
              indicators, and contextual meaning to understand what's being
              expressed.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The system can analyze reviews, social media posts, comments, and
              articles, providing you with detailed insights about the emotional
              tone and sentiment of your content.
            </p>
          </div>

          {/* How to Use Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">How to Use</h3>

            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1 border-l border-border/50 pl-4 pb-4">
                    <h4 className="font-semibold text-foreground mb-1">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-8"
          >
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
