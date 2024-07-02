import {format} from "date-fns"
import { trackProjects,getProjectId,findProject } from "./project-Utils"

const task = document.getElementById('task')
const dueDate = document.getElementById('due-date')
const priorityOpt = document.getElementById('priority')
const addTaskBtn = document.getElementById('confirm-task')
const applyEditBtn = document.getElementById('apply-edit')
const taskDialog = document.getElementById('task-dialog')

// ADD TASK LAYOUT FUNCTION

export function addTaskLayout(taskObj,currentProj) {
    // assign index number as task #
        let index = currentProj.tasks.indexOf(taskObj)
        if(index == -1){
            index = 0;
        }
    
    // dom elements
        const taskList = document.getElementById('task-list')
        const container = document.createElement('div')
        const date = document.createElement('p')
        const para = document.createElement('p')
        const priority = document.createElement('p')
        const editBtn = document.createElement('button')
        const removeTaskBtn = document.createElement('button')
    
    // set attributes
        container.classList.add('flex-container',`task${index}`)
        para.setAttribute('id',`${currentProj.name}-para-${index}`)
        para.classList.add('task-item','task')
        date.setAttribute('id',`${currentProj.name}-date-${index}`)
        date.classList.add('task-item','date')
        priority.setAttribute('id',`${currentProj.name}-priority-${index}`)
        priority.classList.add('task-item','priority')
        editBtn.setAttribute('id',`${currentProj.name}-task-edit${index}`)
        editBtn.setAttribute('data-index-number',index)
        editBtn.classList.add("fa-solid","fa-pen-to-square",'task-item','edit')
        removeTaskBtn.setAttribute('id',`${currentProj.name}-remove-task${index}`)
        removeTaskBtn.setAttribute('data-index-number',index)
        removeTaskBtn.classList.add("fa-solid","fa-trash",'task-item','trash')
    
    
    // add colours to priorities
        if(taskObj.priority == 'Low'){
            priority.style.backgroundColor = 'green'
        }else if(taskObj.priority == 'High'){
            priority.style.backgroundColor = 'red'
        }else if(taskObj.priority == 'Normal'){
            priority.style.backgroundColor = 'beige'
        }
    
    // assign taskObj values
        para.textContent = taskObj.task;
        date.textContent = format(taskObj.date,'PPPP');
        priority.textContent = taskObj.priority;
    
    //append items
        container.appendChild(para)
        container.appendChild(date)
        container.appendChild(priority)
        container.appendChild(editBtn)
        container.appendChild(removeTaskBtn)
        taskList.appendChild(container)
    }
    


// EDITOR TOOLS
const editTools = (function () {

    let taskId;
    let applyEditBtnListener = false;
    const setTaskId = (id) => taskId = id;
    const getTaskId = () => taskId;
    const toggle = () => applyEditBtnListener = true;
    const listenerCheck = () => applyEditBtnListener;
    
        return {listenerCheck,toggle,setTaskId,getTaskId} 
})()


// TASK EDITOR 
export function addEditor(taskObj){
   
    // get projects array & selectedProj id
        const projectsArr = trackProjects.getProjects()
        const id = getProjectId()
        
    // find currently selected project in project tracker
        const currentProj = findProject(projectsArr,id)
    
        let para;
        let date;
        let priority;
        
    // get number of tasks
        let index = currentProj.tasks.indexOf(taskObj)
        if(index == -1){
            index = 0;
        }
        
    // dom elements
        const taskEditBtn = document.getElementById(`${currentProj.name}-task-edit${index}`)
        
        
        
    // EDIT BTN LISTENER
        taskEditBtn.addEventListener('click', (event) => {
        
    // change to edit mode
        taskDialog.showModal()
        applyEditBtn.style.display = ''
        addTaskBtn.style.display = 'none'
        
    // find task to be edited
        let taskId = event.target.getAttribute('data-index-number')
        editTools.setTaskId(taskId)
        const projectsArr = trackProjects.getProjects()
        const project = findProject(projectsArr,header.textContent)
        const editTask = project.tasks[taskId]
    
    // display task to be edited in textarea
        task.value = editTask.task
        dueDate.value = editTask.date
        priorityOpt.value = editTask.priority
        })
        
    
    // APPLY EDIT BTN LISTENER
        if(!editTools.listenerCheck()){
        applyEditBtn.addEventListener('click', () => {
    
    // get projects array & selectedProj id
        const projectsArr = trackProjects.getProjects()
        const id = getProjectId()
        
    // find currently selected project in projects array
        const currentProj = findProject(projectsArr,id) 
        let taskId = editTools.getTaskId()
    
    // dom elements
        para = document.getElementById(`${currentProj.name}-para-${taskId}`)
        date = document.getElementById(`${currentProj.name}-date-${taskId}`)
        priority = document.getElementById(`${currentProj.name}-priority-${taskId}`)
    
    // display input values
        para.textContent = task.value
        date.textContent = format(dueDate.value,'PPPP');
        priority.textContent = priorityOpt.value
        currentProj.tasks[taskId].task = task.value;
        currentProj.tasks[taskId].date = dueDate.value;
        currentProj.tasks[taskId].priority = priorityOpt.value;
        localStorage.setItem(currentProj.name,JSON.stringify(currentProj))
        
        // add colours to priorities
        if(priorityOpt.value == 'Low'){
            priority.style.backgroundColor = 'green'
        }else if(priorityOpt.value == 'High'){
            priority.style.backgroundColor = 'red'
        }else if(priorityOpt.value == 'Normal'){
            priority.style.backgroundColor = 'beige'
        }
        
    // reset mode
        taskDialog.close()
        addTaskBtn.style.display = ''
        applyEditBtn.style.display = 'none'
        })
        editTools.toggle
    }
        
        
    // REMOVE TASK BTN LISTENER
        
        const removeTaskBtn = document.getElementById(`${currentProj.name}-remove-task${index}`)
    
        removeTaskBtn.addEventListener('click', (event) => {
        const confirmRemoval = confirm('Are you sure you want to remove this task?')
        if(confirmRemoval){
        const taskId = event.target.getAttribute('data-index-number')
        const taskToRemove = document.querySelector(`.task${taskId}`)
    
    //remove task from project object
        currentProj.tasks.splice(taskId,1)
        localStorage.setItem(currentProj.name,JSON.stringify(currentProj))
        taskToRemove.remove()
        }
    })
    
    }

    