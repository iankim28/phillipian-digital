import { readFileSync } from "node:fs";

const NO_COUNT = "no count this week";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node monday-note.mjs <sheet.csv>");
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
process.stdout.write(notes.join("\n\n") + (notes.length ? "\n" : ""));

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
