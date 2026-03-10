import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  email: z.string().email("Please enter a valid email address").max(254),
  company: z.string().min(1, "Company name is required").max(200).trim(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const leadApiSchema = leadFormSchema.extend({
  path: z.enum(["support", "sales", "both"]),
  answers: z
    .record(z.string().max(200), z.union([z.string().max(200), z.array(z.string().max(200)).max(10)]))
    .refine((obj) => Object.keys(obj).length <= 20, "Too many answers"),
  topSuggestions: z.array(z.string().max(200)).max(10),
  readinessTier: z.string().max(100).optional(),
  readinessMessage: z.string().max(500).optional(),
});

export type LeadApiData = z.infer<typeof leadApiSchema>;
