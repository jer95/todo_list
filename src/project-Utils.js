export {setProjectId,getProjectId}
import { addTaskLayout,addEditor} from "./task-Utils"

const mainHeader = document.querySelector('.header')
const header = document.getElementById('header')
const taskSection = document.getElementById('task-section')

let projectId;
let prevSelectedProj;

// ADD PROJECT LAYOUT FUNCTION

export function addProjLayout(newProj){

// create nav item for new proj
    const projectList = document.getElementById('projects')
    const li = document.createElement('li');
    const span = document.createElement('span');
    const removeProjBtn = document.createElement('button')
    const editProjBtn = document.createElement('button')

    li.textContent = newProj.name;
    li.classList.add(newProj.name)
    removeProjBtn.classList.add("fa-solid","fa-trash","trash","nav-item-btns")
    removeProjBtn.setAttribute("id",newProj.name)
    editProjBtn.classList.add("fa-solid","fa-pen-to-square","edit","nav-item-btns")
    editProjBtn.setAttribute("id",`${newProj.name}-edit-btn`)
    span.setAttribute("id",`${newProj.name}-span`)
    span.classList.add('project')

    span.appendChild(li)
    span.appendChild(removeProjBtn)
    span.appendChild(editProjBtn)
    projectList.appendChild(span)

// NAVIGATOR

li.addEventListener('click', (event) => {
// get id & proj array
    projectId = event.target.getAttribute('class')
    const span = document.getElementById(`${projectId}-span`)
    const prevSpan = document.getElementById(`${prevSelectedProj}-span`)
    prevSelectedProj = projectId
    const projects = trackProjects.getProjects()
    let selectedProj;

// style selected Proj when clicked
    if(prevSpan !== null){
    prevSpan.style.backgroundColor = ''
    prevSpan.style.border = '0'   
    }

    span.style.backgroundColor = 'rgb(120, 186, 224)';
    span.style.border = '1px solid black'
    span.style.borderRight = '0px'
    
// wipe previous content
    const taskList = document.getElementById('task-list')
    taskList.remove()

// add new container
    const div = document.createElement('div')
    div.setAttribute('id','task-list')
    taskSection.appendChild(div)

// get currently selected proj
    selectedProj = findProject(projects,projectId)

//change header name to selected proj
    header.textContent = projectId
    mainHeader.style.backgroundColor = generateRGB()

// display selected project tasks
    selectedProj.tasks.forEach((task) => {
    addTaskLayout(task,selectedProj)
    addEditor(task)
        })
    })


// REMOVE PROJECT BTN LISTENER

removeProjBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    const confirmRemoval = confirm('Are you sure you want to remove this project?')
    if(confirmRemoval){
    const projId = event.target.getAttribute('id')
    const projectArr = trackProjects.getProjects()
    const removeProjArr = findProject(projectArr,projId)
    let index = projectArr.indexOf(removeProjArr)
    const span = document.getElementById(`${projId}-span`)
    const header = document.getElementById('header')
    projectArr.splice(index,1)
    if(index > 0){
        index -= 1
    } else{
        index += 1
    }

    const adjacentProjName = projectArr[index]
    span.remove()
    localStorage.removeItem(projId)
    
    // if no more projects left execute this
    if (!adjacentProjName){
    header.textContent = 'ToDoList'
    const taskList = document.getElementById('task-list')
    taskList.remove()
    const newTaskList = document.createElement('div')
    newTaskList.setAttribute('id','task-list')
    taskSection.append(newTaskList)
    }else{
        // display adjacent project after removal
        const adjacentProj = document.querySelector(`.${adjacentProjName.name}`)
        adjacentProj.click()
    }
    }
})



// EDIT PROJECT BTN LISTENER
editProjBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    // get elements of proj to be edited
    const id = event.target.getAttribute('id')
    const arr = id.split('-')
    const projName = arr[0]
    const li = document.querySelector(`.${projName}`)
    const span = document.getElementById(`${projName}-span`)
    const editBtn = document.getElementById(`${projName}-edit-btn`)
    const removeBtn = document.getElementById(`${projName}`)
    const newProjName = prompt('Please enter a project name:');
    const projects = trackProjects.getProjects()

    if(newProjName !== undefined || newProjName !== null){
        li.innerText = newProjName;
        header.textContent = newProjName;

        // replace attributes of edited project
        li.classList.replace(projName,newProjName)
        span.setAttribute("id",`${newProjName}-span`)
        editBtn.setAttribute('id',`${newProjName}-edit-btn`)
        removeBtn.setAttribute('id',`${newProjName}`)

        // edit in localStorage
        const editProjName = JSON.parse(localStorage.getItem(projName))
        editProjName.name = newProjName;
        localStorage.removeItem(projName)
        localStorage.setItem(editProjName.name,JSON.stringify(editProjName))

        // edit in projectTracker array
        const proj = findProject(projects,projName)
        proj.name = newProjName;
        li.click()
    }else{
        return;
    }
    
})

// trigger listener to style nav item
    li.click()
}


// random color generator
function generateRGB(){
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)

    return "rgb("+ r + "," + g + "," + b + ")" 
    }

//get projectId
function getProjectId (){
    return projectId
}

// set projectId
function setProjectId (id){
    projectId = id
}

// function to create array of proj objects
function projectTracker() {
    const projectsArr = [];
    const getProjects = () => projectsArr;
    const addProj = (proj) =>  projectsArr.push(proj) 
    
        return {addProj,getProjects };
    }

// instance of projectTracker
export const trackProjects = projectTracker()

// function to find specific project in arr
export function findProject (arr,project){
    let selectedProj = arr.find((proj) => proj.name === project);

    return selectedProj
}






