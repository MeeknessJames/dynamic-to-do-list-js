document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  loadTasks();

  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';

    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeTaskFromStorage(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = "";

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = "Remove";
      removeBtn.className = 'remove-btn';

      removeBtn.onclick = () => {
        taskList.removeChild(li);
        removeTaskFromStorage(task);
      };

      li.appendChild(removeBtn);
      taskList.appendChild(li);
    });
  }

  function removeTaskFromStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  addButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
