"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  type Path,
  type QuestionOption,
  getQuestionsForPath,
} from "@/lib/quiz/quiz-data";
import { calculateSuggestions, type ScoredSuggestion, type ReadinessTier } from "@/lib/quiz/suggestion-engine";
import { type LeadFormData } from "@/lib/quiz/schemas";
import { LandingHero } from "./landing-hero";
import { PathSelector } from "./path-selector";
import { QuestionScreen } from "./question-screen";
import { EmailGate } from "./email-gate";
import { ResultsPage } from "./results-page";

type Step = "landing" | "path" | "questions" | "email" | "results";

export function QuizApp() {
  const [step, setStep] = useState<Step>("landing");
  const [path, setPath] = useState<Path>("support");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuestionOption | QuestionOption[]>>({});
  const [results, setResults] = useState<ScoredSuggestion[]>([]);
  const [readiness, setReadiness] = useState<ReadinessTier | null>(null);
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = getQuestionsForPath(path);

  const handleStart = useCallback(() => setStep("path"), []);

  const handlePathSelect = useCallback((selected: Path) => {
    setPath(selected);
    setQuestionIndex(0);
    setAnswers({});
    setStep("questions");
  }, []);

  const handleAnswer = useCallback(
    (option: QuestionOption | QuestionOption[]) => {
      const question = questions[questionIndex];
      const newAnswers = { ...answers, [question.id]: option };
      setAnswers(newAnswers);

      if (questionIndex < questions.length - 1) {
        setQuestionIndex((i) => i + 1);
      } else {
        const quizResults = calculateSuggestions(path, newAnswers);
        setResults(quizResults.suggestions);
        setReadiness(quizResults.readiness);
        setStep("email");
      }
    },
    [answers, path, questionIndex, questions]
  );

  const handleBack = useCallback(() => {
    if (questionIndex > 0) {
      const prevQuestion = questions[questionIndex - 1];
      const newAnswers = { ...answers };
      delete newAnswers[prevQuestion.id];
      setAnswers(newAnswers);
      setQuestionIndex((i) => i - 1);
    } else {
      setStep("path");
    }
  }, [answers, questionIndex, questions]);

  const handleEmailSubmit = useCallback(
    async (data: LeadFormData) => {
      setIsSubmitting(true);
      setUserName(data.name);

      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            path,
            answers: Object.fromEntries(
              Object.entries(answers).map(([k, v]) => [
                k,
                Array.isArray(v) ? v.map((o) => o.value) : v.value,
              ])
            ),
            topSuggestions: results.map((r) => r.title),
            readinessTier: readiness?.label,
            readinessMessage: readiness?.message,
          }),
        });
      } catch {
        // Proceed to results even if lead save fails
      }

      setIsSubmitting(false);
      setStep("results");
    },
    [answers, path, results]
  );

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={step + (step === "questions" ? questionIndex : "")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {step === "landing" && <LandingHero onStart={handleStart} />}
          {step === "path" && <PathSelector onSelect={handlePathSelect} />}
          {step === "questions" && (
            <QuestionScreen
              question={questions[questionIndex]}
              questionIndex={questionIndex}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
              onBack={handleBack}
            />
          )}
          {step === "email" && (
            <EmailGate onSubmit={handleEmailSubmit} isSubmitting={isSubmitting} />
          )}
          {step === "results" && (
            <ResultsPage suggestions={results} userName={userName} readiness={readiness} />
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
