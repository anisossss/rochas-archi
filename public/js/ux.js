var uxjs = uxjs || {};

uxjs.scroller = {
  init: function () {
    this.triggerScroll();
    this.bindButtons();
  },
  bindButtons: function () {
    var nextButton = document.querySelector("#next_btn");
    var prevButton = document.querySelector("#prev_btn");

    nextButton.addEventListener("click", function (e) {
      e.preventDefault();
      sketch.next();
    });

    prevButton.addEventListener("click", function (e) {
      e.preventDefault();
      sketch.prev();
    });
  },
  triggerScroll: function () {
    var scrollZone = document.querySelector("#scroller");
    var slider = document.querySelector("#slider");

    scrollZone.addEventListener("wheel", triggerIt, true);
    slider.addEventListener("contextmenu", (event) => event.preventDefault());

    function triggerIt(e) {
      e.preventDefault();
      if (e.deltaY > 0) {
        sketch.next();
      } else {
        sketch.prev();
      }
    }
  },
};
function isDomReady(fn) {
  if (typeof fn !== "function") {
    return;
  }

  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    return fn();
  }

  document.addEventListener("DOMContentLoaded", fn, false);
}

isDomReady(function () {
  uxjs.scroller.init();
});
