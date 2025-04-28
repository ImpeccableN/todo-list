import { listManager } from "./todos.js";
import { projListManager } from "./projects.js";

const content = document.querySelector("#content");
const tododiv = document.querySelector("#todos");

export const createButton = () => {
    const newButton = document.createElement("button");
    newButton.setAttribute("id", "newToDoButton");
    newButton.addEventListener("click", () => {
        createToDoForm();
        newButton.remove();
    });
    newButton.textContent = "new ToDo";
    content.appendChild(newButton);
}

export const createProjButton = () => {
    const newButton = document.createElement("button");
    newButton.setAttribute("id", "newProjButton");
    newButton.addEventListener("click", () => {
        createProjForm();
        newButton.remove();
    });
    newButton.textContent = "new Project";
    content.appendChild(newButton);
}

const createToDoForm = () => {
    const form = document.createElement("form");
    form.classList.toggle("flex");
    
    const titleInput = document.createElement("input");
    const dateInput = document.createElement("input");
    const descriptionInput = document.createElement("input");

    const prioInput = document.createElement("select");
    const prioHigh = document.createElement("option");
    const prioMid = document.createElement("option");
    const prioLow = document.createElement("option");

    const titleLabel = document.createElement("label");
    const dateLabel = document.createElement("label");
    const descriptionLabel = document.createElement("label");
    const prioLabel = document.createElement("label");

    const addButton = document.createElement("button");

    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "title");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "dueDate");
    descriptionInput.setAttribute("type", "text");
    descriptionInput.setAttribute("id", "description");
    prioInput.setAttribute("name", "priority");
    prioInput.setAttribute("id", "priority");
    // prioHigh.setAttribute("selected");
    prioHigh.setAttribute("value", "high");
    prioMid.setAttribute("value", "mid");
    prioLow.setAttribute("value", "low");

    addButton.setAttribute("type", "button");

    titleLabel.setAttribute("for", "title");
    dateLabel.setAttribute("for", "dueDate");
    descriptionLabel.setAttribute("for", "description");
    prioLabel.setAttribute("for", "priority");

    prioHigh.textContent = "High";
    prioMid.textContent = "Middle";
    prioLow.textContent = "Low";

    titleLabel.textContent = "Task Title:";
    dateLabel.textContent = "Due Date:";
    descriptionLabel.textContent = "Task Description:";
    prioLabel.textContent = "Priority:";

    addButton.textContent = "add ToDo"
    addButton.addEventListener("click", () => {
        newToDo(titleInput.value, dateInput.value,
            descriptionInput.value, prioInput.value);
        createButton();
        form.remove();
    });
    content.appendChild(form);

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(prioLabel);
    form.appendChild(prioInput);

    prioInput.appendChild(prioLow);
    prioInput.appendChild(prioMid);
    prioInput.appendChild(prioHigh);

    form.appendChild(addButton);

};

function createProjForm() {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const inputLabel = document.createElement("label");
    const button = document.createElement("button");

    div.classList.toggle("flex");

    div.setAttribute("id", "newProjDiv");
    input.setAttribute("type", "text");
    input.setAttribute("id", "newProjInput");
    inputLabel.setAttribute("for", "newProjInput");
    button.setAttribute("type", "button");

    inputLabel.textContent = "Projectname:";
    button.textContent = "add Project";

    button.addEventListener("click", () => {
        newProj(input.value);
        createProjButton();
        div.remove();
    });

    content.appendChild(div);
    div.appendChild(inputLabel);
    div.appendChild(input);
    div.appendChild(button);
}

export const createProjDom = (proj) => {
    const container = document.createElement("div");
    container.classList.toggle("projDom");
    container.classList.toggle("flex");
    const title = document.createElement("div");

    container.setAttribute("id", proj.getTitle());
    container.setAttribute("class", "project");

    title.textContent = "Project: " + proj.getTitle();

    tododiv.appendChild(container);
    container.appendChild(title);
};

const createToDoDom = (toDo) => {
    const toDoContainer = document.querySelector("#" + toDo.getProject());
    const container = document.createElement("div");
    const title = document.createElement("div");
    const expandDiv = document.createElement("div");

    toDoContainer.classList.toggle("toDoDom");
    toDoContainer.classList.toggle("flex");

    let expandSwitch = false;

    title.textContent = toDo.getTitle();

    title.addEventListener("click", () => {
        if (!expandSwitch) {
            expandToDo(toDo, expandDiv)
            expandSwitch = true;
        } else {
            while (expandDiv.firstElementChild) {
                expandDiv.firstElementChild.remove();
            };
            expandSwitch = false;
        }

    })

    toDoContainer.appendChild(container);
    container.appendChild(title);
    container.appendChild(expandDiv);

};

