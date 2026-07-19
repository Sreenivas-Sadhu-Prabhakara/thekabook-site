/* ThekaBook explainer — tiny progressive enhancements.
   Everything degrades gracefully if JS is off. No dependencies. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. Sticky nav shadow on scroll ---- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- 2. Smooth scroll for in-page links (respects reduced motion) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
      history.replaceState(null, "", id);
    });
  });

  /* ---- 3. Interactive touch: count-up the rupee figures on the hero
       site-card the first time it scrolls into view. This is the ledger
       "totting up" — the maths a paper diary never does. ---- */
  var counters = document.querySelectorAll("[data-count]");

  function formatINR(n) {
    // Indian grouping: last 3 digits, then pairs (12,34,567)
    var s = String(Math.round(n));
    var last3 = s.slice(-3);
    var rest = s.slice(0, -3);
    if (rest) last3 = "," + last3;
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return rest + last3;
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = formatINR(target); return; }

    var start = null;
    var dur = 1100;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatINR(target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = formatINR(target);
    }
    requestAnimationFrame(tick);
  }

  if (counters.length) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { io.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---- 4. Current year is not needed; keep footer static. ---- */
})();
