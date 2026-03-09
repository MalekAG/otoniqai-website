export type Path = "support" | "sales" | "both";

export type QuestionOption = {
  label: string;
  value: string;
  weights: Record<string, number>;
};

export type Question = {
  id: string;
  path: "support" | "sales";
  question: string;
  multiSelect?: boolean;
  options: QuestionOption[];
};

export type Tool = { name: string; note: string };

export type Suggestion = {
  id: string;
  path: "support" | "sales";
  title: string;
  description: string;
  icon: string; // Lucide icon name
  baseTimeSavedHours: number;
  baseCostSavedPercent: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Easy-Medium";
  quickStart: string;
  tools: Tool[];
  learnHowUrl: string;
  learnHowLabel: string;
};

// --- SUPPORT QUESTIONS (6) ---

const supportQuestions: Question[] = [
  {
    id: "s1",
    path: "support",
    question: "How many customer inquiries do you handle per month?",
    options: [
      {
        label: "Under 100",
        value: "under-100",
        weights: { "ai-chatbot": 2, "smart-routing": 1, "kb-generator": 2, "sentiment": 1, "auto-followup": 2 },
      },
      {
        label: "100 – 500",
        value: "100-500",
        weights: { "ai-chatbot": 3, "smart-routing": 2, "kb-generator": 3, "sentiment": 2, "auto-followup": 3 },
      },
      {
        label: "500 – 2,000",
        value: "500-2000",
        weights: { "ai-chatbot": 3, "smart-routing": 4, "kb-generator": 3, "sentiment": 3, "auto-followup": 3 },
      },
      {
        label: "2,000+",
        value: "2000+",
        weights: { "ai-chatbot": 3, "smart-routing": 4, "kb-generator": 3, "sentiment": 4, "auto-followup": 3 },
      },
    ],
  },
  {
    id: "s2",
    path: "support",
    question: "How large is your customer support team?",
    options: [
      {
        label: "Just me",
        value: "solo",
        weights: { "ai-chatbot": 4, "smart-routing": 0, "kb-generator": 3, "sentiment": 0, "auto-followup": 4 },
      },
      {
        label: "2 – 5 people",
        value: "2-5",
        weights: { "ai-chatbot": 3, "smart-routing": 2, "kb-generator": 3, "sentiment": 2, "auto-followup": 3 },
      },
      {
        label: "6 – 15 people",
        value: "6-15",
        weights: { "ai-chatbot": 2, "smart-routing": 4, "kb-generator": 3, "sentiment": 3, "auto-followup": 2 },
      },
      {
        label: "16+ people",
        value: "16+",
        weights: { "ai-chatbot": 2, "smart-routing": 4, "kb-generator": 4, "sentiment": 4, "auto-followup": 2 },
      },
    ],
  },
  {
    id: "s3",
    path: "support",
    question: "Which support channels do you use?",
    multiSelect: true,
    options: [
      {
        label: "Email",
        value: "email",
        weights: { "ai-chatbot": 2, "smart-routing": 2, "kb-generator": 3, "sentiment": 2, "auto-followup": 4 },
      },
      {
        label: "Live chat / messaging",
        value: "chat",
        weights: { "ai-chatbot": 5, "smart-routing": 2, "kb-generator": 2, "sentiment": 3, "auto-followup": 1 },
      },
      {
        label: "Phone",
        value: "phone",
        weights: { "ai-chatbot": 0, "smart-routing": 4, "kb-generator": 2, "sentiment": 4, "auto-followup": 2 },
      },
      {
        label: "Social media",
        value: "social",
        weights: { "ai-chatbot": 3, "smart-routing": 2, "kb-generator": 2, "sentiment": 4, "auto-followup": 2 },
      },
      {
        label: "Help desk / ticketing system",
        value: "helpdesk",
        weights: { "ai-chatbot": 1, "smart-routing": 4, "kb-generator": 4, "sentiment": 2, "auto-followup": 2 },
      },
    ],
  },
  {
    id: "s4",
    path: "support",
    question: "How do you currently manage customer support?",
    options: [
      {
        label: "Spreadsheets & email",
        value: "spreadsheets",
        weights: { "ai-chatbot": 4, "smart-routing": 1, "kb-generator": 3, "sentiment": 0, "auto-followup": 4 },
      },
      {
        label: "Shared inbox (e.g., Google Groups)",
        value: "shared-inbox",
        weights: { "ai-chatbot": 3, "smart-routing": 2, "kb-generator": 3, "sentiment": 1, "auto-followup": 3 },
      },
      {
        label: "Helpdesk platform (Zendesk, Freshdesk)",
        value: "helpdesk",
        weights: { "ai-chatbot": 1, "smart-routing": 4, "kb-generator": 3, "sentiment": 3, "auto-followup": 1 },
      },
      {
        label: "Already using some automation",
        value: "automated",
        weights: { "ai-chatbot": 0, "smart-routing": 2, "kb-generator": 2, "sentiment": 5, "auto-followup": 0 },
      },
    ],
  },
  {
    id: "s5",
    path: "support",
    question: "What's your biggest customer support challenge?",
    options: [
      {
        label: "Too many repetitive questions",
        value: "repetitive",
        weights: { "ai-chatbot": 5, "smart-routing": 0, "kb-generator": 5, "sentiment": 0, "auto-followup": 0 },
      },
      {
        label: "Slow response times",
        value: "slow",
        weights: { "ai-chatbot": 3, "smart-routing": 5, "kb-generator": 0, "sentiment": 0, "auto-followup": 4 },
      },
      {
        label: "Unhappy customers / churn",
        value: "churn",
        weights: { "ai-chatbot": 0, "smart-routing": 0, "kb-generator": 0, "sentiment": 5, "auto-followup": 5 },
      },
      {
        label: "Scaling the team is too expensive",
        value: "cost",
        weights: { "ai-chatbot": 5, "smart-routing": 3, "kb-generator": 3, "sentiment": 0, "auto-followup": 2 },
      },
    ],
  },
  {
    id: "s6",
    path: "support",
    question: "What would you most want to automate first?",
    options: [
      {
        label: "Answering common FAQs",
        value: "answering-faqs",
        weights: { "ai-chatbot": 8, "smart-routing": 0, "kb-generator": 2, "sentiment": 0, "auto-followup": 0 },
      },
      {
        label: "Routing & prioritizing tickets",
        value: "routing-tickets",
        weights: { "ai-chatbot": 0, "smart-routing": 8, "kb-generator": 0, "sentiment": 1, "auto-followup": 0 },
      },
      {
        label: "Following up after resolution",
        value: "following-up",
        weights: { "ai-chatbot": 0, "smart-routing": 0, "kb-generator": 0, "sentiment": 0, "auto-followup": 8 },
      },
      {
        label: "Understanding customer sentiment",
        value: "customer-mood",
        weights: { "ai-chatbot": 0, "smart-routing": 1, "kb-generator": 0, "sentiment": 8, "auto-followup": 1 },
      },
      {
        label: "Building a help center / knowledge base",
        value: "help-docs",
        weights: { "ai-chatbot": 1, "smart-routing": 0, "kb-generator": 8, "sentiment": 0, "auto-followup": 0 },
      },
    ],
  },
];

