const artworks = [
  {
    number: "01",
    title: "شکوه سبز",
    image: "1.jpg",
    description: "ترکیبی از رزین، رنگ و جزئیات طلایی با الهام از فضای کلاسیک.",
    materials: "رزین / رنگ اکریلیک / متریال ترکیبی",
    label: "MIXED MEDIA",
  },
  {
    number: "02",
    title: "بانوی گل‌ها",
    image: "photo_3_2026-09-14_17-07-06.jpg",
    description: "چهره‌ای میان گل و طلا؛ ترکیبی از بافت، رنگ و جزئیات دست‌ساز.",
    materials: "رنگ اکریلیک / رزین / سرامیک / جزئیات طلایی",
    label: "MIXED MEDIA",
  },
];

const gallery = document.querySelector("#artworkGallery");

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxDescription = document.querySelector("#lightboxDescription");
const lightboxMaterials = document.querySelector("#lightboxMaterials");
const lightboxLabel = document.querySelector("#lightboxLabel");
const lightboxIndex = document.querySelector(".lightbox-index");

const siteHeader = document.querySelector("#siteHeader");

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

const cursorGlow = document.querySelector(".cursor-glow");

let currentArtwork = 0;

/* =========================================================
   RENDER ARTWORKS
========================================================= */

function renderArtworks() {
  if (!gallery) return;

  const fragment = document.createDocumentFragment();

  artworks.forEach((artwork, index) => {
    const article = document.createElement("article");

    article.className = "artwork reveal";
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-label", `مشاهده ${artwork.title}`);

    article.innerHTML = `
      <div class="artwork-label">
        ${artwork.number} / ARTWORK
      </div>

      <div class="artwork-visual">
        <img
          src="${artwork.image}"
          alt="اثر ${artwork.title} از FARIBA ART"
          loading="${index === 0 ? "eager" : "lazy"}"
        >
      </div>

      <div class="artwork-info">

        <div class="artwork-number">
          ${artwork.number}
        </div>

        <div class="artwork-copy">

          <h3>
            ${artwork.title}
          </h3>

          <p>
            ${artwork.description}
          </p>

          <span class="artwork-materials">
            متریال: ${artwork.materials}
          </span>

        </div>

      </div>
    `;

    article.addEventListener("click", () => {
      openLightbox(index);
    });

    article.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });

    fragment.appendChild(article);
  });

  gallery.appendChild(fragment);
}

/* =========================================================
   LIGHTBOX
========================================================= */

function updateLightbox(index) {
  currentArtwork = (index + artworks.length) % artworks.length;

  const artwork = artworks[currentArtwork];

  lightboxImage.src = artwork.image;

  lightboxImage.alt = `اثر ${artwork.title} از FARIBA ART`;

  lightboxTitle.textContent = artwork.title;

  lightboxDescription.textContent = artwork.description;

  lightboxMaterials.textContent = `متریال: ${artwork.materials}`;

  lightboxLabel.textContent = artwork.label;

  lightboxIndex.textContent = artwork.number;
}

function openLightbox(index) {
  updateLightbox(index);

  lightbox.classList.add("is-open");

  lightbox.setAttribute("aria-hidden", "false");

  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.classList.remove("lightbox-open");
}

function nextArtwork() {
  updateLightbox(currentArtwork + 1);
}

function previousArtwork() {
  updateLightbox(currentArtwork - 1);
}

/* =========================================================
   LIGHTBOX EVENTS
========================================================= */

function setupLightbox() {
  document.querySelectorAll("[data-lightbox-close]").forEach((element) => {
    element.addEventListener("click", closeLightbox);
  });

  document
    .querySelector(".lightbox-next")
    ?.addEventListener("click", nextArtwork);

  document
    .querySelector(".lightbox-prev")
    ?.addEventListener("click", previousArtwork);
}

/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

function setupKeyboard() {
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowRight") {
      nextArtwork();
    }

    if (event.key === "ArrowLeft") {
      previousArtwork();
    }
  });
}

/* =========================================================
   HEADER
========================================================= */

function setupHeader() {
  const handleScroll = () => {
    if (!siteHeader) return;

    siteHeader.classList.toggle("scrolled", window.scrollY > 40);
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });
}

/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  const closeMenu = () => {
    menuToggle.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");

    mobileMenu.classList.remove("is-open");

    mobileMenu.setAttribute("aria-hidden", "true");

    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    mobileMenu.classList.toggle("is-open", isOpen);

    mobileMenu.setAttribute("aria-hidden", String(!isOpen));

    document.body.classList.toggle("menu-open", isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* =========================================================
   SCROLL REVEAL
========================================================= */

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");

        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
}

/* =========================================================
   CURSOR GLOW
========================================================= */

function setupCursorGlow() {
  if (!cursorGlow) return;

  if (window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      cursorGlow.style.left = `${event.clientX}px`;

      cursorGlow.style.top = `${event.clientY}px`;
    },
    {
      passive: true,
    },
  );
}

/* =========================================================
   INITIALIZE
========================================================= */

renderArtworks();

setupLightbox();

setupKeyboard();

setupHeader();

setupMobileMenu();

setupRevealAnimations();

setupCursorGlow();
