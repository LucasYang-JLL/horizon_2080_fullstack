const editContent = (state = false, action) => {
    switch (action.type) {
        case "TOGGLE_EDIT_BUTTON":
            return action.value;
        default:
            return state;
    }
};

const target_details_data = (state = {}, action) => {
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
};

const snackbarProp = (state = { snackbarOpen: false, variant: "info", message: "Input message here" }, action) => {
    switch (action.type) {
        case "TOGGLE_SNACKBAR":
            state = {
                snackbarOpen: action.snackbarOpen,
                variant: action.variant,
                message: action.message
            };
            return state;
        default:
            return state;
    }
};

export { editContent, target_details_data, snackbarProp };
