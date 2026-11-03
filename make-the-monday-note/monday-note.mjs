import { readFileSync } from "node:fs";

const NO_COUNT = "no count this week";

const file = process.argv[2];
const latestFile = process.argv[3];
if (!file) {
  console.error("Usage: node monday-note.mjs <sheet.csv> [latest-paper.csv]");
  process.exit(1);
}

let text;
try {
  text = readFileSync(file, "utf8");
} catch (err) {
  console.error(`Could not read ${file}: ${err.message}`);
  process.exit(1);
}

const table = parseCsv(text);
if (!table.length) {
  console.error("The sheet is empty.");
  process.exit(1);
}

const header = table[0].map((cell) => cell.trim());
const columns = Object.fromEntries(header.map((name, index) => [name, index]));
for (const name of ["section", "title", "slot", "opens", "halfway"]) {
  if (columns[name] === undefined) {
    console.error(`Missing column: ${name}`);
    process.exit(1);
  }
}

const groups = new Map();
for (const cells of table.slice(1)) {
  if (cells.every((cell) => cell.trim() === "")) continue;
  const section = cell(cells, "section");
  const title = cell(cells, "title");
  if (!section || !title) continue;
  const row = {
    section,
    title,
    slot: cell(cells, "slot"),
    opens: parseCount(cell(cells, "opens")),
    halfway: parseCount(cell(cells, "halfway")),
  };
  if (!groups.has(section)) groups.set(section, []);
  groups.get(section).push(row);
}

const notes = [];
for (const [section, rows] of groups) {
  notes.push(writeNote(section, rows));
}

const latestBlock = latestFile ? writeLatestPaper(latestFile) : "";
let output = notes.join("\n\n");
if (latestBlock) {
  output += (output ? "\n\n" : "") + latestBlock;
}
process.stdout.write(output + (output ? "\n" : ""));

function writeNote(section, rows) {
  const mostOpened = pickUnique(
    rows.filter((row) => row.opens !== null),
    (a, b) => a.opens - b.opens,
  );
  const finishRows = rows.filter(
    (row) => row.opens !== null && row.opens > 0 && row.halfway !== null,
  );
  const mostFinished = pickUnique(finishRows, shareCmp);
  const mostLeft = pickMostLeft(finishRows);

  const lines = [
    `To ${section} · Monday`,
    mostOpened
      ? `1. Most opened: ${mostOpened.title}, from the ${mostOpened.slot} slot.`
      : `1. Most opened: ${NO_COUNT}`,
    mostFinished
      ? `2. Most finished: ${mostFinished.title}. ${mostFinished.halfway} of ${mostFinished.opens} reached halfway.`
      : `2. Most finished: ${NO_COUNT}`,
    mostLeft
      ? `3. Most opened and left: ${mostLeft.title}. ${left(mostLeft)} of ${mostLeft.opens} left before halfway.`
      : `3. Most opened and left: ${NO_COUNT}`,
  ];
  return lines.join("\n");
}

function pickMostLeft(finishRows) {
  const best = pickUnique(
    finishRows.filter((row) => row.halfway <= row.opens),
    (a, b) => left(a) - left(b),
  );
  return best && left(best) > 0 ? best : null;
}

function left(row) {
  return row.opens - row.halfway;
}

function pickUnique(rows, compare) {
  if (!rows.length) return null;
  let best = rows[0];
  let tied = false;
  for (let i = 1; i < rows.length; i++) {
    const diff = compare(rows[i], best);
    if (diff > 0) {
      best = rows[i];
      tied = false;
    } else if (diff === 0) {
      tied = true;
    }
  }
  return tied ? null : best;
}

function shareCmp(a, b) {
  const left = a.halfway * b.opens;
  const right = b.halfway * a.opens;
  if (left > right) return 1;
  if (left < right) return -1;
  return 0;
}

function cell(cells, name) {
  const value = cells[columns[name]];
  return value === undefined ? "" : value.trim();
}

function writeLatestPaper(filePath) {
  let text;
  try {
    text = readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(`Could not read ${filePath}: ${err.message}`);
    process.exit(1);
  }

  const table = parseCsv(text);
  if (!table.length) {
    console.error("The sheet is empty.");
    process.exit(1);
  }

  const header = table[0].map((name) => name.trim());
  const cols = Object.fromEntries(header.map((name, index) => [name, index]));
  for (const name of ["started", "total", "days", "this_week", "visitors"]) {
    if (cols[name] === undefined) {
      console.error(`Missing column: ${name}`);
      process.exit(1);
    }
  }

  const data = table.slice(1).find((cells) => cells.some((value) => value.trim() !== ""));
  const started = data ? valueAt(data, cols, "started") : "";
  const total = data ? valueAt(data, cols, "total") : "";
  const days = data ? valueAt(data, cols, "days") : "";
  const thisWeek = data ? valueAt(data, cols, "this_week") : "";
  const visitors = data ? valueAt(data, cols, "visitors") : "";

  return [
    "Latest Paper",
    sinceLine(started, total, days),
    weekLine(thisWeek),
    visitorsLine(visitors),
  ].join("\n");
}

function sinceLine(started, total, days) {
  const date = parseDate(started);
  const opens = parseCount(total);
  const dayCount = parseCount(days);
  if (!date || opens === null || dayCount === null || dayCount <= 0) {
    return `1. Since the start: ${NO_COUNT}`;
  }
  const average = Math.round(opens / dayCount);
  return `1. Since ${date}: ${opens} opens, about ${average} a day.`;
}

function weekLine(value) {
  const count = parseCount(value);
  return count === null ? `2. This week: ${NO_COUNT}` : `2. This week: ${count} opens.`;
}

function visitorsLine(value) {
  const count = parseCount(value);
  return count === null ? `3. Visitors: ${NO_COUNT}` : `3. Visitors: ${count}.`;
}

function valueAt(cells, cols, name) {
  const value = cells[cols[name]];
  return value === undefined ? "" : value.trim();
}

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parts = value.split("-").map(Number);
  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  if (
    date.getUTCFullYear() !== parts[0] ||
    date.getUTCMonth() !== parts[1] - 1 ||
    date.getUTCDate() !== parts[2]
  ) {
    return null;
  }
  return value;
}

function parseCount(value) {
  if (value === "") return null;
  if (!/^\d+$/.test(value)) return null;
  return Number(value);
}

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}
