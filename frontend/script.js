const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.textContent = document.body.classList.contains("light") ? "☾" : "☀";
});

menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  formStatus.textContent = "Sending...";

  const data = Object.fromEntries(new FormData(contactForm).entries());

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    formStatus.textContent = result.message;
    if (response.ok) contactForm.reset();
  } catch (error) {
    formStatus.textContent =
      "Backend is not running. Start the server with: npm run dev";
  }
});
