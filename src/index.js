import "./styles.css";

import { createButton, createProjButton, newProj } from "./js/dom.js";
import { projListManager } from "./js/projects.js";
import { checkStorage } from "./js/save.js";

createButton();
createProjButton();
newProj("default");
checkStorage();