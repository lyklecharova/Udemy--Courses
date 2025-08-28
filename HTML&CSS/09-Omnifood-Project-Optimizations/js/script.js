
// Make mobile nav
const btnNavElement = document.querySelector(".btn-mobile-nav");
const headerElement = document.querySelector(".header");
btnNavElement.addEventListener("click", function () {
  headerElement.classList.toggle("nav-open");
});

// Smooth scrolling animation
const allLinks = document.querySelectorAll('a:link');
allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    // Scroll back to top
    if (href === "#") window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionElement = document.querySelectorAll(href);
      sectionElement.forEach(el => el.scrollIntoView({ behavior: "smooth" }));
    }

    // Close mobile nav
    if (link.classList.contains('main-nav-link'))
      headerElement.classList.toggle("nav-open");
  });

});

// Sticky nav
const sectionHeroElement = document.querySelector(".section-hero");
// Create a new IntersectionObserver
// It monitors whether a specific element enters or leaves the viewport
const obs = new IntersectionObserver(function (entries) {
  const ent = entries[0];
  if (!ent.isIntersecting) {
    document.body.classList.add("sticky");
  } else {
    document.body.classList.remove("sticky");
  }
},
  {
    // In the viewport
    // root: null means we are observing the viewport itself
    root: null,

    // threshold: 0 means the callback triggers as soon as even one pixel of the element
    // appears or disappears in the viewport
    threshold: 0,
    rootMargin: '-80px',
  });

// Tell the observer to watch the hero section
obs.observe(sectionHeroElement);



// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
