// takes an action and map it to redux Store
const selectLanguage = (value) => ({
    type: "LANGUAGE_OPTION",
    value: value,
});

const slideDirection = (value) => ({
    type: "SLIDE_DIRECTION",
    value: value,
});

export { selectLanguage, slideDirection };