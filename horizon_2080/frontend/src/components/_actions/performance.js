const toggleEditButton = (value) => ({
    type: "TOGGLE_EDIT_BUTTON",
    value: value
});

// takes an action and map it to redux Store
const storeData = (data) => ({
    type: "TARGET_DETAILS_DATA",
    data: data,
});

const handleDataChange = (name, value) => ({
    type: "CHANGE_TARGET_DETAILS",
    name: name,
    value: value
});

export { toggleEditButton, storeData, handleDataChange };
