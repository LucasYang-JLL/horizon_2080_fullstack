import { combineReducers } from "redux";
import { language, slideState } from "./headerStore";
import { editContent, target_details_data } from "./performanceStore";
// combines everything into a single entry point for store
export default combineReducers({
    language,
    slideState,
    editContent,
    target_details_data
});
