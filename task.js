"use strict";
// 🌐 DOM Elements
const taskInput = document.getElementById("task");
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
    if (!taskText)
        return;
    const newTask = {
        id: Date.now(),
        name: taskText,
        date: new Date().toLocaleDateString(),
        status: "pending",
    };
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
    updateStats();
}
// 🖌️ Render All Tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.className =
            "flex justify-between items-center bg-black bg-opacity-40 p-4 rounded-lg border-l-4 border-neon backdrop-blur hover:shadow-[0_0_6px_#00FFFF] transition-all duration-200";
        taskDiv.innerHTML = `
      <div>
        <span class="text-white font-semibold ${task.status === "completed" ? "line-through text-green-400" : ""}">${task.name}</span>
        <div class="text-xs text-gray-400">${task.date}</div>
      </div>
      <div class="flex gap-2">
        <button class="complete-btn text-green-400 hover:text-green-600 font-bold">✔</button>
        <button class="delete-btn text-red-400 hover:text-red-600 font-extrabold text-lg">✕</button>
      </div>
    `;
        // ✅ Complete Button
        const completeBtn = taskDiv.querySelector(".complete-btn");
        completeBtn.addEventListener("click", () => {
            task.status = task.status === "pending" ? "completed" : "pending";
            renderTasks();
            updateStats();
        });
        // ❌ Delete Button
        const deleteBtn = taskDiv.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter((t) => t.id !== task.id);
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