// --- SALES QUESTIONS (6) ---

const salesQuestions: Question[] = [
  {
    id: "m1",
    path: "sales",
    question: "How many leads do you generate per month?",
    options: [
      {
        label: "Under 50",
        value: "under-50",
        weights: { "lead-scoring": 1, "email-sequences": 2, "pipeline-optimizer": 0, "content-engine": 3, "social-engage": 3 },
      },
      {
        label: "50 – 200",
        value: "50-200",
        weights: { "lead-scoring": 2, "email-sequences": 3, "pipeline-optimizer": 2, "content-engine": 3, "social-engage": 3 },
      },
      {
        label: "200 – 1,000",
        value: "200-1000",
        weights: { "lead-scoring": 4, "email-sequences": 3, "pipeline-optimizer": 3, "content-engine": 2, "social-engage": 2 },
      },
      {
        label: "1,000+",
        value: "1000+",
        weights: { "lead-scoring": 4, "email-sequences": 3, "pipeline-optimizer": 4, "content-engine": 1, "social-engage": 1 },
      },
    ],
  },
  {
    id: "m2",
    path: "sales",
    question: "Where do your leads come from?",
    multiSelect: true,
    options: [
      {
        label: "Website / SEO",
        value: "website",
        weights: { "lead-scoring": 2, "email-sequences": 3, "pipeline-optimizer": 2, "content-engine": 4, "social-engage": 1 },
      },
      {
        label: "Social media",
        value: "social",
        weights: { "lead-scoring": 1, "email-sequences": 1, "pipeline-optimizer": 1, "content-engine": 3, "social-engage": 5 },
      },
      {
        label: "Referrals / word of mouth",
        value: "referrals",
        weights: { "lead-scoring": 2, "email-sequences": 3, "pipeline-optimizer": 2, "content-engine": 2, "social-engage": 2 },
      },
      {
        label: "Paid ads",
        value: "paid",
        weights: { "lead-scoring": 4, "email-sequences": 3, "pipeline-optimizer": 3, "content-engine": 1, "social-engage": 1 },
      },
      {
        label: "Email / newsletter",
        value: "email-list",
        weights: { "lead-scoring": 2, "email-sequences": 4, "pipeline-optimizer": 1, "content-engine": 3, "social-engage": 1 },
      },
    ],
  },
  {
    id: "m3",
    path: "sales",
    question: "How many people are on your sales/marketing team?",
    options: [
      {
        label: "Just me",
        value: "solo",
        weights: { "lead-scoring": 1, "email-sequences": 4, "pipeline-optimizer": 0, "content-engine": 4, "social-engage": 4 },
      },
      {
        label: "2 – 5 people",
        value: "2-5",
        weights: { "lead-scoring": 3, "email-sequences": 3, "pipeline-optimizer": 2, "content-engine": 3, "social-engage": 3 },
      },
      {
        label: "6 – 15 people",
        value: "6-15",
        weights: { "lead-scoring": 4, "email-sequences": 2, "pipeline-optimizer": 4, "content-engine": 2, "social-engage": 2 },
      },
      {
        label: "16+ people",
        value: "16+",
        weights: { "lead-scoring": 4, "email-sequences": 2, "pipeline-optimizer": 4, "content-engine": 1, "social-engage": 1 },
      },
    ],
  },
  {
    id: "m4",
    path: "sales",
    question: "What tools do you use for sales and marketing?",
    options: [
      {
        label: "Spreadsheets & email",
        value: "spreadsheets",
        weights: { "lead-scoring": 0, "email-sequences": 4, "pipeline-optimizer": 0, "content-engine": 4, "social-engage": 3 },
      },
      {
        label: "Basic email tool (Mailchimp, etc.)",
        value: "basic-email",
        weights: { "lead-scoring": 2, "email-sequences": 3, "pipeline-optimizer": 1, "content-engine": 3, "social-engage": 3 },
      },
      {
        label: "CRM (HubSpot, Salesforce, etc.)",
        value: "crm",
        weights: { "lead-scoring": 4, "email-sequences": 2, "pipeline-optimizer": 4, "content-engine": 1, "social-engage": 1 },
      },
      {
        label: "Already using some automation",
        value: "sales-automated",
        weights: { "lead-scoring": 2, "email-sequences": 0, "pipeline-optimizer": 5, "content-engine": 2, "social-engage": 0 },
      },
    ],
  },
  {
    id: "m5",
    path: "sales",
    question: "What's your biggest sales & marketing challenge?",
    options: [
      {
        label: "Not enough leads coming in",
        value: "volume",
        weights: { "lead-scoring": 0, "email-sequences": 0, "pipeline-optimizer": 0, "content-engine": 5, "social-engage": 5 },
      },
      {
        label: "Leads don't convert to customers",
        value: "conversion",
        weights: { "lead-scoring": 5, "email-sequences": 5, "pipeline-optimizer": 3, "content-engine": 0, "social-engage": 0 },
      },
      {
        label: "Follow-ups fall through the cracks",
        value: "followup",
        weights: { "lead-scoring": 2, "email-sequences": 5, "pipeline-optimizer": 5, "content-engine": 0, "social-engage": 0 },
      },
      {
        label: "Creating content takes too long",
        value: "content",
        weights: { "lead-scoring": 0, "email-sequences": 0, "pipeline-optimizer": 0, "content-engine": 5, "social-engage": 4 },
      },
    ],
  },
  {
    id: "m6",
    path: "sales",
    question: "What would you most want to automate first?",
    options: [
      {
        label: "Scoring & qualifying leads",
        value: "scoring-leads",
        weights: { "lead-scoring": 8, "email-sequences": 1, "pipeline-optimizer": 1, "content-engine": 0, "social-engage": 0 },
      },
      {
        label: "Email follow-up sequences",
        value: "email-followups",
        weights: { "lead-scoring": 1, "email-sequences": 8, "pipeline-optimizer": 1, "content-engine": 0, "social-engage": 0 },
      },
      {
        label: "Tracking deals & pipeline",
        value: "pipeline-tracking",
        weights: { "lead-scoring": 1, "email-sequences": 0, "pipeline-optimizer": 8, "content-engine": 0, "social-engage": 0 },
      },
      {
        label: "Creating marketing content",
        value: "content-creation",
        weights: { "lead-scoring": 0, "email-sequences": 0, "pipeline-optimizer": 0, "content-engine": 8, "social-engage": 2 },
      },
      {
        label: "Social media management",
        value: "social-media",
        weights: { "lead-scoring": 0, "email-sequences": 0, "pipeline-optimizer": 0, "content-engine": 2, "social-engage": 8 },
      },
    ],
  },
];

