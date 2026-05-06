const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

// Add task
button.addEventListener("click", addTask);

function addTask() {
  const task = input.value.trim();
  if (task === "") return;

  createTaskElement(task);
  input.value = "";
  saveTasks();
}

// Create task
function createTaskElement(taskText, isCompleted = false) {
  const li = document.createElement("li");

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;

  // task text
  const span = document.createElement("span");
  span.textContent = taskText;

  // apply completed style
  if (isCompleted) {
    span.style.textDecoration = "line-through";
    span.style.opacity = "0.6";
  }

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    } else {
      span.style.textDecoration = "none";
      span.style.opacity = "1";
    }

    saveTasks();
  });

  // delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", function () {
    li.remove();
    saveTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// Enter key
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

// Save tasks (store structured data now)
function saveTasks() {
  const tasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("input").checked;

    tasks.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks"));
  if (!saved) return;

  saved.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}

// Clear all
clearBtn.addEventListener("click", function () {
  list.innerHTML = "";
  saveTasks();
});

window.onload = loadTasks;