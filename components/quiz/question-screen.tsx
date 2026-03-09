"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";
import { type Question, type QuestionOption } from "@/lib/quiz/quiz-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ProgressBar } from "./progress-bar";

type QuestionScreenProps = {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (option: QuestionOption | QuestionOption[]) => void;
  onBack: () => void;
};

export function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  onBack,
}: QuestionScreenProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleOption = (value: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const handleContinue = () => {
    const selectedOptions = question.options.filter((o) => selected.has(o.value));
    onAnswer(selectedOptions);
  };

  return (
    <section className="min-h-screen flex items-center py-16 sm:py-24">
      <Container size="sm">
        <div className="mb-8 flex items-center gap-3">
          <button
            onClick={onBack}
            className="shrink-0 p-2 rounded-full text-foreground-muted hover:text-foreground hover:bg-primary/5 transition-colors duration-200 cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <ProgressBar current={questionIndex + 1} total={totalQuestions} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center">
              {question.question}
            </h2>
            {question.multiSelect ? (
              <p className="text-sm text-foreground-muted text-center mb-6">Select all that apply</p>
            ) : (
              <div className="mb-8" />
            )}

            <div className="grid gap-3">
              {question.options.map((option) => {
                if (question.multiSelect) {
                  const isSelected = selected.has(option.value);
                  return (
                    <Card
                      key={option.value}
                      variant="glow"
                      padding="md"
                      className={`cursor-pointer group active:scale-[0.98] transition-all duration-200 ${
                        isSelected ? "ring-2 ring-primary bg-primary/5" : ""
                      }`}
                      onClick={() => toggleOption(option.value)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors duration-200 ${
                            isSelected
                              ? "bg-primary border-primary"
                              : "border-border group-hover:border-primary/50"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                          {option.label}
                        </span>
                      </div>
                    </Card>
                  );
                }

                return (
                  <Card
                    key={option.value}
                    variant="glow"
                    padding="md"
                    className="cursor-pointer group active:scale-[0.98]"
                    onClick={() => onAnswer(option)}
                  >
                    <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      {option.label}
                    </span>
                  </Card>
                );
              })}
            </div>

            {question.multiSelect && (
              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  className="cursor-pointer"
                  disabled={selected.size === 0}
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
