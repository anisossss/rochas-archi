var uxjs = uxjs || {};

uxjs.scroller = {
  init: function () {
    this.triggerClick();
  },
  triggerClick: function () {
    var scrollZone = document.querySelector("#scroller");
    var slider = document.querySelector("#slider");
    var scrollerTrigger = document.querySelector("#data-trigger-scroller");

    if (!scrollZone || !slider || !scrollerTrigger) {
      return false;
    }

    scrollZone.addEventListener("wheel", triggerIt, true);
    slider.addEventListener("contextmenu", (event) => event.preventDefault());
    function triggerIt(e) {
      e.preventDefault();
      scrollZone.click();
    }
  },
};

uxjs.domLoaded = {
  init: function () {
    this.removeSpinner();
  },
  removeSpinner: function () {
    var loader = document.querySelector("#loader");
    window.addEventListener("load", handleRemove);
    function handleRemove() {
      loader.classList.add("opacity-0");
    }
  },
};

/**
 * DOM ready ?
 *
 * @param {Function} fn Callback.
 */
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
  uxjs.domLoaded.init();
});
