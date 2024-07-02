import {Project, Task} from "./classes.js";
import {findProject,trackProjects,addProjLayout,getProjectId } from "./project-Utils.js";
import { addTaskLayout,addEditor } from "./task-Utils.js";

const taskDialog = document.getElementById('task-dialog')
const cancelDialog = document.getElementById('cancel-task')
const newTaskBtn = document.getElementById('new-task')
const addTaskBtn = document.getElementById('confirm-task')
const applyEditBtn = document.getElementById('apply-edit')
const task = document.getElementById('task')
const dueDate = document.getElementById('due-date')
const priorityOpt = document.getElementById('priority')

// TASK MODULE

export function taskModule(){

//  NEW TASK BUTTON LISTENER
newTaskBtn.addEventListener('click',() => {
// reset button values
    addTaskBtn.style.display = ''
    applyEditBtn.style.display = 'none'

// reset dialog values
    task.value = ""
    dueDate.valueAsDate = new Date()
    priorityOpt.value = "Normal"    
        
// open dialog
    taskDialog.showModal()
})

// CLOSE TASK WINDOW
cancelDialog.addEventListener('click',() => {
// reset values
    const applyEditBtn = document.getElementById('apply-edit')
    taskDialog.close()
    applyEditBtn.style.display = 'none'
    addTaskBtn.style.display = ''
})


// ADD TASK BTN LISTENER
addTaskBtn.addEventListener('click', () => {

// get projects array & selectedProj id
const projectsArr = trackProjects.getProjects()
const id = getProjectId()

// find currently selected project in project tracker
let currentProj = findProject(projectsArr,id)

if(!currentProj){
    const defaultProj = new Project('ToDoList')
    defaultProj.tasks = []
    trackProjects.addProj(defaultProj)
    addProjLayout(defaultProj)
    currentProj = defaultProj 
}

// create task object
const taskObj = new Task(task.value,dueDate.value,priorityOpt.value)

// add task to currently selected project object
currentProj.tasks.push(taskObj)
localStorage.setItem(currentProj.name,JSON.stringify(currentProj))

// append task to page
addTaskLayout(taskObj,currentProj)
addEditor(taskObj)
taskDialog.close()
})
}


