const menuButton = document.querySelector(".mobile-menu");
const navigation = document.querySelector(".main-nav");

document.querySelectorAll(".product-card h3 a").forEach((link) => {
  link.href = "product.html";
});

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


const heroSlides = document.querySelectorAll(".hero-slide");
const sliderDots = document.querySelectorAll(".slider-dots button");
let activeSlide = 0;
let sliderTimer;

// ==================== MOBILE NAVIGATION ====================
menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

// ==================== HERO SLIDER ====================
function showSlide(index) {
  activeSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === activeSlide);
  });

  sliderDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.classList.toggle("active", isActive);
    if (isActive) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

function startSlider() {
  window.clearInterval(sliderTimer);
  sliderTimer = window.setInterval(() => showSlide(activeSlide + 1), 5000);
}

sliderDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startSlider();
  });
});

document.querySelector(".hero-slider")?.addEventListener("mouseenter", () => {
  window.clearInterval(sliderTimer);
});
document.querySelector(".hero-slider")?.addEventListener("mouseleave", startSlider);

startSlider();

// ==================== TESTIMONIAL SCROLLER ====================
const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialPrevious = document.querySelector(".testimonial-arrow.previous");
const testimonialNext = document.querySelector(".testimonial-arrow.next");

function scrollTestimonials(direction) {
  const card = testimonialTrack?.querySelector(".testimonial-card");
  if (!card || !testimonialTrack) return;
  const gap = Number.parseFloat(getComputedStyle(testimonialTrack).gap) || 0;
  testimonialTrack.scrollBy({
    left: direction * (card.getBoundingClientRect().width + gap),
    behavior: "smooth"
  });
}

testimonialPrevious?.addEventListener("click", () => scrollTestimonials(-1));
testimonialNext?.addEventListener("click", () => scrollTestimonials(1));

// ==================== NEWSLETTER FORM ====================
document.querySelector(".newsletter-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  button.textContent = "Thank you!";
});
const homeCatalogRoutes={'new arrivals':'new-arrivals','best sellers':'best-sellers','sale':'sale','all products':'all','stationery':'stationery','notebooks':'notebooks','pens':'pens','stickers':'stickers','washi tape':'washi-tape','pencil cases':'pencil-cases','highlighters':'highlighters','gifts':'gifts','gift sets':'gift-sets','birthday gifts':'birthday-gifts','return gifts':'return-gifts','gift boxes':'gift-boxes','lifestyle':'lifestyle','drinkware':'drinkware','home decor':'home-decor','desk setup':'desk-setup','organizers':'organizers','accessories':'accessories','tote bags':'tote-bags','pouches':'pouches','keychains':'keychains','phone accessories':'phone-accessories','plush & toys':'toys','jewellery':'jewellery'};
document.querySelectorAll('a').forEach(link=>{const route=homeCatalogRoutes[link.textContent.trim().toLowerCase()];if(route)link.href=route==='all'?'shop.html':`shop.html?view=${route}`});
