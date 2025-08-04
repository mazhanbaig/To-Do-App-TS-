const themeSelect = document.getElementById("theme") as HTMLSelectElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
const saveBtn = document.querySelector("button.bg-gradient-to-br") as HTMLButtonElement;

// 🌙 Load saved settings on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
  }
});

// 🌗 Change theme
themeSelect.addEventListener("change", (e) => {
  const value = (e.target as HTMLSelectElement).value;
  applyTheme(value);
  localStorage.setItem("theme", value);
});

// 🧠 Apply light or dark theme to <html>
function applyTheme(theme: string) {
  const html = document.documentElement;
  html.classList.remove("light");
  html.classList.add(theme);
}


// 🗑️ Reset all tasks
resetBtn.addEventListener("click", () => {
  const confirmReset = confirm("Are you sure you want to delete all tasks?");
  if (confirmReset) {
    localStorage.removeItem("taskList");
    alert("All tasks have been reset.");
  }
});

  // ✅ Navbar Toggle
  const menuBtn = document.getElementById("menu-btn") as HTMLButtonElement | null;
  const mobileMenu = document.getElementById("mobile-menu") as HTMLDivElement | null;

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
