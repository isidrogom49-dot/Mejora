const modal = document.getElementById("modal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const menuBtn = document.querySelector('.menu-btn');
const bannerImg = document.getElementById("bannerImg");

// ------------------- LOADER -------------------
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 500);
    }, 2500);
});

// ------------------- FUNCIONES MODAL -------------------
function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

// ------------------- EVENTOS -------------------
openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

menuBtn.addEventListener("click", () => {
    closeModal();
});

// ------------------- EFECTO 3D BANNER -------------------
bannerImg.addEventListener("mousemove", (e) => {
    const rect = bannerImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    bannerImg.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

bannerImg.addEventListener("mouseleave", () => {
    bannerImg.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
});