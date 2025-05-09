import { checkStorage, storageManager } from "./save.js";
import { projListManager } from "./projects.js";

function createTodo(title, dueDate, description, priority) {
  let done = false;
  let project;

  const setProject = (projName) => {
    project = projName;
  };
  const getProject = () => project;

  const setDone = (bool) => {
    done = bool;
  };
  const getDone = () => done;

  const setTitle = (newTitle) => {
    title = newTitle;
  };
  const getTitle = () => title;

  const setDueDate = (newDate) => {
    dueDate = newDate;
  };
  const getDueDate = () => dueDate;

  const setDescription = (newDescription) => {
    description = newDescription;
  };
  const getDescription = () => description;

  const setPriority = (newPrio) => {
    priority = newPrio;
  };
  const getPriority = () => priority;

  return {
    setDone,
    getDone,
    setTitle,
    getTitle,
    setDueDate,
    getDueDate,
    setDescription,
    getDescription,
    setPriority,
    getPriority,
    setProject,
    getProject,
  };
}

const toDoList = (function () {
  let list = [];

  const getList = () => list;
  const setList = (array) => {
    list = array;
  };
  const getListElement = (listPos) => list[listPos];
  const addToList = (toDo) => {
    list.push(toDo);
  };
  const removeFromList = (listPos) => {
    list.splice(listPos, 1);
  };

  return {
    addToList,
    removeFromList,
    getList,
    setList,
    getListElement,
  };
})();

export const listManager = (function listManage() {
  const newToDo = function (title, date, description, prio) {
    const toDo = createTodo(title, date, description, prio);
    toDo.setProject("default");
    toDoList.addToList(toDo);
    saveToLocal();
    return toDo;
  };

  const getListPos = (toDoTitle) => {
    let list = toDoList.getList();
    for (let i = 0; i < list.length; i++) {
      if (list[i].getTitle() == toDoTitle) {
        return i;
      }
    }
  };

  const getListElement = (toDoTitle) => {
    return toDoList.getListElement(getListPos(toDoTitle));
  };

  const removeToDo = (toDoTitle) => {
    const listPos = getListPos(toDoTitle);
    toDoList.removeFromList(listPos);
    saveToLocal();
  };

  const getList = () => toDoList.getList();

  const setList = (array) => toDoList.setList(array);

  const convertToUsableWithJson = () => {
    const list = getList();
    let convertedList = [];
    for (let i = 0; i < list.length; i++) {
      const project = list[i].getProject();
      const done = list[i].getDone();
      const title = list[i].getTitle();
      const date = list[i].getDueDate();
      const descr = list[i].getDescription();
      const prio = list[i].getPriority();

      const newObj = { project, done, title, date, descr, prio };
      convertedList.push(newObj);
    }
    return convertedList;
  };

  function checkForProject(project) {
    const list = projListManager.getList();
    let included = false;
    list.forEach((element) => {
      if (project === element.getTitle()) {
        included = true;
      }
    });
    if (!included) {
      projListManager.newProj(project);
    }
  }

  const reverseToTodoObject = (loadedList) => {
    let newList = [];
    for (let i = 0; i < loadedList.length; i++) {
      const todo = createTodo(
        loadedList[i].title,
        loadedList[i].date,
        loadedList[i].descr,
        loadedList[i].prio,
      );
      todo.setDone(loadedList[i].done);
      todo.setProject(loadedList[i].project);
      newList.push(todo);
      checkForProject(loadedList[i].project);
    }
    return newList;
  };

  const saveToLocal = () => {
    if (checkStorage.getUseStorage()) {
      const convertedList = convertToUsableWithJson();
      storageManager.saveToLocalStorage(convertedList);
    } else {
      alert("Can not save to local file");
    }
  };

  const loadFromLocal = () => {
    if (checkStorage.getUseStorage()) {
      setList(reverseToTodoObject(storageManager.loadFromLocalStorage()));
    } else {
      alert("Can not load local file");
    }
  };

  function initApp() {
    projListManager.newProj("default");
    if (storageManager.checkForSave()) {
      loadFromLocal();
    }
  }

  return {
    newToDo,
    removeToDo,
    getList,
    setList,
    getListElement,
    saveToLocal,
    initApp,
  };
})();
