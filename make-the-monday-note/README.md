# This writes the Monday note

This folder is not the note, and it does not go on phillipian.net.

On Monday, someone saves last week’s counts as a spreadsheet and runs `monday-note.mjs` on a computer. The program prints three lines for each section: what people opened most, what they stayed with, and which story the most readers opened and then left before halfway. A second sheet adds Latest Paper: the total since the count started, about how many a day, this week’s opens, and visitors. A person checks the lines against the sheets and sends them. Nothing here sends the email.

`sample-week.csv` is fake practice data. Every title says SAMPLE. The real sheet uses the same columns: `section`, `title`, `slot`, `opens`, and `halfway`.

`sample-latest-paper.csv` is fake practice data too. The numbers are made up. The columns are `started`, `total`, `days`, `this_week`, and `visitors`. The daily average is total divided by days. The program writes that average. It is not a column in the sheet.

From the repo folder:

```
node make-the-monday-note/monday-note.mjs make-the-monday-note/sample-week.csv make-the-monday-note/sample-latest-paper.csv
```

Leave the second file off and the program prints only the section notes. A blank cell stays blank. The line says `no count this week`. Do not guess a number.
