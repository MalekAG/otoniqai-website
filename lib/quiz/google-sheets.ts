import { google } from "googleapis";

function getAuth() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!key) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not set");

  const credentials = JSON.parse(Buffer.from(key, "base64").toString());

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheetId() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID not set");
  return sheetId;
}

export async function appendLead(row: string[]) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: getSheetId(),
    range: "Leads!A:Z",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

// Column layout:
// A: timestamp, B: name, C: email, D: company, E: path,
// F: answers, G: topSuggestions, H: readinessTier,
// I: email1_sent, J: email2_sent, K: email3_sent

export type LeadRow = {
  rowIndex: number; // 1-based sheet row number
  timestamp: string;
  name: string;
  email: string;
  company: string;
  path: string;
  topSuggestions: string[];
  readinessTier: string;
  email1Sent: string;
  email2Sent: string;
  email3Sent: string;
};

export async function getLeadsForFollowUp(): Promise<LeadRow[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSheetId(),
    range: "Leads!A:K",
  });

  const rows = res.data.values;
  if (!rows || rows.length < 2) return []; // no data rows (first row is header)

  return rows.slice(1).map((row, i) => ({
    rowIndex: i + 2, // +2 because slice(1) skips header, sheets are 1-indexed
    timestamp: row[0] || "",
    name: row[1] || "",
    email: row[2] || "",
    company: row[3] || "",
    path: row[4] || "",
    topSuggestions: (row[6] || "").split(", ").filter(Boolean),
    readinessTier: row[7] || "",
    email1Sent: row[8] || "",
    email2Sent: row[9] || "",
    email3Sent: row[10] || "",
  }));
}

export async function markEmailSent(rowIndex: number, emailNumber: 1 | 2 | 3) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // email1 = col I, email2 = col J, email3 = col K
  const col = String.fromCharCode("I".charCodeAt(0) + emailNumber - 1);

  await sheets.spreadsheets.values.update({
    spreadsheetId: getSheetId(),
    range: `Leads!${col}${rowIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[new Date().toISOString()]] },
  });
}
