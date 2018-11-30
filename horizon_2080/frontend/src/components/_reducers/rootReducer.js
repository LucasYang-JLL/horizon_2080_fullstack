import { combineReducers } from "redux";
import { language, slideState, userID } from "./headerStore";
import { editContent, target_details_data, snackbarProp, targetUpdate } from "./performanceStore";
// combines everything into a single entry point for store
export default combineReducers({
    language,
    slideState,
    userID,
    editContent,
    target_details_data,
    snackbarProp,
    targetUpdate
});
