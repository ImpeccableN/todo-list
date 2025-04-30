import { projListManager } from "./projects.js"

function createTodo(title, dueDate, description, priority) {
    let done = false;
    let project;

    const setProject = (projName) => {project = projName};
    const getProject = () => project;

    const setDone = () => { done = true };
    const getDone = () => done;

    const setTitle = (newTitle) => { title = newTitle };
    const getTitle = () => title;

    const setDueDate = (newDate) => { dueDate = newDate };
    const getDueDate = () => dueDate;

    const setDescription = (newDescription) => { description = newDescription };
    const getDescription = () => description;

    const setPriority = (newPrio) => { priority = newPrio };
    const getPriority = () => priority;

    return {
        setDone, getDone, setTitle, getTitle, setDueDate, getDueDate,
        setDescription, getDescription, setPriority, getPriority, 
        setProject, getProject
    };
};

const toDoList = (function() {
    let list = [];

    const getList = () => list;
    const getListElement = (listPos) => list[listPos];
    const addToList = (toDo) => {list.push(toDo)};
    const removeFromList = (listPos) => {list.splice(listPos, 1)};

    return {
        addToList, removeFromList, getList, getListElement
    }
})();

export const listManager = (function listManage(){
    const newToDo = function(title, date, description, prio) {
        const toDo = createTodo(title, date, description, prio);
        toDo.setProject("default");
        toDoList.addToList(toDo);
        getList().forEach(getToDoTitle);
        return toDo
    };

    function getToDoTitle(todo){
        console.log(todo.getTitle());
    }

    const getListPos = (toDoTitle) => {
        let list = toDoList.getList();
        for (let i = 0; i < list.length; i++){
            if (list[i].getTitle() == toDoTitle){
                return i;
            }
        };
    };

    const getListElement = (toDoTitle) => {
        return toDoList.getListElement(getListPos(toDoTitle));
    }

    const removeToDo = (toDoTitle) => {
        const listPos = getListPos(toDoTitle);
        toDoList.removeFromList(listPos);
        getList().forEach(getToDoTitle);
    };

    const getList = () => toDoList.getList();

    return {
        newToDo, removeToDo, getList, getListElement
    };
})();