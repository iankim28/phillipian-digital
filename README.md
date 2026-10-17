# The Monday note

The Monday note is five lines about last week, one set for each section. It says which story people opened, which story they stayed with, which story they opened and left, and which slot on the front drew more clicks. It does not tell a section what to cover next. Section editors read the note and decide that themselves.

Nothing in this repo is installed on phillipian.net yet. The live site is unchanged until a webmaster follows the steps below.

## What is in this repo

**[website/](website/)** — the two scripts that go on phillipian.net. `halfway.js` records a scroll past the middle of an article. `slot-clicks.js` records which slot on the front was clicked. Opens are Plausible’s normal pageview. These files do not count opens, and they do not record who clicked.

**[note/](note/)** — the script that writes the five lines from a spreadsheet. It runs on a computer. It does not go on the website, and it does not send the note.

**[archive/](archive/)** — a demo with made-up SAMPLE stories. Click and scroll it. Do not upload it.

The HTML pages at the root are the explainer. Open them on [GitHub Pages](https://iankim28.github.io/phillipian-digital/).

## How the webmaster puts the scripts on phillipian.net

Do this once. Digital does not edit the theme after that.

1. Add the Plausible snippet for `phillipian.net` in the theme header, before `</head>`. A pageview is the open.

```html
<script defer data-domain="phillipian.net" src="https://plausible.io/js/script.js"></script>
```

2. In Plausible, add two custom-event goals named `halfway` and `slot_click`. The property names are `path` and `slot`. The names have to match exactly, including capitalization.

3. Upload [website/halfway.js](website/halfway.js) and [website/slot-clicks.js](website/slot-clicks.js) into `wp-content/themes/phillipian2019/js/`.

4. In the theme footer, before `</body>`, load those two files from the theme. The Plausible tag is already in the header, so it loads first.

```html
<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/halfway.js"></script>
<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/slot-clicks.js"></script>
```

5. Do not upload `archive/`, `note/`, or the HTML pages. They are not the live site.

To check: open one article and scroll past the middle, then click one story on the front. In Plausible, look for the `halfway` goal and the `slot_click` goal. A goal shows nothing until it has been created and the event has fired once after that.

## Run the note

From this folder, with last week’s sheet saved as a CSV:

```
node note/monday-note.mjs note/sample-week.csv
```

`note/sample-week.csv` is made-up practice data. Every title in it says SAMPLE. Swap in the real sheet when you have one. The columns are `section`, `title`, `slot`, `opens`, and `halfway`.

You get one note per section. If a line cannot be filled from the counts, it says `no count this week`. Do not fill that in by hand with a guess.

Check the five lines against the sheet before anyone sends them. Sending the note is still a person, on Monday.
