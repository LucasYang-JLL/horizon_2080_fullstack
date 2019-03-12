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

const updateActivityBadgeCount = (count) => ({
    type: "ACTIVITY_BADGE_COUNT",
    count: count,
});

const updateCommentBadgeCount = (count) => ({
    type: "COMMENT_BADGE_COUNT",
    count: count,
});

const updateActionBadgeCount = (count) => ({
    type: "ACTION_BADGE_COUNT",
    count: count,
});

export { selectLanguage, slideDirection, saveUserID, updateActivityBadgeCount, updateCommentBadgeCount, updateActionBadgeCount };