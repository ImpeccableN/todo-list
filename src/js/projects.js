function createProject(title){
    const setTitle = (newTitle) => {title = newTitle};
    const getTitle = () => title;

    return {
        setTitle, getTitle
    }
}

