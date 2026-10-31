// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// Dynamic copyright year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Scroll reveal with a subtle stagger effect
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const siblings = [...entry.target.parentElement.children];
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
} else {
    revealItems.forEach(item => item.classList.add("visible"));
}

// Highlight the navigation item for the section currently in view
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${entry.target.id}`
                    );
                });
            }
        });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
}

// Gentle pointer tilt on project preview cards (desktop only)
if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".project-visual").forEach(card => {
        card.addEventListener("mousemove", event => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(700px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}


// Floating social links menu
const socialFloat = document.getElementById("socialFloat");
const socialFloatToggle = document.getElementById("socialFloatToggle");
const socialFloatMenu = document.getElementById("socialFloatMenu");

if (socialFloat && socialFloatToggle && socialFloatMenu) {
    const socialAnchors = socialFloatMenu.querySelectorAll("a");

    const setSocialMenu = (open) => {
        socialFloat.classList.toggle("is-open", open);
        socialFloatToggle.setAttribute("aria-expanded", String(open));
        socialFloatToggle.setAttribute("aria-label", open ? "Close social links" : "Open social links");
        socialFloatMenu.setAttribute("aria-hidden", String(!open));
        socialAnchors.forEach(anchor => {
            anchor.setAttribute("tabindex", open ? "0" : "-1");
        });
    };

    setSocialMenu(false);

    socialFloatToggle.addEventListener("click", () => {
        setSocialMenu(!socialFloat.classList.contains("is-open"));
    });

    document.addEventListener("click", event => {
        if (!socialFloat.contains(event.target)) setSocialMenu(false);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") setSocialMenu(false);
    });
}
