document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".landing-tabs").forEach(function (tabs) {
    var buttons = Array.prototype.slice.call(tabs.querySelectorAll(".landing-tabs__tab"));
    var panels = Array.prototype.slice.call(tabs.querySelectorAll(".landing-tabs__panel"));
    function activate(k) {
      buttons.forEach(function (b, m) {
        b.classList.toggle("is-active", m === k);
        b.setAttribute("aria-selected", m === k ? "true" : "false");
      });
      panels.forEach(function (p, m) {
        p.classList.toggle("is-active", m === k);
        p.hidden = m !== k;
      });
    }
    buttons.forEach(function (b, n) {
      b.addEventListener("click", function () { activate(n); });
    });
  });
});
