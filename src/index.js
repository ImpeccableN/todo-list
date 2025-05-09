import "./styles.css";

import { createButton, createProjButton, newProj, initDom } from "./js/dom.js";
import { projListManager } from "./js/projects.js";
import { listManager } from "./js/todos.js";

// newProj("default");
listManager.initApp();
initDom();
