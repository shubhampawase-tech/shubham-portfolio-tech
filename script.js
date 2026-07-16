// ==============================
// Portfolio Script
// ==============================

// Always open website from top
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }

    document.body.classList.add("loaded");
});

// ==============================
// Mobile Menu
// ==============================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
        });
    });

}

// ==============================
// Reveal Animation
// ==============================

function runCounter(el) {

    if (el.dataset.done) return;

    el.dataset.done = "1";

    const target = parseFloat(el.dataset.target);
    const decimal = el.dataset.decimal === "true";

    let value = 0;
    const steps = 55;
    const inc = target / steps;

    const timer = setInterval(() => {

        value += inc;

        if (value >= target) {
            value = target;
            clearInterval(timer);
        }

        el.textContent =
            (decimal ? value.toFixed(1) : Math.floor(value)) + "+";

    }, 28);

}

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            entry.target
                .querySelectorAll("[data-target]")
                .forEach(runCounter);

        }

    });

}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ==============================
// GitHub Contribution Grid
// ==============================

const grid = document.querySelector(".contribution-grid");

if (grid) {

    for (let i = 0; i < 182; i++) {

        const s = document.createElement("span");

        s.style.setProperty(
            "--o",
            (0.08 + Math.random() * 0.72).toFixed(2)
        );

        grid.appendChild(s);

    }

}

// ==============================
// Image Lightbox
// ==============================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

if (lightbox && lightboxImg) {

    document.querySelectorAll("[data-image]").forEach(btn => {

        btn.addEventListener("click", () => {

            lightboxImg.src = btn.dataset.image;
            lightbox.classList.add("open");

        });

    });

    if (lightboxClose) {

        lightboxClose.addEventListener("click", () => {

            lightbox.classList.remove("open");

        });

    }

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            lightbox.classList.remove("open");

        }

    });

}

// ==============================
// Scroll Top
// ==============================

const scrollTop = document.getElementById("scrollTop");

if (scrollTop) {

    window.addEventListener("scroll", () => {

        scrollTop.classList.toggle(
            "show",
            window.scrollY > 600
        );

    });

    scrollTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// ==============================
// Footer Year
// ==============================

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}
// ==============================
// ==============================
// Contact Form (Web3Forms)
// ==============================

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formResult = document.getElementById("formResult");

if (contactForm && submitBtn && formResult) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        formResult.textContent = "";
        formResult.style.color = "";

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            console.log("Web3Forms response:", result);

            if (result.success) {
                formResult.textContent = "✅ Message sent successfully!";
                formResult.style.color = "#4ade80";
                contactForm.reset();
            } else {
                formResult.textContent =
                    "❌ " + (result.message || "Message could not be sent.");
                formResult.style.color = "#ef4444";
            }
        } catch (error) {
            console.error("Form error:", error);

            formResult.textContent =
                "❌ Network error. Please try again.";
            formResult.style.color = "#ef4444";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send message";
        }
    });
}