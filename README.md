# The Monday note

Every Monday, each section gets three lines about last week.

1. Which story people opened most.
2. Which story they stayed with.
3. Which story the most readers opened and then left before halfway.

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

- [What the Monday note is](https://iankim28.github.io/phillipian-digital/guides/how-the-monday-note-works.html) explains the week: a reader opens a story, the site counts four things, and on Monday one person sends three lines per section, then the Latest Paper lines.
- [How the counts get onto the site](https://iankim28.github.io/phillipian-digital/guides/how-to-put-this-on-the-site.html) is for the webmaster only. Editors do not do this step.

**[put-on-the-website/](put-on-the-website/)** holds the only three files that get copied onto phillipian.net.

- `halfway.js` counts when a reader scrolls to the middle of a story.
- `slot-clicks.js` counts which spot on the front page the click came from: the lead, top stories, news, sports, commentary, or arts.
- `latest-paper.js` counts a click on Latest Paper, the button beside Sections in the black header.

They do not record a reader’s name. They do not write the three lines. An “open” is just someone loading the story, and Plausible already counts that once the webmaster adds its tag. A Latest Paper open is a click on that header button. Plausible keeps the running total.

**[make-the-monday-note/](make-the-monday-note/)** is not the note. It is the program that writes the note. On Monday, someone saves last week’s counts as a spreadsheet and runs the program on a computer. It prints the three lines. A person checks them and sends them. This folder is never uploaded to the website, and it does not email anyone.

**[demo/](demo/)** is a fake front page and a fake story. Every title says SAMPLE. Open [the fake front page](https://iankim28.github.io/phillipian-digital/demo/home.html) or [the fake story](https://iankim28.github.io/phillipian-digital/demo/article.html) and click or scroll to see what a count looks like. The black bar on the fake front has Latest Paper beside Sections. The numbers are made up. Do not upload this folder.

## How the webmaster puts the three files on phillipian.net

Do this once, on the Airlift staging copy first. In the WordPress dashboard, open the Airlift link. It may be labeled Airlink. That link opens the staging copy. Leave live phillipian.net alone. Do not use `staging.phillipian.net`. That address is an older WordPress install.

Digital does not edit the theme after that. The live site changes only when the person with Airlift access merges that staging copy.

1. On the staging copy, add the Plausible snippet for `phillipian.net` in the theme header, before `</head>`. A pageview is someone opening a story.

```html
<script defer data-domain="phillipian.net" src="https://plausible.io/js/script.js"></script>
```

Plausible is an outside service, not part of this repo. The snippet above uses Plausible Cloud (`plausible.io`), which is a paid subscription (about $9 a month, billed yearly) with a 30-day free trial. The whole note depends on it: opens, `halfway`, `slot_click`, and `latest_paper` all flow through Plausible, so if the trial lapses or the bill goes unpaid, the counts stop. If the paper does not want an ongoing bill, Plausible is open source and can be self-hosted for free on your own server; in that case point `src` at your own install instead of `plausible.io`.

2. In Plausible, add three custom-event goals named `halfway`, `slot_click`, and `latest_paper`. `halfway` and `latest_paper` use the property `path`. `slot_click` uses `path` and `slot`. The names have to match exactly, including capitalization.

3. Upload [put-on-the-website/halfway.js](put-on-the-website/halfway.js), [put-on-the-website/slot-clicks.js](put-on-the-website/slot-clicks.js), and [put-on-the-website/latest-paper.js](put-on-the-website/latest-paper.js) into `wp-content/themes/phillipian2019/js/` on the staging copy.

4. In the theme footer on the staging copy, before `</body>`, load those three files from the theme. The Plausible tag is already in the header, so it loads first.

```html
<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/halfway.js"></script>
<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/slot-clicks.js"></script>
<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/latest-paper.js"></script>
```

5. Do not upload `guides/`, `make-the-monday-note/`, `demo/`, or `index.html`.

6. In Airlift, keep `plausible.io`, `halfway.js`, `slot-clicks.js`, and `latest-paper.js` outside JavaScript delay. Airlift can hold a script until a visitor clicks, and a held script misses the scroll and the click. Then clear the Airlift cache.

To check: on the staging copy, open one article and scroll past the middle, then click one story on the front, then click Latest Paper in the black header. In Plausible, look for the `halfway` goal, the `slot_click` goal, and the `latest_paper` goal on the `phillipian.net` property. The tag uses that domain, so a test on staging shows up there. A goal shows nothing until it has been created and the event has fired once after that.

On Monday, the Latest Paper lines come from that `latest_paper` goal. Total is the all-time goal total. Days is the number of days in that range. This week is last week’s goal total. Visitors is the all-time unique visitors for that goal. Visitors are anonymous. The person pastes those four numbers. The program divides total by days and writes the daily average.

## How Monday’s three lines get written

From this folder, with last week’s sheet saved as a CSV:

```
node make-the-monday-note/monday-note.mjs make-the-monday-note/sample-week.csv make-the-monday-note/sample-latest-paper.csv
```

`sample-week.csv` is practice data. Every title in it says SAMPLE. Swap in the real sheet when you have one. The columns are `section`, `title`, `slot`, `opens`, and `halfway`.

`sample-latest-paper.csv` is practice data too. The numbers are made up. The columns are `started`, `total`, `days`, `this_week`, and `visitors`. Leave that second file off and the program prints only the section notes.

You get one note per section, then the Latest Paper lines: the total since the start, about how many a day, this week, and visitors. If a line cannot be filled from the counts, it says `no count this week`. Do not fill that in by hand with a guess.

Check the three lines, and the Latest Paper lines, against the sheets before anyone sends them. Sending the note is still a person, on Monday.
