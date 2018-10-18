const editContent = (state = false, action) => {
    switch (action.type) {
        case "TOGGLE_EDIT_BUTTON":
            return action.value;
        default:
            return state;
    }
};

export { editContent };