# This writes the Monday note

This folder is not the note, and it does not go on phillipian.net.

On Monday, someone saves last week’s counts as a spreadsheet and runs `monday-note.mjs` on a computer. The program prints three lines for each section: what people opened most, what they stayed with, and which story the most readers opened and then left before halfway. A person checks the lines against the sheet and sends them. Nothing here sends the email.

`sample-week.csv` is fake practice data. Every title says SAMPLE. The real sheet uses the same columns: `section`, `title`, `slot`, `opens`, and `halfway`.

From the repo folder:

```
node make-the-monday-note/monday-note.mjs make-the-monday-note/sample-week.csv
```

A blank cell stays blank. The line says `no count this week`. Do not guess a number.
