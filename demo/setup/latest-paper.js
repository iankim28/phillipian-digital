// Latest Paper listener.
// Paste into the existing theme later. This copy only logs to the console.
// It does not call an analytics service or any network address.
//
// Listens for a click on Latest Paper in the black header, the button
// beside Sections. The link sits in .navbar and points at
// archives.phillipian.net/latest.
// "This Week's Paper" in the Sections menu uses that same address.
// That menu item lives in .sections-dropdown, so a click there does not count.
//
// Fires one event named "latest_paper" with the page path.
// It does not record who clicked, and it does not stop the link.
//
// On the live site the path is the page address, such as / or /2026/10/12/story/.
// Opening this file from a laptop would otherwise report that laptop's folders,
// so a local file keeps only the folder and file name.
(function () {
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
    var detail = {
      event: "latest_paper",
      path: pagePath()
    };
    console.log(detail);
    window.dispatchEvent(new CustomEvent("latest_paper", { detail: detail }));
  });
})();
