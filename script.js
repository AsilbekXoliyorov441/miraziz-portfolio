// Loyihalar karuseli (Owl Carousel)
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

$(".projects-carousel").owlCarousel({
    loop: true,
    margin: 20,
    autoplay: !reduceMotion,
    autoplayTimeout: 3000,
    autoplaySpeed: 800,
    autoplayHoverPause: true,
    smartSpeed: 800,
    dots: true,
    responsive: {
        0: { items: 1 },
        550: { items: 2 },
        800: { items: 3 }
    }
});

// Scroll qilganda elementlarni ketma-ket ko'rsatish
const revealItems = document.querySelectorAll(".section-title, .about-card, .cards .card, .projects-carousel, .contact-box, .footer-contact");

revealItems.forEach((el) => {
    el.classList.add("reveal");
    const siblings = el.parentElement.children;
    if (el.classList.contains("card")) {
        el.style.setProperty("--delay", `${Array.from(siblings).indexOf(el) * 0.12}s`);
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealItems.forEach((el) => observer.observe(el));

// Karta ichida sichqonchaga ergashuvchi nur
document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
    card.addEventListener("mouseleave", () => {
        card.style.setProperty("--y", "-100%");
    });
});
