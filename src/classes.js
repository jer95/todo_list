export {Project,Task}

class Project{
    constructor(name){
        this.name = name;
    }
}


class Task {
    constructor(task,date,priority){
        this.task = task;
        this.date = date;
        this.priority = priority;
    }

}
