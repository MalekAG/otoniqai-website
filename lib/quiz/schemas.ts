import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const leadApiSchema = leadFormSchema.extend({
  path: z.enum(["support", "sales", "both"]),
  answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
  topSuggestions: z.array(z.string()),
  readinessTier: z.string().optional(),
  readinessMessage: z.string().optional(),
});

export type LeadApiData = z.infer<typeof leadApiSchema>;
