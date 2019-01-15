const toggleEditButton = (value) => ({
    type: "TOGGLE_EDIT_BUTTON",
    value: value
});

// takes an action and map it to redux Store
const storeTargetData = (data) => ({
    type: "TARGET_DETAILS_DATA",
    data: data,
});

const storeProjectData = (data) => ({
    type: "PROJECT_DETAILS_DATA",
    data: data,
});

const handleDataChange = (name, value) => ({
    type: "CHANGE_TARGET_DETAILS",
    name: name,
    value: value
});

const updateTarget = (value) => ({
    type: "UPDATE_TARGET",
    value: value
});

export { toggleEditButton, storeTargetData, storeProjectData, handleDataChange, updateTarget };
