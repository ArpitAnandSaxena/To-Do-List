document.addEventListener("DOMContentLoaded", () => {
   const storedTasks = JSON.parse(localStorage.getItem('tasks'));
   if (storedTasks) {
       tasks = storedTasks;
       updateTaskList();
       updateStats();
   }
});

let tasks = [];
let editIndex = null; // Track the index of the task being edited

const saveTask = () => {
   localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
   const taskInput = document.getElementById("task");
   const text = taskInput.value.trim();

   if (text) {
       if (editIndex !== null) {
           tasks[editIndex].text = text;
           editIndex = null; // Reset edit mode
       } else {
           tasks.push({ text: text, completed: false });
       }
       
       taskInput.value = "";
       updateTaskList();
       updateStats();
       saveTask();
   }
};

const toggleTaskComplete = (index) => {
   tasks[index].completed = !tasks[index].completed;
   updateTaskList();
   updateStats();
   saveTask();
};

const deleteTask = (index) => {
   tasks.splice(index, 1);
   updateTaskList();
   updateStats();
   saveTask();
};

const editTask = (index) => {
   const taskInput = document.getElementById("task");
   
   if (editIndex !== null) {
       tasks[editIndex].text = taskInput.value; // Save the previous task text
       editIndex = null; // Reset edit mode
   }
   
   taskInput.value = tasks[index].text;
   editIndex = index;
};

const updateStats = () => {
   const completedTasks = tasks.filter(task => task.completed).length;
   const totalTasks = tasks.length;
   const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
   const progressBar = document.getElementById('progress');
   
   progressBar.style.width = `${progress}%`;
   document.getElementById("number").innerText = `${completedTasks}/${totalTasks}`;
   
   if (tasks.length && completedTasks === totalTasks) {
       ending();
   }
};

const updateTaskList = () => {
   const taskList = document.getElementById("task-list");
   taskList.innerHTML = "";
   
   tasks.forEach((task, index) => {
       const listItem = document.createElement("li");
       listItem.innerHTML = `
           <div class="taskItem">
               <div class="task ${task.completed ? 'completed' : ''}">
                   <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                   <p>${task.text}</p>
               </div>
               <div class="icons">
                   <img src="edit.png" onclick="editTask(${index})" />
                   <img src="bin.png" onclick="deleteTask(${index})" />
               </div>
           </div>
       `;
       listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
       taskList.append(listItem);
   });
};

document.getElementById('newTask').addEventListener("click", function(e) {
   e.preventDefault();
   addTask();
});

const ending = () => {
   const duration = 1 * 1000,
       animationEnd = Date.now() + duration;
   let skew = 1;

   function randomInRange(min, max) {
       return Math.random() * (max - min) + min;
   }

   (function frame() {
       const timeLeft = animationEnd - Date.now(),
           ticks = Math.max(200, 500 * (timeLeft / duration));
       
       skew = Math.max(0.8, skew - 0.001);

       confetti({
           particleCount: 1,
           startVelocity: 0,
           ticks: ticks,
           origin: {
               x: Math.random(),
               y: Math.random() * skew - 0.2,
           },
           colors: ["#ffffff"],
           shapes: ["circle"],
           gravity: randomInRange(0.4, 0.6),
           scalar: randomInRange(0.4, 1),
           drift: randomInRange(-0.4, 0.4),
       });

       if (timeLeft > 0) {
           requestAnimationFrame(frame);
       }
   })();
};
