// // 🌐 DOM Elements
// const taskInput = document.getElementById("task") as HTMLInputElement;
// const addButton = document.getElementById("addBtn") as HTMLButtonElement;
// const taskList = document.getElementById("taskList") as HTMLDivElement;

// const totalTaskBox = document.querySelector("#total p") as HTMLParagraphElement;
// const totalCompletedBox = document.querySelector("#totalcompelete p") as HTMLParagraphElement;
// const totalPendingBox = document.querySelector("#totalpending p") as HTMLParagraphElement;

// // 🧠 Task Type
// type Task = {
//   id: number;
//   name: string;
//   date: string;
//   status: "pending" | "completed";
// };

// // 🧠 Task Storage
// let tasks: Task[] = [];

// // 🚀 Add a Task
// function addTask(): void {
//   const taskText = taskInput.value.trim();
//   if (!taskText) return;

//   const newTask: Task = {
//     id: Date.now(),
//     name: taskText,
//     date: new Date().toLocaleDateString(),
//     status: "pending",
//   };

//   tasks.push(newTask);
//   taskInput.value = "";
//   if(localStorage.getItem("taskList")){
//     localStorage.setItem(JSON.stringify(tasks),taskList)
//   } 
//   else{
//     localStorage.setItem(taskList,JSON.stringify(tasks))
//   }
//   renderTasks();
//   updateStats();
// }

// // 🖌️ Render All Tasks
// function renderTasks(): void {
//   taskList.innerHTML = "";

//   tasks.forEach((task) => {
//     const taskDiv = document.createElement("div");
//     taskDiv.className =
//       "flex justify-between items-center bg-black bg-opacity-40 p-4 rounded-lg border-l-4 border-neon backdrop-blur hover:shadow-[0_0_6px_#00FFFF] transition-all duration-200";

//     taskDiv.innerHTML = `
//       <div>
//         <span class="text-white font-semibold ${
//           task.status === "completed" ? "line-through text-green-400" : ""
//         }">${task.name}</span>
//         <div class="text-xs text-gray-400">${task.date}</div>
//       </div>
//       <div class="flex gap-4">
//         <button class="complete-btn text-green-400 hover:text-green-600 font-bold">✔</button>
//         <button class="delete-btn text-red-400 hover:text-red-600 font-extrabold text-lg">✕</button>
//       </div>
//     `;

//     // ✅ Complete Button
//     const completeBtn = taskDiv.querySelector(".complete-btn") as HTMLButtonElement;
//     completeBtn.addEventListener("click", () => {
//       task.status = task.status === "pending" ? "completed" : "pending";
//       renderTasks();
//       updateStats();
//     });

//     // ❌ Delete Button
//     const deleteBtn = taskDiv.querySelector(".delete-btn") as HTMLButtonElement;
//     deleteBtn.addEventListener("click", () => {
//       tasks = tasks.filter((t) => t.id !== task.id);
//       renderTasks();
//       updateStats();
//     });

//     taskList.appendChild(taskDiv);
//   });
// }

// // 📊 Update Task Counts
// function updateStats(): void {
//   const total = tasks.length;
//   const completed = tasks.filter((t) => t.status === "completed").length;
//   const pending = total - completed;

//   totalTaskBox.textContent = total.toString();
//   totalCompletedBox.textContent = completed.toString();
//   totalPendingBox.textContent = pending.toString();
// }

// // 🎯 Event Listeners
// addButton.addEventListener("click", addTask);
// taskInput.addEventListener("keypress", (e: KeyboardEvent) => {
//   if (e.key === "Enter") addTask();
// });
// // navbar
// // 🎯 Navbar Toggle (Make sure this is included)
// document.addEventListener("DOMContentLoaded", () => {
//   const menuBtn = document.getElementById("menu-btn") as HTMLButtonElement | null;
//   const mobileMenu = document.getElementById("mobile-menu") as HTMLDivElement | null;

//   if (!menuBtn || !mobileMenu) {
//     console.warn("Navbar elements not found.");
//     return;
//   }

//   menuBtn.addEventListener("click", () => {
//     mobileMenu.classList.toggle("hidden");
//   });
// });
// 🌐 DOM Elements
const taskInput = document.getElementById("task") as HTMLInputElement;
const addButton = document.getElementById("addBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLDivElement;

const totalTaskBox = document.querySelector("#total p") as HTMLParagraphElement;
const totalCompletedBox = document.querySelector("#totalcompelete p") as HTMLParagraphElement;
const totalPendingBox = document.querySelector("#totalpending p") as HTMLParagraphElement;

// 🧠 Task Type
type Task = {
  id: number;
  name: string;
  date: string;
  status: "pending" | "completed";
};

// 🧠 Task Storage
let tasks: Task[] = [];

// 🚀 Add a Task
function addTask(): void {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const newTask: Task = {
    id: Date.now(),
    name: taskText,
    date: new Date().toLocaleDateString(),
    status: "pending",
  };

  tasks.push(newTask);
  taskInput.value = "";

  saveTasksToStorage();
  renderTasks();
  updateStats();
}

// 💾 Save Tasks to localStorage
function saveTasksToStorage(): void {
  localStorage.setItem("taskList", JSON.stringify(tasks));
}

// 📦 Load Tasks from localStorage
function loadTasksFromStorage(): void {
  const saved = localStorage.getItem("taskList");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

// 🖌️ Render All Tasks
function renderTasks(): void {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className =
      "flex justify-between items-center bg-black bg-opacity-40 p-4 rounded-lg border-l-4 border-neon backdrop-blur hover:shadow-[0_0_6px_#00FFFF] transition-all duration-200";

    taskDiv.innerHTML = `
      <div>
        <span class="text-white font-semibold ${task.status === "completed" ? "line-through text-green-400" : ""
      }">${task.name}</span>
        <div class="text-xs text-gray-400">${task.date}</div>
      </div>
      <div class="flex gap-4">
        <button class="complete-btn text-green-400 hover:text-green-600 font-bold">✔</button>
        <button class="delete-btn text-red-400 hover:text-red-600 font-extrabold text-lg">✕</button>
      </div>
    `;

    // ✅ Complete Button
    const completeBtn = taskDiv.querySelector(".complete-btn") as HTMLButtonElement;
    completeBtn.addEventListener("click", () => {
      task.status = task.status === "pending" ? "completed" : "pending";
      saveTasksToStorage();
      renderTasks();
      updateStats();
    });

    // ❌ Delete Button
    const deleteBtn = taskDiv.querySelector(".delete-btn") as HTMLButtonElement;
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
function updateStats(): void {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = total - completed;

  totalTaskBox.textContent = total.toString();
  totalCompletedBox.textContent = completed.toString();
  totalPendingBox.textContent = pending.toString();
}

// 🎯 Event Listeners
addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e: KeyboardEvent) => {
  if (e.key === "Enter") addTask();
});

// 📦 Load on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // Load saved tasks
  loadTasksFromStorage();
  renderTasks();
  updateStats();

  // ✅ Navbar Toggle
  const menuBtn = document.getElementById("menu-btn") as HTMLButtonElement | null;
  const mobileMenu = document.getElementById("mobile-menu") as HTMLDivElement | null;

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});
