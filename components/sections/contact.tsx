"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Clock, ArrowRight } from "lucide-react";
import { Button, Card, Container, Input, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  submit?: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background-alt" />
      </div>

      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Let&apos;s Talk
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            Ready to explore automation possibilities? Reach out and we&apos;ll
            schedule a free 30-minute discovery call.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <Card variant="glass" padding="lg">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-foreground-muted mb-6">
                    Thanks for reaching out. We&apos;ll get back to you within 24
                    hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errors.submit && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {errors.submit}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                    />
                  </div>
                  <Input
                    label="Company (optional)"
                    name="company"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                  <Textarea
                    label="Message"
                    name="message"
                    placeholder="Tell us about your automation challenges..."
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    rows={5}
                    required
                  />
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Email Card */}
            <Card variant="default" padding="md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">
                    Email Us
                  </h4>
                  <a
                    href="mailto:hello@otoniqai.com"
                    className="text-foreground-muted hover:text-primary transition-colors"
                  >
                    hello@otoniqai.com
                  </a>
                </div>
              </div>
            </Card>

            {/* Response Time Card */}
            <Card variant="default" padding="md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1">
                    Response Time
                  </h4>
                  <p className="text-foreground-muted">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </Card>

            {/* CTA Card */}
            <Card
              variant="gradient"
              padding="lg"
              className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20"
            >
              <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                Prefer a direct call?
              </h4>
              <p className="text-foreground-muted text-sm mb-4">
                Book a free 30-minute discovery call to discuss your automation
                needs.
              </p>
              <a
                href="https://calendly.com/malek-otoniqai/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm" className="w-full">
                  Schedule a Call
                  <ArrowRight size={16} />
                </Button>
              </a>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
