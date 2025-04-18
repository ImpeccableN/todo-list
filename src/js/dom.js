import { createTodo } from "./todos.js";

const content = document.querySelector("#content");

export const createButton = () => {
    const newButton = document.createElement("button");
    newButton.addEventListener("click", () => {createForm();});
    newButton.textContent = "new ToDo";
    content.appendChild(newButton);
}

const createForm = () => {
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

}