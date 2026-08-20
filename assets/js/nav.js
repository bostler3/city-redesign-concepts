const setupDropdownNav = () => {
    const dropdownItems = document.querySelectorAll(".has-dropdown");
    dropdownItems.forEach((item) => {
        const button = item.querySelector(".c-nav-link");
        const menu = item.querySelector(".dropdown");
        const span = item.querySelector(".downward-chevron");
        if (!button || !menu || !span)
            return;
        button.addEventListener("click", () => {
            const isOpen = menu.classList.contains("open");
            // Close all other dropdowns
            document.querySelectorAll(".dropdown").forEach((d) => {
                if (d !== menu)
                    d.classList.remove("open");
            });
            document
                .querySelectorAll(".c-nav-link")
                .forEach((b) => {
                if (b !== button)
                    b.setAttribute("aria-expanded", "false");
            });
            document
                .querySelectorAll(".downward-chevron")
                .forEach((s) => {
                if (s !== span)
                    s.classList.remove("downward-chevron-up");
            });
            // Toggle this one
            if (isOpen) {
                menu.classList.remove("open");
                button.setAttribute("aria-expanded", "false");
                span.classList.remove("downward-chevron-up");
            }
            else {
                menu.classList.add("open");
                button.setAttribute("aria-expanded", "true");
                span.classList.add("downward-chevron-up");
            }
        });
    });
};
document.addEventListener("DOMContentLoaded", setupDropdownNav);
export {};
//# sourceMappingURL=nav.js.map