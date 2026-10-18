// Homepage slot listener for phillipian.net.
// Paste into the theme footer, after the Plausible snippet.
// In Plausible, add a goal named slot_click with custom properties slot and path.
//
// Fires one event named "slot_click" with the slot and the story path.
// It does not record who clicked, and it does not stop the link.
//
// A link with data-slot uses that name when it is one of:
// lead, top, news, sports, commentary, arts.
// Otherwise the slot comes from the live homepage:
//   .home-lede → lead
//   .home-popular → top
//   .home-sect whose header points at /news/, /sports/, /commentary/, or /arts/
// Only a story address counts, such as /2026/10/15/story/.
// Category, author, ad, and menu links do not.
(function () {
  var allowed = {
    lead: true,
    top: true,
    news: true,
    sports: true,
    commentary: true,
    arts: true
  };

  window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };

  function storyPath(link) {
    var url;
    try {
      url = new URL(link.href, location.origin);
    } catch (err) {
      return "";
    }
    if (url.hostname !== location.hostname) return "";
    if (!/^\/\d{4}\/\d{2}\/\d{2}\/.+/.test(url.pathname)) return "";
    return url.pathname;
  }

  function slotFor(link) {
    var explicit = link.getAttribute("data-slot");
    if (allowed[explicit]) return explicit;
    if (link.closest(".home-lede")) return "lead";
    if (link.closest(".home-popular")) return "top";
    var sect = link.closest(".home-sect");
    if (!sect) return "";
    var header = sect.querySelector(".sect-header a");
    if (!header) return "";
    var href = header.getAttribute("href") || "";
    var match = href.match(/\/(news|sports|commentary|arts)\/?$/);
    return match ? match[1] : "";
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var link = target.closest("a[href]");
    if (!link) return;
    var path = storyPath(link);
    if (!path) return;
    var slot = slotFor(link);
    if (!allowed[slot]) return;
    plausible("slot_click", {
      props: { slot: slot, path: path }
    });
  });
})();
