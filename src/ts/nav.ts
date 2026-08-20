const setupDropdownNav = (): void => {
  const dropdownItems = document.querySelectorAll<HTMLElement>(".has-dropdown");

  dropdownItems.forEach((item) => {
    const button = item.querySelector<HTMLButtonElement>(".c-nav-link");
    const menu = item.querySelector<HTMLUListElement>(".dropdown");
    const span = item.querySelector<HTMLSpanElement>(".downward-chevron");

    if (!button || !menu || !span) return;

    button.addEventListener("click", () => {
      const isOpen = menu.classList.contains("open");

      // Close all other dropdowns
      document.querySelectorAll<HTMLUListElement>(".dropdown").forEach((d) => {
        if (d !== menu) d.classList.remove("open");
      });

      document
        .querySelectorAll<HTMLButtonElement>(".c-nav-link")
        .forEach((b) => {
          if (b !== button) b.setAttribute("aria-expanded", "false");
        });

      document
        .querySelectorAll<HTMLSpanElement>(".downward-chevron")
        .forEach((s) => {
          if (s !== span) s.classList.remove("downward-chevron-up");
        });

      // Toggle this one
      if (isOpen) {
        menu.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        span.classList.remove("downward-chevron-up");
      } else {
        menu.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        span.classList.add("downward-chevron-up");
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", setupDropdownNav);