function newToDo(title, date, description, priority) {
    const toDo = listManager.newToDo(title, date, description, priority);
    createToDoDom(toDo);
}

function editToDo(toDo, proj, title, date, description, priority) {
    toDo.setProject(proj);
    toDo.setTitle(title);
    toDo.setDueDate(date);
    toDo.setDescription(description);
    toDo.setPriority(priority);
}

export function newProj(title) {
    const proj = projListManager.newProj(title);
    createProjDom(proj);
}

function expandToDo(toDo, div) {
    
    const date = document.createElement("div");
    const descr = document.createElement("div");
    const prio = document.createElement("div");
    const editButton = document.createElement("button");

    date.textContent = "Due Date: " + toDo.getDueDate();
    descr.textContent = "Description: " + toDo.getDescription();
    prio.textContent = "Priority: " + toDo.getPriority();
    editButton.textContent = "edit";

    editButton.addEventListener("click", () => {
        editToDoForm(toDo, div);
    })

    div.appendChild(date);
    div.appendChild(descr);
    div.appendChild(prio);
    div.appendChild(editButton);
}

function editToDoForm(toDo, container){
    while(container.firstElementChild){
        container.firstElementChild.remove();
    }
    const form = document.createElement("form");
    const titleInput = document.createElement("input");
    const dateInput = document.createElement("input");
    const descriptionInput = document.createElement("input");
    const projectInput = document.createElement("select");
    const submitButton = document.createElement("button");
    
    const prioInput = document.createElement("select");
    const prioHigh = document.createElement("option");
    const prioMid = document.createElement("option");
    const prioLow = document.createElement("option");

    const titleLabel = document.createElement("label");
    const dateLabel = document.createElement("label");
    const descriptionLabel = document.createElement("label");
    const prioLabel = document.createElement("label");
    const projLabel = document.createElement("label");

    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "edittitle");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "editdueDate");
    descriptionInput.setAttribute("type", "text");
    descriptionInput.setAttribute("id", "editdescription");
    prioInput.setAttribute("name", "priority");
    prioInput.setAttribute("id", "editpriority");
    
    prioHigh.setAttribute("value", "high");
    prioMid.setAttribute("value", "mid");
    prioLow.setAttribute("value", "low");
    projectInput.setAttribute("name", "projects");
    projectInput.setAttribute("id", "editProj");
    submitButton.setAttribute("type", "button");

    titleLabel.setAttribute("for", "edittitle");
    dateLabel.setAttribute("for", "editdueDate");
    descriptionLabel.setAttribute("for", "editdescription");
    prioLabel.setAttribute("for", "editpriority");
    projLabel.setAttribute("for", "editProj");

    prioHigh.textContent = "High";
    prioMid.textContent = "Middle";
    prioLow.textContent = "Low";

    titleLabel.textContent = "Task Title:";
    dateLabel.textContent = "Due Date:";
    descriptionLabel.textContent = "Task Description:";
    prioLabel.textContent = "Priority:";
    projLabel.textContent = "Project:";
    submitButton.textContent = "Submit Changes";

    projectInput.value = toDo.getProject();
    titleInput.value = toDo.getTitle();
    dateInput.value = toDo.getDueDate();
    descriptionInput.value = toDo.getDescription();
    prioInput.value = toDo.getPriority();

    submitButton.addEventListener("click", () => {
        editToDo(toDo, projectInput.value, titleInput.value, dateInput.value,
            descriptionInput.value, prioInput.value
        );
        form.remove();
        updateProjects();
        updateToDos();
    });

    container.appendChild(form);
    form.appendChild(projLabel);
    form.appendChild(projectInput);

    const projList = projListManager.getList();
    for(let i = 0; i < projList.length; i++){
        const projSelect = document.createElement("option");
        projSelect.setAttribute("value", projList[i].getTitle());
        projSelect.textContent = projList[i].getTitle();
        projectInput.appendChild(projSelect);
    };

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(prioLabel);
    form.appendChild(prioInput);
    form.appendChild(submitButton);

    prioInput.appendChild(prioLow);
    prioInput.appendChild(prioMid);
    prioInput.appendChild(prioHigh);
};

function updateProjects(){
    while(tododiv.firstElementChild){
        tododiv.firstElementChild.remove()
    };
    const projList = projListManager.getList();
    for(let i = 0; i < projList.length; i++){
        createProjDom(projList[i]);
    }
}

function updateToDos(){
    const list = listManager.getList();
    for(let i = 0; i < list.length; i++){
        createToDoDom(list[i]);
    }
}