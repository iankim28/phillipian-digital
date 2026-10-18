// Halfway listener for a Phillipian article.
// Paste into the theme footer, after the Plausible snippet for phillipian.net.
// In Plausible, add a goal named halfway with a custom property named path.
//
// Fires once when the reader scrolls past the middle of .single-right.
// The event is named "halfway" and includes the page path only.
// No names, no cookies, no account ids.
// Opens are Plausible pageviews. This file does not count them.
// A page with no .single-right does nothing.
(function () {
  var article = document.querySelector(".single-right");
  if (!article) return;

  window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };

  var logged = false;

  function passedMiddle() {
    var rect = article.getBoundingClientRect();
    return rect.top + (rect.height / 2) <= window.innerHeight;
  }

  function onScroll() {
    if (logged || !passedMiddle()) return;
    logged = true;
    window.removeEventListener("scroll", onScroll);
    plausible("halfway", { props: { path: location.pathname } });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
})();
