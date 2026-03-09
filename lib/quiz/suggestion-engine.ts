import { type Path, type QuestionOption, type Tool, suggestions } from "./quiz-data";

export type ScoredSuggestion = {
  id: string;
  path: "support" | "sales";
  title: string;
  description: string;
  icon: string;
  score: number;
  timeSavedHours: number;
  costSavedPercent: number;
  roiMultiplier: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Easy-Medium";
  quickStart: string;
  tools: Tool[];
  learnHowUrl: string;
  learnHowLabel: string;
  reason: string;
};

export type ReadinessTier = {
  label: "Manual Mode" | "Partially Automated" | "Optimization Ready";
  message: string;
};

export type QuizResults = {
  suggestions: ScoredSuggestion[];
  readiness: ReadinessTier;
};

// Volume multipliers based on inquiry/lead count answers
const volumeMultipliers: Record<string, number> = {
  "under-100": 0.6, "100-500": 1.0, "500-2000": 1.4, "2000+": 1.8,
  "under-50": 0.6, "50-200": 1.0, "200-1000": 1.4, "1000+": 1.8,
};

// Team size multipliers (s2, m3)
const teamMultipliers: Record<string, number> = {
  solo: 0.7, "2-5": 1.0, "6-15": 1.3, "16+": 1.6,
};

// Tool maturity scores for readiness tier calculation
const maturityScores: Record<string, number> = {
  spreadsheets: 0,
  "shared-inbox": 1,
  helpdesk: 2,
  automated: 3,
  "basic-email": 1,
  crm: 2,
  "sales-automated": 3,
};

type AnswerMap = Record<string, QuestionOption | QuestionOption[]>;

function getAnswer(answers: AnswerMap, id: string): QuestionOption | undefined {
  const a = answers[id];
  return a && !Array.isArray(a) ? a : undefined;
}

function getAnswerLabels(answers: AnswerMap, id: string): string[] {
  const a = answers[id];
  if (Array.isArray(a)) return a.map((o) => o.label);
  if (a) return [a.label];
  return [];
}

function formatList(items: string[]): string {
  if (items.length === 0) return "";
  const lower = items.map((s) => s.toLowerCase());
  if (lower.length === 1) return lower[0];
  if (lower.length === 2) return `${lower[0]} and ${lower[1]}`;
  return `${lower.slice(0, -1).join(", ")}, and ${lower[lower.length - 1]}`;
}

function computeReadiness(answers: AnswerMap): ReadinessTier {
  const scores: number[] = [];
  const s4 = getAnswer(answers, "s4");
  const m4 = getAnswer(answers, "m4");
  if (s4) scores.push(maturityScores[s4.value] ?? 1);
  if (m4) scores.push(maturityScores[m4.value] ?? 1);

  if (scores.length === 0) {
    return {
      label: "Partially Automated",
      message: "You've got some processes, but key gaps are costing you time and money",
    };
  }

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

  if (avg <= 0.5) {
    return {
      label: "Manual Mode",
      message: "You're doing most things by hand \u2014 there's a massive automation opportunity here",
    };
  }
  if (avg <= 1.5) {
    return {
      label: "Partially Automated",
      message: "You've got some processes, but key gaps are costing you time and money",
    };
  }
  return {
    label: "Optimization Ready",
    message: "You're ahead of most \u2014 these refinements will compound your advantage",
  };
}

