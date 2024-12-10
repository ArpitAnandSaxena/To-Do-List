 document.addEventListener    ("DOMContentLoaded",()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task))
        updateTaskList()
        updateStats()
    }
 })


  let tasks=[]; 

 const savetask=()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
 }
 const addTask=()=>{
    const taskInput=document.getElementById("task");
   const text =taskInput.value.trim();
 
   if(text){
       tasks.push({text: text, completed: false});
       taskInput.value="";
        updateTaskList();
        updateStats();
        savetask();
    }
    
 };
 const toggleTaskComplete=(index)=>{
    tasks[index].complete = !tasks[index].complete;
    updateTaskList();
    updateStats();
    savetask();
 };
 const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    savetask();
 };
 const editTask=(index)=>{
    const taskInput=document.getElementById("task");
    taskInput.value=tasks[index].text
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    savetask();
 };
 const updateStats=()=>{
    const completeTask=tasks.filter((tasks)=> tasks.complete).length
    const totalTasks =tasks.length
    const progress= (completeTask/totalTasks)*100
    const progressBar = document.getElementById('progress')
    progressBar.style.width = `${progress}%`

    document.getElementById("number").innerText=`${completeTask}/ ${totalTasks}`


    if(tasks.length && completeTask=== totalTasks){endding();}
 }

    const updateTaskList = ()=>{
        const taskList= document.getElementById("task-list")
        taskList.innerHTML=""; // delete list element
        tasks.forEach((tasks ,index) => { 

            const listItem = document.createElement("li");

                listItem.innerHTML=`
                <div class="taskItem">
                <div class="task ${tasks.completed ? 'completed':''}">
                    <input type="checkbox" class="checkbox" ${tasks.complete ? "checked":""}/>
                    <p>${tasks.text}</p>
                    </div>

                    <div class="icons">
                        <img src="edit.png" onClick="editTask(${index})"/>
                        <img src="bin.png "onClick="deleteTask(${index})"/>
                        </div>
                    </div>
                `;
                listItem.addEventListener("change",()=>toggleTaskComplete(index));
                
                taskList.append(listItem);
        });
    };


 document.getElementById('newTask').addEventListener("click",function(e) {
    e.preventDefault();
    addTask();})

    const endding=()=>{
        const duration = 1 * 1000,
  animationEnd = Date.now() + duration;

 let skew = 1;

 function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
 }

 ( function frame() {
  const timeLeft = animationEnd - Date.now(),
    ticks = Math.max(200, 500 * (timeLeft / duration));

  skew = Math.max(0.8, skew - 0.001);

  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      // since particles fall down, skew start toward the top
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
    }