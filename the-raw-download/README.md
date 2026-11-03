# What Plausible sends

This folder is a fake download. Every story address says sample. It does not go on phillipian.net.

Plausible sends a ZIP of many spreadsheets. The file is named like `Plausible export phillipian.net 2026-10-26 to 2026-11-01.zip`. Two spreadsheets inside hold the counts for the Monday note. Those two are here, already taken out of the ZIP. The open and halfway numbers are the same ones in [sample-week.csv](../make-the-monday-note/sample-week.csv).

## pages.csv

This file is the first export. Leave the goal filter off.

One row is one page. `name` is the address. `pageviews` is the open. Copy `pageviews` into the opens column.

`visitors`, `bounce_rate`, `time_on_page`, and `scroll_depth` come along in the real file. The Monday note uses `pageviews`. `scroll_depth` is an average percent of the page. The halfway count is in the other file.

A story address looks like `/2026/10/27/sample-campus-reacts-to-the-lawsuit/`. This sample also has the front page, `/`, and the news section page, `/news/`. A real `pages.csv` keeps the top 100 pages. Rows are sorted by `pageviews`, the way Plausible sorts the report.

## custom_props.csv

This file is the second export. Filter the dashboard to the `halfway` goal first. The rows here already have that filter. `property` is `path` on every row.

`value` is the story address. `events` is how many times a reader reached the middle. Copy `events` into the halfway column.

`visitors` and `conversion_rate` come along in the real file. The Monday note uses `events`.

The front page and `/news/` are absent here. Halfway fires on a story. SAMPLE Eighth Page Photo Story has a blank count in the practice sheet, so it is absent from both files.

## What a person adds

Section, headline, and slot are typed by a person. These files have the address and the counts. The labeled practice sheet is [sample-week.csv](../make-the-monday-note/sample-week.csv).

| Address | Section | Title | pageviews | events |
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

SAMPLE Eighth Page Photo Story is on the practice sheet with both counts blank. It has no row in either file.
