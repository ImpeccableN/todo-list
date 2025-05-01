import { listManager } from "./todos.js";


function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

export const checkStorage = function () {
    let useStorage = false;

    if (storageAvailable("localStorage")) {
        console.log("storage available");
        useStorage = true;
    } else {
        alert("Data not found");
    }

    function getUseStorage() {
        return useStorage;
    }

    return { getUseStorage };
}


export const storageManager = (function () {
    
    function saveToLocalStorage(list) {
        localStorage.setItem("todos", JSON.stringify(list));
    };

    function loadFromLocalStorage() {
        const loadedList = JSON.parse(localStorage.getItem("todos"));
    };

    if (!localStorage.getItem("todos")) {
        saveToLocalStorage();
    } else {
        loadFromLocalStorage();
    };

    return {
        loadFromLocalStorage, saveToLocalStorage
    }
})();