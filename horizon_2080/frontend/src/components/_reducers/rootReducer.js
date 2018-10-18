import { combineReducers } from "redux";
import { language, slideState } from "./headerStore";
import { editContent } from "./performanceStore";
// combines everything into a single entry point for store
export default combineReducers({
    language,
    slideState,
    editContent
});
