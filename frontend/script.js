
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Open and close the mobile navigation menu.
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the menu after clicking a navigation link.
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Automatically update the copyright year.
document.getElementById("year").textContent = new Date().getFullYear();

// Temporary contact form response until FastAPI is connected.
document.getElementById("contact-form").addEventListener("submit", (event) => {
    event.preventDefault();

    document.getElementById("form-status").textContent =
        "The backend is not connected yet. We'll enable message sending next.";
});
