# Put these on the website

These are the only three files in this repo that go on phillipian.net. A webmaster copies them once, onto the Airlift staging copy first. The steps are on [how the counts get onto the site](https://iankim28.github.io/phillipian-digital/guides/how-to-put-this-on-the-site.html).

- `halfway.js` counts when a reader scrolls to the middle of a story.
- `slot-clicks.js` counts which spot on the front page the click came from: the lead, top stories, news, sports, commentary, or arts.
- `latest-paper.js` counts a click on Latest Paper, the button beside Sections in the black header. Plausible keeps the total since the count started.

They do not record a reader’s name. They do not write the Monday note. The program that writes the three lines is in [make-the-monday-note](../make-the-monday-note/).
