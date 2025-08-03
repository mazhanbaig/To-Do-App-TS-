document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn") as HTMLButtonElement | null;
  const mobileMenu = document.getElementById("mobile-menu") as HTMLDivElement | null;

  if (!menuBtn || !mobileMenu) {
    console.warn("Navbar elements not found.");
    return;
  }

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
});
