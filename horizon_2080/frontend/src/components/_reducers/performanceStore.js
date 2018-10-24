const editContent = (state = false, action) => {
    switch (action.type) {
        case "TOGGLE_EDIT_BUTTON":
            return action.value;
        default:
            return state;
    }
};

const target_details_data = (state={}, action) => {
    switch (action.type) {
        case "TARGET_DETAILS_DATA":
            return action.data;
        case "CHANGE_TARGET_DETAILS":
            return {
                ...state,
                [action.name]: action.value
            };
        default:
            return state;
    }
}

export { editContent, target_details_data };