"use strict";

/* =========================================
   AI CREATOR SCHOOL
   Main JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------------------
     1. Mobile Navigation
  ----------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");

  if (menuToggle && navigation) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("active");
    };

    const openMenu = () => {
      menuToggle.setAttribute("aria-expanded", "true");
      navigation.classList.add("active");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu after clicking a navigation link
    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close mobile menu when switching to desktop layout
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  /* -----------------------------------------
     2. Automatic Copyright Year
  ----------------------------------------- */

  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------
     3. Smooth Scrolling
  ----------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      // Keep the URL hash in sync
      if (window.location.hash !== targetId) {
        history.replaceState(null, "", targetId);
      }
    });
  });

  /* -----------------------------------------
     4. External Links Security
  ----------------------------------------- */

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });

  /* -----------------------------------------
     5. Progressive Web App Registration
  ----------------------------------------- */

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./sw.js")
        .then((registration) => {
          console.info(
            "AI Creator School: Service Worker registered.",
            registration.scope
          );
        })
        .catch((error) => {
          console.warn(
            "Service Worker registration is not available yet:",
            error
          );
        });
    });
  }

  /* -----------------------------------------
     6. Accessibility: Reduced Motion
  ----------------------------------------- */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (prefersReducedMotion.matches) {
    document.documentElement.classList.add("reduce-motion");
  }

  prefersReducedMotion.addEventListener?.("change", (event) => {
    document.documentElement.classList.toggle(
      "reduce-motion",
      event.matches
    );
  });

  /* -----------------------------------------
     7. Website Ready
  ----------------------------------------- */

  document.documentElement.classList.add("js-enabled");

  console.info("AI Creator School website initialized successfully.");
});
