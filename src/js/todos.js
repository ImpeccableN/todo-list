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
        let toDo = createTodo(title, date, description, prio);
        toDoList.addToList(toDo);
    }

    const getListPos = (toDoTitle) => {
        let list = toDoList.getList();
        for (let i = 0; i++; i < list.length){
            if (list[i].getTitle() == toDoTitle){
                return i;
            }
        };
    }

    return {
        newToDo, getListPos
    };
})();