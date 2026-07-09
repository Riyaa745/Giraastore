const menuButton = document.querySelector(".mobile-menu");
const navigation = document.querySelector(".main-nav");
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
