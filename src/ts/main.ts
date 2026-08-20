import "./nav.js";

const autoResize = (textarea: HTMLTextAreaElement) => {
  textarea.style.overflowY = "hidden"; // Hide scrollbar during resize
  textarea.style.height = "auto"; // Reset height
  textarea.style.height = textarea.scrollHeight + "px"; // Set to content height
};

const appendMessage = (
  container: HTMLElement,
  text: string,
  cssClass: "bot" | "user",
) => {
  const message = document.createElement("p");
  message.className = `chat-message ${cssClass}`;
  message.textContent = text;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
};

const setupToggleButtons = (selector: string) => {
  document.querySelectorAll<HTMLButtonElement>(selector).forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const id = button.getAttribute("aria-controls");
      if (!id) return;
      const details = document.getElementById(id);
      if (!details) return;
      button.setAttribute("aria-expanded", (!expanded).toString());
      details.style.display = expanded ? "none" : "block";
    });
  });
};

const setupIndexChatPanel = () => {
  const chatBtn = document.querySelector<HTMLButtonElement>(".chat-panel-btn");
  const chatPanel = document.querySelector<HTMLDivElement>(".chat-panel-inner");
  const chatExpanded = document.querySelector<HTMLDivElement>(".chat-expanded");
  const chatInput = document.querySelector<HTMLTextAreaElement>(".chat-input");
  const chatMessages = document.querySelector<HTMLDivElement>(".chat-messages");
  const chatForm = chatExpanded?.querySelector<HTMLFormElement>(".chat-form");

  if (
    !chatBtn ||
    !chatPanel ||
    !chatExpanded ||
    !chatInput ||
    !chatMessages ||
    !chatForm
  ) {
    return;
  }

  const sendMessage = () => {
    const value = chatInput.value.trim();
    if (!value) return;

    appendMessage(chatMessages, value, "user");
    chatInput.value = "";
    chatInput.style.height = "auto";

    setTimeout(() => {
      appendMessage(
        chatMessages,
        "🍑 Thanks for your message! (This is a demo reply.)",
        "bot",
      );
    }, 500);
  };

  chatBtn.addEventListener("click", () => {
    chatPanel.classList.add("hidden");
    chatExpanded.classList.remove("hidden");
    chatInput.focus();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  chatInput.addEventListener("input", () => {
    autoResize(chatInput);
  });

  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage();
  });

  const closeBtn =
    chatExpanded.querySelector<HTMLButtonElement>(".chat-close-a");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      chatExpanded.classList.add("hidden");
      chatPanel.classList.remove("hidden");
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !chatExpanded.classList.contains("hidden")) {
      chatExpanded.classList.add("hidden");
      chatPanel.classList.remove("hidden");
    }
  });
};

const setupHeroChatPanel = () => {
  const chatCTA =
    document.querySelector<HTMLButtonElement>(".chat-cta__button");
  const hero = document.querySelector<HTMLElement>(".hero--peach");
  const chatPanel = document.querySelector<HTMLElement>(".chat-panel--hero");

  if (!chatCTA || !hero || !chatPanel) {
    return;
  }

  const closeBtn = chatPanel.querySelector<HTMLButtonElement>(".chat-close");
  const chatForm = chatPanel.querySelector<HTMLFormElement>(".chat-form");
  const chatInput = chatPanel.querySelector<HTMLTextAreaElement>(".chat-input");
  const chatMessages = chatPanel.querySelector<HTMLDivElement>(
    ".chat-panel__messages",
  );

  const openChat = () => {
    hero.classList.add("chat-open");
    chatPanel.hidden = false;
    chatInput?.focus();
  };

  const closeChat = () => {
    hero.classList.remove("chat-open");
    chatPanel.hidden = true;
    chatCTA.style.display = "inline-block";
  };

  chatCTA.addEventListener("click", openChat);

  if (closeBtn) {
    closeBtn.addEventListener("click", closeChat);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hero.classList.contains("chat-open")) {
      closeChat();
    }
  });

  const sendMessage = () => {
    if (!chatInput || !chatMessages) return;
    const value = chatInput.value.trim();
    if (!value) return;

    appendMessage(chatMessages, value, "user");
    chatInput.value = "";
    chatInput.style.height = "auto";

    setTimeout(() => {
      appendMessage(
        chatMessages,
        "🍑 Thanks for your message! (This is a demo reply.)",
        "bot",
      );
    }, 500);
  };

  chatInput?.addEventListener("input", () => {
    if (chatInput) autoResize(chatInput);
  });

  chatInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  chatForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage();
  });
};

