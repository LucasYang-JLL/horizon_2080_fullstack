import { connect } from "react-redux";
import { openEventRequest } from "../_actions/event";
import { updateActivityBadgeCount } from "../_actions/header";
import Activity from "../Activity";

// redux provided wrapper to map state to props
const mapStateToProps = (state) => {
    return {
        reduxState: state
    };
};

// redux provided wrapper to map dispatch to props
const mapDispatchToProps = (dispatch) => {
    return {
        // selectLanguage: (value) => {
        //     dispatch(selectLanguage(value));
        // },
        openEventRequest: (id) => {
            dispatch(openEventRequest(id))
        },
        updateActivityBadgeCount: (count) => {
            dispatch(updateActivityBadgeCount(count))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Activity);
