// Zhoopin Restaurant — plain JavaScript (no libraries)

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const menuIconOpen = document.getElementById("menuIconOpen");
const menuIconClose = document.getElementById("menuIconClose");

function setMenu(open) {
  mobileNav.classList.toggle("hidden", !open);
  menuIconOpen.classList.toggle("hidden", open);
  menuIconClose.classList.toggle("hidden", !open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("click", function () {
  setMenu(mobileNav.classList.contains("hidden"));
});

// Close the mobile menu after choosing a section
mobileNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    setMenu(false);
  });
});

// Reveal cards on scroll
const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach(function (el) {
  revealObserver.observe(el);
});

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-img").forEach(function (img) {
  img.addEventListener("click", function () {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.add("hidden");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !lightbox.classList.contains("hidden")) closeLightbox();
});