// --- SUGGESTIONS ---

export const suggestions: Suggestion[] = [
  // Support
  {
    id: "ai-chatbot",
    path: "support",
    title: "AI Chatbot for Tier-1 Support",
    description: "An intelligent chatbot that handles common questions instantly, escalating complex issues to your team.",
    icon: "MessageSquareText",
    baseTimeSavedHours: 40,
    baseCostSavedPercent: 30,
    difficulty: "Easy",
    quickStart: "Sign up for Botpress or Tidio free tier, upload your FAQ doc \u2014 working chatbot in under 2 hours",
    tools: [
      { name: "Botpress", note: "free, 500 msgs/mo" },
      { name: "Voiceflow", note: "free, 100 credits" },
      { name: "Tidio", note: "free, 50 convos/mo" },
    ],
    learnHowUrl: "https://botpress.com/docs",
    learnHowLabel: "Botpress Getting Started Guide",
  },
  {
    id: "smart-routing",
    path: "support",
    title: "Smart Ticket Routing & Prioritization",
    description: "AI that reads incoming tickets, categorizes urgency, and routes to the right agent automatically.",
    icon: "Route",
    baseTimeSavedHours: 20,
    baseCostSavedPercent: 20,
    difficulty: "Medium",
    quickStart: "Set up Freshdesk free tier (10 agents) and configure basic dispatch rules for ticket categories",
    tools: [
      { name: "Freshdesk", note: "free, 10 agents" },
      { name: "Zendesk", note: "$19/agent/mo" },
      { name: "eesel AI", note: "addon" },
    ],
    learnHowUrl: "https://www.eesel.ai/blog/zendesk-ticket-routing",
    learnHowLabel: "Zendesk Ticket Routing Guide",
  },
  {
    id: "kb-generator",
    path: "support",
    title: "Knowledge Base Auto-Generator",
    description: "Automatically creates and updates help articles from your resolved tickets and team conversations.",
    icon: "BookOpen",
    baseTimeSavedHours: 25,
    baseCostSavedPercent: 15,
    difficulty: "Medium",
    quickStart: "Use Notion AI ($8/user/mo) to draft help articles from your most common support replies",
    tools: [
      { name: "Notion AI", note: "$8/user/mo" },
      { name: "Document360", note: "trial" },
      { name: "GitBook", note: "free" },
    ],
    learnHowUrl: "https://www.notion.so/help/guides/using-notion-ai",
    learnHowLabel: "Notion AI Knowledge Hub Guide",
  },
  {
    id: "sentiment",
    path: "support",
    title: "Customer Sentiment Analysis",
    description: "Real-time analysis of customer emotions across all channels to flag at-risk accounts before they churn.",
    icon: "HeartPulse",
    baseTimeSavedHours: 15,
    baseCostSavedPercent: 25,
    difficulty: "Medium",
    quickStart: "Sign up for MonkeyLearn (300 free queries/mo), connect to your support inbox, set up positive/negative classification",
    tools: [
      { name: "MonkeyLearn", note: "free, 300 queries/mo" },
      { name: "OpenAI API", note: "pay-per-use" },
      { name: "HuggingFace", note: "free, self-hosted" },
    ],
    learnHowUrl: "https://monkeylearn.com/sentiment-analysis/",
    learnHowLabel: "Complete Sentiment Analysis Guide",
  },
  {
    id: "auto-followup",
    path: "support",
    title: "Automated Follow-Up System",
    description: "AI-driven follow-ups that check in with customers after resolution to ensure satisfaction.",
    icon: "MailCheck",
    baseTimeSavedHours: 20,
    baseCostSavedPercent: 18,
    difficulty: "Easy",
    quickStart: "Create a Zapier free account, use their 'new form submission \u2192 send email after delay' template \u2014 live in 30 minutes",
    tools: [
      { name: "Zapier", note: "free, 100 tasks/mo" },
      { name: "Make.com", note: "free, 1000 credits/mo" },
      { name: "HubSpot CRM", note: "free" },
    ],
    learnHowUrl: "https://zapier.com/apps/email/integrations",
    learnHowLabel: "Zapier Email Automation Templates",
  },
  // Sales
  {
    id: "lead-scoring",
    path: "sales",
    title: "AI Lead Scoring & Qualification",
    description: "Automatically scores and ranks leads based on behavior, demographics, and engagement signals.",
    icon: "Target",
    baseTimeSavedHours: 30,
    baseCostSavedPercent: 25,
    difficulty: "Medium",
    quickStart: "Set up HubSpot free CRM, create a manual lead score property based on 3\u20135 engagement signals",
    tools: [
      { name: "HubSpot CRM", note: "free" },
      { name: "Pipedrive", note: "14-day trial" },
      { name: "Clay.com", note: "limited free" },
    ],
    learnHowUrl: "https://knowledge.hubspot.com/scoring/set-up-score-properties",
    learnHowLabel: "HubSpot Lead Scoring Guide",
  },
  {
    id: "email-sequences",
    path: "sales",
    title: "Automated Email Sequences",
    description: "Personalized drip campaigns that nurture leads with the right message at the right time.",
    icon: "Send",
    baseTimeSavedHours: 35,
    baseCostSavedPercent: 22,
    difficulty: "Easy",
    quickStart: "Sign up for Lemlist trial, use their AI Sequence Generator \u2014 full personalized outreach from just your company name and website",
    tools: [
      { name: "Lemlist", note: "14-day trial" },
      { name: "Instantly", note: "starter free" },
      { name: "Mailchimp", note: "free, 500 contacts" },
    ],
    learnHowUrl: "https://www.lemlist.com/blog/email-sequence",
    learnHowLabel: "Lemlist AI Sequence Guide",
  },
  {
    id: "pipeline-optimizer",
    path: "sales",
    title: "Sales Pipeline Optimizer",
    description: "AI that identifies bottlenecks in your pipeline and suggests actions to accelerate deals.",
    icon: "TrendingUp",
    baseTimeSavedHours: 20,
    baseCostSavedPercent: 28,
    difficulty: "Hard",
    quickStart: "Set up HubSpot free CRM with a basic pipeline, track deal stages and identify where deals stall",
    tools: [
      { name: "HubSpot CRM", note: "free" },
      { name: "Pipedrive", note: "$15/seat/mo" },
      { name: "Gong", note: "enterprise" },
    ],
    learnHowUrl: "https://www.hubspot.com/products/crm/deal-pipeline",
    learnHowLabel: "AI Sales Pipeline Guide",
  },
  {
    id: "content-engine",
    path: "sales",
    title: "Content Generation Engine",
    description: "AI-powered creation of blog posts, social captions, ad copy, and email content tailored to your brand.",
    icon: "PenTool",
    baseTimeSavedHours: 45,
    baseCostSavedPercent: 35,
    difficulty: "Easy",
    quickStart: "Open ChatGPT, paste your brand voice guidelines + a topic list \u2014 generate a week of content drafts in 30 minutes",
    tools: [
      { name: "ChatGPT", note: "free" },
      { name: "Claude.ai", note: "free" },
      { name: "Copy.ai", note: "free limited" },
    ],
    learnHowUrl: "https://zapier.com/blog/how-to-automate-chatgpt/",
    learnHowLabel: "Automate ChatGPT Guide",
  },
  {
    id: "social-engage",
    path: "sales",
    title: "Social Media Auto-Engagement",
    description: "Monitors mentions and comments across platforms, drafting timely responses in your brand voice.",
    icon: "Share2",
    baseTimeSavedHours: 25,
    baseCostSavedPercent: 20,
    difficulty: "Easy-Medium",
    quickStart: "Set up Buffer free tier (3 channels), use AI assistant to draft and schedule a week of posts",
    tools: [
      { name: "Buffer", note: "free, 3 channels" },
      { name: "ManyChat", note: "free, 1000 contacts" },
      { name: "Later", note: "free limited" },
    ],
    learnHowUrl: "https://buffer.com/resources/social-media-automation/",
    learnHowLabel: "Social Media Automation Guide",
  },
];

export function getQuestionsForPath(path: Path): Question[] {
  if (path === "both") return [...supportQuestions, ...salesQuestions];
  if (path === "support") return supportQuestions;
  return salesQuestions;
}

export { supportQuestions, salesQuestions };
