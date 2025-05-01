import { createProjDom } from "./dom";

function createProject(title){
    const setTitle = (newTitle) => {title = newTitle};
    const getTitle = () => title;

    return {
        setTitle, getTitle
    }
};


const projList = (function() {
    let list = [];
    
    const getList = () => list;
    const getListElement = (listPos) => list[listPos];
    const addToList = (project) => {list.push(project)};
    const removeFromList = (listPos) => {list.splice(listPos, 1)};

    return {
        getList, getListElement, addToList, removeFromList
    }
})();


export const projListManager = (function manageProjList(){
    const newProj = function(title) {
        const proj = createProject(title);
        projList.addToList(proj);
        return proj
    };

    const getListPos = (projTitle) => {
        let list = projList.getList();
        for (let i = 0; i++; i < list.length){
            if (list[i].getTitle() == projTitle){
                return i;
            }
        };
    };

    const removeProj = (projTitle) => {
        const listPos = getListPos(projTitle);
        projList.removeFromList(listPos);
    };

    const getList = () => projList.getList();
    
    return {
        newProj, removeProj, getList
    }
})();