const menuButton = document.querySelector(".mobile-menu");
const navigation = document.querySelector(".main-nav");

const dropdownItems = document.querySelectorAll(".nav-item.has-dropdown");

dropdownItems.forEach((item) => {
  const trigger = item.querySelector(".nav-trigger");
  trigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !item.classList.contains("open");
    dropdownItems.forEach((otherItem) => {
      otherItem.classList.remove("open");
      otherItem.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
    });
    item.classList.toggle("open", willOpen);
    trigger.setAttribute("aria-expanded", String(willOpen));
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".nav-item.has-dropdown")) return;
  dropdownItems.forEach((item) => {
    item.classList.remove("open");
    item.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
  });
});

const submenuTriggers = document.querySelectorAll(".submenu-trigger");

submenuTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const submenuItem = trigger.closest(".submenu-item");
    const willOpen = !submenuItem.classList.contains("submenu-open");

    submenuItem.parentElement.querySelectorAll(".submenu-item").forEach((item) => {
      item.classList.remove("submenu-open");
      item.querySelector(".submenu-trigger")?.setAttribute("aria-expanded", "false");
    });

    submenuItem.classList.toggle("submenu-open", willOpen);
    trigger.setAttribute("aria-expanded", String(willOpen));
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".shop-menu")) return;
  document.querySelectorAll(".submenu-item").forEach((item) => {
    item.classList.remove("submenu-open");
    item.querySelector(".submenu-trigger")?.setAttribute("aria-expanded", "false");
  });
});



menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open menu");
  });
});

document.querySelector(".newsletter-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  button.textContent = "Thank you!";
  button.disabled = true;
});
