"use client";

import { motion } from "framer-motion";
import { FileCode, Check, ArrowRight } from "lucide-react";
import { Card, Container, IconBox, Badge, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";

const products = [
  {
    icon: FileCode,
    iconLabel: "PLC Documenter code file icon",
    name: "PLC Documenter",
    oneLiner: "AI-powered PLC documentation, instantly",
    features: [
      "Automatic parsing of PLC code structure",
      "AI-generated descriptions for every routine",
      "Cross-reference mapping between tags and logic",
      "Export to PDF & Excel with one click",
    ],
    href: "/products/documenter",
    status: "Coming Soon",
  },
];

export function Products() {
  return (
    <section id="products" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          title="Our Products"
          subtitle="Tools we've built to solve real problems."
        />

        {/* Products Grid */}
        <div className="max-w-2xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                variant="glow"
                padding="lg"
                className="h-full group relative overflow-hidden"
              >
                {/* Accent left border */}
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-accent" />

                <div className="flex flex-col h-full">
                  {/* Icon + Badge Row */}
                  <div className="flex items-start justify-between mb-6">
                    <IconBox
                      variant="accent"
                      size="lg"
                    >
                      <product.icon aria-label={product.iconLabel} role="img" />
                    </IconBox>

                    <Badge variant="accent">
                      {product.status}
                    </Badge>
                  </div>

                  {/* Name */}
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>

                  {/* One-liner */}
                  <p className="text-foreground-muted leading-relaxed mb-6">
                    {product.oneLiner}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 bg-accent/10 text-accent-dark"
                          aria-hidden="true"
                        >
                          <Check size={12} aria-hidden="true" />
                        </span>
                        <span className="text-foreground-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <Link
                    href={product.href}
                    className={cn(
                      "inline-flex items-center gap-2 mt-auto",
                      "text-accent-dark font-medium",
                      "hover:text-primary transition-colors duration-200",
                      "group/link"
                    )}
                  >
                    Learn More
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
