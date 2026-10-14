document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.PORTFOLIO_CONFIG || {};
  const name = cfg.name || "Your Name";
  document.querySelectorAll("[data-name]").forEach(el => el.textContent = name);
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll("[data-email-link]").forEach(el => {
    const email = cfg.email || "your.email@example.com";
    el.href = `mailto:${email}`;
    if (el.classList.contains("resume-contact") || el.tagName === "A" && el.textContent.includes("@")) el.textContent = email;
  });
  const setExternal = (selector, value, fallback) => {
    document.querySelectorAll(selector).forEach(el => {
      const valid = value && !value.includes("YOUR-") && !value.includes("example.com");
      if (valid) {
        el.href = value;
        el.classList.remove("is-placeholder");
      } else {
        el.href = "#";
        el.classList.add("is-placeholder");
        el.addEventListener("click", event => {
          event.preventDefault();
          alert(fallback);
        });
      }
    });
  };
  setExternal("[data-linkedin]", cfg.linkedin, "Add your LinkedIn profile URL in config.js first.");
  setExternal("[data-credly]", cfg.credly, "Add your Credly profile URL in config.js first.");
  setExternal("[data-notion]", cfg.notion, "Add your public Notion portfolio URL in config.js first.");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "×" : "☰";
    });
  }
});