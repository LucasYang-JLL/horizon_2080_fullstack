// takes an action and map it to redux Store
const selectLanguage = (value) => ({
    type: "LANGUAGE_OPTION",
    value: value,
});

const slideDirection = (value) => ({
    type: "SLIDE_DIRECTION",
    value: value,
});

const saveUserID = (id) => ({
    type: "USER_ID",
    id: id,
});

export { selectLanguage, slideDirection, saveUserID };