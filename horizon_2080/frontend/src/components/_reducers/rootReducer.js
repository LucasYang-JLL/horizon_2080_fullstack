import { combineReducers } from "redux";
import { language, slideState, userID } from "./headerStore";
import { OpenEventID } from "./eventStore";
import { editContent, target_details_data, project_details_data, snackbarProp, targetUpdate, myActionAccess } from "./performanceStore";
// combines everything into a single entry point for store
export default combineReducers({
    language,
    slideState,
    userID,
    editContent,
    target_details_data,
    project_details_data,
    snackbarProp,
    targetUpdate,
    OpenEventID,
    myActionAccess
});
