"use client";

import { motion } from "framer-motion";
import { Headset, Megaphone, Layers } from "lucide-react";
import { type Path } from "@/lib/quiz/quiz-data";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { IconBox } from "@/components/ui/icon-box";

type PathSelectorProps = {
  onSelect: (path: Path) => void;
};

const paths = [
  {
    id: "support" as const,
    icon: Headset,
    title: "Customer Support AI",
    description: "Automate responses, route tickets, and keep customers happy.",
    questions: 6,
  },
  {
    id: "sales" as const,
    icon: Megaphone,
    title: "Sales & Marketing AI",
    description: "Score leads, nurture prospects, and generate content faster.",
    questions: 6,
  },
  {
    id: "both" as const,
    icon: Layers,
    title: "Both",
    description: "Get the full picture across support and sales automation.",
    questions: 12,
  },
];

export function PathSelector({ onSelect }: PathSelectorProps) {
  return (
    <section className="min-h-screen flex items-center py-16 sm:py-24">
      <Container size="md">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            What area should we focus on?
          </h2>
          <p className="text-foreground-muted text-lg">
            Choose the area that matters most to your business right now.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-3 max-w-3xl mx-auto">
          {paths.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card
                variant="glow"
                padding="lg"
                className="text-center cursor-pointer h-full"
                onClick={() => onSelect(p.id)}
              >
                <IconBox
                  variant={p.id === "both" ? "accent" : "primary"}
                  size="lg"
                  className="mx-auto mb-4"
                >
                  <p.icon />
                </IconBox>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed mb-3">
                  {p.description}
                </p>
                <span className="text-xs text-foreground-muted">
                  {p.questions} questions
                </span>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
