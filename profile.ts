// profile.ts

// Get references to key DOM elements
const form = document.getElementsByTagName("form")[0] as HTMLFormElement;
const savebtn = document.getElementsByClassName("savebtn")[0] as HTMLButtonElement;
const editBtn = document.getElementById("editBtn") as HTMLButtonElement;

const totalTaskBox = document.getElementById("totalTaskBox");
const totalCompletedBox = document.getElementById("totalCompletedBox");
const totalPendingBox = document.getElementById("totalPendingBox");

// Define Task type
type Task = {
  id: number;
  name: string;
  date: string;
  priority: string;
  description: string;
  status: "pending" | "completed";
};

// This will hold the list of tasks loaded from localStorage
let tasks: Task[] = [];

document.addEventListener("DOMContentLoaded", () => {
  // Profile display elements
  const nameEl = document.getElementById("name") as HTMLElement;
  const passionEl = document.getElementById("passion") as HTMLElement;

  // Inputs inside the form
  const nameInput = form.querySelector('input[type="text"]') as HTMLInputElement;
  const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
  const passionInput = form.querySelector('#passionInput') as HTMLInputElement;
  const bioInput = form.querySelector('textarea') as HTMLTextAreaElement;

  // Load stored user profile data or fallback to empty strings
  let userName = localStorage.getItem("userName") || "";
  let userPassion = localStorage.getItem("userPassion") || "";
  let userEmail = localStorage.getItem("userEmail") || "";
  let userBio = localStorage.getItem("userBio") || "";

  // Show profile info and hide the edit form
  function showProfile(): void {
    form.style.display = "none";
    editBtn.style.display = "inline-block";

    nameEl.textContent = userName;
    passionEl.textContent = userPassion;
  }

  // Show the edit form and hide profile info
  function showForm(): void {
    form.style.display = "block";
    editBtn.style.display = "none";

    // Fill form inputs with current user data
    nameInput.value = userName;
    passionInput.value = userPassion;
    emailInput.value = userEmail;
    bioInput.value = userBio;
  }

  // Load tasks from localStorage and update counters
  function updateTaskCounters(): void {
    const savedTaskList = localStorage.getItem("taskList") || "[]";

    // Parse saved JSON string into tasks array
    tasks = JSON.parse(savedTaskList);

    // Calculate counts
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = total - completed;

    // Update counters in the UI if elements exist
    if (totalTaskBox) totalTaskBox.textContent = total.toString();
    if (totalCompletedBox) totalCompletedBox.textContent = completed.toString();
    if (totalPendingBox) totalPendingBox.textContent = pending.toString();
  }

  // Initial UI setup: show profile if name exists, otherwise show form
  if (userName) {
    showProfile();
  } else {
    showForm();
  }

  // Show current task counts
  updateTaskCounters();

  // Handle profile form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Update variables from form inputs
    userName = nameInput.value.trim();
    userPassion = passionInput.value.trim();
    userEmail = emailInput.value.trim();
    userBio = bioInput.value.trim();

    // Save updated data to localStorage
    localStorage.setItem("userName", userName);
    localStorage.setItem("userPassion", userPassion);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userBio", userBio);

    // Switch back to profile view
    showProfile();
  });

  // When clicking the edit button, show the form again
  editBtn.addEventListener("click", () => {
    showForm();
  });
});

export {};
