
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Open and close the mobile navigation menu.
if (menuToggle && navLinks) {
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
}

// Automatically update the copyright year.
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Contact form configuration.
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const API_URL = "https://portfolio-p6q3.onrender.com/api/contact/";

// Submit the contact form to the FastAPI backend.
if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const formData = new FormData(contactForm);

        const contactData = {
            name: formData.get("name").trim(),
            email: formData.get("email").trim(),
            message: formData.get("message").trim()
        };

        contactStatus.textContent = "Sending your message...";

        if (submitButton) {
            submitButton.disabled = true;
        }

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
                const errorDetail = Array.isArray(result.detail)
                    ? result.detail.map((item) => item.msg).join(", ")
                    : result.detail;

                throw new Error(
                    errorDetail || "Unable to send your message."
                );
            }

            contactStatus.textContent =
                "Message sent successfully! Thank you for contacting me.";

            contactForm.reset();

        } catch (error) {
            console.error("Contact form error:", error);

            contactStatus.textContent =
                "Could not send your message. Please try again later.";
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
}
