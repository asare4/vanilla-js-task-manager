let daySpan = document.querySelector(".day");
let addBtn = document.querySelector(".addTasks");
let count = document.querySelector(".allTaskCount");
let list = document.querySelector(".allTasks ul");
let help = document.querySelector(".help");


// ❔ Help & Tutorial
function showHelp() {
    alert(" Tutorial:\n\n1. Click '+ Add task' to create a new task.\n2. All your tasks will appear under 'All Tasks'.\n3. Use the Delete button to remove tasks.\n4. Tasks will be saved in your browser so that it can be accessed later.\n ");
};

if (help) {
    help.addEventListener("click", showHelp);
};


// Show current day number on Today button
function showToday() {
  let today = new Date();
  let dayNumber = today.getDate();

  if (dayNumber < 10) {
    dayNumber = "0" + dayNumber;
  }

    daySpan.textContent = dayNumber;
}

document.addEventListener("DOMContentLoaded", showToday);
