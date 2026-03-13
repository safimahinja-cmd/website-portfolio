document.getElementById("year").textContent = String(new Date().getFullYear());

const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lbImage");
const lbCaption = document.getElementById("lbCaption");
const lbCounter = document.getElementById("lbCounter");
const prevBtn = document.getElementById("lbPrev");
const nextBtn = document.getElementById("lbNext");

const thumbs = Array.from(document.querySelectorAll(".thumb"));
const items = thumbs.map((btn, idx) => {
  const img = btn.querySelector("img");
  return { full: btn.getAttribute("data-full") || img.src, alt: img.alt || `Image ${idx + 1}` };
});

let currentIndex = 0;

function setLightboxImage(index) {
  currentIndex = (index + items.length) % items.length;
  const { full, alt } = items[currentIndex];
  lbImage.src = full;
  lbImage.alt = alt;
  lbCaption.textContent = alt;
  lbCounter.textContent = `${currentIndex + 1} / ${items.length}`;
}

function openLightbox(index) {
  setLightboxImage(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";
}

function showNext() { setLightboxImage(currentIndex + 1); }
function showPrev() { setLightboxImage(currentIndex - 1); }

thumbs.forEach((btn) => btn.addEventListener("click", () => openLightbox(Number(btn.dataset.index || "0"))));
lightbox.addEventListener("click", (e) => { if (e.target?.getAttribute?.("data-close") === "true") closeLightbox(); });
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
});