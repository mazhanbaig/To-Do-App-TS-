"use strict";
const form = document.getElementsByTagName("form")[0];
const savebtn = document.getElementsByClassName("savebtn")[0];
const editBtn = document.getElementById("editBtn");
document.addEventListener("DOMContentLoaded", () => {
    const nameEl = document.getElementById("name");
    const passionEl = document.getElementById("passion");
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const bioInput = form.querySelector('textarea');
    // Load stored data or empty
    const userName = localStorage.getItem("userName") || "";
    const userPassion = localStorage.getItem("userPassion") || "";
    const userEmail = localStorage.getItem("userEmail") || "";
    const userBio = localStorage.getItem("userBio") || "";
    function showProfile() {
        form.style.display = "none";
        editBtn.style.display = "inline-block";
        nameEl.textContent = localStorage.getItem("userName") || "";
        passionEl.textContent = localStorage.getItem("userPassion") || "";
    }
    function showForm() {
        form.style.display = "block";
        editBtn.style.display = "none";
        // Populate inputs with current data
        nameInput.value = localStorage.getItem("userName") || "";
        emailInput.value = localStorage.getItem("userEmail") || "";
        bioInput.value = localStorage.getItem("userBio") || "";
    }
    // If userName exists, show profile, else show form to fill first time
    if (userName) {
        showProfile();
    }
    else {
        showForm();
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const updatedName = nameInput.value.trim();
        const updatedEmail = emailInput.value.trim();
        const updatedBio = bioInput.value.trim();
        localStorage.setItem("userName", updatedName);
        localStorage.setItem("userEmail", updatedEmail);
        localStorage.setItem("userBio", updatedBio);
        showProfile();
        alert("✅ Profile updated!");
    });
    editBtn.addEventListener("click", () => {
        showForm();
    });
});
