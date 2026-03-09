"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/ui/container";
import { leadFormSchema, type LeadFormData } from "@/lib/quiz/schemas";

type EmailGateProps = {
  onSubmit: (data: LeadFormData) => Promise<void>;
  isSubmitting: boolean;
};

export function EmailGate({ onSubmit, isSubmitting }: EmailGateProps) {
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = leadFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    await onSubmit(result.data);
  }

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  return (
    <section className="min-h-screen flex items-center py-16 sm:py-24">
      <Container size="sm">
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Almost there!
            </h2>
            <p className="text-foreground-muted text-lg">
              Enter your details to see your personalized AI recommendations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="name"
              label="Your Name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              error={errors.name}
              disabled={isSubmitting}
            />

            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="john@company.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              error={errors.email}
              disabled={isSubmitting}
            />

            <Input
              id="company"
              label="Company Name"
              type="text"
              placeholder="Acme Inc."
              value={form.company}
              onChange={(e) => updateField("company", e.target.value)}
              error={errors.company}
              disabled={isSubmitting}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating your results...
                </>
              ) : (
                <>
                  See My Results <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>

            <p className="text-xs text-foreground-muted text-center flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Your info is safe. No spam, ever.
            </p>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
