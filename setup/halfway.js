// Halfway listener for a Phillipian article page.
// Paste into the existing theme later. This copy only logs to the console.
// It does not call an analytics service or any network address.
//
// Fires an event named "halfway" when the reader scrolls past the middle.
// Scrolling back above the middle sends "halfway-reset" so a demo can clear.
// The console count is still once per page. A reader who scrolls up and down
// is not counted twice. The event carries the page path only.
// No names, no cookies, no account ids.
//
// On the live site the path is the story address, such as /2026/10/12/story/.
// Opening this file from a laptop would otherwise report that laptop's folders,
// so a local file keeps only the folder and file name.
// The demo page labels the middle with #halfway-mark. A theme page with no
// label uses the middle of the article.
(function () {
  var passed = false;
  var logged = false;
  var article = document.querySelector("article") || document.body;

  function pagePath() {
    if (location.protocol !== "file:") return location.pathname;
    try {
      var parts = decodeURIComponent(location.pathname).split(/[/\\]/).filter(Boolean);
      var file = parts.pop() || "";
      var folder = parts.pop() || "";
      return folder ? folder + "/" + file : file;
    } catch (err) {
      return location.pathname;
    }
  }

  function passedMiddle() {
    var mark = document.getElementById("halfway-mark");
    if (mark) return mark.getBoundingClientRect().top <= window.innerHeight;
    var rect = article.getBoundingClientRect();
    return rect.top + (rect.height / 2) <= window.innerHeight;
  }

  function onScroll() {
    var now = passedMiddle();
    if (now && !passed) {
      passed = true;
      var detail = {
        event: "halfway",
        path: pagePath()
      };
      if (!logged) {
        logged = true;
        console.log(detail);
      }
      window.dispatchEvent(new CustomEvent("halfway", { detail: detail }));
      return;
    }
    if (!now && passed) {
      passed = false;
      window.dispatchEvent(new CustomEvent("halfway-reset"));
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
})();
