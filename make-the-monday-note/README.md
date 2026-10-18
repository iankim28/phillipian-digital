# This writes the Monday note

This folder is not the note, and it does not go on phillipian.net.

On Monday, someone saves last week’s counts as a spreadsheet and runs `monday-note.mjs` on a computer. The program prints five lines for each section: what people opened, what they stayed with, what they opened and left, which spot on the front drew more clicks, and one line to remember. A person checks the lines against the sheet and sends them. Nothing here sends the email.

`sample-week.csv` is fake practice data. Every title says SAMPLE. The real sheet uses the same columns: `section`, `title`, `slot`, `opens`, and `halfway`.

From the repo folder:

```
node make-the-monday-note/monday-note.mjs make-the-monday-note/sample-week.csv
```

A blank cell stays blank. The line says `no count this week`. Do not guess a number.
