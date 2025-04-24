import { createButton } from "./js/dom.js";
import { listManager } from "./js/todos.js";
import { projListManager } from "./js/projects.js";

createButton();
projListManager.newProj("default");