const setupConceptCChatPanel = () => {
  const hero = document.querySelector<HTMLElement>(".hero-banner");
  const chatButton =
    document.querySelector<HTMLButtonElement>(".chat-button-c");
  const chatPanel = document.querySelector<HTMLElement>(
    ".chat-panel--concept-c",
  );
  const heroTitle = document.querySelector<HTMLElement>(".hero-banner-text");
  const heroSubtitle = document.querySelector<HTMLElement>(".hero-subtitle");

  if (!hero || !chatButton || !chatPanel || !heroTitle || !heroSubtitle) {
    return;
  }

  const closeBtn = chatPanel.querySelector<HTMLButtonElement>(".chat-close");
  const chatForm = chatPanel.querySelector<HTMLFormElement>(".chat-form");
  const chatInput = chatPanel.querySelector<HTMLTextAreaElement>(".chat-input");
  const chatMessages = chatPanel.querySelector<HTMLDivElement>(
    ".chat-panel__messages",
  );

  const openChat = () => {
    hero.classList.add("is-chat-open");
    chatPanel.hidden = false;
    chatInput?.focus();
    chatMessages?.scrollTo({
      top: chatMessages.scrollHeight,
      behavior: "auto",
    });
  };

  const closeChat = () => {
    hero.classList.remove("is-chat-open");
    chatPanel.hidden = true;
    heroTitle.style.opacity = "1";
    heroSubtitle.style.opacity = "1";
  };

  chatButton.addEventListener("click", openChat);

  if (closeBtn) {
    closeBtn.addEventListener("click", closeChat);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hero.classList.contains("is-chat-open")) {
      closeChat();
    }
  });

  const sendMessage = () => {
    if (!chatInput || !chatMessages) return;
    const value = chatInput.value.trim();
    if (!value) return;

    appendMessage(chatMessages, value, "user");
    chatInput.value = "";
    chatInput.style.height = "auto";

    setTimeout(() => {
      appendMessage(
        chatMessages,
        "🍑 Thanks for your message! (This is a demo reply.)",
        "bot",
      );
    }, 500);
  };

  chatInput?.addEventListener("input", () => {
    if (chatInput) autoResize(chatInput);
  });

  chatInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  chatForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage();
  });
};

const setupIdentityBadgesEditorial = () => {
  const badges = document.querySelectorAll<HTMLElement>(".identity-badge");
  const expandedArea = document.getElementById("identity-expanded-area");

  if (!expandedArea) return;

  const contentMap: Record<
    string,
    { title: string; summary: string; links: string[] }
  > = {
    living: {
      title: "Living Here",
      summary:
        "Daily life in Perry is shaped by safety, reliable services, and the natural beauty of the Wasatch Front.",
      links: [
        "Utilities & Billing",
        "Public Safety",
        "Parks & Recreation",
        "Property Maintenance",
        "City Services Directory",
      ],
    },
    community: {
      title: "Community Life",
      summary:
        "Perry is a place where neighbors wave from their porches and community events still feel like family gatherings.",
      links: [
        "Community Events",
        "Parks & Trails",
        "Youth Programs",
        "Senior Services",
        "Volunteer Opportunities",
      ],
    },
    perfecting: {
      title: "Perfecting Perry",
      summary:
        "Perry is planning thoughtfully for the future — supporting local businesses, improving infrastructure, and guiding development with care.",
      links: [
        "Economic Development",
        "Land Use & Planning",
        "Infrastructure Projects",
        "Long‑Term City Plans",
        "Development Applications",
      ],
    },
  };

  badges.forEach((badge) => {
    badge.addEventListener("click", () => {
      const key = badge.dataset.badge;
      if (!key || !contentMap[key]) return;

      const isActive = badge.classList.contains("active");

      // Collapse if clicking the same badge again
      if (isActive) {
        badge.classList.remove("active");
        badge.setAttribute("aria-expanded", "false");
        expandedArea.classList.remove("visible");
        expandedArea.setAttribute("aria-labelledby", "");
        return;
      }

      // Reset all badges
      badges.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-expanded", "false");
      });

      // Activate clicked badge
      badge.classList.add("active");
      badge.setAttribute("aria-expanded", "true");

      // Update aria-labelledby
      const heading = badge.querySelector("h3");
      if (heading) {
        expandedArea.setAttribute("aria-labelledby", heading.id);
      }

      // Build editorial content
      const { title, summary, links } = contentMap[key];
      expandedArea.innerHTML = `
        <h4>${title}</h4>
        <p>${summary}</p>
        <ul>
          ${links.map((l) => `<li><a href="#">${l}</a></li>`).join("")}
        </ul>
      `;

      // Animate open
      expandedArea.classList.add("visible");
    });

    // Keyboard accessibility
    badge.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        badge.click();
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupIndexChatPanel();
  setupHeroChatPanel();
  setupConceptCChatPanel();
  setupToggleButtons(".calendar-toggle");
  setupToggleButtons(".news-toggle");
  setupIdentityBadgesEditorial();
});
