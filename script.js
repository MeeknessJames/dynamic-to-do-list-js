document.addEventListener('DOMContentLoaded', () => {

  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  loadTasks();

  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    removeBtn.onclick = () => {
      taskList.removeChild(li);
      saveTasks();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = '';

    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
      const task = li.firstChild.textContent.trim();
      tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
      const li = document.createElement('li');
      li.textContent = taskText;

      const removeBtn = document.createElement('button');
