
import { addProjLayout,trackProjects} from "./project-Utils";

export function checkLocalStorage (){
    for(let item in localStorage){
        if(localStorage.hasOwnProperty(item)){
            const proj = JSON.parse(localStorage.getItem(item))
            trackProjects.addProj(proj)
            addProjLayout(proj)
        }
    }
}

