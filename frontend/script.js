
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


const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Replace this with your deployed FastAPI backend URL.
// Do not use localhost for a live GitHub Pages website.
const API_URL = "YOUR_DEPLOYED_BACKEND_URL/api/contact/";

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    const contactData = {
        name: formData.get("name").trim(),
        email: formData.get("email").trim(),
        message: formData.get("message").trim()
    };

    formStatus.textContent = "Sending message...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.detail
                    ? JSON.stringify(result.detail)
                    : "Unable to send your message."
            );
        }

        formStatus.textContent =
            "Message sent successfully! Thank you for contacting me.";

        contactForm.reset();

    } catch (error) {
        console.error("Contact form error:", error);

        formStatus.textContent =
            "Could not send your message. Please try again later.";
    }
});
