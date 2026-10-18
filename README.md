# The Monday note

Every Monday, each section gets five lines about last week.

1. Which story people opened.
2. Which story they stayed with.
3. Which story they opened and then left.
4. Which spot on the front page drew more clicks.
5. One line to remember.

Section editors read those lines and decide what to cover next. Digital does not assign stories. A number is a fact about last week, not an instruction for this week.

Nothing in this repo is on phillipian.net yet.

Open these as websites. Clicking an `.html` file in the file list below shows the code, not the page.

- [Start here](https://iankim28.github.io/phillipian-digital/)
- [What the Monday note is](https://iankim28.github.io/phillipian-digital/guides/how-the-monday-note-works.html)
- [How the counts get onto the site](https://iankim28.github.io/phillipian-digital/guides/how-to-put-this-on-the-site.html) — for the webmaster
- [A fake front page](https://iankim28.github.io/phillipian-digital/demo/home.html)
- [A fake story](https://iankim28.github.io/phillipian-digital/demo/article.html)

## What each thing is

**[Start here](https://iankim28.github.io/phillipian-digital/)** is the first page. It is a guide. It does not go on the newspaper site. The file behind it is `index.html`.

**[guides/](guides/)** holds the two pages an editor can read.

- [What the Monday note is](https://iankim28.github.io/phillipian-digital/guides/how-the-monday-note-works.html) explains the week: a reader opens a story, the site counts three things, and on Monday one person writes five lines per section.
- [How the counts get onto the site](https://iankim28.github.io/phillipian-digital/guides/how-to-put-this-on-the-site.html) is for the webmaster only. Editors do not do this step.

**[put-on-the-website/](put-on-the-website/)** holds the only two files that get copied onto phillipian.net.

- `halfway.js` counts when a reader scrolls to the middle of a story.
- `slot-clicks.js` counts which spot on the front page the click came from: the lead, top stories, news, sports, commentary, or arts.

They do not record a reader’s name. They do not write the five lines. An “open” is just someone loading the story, and Plausible already counts that once the webmaster adds its tag.

**[make-the-monday-note/](make-the-monday-note/)** is not the note. It is the program that writes the note. On Monday, someone saves last week’s counts as a spreadsheet and runs the program on a computer. It prints the five lines. A person checks them and sends them. This folder is never uploaded to the website, and it does not email anyone.

**[demo/](demo/)** is a fake front page and a fake story. Every title says SAMPLE. Open [the fake front page](https://iankim28.github.io/phillipian-digital/demo/home.html) or [the fake story](https://iankim28.github.io/phillipian-digital/demo/article.html) and click or scroll to see what a count looks like. The numbers are made up. Do not upload this folder.

## How the webmaster puts the two files on phillipian.net

Do this once. Digital does not edit the theme after that.

1. Add the Plausible snippet for `phillipian.net` in the theme header, before `</head>`. A pageview is someone opening a story.

```html
<script defer data-domain="phillipian.net" src="https://plausible.io/js/script.js"></script>
```

2. In Plausible, add two custom-event goals named `halfway` and `slot_click`. The property names are `path` and `slot`. The names have to match exactly, including capitalization.

3. Upload [put-on-the-website/halfway.js](put-on-the-website/halfway.js) and [put-on-the-website/slot-clicks.js](put-on-the-website/slot-clicks.js) into `wp-content/themes/phillipian2019/js/`.

4. In the theme footer, before `</body>`, load those two files from the theme. The Plausible tag is already in the header, so it loads first.

```html
<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/halfway.js"></script>
<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/slot-clicks.js"></script>
```

5. Do not upload `guides/`, `make-the-monday-note/`, `demo/`, or `index.html`.

To check: open one article and scroll past the middle, then click one story on the front. In Plausible, look for the `halfway` goal and the `slot_click` goal. A goal shows nothing until it has been created and the event has fired once after that.

## How Monday’s five lines get written

From this folder, with last week’s sheet saved as a CSV:

```
node make-the-monday-note/monday-note.mjs make-the-monday-note/sample-week.csv
```

`sample-week.csv` is practice data. Every title in it says SAMPLE. Swap in the real sheet when you have one. The columns are `section`, `title`, `slot`, `opens`, and `halfway`.

You get one note per section. If a line cannot be filled from the counts, it says `no count this week`. Do not fill that in by hand with a guess.

Check the five lines against the sheet before anyone sends them. Sending the note is still a person, on Monday.
