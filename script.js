document.getElementById('get-start-btn').addEventListener('click', function() {
    document.getElementById('splash-screen').classList.remove('active');
    document.getElementById('dashboard').style.display = 'block';
  });
  
  const tasks = [];
  const taskList = document.getElementById('tasks');
  const taskProgress = document.getElementById('task-progress');
  
  // Add new task
  document.getElementById('add-task-btn').addEventListener('click', function() {
    const newTask = document.getElementById('new-task').value;
    if (newTask) {
      const task = {
        title: newTask,
        completed: false,
      };
      tasks.push(task);
      renderTasks();
      document.getElementById('new-task').value = '';
    }
  });
  
  // Render tasks
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      li.innerHTML = `
        <span>${task.title}</span>
        <div>
          <button class="btn btn-info btn-sm" onclick="openTask(${index})"><i class="fas fa-eye"></i></button>
          <button class="btn btn-danger btn-sm ml-2" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
        </div>
      `;
      taskList.appendChild(li);
    });
    updateProgress();
  }
  
  // Open task details
  function openTask(index) {
    const task = tasks[index];
    document.getElementById('task-title').innerText = task.title;
    document.getElementById('due-date').innerText = 'N/A'; // Placeholder
    document.getElementById('task-modal').style.display = 'flex';
  
    document.getElementById('mark-complete-btn').onclick = function() {
      task.completed = true;
      document.getElementById('task-modal').style.display = 'none';
      renderTasks();
    };
  }
  
  // Delete task
  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }
  
  // Update task progress
  function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
    taskProgress.innerText = `${progress.toFixed(0)}%`;
  }
  
  // Close task modal
  document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('task-modal').style.display = 'none';
  });
  