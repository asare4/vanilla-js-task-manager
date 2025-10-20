const daySpan = document.getElementById("day-span");
const count = document.getElementById("all-task-count");
const list = document.getElementById("all-tasks tbody");
const help = document.getElementById("help-btn");
const myForm = document.getElementById("task-form");
const tableData = document.getElementById("table-data-body");
const btnSubmit = document.getElementById("btn-new-task");


// =======================
// ❔ Help & Tutorial
// =======================
function showHelp() {
    alert(" Tutorial:\n\n1. Click '+ Add task' to create a new task.\n2. All your tasks will appear under 'All Tasks'.\n3. Use the Delete button to remove tasks.\n4. Tasks will be saved in your browser so that it can be accessed later.\n ");
};

if (help) {
  help.addEventListener("click", showHelp);
};


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

document.addEventListener("DOMContentLoaded", showToday);


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
addBtn.addEventListener("click", () => {
  const taskName = prompt("Enter your task: ");
  if (taskName === null || taskName === undefined) {
    return;
  };

  const task = {
    name: taskName,
    date: new Date().toDateString(),
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
});



// ============================
// Task Rendering
// ============================
function renderTasks() {
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = "<li>No tasks added yet</li>";
  } else {
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task.name;

      // delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.style.marginLeft = "14px";
      delBtn.style.cursor = "pointer";

      delBtn.addEventListener("click", () => {
        deleteTask(index);
      });

      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  count.textContent = tasks.length;
}



// ============================
// Delete Functionality
// ============================
function deleteTask(index) {
  tasks.splice(index, 1);

  saveTasks();
  renderTasks();
}


document.addEventListener("DOMContentLoaded", () => {
  showToday();
  renderTasks();
});