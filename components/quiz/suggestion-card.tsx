"use client";

import { motion } from "framer-motion";
import { icons, type LucideIcon } from "lucide-react";
import { Clock, TrendingDown, Lightbulb, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { Badge } from "@/components/ui/badge";
import { type ScoredSuggestion } from "@/lib/quiz/suggestion-engine";

type SuggestionCardProps = {
  suggestion: ScoredSuggestion;
  rank: number;
};

const difficultyStyles: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-primary/8 text-primary border-primary/15",
  Hard: "bg-red-50 text-red-700 border-red-200",
  "Easy-Medium": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export function SuggestionCard({ suggestion, rank }: SuggestionCardProps) {
  const Icon: LucideIcon = icons[suggestion.icon as keyof typeof icons] ?? icons.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.15, duration: 0.5 }}
    >
      <Card variant="glow" padding="lg">
        <div className="flex items-start gap-4">
          <IconBox variant={rank === 0 ? "accent" : "primary"} size="lg">
            <Icon />
          </IconBox>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {suggestion.title}
              </h3>
              {rank === 0 && (
                <Badge variant="accent" className="shrink-0">
                  Top Pick
                </Badge>
              )}
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border shrink-0 ${difficultyStyles[suggestion.difficulty]}`}
              >
                {suggestion.difficulty}
              </span>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed mb-2">
              {suggestion.description}
            </p>
            {suggestion.reason && (
              <p className="text-sm text-primary/80 leading-relaxed mb-4 italic">
                {suggestion.reason}
              </p>
            )}

            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2 bg-primary/5 rounded-md px-3 py-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  ~{suggestion.timeSavedHours} hrs/mo saved
                </span>
              </div>
              <div className="flex items-center gap-2 bg-accent/10 rounded-md px-3 py-2">
                <TrendingDown className="w-4 h-4 text-accent-dark" />
                <span className="text-sm font-medium text-accent-dark">
                  {suggestion.costSavedPercent}% cost reduction
                </span>
              </div>
            </div>

            {/* Quick Start */}
            <div className="bg-background-alt rounded-lg px-4 py-3 mb-4">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-accent-dark mt-0.5 shrink-0" />
                <p className="text-sm text-foreground-muted leading-relaxed">
                  <span className="font-medium text-foreground">Quick Start:</span>{" "}
                  {suggestion.quickStart}
                </p>
              </div>
            </div>

            {/* Tools */}
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestion.tools.map((tool) => (
                <span
                  key={tool.name}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-background-elevated border border-border text-foreground-muted"
                >
                  {tool.name}
                  <span className="ml-1 opacity-60">({tool.note})</span>
                </span>
              ))}
            </div>

            {/* Learn How */}
            <a
              href={suggestion.learnHowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {suggestion.learnHowLabel}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
