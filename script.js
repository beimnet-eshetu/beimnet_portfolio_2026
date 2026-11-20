// ----- Dark / light mode toggle -----
const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Remember the visitor's choice (falls back safely if storage is blocked)
let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("theme") || "light";
} catch (e) {}
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = document.body.classList.contains("dark") ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// ----- Contact form validation -----
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  statusText.className = "";

  if (!name || !email || !message) {
    statusText.textContent = "Please fill in all fields.";
    statusText.classList.add("error");
    return;
  }

  if (!emailPattern.test(email)) {
    statusText.textContent = "Please enter a valid email address.";
    statusText.classList.add("error");
    return;
  }

  // This form only checks input. To really receive messages later,
  // connect it to a service such as Formspree or Netlify Forms.
  statusText.textContent = "Thanks, " + name + "! Your message looks good.";
  statusText.classList.add("success");
  form.reset();
});

// ----- Footer year -----
document.getElementById("year").textContent = new Date().getFullYear();
