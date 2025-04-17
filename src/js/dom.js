import { createTodo } from "./todos.js";


export const createButton = () => {
    const content = document.querySelector("#content");
    const newButton = document.createElement("button");
    newButton.addEventListener("click", () => {
        alert("create a new todo");
    });
    newButton.textContent = "new ToDo";
    content.appendChild(newButton);
}


