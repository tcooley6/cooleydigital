/* Cooley Digital — shared scripts */
(function () {
  "use strict";

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Header shadow once the page scrolls
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Show a clean placeholder if a work screenshot is missing
  document.querySelectorAll(".work-card__media img").forEach(function (img) {
    var markMissing = function () {
      img.parentElement.classList.add("is-missing");
    };
    if (img.complete && img.naturalWidth === 0) markMissing();
    img.addEventListener("error", markMissing);
  });

  // Friendly inline validation for forms marked data-validate
  document.querySelectorAll("form[data-validate]").forEach(function (form) {
    var fields = form.querySelectorAll("[required]");

    var check = function (input) {
      var wrapper = input.closest(".field");
      var valid = input.checkValidity() && input.value.trim() !== "";
      if (wrapper) wrapper.classList.toggle("has-error", !valid);
      input.setAttribute("aria-invalid", valid ? "false" : "true");
      return valid;
    };

    fields.forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.value.trim() !== "") check(input);
      });
      input.addEventListener("input", function () {
        if (input.closest(".field.has-error")) check(input);
      });
    });

    form.addEventListener("submit", function (e) {
      var firstInvalid = null;
      fields.forEach(function (input) {
        if (!check(input) && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        e.preventDefault();
        firstInvalid.focus();
      }
    });
  });
})();
