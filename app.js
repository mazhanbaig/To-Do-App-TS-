"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (!menuBtn || !mobileMenu) {
        console.warn("Navbar elements not found.");
        return;
    }
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
});
// theme 
document.addEventListener("DOMContentLoaded", () => {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    }
});
function applyTheme(theme) {
    const html = document.documentElement;
    html.classList.remove("light");
    html.classList.add(theme);
}
// done end
