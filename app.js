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
