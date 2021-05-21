

let name = document.getElementById('inputname')
let description = document.getElementById('inputtask')
let assignTo = document.getElementById('inputassign')
let form = document.getElementById('form')
let priority = document.getElementById('priority')
let errorElement = document.getElementById('error')
let tasks = JSON.parse(localStorage.getItem("taskList"));
let taskNumber = JSON.parse(localStorage.getItem("IDs"))
let taskBox = 0


if(!localStorage.getItem("taskList")){
    localStorage.setItem("taskList","[]")
    localStorage.setItem("IDs", "0")
    } else{createAllTasks()}

function createTask(task){
    let createTask = document.createElement("div")
    createTask.innerHTML = 
    `<a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Task</h5>
     
    </div>
    <p class="mb-1">
    <b>Assigned To:</b><br>
    ${task.inputassign}<br>
    <b>Assigned By:</b><br>
    ${task.inputname}<br>
    <b>Due Date:</b><br>
    ${task.dueDate} <br>	
    <b>Status:</b><br>
    ${task.status} <br>
    <b>Task Description:</b><br>
    ${task.inputtask}
    </p>
    <small class="text-muted">Task Priority - ${task.priority}</small>
     <button id="completeButton" title="Complete Task"><img id="comButton" src="images/tick.png" alt=""></button>
     <button onclick="deleteTask(${task.id})" id="deleteButton" title="Delete Task"><img id="delButton" src="images/cross.png" alt=""></button>
     <button id="editButton" title="Edit Task"><img id="edButton" src="images/edit.jpg" alt=""></button>
      
    </a>`
    
    document.getElementById("currentTasks").appendChild(createTask)
    console.log(task)
}

function createAllTasks(){
    document.getElementById("currentTasks").innerHTML = ""
    for (i in tasks){
        createTask(tasks[i])
    }

}


class Task {
    constructor(name, description, assignTo, date, status, priority) {
        this.inputname = name;
        this.inputtask = description;
        this.inputassign = assignTo;
        this.dueDate = date;
        this.status = status;
        this.priority = priority;
        this.id = taskNumber
    }
    

}


function findTargetIdIndex(targetId) {  // finds the index of the id given in the parameter
    for(i in tasks) {                   //checks through the entire list
        if(tasks[i].id == targetId) {   //if the id is equal to target id
            return i
        }
    }
}



function deleteTask(taskId) {
    tasks.splice(findTargetIdIndex(taskId), 1)
    updatelocalstorage()
    createAllTasks()

}
    



    function updatelocalstorage() {
        localStorage.setItem("taskList",JSON.stringify(tasks))
        localStorage.setItem("IDs",JSON.stringify(taskNumber))
}


    // Validates user input
    function validateForm(name, description, assignTo, date, status){
        let formList = [name, assignTo, date, status]
        let errorNames = ["Invalid input: name must not be empty and must be less than 20 characters", "Invalid input: Assign To must not be empty and must be less than 20 characters", "Select a date", "Select a status"]
        let errors = []
        for (i in formList) {
            if ((formList[i].length <= 0) || (formList[i].length > 20)) {
                console.log(errorNames[i])
                errors.push(errorNames[i]);
            }
        }
        if (description.length < 10) {
            errors.push("Invalid input: task must not be empty and more than 20 characters")
        }
        return errors
        }


      
    function add(){
        let name = document.getElementById("inputname").value;
        let description = document.getElementById("inputtask").value;
        let assignedTo = document.getElementById("inputassign").value;
        let date = document.getElementById("dueDate").value;
        let status = document.getElementById("status").value;
        let priority = document.getElementById("priority").value;

        let errors = validateForm(name, description, assignedTo, date, status)

        if(errors.length == 0){
            let task = new Task(name, description, assignedTo, date,status, priority);
        
            tasks.push(task)
            localStorage.setItem("taskList", JSON.stringify(tasks));
            createAllTasks()
        } else {
            for (i in errors) {
                alert(errors[i])
            }
        }

    
   
}
document.getElementById("submitT").addEventListener("click", add)

// for (i in tasks){tasks[i].createTask()}



// // retrieving local storage
// let cardsListStorage = localStorage.getItem("cardsList")
// let cardIdsStorage = localStorage.getItem("cardIds")
// console.log(JSON.parse(cardsListStorage), JSON.parse(cardIdsStorage))

// if(cardsListStorage){
//     TaskManager.cardsList = JSON.parse(cardsListStorage)
//     TaskManager.cardIds = JSON.parse(cardIdsStorage)
//     TaskManager.fillCards()
// }

// class TaskManager {

    //     constructor() {
    
    //     }
    
    //     getTask() {
    //         return this.tasks;
    
    //     }
    
    //     addTask() {
    //         const taskId = this.nextTaskId;
    //         this.nextTaskId++;
    //         this.task[taskId] = task;
    //         this.createTask(taskId);
    //         this.updateLocalStorage();
    
    //     }
    // }