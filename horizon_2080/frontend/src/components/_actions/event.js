const openEventRequest = (id) => ({
    type: "OPEN_EVENT_REQUEST",
    id: id,
});

const ResetOpenEvent = () => ({
    type: "RESET_EVENT_REQUEST",
    id: null
});

export { openEventRequest, ResetOpenEvent };