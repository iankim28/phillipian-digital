// Latest Paper listener for phillipian.net.
// Paste into the theme footer, after the Plausible snippet.
// In Plausible, add a goal named latest_paper with a custom property named path.
//
// Fires one event named "latest_paper" when someone clicks Latest Paper
// in the black header, the button beside Sections.
// It does not record who clicked, and it does not stop the link.
//
// The header link sits in .navbar and points at archives.phillipian.net/latest.
// "This Week's Paper" in the Sections menu uses that same address.
// That menu item lives in .sections-dropdown, so a click there does not count.
// Links in .navbar-rightnav do not count either.
(function () {
  window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };

  function isLatestPaper(link) {
    if (!link || !link.closest) return false;
    if (!link.closest(".navbar")) return false;
    if (link.closest(".sections-dropdown")) return false;
    if (link.closest(".navbar-rightnav")) return false;
    var href = link.getAttribute("href") || "";
    var url;
    try {
      url = new URL(href, location.href);
    } catch (err) {
      return false;
    }
    var host = url.hostname.replace(/^www\./, "");
    if (host !== "archives.phillipian.net") return false;
    var path = (url.pathname.replace(/\/+$/, "") || "/").toLowerCase();
    return path === "/latest";
  }

  document.addEventListener("click", function (event) {
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var target = event.target;
    if (!target || !target.closest) return;
    var link = target.closest("a[href]");
    if (!isLatestPaper(link)) return;
    plausible("latest_paper", { props: { path: location.pathname } });
  });
})();
