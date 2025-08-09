"use strict";
// 🌐 DOM Elements
const taskInput = document.getElementById("task");
const taskDateInput = document.getElementById("taskDate");
const taskPriorityInput = document.getElementById("taskPriority");
const taskDescInput = document.getElementById("taskDesc");
const addButton = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTaskBox = document.querySelector("#total p");
const totalCompletedBox = document.querySelector("#totalcompelete p");
const totalPendingBox = document.querySelector("#totalpending p");
// 🧠 Task Storage
let tasks = [];
// 🚀 Add a Task
function addTask() {
    const taskText = taskInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskPriority = taskPriorityInput.value;
    const taskDesc = taskDescInput.value.trim();
    const isDuplicate = tasks.some(t => t.name.toLowerCase() === taskText.toLowerCase());
    if (isDuplicate) {
        taskInput.value = "";
        alert("This task already exists!");
        return;
    }
    if (!taskText)
        return;
    const newTask = {
        id: Date.now(),
        name: taskText,
        date: taskDate || new Date().toLocaleDateString(),
        priority: taskPriority || "Medium",
        description: taskDesc || "",
        status: "pending",
    };
    tasks.push(newTask);
    // Clear input fields
    taskInput.value = "";
    taskDateInput.value = "";
    taskPriorityInput.value = "";
    taskDescInput.value = "";
    saveTasksToStorage();
    renderTasks();
    updateStats();
}
// 💾 Save Tasks to localStorage
function saveTasksToStorage() {
    localStorage.setItem("taskList", JSON.stringify(tasks));
}
// 📦 Load Tasks from localStorage
function loadTasksFromStorage() {
    const saved = localStorage.getItem("taskList");
    if (saved) {
        tasks = JSON.parse(saved);
    }
}
// 🖌️ Render All Tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.className =
            "flex justify-between items-center bg-black bg-opacity-40 p-4 rounded-lg border-l-4 border-neon backdrop-blur hover:shadow-[0_0_6px_#00FFFF] transition-all duration-200";
        taskDiv.innerHTML = `
  <!-- Single Task Container -->
  <div class="group bg-gradient-to-br from-gray-950 via-black to-gray-900 border border-cyan-500/20 rounded-xl p-4 w-full transition-all duration-500 hover:shadow-cyan-500/20 hover:shadow-lg focus-within:shadow-cyan-500/30">

    <!-- Title + Priority -->
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-lg md:text-xl font-semibold tracking-wide ${task.status === "completed" ? "line-through text-green-400" : "text-cyan-300"}">${task.name}</h3>

      <span class="text-xs md:text-sm uppercase px-3 py-1 rounded-full border ${task.priority === "High"
            ? "border-red-500 text-red-400"
            : task.priority === "Medium"
                ? "border-yellow-500 text-yellow-400"
                : "border-green-500 text-green-400"} glow-shadow">${task.priority}</span>
    </div>

    <!-- Expandable Details on Hover / Focus -->
    <div class="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-64 group-focus-within:opacity-100 group-focus-within:max-h-64 transition-all duration-500 ease-in-out overflow-hidden space-y-2 text-sm text-gray-300">

      <!-- Date -->
      <div class="flex items-center gap-2">
        <span class="text-cyan-400">📅</span>
        <span>${task.date || "No due date"}</span>
      </div>

      <!-- Description -->
      ${task.description
            ? `<div class="flex gap-2">
               <span class="text-pink-400">📝</span>
               <p class="line-clamp-3">${task.description}</p>
             </div>`
            : ""}

      <!-- Buttons -->
      <div class="flex gap-4 pt-3">
        <button class="complete-btn text-green-400 hover:text-green-500 font-semibold">✔ Complete</button>
        <button class="delete-btn text-red-400 hover:text-red-500 font-semibold">✕ Delete</button>
      </div>
    </div>
  </div>
`;
        // ✅ Complete Button
        const completeBtn = taskDiv.querySelector(".complete-btn");
        completeBtn.addEventListener("click", () => {
            task.status = task.status === "pending" ? "completed" : "pending";
            saveTasksToStorage();
            renderTasks();
            updateStats();
        });
        // ❌ Delete Button
        const deleteBtn = taskDiv.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter((t) => t.id !== task.id);
            saveTasksToStorage();
            renderTasks();
            updateStats();
        });
        taskList.appendChild(taskDiv);
    });
}
// 📊 Update Task Counts
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = total - completed;
    totalTaskBox.textContent = total.toString();
    totalCompletedBox.textContent = completed.toString();
    totalPendingBox.textContent = pending.toString();
}
// 🎯 Event Listeners
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter")
        addTask();
});
// 📦 Load on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromStorage();
    renderTasks();
    updateStats();
    // ✅ Navbar Toggle
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }
});
// theme  functionality
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
