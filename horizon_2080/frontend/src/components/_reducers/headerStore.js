// takes in a previous state, and an action, then returns the next state
const language = (lang = "en", action) => {
    switch (action.type) {
        case "LANGUAGE_OPTION":
            return action.value;
        default:
            return lang;
    }
};

const slideState = (direction = "down", action) => {
    switch (action.type) {
        case "SLIDE_DIRECTION":
            return action.value;
        default:
            return direction;
    }
};

const userID = (id = null, action) => {
    switch (action.type) {
        case "USER_ID":
            return action.id;
        default:
            return id;
    }
};

const activityBadgeCount = (defaultCount = 0, action) => {
    switch (action.type) {
        case "ACTIVITY_BADGE_COUNT":
            return action.count;
        default:
            return defaultCount;
    }
};

const commentBadgeCount = (defaultCount = 0, action) => {
    switch (action.type) {
        case "COMMENT_BADGE_COUNT":
            return action.count;
        default:
            return defaultCount;
    }
};

const actionBadgeCount = (defaultCount = 0, action) => {
    switch (action.type) {
        case "ACTION_BADGE_COUNT":
            return action.count;
        default:
            return defaultCount;
    }
};

export { language, slideState, userID, activityBadgeCount, commentBadgeCount, actionBadgeCount };
