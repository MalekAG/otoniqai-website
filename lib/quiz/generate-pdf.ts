import { type ScoredSuggestion, type ReadinessTier } from "./suggestion-engine";

const BRAND = {
  primary: "#0D5E6B",
  accent: "#D4A574",
  bg: "#FAF8F5",
  fg: "#1A1A1A",
  muted: "#5C5C5C",
  white: "#FFFFFF",
} as const;

const BOOKING_URL = "https://calendly.com/otoniqai/discovery";

export async function generatePlaybookPdf(
  userName: string,
  readiness: ReadinessTier | null,
  suggestions: ScoredSuggestion[],
): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const firstName = userName.split(" ")[0];
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // --- Header ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(BRAND.primary);
  doc.text("OtoniqAI", margin, y);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(BRAND.muted);
  doc.text(today, pageWidth - margin, y, { align: "right" });

  y += 10;
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(BRAND.fg);
  doc.text("Your AI Automation Playbook", margin, y);

  y += 8;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(BRAND.muted);
  doc.text(`Personalized for ${firstName}`, margin, y);

  y += 6;
  doc.setDrawColor(BRAND.primary);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // --- Readiness Tier ---
  if (readiness) {
    const boxHeight = 20;
    doc.setFillColor(245, 243, 240);
    doc.setDrawColor(BRAND.primary);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(BRAND.primary);
    doc.text(`AI Readiness: ${readiness.label}`, margin + 6, y + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(BRAND.muted);
    doc.text(readiness.message, margin + 6, y + 15);

    y += boxHeight + 10;
  }

  // --- Suggestions ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(BRAND.fg);
  doc.text("Your Top 3 AI Opportunities", margin, y);
  y += 8;

  for (let i = 0; i < suggestions.length; i++) {
    const s = suggestions[i];

    // Check if we need a new page (rough estimate: each suggestion ~70mm)
    if (y > 220) {
      doc.addPage();
      y = margin;
    }

    // Suggestion title + difficulty
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(BRAND.primary);
    doc.text(`${i + 1}. ${s.title}`, margin, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(BRAND.muted);
    const titleWidth = doc.getTextWidth(`${i + 1}. ${s.title}  `);
    doc.text(`[${s.difficulty}]`, margin + titleWidth, y);
    y += 6;

    // Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(BRAND.fg);
    const descLines = doc.splitTextToSize(s.description, contentWidth);
    doc.text(descLines, margin, y);
    y += descLines.length * 5 + 3;

    // Metrics
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(BRAND.primary);
    doc.text(
      `~${s.timeSavedHours} hrs/mo saved  |  ${s.costSavedPercent}% cost reduction`,
      margin,
      y,
    );
    y += 6;

    // Quick Start
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(BRAND.fg);
    doc.text("Quick Start: ", margin, y);
    const qsLabelWidth = doc.getTextWidth("Quick Start: ");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(BRAND.muted);
    const qsLines = doc.splitTextToSize(s.quickStart, contentWidth - qsLabelWidth);
    doc.text(qsLines[0], margin + qsLabelWidth, y);
    if (qsLines.length > 1) {
      const remainingLines = qsLines.slice(1);
      doc.text(remainingLines, margin, y + 4);
      y += remainingLines.length * 4;
    }
    y += 6;

    // Tools table
    if (s.tools.length > 0) {
      autoTable(doc, {
        startY: y,
        margin: { left: margin, right: margin },
        head: [["Tool", "Note"]],
        body: s.tools.map((t) => [t.name, t.note]),
        theme: "grid",
        styles: {
          fontSize: 8,
          cellPadding: 2,
          textColor: BRAND.fg,
          lineColor: "#E0E0E0",
          lineWidth: 0.2,
        },
        headStyles: {
          fillColor: BRAND.primary,
          textColor: BRAND.white,
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: 45, fontStyle: "bold" },
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      y = (doc as any).lastAutoTable.finalY + 3;
    }

    // Learn More link
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(BRAND.primary);
    doc.textWithLink(s.learnHowLabel, margin, y, { url: s.learnHowUrl });
    y += 10;
  }

  // --- 30-Day Quick-Start Plan ---
  if (y > 210) {
    doc.addPage();
    y = margin;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(BRAND.fg);
  doc.text("30-Day Quick-Start Plan", margin, y);
  y += 8;

  const planBody: string[][] = suggestions.map((s, i) => {
    const toolName = s.tools[0]?.name ?? s.title;
    const excerpt = s.quickStart.length > 80 ? s.quickStart.slice(0, 77) + "..." : s.quickStart;
    return [`Week ${i + 1}`, `Set up ${toolName}`, excerpt];
  });
  planBody.push(["Week 4", "Review & optimize", "Measure results from weeks 1-3, adjust configurations, and identify next opportunities."]);

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [["Week", "Focus", "Action"]],
    body: planBody,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: 3,
      textColor: BRAND.fg,
      lineColor: "#E0E0E0",
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: BRAND.primary,
      textColor: BRAND.white,
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 22, fontStyle: "bold" },
      1: { cellWidth: 40 },
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable.finalY + 15;

  // --- Footer ---
  if (y > 250) {
    doc.addPage();
    y = margin;
  }

  doc.setDrawColor(BRAND.primary);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(BRAND.fg);
  doc.text("Want help putting this into action?", margin, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(BRAND.muted);
  doc.text("Book a free 20-minute results review:", margin, y);

  const linkX = margin + doc.getTextWidth("Book a free 20-minute results review: ");
  doc.setTextColor(BRAND.primary);
  doc.textWithLink("Schedule here", linkX, y, { url: BOOKING_URL });
  y += 10;

  doc.setFontSize(8);
  doc.setTextColor(BRAND.muted);
  doc.text("Generated by OtoniqAI", pageWidth / 2, y, { align: "center" });

  // Save
  const safeFirstName = firstName.replace(/[^a-zA-Z0-9]/g, "");
  doc.save(`OtoniqAI-Playbook-${safeFirstName}.pdf`);
}
