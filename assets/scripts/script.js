/* =========================================================
   FARIBA ART
   Main JavaScript
========================================================= */

/* =========================================================
   ARTWORK DATA
========================================================= */

const artworks = [
  {
    id: 1,

    image: "./assets/img/02.jpg",

    title: "بانوی گل‌ها",

    description:
      "ترکیبی از رنگ، فرم و بافت که تصویری آرام و شاعرانه ایجاد می‌کند.",

    tag: "HANDMADE",

    /*
     * 02.jpg:
     * Original image = 947 × 1280
     * Artwork area ≈ 947 × 793
     */
    ratio: 1.1942,

    orientation: "landscape",
  },

  {
    id: 2,

    image: "./assets/img/01.jpg",

    title: "پرتره",

    description: "اثری با تمرکز بر چهره، بافت و استفاده از تضادهای ظریف رنگی.",

    tag: "HANDMADE",

    /*
     * 01.jpg:
     * Original image = 591 × 1280
     * Artwork area ≈ 591 × 794
     */
    ratio: 0.7443,

    orientation: "portrait",
  },
];

/* =========================================================
   DOM
========================================================= */

const gallery = document.getElementById("gallery");

const cursorGlow = document.querySelector(".cursor-glow");

const menuToggle = document.querySelector(".menu-toggle");

const mobileMenu = document.getElementById("mobile-menu");

const mobileLinks = document.querySelectorAll(".mobile-menu a");

const lightbox = document.getElementById("lightbox");

const lightboxClose = document.getElementById("lightboxClose");

const lightboxPrev = document.getElementById("lightboxPrev");

const lightboxNext = document.getElementById("lightboxNext");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxImageWrap = document.getElementById("lightboxImageWrap");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxDescription = document.getElementById("lightboxDescription");

const lightboxCurrent = document.getElementById("lightboxCurrent");

const lightboxTotal = document.getElementById("lightboxTotal");

/* =========================================================
   GALLERY
========================================================= */

function renderGallery() {
  if (!gallery) {
    return;
  }

  gallery.innerHTML = "";

  artworks.forEach((artwork, index) => {
    const article = document.createElement("article");

    article.className = "artwork";

    article.style.setProperty("--art-ratio", artwork.ratio);

    const visual = document.createElement("div");

    visual.className = "artwork-visual";

    visual.style.setProperty("--art-ratio", artwork.ratio);

    const tag = document.createElement("div");

    tag.className = "artwork-tag";

    tag.textContent = artwork.tag;

    const image = document.createElement("img");

    image.src = artwork.image;

    image.alt = artwork.title;

    image.loading = index === 0 ? "eager" : "lazy";

    image.decoding = "async";

    visual.appendChild(image);
    visual.appendChild(tag);

    visual.addEventListener("click", () => {
      openLightbox(index);
    });

    const meta = document.createElement("div");

    meta.className = "artwork-meta";

    const number = document.createElement("div");

    number.className = "artwork-number";

    number.textContent = String(index + 1).padStart(2, "0");

    const title = document.createElement("h3");

    title.className = "artwork-title";

    title.textContent = artwork.title;

    const description = document.createElement("p");

    description.className = "artwork-description";

    description.textContent = artwork.description;

    meta.appendChild(number);
    meta.appendChild(title);
    meta.appendChild(description);

    article.appendChild(visual);
    article.appendChild(meta);

    gallery.appendChild(article);
  });
}

/* =========================================================
   LIGHTBOX STATE
========================================================= */

let currentArtworkIndex = 0;

/* =========================================================
   OPEN LIGHTBOX
========================================================= */

function openLightbox(index) {
  if (!artworks.length) {
    return;
  }

  currentArtworkIndex = index;

  updateLightbox();

  if (lightbox && typeof lightbox.showModal === "function") {
    lightbox.showModal();
  } else if (lightbox) {
    lightbox.setAttribute("open", "");
  }

  document.body.classList.add("lightbox-open");
}

/* =========================================================
   UPDATE LIGHTBOX
========================================================= */

function updateLightbox() {
  const artwork = artworks[currentArtworkIndex];

  if (!artwork) {
    return;
  }

  lightboxImage.src = artwork.image;

  lightboxImage.alt = artwork.title;

  lightboxTitle.textContent = artwork.title;

  lightboxDescription.textContent = artwork.description;

  lightboxCurrent.textContent = String(currentArtworkIndex + 1).padStart(
    2,
    "0",
  );

  lightboxTotal.textContent = String(artworks.length).padStart(2, "0");

  /*
   * This is important.
   *
   * The original JPEGs have black bars baked
   * into the actual image.
   *
   * We tell the lightbox the real artwork ratio
   * and use object-fit: cover in CSS so those
   * bars are cropped instead of stretching the art.
   */

  lightboxImageWrap.style.setProperty("--art-ratio", artwork.ratio);
}

/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {
  if (!lightbox) {
    return;
  }

  if (typeof lightbox.close === "function") {
    lightbox.close();
  } else {
    lightbox.removeAttribute("open");
  }

  document.body.classList.remove("lightbox-open");
}

/* =========================================================
   PREVIOUS
========================================================= */

function showPreviousArtwork() {
  currentArtworkIndex--;

  if (currentArtworkIndex < 0) {
    currentArtworkIndex = artworks.length - 1;
  }

  updateLightbox();
}

/* =========================================================
   NEXT
========================================================= */

function showNextArtwork() {
  currentArtworkIndex++;

  if (currentArtworkIndex >= artworks.length) {
    currentArtworkIndex = 0;
  }

  updateLightbox();
}

/* =========================================================
   LIGHTBOX EVENTS
========================================================= */

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener("click", showPreviousArtwork);
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", showNextArtwork);
}

/*
 * Clicking the dark area outside the image
 * closes the lightbox.
 */

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.hasAttribute("open")) {
    return;
  }

  switch (event.key) {
    case "Escape":
      closeLightbox();

      break;

    case "ArrowLeft":
      showNextArtwork();

      break;

    case "ArrowRight":
      showPreviousArtwork();

      break;
  }
});

/* =========================================================
   MOBILE MENU
========================================================= */

function openMobileMenu() {
  menuToggle.classList.add("active");

  mobileMenu.classList.add("active");

  mobileMenu.setAttribute("aria-hidden", "false");

  menuToggle.setAttribute("aria-expanded", "true");

  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  menuToggle.classList.remove("active");

  mobileMenu.classList.remove("active");

  mobileMenu.setAttribute("aria-hidden", "true");

  menuToggle.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.contains("active");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

/* =========================================================
   CURSOR GLOW
========================================================= */

if (cursorGlow) {
  let mouseX = 0;
  let mouseY = 0;

  let glowX = 0;
  let glowY = 0;

  window.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;

      mouseY = event.clientY;
    },
    {
      passive: true,
    },
  );

  function animateCursor() {
    glowX += (mouseX - glowX) * 0.08;

    glowY += (mouseY - glowY) * 0.08;

    cursorGlow.style.left = `${glowX}px`;

    cursorGlow.style.top = `${glowY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");

const navLinks = document.querySelectorAll(".desktop-nav a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.id;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;

        link.classList.toggle("active", isActive);
      });
    });
  },
  {
    threshold: 0.35,
  },
);

sections.forEach((section) => {
  observer.observe(section);
});

/* =========================================================
   IMAGE LOAD ERROR
========================================================= */

document.addEventListener(
  "error",
  (event) => {
    const element = event.target;

    if (element instanceof HTMLImageElement) {
      element.classList.add("image-error");
    }
  },
  true,
);

/* =========================================================
   INITIALIZE
========================================================= */

renderGallery();
