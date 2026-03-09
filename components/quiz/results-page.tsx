"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SuggestionCard } from "./suggestion-card";
import { type ScoredSuggestion, type ReadinessTier } from "@/lib/quiz/suggestion-engine";

type ResultsPageProps = {
  suggestions: ScoredSuggestion[];
  userName: string;
  readiness: ReadinessTier | null;
};

const BOOKING_URL = "https://calendly.com/otoniqai/discovery";

const tierStyles: Record<string, string> = {
  "Manual Mode": "bg-accent/8 border-accent/20",
  "Partially Automated": "bg-primary/5 border-primary/15",
  "Optimization Ready": "bg-primary/10 border-primary/20",
};

const tierBadgeVariant: Record<string, "accent" | "primary"> = {
  "Manual Mode": "accent",
  "Partially Automated": "primary",
  "Optimization Ready": "primary",
};

export function ResultsPage({ suggestions, userName, readiness }: ResultsPageProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const firstName = userName.split(" ")[0];
  const totalHours = suggestions.reduce((sum, s) => sum + s.timeSavedHours, 0);

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    try {
      const { generatePlaybookPdf } = await import("@/lib/quiz/generate-pdf");
      await generatePlaybookPdf(userName, readiness, suggestions);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="min-h-screen py-16 sm:py-24">
      <Container size="md">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {firstName}, here are your top AI opportunities
          </h2>
          <p className="text-foreground-muted text-lg max-w-xl mx-auto">
            Based on your answers, these automations could save you up to{" "}
            <span className="font-semibold text-primary">{totalHours}+ hours per month</span>.
          </p>
        </motion.div>

        {readiness && (
          <motion.div
            className={`border rounded-lg p-6 max-w-2xl mx-auto mb-8 ${tierStyles[readiness.label]}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Badge variant={tierBadgeVariant[readiness.label]} className="shrink-0">
                {readiness.label}
              </Badge>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {readiness.message}
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid gap-5 max-w-2xl mx-auto mb-12">
          {suggestions.map((s, i) => (
            <SuggestionCard key={s.id} suggestion={s} rank={i} />
          ))}
        </div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="cursor-pointer"
            onClick={handleDownloadPdf}
            disabled={isGenerating}
          >
            <Download className="w-5 h-5" />
            {isGenerating ? "Generating..." : "Download Your AI Automation Playbook"}
          </Button>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="bg-background-elevated border border-border rounded-lg p-8 max-w-lg mx-auto">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              Get Your Personalized Implementation Plan
            </h3>
            <p className="text-foreground-muted text-sm mb-6 leading-relaxed">
              We&apos;ll go deeper on your results and build a step-by-step
              roadmap tailored to your stack. Free, no strings attached.
            </p>
            <Button
              size="lg"
              className="cursor-pointer"
              onClick={() => window.open(BOOKING_URL, "_blank")}
            >
              <Calendar className="w-5 h-5" />
              Get Your Implementation Plan
              <ArrowRight className="w-5 h-5 hidden sm:block" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
