// takes in a previous state, and an action, then returns the next state
const OpenEventID = (id = null, action) => {
    switch (action.type) {
        case "OPEN_EVENT_REQUEST":
            return action.id;
        case "RESET_EVENT_REQUEST":
            return null
        default:
            return id;
    }
};

export { OpenEventID };
