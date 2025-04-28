import "./styles.css";

import { createButton, createProjButton, newProj } from "./js/dom.js";
import { listManager } from "./js/todos.js";
import { projListManager } from "./js/projects.js";

createButton();
createProjButton();
newProj("default");