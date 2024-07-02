import { Project } from "./classes"
export {projectModule}
import { addProjLayout,findProject,trackProjects} from "./project-Utils"


const addProjBtn = document.getElementById('add-proj')

// PROJECT MODULE

function projectModule(){

// ADD PROJ BUTTON LISTENER
addProjBtn.addEventListener('click',() => {

// prompt for project name
const projName = prompt('Enter Project Name:');
const projectsArr = trackProjects.getProjects()

if(projName === null|| projName === undefined){
    return;

// error for spaces
}else if(projName.includes(" ")){
    alert("Please enter a new valid name without spaces.");
    return;
    
// error if project name already exists
}else if(findProject(projectsArr,projName)){
    alert("Oops! Project name already exists. Try another name.")
    return;
}

// set new proj name as header
header.textContent = projName;

// create new proj object
let newProj = new Project(projName)
newProj.tasks = []
localStorage.setItem(newProj.name,JSON.stringify(newProj))

// update proj tracker with new project
trackProjects.addProj(newProj)

// create project layout
addProjLayout(newProj)
})
}