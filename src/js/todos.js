export function createTodo(title, dueDate, description, priority) {
    let done = false;

    const setDone = () => { done = true };
    const getDone = () => done;

    const setTitle = (newTitle) => { title = newTitle };
    const getTitle = () => title;

    const setDueDate = (newDate) => { dueDate = newDate };
    const getDueDate = () => dueDate;

    const setDescription = (newDescription) => { description = newDescription };
    const getDescription = () => description;

    const setPriority = (newPrio) => { priority = newPrio };
    const getPriority = () => priority;

    return {
        setDone, getDone, setTitle, getTitle, setDueDate, getDueDate,
        setDescription, getDescription, setPriority, getPriority
    };
};