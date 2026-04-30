/* ─────────────────────────────────────────
   Arabic Language Expert — script.js
   Handles: image upload, card clicks, CTA
───────────────────────────────────────── */

(function () {
  "use strict";

  /* ── Utility: show a toast message ── */
  function showToast(message, duration = 2800) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), duration);
  }

  /* ─────────────────────────────────────
     1. SERVICE CARD CLICK LISTENERS
  ─────────────────────────────────────*/
  const serviceMessages = {
    "Translation":        "I'm interested in your Translation service (Arabic ↔ English). Can you tell me more about your rates and process?",
    "Transcription":      "I need audio transcription in Arabic — including dialect-specific speech. How do you handle this?",
    "Localization":       "I'd like to localize my website/app for Arabic-speaking audiences. What's your localization workflow?",
    "Proofreading & QA":  "I have a document that needs proofreading and quality assurance in Arabic. Can you help?",
    "Writing & Scripts":  "I need original Arabic copywriting / scriptwriting. What kind of content do you specialize in?",
    "Data Annotation":    "I'm looking for Arabic data annotation for an AI/NLP project. Can we discuss the details?",
    "Tutoring":           "I'm interested in personalized Arabic tutoring lessons. What levels and formats do you offer?",
  };

  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
      /* Toggle active highlight */
      const wasActive = card.classList.contains("active");
      serviceCards.forEach((c) => c.classList.remove("active"));
      if (!wasActive) card.classList.add("active");

      /* Show toast with a contextual message */
      const service = card.dataset.service || "this service";
      const message = wasActive
        ? `Deselected: ${service}`
        : `✓  ${service} selected — send a message to get started!`;
      showToast(message);
    });

    /* Keyboard accessibility */
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* ─────────────────────────────────────
     2. CTA BUTTON — "Send a message"
  ───────────────────────────────────── */
  const ctaBtn = document.getElementById("ctaBtn");

  if (ctaBtn) {
    ctaBtn.addEventListener("click", () => {
      /* Collect any selected services */
      const selected = Array.from(document.querySelectorAll(".service-card.active"))
        .map((c) => c.dataset.service)
        .filter(Boolean);

      let subject = "Arabic Language Services — Inquiry";
      let body    = "Hello,\n\nI found your profile and I'm interested in your Arabic language services.\n\n";

      if (selected.length > 0) {
        body += `I'm particularly interested in: ${selected.join(", ")}.\n\n`;
      }

      body += "Could we discuss my project?\n\nLooking forward to hearing from you.";

      /* Open default mail client */
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      showToast("Opening your mail client…");
    });
  }

  /* ─────────────────────────────────────
     3. DIALECT TAGS — subtle interaction
  ───────────────────────────────────── */
  const dialectTags = document.querySelectorAll(".dialect-tag");

  dialectTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      showToast(`Dialect: ${tag.textContent.trim()}`);
    });
  });

})();
