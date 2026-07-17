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
const aboutHelpFooter=[...document.querySelectorAll('.site-footer .footer-column')].find(column=>column.querySelector('h2')?.textContent.trim()==='Help & Info');
aboutHelpFooter?.querySelector('h2')?.insertAdjacentHTML('afterend','<a href="help-center.html">Help Center</a>');
const aboutCatalogRoutes={'new arrivals':'new-arrivals','best sellers':'best-sellers','sale':'sale','all products':'all','stationery':'stationery','notebooks':'notebooks','pens':'pens','stickers':'stickers','washi tape':'washi-tape','pencil cases':'pencil-cases','highlighters':'highlighters','gifts':'gifts','gift sets':'gift-sets','birthday gifts':'birthday-gifts','return gifts':'return-gifts','gift boxes':'gift-boxes','lifestyle':'lifestyle','drinkware':'drinkware','home decor':'home-decor','desk setup':'desk-setup','organizers':'organizers','accessories':'accessories','tote bags':'tote-bags','pouches':'pouches','keychains':'keychains','phone accessories':'phone-accessories','plush & toys':'toys','jewellery':'jewellery'};
document.querySelectorAll('a').forEach(link=>{const route=aboutCatalogRoutes[link.textContent.trim().toLowerCase()];if(route)link.href=route==='all'?'shop.html':`shop.html?view=${route}`});
