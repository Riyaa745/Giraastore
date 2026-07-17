const menuButton = document.querySelector(".mobile-menu");
const navigation = document.querySelector(".main-nav");
const dropdownItems = document.querySelectorAll(".nav-item.has-dropdown");

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

dropdownItems.forEach((item) => {
  const trigger = item.querySelector(".nav-trigger");
  trigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !item.classList.contains("open");
    dropdownItems.forEach((other) => {
      other.classList.remove("open");
      other.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
    });
    item.classList.toggle("open", willOpen);
    trigger.setAttribute("aria-expanded", String(willOpen));
  });
});

document.querySelectorAll(".submenu-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const item = trigger.closest(".submenu-item");
    const willOpen = !item.classList.contains("submenu-open");
    item.parentElement.querySelectorAll(".submenu-item").forEach((other) => {
      other.classList.remove("submenu-open");
      other.querySelector(".submenu-trigger")?.setAttribute("aria-expanded", "false");
    });
    item.classList.toggle("submenu-open", willOpen);
    trigger.setAttribute("aria-expanded", String(willOpen));
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-item")) {
    dropdownItems.forEach((item) => item.classList.remove("open"));
  }
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const mainImage = document.querySelector("#main-product-image");
document.querySelectorAll(".thumbnail").forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    document.querySelectorAll(".thumbnail").forEach((item) => item.classList.remove("active"));
    thumbnail.classList.add("active");
    mainImage.style.opacity = "0";
    window.setTimeout(() => {
      mainImage.src = thumbnail.dataset.image;
      mainImage.style.opacity = "1";
    }, 130);
  });
});

document.querySelector(".gallery-wishlist")?.addEventListener("click", (event) => {
  event.currentTarget.classList.toggle("active");
});

document.querySelectorAll(".variant").forEach((variant) => {
  variant.addEventListener("click", () => {
    document.querySelectorAll(".variant").forEach((item) => item.classList.remove("active"));
    variant.classList.add("active");
    document.querySelector("#variant-name").textContent = variant.dataset.variant;
  });
});

let quantity = 1;
document.querySelector(".quantity-control")?.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  if (action === "increase") quantity += 1;
  if (action === "decrease") quantity = Math.max(1, quantity - 1);
  document.querySelector("#quantity").textContent = String(quantity);
});

document.querySelector(".add-cart")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  const cartCount = document.querySelector(".cart-count");
  button.classList.add("added");
  button.querySelector("span").textContent = `Added ${quantity} to Cart`;
  cartCount.textContent = String(Number(cartCount.textContent) + quantity);
  window.setTimeout(() => {
    button.classList.remove("added");
    button.querySelector("span").textContent = "Add to Cart";
  }, 1800);
});

document.querySelector("#pincode-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#pincode");
  const result = document.querySelector("#delivery-result");
  if (/^\d{6}$/.test(input.value)) {
    result.textContent = `Delivery available to ${input.value} within 3–5 working days ✓`;
    result.classList.add("success");
  } else {
    result.textContent = "Please enter a valid 6-digit pincode.";
    result.classList.remove("success");
  }
});

document.querySelectorAll(".detail-tabs button").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".detail-tabs button").forEach((button) => button.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`#${tab.dataset.tab}`).classList.add("active");
  });
});

document.querySelector(".newsletter-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  button.textContent = "Thank you!";
  button.disabled = true;
});
const productHelpFooter=[...document.querySelectorAll('.site-footer .footer-column')].find(column=>column.querySelector('h2')?.textContent.trim()==='Help & Info');
productHelpFooter?.querySelector('h2')?.insertAdjacentHTML('afterend','<a href="help-center.html">Help Center</a>');
productHelpFooter?.insertAdjacentHTML('beforeend','<a href="disclaimer.html">Disclaimer</a>');
const productFooterRoutes={'all products':'shop.html','new arrivals':'shop.html?view=new-arrivals','best sellers':'shop.html?view=best-sellers','stationery':'shop.html?view=stationery','accessories':'shop.html?view=accessories','gifts':'shop.html?view=gifts','lifestyle':'shop.html?view=lifestyle','about us':'about.html','contact us':'contact.html','faq':'faq.html','shipping policy':'shipping-policy.html','return & refund policy':'return-policy.html','terms & conditions':'terms.html','privacy policy':'privacy-policy.html','help center':'help-center.html','disclaimer':'disclaimer.html'};
document.querySelectorAll('.site-footer a').forEach(link=>{const href=productFooterRoutes[link.textContent.trim().toLowerCase()];if(href)link.href=href});
