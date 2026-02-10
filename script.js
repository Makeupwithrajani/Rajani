// Mobile nav
const hamburger = document.querySelector("[data-hamburger]");
const navlinks = document.querySelector("[data-navlinks]");
if (hamburger && navlinks) {
  hamburger.addEventListener("click", () => navlinks.classList.toggle("open"));
}

// Active link based on page
const page = document.body.getAttribute("data-page");
document.querySelectorAll("[data-nav] a").forEach(a => {
  if (a.getAttribute("data-page") === page) a.classList.add("active");
});

// Portfolio filter (only works on portfolio page)
const chips = document.querySelectorAll("[data-chip]");
const works = document.querySelectorAll("[data-work]");
if (chips.length && works.length) {
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      const category = chip.getAttribute("data-chip");
      works.forEach(w => {
        const tags = (w.getAttribute("data-tags") || "").split(",");
        const show = category === "all" || tags.includes(category);
        w.style.display = show ? "block" : "none";
      });
    });
  });
}

// Contact form -> mailto
const form = document.querySelector("[data-contact-form]");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("[name='name']").value.trim();
    const phone = form.querySelector("[name='phone']").value.trim();
    const email = form.querySelector("[name='email']").value.trim();
    const message = form.querySelector("[name='message']").value.trim();

    const subject = encodeURIComponent(`Makeup Booking Inquiry - ${name || "Client"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    // Change the email below to Rajani's email:
    window.location.href = `mailto:rajani@example.com?subject=${subject}&body=${body}`;
  });
}
