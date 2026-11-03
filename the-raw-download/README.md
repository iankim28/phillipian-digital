# Sample of the Plausible download

Plausible is the service that counts visits to phillipian.net. Each week, someone downloads last week’s numbers from Plausible. This folder shows what that download looks like.

The numbers here are made up. Every story address has the word `sample` in it. Nothing in this folder goes on phillipian.net.

> [!IMPORTANT]
> **Only two numbers matter.**
>
> | What you want | File | Column |
> | --- | --- | --- |
> | **Views:** how many times a story was loaded | `pages.csv` | **`pageviews`** |
> | **Read to halfway:** how many times a reader scrolled past the middle of the story | `custom_props.csv` | **`events`** |
>
> Every other column can be ignored.

## How to get the two files

The Plausible dashboard has a download button. It is in the menu at the top right of the big chart, labeled **Export stats**. It gives you one ZIP file, a compressed folder, named like `Plausible export phillipian.net 2026-10-26 to 2026-11-01.zip`. Open it and you will see about twenty spreadsheets. You need only one spreadsheet from each download.

**You download twice.** Views come out right only when the dashboard shows everything. Read-to-halfway comes out right only when the dashboard shows the halfway count alone. One download can’t do both.

**Download 1: views**

1. Open the Plausible dashboard for phillipian.net.
2. At the top right, set the dates to last week.
3. Click **Export stats**.
4. Open the ZIP. Keep **`pages.csv`**. Ignore the rest.

**Download 2: read to halfway**

1. Keep the same dates.
2. Scroll down to the box called **Goal Conversions**. Click the word **`halfway`**. A filter that says `halfway` appears at the top of the page. The dashboard now shows only the halfway count.
3. Click **Export stats** again.
4. Open this new ZIP. Keep **`custom_props.csv`**. Ignore the rest.

**Why step 2 matters.** The site sends Plausible two kinds of signal with a story’s web address on them. One means a reader reached the middle of the story. The other means someone clicked the story on the front page. `custom_props.csv` adds up signals by web address. If you skip step 2, each story’s number is halfway and front-page clicks added together, so it is too high. Plausible calls each kind of signal a goal. Clicking `halfway` narrows the file to that one goal.

The two files in this folder are already unzipped, one from each download.

## pages.csv: views

One row is one page on the site.

| Column | What it means | Use it? |
| --- | --- | --- |
| `name` | The page’s web address, such as `/2026/10/27/sample-campus-reacts-to-the-lawsuit/`. Use it to tell which story the row is. | Yes, to match the story |
| `visitors` | How many different people loaded the page. | No |
| **`pageviews`** | **How many times the page was loaded. This is the views number.** | **Yes. This is a number to copy.** |
| `bounce_rate` | Percent of visits that left the site from this page. | No |
| `time_on_page` | Average seconds spent on the page. | No |
| `scroll_depth` | Average percent of the page people scrolled. This is **not** the halfway number. | No |

Example row:

```text
name,visitors,pageviews,bounce_rate,time_on_page,scroll_depth
/2026/10/27/sample-campus-reacts-to-the-lawsuit/,740,820,41,95,48
```

This story was loaded **820** times last week.

The file also lists pages that are not stories, such as the front page (`/`) and the news section page (`/news/`). A story’s address has a date in it. A real `pages.csv` lists the top 100 pages, most viewed first.

## custom_props.csv: read to halfway

One row is one story. This sample is the second download, with the `halfway` goal already clicked.

| Column | What it means | Use it? |
| --- | --- | --- |
| `property` | The kind of detail saved. Here it is always `path`, meaning the row is about one web address. | No |
| `value` | The story’s web address. It matches `name` in `pages.csv`. | Yes, to match the story |
| `visitors` | How many different people reached the middle. | No |
| **`events`** | **How many times a reader scrolled past the middle of the story.** | **Yes. This is a number to copy.** |
| `conversion_rate` | A Plausible percent for the goal. The Monday note does not use it. | No |

Example row:

```text
property,value,visitors,events,conversion_rate
path,/2026/10/27/sample-campus-reacts-to-the-lawsuit/,390,410,50.0
```

Readers got halfway through this story **410** times last week. The story was loaded 820 times, so about half the views reached the middle.

The front page and `/news/` do not appear here, because the halfway count only runs on stories.

## What a person adds

Plausible knows the web address and the counts. It does not know a story’s section, headline, or spot on the front page. A person adds those.

The table puts each sample story’s address, section, headline, and two important numbers in one row.

- **Address:** the story’s web address. It is `name` in `pages.csv` and `value` in `custom_props.csv`.
- **Section:** News, Sports, Commentary, Arts, or The Eighth Page. Typed by a person.
- **Headline:** the story’s title. Typed by a person.
- **Views:** `pageviews` from `pages.csv`.
- **Read to halfway:** `events` from `custom_props.csv`.

| Address | Section | Headline | Views | Read to halfway |
| --- | --- | --- | --- | --- |
| `/2026/10/27/sample-campus-reacts-to-the-lawsuit/` | News | SAMPLE Campus Reacts to the Lawsuit | 820 | 410 |
| `/2026/10/27/sample-history-of-activism/` | News | SAMPLE History of Activism | 300 | 270 |
| `/2026/10/27/sample-10-questions-with-a-teacher/` | News | SAMPLE 10 Questions with a Teacher | 600 | 40 |
| `/2026/10/27/sample-club-fair-returns/` | News | SAMPLE Club Fair Returns | 180 | 90 |
| `/2026/10/28/sample-football-beats-a-rival/` | Sports | SAMPLE Football Beats a Rival | 700 | 280 |
| `/2026/10/28/sample-swim-team-qualifies/` | Sports | SAMPLE Swim Team Qualifies | 200 | 180 |
| `/2026/10/28/sample-game-recap-nobody-finished/` | Sports | SAMPLE Game Recap Nobody Finished | 550 | 20 |
| `/2026/10/28/sample-track-meet-results/` | Sports | SAMPLE Track Meet Results | 150 | 60 |
| `/2026/10/29/sample-opinion-on-the-schedule/` | Commentary | SAMPLE Opinion on the Schedule | 400 | 160 |
| `/2026/10/29/sample-why-the-blue-key-matters/` | Commentary | SAMPLE Why the Blue Key Matters | 150 | 135 |
| `/2026/10/29/sample-hot-take-on-lunch/` | Commentary | SAMPLE Hot Take on Lunch | 380 | 15 |
| `/2026/10/29/sample-letter-to-the-editor/` | Commentary | SAMPLE Letter to the Editor | 90 | 36 |
| `/2026/10/30/sample-fall-play-opens-friday/` | Arts | SAMPLE Fall Play Opens Friday | 500 | 200 |
| `/2026/10/30/sample-gallery-walk-on-campus/` | Arts | SAMPLE Gallery Walk on Campus | 120 | 108 |
| `/2026/10/30/sample-concert-preview-skimmed/` | Arts | SAMPLE Concert Preview Skimmed | 340 | 20 |
| `/2026/10/30/sample-dance-show-recap/` | Arts | SAMPLE Dance Show Recap | 80 | 32 |
| `/2026/10/31/sample-eighth-page-essay/` | The Eighth Page | SAMPLE Eighth Page Essay | 220 | 110 |

One more sample story, SAMPLE Eighth Page Photo Story, has no numbers this week, so it is missing from both files. Leave a missing number blank. Do not guess.

These numbers are the same ones in [sample-week.csv](../make-the-monday-note/sample-week.csv), the sheet the Monday note program reads. In that sheet, views go in the `opens` column and read-to-halfway goes in the `halfway` column.