function generateReason(suggestionId: string, answers: AnswerMap): string {
  const sVol = getAnswer(answers, "s1")?.label?.toLowerCase();
  const sChannels = formatList(getAnswerLabels(answers, "s3"));
  const sChallenge = getAnswer(answers, "s5")?.label?.toLowerCase();
  const sTeam = getAnswer(answers, "s2")?.label?.toLowerCase();

  const mVol = getAnswer(answers, "m1")?.label?.toLowerCase();
  const mSources = formatList(getAnswerLabels(answers, "m2"));
  const mChallenge = getAnswer(answers, "m5")?.label?.toLowerCase();
  const mTeam = getAnswer(answers, "m3")?.label?.toLowerCase();

  switch (suggestionId) {
    case "ai-chatbot":
      return `Based on your ${sVol} monthly inquiries${sChannels ? ` across ${sChannels}` : ""}${sChallenge?.includes("repetitive") ? " with repetitive questions as your top challenge" : ""}, an AI chatbot could handle the bulk of Tier-1 support automatically.`;

    case "smart-routing":
      return `With ${sVol} inquiries monthly and a team of ${sTeam}, intelligent ticket routing eliminates manual triage and gets urgent issues to the right person instantly.`;

    case "kb-generator":
      return `Your team handles ${sVol} inquiries monthly \u2014 a self-updating knowledge base turns resolved tickets into help articles that prevent future tickets.`;

    case "sentiment":
      return `Across ${sVol} monthly interactions${sChallenge?.includes("churn") ? " with customer churn as a concern" : ""}, real-time sentiment analysis flags at-risk conversations before they escalate.`;

    case "auto-followup":
      return `With ${sVol} monthly inquiries${sChannels ? ` across ${sChannels}` : ""}, automated follow-ups ensure no customer slips through the cracks after resolution.`;

    case "lead-scoring":
      return `With ${mVol} leads monthly${mSources ? ` from ${mSources}` : ""}, AI scoring automatically prioritizes which leads deserve your team's attention first.`;

    case "email-sequences":
      return `Based on your ${mVol} monthly leads${mChallenge?.includes("follow") ? " and follow-up challenges" : ""}, automated sequences nurture every lead with the right message at the right time.`;

    case "pipeline-optimizer":
      return `With a team of ${mTeam} managing ${mVol} leads${mChallenge?.includes("convert") ? " and conversion as your top challenge" : ""}, pipeline AI identifies exactly where deals stall.`;

    case "content-engine":
      return `Your team generates leads from ${mSources || "multiple channels"} \u2014 an AI content engine can produce a week of tailored content in the time it takes to write one post.`;

    case "social-engage":
      return `With leads coming from ${mSources || "various channels"}, AI-powered social engagement keeps your brand active across every platform without the manual effort.`;

    default:
      return "";
  }
}

export function calculateSuggestions(
  path: Path,
  answers: AnswerMap
): QuizResults {
  // Sum weights from all answers, handling multi-select
  const scores: Record<string, number> = {};
  for (const answer of Object.values(answers)) {
    const options = Array.isArray(answer) ? answer : [answer];
    for (const option of options) {
      for (const [suggestionId, weight] of Object.entries(option.weights)) {
        scores[suggestionId] = (scores[suggestionId] || 0) + weight;
      }
    }
  }

  // Filter suggestions by path
  const relevantSuggestions =
    path === "both"
      ? suggestions
      : suggestions.filter((s) => s.path === path);

  // Determine multipliers from volume and team answers
  const volumeAnswer = getAnswer(answers, "s1")?.value || getAnswer(answers, "m1")?.value;
  const teamAnswer = getAnswer(answers, "s2")?.value || getAnswer(answers, "m3")?.value;
  const volMul = volumeMultipliers[volumeAnswer ?? ""] ?? 1.0;
  const teamMul = teamMultipliers[teamAnswer ?? ""] ?? 1.0;
  const combinedMul = (volMul + teamMul) / 2;

  // Score, rank, and take top 3
  const scored = relevantSuggestions
    .map((s) => {
      const score = scores[s.id] || 0;
      const timeSaved = Math.round(s.baseTimeSavedHours * combinedMul);
      const costSaved = Math.min(
        Math.round(s.baseCostSavedPercent * combinedMul),
        60
      );
      return {
        id: s.id,
        path: s.path,
        title: s.title,
        description: s.description,
        icon: s.icon,
        score,
        timeSavedHours: timeSaved,
        costSavedPercent: costSaved,
        roiMultiplier: Math.round(combinedMul * 10) / 10,
        difficulty: s.difficulty,
        quickStart: s.quickStart,
        tools: s.tools,
        learnHowUrl: s.learnHowUrl,
        learnHowLabel: s.learnHowLabel,
        reason: generateReason(s.id, answers),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const readiness = computeReadiness(answers);

  return { suggestions: scored, readiness };
}
