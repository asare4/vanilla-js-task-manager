const daySpan = document.getElementById("day-span");
const taskCount = document.getElementById("all-task-count");
const help = document.getElementById("help-btn");
const taskForm = document.getElementById("task-form");
const taskTableBody = document.getElementById("table-data-body");
const btnSubmit = document.getElementById("btn-new-task");



// =======================
// ❔ Help & Tutorial
// =======================
function showHelp() {
  alert(
    " Tutorial:\n\n1. Click '+ Add task' to create a new task.\n2. All your tasks will appear under 'All Tasks'.\n3. Use the Delete button to remove tasks.\n4. Tasks will be saved in your browser so that it can be accessed later.\n "
  );
}

if (help) {
  help.addEventListener("click", showHelp);
}



// ============================================
// Show current day number on Today button
// ============================================
function showToday() {
  let today = new Date();
  let dayNumber = today.getDate();

  if (dayNumber < 10) {
    dayNumber = "0" + dayNumber;
  }

  daySpan.textContent = dayNumber;
}



// ==============================
// Load saved tasks from localStorage
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  showToday();

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((t) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${t.completed ? "🔴" : "⭕"}${taskTableBody.children.length + 1}</td>
      <td>${t.title}</td>
      <td>${t.status}</td>
      <td>${t.date}</td>
      <td><input type="checkbox" ${t.completed ? "checked" : ""}></td>
      <td><button class="delete-btn">❌</button></td>
    `;
    taskTableBody.appendChild(newRow);
  });

  taskCount.textContent = savedTasks.length;
});



// =============================
// Tasks Array
// =============================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



// ============================
// Add Tasks
// ============================
const newTask = () => {
  const taskInput = document.getElementById("input-new-task").value;

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>⭕${taskTableBody.children.length + 1}</td>
    <td>${taskInput}</td>
    <td>In-Progress</td>
    <td>${new Date().toISOString().split("T")[0]}</td>
    <td>
      <input type="checkbox" id="${taskTableBody.children.length + 1}-check-box" >
    </td>
    <td><button class="delete-btn">❌</button></td>
    `;

  taskTableBody.appendChild(newRow);

  tasks.push({
    title: taskInput,
    status: "In-Progress",
    date: new Date().toISOString().split("T")[0],
    completed: false
  });
  saveTasks();  
  
  taskCount.textContent = tasks.length;
  taskForm.reset();
};



// ============================
// Delete Tasks
// ============================
taskTableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const row = e.target.closest("tr");
    const index = [...taskTableBody.children].indexOf(row);
    tasks.splice(index, 1);
    saveTasks();
    row.remove();

    reindexTasks();
    taskCount.textContent = tasks.length;
  }
});



// ============================
// Reindex Tasks
// ============================
function reindexTasks() {
  [...tableData.children].forEach((row, i) => {
    const taskNum = i + 1;
    const isCompleted = tasks[i]?.completed;
    row.children[0].textContent = `${isCompleted ? "🔴" : "⭕"}${taskNum}`;
  });
}




// ============================
// Update Task Status
// ============================
taskTableBody.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const row = e.target.closest("tr");
    const index = [...taskTableBody.children].indexOf(row);

    tasks[index].completed = e.target.checked;
    tasks[index].status = e.target.checked ? "Completed" : "In-Progress";
    saveTasks();

  
    row.children[0].textContent = e.target.checked ? `🔴${index + 1}` : `⭕${index + 1}`;
    row.children[2].textContent = tasks[index].status;
  }
});



// ============================
// Form Submission
// ============================
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newTask();
});
