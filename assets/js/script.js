'use strict';

/**
 * navbar toggle
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
});

/**
 * toggle the navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}

/**
 * back to top & header
 */

const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * video source switcher (desktop vs mobile)
 */

const bgVideo = document.getElementById('bgVideo'); // make sure your <video> has id="bgVideo"
if (bgVideo) {
  const source = bgVideo.querySelector('source');
  if (window.innerWidth <= 768) { // mobile breakpoint
    source.src = 'assets/videos/CrystalCaveProject/Banner-mobile.mp4';
    bgVideo.load();
    bgVideo.play().catch(() => {}); // avoids autoplay errors
  }
}