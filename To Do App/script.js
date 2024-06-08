function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value !== '') {
        var li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" onchange="completeTask(this)"> <span class="task-content" contenteditable="true">${taskInput.value}</span> <button onclick="editTask(this)">Edit</button> <button onclick="deleteTask(this)">Delete</button>`;
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks(); // Save tasks to local storage
    } else {
        alert("Please enter a task!");
    }
}

// Function to mark task as complete
function completeTask(checkbox) {
    var li = checkbox.parentElement;
    li.classList.toggle("completed");
    saveTasks(); // Save tasks to local storage
}

// Function to edit task
function editTask(button) {
    var li = button.parentElement;
    var taskContent = li.querySelector(".task-content");
    if (taskContent.isContentEditable) {
        taskContent.contentEditable = "false";
        button.innerText = "Edit";
    } else {
        taskContent.contentEditable = "true";
        taskContent.focus();
        button.innerText = "Save";
    }
    saveTasks(); // Save tasks to local storage
}

// Function to delete task
function deleteTask(button) {
    var li = button.parentElement;
    li.remove();
    saveTasks(); // Save tasks to local storage
}

// Function to save tasks to local storage
function saveTasks() {
    var tasks = [];
    var taskList = document.getElementById("taskList").getElementsByTagName("li");
    for (var i = 0; i < taskList.length; i++) {
        var task = {
            content: taskList[i].querySelector(".task-content").innerText,
            completed: taskList[i].classList.contains("completed")
        };
        tasks.push(task);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        var taskList = document.getElementById("taskList");
        for (var i = 0; i < tasks.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" onchange="completeTask(this)" ${tasks[i].completed ? 'checked' : ''}> <span class="task-content" contenteditable="true">${tasks[i].content}</span> <button onclick="editTask(this)">Edit</button> <button onclick="deleteTask(this)">Delete</button>`;
            if (tasks[i].completed) {
                li.classList.add("completed");
            }
            taskList.appendChild(li);
        }
    }
}

// Load tasks when the page loads
window.onload = loadTasks;