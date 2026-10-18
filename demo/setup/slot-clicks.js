// Homepage slot listener.
// Paste into the existing theme later. This copy only logs to the console.
// It does not call an analytics service or any network address.
//
// Listens for clicks on links with a data-slot attribute. Allowed values:
// lead, top, news, sports, commentary, arts.
// Fires one event named "slot_click" with the slot and the link path.
// It does not record who clicked, and it does not stop the link.
//
// On the live site the path is the story address, such as /2026/10/12/story/.
// Opening this file from a laptop would otherwise report that laptop's folders,
// so a local file keeps the href written on the link.
(function () {
  var allowed = {
    lead: true,
    top: true,
    news: true,
    sports: true,
    commentary: true,
    arts: true
  };

  function linkPath(link) {
    var written = link.getAttribute("href") || "";
    if (location.protocol === "file:") return written.replace(/^\.\//, "");
    return link.pathname || written;
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[data-slot]");
    if (!link) return;
    var slot = link.getAttribute("data-slot");
    if (!allowed[slot]) return;
    var detail = {
      event: "slot_click",
      slot: slot,
      path: linkPath(link)
    };
    console.log(detail);
    window.dispatchEvent(new CustomEvent("slot_click", { detail: detail }));
  });
})();
