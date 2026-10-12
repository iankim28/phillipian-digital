# The Monday note

The Monday note is five lines about last week, one set for each section. It says which story people opened, which story they stayed with, which story they opened and left, and which slot on the front drew more clicks. It does not tell a section what to cover next. Section editors read the note and decide that themselves.

The counts come from a sheet. A blank cell stays blank. This folder can write the five lines from that sheet. It cannot send the note.

## Run the note

From this folder, with last week’s sheet saved as a CSV:

```
node monday-note.mjs sample-week.csv
```

`sample-week.csv` is made-up practice data. Every title in it says SAMPLE. Swap in the real sheet when you have one. The columns are `section`, `title`, `slot`, `opens`, and `halfway`.

You get one note per section. If a line cannot be filled from the counts, it says `no count this week`. Do not fill that in by hand with a guess.

Check the five lines against the sheet before anyone sends them.

## The two setup files

`setup/halfway.js` and `setup/slot-clicks.js` are notes for the webmaster, not something digital installs.

- `halfway.js` fires once when a reader scrolls past the middle of an article. The event is named `halfway`. It includes the page path and nothing else.
- `slot-clicks.js` fires when someone clicks a homepage link that has a slot name (`lead`, `top`, `news`, `sports`, `commentary`, or `arts`). The event is named `slot_click`. It includes the slot and the link path. It does not record who clicked.

In this folder both files only print to the browser console. They do not call Plausible, GA4, or any other address.

## Try the demo

Open these two files in a browser. The links are relative (`article.html`, `../setup/halfway.js`), so they work on any computer and on GitHub. They do not point at a folder on one laptop.

- `demo/article.html` — scroll until the bar at the top changes color and names the halfway event. Scroll back above the mark and the bar clears.
- `demo/home.html` — click a SAMPLE story. The line names the slot in plain language: the lead slot, the top stories block, or a section block. The stored value is still the short name (`lead`, `top`, `news`, `sports`, `commentary`, `arts`). Then use “Open the sample story.”

If you open the files straight from your computer, the browser also knows the disk path. These demos do not record that. On phillipian.net the same snippets would record the story’s web address, such as `/2026/10/12/story/`.

## What this folder is not

Nothing here is installed on phillipian.net. The live site is unchanged. Sending the note is still a person, on Monday, after they check the lines against the sheet.
