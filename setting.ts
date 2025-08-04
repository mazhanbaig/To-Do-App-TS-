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
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.remove("bg-gradient-to-br", "from-black", "via-gray-900", "to-black", "text-white");
    root.classList.add("bg-white", "text-black");
  } else {
    root.classList.add("bg-gradient-to-br", "from-black", "via-gray-900", "to-black", "text-white");
    root.classList.remove("bg-white", "text-black");
  }
}

// 🗑️ Reset all tasks
resetBtn.addEventListener("click", () => {
  const confirmReset = confirm("Are you sure you want to delete all tasks?");
  if (confirmReset) {
    localStorage.removeItem("taskList");
    alert("All tasks have been reset.");
  }
});