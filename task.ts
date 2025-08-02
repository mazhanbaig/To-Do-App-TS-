// 🔧 Get DOM elements
const taskInput = document.getElementById("task") as HTMLInputElement;
const addButton = document.getElementById("addBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLDivElement;

// 🚀 Add task function
function addTask(): void {
  const taskText = taskInput.value.trim();
  if (!taskText) return;
  const taskDiv = document.createElement("div");
  taskDiv.className =
    "flex justify-between items-center bg-black bg-opacity-40 p-4 rounded-lg border-l-4 border-neon backdrop-blur hover:shadow-[0_0_6px_#00FFFF] transition-all duration-200";

  taskDiv.innerHTML = `
    <span class="text-white">${taskText}</span>
    <button class="text-red-400 hover:text-red-600 font-extrabold text-lg transition">✕</button>
  `;
  taskList.appendChild(taskDiv);
  taskInput.value = "";
  const deleteBtn = taskDiv.querySelector("button") as HTMLButtonElement;
  deleteBtn.addEventListener("click", () => {
    taskDiv.remove();
  });
}

// 🎯 Add task on button click
addButton.addEventListener("click", addTask);

// ⌨️ Add task on Enter key press
taskInput.addEventListener("keypress", (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    addTask();
  }
});
