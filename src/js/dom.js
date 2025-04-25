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

    title.textContent = toDo.getTitle();

    title.addEventListener("click", () => {
        expandToDo(toDo, container)
    })
    
    toDoContainer.appendChild(container);
    container.appendChild(title);

};

function newToDo(title, date, description, priority){
    const toDo = listManager.newToDo(title, date, description, priority);
    createToDoDom(toDo);
}

export function newProj(title){
    const proj = projListManager.newProj(title);
    createProjDom(proj);
}

function expandToDo(toDo, div){
    const date = document.createElement("div");
    const descr = document.createElement("div");
    const prio = document.createElement("div");

    date.textContent = "Due Date: " + toDo.getDueDate();
    descr.textContent = "Description: " + toDo.getDescription();
    prio.textContent = "Priority: " + toDo.getPriority();

    div.appendChild(date);
    div.appendChild(descr);
    div.appendChild(prio);
}